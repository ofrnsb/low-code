import {
  ADDFUNCTION_TEXTARE,
  POPUPMESSAGE_MODAL,
  UPDATESTATE_CLOSEBUTTON,
  UPDATESTATE_MODAL,
  UPDATESTATE_SUBMIT,
  UPDATESTATE_TEXTAREA,
} from '../main.js';

export function UpdateState() {
  let stateContent = [];
  let functions = [];

  UPDATESTATE_CLOSEBUTTON.addEventListener('click', function () {
    UPDATESTATE_MODAL.classList.remove('visible');

    UPDATESTATE_SUBMIT.removeAttribute('disabled');

    UPDATESTATE_TEXTAREA.removeAttribute('disabled');
  });

  UPDATESTATE_SUBMIT.addEventListener('click', function () {
    try {
      localStorage.removeItem('stateContent');
      localStorage.setItem('stateContent', UPDATESTATE_TEXTAREA.value);

      UPDATESTATE_MODAL.classList.remove('visible');
      ADDFUNCTION_TEXTARE.value = '';
    } catch (error) {
      POPUPMESSAGE_MODAL.textContent = error.message;
      POPUPMESSAGE_MODAL.classList.add('error');
      setTimeout(() => {
        POPUPMESSAGE_MODAL.classList.remove('error');
      }, 1000);
    }
  });
}
