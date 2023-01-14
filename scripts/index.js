// Open/Close POPUP

const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

function openPopup() {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
};

function closePopup() {    
    popup.classList.remove('popup_opened');
};

profileEdit.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);


// Take input value from profile

let profileHeading = document.querySelector('.profile__heading');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');



// Send new values for profile from editForm

let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault();    
    
    let currentInputName = nameInput.value;    
    let currentInputJob = jobInput.value;
    
    profileHeading.textContent = currentInputName;
    profileDescription.textContent = currentInputJob;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);