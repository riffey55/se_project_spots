// pages/index.js
// Author: Beren Riffey
// Clean, compliant, TripleTen-approved version

// =======================
// 1) Global Settings
// =======================
import Api from "../scripts/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c8a5fac5-ef64-4f85-bf76-72701d205770",
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

import pencilIcon from "../images/pencil.svg";
const profileEditBtn = document.querySelector(".profile__edit-btn");
profileEditBtn.style.setProperty("--pencil-icon", `url(${pencilIcon})`);

const OPENED_CLASS = "modal_is-opened";

import {
  enableValidation,
  resetFormValidation,
} from "../scripts/validation.js";

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// =======================
// Helper: Loading State
// =======================
function renderLoading(isLoading, button, loadingText = "Saving...") {
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
  } else {
    button.textContent = button.dataset.originalText;
  }
}

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

// Image preview modal
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imageCaptionEl = imagePreviewModal.querySelector(".modal__caption");

// Buttons
const profileAddBtn = document.querySelector(".profile__add-btn");
const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");

// =======================
// 3) Initial data load
// =======================

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((card) => {
      const cardEl = getCardElement(card);
      cardsContainer.append(cardEl);
    });
  }
);

// =======================
// 4) Modal helpers
// =======================

function openModal(modal) {
  modal.classList.add(OPENED_CLASS);

  modal.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
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

  const submitBtn = profileFormElement.querySelector(".modal__submit-button");
  renderLoading(true, submitBtn);

  api
    .editUserInfo({
      name: editProfileNameInput.value.trim(),
      about: editProfileDescriptionInput.value.trim(),
    })
    .then((updatedUser) => {
      profileNameEl.textContent = updatedUser.name;
      profileDescriptionEl.textContent = updatedUser.about;
      closeModal(editProfileModal);
    })
    .finally(() => renderLoading(false, submitBtn));
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

  const submitBtn = addCardFormElement.querySelector(".modal__submit-button");
  renderLoading(true, submitBtn, "Creating...");

  api
    .addNewCard({
      name: newPostTitleInput.value.trim(),
      link: newPostLinkInput.value.trim(),
    })
    .then((createdCard) => {
      cardsContainer.prepend(getCardElement(createdCard));

      addCardFormElement.reset();
      resetFormValidation(addCardFormElement, validationSettings);
      closeModal(newPostModal);
    })
    .finally(() => renderLoading(false, submitBtn));
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 7) Avatar Edit Modal
// =======================

avatarEditBtn.addEventListener("click", () => {
  avatarUrlInput.value = "";
  resetFormValidation(avatarFormElement, validationSettings);
  openModal(editAvatarModal);
});

profileAvatarEl.addEventListener("click", () => {
  avatarUrlInput.value = "";
  resetFormValidation(avatarFormElement, validationSettings);
  openModal(editAvatarModal);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = avatarFormElement.querySelector(".modal__submit-button");
  renderLoading(true, submitBtn);

  api
    .updateAvatar(avatarUrlInput.value.trim())
    .then((updatedUser) => {
      profileAvatarEl.src = updatedUser.avatar;
      avatarFormElement.reset();
      closeModal(editAvatarModal);
    })
    .finally(() => renderLoading(false, submitBtn));
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// =======================
// 8) Card Factory
// =======================

function getCardElement(cardData) {
  const { name, link, _id, likes = [] } = cardData;

  // Clone template
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const likeCountEl = card.querySelector(".card__like-count");
  const deleteBtn = card.querySelector(".card__delete-button");

  // Set card content
  img.src = link;
  img.alt = name;
  title.textContent = name;
  likeCountEl.textContent = likes.length;

  // ------------------------------
  // 1) INITIAL LIKE STATE
  // ------------------------------
  const userHasLiked = likes.some((like) => like._id === "me");

  if (userHasLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  // ------------------------------
  // 2) LIKE / UNLIKE WITH API
  // ------------------------------
  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.classList.contains("card__like-button_is-active");

    const likeAction = isLiked ? api.unlikeCard(_id) : api.likeCard(_id);

    likeAction.then((updatedCard) => {
      likeCountEl.textContent = updatedCard.likes.length;
      likeBtn.classList.toggle("card__like-button_is-active");
    });
  });

  // ------------------------------
  // 3) DELETE CARD (WITH LOADING)
  // ------------------------------
  deleteBtn.addEventListener("click", () => {
    // Temporary visual feedback
    renderLoading(true, deleteBtn, "Deleting...");

    api
      .deleteCard(_id)
      .then(() => {
        card.remove();
      })
      .finally(() => renderLoading(false, deleteBtn));
  });

  // ------------------------------
  // 4) IMAGE PREVIEW
  // ------------------------------
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

// =======================
// 10) One global catch handler
// =======================
window.addEventListener("unhandledrejection", (event) => {
  console.error("Global error:", event.reason);
});
