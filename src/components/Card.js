export class Card {
  constructor({link, name}, templateElement, onPhotoClick) {
    this._onPhotoClick = onPhotoClick;
    this._cardName = name;
    this._cardLink = link;
    this._templateElement = templateElement;    
  }
  
  _getTemplate() {
    const cardElement = this._templateElement
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._elementHeadnig = this._element.querySelector('.element__heading');
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementBin = this._element.querySelector('.element__bin');
    this._elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();
    
    
    this._elementHeadnig.textContent = this._cardName;
    this._elementPhoto.alt = this._cardName;
    this._elementPhoto.src = this._cardLink;
    
    return this._element;
  }
  
  
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleButtonLikeClick();
    });
    
    this._elementBin.addEventListener('click', () => {
      this._handleButtonBinClick();
    });
    
    this._elementPhoto.addEventListener('click', () => {
      this._handlePhotoClick();
    });
  }
  
  _handleButtonLikeClick() {
    this._elementLike.classList.toggle('element__like_active');
  }
  
  _handleButtonBinClick() {
    this._element.remove();
    this._element = null;
  }
  
  _handlePhotoClick() {    
    this._onPhotoClick(this._cardName, this._cardLink);
  }
}