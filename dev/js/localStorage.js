/**
 * PRIVATE METHODS
 * ****************
 */

function _getObject(name) {
  let object = window.localStorage.getItem(name);
  return JSON.parse(object);
}

function _setObject(name, object) {
  window.localStorage.setItem(name, JSON.stringify(object));
}

/**
 * [LOCALSTORAGE OBJECT]
 * *********************
 * Manage the data in the localstorage
 * @type {Object}
 */

const LocalStorage = {

  setToken(token) {
    window.localStorage.setItem("token",token);
  },

  getToken(token) {
    window.localStorage.getItem(token);
  }
}

module.exports = LocalStorage;
