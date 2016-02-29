const Reflux = require('reflux');
const QuestionEditorActions = require('../actions/QuestionEditorActions');
const VariableEditorActions = require('../actions/QuestionEditorActions/VariableEditorActions');
const AnswerEditorActions = require('../actions/QuestionEditorActions/AnswerEditorActions');
const FormulationEditorActions = require('../actions/QuestionEditorActions/FormulationEditorActions');
const QuestionAPI = require('../api/utils/question');
const API = require('../api/API');
const LoaderActions = require('../components/util/actions/LoaderActions');
const NotificationActions = require('../components/util/actions/NotificationActions');
var CkeditorControllerClass = require('../utils/ckeditor');
var AceEditorController = require('../utils/AceEditor');
var _ = require('underscore');

var QuestionEditorStore = Reflux.createStore({
	listenables: [QuestionEditorActions, VariableEditorActions, AnswerEditorActions, FormulationEditorActions],
	currentQuestion: null,
	CkeditorController: null,
	init() {},
	getInitialState() {
		this.CkeditorController = new CkeditorControllerClass();
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

	exportAndDownloadQuestion() {
		alert("zzzz");
		this.getValueComponents();
		var self = this;
		var data = {
			questionid: self.currentQuestion._id,
			question: self.currentQuestion
		}
		LoaderActions.showLoader("Espere por favor");
		QuestionAPI.exportQuestion(data).then(function(res) {
			LoaderActions.hideLoader();
			if(res.ok) {
				QuestionAPI.donwloadQuestionExport({questionid: self.currentQuestion._id});
			} else {
				NotificationActions.showNotification("Ocurrió un error al validar y por lo tanto no se pudo exportar", "alert");
			}
		}).catch(function(error) {
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Ocurrió un error no esperado, intente de nuevo más tarde. Si el problema persiste comuniquese con el administrador.", "alert");
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
			if(res.ok) {
				window.open(res.url);
			} else {
				NotificationActions.showNotification(res.message, "alert");
			}
		}).catch(function(error) {
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Ocurrió un error no esperado, intente de nuevo más tarde. Si el problema persiste comuniquese con el administrador.", "alert");
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
			var output = res;
			LoaderActions.hideLoader();
			if(res.ok){
				NotificationActions.showNotification("Variables validadas correctamente");
			} else {
				NotificationActions.showNotification(`Hay errores en las variables: \n* ${res.errors.join("\n* ")}`, "warning");
			}
		}).catch(function(error) {
			console.error(error);
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Ocurrió un error al intentar validar las variables", "alert");
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
			LoaderActions.hideLoader();
			if(res.ok) {
				NotificationActions.showNotification("Respuestas validadas correctamente");
			}
			else {
				var message = "Hay errores en la validación, dirijase al formulario para corregir los errores";
				if((typeof res.errors)  == "string") {
					message = res.errors;
					NotificationActions.showNotification(message, "warning");
				} else {
					NotificationActions.showNotification(message, "warning");
					var state = self.generateState();
					state.answerErrors = res.errors;
					self.trigger(state);
				}

			}
		}).catch(function(exception) {
			console.error(exception);
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
		if(this.currentQuestion.type == "Complete") {
			var correctValue = {};
			answer.names.forEach((varName) => correctValue[varName] = "");
			answer.correctValues.push(correctValue);
		} else if (this.currentQuestion.type == "MultipleSelection") {
			answer.correctValues.push("");
		}
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
		if(this.currentQuestion.type == "Complete"){
			var commonError = {
				message: "",
				values: {}
			};
			answer.names.forEach((varName) => commonError.values[varName] = "");
			answer.commonErrors.push(commonError);
		} else if(this.currentQuestion.type == "MultipleSelection") {
			var commonError = {
				message: "",
				value: ""
			};
			answer.commonErrors.push(commonError);
		}

		this.trigger(this.generateState());
	},

	deleteCommonError(index) {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		answer.commonErrors.splice(index, 1);
		this.trigger(this.generateState());
	},

	createWrongValue() {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		if(answer.wrongValues == undefined || answer.wrongValues == null)
			answer.wrongValues = []
		if(this.currentQuestion.type == "MultipleSelection") {
			answer.wrongValues.push("");
		}
		this.trigger(this.generateState());
	},

	deleteWrongValue(index) {
		this.getValueComponents();
		var answer = this.currentQuestion.answer;
		answer.wrongValues.splice(index, 1);
		this.trigger(this.generateState());
	},
	//Helpers

	getCurrentVariableNames(code) {
		var res = code.split("\n").filter(variable => variable != '').map(variable => variable.substring(0,2));
 		return res;
	},
	getValueComponents() {
		console.log(this.CkeditorController);
		if(this.CkeditorController.getInstance() != null) {
			var value = (this.CkeditorController.getValue());
			this.currentQuestion.formulation = value;
		}
		if(AceEditorController.getInstance() != null) {
			this.currentQuestion.variables = AceEditorController.getValue();
		}
	},

	getCKeditorController() {
		return this.CkeditorController;
	},
	generateState() {
		var self = this;
		return {
			currentQuestion: self.currentQuestion
		};
	}
});

module.exports = QuestionEditorStore;
