let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;
let data;
let dragTimeout;
const dragDelay = 500;

const sidebar = document.getElementById('sidebar');
const cssSidebar = document.getElementById('css-sidebar');
let isComponentSiderBar = false;
let isCssSiderbar = false;
let isDragging = false;

export function dragSetup() {
  const body = document.querySelector('body');
  const sidebar = document.getElementById('sidebar');
  const cssSidebar = document.getElementById('css-sidebar');

  body.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  makeDraggable(sidebar);
  makeDraggable(cssSidebar);
}

export function makeDraggable(element) {
  let body = document.querySelector('body');

  element.addEventListener('mousedown', function (e) {
    if (
      e.target.classList[0] !== 'sidebar-textContent' &&
      e.target.classList[0] !== 'css-sidebar' &&
      e.target.classList[0] !== 'sidebar' &&
      e.target.classList[0] !== 'sidebar-textContent'
    )
      return;

    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    isDragging = false;

    element.style.transition = 'all 0.3s';

    dragTimeout = setTimeout(() => {
      body.addEventListener('mousemove', elementDrag);
      element.style.cursor = 'grabbing';
      element.style.transition = 'background 0.3s';

      element.style.boxShadow = '0 0 2px 0 rgba(0, 0, 0, 0.2)';
      element.style.backgroundColor = 'rgba(124, 124, 124, 0.25)';
      element.style.backdropFilter = 'blur(5px)';
      if (element.getElementsByClassName('sidebar-textContent')[0]) {
        element.getElementsByClassName('sidebar-textContent')[0].style.color =
          '#f0f0f0';
      }

      isDragging = true;
    }, dragDelay);

    body.addEventListener('mouseup', closeDragElement);
  });

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  }

  function closeDragElement(e) {
    clearTimeout(dragTimeout);
    body.removeEventListener('mousemove', elementDrag);
    body.removeEventListener('mouseup', closeDragElement);

    if (!isDragging) {
      if (element.id === 'sidebar') {
        isComponentSiderBar = !isComponentSiderBar;
        updateComponentSideBarStyle(element);
      } else {
        isCssSiderbar = !isCssSiderbar;
        updateCssSideBarStyle(element);
      }
    }

    dragStopped(element);
  }

  element.addEventListener('mouseenter', function () {
    element.style.cursor = 'grab';
  });

  element.addEventListener('mouseleave', function () {
    element.style.cursor = 'default';
  });
}

function dragStopped(element) {
  element.style.cursor = 'grab';
  element.style.boxShadow = '0 0 4px 0 rgba(0, 0, 0, 0.2)';
  element.style.backgroundColor = 'rgba(124, 124, 124, 0.2)';
  element.style.backdropFilter = 'blur(3px)';

  if (element.getElementsByClassName('sidebar-textContent')[0])
    element.getElementsByClassName('sidebar-textContent')[0].style.color =
      '#CCCCCC';
  {
  }
  let body = document.querySelector('body');
  body.onmouseup = null;
  body.onmousemove = null;
}

function updateCssSideBarStyle(element) {
  const newTextContent = document.createElement('p');
  newTextContent.classList.add('sidebar-textContent');
  newTextContent.style.fontSize = '14px';
  newTextContent.style.textAlign = 'center';
  newTextContent.style.lineHeight = 0;
  newTextContent.style.fontWeight = 'bold';
  newTextContent.textContent = element.id;
  newTextContent.style.color = '#CCCCCC';

  newTextContent.addEventListener('mouseenter', function (e) {
    newTextContent.style.color = '#999999';
    newTextContent.style.cursor = 'pointer';
  });

  newTextContent.addEventListener('mouseleave', function (e) {
    newTextContent.style.color = '#CCCCCC';
  });

  if (isCssSiderbar) {
    element.style.width = '90px';
    element.style.height = '30px';

    element.style.maxHeight = null;
    element.style.borderRadius = '5px';
    element.style.padding = '0';

    element.appendChild(newTextContent);

    Array.from(element.children).forEach((child) => {
      if (child.tagName !== 'P') {
        child.style.display = 'none';
      }
    });
  } else {
    element.style.borderRadius = '10px';
    element.style.width = 'min-content';
    element.style.height = null;
    element.style.maxHeight = '100vh';
    element.style.padding = '';

    Array.from(element.children).forEach((child) => {
      child.style.display = 'block';
    });

    Array.from(element.children).forEach((child) => {
      if (child.tagName === 'P') {
        element.removeChild(child);
      }
    });
  }
}

function updateComponentSideBarStyle(element) {
  const newTextContent = document.createElement('p');
  newTextContent.classList.add('sidebar-textContent');
  newTextContent.style.fontSize = '14px';
  newTextContent.style.textAlign = 'center';
  newTextContent.style.lineHeight = 0;
  newTextContent.style.fontWeight = 'bold';
  newTextContent.textContent = element.id;
  newTextContent.style.color = '#CCCCCC';

  newTextContent.addEventListener('mouseenter', function (e) {
    newTextContent.style.color = '#999999';
    newTextContent.style.cursor = 'pointer';
  });

  newTextContent.addEventListener('mouseleave', function (e) {
    newTextContent.style.color = '#CCCCCC';
  });

  if (isComponentSiderBar) {
    element.style.width = '90px';
    element.style.height = '30px';

    element.style.maxHeight = null;
    element.style.borderRadius = '5px';
    element.style.padding = '0';

    element.appendChild(newTextContent);

    Array.from(element.children).forEach((child) => {
      if (child.tagName !== 'P') {
        child.style.display = 'none';
      }
    });
  } else {
    element.style.width = 'min-content';
    element.style.height = null;
    element.style.maxHeight = '100vh';
    element.style.borderRadius = '10px';
    element.style.padding = '';

    Array.from(element.children).forEach((child) => {
      child.style.display = 'block';
    });

    Array.from(element.children).forEach((child) => {
      if (child.tagName === 'P' && element.id === 'sidebar') {
        element.removeChild(child);
      }
    });
  }
}
