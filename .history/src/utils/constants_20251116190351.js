// Selectors for profile elements
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileEditPopup = document.querySelector(
  ".popup_type_edit-profile"
);
export const profileEditForm = profileEditPopup.querySelector(".popup__form");

// Selectors for new post elements
export const newPostButton = document.querySelector(".profile__add-button");
export const newPostPopup = document.querySelector(".popup_type_new-post");
export const newPostForm = newPostPopup.querySelector(".popup__form");

// Selectors for all form inputs
export const nameInput = profileEditForm.querySelector("#profile-name-input");
export const descriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
export const placeNameInput = newPostForm.querySelector("#place-name-input");
export const placeLinkInput = newPostForm.querySelector("#place-link-input");

// Selector for card list c
