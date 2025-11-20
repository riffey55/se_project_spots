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
const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");

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

// Image preview modal
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
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((card) => {
      const cardEl = getCardElement(card);
      cardsContainer.append(cardEl);
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

// Close buttons
document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

// =======================
// 5) Edit Profile Modal
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
// 6) New Post Modal
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
      const card = getCardElement(createdCard);
      cardsContainer.prepend(card);

      addCardFormElement.reset();
      resetFormValidation(addCardFormElement, validationSettings);
      closeModal(newPostModal);
    })
    .catch((err) => console.error("Add card error:", err));
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 7) Avatar Edit Modal
// =======================

// Open using the pencil button (correct for your HTML)
avatarEditBtn.addEventListener("click", () => {
  avatarUrlInput.value = "";
  resetFormValidation(avatarFormElement, validationSettings);
  openModal(editAvatarModal);
});

// (Optional) Also open when clicking avatar image itself
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
    .then((updatedUser) => {
      profileAvatarEl.src = updatedUser.avatar;
      avatarFormElement.reset();
      closeModal(editAvatarModal);
    })
    .catch((err) => console.error("Avatar update error:", err));
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// =======================
// 8) Card Factory
// =======================
function getCardElement(cardData) {
  const { name, link, _id, likes = [] } = cardData;

  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const likeCountEl = card.querySelector(".card__like-count");
  const deleteBtn = card.querySelector(".card__delete-button");

  // Set content
  img.src = link;
  img.alt = name;
  title.textContent = name;
  likeCountEl.textContent = likes.length;

  // Like toggle (visual only — correct for Project 9)
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  // Delete card
  deleteBtn.addEventListener("click", () => {
    api
      .deleteCard(_id)
      .then(() => card.remove())
      .catch((err) => console.error("Delete card error:", err));
  });

  // Image preview
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
