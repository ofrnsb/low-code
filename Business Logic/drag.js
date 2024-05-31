export function setupDraggableComponents() {
  const sidebarComponents = document.querySelectorAll('.draggable-component');
  sidebarComponents.forEach((component) => {
    component.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', component.textContent);
    });
  });
}
