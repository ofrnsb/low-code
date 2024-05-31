import {
  ADDSTATE_BUTTON,
  CSS_FORM,
  FORMTOGGLE_BUTTON,
  STATETOGGLE_BUTTON,
} from './main.js';

export function toggleCategory(id) {
  const categoryHeaders = document.querySelectorAll(
    '.category p, .css-category p'
  );
  const components = document.querySelectorAll(
    '.components, .css-form-component'
  );

  components.forEach((component) => {
    component.style.display = 'none';
  });

  categoryHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const categoryId = header.getAttribute('data-category');
      const component = document.getElementById(categoryId);
      if (component.style.display === 'none') {
        component.style.display = 'inline-grid';
      } else {
        component.style.display = 'none';
      }
    });
  });
}

export function toggleForm() {
  CSS_FORM.style.display = 'none';

  FORMTOGGLE_BUTTON.addEventListener('click', () => {
    if (CSS_FORM.style.display === 'none') {
      CSS_FORM.style.display = 'block';
    } else {
      CSS_FORM.style.display = 'none';
    }
  });
}

export function toggleState() {
  ADDSTATE_BUTTON.style.display = 'none';

  STATETOGGLE_BUTTON.addEventListener('click', () => {
    if (ADDSTATE_BUTTON.style.display === 'none') {
      ADDSTATE_BUTTON.style.display = 'block';
    } else {
      ADDSTATE_BUTTON.style.display = 'none';
    }
  });
}
