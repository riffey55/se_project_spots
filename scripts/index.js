// index.js
// Author: Beren Riffey — organized + animations integrated

// =======================
// 1. Seed Data
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
// 2. Modal Helpers
// =======================
function openModal(modal) {
  modal.classList.add("modal_is-opened");

  // optional: set focus on first input/button
  const first = modal.querySelector(
    'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  if (first) first.focus();
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Escape closes any open modal
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal.modal_is-opened");
    if (opened) closeModal(opened);
  }
});

// Utility: wire close buttons + overlay
function wireModal(modal) {
  const closeBtn = modal.querySelector(".modal__close-button");
  if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) closeModal(modal); // overlay click
  });
}

// Apply wiring to all modals
["#edit-profile-modal", "#new-post-modal", "#image-preview-modal"]
  .map((sel) => document.querySelector(sel))
  .forEach((m) => m && wireModal(m));

// =======================
// 3. Profile Elements
// =======================
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// =======================
// 4. Edit Profile Modal
// =======================
const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.getElementById("edit-profile-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.getElementById("profile-name-input");
const editProfileDescriptionInput = document.getElementById(
  "profile-description-input"
);

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = editProfileNameInput.value.trim();
  const desc = editProfileDescriptionInput.value.trim();
  if (name) profileNameEl.textContent = name;
  if (desc) profileDescriptionEl.textContent = desc;
  closeModal(editProfileModal);
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// =======================
// 5. New Post Modal
// =======================
const newPostButton = document.querySelector(".profile__add-btn");
const newPostModal = document.getElementById("new-post-modal");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostTitleInput = document.getElementById("new-post-title-input");
const newPostLinkInput = document.getElementById("new-post-url-input");

newPostButton.addEventListener("click", () => {
  addCardFormElement.reset();
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
  closeModal(newPostModal);
}
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// =======================
// 6. Image Preview Modal
// =======================
const imagePreviewModal = document.getElementById("image-preview-modal");
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imageCaptionEl = imagePreviewModal.querySelector(".modal__caption");

// =======================
// 7. Animations (Reveal + Hover Zoom)
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

function enhanceForReveal(el) {
  el.classList.add("card_reveal");
  revealObserver.observe(el);
}

// =======================
// 8. Auto-contrast helper for delete button
// =======================
function setDeleteIconTone(cardEl, imgEl) {
  const deleteBtn = cardEl.querySelector(".card__delete-button");
  if (!deleteBtn) return;

  function trySample() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const w = (canvas.width = 16);
      const h = (canvas.height = 16);

      ctx.drawImage(imgEl, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sum += lum;
      }
      const avg = sum / (data.length / 4);

      if (avg < 110) {
        deleteBtn.classList.add("card__delete-button--white");
      } else {
        deleteBtn.classList.remove("card__delete-button--white");
      }
    } catch {
      // Ignore CORS/security errors
    }
  }

  if (imgEl.complete && imgEl.naturalWidth) {
    trySample();
  } else {
    imgEl.addEventListener("load", trySample, { once: true });
  }
}

// =======================
// 9. Cards
// =======================
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link }) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  // Animations
  enhanceForReveal(card);
  img.classList.add("card__image_hover-zoom");

  // Fill content
  img.src = link;
  img.alt = name;
  title.textContent = name;

  // Like toggle
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  // Delete card
  deleteBtn.addEventListener("click", () => card.remove());

  // Image preview modal
  img.addEventListener("click", () => {
    imagePreviewEl.src = link;
    imagePreviewEl.alt = name;
    imageCaptionEl.textContent = name;
    openModal(imagePreviewModal);
  });

  // Auto choose icon tone
  setDeleteIconTone(card, img);

  return card;
}

// Render initial cards
initialCards.forEach((data) => {
  cardsContainer.append(getCardElement(data));
});
