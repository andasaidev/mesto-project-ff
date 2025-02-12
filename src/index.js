//импорт стилей и функций js
import './pages/index.css';

import { initialCards } from './scripts/cards.js'; 
import { createCard, handleDeleteCard, handleLikeCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

//поиск карточек и модальных окон
const cardContainer = document.querySelector(".places__list");
const popupWindows = Array.from(document.querySelectorAll(".popup"));

//окно и формы редактирование профиля
const editWindow = document.querySelector(".popup_type_edit");
const editForm = editWindow.querySelector(".popup__form");
const editNameInput = document.querySelector(".popup__input_type_name");
const editDescriptionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//окно и формы добавления карточек
const cardWindow = document.querySelector(".popup_type_new-card");
const cardForm = cardWindow.querySelector(".popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const cardPopup = document.querySelector(".popup_type_image");
const imagePopup = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

//кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");


//присваиваем анимацию, функции закрытия и открытия карточке
popupWindows.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//функция открытия карточки с изображением
function handleShowCard ( cardData ){
  imagePopup.src = cardData.link;
  imagePopup.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(cardPopup);
};

//работа с формой редактирования профиля
function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
  closePopup(editWindow);
};

profileEditButton.addEventListener("click", function () {
  openPopup(editWindow);
});

//работаем с формой добавления карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault(); 
  cardContainer.prepend(
    createCard(
      { name: cardNameInput.value,
        link: cardUrlInput.value,
      },
      {
        showCard: handleShowCard,
        deleteCard: handleDeleteCard,
        likeCard: handleLikeCard,
      }
    )
  );
  closePopup(cardWindow);
  editForm.reset();
};

addButton.addEventListener("click", function () {
  openPopup(cardWindow);
});

editForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

//содержимое карточки с импортированным массивом и функциями открытия, закрытия и лайка
initialCards.forEach((cardData) => {
  cardContainer.append (
    createCard(cardData, {
      showCard: handleShowCard,
      deleteCard: handleDeleteCard,
      likeCard: handleLikeCard,
 }));
});








