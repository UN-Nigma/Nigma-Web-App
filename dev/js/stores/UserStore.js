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
			browserHistory.push("/admin");
		} else if(!email || !password) {
			NotificationActions.showNotification("Usuario o contraseña vacios", "alert");
		} else {
			var self = this;
			LoaderActions.showLoader("Inciando sesión, espere por favor.");
			setTimeout(function() {
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
			}, 1000);

		}
	},

	logout() {
		LoaderActions.showLoader("Cerrando sesión...");
		var self = this;
		setTimeout(function() {
			if(Auth.logout()) {
				self.user = null;
				LoaderActions.hideLoader();
				browserHistory.push("/");
			} else {
				LoaderActions.hideLoader();
				NotificationActions.showNotification("Ocurrió un error", "alert")
			}
		}, 2000);
	},

	register(name, email, password, repeat_password) {
		var self = this;
		if((name && email && password && repeat_password)) {
			if(password == repeat_password) {
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
				NotificationActions.showNotification("Los valores de las contraseñas no coinciden", "alert");
			}
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
