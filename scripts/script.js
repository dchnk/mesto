// Open/Close POPUP

const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

function openPopup() {
    popupInputs[0].value = profileHeading.textContent;
    popupInputs[1].value = profileDescription.textContent;
    popup.classList.add('popup_opened');
};

function closePopup() {
    popupInputs[0].value = " ";
    popupInputs[1].value = " ";
    popup.classList.remove('popup_opened');
};

profileEdit.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);


// Take input value from profile

let profileHeading = document.querySelector('.profile__heading');
let profileDescription = document.querySelector('.profile__description');
let popupInputs = document.querySelectorAll('.pupup__input');



// Send new values for profile from editForm

let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault();    
    
    let currentInputName = popupInputs[0].value;    
    let currentInputJob = popupInputs[1].value;
    
    profileHeading.textContent = currentInputName;
    profileDescription.textContent = currentInputJob;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);