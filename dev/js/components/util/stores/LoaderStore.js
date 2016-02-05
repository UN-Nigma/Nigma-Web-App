var Reflux = require('reflux');
var LoaderActions = require('../actions/LoaderActions');

var LoaderActions = Reflux.createStore({
		listenables: [LoaderActions],
		showing: false,
		loaderType: 'simple',
		message: "",
		options: {},
		init() {
			this.showing = false;
			this.message = "";
			this.options = {};
			this.loaderType = "simple";
		},
		getInitialState() {
			return this.generateState();
		},

		showLoader(message, type = 'simple', options = {}) {
			this.loaderType = type;
			this.options = options;
			this.message = message;
			this.showing = true;
			this.trigger(this.generateState());
		},

		hideLoader() {
			this.showing = false;
			this.message = "";
			var self = this;
			self.trigger(self.generateState());
		},

		increaseTime(step = 1000){
			var self = this;
			setTimeout(function() {
				self.options.currentTime += step;
				if(self.options.currentTime >= self.options.time){
					self.showing = false;
				}
				self.trigger(self.generateState());
			}, step);
		},

		generateState() {
			var self = this;
			return {
				showing: self.showing,
				message: self.message,
				options: self.options,
				loaderType: self.loaderType
			}
		}

});

module.exports = LoaderActions;