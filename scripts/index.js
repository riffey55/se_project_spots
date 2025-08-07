// index.js
// Handles modal open/close logic for Edit Profile and New Post
// Author: Beren Riffey | Last updated: [August 6, 2025]

const editProfileButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.getElementById("edit-profile-modal");
const closeProfileModalButton = editProfileModal.querySelector(
  ".modal__close-button"
);

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is_opened");
});

closeProfileModalButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is_opened");
});

const newPostButton = document.querySelector(".profile__add-btn");
const newPostModal = document.getElementById("new-post-modal");

const closeNewPostModalButton = newPostModal.querySelector(
  ".modal__close-button"
);

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is_opened");
});

closeNewPostModalButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is_opened");
});

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
