export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit-error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const popupFullscreen = document.querySelector('.popup_type_fullscreen');
export const cardTemplate = document.querySelector('#content-element').content;
export const cardsContainer = document.querySelector('.elements');
export const profileHeading = document.querySelector('.profile__heading');
export const profileDescription = document.querySelector('.profile__description');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const profileEdit = document.querySelector('.profile__edit');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupCard = document.querySelector('.popup_type_card');
export const buttonAddCard = document.querySelector('.profile__add');
export const formElementCard = document.querySelector('.popup__form_type_card');
export const formList = document.querySelectorAll('.popup__form');
