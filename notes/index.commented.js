// index.commented.js
// Author: Beren Riffey
// Last updated: August 6, 2025
// Purpose: Annotated JavaScript for Spots Project modal logic
// Notes:
// - Save this as a reference for future projects!
// - Keep comments for learning and easy troubleshooting.

// 1. Select the "Edit Profile" button (outside modal)
const editProfileButton = document.querySelector(".profile__edit-btn");

// 2. Select the "Edit Profile" modal
const editProfileModal = document.getElementById("edit-profile-modal");

// 3. Select the modal's close button (inside modal)
const closeProfileModalButton = editProfileModal.querySelector(
  ".modal__close-button"
);

// Open the modal when the Edit Profile button is clicked
editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is_opened");
});

// Close the modal when the close button is clicked
closeProfileModalButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is_opened");
});
// Select the "New Post" button (outside modal)
const newPostButton = document.querySelector(".profile__add-btn");

// Select the "New Post" modal
const newPostModal = document.getElementById("new-post-modal");

// Select the close button inside the "New Post" modal
const closeNewPostModalButton = newPostModal.querySelector(
  ".modal__close-button"
);
newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is_opened");
});
closeNewPostModalButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is_opened");
});
// Edit Profile Modal: Close when clicking the overlay
editProfileModal.addEventListener("click", function (event) {
  if (event.target === editProfileModal) {
    editProfileModal.classList.remove("modal_is_opened");
  }
});

// New Post Modal: Close when clicking the overlay
newPostModal.addEventListener("click", function (event) {
  if (event.target === newPostModal) {
    newPostModal.classList.remove("modal_is_opened");
  }
});
