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
const addCardButton = document.querySelector('.profile__add');
const photoNameInput = document.querySelector('.popup__input_type_photo-name');
const linkInput = document.querySelector('.popup__input_type_link');
const formElementCard = document.querySelector('.popup__form_type_card');
const listPopup = document.querySelectorAll('.popup');


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
    cardElement.querySelector('.element__photo').addEventListener('click', function (e) {
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

function editFormSubmit (evt) {
    evt.preventDefault();    
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

document.addEventListener('keydown', (evt) => {
    listPopup.forEach((item) => {
        if (evt.key === 'Escape') {
            closePopup(item)
        }
    })
})

// Закрыть попап по нажатию вне области контейнера 

listPopup.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target === item) {
            closePopup(item);
        }
    })
})

// Открытие и закрытие попапов

function openPopup(item) {
    item.classList.add('popup_opened');    
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit-error',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
      });
};

function closePopup(item) {    
    item.classList.remove('popup_opened');
    const currentForm = item.querySelector('.popup__form');
    console.log(currentForm);

    currentForm.querySelectorAll('.popup__input').forEach((element) => {
        console.log(element)
        hideInputError(currentForm, element);
    })
};

// Сабмит добавления новой карточки новой карточки из формы

function addFormSubmit () {   
    addCard(photoNameInput.value, linkInput.value);
    cardsContainer.prepend(currentElement);
    closePopup(popupCard);
}

// EVENT LISTENERS

formElementEdit.addEventListener('submit', editFormSubmit);

profileEdit.addEventListener("click", function() {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
});

addCardButton.addEventListener("click", function() {
    formElementCard.reset();
    openPopup(popupCard);
});

formElementCard.addEventListener('submit', addFormSubmit);