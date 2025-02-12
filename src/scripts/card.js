//клонируем шаблон карточки, добавляем в нее изображение и описание. определяем кнопку удаления карточки, устанавливаем слушатель на кнопку.

export function createCard (cardData, {deleteCard, likeCard, showCard}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);

  if (showCard) {
    cardImage.addEventListener("click", function () {
      showCard(cardData);
    })
  }
  return cardElement;
};

export function handleDeleteCard(evt){
  evt.target.closest(".card").remove();
};

export function handleLikeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active")
  }};

