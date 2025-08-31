// index.js
// Handles modal open/close logic for Edit Profile and New Post
// Author: Beren Riffey | Last updated: [August 31, 2025]

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

// ===== Universal modal functions =====
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// ===== Escape key support for all modals =====
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
});

// ===== Profile elements on the page =====
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// ===== Edit Profile modal =====
const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.getElementById("edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const closeProfileModalButton = editProfileModal.querySelector(
  ".modal__close-button"
);

// Select the form + inputs FROM INSIDE the modal (per instructions)
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Open: pre-fill inputs, then open modal
editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

// Close (X button)
closeProfileModalButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Close when clicking overlay
editProfileModal.addEventListener("click", function (event) {
  if (event.target === editProfileModal) {
    closeModal(editProfileModal);
  }
});

// Submit handler (must be 'submit', not 'click')
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // Read input values
  const newName = editProfileNameInput.value.trim();
  const newDesc = editProfileDescriptionInput.value.trim();

  // Update page text
  profileNameEl.textContent = newName || profileNameEl.textContent;
  profileDescriptionEl.textContent =
    newDesc || profileDescriptionEl.textContent;

  // Close modal
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ===== New Post modal =====
const newPostButton = document.querySelector(".profile__add-btn");
const newPostModal = document.getElementById("new-post-modal");
const closeNewPostModalButton = newPostModal.querySelector(
  ".modal__close-button"
);

// Select the form + inputs FROM INSIDE the modal (per instructions)
const addCardFormElement = newPostModal.querySelector(".modal__form");

// There are two inputs inside: [0] Title (text), [1] Image URL (url)
const [newPostTitleInput, newPostLinkInput] =
  newPostModal.querySelectorAll(".modal__input");

// Open
newPostButton.addEventListener("click", function () {
  // Optional: clear fields on open
  newPostTitleInput.value = "";
  newPostLinkInput.value = "";
  openModal(newPostModal);
});

// Close (X button)
closeNewPostModalButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Close when clicking overlay
newPostModal.addEventListener("click", function (event) {
  if (event.target === newPostModal) {
    closeModal(newPostModal);
  }
});

// Submit handler: log values then close
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log("New Post Title:", newPostTitleInput.value);
  console.log("New Post Image URL:", newPostLinkInput.value);

  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// ===== Initial Cards =====
initialCards.forEach(function (item) {
  console.log("Place name:", item.name);
  console.log("Image URL:", item.link);
});
