import { SAVED_STATE } from '../../Data/CONST.js';
import { retrieveState } from '../Global State Management/globalStateManagement.js';
import {
  POPUPMESSAGE_MODAL,
  UPDATESTATE_CLOSEBUTTON,
  UPDATESTATE_MODAL,
  UPDATESTATE_SUBMIT,
  UPDATESTATE_TEXTAREA,
} from '../main.js';

export function UpdateState() {
  let stateContent = JSON.parse(SAVED_STATE);
  let functions = [];
  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  UPDATESTATE_CLOSEBUTTON.addEventListener('click', function () {
    UPDATESTATE_MODAL.classList.remove('visible');

    UPDATESTATE_SUBMIT.removeAttribute('disabled');

    UPDATESTATE_TEXTAREA.removeAttribute('disabled');
  });

  UPDATESTATE_SUBMIT.addEventListener('click', function () {
    let textAreaValue = JSON.parse(UPDATESTATE_TEXTAREA.value);
    let savedState = JSON.parse(SAVED_STATE);
    try {
      // localStorage.removeItem('stateContent');
      // localStorage.setItem('stateContent', UPDATESTATE_TEXTAREA.value);
      let targetIndex = savedState.findIndex(
        (state) => state.stateName === textAreaValue.stateName
      );

      savedState[targetIndex].data.listeners.push(whichComponent.getState().id);

      localStorage.setItem('stateContent', JSON.stringify(savedState));

      UPDATESTATE_MODAL.classList.remove('visible');
    } catch (error) {
      POPUPMESSAGE_MODAL.textContent = error.message;
      POPUPMESSAGE_MODAL.classList.add('error');
      setTimeout(() => {
        POPUPMESSAGE_MODAL.classList.remove('error');
      }, 1000);
    }
  });
}
