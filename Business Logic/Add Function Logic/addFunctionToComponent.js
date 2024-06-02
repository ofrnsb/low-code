import { SAVED_BUTTONFUNCTION } from '../../Data/CONST.js';
import { USE_REGEX } from '../../Utils/regex.js';
import {
  releaseState,
  retrieveState,
} from '../Global State Management/globalStateManagement.js';
import {
  ADDFUNCTION_MODAL,
  ADDFUNCTION_SUBMIT,
  ADDFUNCTION_TEXTARE,
  CLOSEADDFUNCTION_MODAL,
  POPUPMESSAGE_MODAL,
} from '../main.js';

export function showAddFunctionModal() {
  const {
    stateObj: whichComponent,
    subscribeToState: subscribeToWhichComponentState,
  } = retrieveState('whichComponent');

  const appFunctionalityState = releaseState('appFunctionality', []);
  const {
    stateObj: appFunctionality,
    subscribeToState: subscribeToAppFunctionalityState,
  } = retrieveState('appFunctionality');

  document
    .getElementById('add-function-button')
    .addEventListener('click', function () {
      if (SAVED_BUTTONFUNCTION) {
        SAVED_BUTTONFUNCTION.forEach((func) => {
          if (whichComponent.getState().id == func.id) {
            ADDFUNCTION_TEXTARE.value = func.functionCode.join('\n');
          }
        });
        ADDFUNCTION_TEXTARE.placeholder = `Add function to ${
          whichComponent.getState().id
        }`;
      }
      ADDFUNCTION_MODAL.classList.add('visible');
    });

  CLOSEADDFUNCTION_MODAL.addEventListener('click', function () {
    ADDFUNCTION_MODAL.classList.remove('visible');
    ADDFUNCTION_TEXTARE.value = '';
  });

  ADDFUNCTION_SUBMIT.addEventListener('click', function () {
    const selectedComponent = whichComponent.getState();
    const button = document.getElementById(`${selectedComponent.id}`);
    const functionCode = ADDFUNCTION_TEXTARE.value;

    try {
      if (USE_REGEX.test(functionCode)) {
        try {
          const newFunction = new Function(functionCode);
          newFunction();
        } catch (error) {
          //skipping the error cause why not?! LOL
        }
        appFunctionalityState.setState([
          ...appFunctionalityState.getState(),
          {
            id: selectedComponent.id,
            functionCode: functionCode,
          },
        ]);

        ADDFUNCTION_MODAL.classList.remove('visible');
        ADDFUNCTION_TEXTARE.value = '';
      } else {
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

        ADDFUNCTION_MODAL.classList.remove('visible');
        ADDFUNCTION_TEXTARE.value = '';
      }
      const formatedFunctionData = consolidateFunctionCodes(
        appFunctionalityState.getState()
      );
      localStorage.setItem(
        'appFunctionality',
        JSON.stringify(formatedFunctionData)
      );
    } catch (error) {
      POPUPMESSAGE_MODAL.textContent = error.message;
      POPUPMESSAGE_MODAL.classList.add('error');
      setTimeout(() => {
        POPUPMESSAGE_MODAL.classList.remove('error');
      }, 1000);
    }
  });
}

function consolidateFunctionCodes(data) {
  const consolidatedData = {};

  data.forEach((item) => {
    if (consolidatedData[item.id]) {
      consolidatedData[item.id].functionCode.push(item.functionCode);
    } else {
      consolidatedData[item.id] = {
        id: item.id,
        functionCode: [item.functionCode],
      };
    }
  });

  return Object.values(consolidatedData);
}
