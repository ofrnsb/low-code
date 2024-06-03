import { SAVED_STATE } from '../../Data/CONST.js';
import { retrieveState } from '../Global State Management/globalStateManagement.js';
import {
  GETUPDATESTATE_SUBMIT,
  SETUPDATESTATE_SUBMIT,
  STATELIST_BUTTON,
  STATELIST_WRAPPER,
  UPDATESTATE_MODAL,
  UPDATESTATE_TEXTAREA,
} from '../main.js';

let rightBar = document.getElementById('css-sidebar');
let stateObj;
let isStateList = false;

var stateListGroup = document.createElement('div');
stateListGroup.classList.add('state-list');
stateListGroup.id = 'state-list';

export function listState() {
  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  STATELIST_BUTTON.addEventListener('click', () => {
    isStateList = !isStateList;
    if (isStateList) {
      if (SAVED_STATE) {
        stateObj = JSON.parse(SAVED_STATE);
        STATELIST_WRAPPER.appendChild(stateListGroup);
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
              SETUPDATESTATE_SUBMIT.setAttribute('disabled', '');
              GETUPDATESTATE_SUBMIT.setAttribute('disabled', '');
              UPDATESTATE_TEXTAREA.setAttribute('disabled', '');
            }
            UPDATESTATE_TEXTAREA.value = JSON.stringify(state, null, 2);
          });

          stateListGroup.appendChild(stateName);
        });
      }
    } else {
      STATELIST_WRAPPER.removeChild(stateListGroup);
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
        SETUPDATESTATE_SUBMIT.setAttribute('disabled', '');
        GETUPDATESTATE_SUBMIT.setAttribute('disabled', '');
        UPDATESTATE_TEXTAREA.setAttribute('disabled', '');
      }
      UPDATESTATE_TEXTAREA.value = JSON.stringify(lastAddedState, null, 2);
    });

    stateListGroup.appendChild(stateName);
  }
}
