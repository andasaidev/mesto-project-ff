//открываем окно
export function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escFrom);
};
//функция на escape
function escFrom (evt) {
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
};
//закрываем окно
export function closePopup (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escFrom);
};
