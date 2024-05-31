export const cssUnitRegex = {
  CSSunit: /^(?:-?\d+\.?\d*|\.\d+)(px|em|rem|%|vh|vw|cm|mm|in|pt|pc|ex|ch)$/i,
};
export let SAVED_WORK = localStorage.getItem('editorContent');
export function updateSavedWork() {
  SAVED_WORK = localStorage.getItem('editorContent');
}

export let SAVED_BUTTONFUNCTION = JSON.parse(
  localStorage.getItem('appFunctionality')
);
export function updateSavedButtonFunction() {
  SAVED_BUTTONFUNCTION = JSON.parse(localStorage.getItem('appFunctionality'));
}

export let SAVED_STATE = localStorage.getItem('stateContent');
export function updateSavedState() {
  SAVED_STATE = localStorage.getItem('stateContent');
}
