import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
    constructor(popup, {clickOnSubmit}) {
        super(popup);
        this._clickOnSubmit = clickOnSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }
    
    openPopup = (itemForDelete, itemId) => {
        super.openPopup();
        this._itemForDelete = itemForDelete;
        this._itemId = itemId;
    }

    setEventListeners = () => {        
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleClickOnSubmit)
    }

    _handleClickOnSubmit = () => {
        this._clickOnSubmit(this._itemForDelete, this._itemId);
        super.closePopup()
    }

    
}