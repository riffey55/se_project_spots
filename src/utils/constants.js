// ==============================
// constants.js
// Centralized selectors + config
// ==============================

// Profile Inputs (Edit Profile Modal)
export const profileNameInput = document.getElementById("profile-name-input");
export const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);

// New Post Inputs (Add Card Modal)
export const placeNameInput = document.getElementById("new-post-title-input");
export const placeLinkInput = document.getElementById("new-post-url-input");

// Buttons
export const profileEditButton = document.querySelector(".profile__edit-btn");
export const newPostButton = document.querySelector(".profile__add-btn");

// Popups / Forms
export const profileEditForm = document.querySelector(
  "#edit-profile-modal .modal__form"
);
export const newPostForm = document.querySelector(
  "#new-post-modal .modal__form"
);

export const profileEditPopup = document.getElementById("edit-profile-modal");
export const newPostPopup = document.getElementById("new-post-modal");

// ==============================
// Validation Settings
// ==============================
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
