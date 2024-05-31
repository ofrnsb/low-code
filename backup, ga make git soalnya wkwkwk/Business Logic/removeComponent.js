import { saveEditorContent } from './saveWork.js';

export function removeComponent() {
  let selectedComponent;

  document.getElementById('editor').addEventListener('click', function (e) {
    if (e.target.classList.contains('dropped-component')) {
      selectedComponent = e.target;
      selectedComponent.disabled = false;
    }
  });

  document
    .getElementById('remove-button')
    .addEventListener('click', function () {
      if (selectedComponent) {
        selectedComponent.remove();
        saveEditorContent();
      }
    });
}
