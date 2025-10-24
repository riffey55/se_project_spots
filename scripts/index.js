// scripts/index.js
// Author: Beren Riffey 🌸
// Clean, final version — aligned with modal_is-opened CSS and validation.js

// =======================
// 1) Global Settings
// =======================
const OPENED_CLASS = "modal_is-opened";

// =======================
// 2) Initial Card Data
// =======================
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

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
// 7) Card Animation (Reveal + Hover Zoom)
// =======================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card_reveal_is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

function enhanceForReveal(card) {
  card.classList.add("card_reveal");
  revealObserver.observe(card);
}

// =======================
// 8) Auto-Contrast for Delete Button
// =======================
function setDeleteIconTone(card, img) {
  const deleteBtn = card.querySelector(".card__delete-button");
  if (!deleteBtn) return;

  function trySample() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const w = (canvas.width = 16);
      const h = (canvas.height = 16);

      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        const lum =
          0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        sum += lum;
      }
      const avg = sum / (data.length / 4);
      avg < 110
        ? deleteBtn.classList.add("card__delete-button--white")
        : deleteBtn.classList.remove("card__delete-button--white");
    } catch (_) {}
  }

  img.complete && img.naturalWidth
    ? trySample()
    : img.addEventListener("load", trySample, { once: true });
}

// =======================
// 9) Cards
// =======================
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link }) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  enhanceForReveal(card);
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

  setDeleteIconTone(card, img);
  return card;
}

initialCards.forEach((card) => cardsContainer.append(getCardElement(card)));

// =======================
// 10) Validation Config
// =======================
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

if (typeof enableValidation === "function") {
  enableValidation(validationSettings);
}
