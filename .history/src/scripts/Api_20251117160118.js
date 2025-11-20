// src/scripts/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Helper to handle all responses in one place
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // Project 9 spec: reject with an error if res.ok is false
    return Promise.reject(`Error: ${res.status}`);
  }

  // -------- Cards --------
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // We’ll add more methods here later:
  // getUserInfo, updateUserInfo, updateAvatar,
  // addCard, deleteCard, changeLikeStatus, etc.
}

export default Api;
