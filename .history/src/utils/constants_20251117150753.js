// ===============================
// constants.js
// All shared selectors + settings
// ===============================

// ----- Profile -----
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileEditButton = document.querySelector(".profile__edit-btn");
export const profileEditPopup = document.querySelector("#edit-profile-modal");
export const profileEditForm = profileEditPopup.querySelector(".modal__form");

// Profile form inputs
export const nameInput = document.querySelector("#profile-name-input");
export const descriptionInput = document.querySelector(
  "#profile-description-input"
);

// ----- New Post -----
export const newPostButton = document.querySelector(".profile__add-btn");
export const newPostPopup = document.querySelector("#new-post-modal");
export const newPostForm = newPostPopup.querySelector(".modal__form");

// New post inputs
export const placeNameInput = document.querySelector("#new-post-title-input");
export const placeLinkInput = document.querySelector("#new-post-url-input");

// ----- Shared lists -----
export const cardsContainer = document.querySelector(".cards__list");

// ----- Validation Settings -----
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
