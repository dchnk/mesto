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

class Card {
  constructor(cardName, cardLink, templateElement, onPhotoClick) {
    this._onPhotoClick = onPhotoClick;
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateElement = templateElement;
  }
  
  _getTempalte() {
    const cardElement = this._templateElement
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTempalte();
    this._setEventListeners();
    
    const elementHeadnig = this._element.querySelector('.element__heading');
    const elementPhoto = this._element.querySelector('.element__photo');
    elementHeadnig.textContent = this._cardName;
    elementPhoto.alt = this._cardName;
    elementPhoto.src = this._cardLink;
    
    return this._element;
  }
  
  
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleButtonLikeClick();
    });
    
    this._element.querySelector('.element__bin').addEventListener('click', () => {
      this._handleButtonBinClick();
    });
    
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handlePhotoClick();
    });
  }
  
  _handleButtonLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  
  _handleButtonBinClick() {
    this._element.remove();
  }
  
  _handlePhotoClick() {    
    this._onPhotoClick(this._cardName, this._cardLink);
  }
}



export { initialCards, Card };