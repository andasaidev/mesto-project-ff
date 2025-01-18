// находим в DOM место для карточек и темплейт карточки
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

//клонируем шаблон карточки, добавляем в нее изображение и описание. определяем кнопку удаления карточки, устанавливаем слушатель на кнопку.
function addCard((initialCards.name, initialCards.link), cardDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards.link;
  cardElement.querySelector('.card__title').textContent = initialCards.name;

  const cardDelete = cardContainer.querySelector('.card__delete-button');
  cardDelete.addEventListener('click', cardDelete);
  cardContainer.append(cardElement);
}
addCard();

//удаляем карточку
deleteButtonActive('click', cardDelete {
  cardDelete.closest('.card');
  cardDelete.remove();
});

//перебираем массив с карточками и загружаем карточки на страницу
function add() {
  initialCards.forEach(card) {
    cardContainer.append(addCard(addCard, deleteButtonActive));
  };
};