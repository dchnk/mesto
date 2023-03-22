import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImage = selector.querySelector('.popup__image');
        this._popupImageName = selector.querySelector('.popup__image-name');
    }
    
    openPopup = (name, link) => {
        this._popupImage.src = link;
        this._popupImageName.textContent = name;
        this._popupImageName.alt = name;
        super.openPopup()
    }
}