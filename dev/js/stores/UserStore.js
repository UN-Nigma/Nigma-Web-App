import Reflux from 'reflux'
import { browserHistory } from 'react-router'

import UserActions from '../actions/UserActions'
import UserApi from '../api/utils/user'
import LoaderActions from '../components/util/actions/LoaderActions'
import NotificationActions from '../components/util/actions/NotificationActions'
import Auth from "../utils/auth"

var UserStore = Reflux.createStore({
	listenables: [UserActions],
	user: null,
	init() {
	},
	getInitialState() {

	},

	login(email, password) {
		if(this.user) {
			browserHistory.push("/space");
		} else {
			var self = this;
			LoaderActions.showLoader("Inciando sesión, espere por favor.");
			UserApi.login(email, password).then(function(res) {
				Auth.loginComplete(res.token);
				browserHistory.push("/admin");
			})
			// }).then(UserApi.getData).then(function(res) {
			// 	Auth.saveUserData(res.user);
			// 	this.user = res.user;
			// 	LoaderActions.hideLoader();
			// 	browserHistory.push("/space");
			// })
			.catch(function(error) {
				console.error(error);
				LoaderActions.hideLoader();
				NotificationActions.showNotification("Credenciales invalidas", "alert");
			});
		}
	},

	logout() {
		LoaderActions.showLoader("Cerrando sesión...");
		if(Auth.logout()) {
			LoaderActions.hideLoader();
			browserHistory.push("/");
		} else {
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Ocurrió un error", "alert")
		}
	},

	register(data) {
		console.log("Nothing happens yet");
	},

	//Helper
	getUser() {
		return this.user;
	},
	generateState() {
		var self = this;
		return {
			user: self.user
		};
	},

});

module.exports = UserStore;
