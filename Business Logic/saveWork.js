import { SAVED_WORK } from '../Data/CONST.js';
import { createComponent, makeDraggable } from './editor.js';
import { EDITOR, POPUPMESSAGE_MODAL } from './main.js';

export function saveEditorContent() {
  var elements = document.getElementsByClassName('dropped-component');

  let currentContent = EDITOR.innerHTML;

  if (currentContent.includes('clicked')) {
    currentContent = currentContent.replace(/clicked/g, '');
  }

  // for (var i = 0; i < elements.length; i++) {
  //   elements[i].classList.remove('clicked');
  // }

  if (currentContent !== SAVED_WORK) {
    localStorage.setItem('editorContent', currentContent);
    POPUPMESSAGE_MODAL.classList.add('show');
    setTimeout(() => {
      POPUPMESSAGE_MODAL.classList.remove('show');
    }, 1000);
    clearTimeout();
  } else {
  }
}

export function loadEditorContent() {
  if (SAVED_WORK) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(SAVED_WORK, 'text/html');
    const elements = doc.body.childNodes;

    elements.forEach((element) => {
      const loadedElement = createComponent(element.tagName.toLowerCase());

      Array.from(element.attributes).forEach((attr) => {
        loadedElement.setAttribute(attr.name, attr.value);
      });

      loadedElement.style.cssText = element.style.cssText;

      loadedElement.innerHTML = element.innerHTML;
      EDITOR.appendChild(loadedElement);
      makeDraggable(loadedElement);
    });

    EDITOR.querySelectorAll('.dropped-component').forEach((element) => {
      makeDraggable(element);
    });
  }
}
