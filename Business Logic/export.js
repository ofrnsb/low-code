import {
  SAVED_BUTTONFUNCTION,
  SAVED_STATE,
  updateSavedButtonFunction,
} from '../Data/CONST.js';
import { EDITOR, EXPORT_BUTTON } from './main.js';

export function setupExport() {
  EXPORT_BUTTON.addEventListener('click', function () {
    downloadFiles();
  });
}

function downloadFiles() {
  const htmlContent = extractHTML();
  const cssContent = extractCSS();
  const jsContent = extractJavaScript();
  const stateManagementContent = downloadCustomGlobalStateManagement();

  downloadFile('index.html', 'text/html', htmlContent);
  downloadFile('styles.css', 'text/css', cssContent);
  downloadFile('script.js', 'text/javascript', jsContent);
  downloadFile('statemanagement.js', 'text/javascript', stateManagementContent);
}

function extractHTML() {
  const editorClone = EDITOR.cloneNode(true);
  editorClone.querySelectorAll('.draggable-component').forEach((component) => {
    component.removeAttribute('style');
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prototype V-0.1</title>
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
${editorClone.innerHTML}
<script src="./script.js"></script>
</body>
</html>`;
}

function extractCSS() {
  let cssContent = '';
  const editorComponents = document.querySelectorAll(
    '#editor .dropped-component'
  );
  editorComponents.forEach((component) => {
    const computedStyle = window.getComputedStyle(component);
    cssContent += `#${component.id} {\n`;
    ['position', 'top', 'left', 'width', 'height', 'background-color'].forEach(
      (property) => {
        const value = computedStyle.getPropertyValue(property);
        if (value) {
          cssContent += `    ${property}: ${value};\n`;
        }
      }
    );
    cssContent += '}\n\n';
  });
  return cssContent;
}

function extractJavaScript() {
  const scriptImports = `import {
  releaseState,
  retrieveState,
} from './statemanagement.js';\n\n`;

  const makeItArray = JSON.parse(SAVED_STATE);

  let fileContent = '';

  fileContent += scriptImports;

  if (makeItArray) {
    makeItArray.forEach((state) => {
      const capitalizedStateName = `${state.stateName
        .charAt(0)
        .toUpperCase()}${state.stateName.slice(1)}`;
      fileContent += `const set${capitalizedStateName} = releaseState('${
        state.stateName
      }', ${
        state.type === 'array'
          ? '[]'
          : state.type === 'string'
          ? "''"
          : state.type === 'boolean'
          ? 'false'
          : '{}'
      });
    const {
      stateObj: get${capitalizedStateName},
      subscribeToState: subsTo${capitalizedStateName},
    } = retrieveState('${state.stateName}');\n
    
    `;
    });
  }

  let stateListener = [];
  let stateUpdater = [];
  let isInSavedButtonFunction = [];

  if (makeItArray || SAVED_BUTTONFUNCTION) {
    (makeItArray || []).forEach((state, stateId) => {
      state.data.listeners.forEach((listener, listenerId) => {
        stateListener.push(listener);
      });
      state.updater.forEach((updater, updaterId) => {
        stateUpdater.push(updater);
      });
    });

    (SAVED_BUTTONFUNCTION || []).forEach((buttonFunction) => {
      isInSavedButtonFunction.push(buttonFunction.id);
    });
  }

  let allJs = [
    ...new Set([...stateListener, ...stateUpdater, ...isInSavedButtonFunction]),
  ];

  allJs.forEach((state, stateId) => {
    let inStateListener = stateListener.includes(state);
    let inStateUpdater = stateUpdater.includes(state);
    let inSavedButtonFunction = isInSavedButtonFunction.includes(state);

    if (inStateListener && !inStateUpdater && !inSavedButtonFunction) {
      makeItArray.forEach((stateValue, id) => {
        stateValue.data.listeners.forEach((listener) => {
          if (listener === state) {
            fileContent += `
            document
            .getElementById('${listener}')
            .addEventListener('click', function () {
              set${makeItArray[id].stateName
                .charAt(0)
                .toUpperCase()}${stateValue.stateName.slice(1)}.getState();
            });
                `;
          }
        });
      });
    } else if (!inStateListener && inStateUpdater && !inSavedButtonFunction) {
      makeItArray.forEach((stateValue, id) => {
        stateValue.updater.forEach((updater) => {
          if (updater === state) {
            fileContent += `
            document
            .getElementById('${updater}')
            .addEventListener('click', function () {
              set${makeItArray[id].stateName
                .charAt(0)
                .toUpperCase()}${stateValue.stateName.slice(1)}.setState();
            });
                `;
          }
        });
      });
    } else if (!inStateListener && !inStateUpdater && inSavedButtonFunction) {
      SAVED_BUTTONFUNCTION.forEach((buttonFunction) => {
        if (buttonFunction.id === state) {
          fileContent += `
          document
          .getElementById('${buttonFunction.id}')
          .addEventListener('click', function () {
            ${buttonFunction.functionCode}
          });
              `;
        }
      });
    } else if (inStateListener && inStateUpdater && !inSavedButtonFunction) {
      stateValue.updater.forEach((updater) => {
        if (updater === state) {
          fileContent += `
          document
          .getElementById('${updater}')
          .addEventListener('click', function () {
            set${makeItArray[id].stateName
              .charAt(0)
              .toUpperCase()}${stateValue.stateName.slice(1)}.setState();

              set${makeItArray[id].stateName
                .charAt(0)
                .toUpperCase()}${stateValue.stateName.slice(1)}.getState();
          });
              `;
        }
      });
    } else if (inStateListener && !inStateUpdater && inSavedButtonFunction) {
      makeItArray.forEach((stateValue, id) => {
        stateValue.data.listeners.forEach((listener) => {
          if (listener === state) {
            fileContent += `
            document
            .getElementById('${listener}')
            .addEventListener('click', function () {
              set${makeItArray[id].stateName
                .charAt(0)
                .toUpperCase()}${stateValue.stateName.slice(1)}.getState();
                
                ${addStateGenerator(listener)}
            });
                `;
          }
        });
      });
    } else if (!inStateListener && inStateUpdater && inSavedButtonFunction) {
      makeItArray.forEach((stateValue, id) => {
        stateValue.updater.forEach((updater) => {
          if (updater === state) {
            fileContent += `
            document
            .getElementById('${updater}')
            .addEventListener('click', function () {
              set${makeItArray[id].stateName
                .charAt(0)
                .toUpperCase()}${stateValue.stateName.slice(1)}.setState();
                ${addStateGenerator(updater)}
            });
                `;
          }
        });
      });
    }
  });

  function addStateGenerator(listener) {
    updateSavedButtonFunction();
    let returnedFunction = '';
    if (SAVED_BUTTONFUNCTION) {
      SAVED_BUTTONFUNCTION.forEach((func) => {
        if (func.id === listener) {
          returnedFunction = `${func.functionCode}`;
        }
      });
    }
    return returnedFunction;
  }

  return fileContent;
}

function downloadFile(filename, type, content) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadCustomGlobalStateManagement() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    '../Business Logic/Global State Management/globalStateManagement.js',
    false
  );
  xhr.send();

  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    console.error('Failed to retrieve the custom global state management file');
    return '';
  }
}
