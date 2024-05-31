import { showAddFunctionModal } from './Add Function Logic/addFunctionToComponent.js';
import { AddState } from './Low Code State Management/addState.js';
import { UpdateState } from './Low Code State Management/updateState.js';
import { generateCssSidebar } from './Sidebar/generateCssSidebar.js';
import { generateSidebar } from './Sidebar/generateSidebar.js';
import { toggleCategory, toggleForm } from './componentListGenerator.js';
import { setupDraggableComponents } from './drag.js';
import { setupEditor } from './editor.js';
import { setupExport } from './export.js';
import { setupCSSForm } from './form.js';
import { removeComponent } from './removeComponent.js';
import { loadEditorContent, saveEditorContent } from './saveWork.js';

let hasChanged = false;
const editor = document.getElementById('editor');
const container = document.getElementById('bodyApp');
const observer = new MutationObserver((mutationsList, observer) => {
  hasChanged = true;
});

loadEditorContent();
setupEditor();
generateSidebar();
generateCssSidebar(() => {
  setupCSSForm();
});
setupExport();
showAddFunctionModal();
AddState();
UpdateState();
removeComponent();
observer.observe(editor, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});
setInterval(() => {
  if (hasChanged) {
    saveEditorContent();
    hasChanged = false;
  }
}, 5000);
setupDraggableComponents();
toggleCategory();
toggleForm();
