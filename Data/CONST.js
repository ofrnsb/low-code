export const cssUnitRegex = {
  CSSunit: /^(?:-?\d+\.?\d*|\.\d+)(px|em|rem|%|vh|vw|cm|mm|in|pt|pc|ex|ch)$/i,
};
export const SAVED_WORK = localStorage.getItem('editorContent');

export const SAVED_BUTTONFUNCTION = JSON.parse(
  localStorage.getItem('appFunctionality')
);

export const SAVED_STATE = localStorage.getItem('stateContent');
