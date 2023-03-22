import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
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
} from '../utils/constants.js';



const profileInfo = new UserInfo({profileHeading, profileDescription})


// Создание карточки

// Попап fullscreen для карточки

const popupWithImage = new PopupWithImage(popupFullscreen);
popupWithImage.setEventListeners();

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

// Форма добавления новой карточки

const popupCardAdd = new PopupWithForm(popupCard, {
    clickOnSubmit: (item) => {
        const card = createCard(item);
        cardSection.setItemPrepend(card)
    },
    
    openPopupForm: () => {
        validators[formElementCard.getAttribute('name')].resetValidationState();
    }
    
});

popupCardAdd.setEventListeners();

buttonAddCard.addEventListener("click", function() {
    popupCardAdd.openPopup();
});

// Форма редактирования профиля

const profileEditPopup = new PopupWithForm(popupEdit, {
    clickOnSubmit: (item) => {
        profileInfo.setUserInfo(item);
    },
    
    openPopupForm: () => {
        const currentInputValueList = profileInfo.getUserInfo();
        profileEditPopup.setInputValues(currentInputValueList)
        validators[formElementEdit.getAttribute('name')].resetValidationState();
    }
    
});

profileEditPopup.setEventListeners();

profileEdit.addEventListener("click", function() {    
    profileEditPopup.openPopup();
});

// Validator

const validators = {};

formList.forEach((item) => {
    const validator = new FormValidator(validationSettings, item);
    validators[item.getAttribute('name')] = validator;
    validator.enableValidation();
})