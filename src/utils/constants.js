export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit-error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const popupFullscreen = document.querySelector('.popup_type_fullscreen');
export const formElementAvatarEdit = document.querySelector('.popup__form_type_avatar-edit');
export const popupAvatar = document.querySelector('.popup_type_avatar-edit');
export const cardTemplate = document.querySelector('#content-element').content;
export const cardsContainer = document.querySelector('.elements');
export const profileHeading = document.querySelector('.profile__heading');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileDescription = document.querySelector('.profile__description');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const profileEdit = document.querySelector('.profile__edit');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupCard = document.querySelector('.popup_type_card');
export const buttonAddCard = document.querySelector('.profile__add');
export const formElementCard = document.querySelector('.popup__form_type_card');
export const formList = document.querySelectorAll('.popup__form');
export const popupDelete = document.querySelector('.popup_type_delete');
export const avatarEditButton = document.querySelector('.profile__avatar-container');
export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '8b5ce6ac-6e12-421c-817d-df9ee5426c25',
    'Content-Type': 'application/json'
  }
}
