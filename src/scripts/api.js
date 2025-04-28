const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    Authorization: "6427b2f0-a95a-433e-9ead-660cf5875508",
    "Content-Type": "application/json",
  },
};

//функция выведения ошибки
function getErrorMessage(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//GET. Загрузка информации о пользователе с сервера
function getUserProfile() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(getErrorMessage);
}

//GET. Загрузка карточек с сервера
function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(getErrorMessage);
}

//PATCH. Редактирование профиля
function editProfile(name, about) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    }),
  }).then(getErrorMessage);
}

//POST. Добавление новой карточки
function addInitialCards(cardName, cardLink) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`,
    }),
  }).then(getErrorMessage);
}

//'PUT' + 'DELETE'. Постановка и снятие лайка.
function addlikeCard(_id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(getErrorMessage);
}

function deleteLikeCard(_id) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getErrorMessage);
}

//удаление карточки

function deleteCard(_id) {
  return fetch(`${apiConfig.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getErrorMessage);
}

function updateAvatar(_id) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(getErrorMessage);
}

export {
  getUserProfile,
  getInitialCards,
  editProfile,
  addInitialCards,
  addlikeCard,
  deleteLikeCard,
  deleteCard,
  updateAvatar,
};
