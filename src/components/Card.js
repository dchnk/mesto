export class Card {
  constructor(item, templateElement, onPhotoClick, onBinClick, onLikeClick, onUnlikeClick) {
    this._item = item;
    this._usersLiked = item.likes;
    this._onPhotoClick = onPhotoClick;
    this._onLikeClick = onLikeClick;
    this._onUnlikeClick = onUnlikeClick;
    this._ownerId = item.owner._id;
    this._onBinClick = onBinClick;
    this._cardLikes = item.likes;
    this._cardName = item.name;
    this._cardLink = item.link;
    this._templateElement = templateElement;
    this._isLike = false;
  }

  _toggleLike = () => {
    this._isLike = !this._isLike;
  }

  _getTemplate() {
    const cardElement = this._templateElement
    .querySelector('.element')
    .cloneNode(true);
    
    if (this._ownerId && this._ownerId != "7da823c1ab8e37c03f014c24") {
      cardElement.querySelector('.element__bin').remove()
    };

    if (this._checkLike()) {
      cardElement.querySelector('.element__like').classList.add('element__like_active');
    }

    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._elementHeadnig = this._element.querySelector('.element__heading');
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementBin = this._element.querySelector('.element__bin');    
    this._elementLike = this._element.querySelector('.element__like');
    this._elementCurrentLikes = this._element.querySelector('.element__current-likes');
    this._setEventListeners();
    
    
    this._elementHeadnig.textContent = this._cardName;
    this._elementPhoto.alt = this._cardName;
    this._elementPhoto.src = this._cardLink;
    
    this._elementCurrentLikes.textContent = this._cardLikes.length;
     
    
    return this._element;
  }
  
  setLikesInfo = (likes) => {
    this._likes = likes;
    this._elementCurrentLikes.textContent = this._likes.length;
  }

  _checkLike = () => {
    return this._usersLiked.some((user) => {
      return this._findUserLike(user)
    })
}

_findUserLike = (user) => {
  if (user._id === "7da823c1ab8e37c03f014c24") {
    return this._isLike = true;
  }
}
  
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleButtonLikeClick();
      if (this._isLike) {
        this._onUnlikeClick(this._item);
        this._toggleLike();
      } else {
        this._onLikeClick(this._item);
        this._toggleLike();
      }
      
      this.setLikesInfo;
    });

    if (this._elementBin) {
      this._elementBin.addEventListener('click', () => {
        this._onBinClick(this._element, this._item._id);
      });
    }
       
    
    this._elementPhoto.addEventListener('click', () => {
      this._handlePhotoClick();
    });
  }
  
  _handleButtonLikeClick() {
    this._elementLike.classList.toggle('element__like_active');    
  }

  _handlePhotoClick() {    
    this._onPhotoClick(this._cardName, this._cardLink);
    
  }
}