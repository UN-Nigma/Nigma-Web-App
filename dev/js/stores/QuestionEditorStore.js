const Reflux = require('reflux');
const QuestionEditorActions = require('../actions/QuestionEditorActions');
const VariableEditorActions = require('../actions/QuestionEditorActions/VariableEditorActions');
const AnswerEditorActions = require('../actions/QuestionEditorActions/AnswerEditorActions');
const FormulationEditorActions = require('../actions/QuestionEditorActions/FormulationEditorActions');
const QuestionAPI = require('../api/utils/question');
const LoaderActions = require('../components/util/actions/LoaderActions');
const NotificationActions = require('../components/util/actions/NotificationActions');
var CkeditorController = require('../utils/ckeditor');
var AceEditorController = require('../utils/AceEditor');

var QuestionEditorStore = Reflux.createStore({
	listenables: [QuestionEditorActions, VariableEditorActions, AnswerEditorActions, FormulationEditorActions],
	currentQuestion: null,
	init() {},
	getInitialState() {
		return this.generateState();
	},

	loadQuestion(questionId) {
		this.getValueComponents();
		var self = this;
		LoaderActions.showLoader("Cargando pregunta, espere por favor");
		QuestionAPI.loadQuestion({questionId: questionId}).then(function(res) {
			var question = res.question;
			console.log(question);
			self.currentQuestion = question;
			self.trigger(self.generateState());
			LoaderActions.hideLoader();
		}).catch(function(error) {
			LoaderActions.hideLoader();
			console.error(error);
		});
	},

	saveQuestion() {
		this.getValueComponents();
		var self = this;
		var data = {
			questionid: self.currentQuestion._id,
			question: self.currentQuestion
		}
		LoaderActions.showLoader("Guardando pregunta, espere por favor");
		QuestionAPI.updateQuestionData(data).then(function(res) {
			LoaderActions.hideLoader();
			var ok = res.ok;
			if(ok) {
				alert("Pregunta guardada con exíto")
			} else {
				alert("Ocurrió un error al guardar la pregunta")
			}
		}).catch(function(error) {
			LoaderActions.hideLoader();
			console.error(error);
		})
	},



	previewQuestion() {
		this.getValueComponents();
		var self = this;
		var data = {
			questionid: self.currentQuestion._id,
			question: self.currentQuestion
		}
		LoaderActions.showLoader("Espere por favor");
		QuestionAPI.preview(data).then(function(res) {
			LoaderActions.hideLoader();
			var ok = res.ok;
			if(ok) {
				window.open(res.url);
			} else {
				console.error("There was an error trying to preview question ");
			}
		}).catch(function(error) {
			LoaderActions.hideLoader();
			console.error(error);
		})
	},

	exportQuestion() {

	},

	/*
		Variable Actions listeners
		-----------------------------------------------------
	*/

	createVariable(currentCode, type) {
		this.getValueComponents();
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
		this.getValueComponents();
		var self = this;
		var data = {
			variables: {
				text: currentCode
			},
			questionId: this.currentQuestion._id
		};
		LoaderActions.showLoader("Validando variables");
		QuestionAPI.validateVariables(data).then(function(res) {
			var output = res.body;
			alert("Variables validadas exitosamente");
			LoaderActions.hideLoader();
		}).catch(function(error) {
			LoaderActions.hideLoader();
			alert("Ocurrió un error al validar")
		});
	},

	//Formulation
	saveFormulationData(data) {
		this.getValueComponents();
		var self = this;
		self.currentQuestion.formulation = data;
		self.trigger(self.generateState());
	},

	//Answers
	validateAnswer(answer) {
		this.getValueComponents();
		var self = this;
		this.currentQuestion.answer = answer;
		for(var i = 0; i < answer.correctValues.length; i++) {
			var correctValue = answer.correctValues[i];
			for(var key in correctValue) {
				if(answer.names.indexOf(key) == -1) {
					delete correctValue[key];
				}
			}
		}

		for(var i = 0; i < answer.commonErrors.length; i++) {
			var commonError = answer.commonErrors[i].values;
			for(var key in commonError) {
				if(answer.names.indexOf(key) == -1) {
					delete commonError[key];
				}
			}
		}

		this.trigger(this.generateState());
		LoaderActions.showLoader("Validando respuestas");
		var data = {
			answer: answer,
			variables: {
				text: self.currentQuestion.variables
			},
			questionId: self.currentQuestion._id
		}
		QuestionAPI.validateAnswers(data).then(function(res) {
			console.log(res);
			if(res.ok)
				NotificationActions.showNotification("Respuestas validadas correctamente");
			else
				NotificationActions.showNotification("Hay errores en la validación: \n" + res.errors.join("\n"), "warning");
			LoaderActions.hideLoader();
		}).catch(function(exception) {
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Ocurrió un error al intentar validar las respuestas", "alert");
		});
	},
	updateAnswer(answer) {
		this.getValueComponents();
		var self = this;
		this.currentQuestion.answer = answer;
		console.log("Autoupdate on loss focus")
		this.trigger(this.generateState());
	},
	createAnswerName(name) {
		this.getValueComponents();
		this.currentQuestion.answer.names.push(name);
		this.trigger(this.generateState());
	},

	editAnswerName(index, name){
		this.getValueComponents();
		this.currentQuestion.answer.names[index] = name;
		this.trigger(this.generateState());
	},

	deleteAnswerName(index) {
		this.getValueComponents();
		this.currentQuestion.answer.names.splice(index, 1);
		this.trigger(this.generateState());
	},

	createCorrectValue() {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		if(answer.correctValues == undefined || answer.correctValues == null)
			answer.correctValues = []
		var correctValue = {};
		answer.names.forEach((varName) => correctValue[varName] = "");
		answer.correctValues.push(correctValue);
		this.trigger(this.generateState());
	},

	deleteCorrectValue(index) {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		answer.correctValues.splice(index, 1);
		this.trigger(this.generateState());
	},

	createCommonError() {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		if(answer.commonErrors == undefined || answer.commonErrors == null)
			answer.commonErrors = []
		var commonError = {
			message: "",
			values: {}
		};
		answer.names.forEach((varName) => commonError.values[varName] = "");
		answer.commonErrors.push(commonError);
		this.trigger(this.generateState());
	},

	deleteCommonError(index) {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		answer.commonErrors.splice(index, 1);
		this.trigger(this.generateState());
	},
	//Helpers

	getCurrentVariableNames(code) {
		var res = code.split("\n").filter(variable => variable != '').map(variable => variable.substring(0,2));
 		return res;
	},
	getValueComponents() {
		if(CkeditorController.getInstance() != null) {
			this.currentQuestion.formulation = CkeditorController.getValue();
		}
		if(AceEditorController.getInstance() != null) {
			this.currentQuestion.variables = AceEditorController.getValue();
		}
	},
	generateState() {
		var self = this;
		return {
			currentQuestion: self.currentQuestion,
		};
	}
});

module.exports = QuestionEditorStore;
