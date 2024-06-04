import { POPUPMESSAGE_MODAL } from '../main.js';

export function setNotification(notification, type) {
  POPUPMESSAGE_MODAL.textContent = `${notification}`;
  POPUPMESSAGE_MODAL.classList.add(`${type}`);
  setTimeout(() => {
    POPUPMESSAGE_MODAL.classList.remove(`${type}`);
  }, 1000);
}
