export function generateCssSidebar(callback) {
  var sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('css-sidebar-wrapper');
  sidebarDiv.id = 'css-sidebar';

  var form = document.createElement('form');
  form.id = 'css-form';
  form.classList.add('css-form-component');
  form.action = '';

  var inputFields = [
    {
      placeholder: 'Component ID',
      type: 'text',
      id: 'css-component-id-input',
      name: 'css-component-id-input',
    },
    {
      placeholder: 'Content',
      type: 'text',
      id: 'css-content-input',
      name: 'css-content-input',
    },
    {
      placeholder: 'Width',
      type: 'text',
      id: 'css-width-input',
      name: 'css-width-input',
    },
    {
      placeholder: 'Height',
      type: 'text',
      id: 'css-height-input',
      name: 'css-height-input',
    },
    {
      placeholder: 'Border',
      type: 'text',
      id: 'css-border-input',
      name: 'css-border-input',
    },
    {
      placeholder: 'Padding Top',
      type: 'text',
      id: 'css-padding-top-input',
      name: 'css-padding-top-input',
    },
    {
      placeholder: 'Padding Bottom',
      type: 'text',
      id: 'css-padding-bottom-input',
      name: 'css-padding-bottom-input',
    },
    {
      placeholder: 'Padding Right',
      type: 'text',
      id: 'css-padding-right-input',
      name: 'css-padding-right-input',
    },
    {
      placeholder: 'Padding Left',
      type: 'text',
      id: 'css-padding-left-input',
      name: 'css-padding-left-input',
    },
  ];

  inputFields.forEach(function (field) {
    var input = document.createElement('input');
    input.style.marginBottom = '10px';
    input.placeholder = field.placeholder;
    input.type = field.type;
    input.id = field.id;
    input.name = field.name;
    form.appendChild(input);
  });

  var submitButton = document.createElement('input');
  submitButton.classList.add('css-form-submit-input');
  submitButton.type = 'submit';
  submitButton.value = 'Submit';
  submitButton.id = 'submit-css';
  form.appendChild(submitButton);

  var paragraph = document.createElement('p');
  paragraph.id = 'css-form-toggle';
  paragraph.textContent = 'CSS Form';

  sidebarDiv.appendChild(paragraph);
  sidebarDiv.appendChild(form);

  var RightSideBar = document.getElementById('css-sidebar');
  RightSideBar.appendChild(sidebarDiv);

  var addButton = document.createElement('button');
  addButton.disabled = true;
  addButton.classList.add('add-function-button');
  addButton.id = 'add-function-button';
  addButton.textContent = 'Add Logic';

  var addStateButton = document.createElement('button');
  addStateButton.classList.add('add-state-button');
  addStateButton.id = 'add-state-button';
  addStateButton.textContent = 'Add State';

  var removeButton = document.createElement('button');
  removeButton.disabled = true;
  removeButton.classList.add('remove-button');
  removeButton.id = 'remove-button';
  removeButton.textContent = 'Remove';

  var exportButton = document.createElement('button');
  exportButton.classList.add('export-button');
  exportButton.id = 'download-button';
  exportButton.textContent = 'Export';

  var StateButtonGroup = document.createElement('div');
  StateButtonGroup.classList.add('state-button-group');
  StateButtonGroup.id = 'state-button-group';
  StateButtonGroup.textContent = 'State Management';

  var StateListGroup = document.createElement('div');
  StateListGroup.classList.add('state-list-group');
  StateListGroup.id = 'state-list-group';

  var stateListButton = document.createElement('button');
  stateListButton.classList.add('state-list-button');
  stateListButton.id = 'state-list-button';
  stateListButton.textContent = 'State List';
  // StateListGroup.textContent = 'State List';

  RightSideBar.appendChild(StateButtonGroup);
  RightSideBar.appendChild(addStateButton);

  RightSideBar.appendChild(StateListGroup);
  StateListGroup.appendChild(stateListButton);
  RightSideBar.appendChild(addButton);
  RightSideBar.appendChild(removeButton);
  RightSideBar.appendChild(exportButton);

  if (callback) {
    callback();
  }
}
