import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validationSettings} from './constants.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#content-element').content;
const profileHeading = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_card');
const buttonAddCard = document.querySelector('.profile__add');
const formElementCard = document.querySelector('.popup__form_type_card');
const formList = document.querySelectorAll('.popup__form');

// Создание карточки

const popupWithImage = new PopupWithImage(popupFullscreen);

const createCard = (item) => {
    const card = new Card(item, cardTemplate, popupWithImage.openPopup);
    const currentCard = card.generateCard();
    return currentCard;
}  

const cardSection = new Section({
    items: initialCards,
    renderer: (item => {
            const card = createCard(item);
            cardSection.setItemAppend(card);
        })
    }, cardsContainer);
    
cardSection.renderItems();

const popupCardAdd = new PopupWithForm(popupCard, {
    clickOnSubmit: (item) => {
        const card = createCard(item);
        cardSection.setItemPrepend(card)
    }, 
    closePopupForm: () => {
        formElementCard.reset();
    },
    
    openPopupForm: () => {
        validators[formElementCard.getAttribute('name')].resetValidationState();
    }
    
});

buttonAddCard.addEventListener("click", function() {
    popupCardAdd.openPopup();
});

// Validator

const validators = {};

formList.forEach((item) => {
    const validator = new FormValidator(validationSettings, item);
    validators[item.getAttribute('name')] = validator;
    validator.enableValidation();
})


// // Сабмит в форме редактирования профиля

const profileInfo = new UserInfo({profileHeading, profileDescription})


const profileEditPopup = new PopupWithForm(popupEdit, {
    clickOnSubmit: (item) => {
        profileInfo.setUserInfo(item);
    }, 
    closePopupForm: () => {
        
    },
    
    openPopupForm: () => {
        const currentInputValueList = profileInfo.getUserInfo();
        profileEditPopup.setInputValues(currentInputValueList)
        validators[formElementEdit.getAttribute('name')].resetValidationState();
    }
    
});

profileEdit.addEventListener("click", function() {
    
    profileEditPopup.openPopup();
});