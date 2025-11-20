// scripts/index.js
// Author: Beren Riffey
// Clean Project 9 version

// =======================
// 1) Imports & API setup
// =======================
import Api from "../scripts/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9ce75f8c-fb4b-4b90-b371-0e651f23de61",
    "Content-Type": "application/json",
  },
});

import "./index.css";
import "../blocks/header.css";
import "../blocks/profile.css";
import "../blocks/page.css";
import "../blocks/cards.css";
import "../blocks/card.css";
import "../blocks/content.css";
import "../blocks/modal.css";
import "../blocks/footer.css";
import "../vendor/normalize.css";
import "../vendor/fonts.css";

import {
  enableValidation,
  resetFormValidation,
} from "../scripts/validation.js";
import { validationSettings } from "../utils/constants.js";

const OPENED_CLASS = "modal_is-opened";

// =======================
// 2) Core DOM elements
// =======================
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// Modals
const editProfileModal = document.getElementById("edit-profile-modal");
const newPostModal = document.getElementById("new-post-modal");
const imagePreviewModal = document.getElementById("image-preview-modal");
const editAvatarModal = document.getElementById("edit-avatar-modal");

// Forms & inputs
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.getElementById("profile-name-input");
const editProfileDescriptionInput = document.getElementById(
  "profile-description-input"
);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostTitleInput = document.getElementById("new-post-title-input");
const newPostLinkInput = document.getElementById("new-post-url-input");

const avatarFormElement = editAvatarModal.querySelector(".modal__form");
const avatarUrlInput = document.getElementById("avatar-url-input");

// Image preview modal elements
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imageCaptionEl = imagePreviewModal.querySelector(".modal__caption");

// Buttons
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

// =======================
// 3) Initial data load
// =======================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // This is exactly what that TripleTen snippet is talking about:
    // use userData.name, userData.about, userData.avatar
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => console.error("Initial load error:", err));

// =======================
// 4) Modal helpers
// =======================
function openModal(modal) {
  if (!modal) return;

  modal.classList.add(OPENED_CLASS);

  const firstFocusable = modal.querySelector(
    'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  if (firstFocusable) firstFocusable.focus();

  modal.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove(OPENED_CLASS);
  modal.removeEventListener("mousedown", handleOverlayClick);
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(`.modal.${OPENED_CLASS}`);
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Close buttons (X icons)
document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

// =======================
// 5) Edit profile modal
// =======================
profileEditBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  resetFormValidation(profileFormElement, validationSettings);
  openModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = editProfileNameInput.value.trim();
  const about = editProfileDescriptionInput.value.trim();

  api
    .editUserInfo({ name, about })
    .then((updatedUser) => {
      profileNameEl.textContent = updatedUser.name;
      profileDescriptionEl.textContent = updatedUser.about;
      closeModal(editProfileModal);
    })
    .catch((err) => console.error("Profile update error:", err));
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// =======================
// 6) New post modal
// =======================
profileAddBtn.addEventListener("click", () => {
  addCardFormElement.reset();
  resetFormValidation(addCardFormElement, validationSettings);
  openModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = newPostTitleInput.value.trim();
  const link = newPostLinkInput.value.trim();
  if (!name || !link) return;

  api
    .addNewCard({ name, link })
    .then((createdCard) => {
      const newCard = getCardElement(createdCard);
      cardsContainer.prepend(newCard);

      addCardFormElement.reset();
      resetFormValidation(addCardFormElement, validationSettings);
      closeModal(newPostModal);
    })
    .catch((err) => console.error("Add card error:", err));
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 7) Avatar edit modal
// =======================
profileAvatarEl.addEventListener("click", () => {
  avatarUrlInput.value = "";
  resetFormValidation(avatarFormElement, validationSettings);
  openModal(editAvatarModal);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatarUrl = avatarUrlInput.value.trim();
  if (!avatarUrl) return;

  api
    .updateAvatar(avatarUrl)
    .then((user) => {
      profileAvatarEl.src = user.avatar;
      closeModal(editAvatarModal);
      avatarFormElement.reset();
    })
    .catch((err) => console.error("Avatar update error:", err));
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// =======================
// 8) Card factory
// =======================
function getCardElement(cardData) {
  const { name, link, _id } = cardData;

  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  img.classList.add("card__image_hover-zoom");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  deleteBtn.addEventListener("click", () => {
    api
      .deleteCard(_id)
      .then(() => card.remove())
      .catch((err) => console.error("Delete card error:", err));
  });

  img.addEventListener("click", () => {
    imagePreviewEl.src = link;
    imagePreviewEl.alt = name;
    imageCaptionEl.textContent = name;
    openModal(imagePreviewModal);
  });

  return card;
}

// =======================
// 9) Enable validation
// =======================
enableValidation(validationSettings);
