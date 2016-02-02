const React = require("react");
var AnswerEditorActions = require('../../../actions/QuestionEditorActions/AnswerEditorActions');

const Reflux = require('reflux');
var QuestionEditorStore = require('../../../stores/QuestionEditorStore');
var AnswerCompleteType = require('./AnswerTypes/Complete');

var AnswerEditor = React.createClass({

	render() {
		var AnswerTypeDom = null;
		if(this.props.question.type == "Complete") {
			AnswerTypeDom = <AnswerCompleteType />;
		} else {

		}
		return (
			<div className="AnswerEditor">
				{AnswerTypeDom}
			</div>
		);
	}

});

module.exports = AnswerEditor;


// var AnswerContainer = React.createClass({
// 	mixins: [Reflux.connect(QuestionEditorStore, 'storeData')],
// 	_changeAnswer(path, value) {
// 		var objectPath = path.split('.') || [];
// 		if(objectPath.length == 0)
// 			return;
// 		var storeData = this.state.storeData;
// 		var answer = storeData.currentQuestion.answer;
// 		var item = answer;
// 		for(var i = 0; i < objectPath.length -1; i++) {
// 			var pathValue = objectPath[i];
// 			if(!isNaN(pathValue)){
// 				pathValue = parseInt(pathValue);
// 			}
// 			item = item[objectPath[i]];
// 		}

// 		item[objectPath[objectPath.length -1]] = value;
// 		this.setState({
// 			storeData: storeData
// 		});
// 	},

// 	_addNewAnswer() {
// 		AnswerActions.addNewAnswer();
// 	},
// 	answerBasicActions(data) {
// 		var addAnswer = (answername) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answername != null && answername != "")
// 				answer.names.push(answername);
// 			this.setState({
// 				answer: answer
// 			});
// 		}
// 		var editAnswer = (index, answername) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answername != null && answername != "")
// 				answer.names[index] = answername;
// 				this.setState({
// 					answer: answer
// 				});
// 		}
// 		var deleteAnswer = (index) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(index != null && !isNaN(index))
// 				answer.names.splice(index, 1)
// 			this.setState({
// 				answer: answer
// 			});
// 		}
// 		var addCorrectValue = (answerNames) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answerNames != null && answerNames.length > 0) {
// 				var value = {};
// 				answerNames.forEach((answerName) => (value[answerName] = ""));
// 				answer.correctValues.push(value);
// 				this.setState({
// 					answer: answer
// 				});
// 			}
// 		}
// 		var addCommonError = (answerNames) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answerNames != null && answerNames.length > 0) {
// 				var value = {
// 					values: {},
// 					message: ""
// 				};
// 				answerNames.forEach((answerName) => (value.values[answerName] = ""));
// 				answer.commonErrors.push(value);
// 				this.setState({
// 					answer: answer
// 				});
// 			}
// 		}
// 		var deleteCommonError = (index) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answer.commonErrors.length > index) {
// 				answer.commonErrors.splice(index);
// 				this.setState({
// 					answer: answer
// 				});
// 			}
// 		}

// 		var deleteCorrectValue = (index) => {
// 			var answer = this.state.storeData.currentQuestion.answer;
// 			if(answer.correctValues.length > index) {
// 				answer.correctValues.splice(index);
// 				this.setState({
// 					answer: answer
// 				});
// 			}
// 		}

// 		switch(data.action) {
// 			case "addAnswer":
// 				addAnswer(data.answerName);
// 				break;
// 			case "editAnswer":
// 				editAnswer(data.index, data.answerName);
// 				break;
// 			case "deleteAnswer":
// 				deleteAnswer(data.index)
// 				break;
// 			case "addCorrectValue":
// 				addCorrectValue(data.answerNames)
// 				break;
// 			case "addCommonError":
// 				addCommonError(data.answerNames)
// 				break;
// 			case "deleteCorrectValue":
// 				deleteCorrectValue(data.index)
// 				break;
// 			case "deleteCommonError":
// 				deleteCommonError(data.index)
// 				break;
// 		}

// 	},



// 	render() {
// 		return (
// 			<div className="AnswerEditor">
// 				<AnswerContainer.Answer answer={this.state.storeData.currentQuestion.answer} handleChange={this._changeAnswer} answerActions={this.answerBasicActions} />
// 			</div>
// 		)
// 	}
// });

// AnswerContainer.Answer = React.createClass({

// 	_convertToNativeType(value, type) {
// 		type = type || "string";
// 		if(value == "" || value == null || value == undefined){
// 			return "";
// 		} else {
// 			if(value === "false" && type === "boolean"){
// 				value = false;
// 			} else if (value === "true" && type === "boolean"){
// 				value = true;
// 			} else if(!isNaN(value) && type === "number"){
// 				value = Number(value);
// 			} else {
// 				//Already a string
// 			}
// 			return value;
// 		}

// 	},

// 	_handleChange(evt) {
// 		const target = evt.target;
// 		const path = target.getAttribute('data-path');
// 		const type = target.getAttribute('data-type');
// 		var value = this._convertToNativeType(target.value, type);
// 		this.props.handleChange(path, value);
// 	},

// 	_deleteQuestion() {
// 		AnswerActions.deleteQuestion(this.props.answer, this.props.index);
// 	},

// 	_addCommonError() {
// 		AnswerActions.addCommonError(this.props.answer, this.props.index)
// 	},

// 	render() {
// 		return (
// 			<div className="Formulation-AnswerContainer-Answer">
// 				<AnswerContainer.Answer.GeneralInformation answer={this.props.answer} handleChange={this._handleChange} answerActions={this.props.answerActions}/>
// 				<AnswerContainer.Answer.CorrectValues answer={this.props.answer} handleChange={this._handleChange} answerActions={this.props.answerActions}/>
// 				<AnswerContainer.Answer.CommonErrors answer={this.props.answer} handleChange={this._handleChange} answerActions={this.props.answerActions}/>
// 			</div>
// 		);
// 	}

// });

// AnswerContainer.Answer.GeneralInformation = React.createClass({
// 	getInitialState() {
// 		return {newAnswerName: ""};
// 	},
// 	precision: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],

// 	_addAnswer() {
// 		this.props.answerActions({
// 			answerName: this.state.newAnswerName,
// 			action: "addAnswer"
// 		})
// 		this.setState({
// 			newAnswerName: ""
// 		});
// 	},

// 	onChage(evt) {
// 		this.setState({
// 			newAnswerName: evt.target.value
// 		});
// 	},
// 	render() {
// 		return (
// 			<div className="general-information">
// 				<div className="">
// 						<input type="checkbox" className="col s3" id={`showLabelCheckBox`}  onChange={this.props.handleChange} checked={this.props.answer.showLabel} value={!this.props.answer.showLabel} data-path="showLabel" data-type="boolean" />
// 						<label htmlFor={`showLabelCheckBox`} className="col s4">Incluir etiquetas</label>
// 				</div>
// 				<div className="">
// 					<label htmlFor={`questionPrecision`} className="col s4">Precisión decimal exigida</label>
// 					<div className="col s3">
// 						<select className="browser-default"  value={this.props.answer.precision} onChange={this.props.handleChange} id="questionPrecision" data-path="precision" data-type="number">
// 							<option value="" disabled>Precisión decimal exigida</option>
// 							{ this.precision.map((optionValue, index) => <option key={index}  value={optionValue}>{optionValue}</option>) }
// 						</select>
// 					</div>
// 				</div>
// 				<div className="row">
// 					<div className="input-field col s6">
// 						<input id={`textbox_answer_name`} value={this.answername} type="text" onChange={this.onChange}/>
// 						<label htmlFor={`textbox_answer_name`}>Agregar respuesta</label>
// 					</div>
// 					<div className="col s1">
// 						<a className="btn-floating btn-medium waves-effect waves-light green create-btn" onClick={this._addAnswer}><i className="material-icons">add</i></a>
// 					</div>
// 					<div className="col s5">
// 						<div className="answers-names-container">
// 							{
// 								this.props.answer.names.map((answerName, index) => <AnswerContainer.Answer.GeneralInformation.AnswerName index={index} name={answerName} key={index} handleChange={this.props._handleChange} answerActions={this.props.answerActions}/>)
// 							}
// 						</div>
// 					</div>
// 				</div>
// 				<hr />
// 			</div>
// 		);
// 	}
// });

// AnswerContainer.Answer.GeneralInformation.AnswerName = React.createClass({
// 	_deleteQuestion() {
// 		this.props.answerActions({
// 			action: "deleteAnswer",
// 			index: this.props.index
// 		});
// 	},
// 	render() {
// 		return (
// 			<div className="answer-name">
// 				<div className="name">
// 					{this.props.name}
// 				</div>
// 				<div className="actions">
// 					<i className="material-icons">edit</i>
// 					<i className="material-icons" onClick={this._deleteQuestion}>delete</i>
// 				</div>
// 			</div>
// 		);
// 	}
// });

// AnswerContainer.Answer.CorrectValues = React.createClass({
// 	_addCorrectValue() {
// 		this.props.answerActions({
// 			action: "addCorrectValue",
// 			answerNames: this.props.answer.names
// 		})
// 	},

// 	render() {
// 		var answer = this.props.answer;
// 		return (
// 			<div className="correct-values-container" >
// 				<h3 className="title">Valores correctos</h3>
// 				{
// 					answer.correctValues.map((correctValue, index) =>  <AnswerContainer.Answer.CorrectValues.Value  index={index} correctValue={correctValue} key={index} answerNames={answer.names} handleChange={this.props.handleChange} answerActions={this.props.answerActions}/>)
// 				}
// 				<div className="actions">
// 					<a className="btn-floating btn-small waves-effect waves-light green create-btn" onClick={this._addCorrectValue}><i className="material-icons">add</i></a>
// 				</div>
// 				<hr />
// 			</div>
// 		);
// 	}
// });

// AnswerContainer.Answer.CorrectValues.Value = React.createClass({
// 	_deleteCorrectValue() {
// 		this.props.answerActions({
// 			action: "deleteCorrectValue",
// 			index: this.props.index
// 		})
// 	},
// 	render() {
// 		var value = this.props.correctValue;
// 		var answerNames = this.props.answerNames;
// 		return (
// 			<div>
// 				<div className="button-actions">
// 					<i className="material-icons small btn-actions" onClick={this._deleteCorrectValue}>delete</i>
// 				</div>
// 				{
// 					answerNames.map(
// 						(answerName, index) =>
// 							(
// 								<div className="correct-value" key={index}>
// 									<div className="input-field">
// 										<input id={`textbox_correct_value_${answerName}_${this.props.index}`} value={value[answerName]} onChange={this.props.handleChange} type="text" data-path={`correctValues.${this.props.index}.${answerName}`}/>
// 										<label htmlFor={`textbox_correct_value_${answerName}_${this.props.index}`}>{answerName}</label>
// 									</div>
// 								</div>
// 							)

// 					)
// 				}
// 			</div>
// 		);
// 	}
// });


// AnswerContainer.Answer.CommonErrors = React.createClass({

// 	_addCommonError() {
// 		this.props.answerActions({
// 			action: "addCommonError",
// 			answerNames: this.props.answer.names
// 		})
// 	},

// 	render() {
// 		var answer = this.props.answer;
// 		return (
// 			<div className="common-errors-container" >
// 				<h3 className="title">Errores comunes</h3>
// 				{
// 					answer.commonErrors.map((commonError, index) =>  <AnswerContainer.Answer.CommonErrors.Value  index={index} commonError={commonError} key={index} answerNames={answer.names} handleChange={this.props.handleChange} answerActions={this.props.answerActions}/>)
// 				}
// 				<div className="actions">
// 					<a className="btn-floating btn-small waves-effect waves-light green create-btn" onClick={this._addCommonError}><i className="material-icons">add</i></a>
// 				</div>
// 				<hr />
// 			</div>
// 		);
// 	}
// });

// AnswerContainer.Answer.CommonErrors.Value = React.createClass({
// 	_deleteCommonError() {
// 		this.props.answerActions({
// 			action: "deleteCommonError",
// 			index: this.props.index
// 		})
// 	},

// 	render() {
// 		var value = this.props.commonError.values;
// 		var answerNames = this.props.answerNames;
// 		return (
// 			<div className="common-error">
// 				<div className="right-align">
// 					<i className="material-icons small actions" onClick={this._deleteCommonError}>delete</i>
// 				</div>
// 				{
// 					answerNames.map(
// 						(answerName, index) =>
// 							(
// 								<div className="common-error-value" key={index}>
// 									<div className="input-field">
// 										<input id={`textbox_common_error_${answerName}_${this.props.index}`} value={value[answerName]} onChange={this.props.handleChange} type="text" data-path={`commonErrors.${this.props.index}.values.${answerName}`}/>
// 										<label htmlFor={`textbox_common_error_${answerName}_${this.props.index}`}>{answerName}</label>
// 									</div>
// 								</div>
// 							)

// 					)
// 				}
// 				<div className="input-field">
// 					<input id={`textbox_common_error_message_${this.props.index}`} value={this.props.commonError.message} onChange={this.props.handleChange} type="text" data-path={`commonErrors.${this.props.index}.message`}/>
// 					<label htmlFor={`textbox_common_error_message_${this.props.index}`}>Mensaje de retroalimentacion</label>
// 				</div>
// 			</div>
// 		);
// 	}

// });

// AnswerContainer.Validation = React.createClass({

// 	render() {
// 		var classCSS = !this.props.validating ? { css: "material-icons", icon: "done"} : {css: "material-icons spin", icon: "loop"}
// 		return (
// 			<div className="Formulation-AnswerContainer-Validation">
// 				<i className={classCSS.css} onClick={this.props.validateForm} >{classCSS.icon}</i>
// 			</div>
// 		);
// 	}
// });


