import {
  releaseState,
  retrieveState,
} from '../Global State Management/globalStateManagement.js';

export function showAddFunctionModal() {
  let btn = document.getElementById('add-function-button');
  let modal = document.getElementById('add-function');
  let modalSubmit = document.getElementById('add-function-submit');
  let modalClose = document.getElementById('close-button');
  let textArea = document.getElementById('function-input');
  let popupMessage = document.getElementById('popup-message');

  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  let functions = [];

  const appFunctionalityState = releaseState('appFunctionality', []);
  const {
    stateObj: appFunctionality,
    subscribeToState: subscribeToAppFunctionalityState,
  } = retrieveState('appFunctionality');

  document
    .getElementById('add-function-button')
    .addEventListener('click', function () {
      textArea.placeholder = `Add function to ${whichComponent.getState().id}`;

      modal.classList.add('visible');
    });

  document
    .getElementById('close-button')
    .addEventListener('click', function () {
      modal.classList.remove('visible');
    });

  document
    .getElementById('add-function-submit')
    .addEventListener('click', function () {
      const selectedComponent = whichComponent.getState();
      const button = document.getElementById(`${selectedComponent.id}`);
      const functionCode = document.getElementById('function-input').value;

      try {
        const newFunction = new Function(functionCode);

        const showLogs = false;
        if (!showLogs) {
          console.log = function () {};
        }
        newFunction();

        appFunctionalityState.setState([
          ...appFunctionalityState.getState(),
          {
            id: selectedComponent.id,
            functionCode: functionCode,
          },
        ]);

        modal.classList.remove('visible');
        document.getElementById('function-input').value = '';
      } catch (error) {
        popupMessage.textContent = error.message;
        popupMessage.classList.add('error');
        setTimeout(() => {
          document.getElementById('popup-message').classList.remove('error');
        }, 1000);
      }
    });
}
