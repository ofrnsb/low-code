import {
  releaseState,
  retrieveState,
} from '../Global State Management/globalStateManagement.js';

export function AddState() {
  let btn = document.getElementById('add-state-button');
  let modal = document.getElementById('add-state');
  let modalSubmit = document.getElementById('add-state-submit');
  let textArea = document.getElementById('add-state-input');
  let popupMessage = document.getElementById('popup-message');

  const stateContent = localStorage.getItem('stateContent');

  let stateObj;
  if (stateContent) {
    stateObj = JSON.parse(stateContent);
  } else {
    stateObj = [];
    console.error('No state content found', stateObj);
  }

  let functions = [];

  document
    .getElementById('add-state-button')
    .addEventListener('click', function () {
      textArea.placeholder = `New State Name`;
      modal.classList.add('visible');
    });

  document
    .getElementById('add-close-button')
    .addEventListener('click', function () {
      modal.classList.remove('visible');
    });

  document
    .getElementById('add-state-submit')
    .addEventListener('click', function () {
      try {
        const newStateName = textArea.value;
        releaseState(`${newStateName}`, {});
        const { stateObj: newStateNameRetrive } = retrieveState(
          `${newStateName}`
        );

        stateObj.push({ stateName: newStateName, data: newStateNameRetrive });
        localStorage.setItem('stateContent', JSON.stringify(stateObj));

        modal.classList.remove('visible');
        textArea.value = '';
      } catch (error) {
        popupMessage.textContent = error.message;
        popupMessage.classList.add('error');
        setTimeout(() => {
          document.getElementById('popup-message').classList.remove('error');
        }, 1000);
      }
    });
}
