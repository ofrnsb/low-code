export function setNotification(notification) {
  POPUPMESSAGE_MODAL.textContent = `${notification}`;
  POPUPMESSAGE_MODAL.classList.add('error');
  setTimeout(() => {
    POPUPMESSAGE_MODAL.classList.remove('error');
  }, 1000);
}
