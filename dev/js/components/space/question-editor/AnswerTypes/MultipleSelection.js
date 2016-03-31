import React from 'react'
import Reflux from 'reflux'
import AnswerEditorActions from '../../../../actions/QuestionEditorActions/AnswerEditorActions'
import QuestionEditorStore from '../../../../stores/QuestionEditorStore'
import DeepLinkStateMixin from '../../../../mixins/DeepLinkState'
import Tooltip from '../../../util/popover'
import Modal from '../../../util/modal'
import Ckeditor from '../../../../utils/ckeditor'
var currentTooltip = null;
var MultipleSelection = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData'), DeepLinkStateMixin],
	handleChange(evt) {
		this.changeState(evt, this);
		console.log(evt.target.value)
	},
	modifyState(path, value) {
		this.manualChangeState(path, value, this);
	},
	onValidate() {
		AnswerEditorActions.validateAnswer(this.state.storeData.currentQuestion.answer)
	},
	render() {
		var answer = this.state.storeData.currentQuestion.answer;
		return (
			<article className="AnswerEditor-MultipleSelection">
				<MultipleSelection.CorrectValues answer={answer} handleChange={this.handleChange} changeState={this.modifyState}/>
				<MultipleSelection.CommonErrors answer={answer} handleChange={this.handleChange} changeState={this.modifyState}/>
				<MultipleSelection.WrongValues answer={answer} handleChange={this.handleChange} changeState={this.modifyState}/>
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

MultipleSelection.CorrectValues = React.createClass({
	editCorrectValue(index) {
		var value = "";
		if(index < this.props.answer.correctValues.length)
			value = this.props.answer.correctValues[index];
		var content = <EditNewModal  type={"correctValues"} initialOption={value} index={index} saveFunction={this.props.changeState} />
		var modal = React.render(content, document.getElementById('modal_container'));
		modal.openModal();
	},
	createCorrectValue(evt) {
		AnswerEditorActions.createCorrectValue();
		this.editCorrectValue(this.props.answer.correctValues.length);
	},
	render() {
		var path = "storeData.currentQuestion.answer.correctValues";
		return (
			<article className="correctValues">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_turned_in</i>
					<span className="s-text">Valores correctos</span>
					<i className="action-icon material-icons" onClick={this.createCorrectValue}>add</i>
				</section>
				<section className="content">
						<div className="options">
							{
									this.props.answer.correctValues.map((correctValue, index) => {
										return(
											<div className="option" key={index} >
												<section className="inputs">
													<div dangerouslySetInnerHTML={{__html: correctValue}} />
												</section>
												<div className="c-actions">
													<i className="edit" onClick={this.editCorrectValue.bind(this, index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteCorrectValue.bind(this, index)}/>
												</div>
											</div>
										);
									})
							}
						</div>
				</section>
			</article>
		);
	}
});

MultipleSelection.CommonErrors = React.createClass({
	editCommonError(index) {
		var value = "";
		if(index < this.props.answer.commonErrors.length)
			value = this.props.answer.commonErrors[index].value;
		var content = <EditNewModal  type={"commonErrors"} initialOption={value} index={index} saveFunction={this.props.changeState} />
		var modal = React.render(content, document.getElementById('modal_container'));
		modal.openModal();
	},
	createCommonError(evt) {
		AnswerEditorActions.createCommonError();
		this.editCommonError(this.props.answer.commonErrors.length)
	},
	render() {
		var path = "storeData.currentQuestion.answer.commonErrors";
		return (
			<article className="CommonErrors">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_late</i>
					<span className="s-text">Errores comunes</span>
					<i className="action-icon material-icons" onClick={this.createCommonError}>add</i>
				</section>
				<section className="content">
					<div className="options">
							{
									this.props.answer.commonErrors.map((commonErrors, index) => {
										return(
											<article className="option" key={index} >
												<section className="inputs">
													<div dangerouslySetInnerHTML={{__html: commonErrors.value}} />
													<input type="text" data-path={`${path}.${index}.message`} className="form-control message" placeholder={"Retroalimentación"} value={commonErrors.message} onChange={this.props.handleChange}/>
												</section>
												<div className="c-actions">
													<i className="edit" onClick={this.editCommonError.bind(this, index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteCommonError.bind(this, index)}/>
												</div>
											</article>
										);
									})
							}
						</div>
				</section>
			</article>
		);
	}
});

MultipleSelection.WrongValues = React.createClass({
	editWrongValue(index) {
		var value = "";
		if(index < this.props.answer.wrongValues.length)
			value = this.props.answer.wrongValues[index];
		var content = <EditNewModal  type={"wrongValues"} initialOption={value} index={index} saveFunction={this.props.changeState} />
		var modal = React.render(content, document.getElementById('modal_container'));
		modal.openModal();
	},
	createWrongValue(evt) {
		AnswerEditorActions.createWrongValue();
		this.editWrongValue(this.props.answer.wrongValues.length);
	},
	render() {
		var path = "storeData.currentQuestion.answer.wrongValues";
		return (
			<article className="wrongValues">
				<section className="s-title">
					<i className="s-icon material-icons">error</i>
					<span className="s-text">Valores Incorrectos</span>
					<i className="action-icon material-icons" onClick={this.createWrongValue}>add</i>
				</section>
				<section className="content">
					<div className="options">
							{
									this.props.answer.wrongValues.map((wrongValue, index) => {
										return(
											<article className="option" key={index} >
												<section className="inputs">
													<div dangerouslySetInnerHTML={{__html: wrongValue}} />
												</section>
												<div className="c-actions">
													<i className="edit" onClick={this.editWrongValue.bind(this, index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteWrongValue.bind(this, index)}/>
												</div>
											</article>
										);
									})
							}
						</div>
				</section>
			</article>
		);
	}
});


var EditNewModal = React.createClass({
	mixins: [DeepLinkStateMixin],
	getDefaultProps() {
		return {
			initialText: "",
			initialOption: ""
		};
	},
	getInitialState() {
		var self = this;
		return {
			text: self.props.initialText || ""
		};
	},
	handleChange(evt) {
		this.changeState(evt, this);
	},
	openModal() {
		this.refs.modal.openModal();
		this.setState(this.getInitialState());
	},
	cancelModal() {
		this.refs.modal.closeModal();
	},
	saveChanges() {
		var type = this.props.type;
		var value = this.CkeditorController.getValue();
		if(type === "correctValues") {
			this.props.saveFunction(`storeData.currentQuestion.answer.correctValues.${this.props.index}`, value);
		} else if(type === "commonErrors") {
			this.props.saveFunction(`storeData.currentQuestion.answer.commonErrors.${this.props.index}.value`, value);
		} else if(type == "wrongValues") {
			this.props.saveFunction(`storeData.currentQuestion.answer.wrongValues.${this.props.index}`, value);
		}
		this.refs.modal.closeModal();
	},
	render() {
		return (
			<Modal title="Editor" ref="modal" positiveActionName="Guardar" positiveAction={this.saveChanges} negativeAction={this.cancelModal}>
				<div className="ck-editor" id="ck-editor-modal"/>
			</Modal>
		);
	},

	componentDidMount() {

		this.CkeditorController = new  Ckeditor(QuestionEditorStore.getCurrentQuestion()._id);
		this.CkeditorController.createInstance('ck-editor-modal');
		this.CkeditorController.setValue(this.props.initialOption);
	},

});

module.exports = MultipleSelection;