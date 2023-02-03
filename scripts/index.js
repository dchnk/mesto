// CardsArray

const initialCards = [
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

// Создаем карточки из стандартного массива

const cardsContainer = document.querySelector('.elements');

function addCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#content-element').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
    cardElement.querySelector('.element__heading').textContent = cardName;
    cardElement.querySelector('.element__photo').alt = cardName;
    cardElement.querySelector('.element__photo').src = cardLink;
    cardElement.querySelector('.element__bin').addEventListener('click', function (e) {
        e.target.closest('.element').remove();
    });
    cardElement.querySelector('.element__photo').addEventListener('click', function (e) {
        openFullscreen(cardName, cardLink);
    });
    cardElement.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
    })
    cardsContainer.append(cardElement);
}

initialCards.map(function (item) {
    addCard(item.name, item.link)
});

// POPUP OPEN/CLOSE

document.querySelectorAll('.popup__close').forEach(function (item) {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', function() {
    
        closePopup(closestPopup);
    })
});

function openPopup(item) {
    item.classList.add('popup_opened');
};

function closePopup(item) {    
    item.classList.remove('popup_opened');
};

// POPUP EDIT

const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');

profileEdit.addEventListener("click", function(e) {
   if (e.target === profileEdit) {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
   }
});

// Take input value from profile

const profileHeading = document.querySelector('.profile__heading');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');



// Send new values for profile from editForm

let formElementEdit = document.querySelector('.popup__form_type_edit');

// Обработчик «отправки» формы
function editFormSubmit (evt) {
    evt.preventDefault();
    
    let currentInputName = nameInput.value;    
    let currentInputJob = jobInput.value;
    
    profileHeading.textContent = currentInputName;
    profileDescription.textContent = currentInputJob;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', editFormSubmit);


// POPUP CARD

const popupCard = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('.profile__add');

addCardButton.addEventListener("click", function(e) {
    if (e.target === addCardButton) {
      photoNameInput.value = "";
      linkInput.value = "";
      openPopup(popupCard);
    }
});

const photoNameInput = document.querySelector('.popup__input_type_photo-name');
const linkInput = document.querySelector('.popup__input_type_link');

let formElementCard = document.querySelector('.popup__form_type_card');

function addFormSubmit (evt) {
    evt.preventDefault();
    
    let currentInputPhotoName = photoNameInput.value;    
    let currentInputLink = linkInput.value;
    addNewCard(currentInputPhotoName, currentInputLink);
    closePopup(popupCard);
}

function addNewCard(cardName, cardLink) {
    const cardTemplate = document.querySelector('#content-element').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
    cardElement.querySelector('.element__heading').textContent = cardName;
    cardElement.querySelector('.element__photo').alt = cardName;
    cardElement.querySelector('.element__photo').src = cardLink;
    cardElement.querySelector('.element__photo').addEventListener('click', function (e) {
        openFullscreen(cardName, cardLink);
    });
    cardElement.querySelector('.element__bin').addEventListener('click', function (e) {
        e.target.closest('.element').remove();
    });
    cardElement.querySelector('.element__like').addEventListener('click', function (e) {
        e.target.classList.toggle('element__like_active');
    });
    cardsContainer.prepend(cardElement);
}

formElementCard.addEventListener('submit', addFormSubmit);


// POPUP fullscreen

const popupFullscreen = document.querySelector('.popup_type_fullscreen');


function openFullscreen (name, link) {
    document.querySelector('.popup__image').src = link;
    document.querySelector('.popup__image-name').textContent = name;
    document.querySelector('.popup__image').alt = name;
    openPopup(popupFullscreen);
};