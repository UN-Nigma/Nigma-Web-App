/**
 * AUTHENTICATION OBJECT
 * *********************
 */

import { browserHistory } from 'react-router'

const Auth = {

  isLoggedIn() {
    let token = this.getToken();
    return  (token != undefined && token != null);
  },

  checkLogin() {
    if(!this.isLoggedIn()) {
      browserHistory.push("/");
    }
  },

  loginComplete(token){
    localStorage.setItem("token", token);
  },

  saveUserData(user){
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(){
    return JSON.parse(localStorage.getItem("user"));
  },

  logout() {
  	try {
    	localStorage.clear();
    	return true;
  	} catch (exception) {
    	return false;
  	}
  },

  getToken() {
    return localStorage.getItem("token");
  },

  onChange: function () {
  }
};

module.exports = Auth;
