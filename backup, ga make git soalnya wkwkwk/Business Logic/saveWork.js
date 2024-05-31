import { createComponent, makeDraggable } from './editor.js';

let isDragging = false;

export function saveEditorContent() {
  if (!isDragging) {
    const editorDiv = document.getElementById('editor');
    var elements = document.getElementsByClassName('dropped-component');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('clicked');
    }
    const currentContent = editorDiv.innerHTML;
    const savedContent = localStorage.getItem('editorContent');

    if (currentContent !== savedContent) {
      localStorage.setItem('editorContent', currentContent);
      document.getElementById('popup-message').classList.add('show');
      setTimeout(() => {
        document.getElementById('popup-message').classList.remove('show');
      }, 1000);
      clearTimeout();
    }
  }
}

export function loadEditorContent() {
  const editorDiv = document.getElementById('editor');
  const editorContent = localStorage.getItem('editorContent');

  if (editorContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorContent, 'text/html');
    const elements = doc.body.childNodes;

    elements.forEach((element) => {
      const loadedElement = createComponent(element.tagName.toLowerCase());

      Array.from(element.attributes).forEach((attr) => {
        loadedElement.setAttribute(attr.name, attr.value);
      });

      loadedElement.style.cssText = element.style.cssText;

      loadedElement.innerHTML = element.innerHTML;
      editorDiv.appendChild(loadedElement);
      makeDraggable(loadedElement);
    });

    editorDiv.querySelectorAll('.dropped-component').forEach((element) => {
      makeDraggable(element);
    });
  }
}
