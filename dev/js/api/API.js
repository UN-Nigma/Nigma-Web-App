const request = require('superagent');
const _ = require('lodash');
const _URL = require('./API_URL').URL;

const Auth = require('../utils/auth');

const API = {

	_REQUEST_METHOD: {
		get: "GET",
		post: "POST",
		delete: "DELETE",
		put: "PUT",
		patch: "PATCH"
	},

	getToken() {
		return Auth.getToken();
	},

	getUrl(){
		return _URL;
	},

	callAjaxGet(route, cb) {
		request.get(_URL + route)
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + this.getToken())
			.type('application/json')
			.end((err, res)=> {cb(err, res)});
	},

	callAjaxPost(route, data, cb) {
		request.post(_URL + route)
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + this.getToken())
			.type('application/json')
			.send(data)
			.end((err, res)=> {cb(err, res)});
	},

	callAjaxDelete(route, cb) {
		request.del(_URL + route)
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + this.getToken())
			.type('application/json')
			.end((err, res)=> {cb(err, res)});
	},

	callAjaxUpdate(route, data, cb) {
		request.put(_URL + route)
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + this.getToken())
			.type('application/json')
			.send(data)
			.end((err, res)=> {cb(err, res)});
	},

	_parseRoute(routeObject, data) {
		var route = routeObject.route;
		var simbols = route.match(/\:[^\/]+/g) || [];

		simbols.forEach(function (simbol) {
			var dataSimbol = simbol.substring(1); //Removes the ':' of the simbol
			route = route.replace(simbol, data[dataSimbol]);
		});

		return route;
	},

	callAjaxRequest(routeObject, data) {
		var route = this._parseRoute(routeObject, data);
		return new Promise((resolve, reject) => {
			var callback = ((err, res) => {
				if(err) reject(err);
				else resolve(res.body);
			});
			switch (routeObject.method) {
				case this._REQUEST_METHOD.get:
					return this.callAjaxGet(route, callback);
				case this._REQUEST_METHOD.post:
					return this.callAjaxPost(route, data, callback);
				case this._REQUEST_METHOD.put:
					return this.callAjaxUpdate(route, data, callback);
				case this._REQUEST_METHOD.delete:
					return this.callAjaxDelete(route, callback);
				default:
					return reject(new Error("No method available"));
			}
		});

	}
}

module.exports = API;
