export class FormValidator {
  constructor(validationSettings, currentFormValidation) {
    this._validationSettings = validationSettings;
    this._currentFormValidation = currentFormValidation;
  }
  
  enableValidation() {
      this._findButtonSubmit();
      this._findFormInputList();
      this._submitDefault();      
      this._setInputsEventListeners();
  };
  
  resetValidationState() {
    this._inputList.forEach((input) => {
      this._hideErrorMassage(input);      
    })
    this._toggleButtonState();
  }

  _submitDefault() {
    this._currentFormValidation.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }
  
  _findFormInputList = () => {
    this._inputList = Array.from(this._currentFormValidation.querySelectorAll(this._validationSettings.inputSelector));
  }
  
  _findButtonSubmit = () => {
    this._buttonElement = this._currentFormValidation.querySelector(this._validationSettings.submitButtonSelector);
  }
  
  _setInputsEventListeners() {
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
  
  _hasInvalidInput = () => {    
    return this._inputList.some((input) => {      
      return this._checkInput(input);
    })
  }
  
  _toggleButtonState() {    
    if (this._hasInvalidInput()) {
      this._addSubmitError();
    } else {
      this._removeSubmitError();
    }
  };
  
  _addSubmitError() {
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  
  _removeSubmitError() {
    this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  
  _checkInput(input) {
    if (!input.validity.valid) {
      return true;
    }
  }
  
  _showErrorMassage(input) {
    const errorElement = this._currentFormValidation.querySelector(`.${input.id}-error`);
    input.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }
  
  _hideErrorMassage(input) {
    const errorElement = this._currentFormValidation.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }
}