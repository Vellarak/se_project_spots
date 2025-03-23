const initialCards = [
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "A tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant Terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// profile element
const editProfileButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//form element
const editProfileModal = document.querySelector("#edit-modal");
const editFormElememt = editProfileModal.querySelector(".modal__form");
const editClosebutton = editProfileModal.querySelector(".modal__btn-close");
const editSubmitbutton = editProfileModal.querySelector(".modal__btn-submit");
const editNameInput = editProfileModal.querySelector("#name-input");
const editDescriptionInput = editProfileModal.querySelector("#description-input");

// card element
const cardModal = document.querySelector("#add-post-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalAddButton = document.querySelector(".profile__add-btn");
const cardModalCloseButton = cardModal.querySelector(".modal__btn-close");
const cardModalSubmitButton = cardModal.querySelector(".modal__btn-submit");
const cardNameInput = cardModal.querySelector("#add-name-input");
const cardLinkInput = cardModal.querySelector("#add-link-input");

// modal element
const modalPreview = document.querySelector("#modal-preview");
const modalButtonClosePreview = modalPreview.querySelector(".modal__btn-close_preview");
const modalImage = modalPreview.querySelector(".modal__image");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardsImage = document.querySelector(".card__image");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  const likeButton = cardElement.querySelector(".card__like-btn");
  likeButton.addEventListener ("click", () => {
    likeButton.classList.toggle("card__like-btn_liked")
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn")
  deleteButton.addEventListener("click", () => {
  cardElement.remove()});

  cardImageEl.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    openModal(modalPreview);
  });


  modalButtonClosePreview.addEventListener("click", () =>{
    closeModal(modalPreview);
  });

  return cardElement;
}
initialCards.forEach ((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});


//function open-close modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name:cardNameInput.value, link:cardLinkInput.value};
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
 }

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;
}

editProfileButton.addEventListener("click", () => {
  openModal(editProfileModal);
  editNameInput.value = profileName.textContent;
  editDescriptionInput.value = profileDescription.textContent;
});
editClosebutton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
editSubmitbutton.addEventListener("click", () =>{
  closeModal(editProfileModal);
});

// Form element
cardModalAddButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});


// Handler,form submit
editFormElememt.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit",handleCardSubmit);
