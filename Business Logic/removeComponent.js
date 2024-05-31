import { EDITOR, REMOVE_BUTTON } from './main.js';
import { saveEditorContent } from './saveWork.js';

export function removeComponent() {
  let selectedComponent;

  EDITOR.addEventListener('click', function (e) {
    if (e.target.classList.contains('dropped-component')) {
      selectedComponent = e.target;
      selectedComponent.disabled = false;
    }
  });

  REMOVE_BUTTON.addEventListener('click', function () {
    if (selectedComponent) {
      selectedComponent.remove();
      saveEditorContent();
    }
  });
}
