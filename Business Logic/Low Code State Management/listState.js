import { SAVED_STATE } from '../../Data/CONST.js';
import { retrieveState } from '../Global State Management/globalStateManagement.js';
import {
  STATELIST_BUTTON,
  STATELIST_WRAPPER,
  UPDATESTATE_MODAL,
  UPDATESTATE_SUBMIT,
  UPDATESTATE_TEXTAREA,
} from '../main.js';

let rightBar = document.getElementById('css-sidebar');
let stateObj;
let isStateList = false;

export function listState() {
  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  STATELIST_BUTTON.addEventListener('click', () => {
    console.log('stateListButton clicked', JSON.parse(SAVED_STATE));
    isStateList = !isStateList;
    if (isStateList) {
      if (SAVED_STATE) {
        stateObj = JSON.parse(SAVED_STATE);
        stateObj.forEach((state) => {
          const stateName = document.createElement('p');
          stateName.textContent = state.stateName;
          stateName.classList.add('state-list-name');
          stateName.id = 'state-list-name';
          stateName.addEventListener('click', function () {
            UPDATESTATE_MODAL.classList.add('visible');
            if (
              whichComponent.getState().id === 'editor' ||
              whichComponent.getState().id === undefined
            ) {
              UPDATESTATE_SUBMIT.setAttribute('disabled', '');
              UPDATESTATE_TEXTAREA.setAttribute('disabled', '');
            }
            UPDATESTATE_TEXTAREA.value = JSON.stringify(state, null, 2);
          });

          STATELIST_WRAPPER.appendChild(stateName);
        });
      }
    } else {
      const stateList = document.querySelectorAll('.state-list-name');
      for (const state of stateList) {
        STATELIST_WRAPPER.removeChild(state);
      }
    }
  });
}

export function updateStateList(lastAddedState) {
  if (isStateList) {
    const stateName = document.createElement('p');
    stateName.textContent = lastAddedState.stateName;
    stateName.classList.add('state-list-name');
    stateName.id = 'state-list-name';
    stateName.addEventListener('click', function () {
      UPDATESTATE_MODAL.classList.add('visible');
      if (
        whichComponent.getState().id === 'editor' ||
        whichComponent.getState().id === undefined
      ) {
        UPDATESTATE_SUBMIT.setAttribute('disabled', '');
        UPDATESTATE_TEXTAREA.setAttribute('disabled', '');
      }
      UPDATESTATE_TEXTAREA.value = JSON.stringify(lastAddedState, null, 2);
    });

    STATELIST_WRAPPER.appendChild(stateName);
  }
}
