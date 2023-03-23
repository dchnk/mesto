import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, {clickOnSubmit, openPopupForm}) {
        super(popup);
        this._clickOnSubmit = clickOnSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._openPopupForm = openPopupForm;
        this._form = this._popup.querySelector('.popup__form');
    }
    
    _getInputValues = () => {        
        this._inputValuesList = {};
        this._inputList.forEach(element => {
            this._inputValuesList[element.getAttribute('name')] = element.value;
        });
    }
    
    setInputValues = (startedValuesList) => {
        this._inputList.forEach(element => {
            element.value = startedValuesList[element.getAttribute('name')];
        });
    }
    
    setEventListeners = () => {        
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmitClick)
    }
    
    _handleFormSubmitClick = () => {
        this._getInputValues();
        this._clickOnSubmit(this._inputValuesList);
        this.closePopup();
    }
    
    closePopup = () => {
        this._form.reset();
        super.closePopup();
    }
    
    openPopup = () => {
        this._openPopupForm();
        super.openPopup();
    }
}