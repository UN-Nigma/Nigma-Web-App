var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions');

var NotificationStore = Reflux.createStore({
		listenables: [NotificationActions],
		isShowing: false,
		type: null,
		defaultTypes: ["alert", "warning", "success"],
		message: "",
		init() {
			this.showing = false;
			this.message = "";
			this.type = null;
		},
		getInitialState() {
			return this.generateState();
		},

		showNotification(message, type = 'success') {
			this.type = type;
			this.message = message;
			this.isShowing = true;
			this.trigger(this.generateState());
		},

		hideNotification() {
			this.isShowing = false;
			this.trigger(this.generateState());
			var self = this;
			setTimeout(function() {
				self.message = "";
				self.trigger(self.generateState());
			}, 1200);
		},

		generateState() {
			var self = this;
			return {
				isShowing: self.isShowing,
				message: self.message,
				type: self.type
			}
		}

});

module.exports = NotificationStore;