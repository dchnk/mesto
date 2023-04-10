import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDelete } from '../components/PopupWithDelete.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';
import {
validationSettings,
popupFullscreen,
popupAvatar,
formElementAvatarEdit,
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
formList,
profileAvatar,
popupDelete,
avatarEditButton,
apiOptions
} from '../utils/constants.js';

// Объект Api

const api = new Api(apiOptions);

// Попап подтверждения удаления карточки

const popupTypeDelete = new PopupDelete(popupDelete, {clickOnSubmit: (item, id) => {    
    api.deleteItemRequest(id, () => {
        item.remove();
        item = null;
    })
}})

popupTypeDelete.setEventListeners();

// Профиль пользователя, запрос и размерещение информации о пользователе на странице

const profileInfo = new UserInfo({profileHeading, profileDescription, profileAvatar})

api.takeProfileInfoRequest((result) => {
    profileInfo.setUserInfo(result)
    })
;


// Создание секции под карточки, добавление карточек из сервера

const cardsFromServer = api.takeCardsRequset()

cardsFromServer.then((res) => {
    cardSection.renderItems(res)
})

const cardSection = new Section((item) => {
    const card = createCard(item);
    cardSection.setItemAppend(card);
}, cardsContainer)





// Попап fullscreen для карточки

const popupWithImage = new PopupWithImage(popupFullscreen);
popupWithImage.setEventListeners();


// Создание новой карточки

const createCard = (item) => {
    const card = new Card(item, cardTemplate, popupWithImage.openPopup, popupTypeDelete.openPopup,
        (item) => {
            api.switchLikeStatusRequest('PUT', item)
            .then(res => card.setLikesInfo(res.likes))
        }, (item) => {
            api.switchLikeStatusRequest('DELETE', item)
            .then(res => card.setLikesInfo(res.likes))
    }
    );    
    const currentCard = card.generateCard();
    return currentCard;
}


// Форма нового аватара


const popupAvatarEdit = new PopupWithForm(popupAvatar, {
    clickOnSubmit: (item) => {
        popupAvatarEdit.renderLoading(true, 'Сохранение...');        
        api.updateProfileInfoRequest(item)        
        .then((result) => {
            profileInfo.setUserInfo(result);
        })
        .finally(() => {
            popupAvatarEdit.renderLoading(false, 'Сохранить');
        })
    },
    
    openPopupForm: () => {
        validators[formElementAvatarEdit.getAttribute('name')].resetValidationState();
    }
    
});


popupAvatarEdit.setEventListeners();

avatarEditButton.addEventListener('click', function() {
    popupAvatarEdit.openPopup();
})

// Форма добавления новой карточки

const popupCardAdd = new PopupWithForm(popupCard, {
    clickOnSubmit: (item) => {
        popupCardAdd.renderLoading(true, 'Создание...');
        api.postNewCardRequest(item)
        .then((result) => {
            const card = createCard(result);
            cardSection.setItemPrepend(card)
        })
        .finally(() => {
            popupCardAdd.renderLoading(false, 'Создать');
        })        
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
        profileEditPopup.renderLoading(true, 'Сохранение...')
        api.editUserInfoRequet(item)
        .then((result) => {
            profileInfo.setUserInfo(result);
        })
        .finally(() => {
            profileEditPopup.renderLoading(false, 'Сохранить')
        })
        ;
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