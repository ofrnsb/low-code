import { retrieveState } from './Global State Management/globalStateManagement.js';

export function setupExport() {
  document
    .getElementById('download-button')
    .addEventListener('click', function () {
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
  const editor = document.getElementById('editor');
  const editorClone = editor.cloneNode(true);
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

  const savedState = localStorage.getItem('stateContent');
  const makeItArray = JSON.parse(savedState);

  const {
    stateObj: appFunctionality,
    subscribeToState: subscribeToAppFunctionalityState,
  } = retrieveState('appFunctionality');

  let fileContent = '';

  fileContent += scriptImports;

  makeItArray.forEach((state) => {
    const capitalizedStateName = `${state.stateName
      .charAt(0)
      .toUpperCase()}${state.stateName.slice(1)}`;
    fileContent += `
    const use${capitalizedStateName} = releaseState('${state.stateName}', []);
    const {
      stateObj: get${capitalizedStateName},
      subscribeToState: subsTo${capitalizedStateName},
    } = retrieveState('${state.stateName}');\n`;
  });

  appFunctionality.data.forEach((func) => {
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
