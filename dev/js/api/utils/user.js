const API = require('../API');

const UserApi = {

  _routes: {

    getData: {
      route: "/users/data",
      method: API._REQUEST_METHOD.get
    },

    login: {
      route: "/users/login",
      method: API._REQUEST_METHOD.post
    }
  },

  getData() {
    const route = this._routes.getData;
    return API.callAjaxRequest(route, null);
  },

  login(email, password) {
    const route = this._routes.login;
    var data = {user: {email: email, pass: password}}
    return API.callAjaxRequest(route, data);
  }

};

module.exports = UserApi;
