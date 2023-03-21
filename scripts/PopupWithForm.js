import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, {clickOnSubmit, closePopupForm, openPopupForm}) {
        super(selector);
        this._clickOnSubmit = clickOnSubmit;
        this._inputList = selector.querySelectorAll('.popup__input');
        this._closePopupForm = closePopupForm;
        this._openPopupForm = openPopupForm;
        this._form = selector.querySelector('.popup__form');
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
        this._closePopupForm();
        super.closePopup();
    }
    
    openPopup = () => {
        this._openPopupForm();
        super.openPopup();
    }
}