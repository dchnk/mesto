import {initialCards, Card} from './Card.js';
import {FormValidator, objectEnable} from './FormValidator.js';


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
const buttonSubmitCard = popupCard.querySelector('.popup__submit');
const photoNameInput = document.querySelector('.popup__input_type_photo-name');
const linkInput = document.querySelector('.popup__input_type_link');
const formElementCard = document.querySelector('.popup__form_type_card');
const popupList = document.querySelectorAll('.popup');
const buttonEditForm = popupEdit.querySelector('.popup__submit');
const popupEditInputList = popupEdit.querySelectorAll('.popup__input');
const popupCardInputList = popupCard.querySelectorAll('.popup__input');
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

const renderCard = (item) => {
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
    addCardAppend(renderCard(item));
})

// Validator


formList.forEach((item) => {
    const validator = new FormValidator(objectEnable, item);
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
    addCardPrepend(renderCard(currentElement));
    closePopup(popupCard);
}

const hideInputErrors = (inputList) => {
    inputList.forEach((element) => {
        const errorElement = document.querySelector(`.${element.id}-error`);
        element.classList.remove(objectEnable.inputErrorClass);
        errorElement.classList.remove(objectEnable.errorClass);
        errorElement.textContent = '';       
    }); 
}


// EVENT LISTENERS

formElementEdit.addEventListener('submit', handleEditFormSubmit);

profileEdit.addEventListener("click", function() {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;    
    hideInputErrors(popupEditInputList);   
    buttonEditForm.disabled = false;
    buttonEditForm.classList.remove(objectEnable.inactiveButtonClass)
    openPopup(popupEdit);
});



buttonAddCard.addEventListener("click", function() {
    formElementCard.reset();
    buttonSubmitCard.disabled = true;
    buttonSubmitCard.classList.add(objectEnable.inactiveButtonClass)
    hideInputErrors(popupCardInputList);
    openPopup(popupCard);
});

formElementCard.addEventListener('submit', addFormSubmit);