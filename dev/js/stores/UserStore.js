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
		this.user = Auth.getUser();
	},
	getInitialState() {
		this.user = Auth.getUser();
	},

	login(email, password) {
		if(this.user) {
			browserHistory.push("/space");
		} else {
			var self = this;
			LoaderActions.showLoader("Inciando sesión, espere por favor.");
			UserApi.login(email, password).then(function(res) {
				Auth.loginComplete(res.token);
				return res;
			}).then(UserApi.getData.bind(UserApi)).then(function(res) {
				Auth.saveUserData(res.user);
				self.user = res.user;
				LoaderActions.hideLoader();
				browserHistory.push("/admin");
			})
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

	register(name, email, password) {
		var self = this;
		if((name && email && password)) {
			LoaderActions.showLoader("Creando usuario");
			UserApi.register(name, email, password).then(function(res) {
					Auth.loginComplete(res.token);
					return res;
				}).then(UserApi.getData.bind(UserApi)).then(function(res) {
					Auth.saveUserData(res.user);
					self.user = res.user;
					LoaderActions.hideLoader();
					browserHistory.push("/admin");
				})
				.catch(function(error) {
					console.error(error);
					LoaderActions.hideLoader();
					NotificationActions.showNotification("No se pudo crear el usuario.", "alert");
				});
		} else {
			NotificationActions.showNotification("Por favor llené completamente el formulario.", "alert");
		}


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
