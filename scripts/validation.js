const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn-submit",
  inactiveButtonClass: "modal__btn-submit_type_error",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const showInputError = (formElement, inputElement,errorMsg,config) =>{
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorMsgEl.textContent = errorMsg;
}

const hideInputError = (formElement, inputElement,config) =>{
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorMsgEl.textContent = "";
}
const checkInputValidity = (formElement, inputElement,config) =>{
if (!inputElement.validity.valid){
  showInputError(formElement, inputElement, inputElement.validationMessage,config);
} else {hideInputError(formElement,inputElement,config);}
};

const hasInputValidity = (inputList) =>{
  return inputList.some((input) =>{
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) =>{
  if (hasInputValidity(inputList)){
    disabledButton(buttonElement,config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disabledButton = (buttonElement, config) =>{
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formElement,inputList) => {
  inputList.forEach((input) =>{
    hideInputError(formElement,input,settings);
  });
};

const setEventListeners = (formElement, config) =>{
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement,config);
      toggleButtonState(inputList,buttonElement, config);
    });
  });

}

const enableValidation =(config) =>{
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement)=>{
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
