//функция загрузки кнопки
export function getCardTemplate () {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".card").cloneNode(true);
}

export function setButtonLoading(button, isSaving) {
  if (isSaving) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}
