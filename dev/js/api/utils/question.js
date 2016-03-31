const API = require('../API');
const QuestionAPI = {
	_routes: {
		get: {
			route: "/questions/:questionId",
			method: API._REQUEST_METHOD.get,
		},
		create: {
			route: "/folders/:folderid/questions",
			method: API._REQUEST_METHOD.post
		},

		updateQuestionData: {
			route: "/questions/:questionid/data",
			method: API._REQUEST_METHOD.put
		},
		previewQuestion: {
			route: "/questions/:questionid/preview",
			method: API._REQUEST_METHOD.put
		},

		exportQuestion: {
			route: "/questions/:questionid/export",
			method: API._REQUEST_METHOD.put
		},
		donwloadQuestionExport: {
			route: "/questions/:questionid/export/download",
			method: API._REQUEST_METHOD.get
		},

		share: {
			route: "/users/questions/:questionId",
			method: API._REQUEST_METHOD.post,
		},

		delete: {
			route: "/questions/:questionId",
			method: API._REQUEST_METHOD.delete,
		},

		validateVariables: {
			route: "/questions/:questionId/variables/validate",
			method: API._REQUEST_METHOD.put
		},

		validateAnswers: {
			route: "/questions/:questionId/answers/validate",
			method: API._REQUEST_METHOD.put
		},
		updateQuestion: {
			route: "/questions/:questionId/",
			method: API._REQUEST_METHOD.put
		},
		uploadImage: {
			route: "/questions/:questionId/scorms/uploadfiles"
		}
	},
	createQuestion(data){
		const route = this._routes.create;
		return API.callAjaxRequest(route, data);
	},
	loadQuestion(data){
		const route = this._routes.get;
		return API.callAjaxRequest(route, data);
	},
	updateQuestionData(data){
		const route = this._routes.updateQuestionData;
		return API.callAjaxRequest(route, data);
	},

	preview(data){
		const route = this._routes.previewQuestion;
		return API.callAjaxRequest(route, data);
	},

	updateQuestion(data) {
		const route = this._routes.updateQuestion;
		return API.callAjaxRequest(route, data);
	},

	getRoute(data, routeName) {
		return API.getUrl() + API._parseRoute(this._routes[routeName], data);
	},

	donwloadQuestionExport(data) {
		var route = this._routes.donwloadQuestionExport;
		var url = API.getUrl();
		url = url.replace(/api/,"static");
		window.open(`${url}/${data.questionid}.zip`);
	},
	exportQuestion(data) {
		const route = this._routes.exportQuestion;
		return API.callAjaxRequest(route, data);
	},
	deleteQuestion(data) {
		const route = this._routes.delete;
		return API.callAjaxRequest(route, data);
	},
	validateVariables(data){
		const route = this._routes.validateVariables;
		return API.callAjaxRequest(route, data);
	},
	validateAnswers(data){
		const route = this._routes.validateAnswers;
		return API.callAjaxRequest(route, data);
	}
}

module.exports = QuestionAPI;
