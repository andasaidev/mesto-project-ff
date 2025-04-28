//импорт стилей и функций js
import "./pages/index.css";

import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./scripts/validation.js";
import {
  getUserProfile,
  getInitialCards,
  editProfile,
  addInitialCards,
  updateAvatar,
} from "./scripts/api.js";
import {setButtonLoading} from "./scripts/utilits.js"

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

//работа с аватаром
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms("avatar-form");
const avatarUrlInput = document.querySelector(".popup__input_type_avatar-url");
const profileImage = document.querySelector(".profile__image");

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
const avatarEditButton = document.querySelector(".profile__avatar-edit");

let currentUserId = null;

//загрузка данных о пользователе+карточки
Promise.all([getUserProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cards.forEach((cardData) => {
      cardContainer.append(
        createCard(
          cardData,
          {
            showCard: handleShowCard,
            deleteCard: handleDeleteCard,
            likeCard: handleLikeCard,
          },
          userData._id
        )
      );
    });
  })
  .catch((err) => {
    console.log("Ошибка в загрузке данных: ", err);
  });

 

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
function handleShowCard(cardData) {
  imagePopup.src = cardData.link;
  imagePopup.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(cardPopup);
}

enableValidation(validationConfig);

//работа с формой редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  setButtonLoading(submitButton, true);

  editProfile(editNameInput.value, editDescriptionInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editWindow);
    })
    .catch((err) => {
      console.log("Ошибка обновления профиля: ", err);
    })
    .finally(() => {
      setButtonLoading(submitButton, false);
    });
}

profileEditButton.addEventListener("click", function () {
  openPopup(editWindow);
  clearValidation(editForm, validationConfig);
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});

//работаем с формой добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  setButtonLoading(submitButton, true);

  addInitialCards(cardNameInput.value, cardUrlInput.value)
    .then((newCard) => {
      clearValidation(cardForm, validationConfig);
      newCard.owner = { _id: currentUserId };
      cardContainer.prepend(
        createCard(
          newCard,
          {
            showCard: handleShowCard,
            deleteCard: handleDeleteCard,
            likeCard: handleLikeCard,
          },
          currentUserId
        )
      );
      closePopup(cardWindow);
      cardForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки: ", err);
    })
    .finally(() => {
      setButtonLoading(submitButton, false);
    });
}

addButton.addEventListener("click", function () {
  openPopup(cardWindow);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
});


avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  setButtonLoading(submitButton, true);

  updateAvatar(avatarUrlInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка обновления: ", err);
    })
    .finally(() => {
      setButtonLoading(submitButton, false);
    });
});

editForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
