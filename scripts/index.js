const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#content-element').content;
const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
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


// Функция создания карточки из темплейта

function addCard(cardName, cardLink) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elementHeadnig = cardElement.querySelector('.element__heading');
    const elementPhoto = cardElement.querySelector('.element__photo');    
    elementHeadnig.textContent = cardName;
    elementPhoto.alt = cardName;
    elementPhoto.src = cardLink;
    cardElement.querySelector('.element__bin').addEventListener('click', function (e) {
        e.target.closest('.element').remove();
    });
    elementPhoto.addEventListener('click', function () {
        openFullscreen(cardName, cardLink);
    });
    cardElement.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
    })
    return currentElement = cardElement;
}

// Добавление созданных карточек из массива на станицу

function renderElements(arr){ 
    arr.map(function (item) {    
        addCard(item.name, item.link)
        cardsContainer.append(currentElement);
    });
}

renderElements(initialCards);

// Сабмит в форме редактирования профиля

function handleEditFormSubmit (evt) {    
    profileHeading.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value
    closePopup(popupEdit);
}

// Открыть картинку из карточки на полное окно

function openFullscreen (name, link) {
    popupImage.src = link;
    popupImageName.textContent = name;
    popupImageName.alt = name;
    openPopup(popupFullscreen);
};

// Правило закрытия на стрелочку для всех попапов

document.querySelectorAll('.popup__close').forEach(function (item) {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(closestPopup);
    })
});

// Закрыть попап при помощи Ecs



// Закрыть попап по нажатию вне области контейнера 

popupList.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target === item) {
            closePopup(item);
        }
    })
})

// document.addEventListener('keydown', (evt) => {
//     popupList.forEach((item) => {
//         if (evt.key === 'Escape' && item.classList.contains('popup_opened')) {
//             closePopup(item);
//         }
//     })
// }) 

// Callback для обработчика закрытия по нажатию на ESC

function checkEvt (evt) {
    popupList.forEach((item) => {
        if (evt.key === 'Escape' && item.classList.contains('popup_opened')) {
            closePopup(item);
        };
    })   
}

// Открытие и закрытие попапов

function openPopup(item) {
    item.classList.add('popup_opened');

    if (item === popupEdit) {
        const buttonEditForm = popupEdit.querySelector('.popup__submit');
        buttonEditForm.disabled = false;
        buttonEditForm.classList.remove('popup__submit-error');
    } else if (item === popupCard) {
        const buttonAddCard = popupCard.querySelector('.popup__submit');
        buttonAddCard.disabled = true;
        buttonAddCard.classList.add('popup__submit-error');
    }

    document.addEventListener('keydown', checkEvt);
};

function closePopup(item) {    
    item.classList.remove('popup_opened');    

    if (item === popupEdit) {    
        popupEdit.querySelectorAll('.popup__input').forEach((element) => {
            const currentForm = item.querySelector('.popup__form');
            hideInputError(currentForm, element);              
        })
    }
    
    document.removeEventListener('keydown', checkEvt);
};

// Сабмит добавления новой карточки новой карточки из формы

function addFormSubmit () {   
    addCard(photoNameInput.value, linkInput.value);
    cardsContainer.prepend(currentElement);
    closePopup(popupCard);
}

// EVENT LISTENERS

formElementEdit.addEventListener('submit', handleEditFormSubmit);

profileEdit.addEventListener("click", function() {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
});

buttonAddCard.addEventListener("click", function() {
    formElementCard.reset();
    openPopup(popupCard);
});

formElementCard.addEventListener('submit', addFormSubmit);