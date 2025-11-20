// scripts/index.js
// Author: Beren Riffey
// Clean version — CSS handles visuals; JS handles behavior only.

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
// Load User Profile From Server
// =======================
api
  .getUserInfo()
  .then((userData) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    document.querySelector(".profile__image").src = userData.avatar;
  })
  .catch((err) => console.error("Profile load error:", err));

// =======================
// 3) Modal Core
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

// Wire close buttons
document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

// Wire open buttons (using aria-controls)
document.querySelectorAll("[aria-controls]").forEach((btn) => {
  const targetId = btn.getAttribute("aria-controls");
  const modal = document.getElementById(targetId);
  if (modal) btn.addEventListener("click", () => openModal(modal));
});

// =======================
// 4) Profile Edit
// =======================
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileModal = document.getElementById("edit-profile-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.getElementById("profile-name-input");
const editProfileDescriptionInput = document.getElementById(
  "profile-description-input"
);

const editProfileButton = document.querySelector(".profile__edit-btn");

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  if (typeof resetFormValidation === "function") {
    resetFormValidation(profileFormElement, validationSettings);
  }

  openModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value.trim();
  profileDescriptionEl.textContent = editProfileDescriptionInput.value.trim();
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// =======================
// 5) New Post Modal
// =======================
const newPostModal = document.getElementById("new-post-modal");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostTitleInput = document.getElementById("new-post-title-input");
const newPostLinkInput = document.getElementById("new-post-url-input");
const newPostButton = document.querySelector(".profile__add-btn");

newPostButton.addEventListener("click", () => openModal(newPostModal));

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const name = newPostTitleInput.value.trim();
  const link = newPostLinkInput.value.trim();
  if (!name || !link) return;

  const newCard = getCardElement({ name, link });
  cardsContainer.prepend(newCard);

  addCardFormElement.reset();
  if (typeof resetFormValidation === "function") {
    resetFormValidation(addCardFormElement, validationSettings);
  }

  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 6) Image Preview Modal
// =======================
const imagePreviewModal = document.getElementById("image-preview-modal");
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imageCaptionEl = imagePreviewModal.querySelector(".modal__caption");

// =======================
// 7) Cards
// =======================
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link }) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  // Keep the simple hover-zoom via CSS class only
  img.classList.add("card__image_hover-zoom");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  deleteBtn.addEventListener("click", () => card.remove());

  img.addEventListener("click", () => {
    imagePreviewEl.src = link;
    imagePreviewEl.alt = name;
    imageCaptionEl.textContent = name;
    openModal(imagePreviewModal);
  });

  return card;
}
// =======================
// 8) Load initial cards from the server
// =======================
api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) => {
      cardsContainer.append(getCardElement(card));
    });
  })

  .catch((err).then(res => {
       if (res.ok) {
         return res.json();
       }
     });
 } => console.error("API load error:", err));

enableValidation(validationSettings);
