import { cssUnitRegex } from '../Data/CONST.js';
import { componentFormRules } from '../Data/componentsFormRules.js';
import { rgbToHex } from '../Utils/colorFormatter.js';
import { releaseState } from './Global State Management/globalStateManagement.js';
import { ADDFUNCTION_BUTTON, CSS_FORM, REMOVE_BUTTON } from './main.js';
let selectedComponent;
var lastSelectedComponentId;
let tagName;

export function setupCSSForm() {
  document.getElementById('submit-css').addEventListener('click', function (e) {
    e.preventDefault();
    applyCSSForm();
  });
  const whichComponent = releaseState('whichComponent', {});

  document.getElementById('editor').addEventListener('click', function (e) {
    selectedComponent = e.target;

    if (e.target.classList.contains('dropped-component')) {
      whichComponent.setState(selectedComponent);
      tagName = selectedComponent.tagName.toLowerCase();
    } else {
      whichComponent.setState(selectedComponent);
      tagName = selectedComponent.tagName.toLowerCase();
    }
    populateForm(selectedComponent);

    const rules = componentFormRules[tagName];

    if (rules) {
      CSS_FORM.querySelectorAll('.dynamic-field').forEach((field) => {
        field.remove();
      });

      if (selectedComponent.id !== 'editor') {
        rules.fields.forEach((field) => {
          const label = document.createElement('label');
          label.setAttribute('for', field.id);
          label.classList.add('dynamic-field');

          const input = document.createElement('input');
          input.setAttribute('type', field.type);
          input.setAttribute('id', field.id);
          input.setAttribute('name', field.id);
          input.classList.add('dynamic-field');
          input.setAttribute('placeholder', field.placeholder || '');

          var submitButton = CSS_FORM.querySelector('#submit-css');
          CSS_FORM.insertBefore(label, submitButton);
          CSS_FORM.insertBefore(input, submitButton);
          if (field.type === 'color') {
            input.value = rgbToHex(
              window.getComputedStyle(
                document.getElementById(`${selectedComponent.id}`)
              ).backgroundColor
            );
          }
        });

        lastSelectedComponentId = selectedComponent.id;
        ADDFUNCTION_BUTTON.removeAttribute('disabled');
        REMOVE_BUTTON.removeAttribute('disabled');
      } else {
        ADDFUNCTION_BUTTON.setAttribute('disabled', '');
        REMOVE_BUTTON.setAttribute('disabled', '');
        populateForm(selectedComponent);
      }
    }
  });
}

function applyCSSForm() {
  if (!selectedComponent) return;

  const getValue = (id) => document.getElementById(id).value.trim();

  const getPxValue = (id) => {
    const value = getValue(id);
    if (cssUnitRegex.CSSunit.test(value)) {
      return value;
    } else {
      return `${parseInt(value) || 0}px`;
    }
  };

  Object.assign(selectedComponent.style, {
    width: getPxValue('css-width-input'),
    height: getPxValue('css-height-input'),
    backgroundColor: getValue('css-background-color-input'),
    border: `${parseInt(getValue('css-border-input')) || 0}px solid black`,
    paddingTop: getPxValue('css-padding-top-input'),
    paddingBottom: getPxValue('css-padding-bottom-input'),
    paddingRight: getPxValue('css-padding-right-input'),
    paddingLeft: getPxValue('css-padding-left-input'),
  });

  selectedComponent.id = getValue('css-component-id-input');
  if (selectedComponent.tagName.toLowerCase() !== 'form') {
    selectedComponent.textContent = getValue('css-content-input');
  }
}

function populateForm(component) {
  const setValue = (id, value) => {
    value !== '0px'
      ? (document.getElementById(id).value = value)
      : (document.getElementById(id).value = '');
  };

  if (component.id !== 'editor') {
    const computedStyle = window.getComputedStyle(component);
    selectedComponent.classList.add('clicked');
    setValue('css-component-id-input', component.id);
    setValue('css-content-input', component.textContent);
    setValue('css-width-input', computedStyle.width);
    setValue('css-height-input', computedStyle.height);
    setValue('css-border-input', computedStyle.borderWidth);
    setValue('css-padding-top-input', computedStyle.paddingTop);
    setValue('css-padding-bottom-input', computedStyle.paddingBottom);
    setValue('css-padding-right-input', computedStyle.paddingRight);
    setValue('css-padding-left-input', computedStyle.paddingLeft);
  } else {
    var elements = document.getElementsByClassName('dropped-component');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('clicked');
    }

    selectedComponent.classList.remove('clicked');
    setValue('css-component-id-input', '');
    setValue('css-content-input', '');
    setValue('css-width-input', '');
    setValue('css-height-input', '');
    setValue('css-border-input', '');
    setValue('css-padding-top-input', '');
    setValue('css-padding-bottom-input', '');
    setValue('css-padding-right-input', '');
    setValue('css-padding-left-input', '');
  }
}
