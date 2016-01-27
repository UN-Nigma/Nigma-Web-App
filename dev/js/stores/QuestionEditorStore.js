const Reflux = require('reflux');
const QuestionEditorActions = require('../actions/QuestionEditorActions');
const QuestionAPI = require('../api/utils/question');



var QuestionEditorStore = Reflux.createStore({
	listenables: [QuestionEditorActions],
	currentQuestion: {},
	init() {},
	getInitialState() {
		return this.generateState();
	},

	loadQuestion(questionId) {
		var self = this;
		QuestionAPI.loadQuestion({questionId: questionId}).then(function(res) {
			var question = res.question;
			self.currentQuestion = question;
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		});
	},


	//Helpers

	generateState() {
		var self = this;
		return {
			currentQuestion: self.currentQuestion,
		};
	}
});

module.exports = QuestionEditorStore;
