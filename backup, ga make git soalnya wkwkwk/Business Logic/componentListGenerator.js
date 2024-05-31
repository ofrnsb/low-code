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
  const formToggle = document.getElementById('css-form-toggle');
  const cssForm = document.getElementById('css-form');

  cssForm.style.display = 'none';

  formToggle.addEventListener('click', () => {
    if (cssForm.style.display === 'none') {
      cssForm.style.display = 'block';
    } else {
      cssForm.style.display = 'none';
    }
  });
}
