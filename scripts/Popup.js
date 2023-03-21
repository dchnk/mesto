export class Popup {
    constructor(selector) {
        this._popup = selector;
        this._cross = this._popup.querySelector('.popup__close');
        
    }
    
    openPopup() {        
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    
    setEventListeners() {        
        this._popup.addEventListener('click', (evt) => {
            this._handleClickOverlayClose(evt);
        })
        
        this._cross.addEventListener('click', () => {
            this.closePopup();
        })
    }
    
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        };
    }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') () => {
            this.closePopup();
        };
    }
    
    _handleClickOverlayClose(evt) {
        if (evt.target === this._popup) {
            this.closePopup();
        }
    }
}

