export const objectEnable = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


export class FormValidator {
  constructor(object, currentFormValidation) {
    this._object = object;
    this._currentFormValidation = currentFormValidation;
  }
  
  enableValidation() {
      this._submitDefault();
      this._findFormInputList();
      this._setEventListenersFormInput();
  };
  
  _submitDefault() {
    this._currentFormValidation.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }
  
  _findFormInputList = () => {
    this._inputList = Array.from(this._currentFormValidation.querySelectorAll(this._object.inputSelector));
  }
  
  _setEventListenersFormInput() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleInputEvent(input);
      })
    }) 
  }
  
  _handleInputEvent(input) {
    this._toggleButtonState();
    if (this._checkInput(input)) {
      this._showErrorMassage(input);
    } else {
      this._hideErrorMassage(input);
    }
  }
  
  _hasInvalidInput = (inputList) => {    
    return inputList.some((input) => {
      if (this._checkInput(input)) {
        return true;
      }
    })
  }
  
  _toggleButtonState() {    
    if (this._hasInvalidInput(this._inputList)) {
      this._addSubmitError();
    } else {
      this._removeSubmitError();
    }
  };
  
  _addSubmitError() {
    const buttonElement = this._currentFormValidation.querySelector(this._object.submitButtonSelector);
    buttonElement.classList.add(this._object.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  _removeSubmitError() {
    const buttonElement = this._currentFormValidation.querySelector(this._object.submitButtonSelector);
    buttonElement.classList.remove(this._object.inactiveButtonClass);
    buttonElement.disabled = false;
  }
  
  _checkInput(input) {
    if (!input.validity.valid) {
      return true;
    }
  }
  
  _showErrorMassage(input) {
    const errorElement = this._currentFormValidation.querySelector(`.${input.id}-error`);
    input.classList.add(this._object.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._object.errorClass);
  }
  
  _hideErrorMassage(input) {
    const errorElement = this._currentFormValidation.querySelector(`.${input.id}-error`);
    input.classList.remove(this._object.inputErrorClass);
    errorElement.classList.remove(this._object.errorClass);
    errorElement.textContent = '';
  }
}



