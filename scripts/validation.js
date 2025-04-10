const showInputError = (formElement, inputElement,errorMsg) =>{
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("modal__input_type_error");
  errorMsgEl.textContent = errorMsg;
}

const hideInputError = (formElement, inputElement) =>{
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorMsgEl.textContent = "";
}
const checkInputValidity = (formElement, inputElement) =>{
if (!inputElement.validity.valid){
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {hideInputError(formElement,inputElement);}
};

const hasInputValidity = (inputList) =>{
  return inputList.some((input) =>{
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) =>{
  if (hasInputValidity(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__btn-submit_type_error");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__btn-submit_type_error");
  }

};



const setEventListeners = (formElement) =>{
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__btn-submit");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });

}

const enableValidation =() =>{
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement)=>{
    setEventListeners(formElement);
  });
};

enableValidation();
