class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok)
      return res.json();
    else
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      }
    })
      .then(this._checkResponse);
  }

  patchUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse);
  }

  patchUserAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      }
    })
      .then(this._checkResponse);
  }

  postNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      }
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...this._headers,
      }
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto.dronoti.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
