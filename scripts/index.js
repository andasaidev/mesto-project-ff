// находим в DOM место для карточек и темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
//клонируем шаблон карточки, добавляем в нее изображение и описание. определяем кнопку удаления карточки, устанавливаем слушатель на кнопку.
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
};
//удаляем карточку
function handleDeleteCard(evt){
  evt.target.closest(".card").remove();
};
//перебираем массив с карточками и загружаем карточки на страницу
initialCards.forEach((dataCard) => {
  const cardElement = createCard(dataCard, handleDeleteCard);
  cardContainer.append(cardElement);
});