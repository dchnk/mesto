import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validationSettings} from './constants.js';


const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#content-element').content;
const profileHeading = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_card');
const buttonAddCard = document.querySelector('.profile__add');
const photoNameInput = document.querySelector('.popup__input_type_photo-name');
const linkInput = document.querySelector('.popup__input_type_link');
const formElementCard = document.querySelector('.popup__form_type_card');
const popupList = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const formList = document.querySelectorAll('.popup__form');

// Создание карточки

const openPhotoPopup = (name, link) => {
    popupImage.src = link;
    popupImageName.textContent = name;
    popupImageName.alt = name;
    openPopup(popupFullscreen);
}

const createCard = (item) => {
    const card = new Card(item.name, item.link, cardTemplate, openPhotoPopup);
    const cardElement = card.generateCard();
    return cardElement;
};

const addCardAppend = (cardElement) => {
    cardsContainer.append(cardElement);
}

const addCardPrepend = (cardElement) => {
    cardsContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
    addCardAppend(createCard(item));
})

// Validator

const validators = {};

formList.forEach((item) => {
    const validator = new FormValidator(validationSettings, item);
    validators[item.getAttribute('name')] = validator;
    validator.enableValidation();
})


// // Сабмит в форме редактирования профиля

function handleEditFormSubmit () {
    profileHeading.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
}

// Правило закрытия на стрелочку для всех попапов

document.querySelectorAll('.popup__close').forEach(function (item) {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(closestPopup);
    })
});

// Закрыть попап по нажатию вне области контейнера 

popupList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target === item) {
            closePopup(item);
        }
    })
})

// // Callback для обработчика закрытия по нажатию на ESC

function handleCloseByEsc (evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }; 
}

// Открытие и закрытие попапов

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', handleCloseByEsc);
};

function closePopup(item) {    
    item.classList.remove('popup_opened');    
    document.removeEventListener('keydown', handleCloseByEsc);
};

// Сабмит добавления новой карточки новой карточки из формы

function addFormSubmit () {   
    const currentElement = {name: photoNameInput.value, link: linkInput.value};
    addCardPrepend(createCard(currentElement));
    closePopup(popupCard);
}

// EVENT LISTENERS

formElementEdit.addEventListener('submit', handleEditFormSubmit);

profileEdit.addEventListener("click", function() {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;
    validators[formElementEdit.getAttribute('name')].resetValidationState();
    openPopup(popupEdit);
});

buttonAddCard.addEventListener("click", function() {
    formElementCard.reset();
    validators[formElementCard.getAttribute('name')].resetValidationState();
    openPopup(popupCard);
});

formElementCard.addEventListener('submit', addFormSubmit);