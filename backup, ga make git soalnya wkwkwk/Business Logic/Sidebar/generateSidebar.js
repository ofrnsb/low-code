import { componentStyles } from '../../Data/preMadeComponent.js';

export function generateSidebar() {
  const sidebar = document.getElementById('sidebar');

  const componentCategories = {};
  componentStyles.forEach((component) => {
    const category = component.category;
    if (!componentCategories[category]) {
      componentCategories[category] = [];
    }
    componentCategories[category].push(component);
  });

  for (const [category, components] of Object.entries(componentCategories)) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    const categoryTitle = document.createElement('p');
    categoryTitle.setAttribute('data-category', category);
    categoryTitle.textContent =
      category.charAt(0).toUpperCase() + category.slice(1).split('-').join(' ');
    categoryDiv.appendChild(categoryTitle);

    const componentsDiv = document.createElement('div');
    componentsDiv.classList.add('components');
    componentsDiv.id = category;

    components.forEach((comp) => {
      const draggableComponent = document.createElement('div');
      const draggableComponentIcon = document.createElement('img');
      const draggableComponentText = document.createElement('p');

      draggableComponentText.textContent = comp.name;
      draggableComponentText.classList.add('draggable-component-text');

      draggableComponentIcon.src = comp.src;
      draggableComponentIcon.alt = comp.name;
      draggableComponentIcon.classList.add('draggable-component-icon');

      draggableComponent.setAttribute('component-tag', comp.tag);
      draggableComponent.classList.add('draggable-component');
      draggableComponent.setAttribute('draggable', 'true');

      draggableComponent.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', comp.tag);
      });

      componentsDiv.appendChild(draggableComponent);
      draggableComponent.appendChild(draggableComponentIcon);
      draggableComponent.appendChild(draggableComponentText);
    });

    categoryDiv.appendChild(componentsDiv);
    sidebar.appendChild(categoryDiv);
  }
}
