import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageName = this._popup.querySelector('.popup__image-name');
    }
    
    openPopup = (name, link) => {
        this._popupImage.src = link;
        this._popupImageName.textContent = name;
        this._popupImageName.alt = name;
        super.openPopup()
    }
}