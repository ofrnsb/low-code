import { SAVED_BUTTONFUNCTION, SAVED_STATE } from '../Data/CONST.js';
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

  function addStateGenerator(elementId, type) {
    let targetIndex = makeItArray.findIndex(
      (state) => state.data.listener === elementId
    );

    return `set${makeItArray[targetIndex].stateName}(${JSON.stringify(
      makeItArray[targetIndex].data
    )});`;
  }

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

  console.log(SAVED_BUTTONFUNCTION);
  SAVED_BUTTONFUNCTION.forEach((func) => {
    fileContent += `
document
.getElementById('${func.id}')
.addEventListener('click', function () {
${func.functionCode}
});
      `;
  });

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
