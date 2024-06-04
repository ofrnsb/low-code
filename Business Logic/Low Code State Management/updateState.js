import { SAVED_STATE } from '../../Data/CONST.js';
import { retrieveState } from '../Global State Management/globalStateManagement.js';
import { setNotification } from '../Notification/notification.js';
import {
  GETUPDATESTATE_SUBMIT,
  SETUPDATESTATE_SUBMIT,
  UPDATESTATE_CLOSEBUTTON,
  UPDATESTATE_MODAL,
  UPDATESTATE_TEXTAREA,
} from '../main.js';

export function UpdateState() {
  let stateContent = JSON.parse(SAVED_STATE);
  let functions = [];
  let savedState = JSON.parse(SAVED_STATE);

  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  UPDATESTATE_CLOSEBUTTON.addEventListener('click', function () {
    UPDATESTATE_MODAL.classList.remove('visible');

    SETUPDATESTATE_SUBMIT.removeAttribute('disabled');
    GETUPDATESTATE_SUBMIT.removeAttribute('disabled');

    UPDATESTATE_TEXTAREA.removeAttribute('disabled');
  });

  GETUPDATESTATE_SUBMIT.addEventListener('click', function () {
    let textAreaValue = JSON.parse(UPDATESTATE_TEXTAREA.value);
    try {
      let targetIndex = savedState.findIndex(
        (state) => state.stateName === textAreaValue.stateName
      );

      savedState[targetIndex].data.listeners.forEach((listener) => {
        if (listener === whichComponent.getState().id) {
          setNotification('button already subscribed to state', 'error');
        } else {
          savedState[targetIndex].data.listeners.push(
            whichComponent.getState().id
          );
          localStorage.setItem('stateContent', JSON.stringify(savedState));
          UPDATESTATE_MODAL.classList.remove('visible');
          setNotification('done get state', 'show');
        }
      });
    } catch (error) {
      setNotification(`${error.message}`, 'error');
    }
  });

  SETUPDATESTATE_SUBMIT.addEventListener('click', function () {
    let textAreaValue = JSON.parse(UPDATESTATE_TEXTAREA.value);
    try {
      let targetIndex = savedState.findIndex(
        (state) => state.stateName === textAreaValue.stateName
      );

      savedState[targetIndex].data.data = textAreaValue.data.data;

      if (savedState[targetIndex].updater.length === 0) {
        savedState[targetIndex].updater.push(whichComponent.getState().id);
      } else {
        savedState[targetIndex].updater.forEach((updater) => {
          if (updater === whichComponent.getState().id) {
            return;
          } else {
            savedState[targetIndex].updater.push(whichComponent.getState().id);
          }
        });
      }

      localStorage.setItem('stateContent', JSON.stringify(savedState));
      UPDATESTATE_MODAL.classList.remove('visible');
      setNotification('done update state', 'show');
    } catch (error) {
      setNotification(`${error.message}`, 'error');
    }
  });
}
