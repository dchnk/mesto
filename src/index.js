import './index.css';
import {Card} from '../src/companents/Card.js';
import {FormValidator} from '../src/companents/FormValidator.js';
import { Section } from '../src/companents/Section.js';
import { PopupWithImage } from '../src/companents/PopupWithImage.js';
import { PopupWithForm } from '../src/companents/PopupWithForm.js';
import { UserInfo } from '../src/companents/UserInfo.js';
import {
initialCards,
validationSettings,
popupFullscreen,
cardTemplate,
cardsContainer,
profileHeading,
profileDescription,
formElementEdit,
profileEdit,
popupEdit,
popupCard,
buttonAddCard,
formElementCard,
formList
} from '../src/utils/constants.js';



// Создание карточки

const popupWithImage = new PopupWithImage(popupFullscreen);
const profileInfo = new UserInfo({profileHeading, profileDescription})

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


// Форма редактирования профиля

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