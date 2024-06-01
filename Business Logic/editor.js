import { componentStyles } from '../Data/preMadeComponent.js';
import { EDITOR } from './main.js';
let hLine, vLine;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;
let selectedComponent;
let data;

export function setupEditor() {
  EDITOR.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  EDITOR.addEventListener('drop', function (e) {
    e.preventDefault();
    data = e.dataTransfer.getData('text/plain');
    const newComponent = createComponent(data, e.offsetX, e.offsetY);

    if (e.target.closest('form')) {
      e.preventDefault();
      const form = e.target.closest('form');
      form.addEventListener('dragover', function (e) {
        e.preventDefault();
      });
      form.addEventListener('drop', function (e) {
        e.preventDefault();

        form.appendChild(newComponent);
        makeDraggable(newComponent);
      });
    } else {
      EDITOR.appendChild(newComponent);

      makeDraggable(newComponent);
    }
  });
}

export function createComponent(tagName, x, y) {
  const preMadeComponent = componentStyles.find(
    (component) => component.tag === tagName.toLowerCase()
  );
  if (!preMadeComponent) {
    throw new Error(`Component style for ${tagName} not found`);
  }

  const { tag, style } = preMadeComponent;
  const element = document.createElement(tag);
  if (tagName !== 'form') {
    element.textContent = tagName;
  }
  element.className = 'dropped-component';
  Object.assign(element.style, style);
  element.style.position = 'absolute';
  element.style.top = `${y - 25}px`;
  element.style.left = `${x - 50}px`;
  element.style.margin = '0';
  element.style.padding = '0';
  element.draggable = true;
  element.id = `${tagName}-${Date.now()}`;

  if (tag.toLowerCase() === 'button') {
    element.type = 'button';
  }

  return element;
}

export function makeDraggable(element) {
  element.addEventListener('mousedown', function (e) {
    selectedComponent = e.target;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    EDITOR.addEventListener('mousemove', elementDrag);
    EDITOR.addEventListener('mouseup', closeDragElement);
    hLine = createLine('horizontal');
    vLine = createLine('vertical');
    EDITOR.appendChild(hLine);
    EDITOR.appendChild(vLine);
  });

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
    checkAlignment(element);
  }

  function closeDragElement(e) {
    EDITOR.removeEventListener('mousemove', elementDrag);
    EDITOR.removeEventListener('mouseup', closeDragElement);
    hideAlignmentLines();
  }
}

function createLine(type) {
  const line = document.createElement('div');
  line.className = `line ${type}`;
  line.style.position = 'absolute';
  line.style.display = 'none';
  line.style.backgroundColor = 'red';
  if (type === 'horizontal') {
    line.style.height = '1px';
    line.style.width = '100%';
  } else {
    line.style.width = '1px';
    line.style.height = '100%';
  }
  return line;
}

function checkAlignment(activeElement) {
  const activeRect = activeElement.getBoundingClientRect();
  const containerRect = EDITOR.getBoundingClientRect();

  const activeTop = activeRect.top - containerRect.top;
  const activeBottom = activeRect.bottom - containerRect.top;
  const activeLeft = activeRect.left - containerRect.left;
  const activeRight = activeRect.right - containerRect.left;
  const activeCenterX = activeLeft + activeElement.offsetWidth / 2;
  const activeCenterY = activeTop + activeElement.offsetHeight / 2;

  let hAligned = false;
  let vAligned = false;

  const draggables = EDITOR.querySelectorAll('.dropped-component');

  draggables.forEach((draggable) => {
    if (draggable === activeElement) return;

    const rect = draggable.getBoundingClientRect();
    const top = rect.top - containerRect.top;
    const bottom = rect.bottom - containerRect.top;
    const left = rect.left - containerRect.left;
    const right = rect.right - containerRect.left;
    const centerX = left + draggable.offsetWidth / 2;
    const centerY = top + draggable.offsetHeight / 2;

    if (Math.abs(activeTop - bottom) < 1) {
      hLine.style.top = `${bottom}px`;
      hLine.style.display = 'block';
      hAligned = true;
    }
    if (Math.abs(activeBottom - top) < 1) {
      hLine.style.top = `${top}px`;
      hLine.style.display = 'block';
      hAligned = true;
    }
    if (Math.abs(activeTop - top) < 1) {
      hLine.style.top = `${top}px`;
      hLine.style.display = 'block';
      hAligned = true;
    }
    if (Math.abs(activeLeft - right) < 1) {
      vLine.style.left = `${right}px`;
      vLine.style.display = 'block';
      vAligned = true;
    }
    if (Math.abs(activeRight - left) < 1) {
      vLine.style.left = `${left}px`;
      vLine.style.display = 'block';
      vAligned = true;
    }
    if (Math.abs(activeRight - right) < 1) {
      vLine.style.left = `${right}px`;
      vLine.style.display = 'block';
      vAligned = true;
    }
    if (Math.abs(activeLeft - left) < 1) {
      vLine.style.left = `${left}px`;
      vLine.style.display = 'block';
      vAligned = true;
    }
  });

  if (!hAligned) hLine.style.display = 'none';
  if (!vAligned) vLine.style.display = 'none';
}

function hideAlignmentLines() {
  const hLineToRemove = EDITOR.querySelector('.line.horizontal');
  const vLineToRemove = EDITOR.querySelector('.line.vertical');

  hLineToRemove.parentNode.removeChild(hLineToRemove);

  vLineToRemove.parentNode.removeChild(vLineToRemove);
}

function dragStopped(e) {
  EDITOR.onmouseup = null;
  EDITOR.onmousemove = null;
}
