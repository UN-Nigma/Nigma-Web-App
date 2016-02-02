var React = require('react');
var Reflux = require('reflux');
var AnswerEditorActions = require('../../../../actions/QuestionEditorActions/AnswerEditorActions');
var QuestionEditorStore = require('../../../../stores/QuestionEditorStore');

var answerHelper = {
	_convertToNativeType(value, type) {
	type = type || "string";
		if(value == "" || value == null || value == undefined){
			return "";
		} else {
			if(value === "false" && type === "boolean"){
				value = false;
			} else if (value === "true" && type === "boolean"){
				value = true;
			} else if(!isNaN(value) && type === "number"){
				value = Number(value);
			} else {
				//Already a string
			}
			return value;
		}
	},


	_changeAnswer(evt, self) {
		var target = evt.target;
		var path = target.getAttribute('data-path');
		var type = target.getAttribute('data-type');
		var value = this._convertToNativeType(target.value, type);
		var objectPath = path.split('.') || [];
		if(objectPath.length == 0)
			return;
		var storeData = self.state.storeData;
		var answer = storeData.currentQuestion.answer;
		var item = answer;
		for(var i = 0; i < objectPath.length -1; i++) {
			var pathValue = objectPath[i];
			if(!isNaN(pathValue)){
				pathValue = parseInt(pathValue);
			}
			item = item[objectPath[i]];
		}

		item[objectPath[objectPath.length -1]] = value;
		self.setState({
			storeData: storeData
		});
	},
}

var CompletingAnswers = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData')],
	precision: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	_changeAnswer(evt) {
		answerHelper._changeAnswer(evt, this);
	},

	updateAnswer() {
		AnswerEditorActions.updateAnswer(this.state.storeData.currentQuestion.answer)
	},

	onValidate() {
		AnswerEditorActions.validateAnswer(this.state.storeData.currentQuestion.answer)
	},

	render() {
		var self = this;
		var question = this.state.storeData.currentQuestion;
		var answer = question.answer;
		return (
			<article className="AnswerEditor-Complete" onBlur={this.updateAnswer}>
				<section className="general-options">
					<section className="s-title">
						<i className="s-icon material-icons">settings</i>
						<span className="s-text">Opciones generales</span>
					</section>
					<section className="content">
						<div className="precision-container">
							<label htmlFor="precision">Precisión</label>
							<select className="form-control" id="precision" value={answer.precision} onChange={this._changeAnswer} data-type="number" data-path="precision">
								{self.precision.map((value, index) => <option value={value} key={index}>{value}</option>)}
							</select>
						</div>
						<div className="showlabel-container">
							<input type="checkbox"  id="showlabel"  data-path="showLabel" data-type="boolean" checked={answer.showLabel} value={!answer.showLabel} onChange={this._changeAnswer}/>
							<label htmlFor="showLabel">Incluir rotulo</label>
						</div>
					</section>
				</section>
				<CompletingAnswers.VariableNames answer={answer} />
				{answer.names.length > 0 ? <CompletingAnswers.CorrectValues answer={answer} handleChange={this._changeAnswer} /> : null}
				{answer.names.length > 0 ? <CompletingAnswers.CommonErrors answer={answer} handleChange={this._changeAnswer} /> : null}
				<div className="a-button-container">
					<section className="actions">
						<button className="confirm-button" onClick={this.onValidate}>
							<div className="flex">
								<i className="material-icons icon">done</i>
								<span className="text">Validar</span>
							</div>
						</button>
					</section>
				</div>
			</article>
		);
	}

});



CompletingAnswers.VariableNames = React.createClass({
	getInitialState() {
		return {
			editing: false,
			varName: "",
			currentIndex: -1
		};
	},
	onChangeField(evt) {
		this.setState({
			varName: evt.target.value
		});
	},
	onClickAdd(evt) {
		this.setState({
			editing: true,
			varName: "",
			currentIndex: -1
		});
	},
	onClickClose(evt) {
		this.setState({
			editing: false,
			varName: "",
			currentIndex: -1
		});
	},
	onEditVariable(index) {
		var name = this.props.answer.names[index];
		this.setState({
			editing: true,
			varName: name,
			currentIndex: index
		});
	},
	onDeleteVariable(index) {
		AnswerEditorActions.deleteAnswerName(index);
		this.setState({
			editing: false,
			varName: "",
			currentIndex: -1
		});
	},
	onAddVariable(evt) {
		if(this.state.currentIndex == -1)
			AnswerEditorActions.createAnswerName(this.state.varName)
		else
			AnswerEditorActions.editAnswerName(this.state.currentIndex, this.state.varName)
		this.setState({
			editing: true,
			varName: "",
			currentIndex: -1
		});
	},
	render() {
		return (
			<section className="variable-names-section">
					<section className="s-title">
						<i className="s-icon material-icons">assignment</i>
						<span className="s-text">Nombre de respuestas</span>
						{
							this.state.editing ?
							<i className="action-icon close material-icons" onClick={this.onClickClose}>add</i> :
							<i className="action-icon material-icons" onClick={this.onClickAdd}>add</i>
						}
					</section>
					<section className="content">
						<article className={`variable-name-form ${this.state.editing ? "s-editing" : ""}`}>
							<label htmlFor="varname-field">Nombre: </label>
							<input className="form-control" id="varname-field" onChange={this.onChangeField} placeholder={"Nombre"} value={this.state.varName}/>
							<div className="button-container">
								<button className="buttom-submit" onClick={this.onAddVariable}>
									<i className="material-icons icon">add</i>
									<span className="text">Crear</span>
								</button>
							</div>
						</article>
						{
							this.props.answer.names.map((answerName, index) => (
								<article className="variable-name-container" key={index}>
									<span className="name">{answerName}</span>
									<div className="vn-actions">
										<i className="icon material-icons" onClick={this.onEditVariable.bind(this, index)} index={index}>edit</i>
										<i className="icon material-icons" onClick={this.onDeleteVariable.bind(this, index)} index={index}>delete</i>
									</div>
								</article>
							))
						}

					</section>
				</section>
		);
	}

});

CompletingAnswers.CorrectValues = React.createClass({
	addCorrectValue(evt) {
		AnswerEditorActions.createCorrectValue();
	},
	deleteCorrectValue(index) {
		AnswerEditorActions.deleteCorrectValue(index);
	},
	render() {
		return (
			<section className="correct-values">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_turned_in</i>
					<span className="s-text">Valores correctos</span>
					<i className="action-icon material-icons" onClick={this.addCorrectValue}>add</i>
				</section>
				<section className="content">
					{
						this.props.answer.correctValues.map((correctValue, index) => (
							<article className="correct-value" key={index}>
								<div className="c-actions">
									<i className="material-icons" onClick={this.deleteCorrectValue.bind(this, index)}>close</i>
								</div>
								{this.props.answer.names.map((answerName, aIndex) => <input type="text" value={correctValue[answerName]} className="form-control" data-type="text" onChange={this.props.handleChange} placeholder={answerName} key={aIndex} data-type="text" data-path={`correctValues.${index}.${answerName}`}/>)}
							</article>
						))

					}

				</section>
			</section>
		);
	}

});

CompletingAnswers.CommonErrors = React.createClass({
	addCommonError(evt) {
		AnswerEditorActions.createCommonError();
	},
	deleteCommonError(index) {
		AnswerEditorActions.deleteCommonError(index);
	},
	render() {
		return (
			<section className="common-errors">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_late</i>
					<span className="s-text">Errores comunes</span>
					<i className="action-icon material-icons" onClick={this.addCommonError}>add</i>
				</section>
				<section className="content">
					{
						this.props.answer.commonErrors.map((commonError, index) => (
							<article className="common-error-value" key={index}>
								<div className="c-actions">
									<i className="material-icons" onClick={this.deleteCommonError.bind(this, index)}>close</i>
								</div>
								{this.props.answer.names.map((answerName, aIndex) => <input type="text" value={commonError.values[answerName]} className="form-control" data-type="text" onChange={this.props.handleChange} placeholder={answerName} key={aIndex} data-type="text" data-path={`commonErrors.${index}.values.${answerName}`}/>)}
								<input type="text" data-type="text" placeholder="Mensaje de retroalimentacion" data-path={`commonErrors.${index}.message`} value={commonError.message} className="form-control message" onChange={this.props.handleChange}/>
							</article>
						))

					}

				</section>
			</section>
		);
	}

});



module.exports = CompletingAnswers;