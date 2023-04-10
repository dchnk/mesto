export class Api {
    constructor(apiRequestOptions) {
        this._authorization = apiRequestOptions.headers.authorization;
        this._baseUrl = apiRequestOptions.baseUrl;
        this._headers = {
            authorization: this._authorization,
            "Content-type": "application/json"
        }
    }

    _showError = (err) => {
        return console.error(err)
    }

    _checkRequestResult = (res) => {
        if (res.ok) {
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    deleteItemRequest = (id, doAfterRequest) => {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            return this._checkRequestResult(res);
        })
        .then(() => {
            doAfterRequest();
        })
        .catch((err) => {
            this._showError(err)
        });;
    ;}

    takeProfileInfoRequest = (doAfterRequest) => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => {
            return this._checkRequestResult(res);            
        })
        .then((res) => {
            return doAfterRequest(res)
        })
        .catch((err) => {
            this._showError(err)
        });
    }

    takeCardsRequset = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => {
            return this._checkRequestResult(res);            
        })
        .catch((err) => {
            this._showError(err)
        });
    }

    switchLikeStatusRequest = (method, item) => {
        return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
        method: method,
        headers: this._headers
        })
        .then(res => {
            return this._checkRequestResult(res);
        })
        .catch((err) => {
            this._showError(err)
        });
    }

    updateProfileInfoRequest = (item) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${item.link}`
            })
        })
        .then(res => {
            return this._checkRequestResult(res);
        })
        .catch((err) => {
            this._showError(err)
        })        
    }

    postNewCardRequest = (item) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${item.name}`,
                link: `${item.link}`
            })
        })
        .then(res => {
            return this._checkRequestResult(res);
        })
        .catch((err) => {
            this._showError(err)
        })
    }

    editUserInfoRequet = (item) => {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${item.name}`,
                about: `${item.about}`
            })
        })
        .then(res => {
            return this._checkRequestResult(res);
        })
        .catch((err) => {
            this._showError(err)
        })
    }
}



