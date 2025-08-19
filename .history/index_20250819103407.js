// index.js
// Modal logic + form submissions (DRY with openModal / closeModal)

// ===== Profile elements on the page =====
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// ===== Modals =====
const editProfileModal = document.getElementById("edit-profile-modal");
const newPostModal = document.getElementById("new-post-modal");

// ===== DRY helpers =====
function openModal(modalElement) {
  modalElement.classList.add("modal_is-opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("modal_is-opened");
}

// ===== Edit Profile modal =====
const editProfileButton = document.querySelector(".profile__edit-btn");
const closeProfileModalButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Open: pre-fill inputs, then open modal
editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

// Close (X) and overlay
closeProfileModalButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileModal.addEventListener("click", (evt) => {
  if (evt.target === editProfileModal) closeModal(editProfileModal);
});

// Submit (must be 'submit')
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = editProfileNameInput.value.trim();
  const newDesc = editProfileDescriptionInput.value.trim();

  if (newName) profileNameEl.textContent = newName;
  if (newDesc) profileDescriptionEl.textContent = newDesc;

  closeModal(editProfileModal);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// ===== New Post modal =====
const newPostButton = document.querySelector(".profile__add-btn");
const closeNewPostModalButton = newPostModal.querySelector(
  ".modal__close-button"
);
const addCardForm = newPostModal.querySelector(".modal__form");
const newPostTitleInput = newPostModal.querySelector("#new-post-title-input");
const newPostUrlInput = newPostModal.querySelector("#new-post-url-input");

// Open: clear fields, then open modal
newPostButton.addEventListener("click", () => {
  newPostTitleInput.value = "";
  newPostUrlInput.value = "";
  openModal(newPostModal);
});

// Close (X) and overlay
closeNewPostModalButton.addEventListener("click", () =>
  closeModal(newPostModal)
);
newPostModal.addEventListener("click", (evt) => {
  if (evt.target === newPostModal) closeModal(newPostModal);
});

// Submit: log values, then close
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log("New Post Title:", newPostTitleInput.value);
  console.log("New Post Image URL:", newPostUrlInput.value);
  closeModal(newPostModal);
}
addCardForm.addEventListener("submit", handleAddCardSubmit);
