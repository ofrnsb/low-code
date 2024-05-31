import { SAVED_STATE } from '../../Data/CONST.js';
import {
  releaseState,
  retrieveState,
} from '../Global State Management/globalStateManagement.js';
import {
  ADDSTATE_BUTTON,
  ADDSTATE_CLOSEBUTTON,
  ADDSTATE_MODAL,
  ADDSTATE_SUBMIT,
  ADDSTATE_TEXTAREA,
  POPUPMESSAGE_MODAL,
} from '../main.js';

export function AddState() {
  let stateObj;
  if (SAVED_STATE) {
    stateObj = JSON.parse(SAVED_STATE);
  } else {
    stateObj = [];
    console.error('No state content found', stateObj);
  }

  let functions = [];

  ADDSTATE_BUTTON.addEventListener('click', function () {
    ADDSTATE_TEXTAREA.placeholder = `New State Name`;
    ADDSTATE_MODAL.classList.add('visible');
  });

  ADDSTATE_CLOSEBUTTON.addEventListener('click', function () {
    ADDSTATE_MODAL.classList.remove('visible');
  });

  ADDSTATE_SUBMIT.addEventListener('click', function () {
    try {
      const newState = ADDSTATE_TEXTAREA.value.split(' ');
      releaseState(`${newState}`, {});
      const { stateObj: newStateNameRetrive } = retrieveState(`${newState}`);

      stateObj.push({
        stateName: newState[0],
        type: newState[1],
        data: newStateNameRetrive,
        updater: [],
      });
      localStorage.setItem('stateContent', JSON.stringify(stateObj));

      ADDSTATE_MODAL.classList.remove('visible');
      ADDSTATE_TEXTAREA.value = '';
    } catch (error) {
      POPUPMESSAGE_MODAL.textContent = error.message;
      POPUPMESSAGE_MODAL.classList.add('error');
      setTimeout(() => {
        POPUPMESSAGE_MODAL.classList.remove('error');
      }, 1000);
    }
  });
}
