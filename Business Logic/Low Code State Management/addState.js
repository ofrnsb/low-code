import { SAVED_STATE, updateSavedState } from '../../Data/CONST.js';
import {
  releaseState,
  retrieveState,
} from '../Global State Management/globalStateManagement.js';
import { setNotification } from '../Notification/notification.js';
import {
  ADDSTATE_BUTTON,
  ADDSTATE_CLOSEBUTTON,
  ADDSTATE_MODAL,
  ADDSTATE_SUBMIT,
  ADDSTATE_TEXTAREA,
} from '../main.js';
import { updateStateList } from './listState.js';

export function AddState() {
  let stateObj;
  if (SAVED_STATE) {
    stateObj = JSON.parse(SAVED_STATE);
  } else {
    stateObj = [];
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
      releaseState(
        `${newState[0]}`,
        newState[1] === 'array'
          ? []
          : newState[1] === 'string'
          ? ''
          : newState[1] === 'boolean'
          ? false
          : {}
      );
      const { stateObj: newStateNameRetrive } = retrieveState(`${newState[0]}`);

      stateObj.push({
        stateName: newState[0],
        type: newState[1],
        data: newStateNameRetrive,
        updater: [],
      });

      localStorage.setItem('stateContent', JSON.stringify(stateObj));

      updateStateList(stateObj[stateObj.length - 1]);
      updateSavedState();

      ADDSTATE_MODAL.classList.remove('visible');
      ADDSTATE_TEXTAREA.value = '';
    } catch (error) {
      setNotification(error.message);
    }
  });
}
