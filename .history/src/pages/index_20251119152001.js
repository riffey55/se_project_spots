// scripts/index.js
// Author: Beren Riffey
// Clean, Project 9–ready version

// =======================
// 1) Global Settings
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
// 2) Profile Elements
// =======================
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__image");

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    // Apply user info to the DOM
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;

    // Render cards
    cards.forEach((card) => {
      cardsContainer.append(getCardElement(card));
    });
  })
  .catch((err) => console.error("API load error:", err));

// =======================
// 4) Modal Core
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

document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

document.querySelectorAll("[aria-controls]").forEach((btn) => {
  const targetId = btn.getAttribute("aria-controls");
  const modal = document.getElementById(targetId);
  if (modal) btn.addEventListener("click", () => openModal(modal));
});

// =======================
// 5) Profile Edit Modal
// =======================
const editProfileModal = document.getElementById("edit-profile-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.getElementById("profile-name-input");
const editProfileDescriptionInput = document.getElementById(
  "profile-description-input"
);

document.querySelector(".profile__edit-btn").addEventListener("click", () => {
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
const newPostModal = document.getElementById("new-post-modal");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostTitleInput = document.getElementById("new-post-title-input");
const newPostLinkInput = document.getElementById("new-post-url-input");

document
  .querySelector(".profile__add-btn")
  .addEventListener("click", () => openModal(newPostModal));

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = newPostTitleInput.value.trim();
  const link = newPostLinkInput.value.trim();
  if (!name || !link) return;

  api
    .addNewCard({ name, link })
    .then((createdCard) => {
      const newCard = getCardElement({
        name: createdCard.name,
        link: createdCard.link,
      });

      cardsContainer.prepend(newCard);

      addCardFormElement.reset();
      resetFormValidation(addCardFormElement, validationSettings);
      closeModal(newPostModal);
    })
    .catch((err) => console.error("Add card error:", err));
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 7) Image Preview Modal
// =======================
const imagePreviewModal = document.getElementById("image-preview-modal");
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imageCaptionEl = imagePreviewModal.querySelector(".modal__caption");

// =======================
// Avatar Edit Modal
// =======================
const editAvatarModal = document.getElementById("edit-avatar-modal");
const avatarFormElement = editAvatarModal.querySelector(".modal__form");
const avatarUrlInput = document.getElementById("avatar-url-input");

// Button to open avatar modal (usually clicking the image)
profileAvatarEl.addEventListener("click", () => {
  avatarUrlInput.value = "";
  resetFormValidation(avatarFormElement, validationSettings);
  openModal(editAvatarModal);
});

// Submit handler for avatar update
avatarFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarUrlInput.value.trim();
  if (!avatarUrl) return;

  api
    .updateAvatar(avatarUrl)
    .then((user) => {
      profileAvatarEl.src = user.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => console.error("Avatar update error:", err));
});

// =======================
// 8) Cards
// =======================
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link }) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  img.classList.add("card__image_hover-zoom");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__like-button_is-active")
  );

  deleteBtn.addEventListener("click", () => card.remove());

  img.addEventListener("click", () => {
    imagePreviewEl.src = link;
    imagePreviewEl.alt = name;
    imageCaptionEl.textContent = name;
    openModal(imagePreviewModal);
  });

  return card;
}
