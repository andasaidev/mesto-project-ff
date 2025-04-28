//клонируем шаблон карточки, добавляем в нее изображение и описание. определяем кнопку удаления карточки, устанавливаем слушатель на кнопку.
import { getCardTemplate } from "./utilits";
import { addlikeCard, deleteLikeCard, deleteCard } from "./api";

export function createCard(
  cardData,
  { deleteCard, likeCard, showCard },
  currentUserId
) {
  const cardElement = getCardTemplate();
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  likeButton.addEventListener("click", (evt) =>
    likeCard(evt, cardData._id, likeCounter)
  );

  if (cardData.likes) {
    likeCounter.textContent = cardData.likes.length;
  } else {
    likeCounter.textContent = 0;
  }

  const isLiked = cardData.likes && cardData.likes.some(like => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active")
  }
  const isCardOwner = cardData.owner && cardData.owner._id === currentUserId;
  if (isCardOwner) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement, cardData._id);
    });
  } else {
    deleteButton.style.display = "none";
  }

  if (showCard) {
    cardImage.addEventListener("click", function () {
      showCard(cardData);
    });
  }
  return cardElement;
}

export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(function () {
      cardElement.remove();
    })
    .catch(function (err) {
      console.error("Ошибка удаления карточки: ", err);
    });
}

export function handleLikeCard(evt, cardId, likeCounter) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLikeCard(cardId)
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch(console.error);
  } else {
    addlikeCard(cardId)
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch(console.error);
  }
}
