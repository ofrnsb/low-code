import { showAddFunctionModal } from './Add Function Logic/addFunctionToComponent.js';
import { AddState } from './Low Code State Management/addState.js';
import { listState } from './Low Code State Management/listState.js';
import { UpdateState } from './Low Code State Management/updateState.js';
import { generateCssSidebar } from './Sidebar/generateCssSidebar.js';
import { generateSidebar } from './Sidebar/generateSidebar.js';
import {
  toggleCategory,
  toggleForm,
  toggleState,
} from './componentListGenerator.js';
import { setupDraggableComponents } from './drag.js';
import { setupEditor } from './editor.js';
import { setupExport } from './export.js';
import { setupCSSForm } from './form.js';
import { removeComponent } from './removeComponent.js';
import { loadEditorContent, saveEditorContent } from './saveWork.js';

let hasChanged = false;
const observer = new MutationObserver((mutationsList, observer) => {
  hasChanged = true;
});

generateSidebar();
toggleCategory();

// generateCssSidebar();
generateCssSidebar(() => {
  setupCSSForm();
});

addEventListener('DOMContentLoaded', (event) => {
  showAddFunctionModal();
  AddState();
  listState();
  UpdateState();

  setupExport();
  toggleState();
  toggleForm();
  setupEditor();

  // setupCSSForm();

  removeComponent();

  loadEditorContent();

  observer.observe(EDITOR, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
});

setInterval(() => {
  if (hasChanged) {
    saveEditorContent();
    hasChanged = false;
  }
}, 5000);
setupDraggableComponents();

// CSS FORM
export const FORMTOGGLE_BUTTON = document.getElementById('css-form-toggle');
export const CSS_FORM = document.getElementById('css-form');
export const CSS_FORM_SUBMIT = document.getElementById('submit-css');

// STATE MANAGEMENT
export const STATETOGGLE_BUTTON = document.getElementById('state-button-group');

// UPDATE STATE
export const UPDATESTATE_BUTTON = document.getElementById(
  'update-state-button'
);
export const UPDATESTATE_MODAL = document.getElementById('update-state');
export const UPDATESTATE_SUBMIT = document.getElementById(
  'update-state-submit'
);
export const UPDATESTATE_CLOSEBUTTON = document.getElementById(
  'update-close-button'
);
export const UPDATESTATE_TEXTAREA =
  document.getElementById('update-state-input');

// ADD STATE
export const ADDSTATE_BUTTON = document.getElementById('add-state-button');
export const ADDSTATE_MODAL = document.getElementById('add-state');
export const ADDSTATE_SUBMIT = document.getElementById('add-state-submit');
export const ADDSTATE_CLOSEBUTTON = document.getElementById('add-close-button');
export const ADDSTATE_TEXTAREA = document.getElementById('add-state-input');

// LIST OF STATES
export const STATELIST_WRAPPER = document.getElementById('state-list-group');
export const STATELIST_BUTTON = document.getElementById('state-list-button');

// ADD FUNCTION
export const ADDFUNCTION_BUTTON = document.getElementById(
  'add-function-button'
);
export const ADDFUNCTION_MODAL = document.getElementById('add-function');
export const ADDFUNCTION_SUBMIT = document.getElementById(
  'add-function-submit'
);
export const ADDFUNCTION_TEXTARE = document.getElementById('function-input'); //have to change to general

// GENERAL
export const POPUPMESSAGE_MODAL = document.getElementById('popup-message');
export const CLOSEADDFUNCTION_MODAL = document.getElementById('close-button');
export const EDITOR = document.getElementById('editor');
export const EXPORT_BUTTON = document.getElementById('download-button');
export const REMOVE_BUTTON = document.getElementById('remove-button');

// RIGHT SIDEBAR
export const RIGHT_SIDEBAR = document.getElementById('css-sidebar');
export const LEFT_SIDEBAR = document.getElementById('sidebar');
