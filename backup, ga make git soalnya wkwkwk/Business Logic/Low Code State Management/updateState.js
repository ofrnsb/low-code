export function UpdateState() {
  let btn = document.getElementById('update-state-button');
  let modal = document.getElementById('update-state');
  let modalSubmit = document.getElementById('update-state-submit');
  let modalClose = document.getElementById('update-close-button');
  let textArea = document.getElementById('update-state-input');
  let popupMessage = document.getElementById('popup-message');
  let stateContent = [];
  let functions = [];

  document
    .getElementById('update-state-button')
    .addEventListener('click', function () {
      stateContent = localStorage.getItem('stateContent');
      const parsedContent = JSON.parse(stateContent);
      const formattedContent = JSON.stringify(parsedContent, null, 1);
      textArea.value = formattedContent;
      textArea.placeholder = `New State Name`;

      modal.classList.add('visible');
    });

  document
    .getElementById('update-close-button')
    .addEventListener('click', function () {
      modal.classList.remove('visible');
    });

  document
    .getElementById('update-state-submit')
    .addEventListener('click', function () {
      const functionCode = document.getElementById('function-input').value;
      try {
        localStorage.removeItem('stateContent');
        localStorage.setItem('stateContent', textArea.value);

        modal.classList.remove('visible');
        document.getElementById('function-input').value = '';
      } catch (error) {
        popupMessage.textContent = error.message;
        popupMessage.classList.add('error');
        setTimeout(() => {
          document.getElementById('popup-message').classList.remove('error');
        }, 1000);
      }
    });
}
