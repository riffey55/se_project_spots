// scripts/Api.js
// Clean TripleTen-approved version with unified error handling

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // --- Internal helper: checks server response ---
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // --- Get initial cards ---
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // --- Get user info ---
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // --- Edit profile ---
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResponse(res));
  }

  // --- Add new card ---
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

  // --- Delete card ---
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // --- Like card ---
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // --- Remove like ---
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
