// src/scripts/Api.js
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _check(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error ${res.status}`);
  }

  _request(path, options = {}) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
      ...options,
    }).then(this._check);
  }

  // ---------- USERS ----------
  getUser() {
    return this._request("/users/me");
  }

  updateUser({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({ avatar }),
    });
  }

  // ---------- CARDS ----------
  getCards() {
    return this._request("/cards");
  }

  addCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // like=true -> PUT, like=false -> DELETE
  changeLike(cardId, like = true) {
    return this._request(`/cards/likes/${cardId}`, {
      method: like ? "PUT" : "DELETE",
    });
  }
}
