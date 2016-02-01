const Reflux = require('reflux');
const QuestionEditorActions = require('../actions/QuestionEditorActions');
const VariableEditorActions = require('../actions/QuestionEditorActions/VariableEditorActions');
const QuestionAPI = require('../api/utils/question');
const LoaderActions = require('../components/util/actions/LoaderActions');


var QuestionEditorStore = Reflux.createStore({
	listenables: [QuestionEditorActions, VariableEditorActions],
	currentQuestion: null,
	init() {},
	getInitialState() {
		return this.generateState();
	},

	loadQuestion(questionId) {
		var self = this;
		LoaderActions.showLoader("Cargando pregunta, espere por favor");
		QuestionAPI.loadQuestion({questionId: questionId}).then(function(res) {
			var question = res.question;
			question.answer = question.answer || {};
			question.metadata = question.metadata || {};
			console.log(question);
			self.currentQuestion = question;
			self.trigger(self.generateState());
			LoaderActions.hideLoader();
		}).catch(function(error) {
			LoaderActions.hideLoader();
			console.error(error);
		});
	},

	/*
		Variable Actions listeners
		-----------------------------------------------------
	*/

	createVariable(currentCode, type) {
		var self = this;
		var varNames  = self.getCurrentVariableNames(currentCode);
		var newVariableName  = null;
		if(varNames.length >= 0 && varNames.length <= 25) {
			newVariableName = `_${String.fromCharCode(97 + varNames.length)}`
		} else if (varNames.length >= 26 && varNames.length <= 49) {
			var aux = varNames.length % 26;
			newVariableName = `_${String.fromCharCode(65 + aux)}`
		}
		var newCode = "";
		switch(type) {
			case "uniform":
				newCode = `${newVariableName} = U[min, max, paso]`;
				break;
			case "specific":
				newCode = `${newVariableName} = E{numero 1, numero 2}`;
				break;
			case "categorical":
				newCode = `${newVariableName} = C{"Texto 1", "Texto 2"}`;
				break;
		}
		if(newCode != ""){
			currentCode += `${newCode}\n`;
			self.currentQuestion.variables = currentCode
		} else {
			console.error("No type selected")
		}
		self.trigger(self.generateState());
	},

	validateVariables(currentCode) {
		var self = this;
		var data = {
			variables: {
				text: currentCode
			},
			questionId: this.currentQuestion._id
		};
		LoaderActions.showLoader("Validando respuestas");
		QuestionAPI.validateVariables(data).then(function(res) {
			var output = res.body;
			alert("Variables validadas exitosamente");
			LoaderActions.hideLoader();
		}).catch(function(error) {
			LoaderActions.hideLoader();
			alert("Ocurrió un error al validar")
		});
	},


	//Helpers

	getCurrentVariableNames(code) {
		var res = code.split("\n").filter(variable => variable != '').map(variable => variable.substring(0,2));
		return res;
	},

	generateState() {
		var self = this;
		return {
			currentQuestion: self.currentQuestion,
		};
	}
});

module.exports = QuestionEditorStore;
