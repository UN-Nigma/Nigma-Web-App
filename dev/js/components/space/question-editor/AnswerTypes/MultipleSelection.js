var React = require('react');
var Reflux = require('reflux');
var AnswerEditorActions = require('../../../../actions/QuestionEditorActions/AnswerEditorActions');
var QuestionEditorStore = require('../../../../stores/QuestionEditorStore');
var DeepLinkStateMixin = require('../../../../mixins/DeepLinkState');
var Tooltip = require('../../../util/popover');

var currentTooltip = null;
var MultipleSelection = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData'), DeepLinkStateMixin],
	handleChange(evt) {
		this.changeState(evt, this);
		console.log(evt.target.value)
	},
	render() {
		var answer = this.state.storeData.currentQuestion.answer;
		return (
			<article className="AnswerEditor-MultipleSelection">
				<MultipleSelection.CorrectValues answer={answer} handleChange={this.handleChange}/>
				<MultipleSelection.CommonErrors answer={answer} handleChange={this.handleChange}/>
				<MultipleSelection.WrongValues answer={answer} handleChange={this.handleChange}/>
			</article>
		);
	}

});

MultipleSelection.CorrectValues = React.createClass({

	render() {
		var path = "storeData.currentQuestion.answer.correctValues";
		return (
			<article className="correctValues">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_turned_in</i>
					<span className="s-text">Valores correctos</span>
					<i className="action-icon material-icons" onClick={AnswerEditorActions.createCorrectValue}>add</i>
				</section>
				<section className="content">
						<div className="options">
							{
									this.props.answer.correctValues.map((correctValue, index) => {
										return(
											<div className="option" key={index} >
												<section className="inputs">
													<input placeholder={"Opción"} type="text" data-path={`${path}.${index}`} className="form-control value" value={correctValue} onChange={this.props.handleChange}/>
												</section>
												<div className="c-actions">
													<i className="edit" onClick={AnswerEditorActions.deleteCorrectValue.bind(index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteCorrectValue.bind(index)}/>
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
	render() {
		var path = "storeData.currentQuestion.answer.commonErrors";
		return (
			<article className="CommonErrors">
				<section className="s-title">
					<i className="s-icon material-icons">assignment_late</i>
					<span className="s-text">Errores comunes</span>
					<i className="action-icon material-icons" onClick={AnswerEditorActions.createCommonError}>add</i>
				</section>
				<section className="content">
					<div className="options">
							{
									this.props.answer.commonErrors.map((commonErrors, index) => {
										return(
											<article className="option" key={index} >
												<section className="inputs">
													<input type="text" placeholder={"Opción"} data-path={`${path}.${index}.value`} className="form-control value" value={commonErrors.value} onChange={this.props.handleChange}/>
													<input type="text" data-path={`${path}.${index}.message`} className="form-control message" placeholder={"Retroalimentación"} value={commonErrors.message} onChange={this.props.handleChange}/>
												</section>
												<div className="c-actions">
													<i className="edit" onClick={AnswerEditorActions.deleteCorrectValue.bind(index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteCommonError.bind(index)}/>
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
	render() {
		var path = "storeData.currentQuestion.answer.wrongValues";
		return (
			<article className="wrongValues">
				<section className="s-title">
					<i className="s-icon material-icons">error</i>
					<span className="s-text">Valores Incorrectos</span>
					<i className="action-icon material-icons" onClick={AnswerEditorActions.createWrongValue}>add</i>
				</section>
				<section className="content">
					<div className="options">
							{
									this.props.answer.wrongValues.map((wrongValue, index) => {
										return(
											<article className="option" key={index} >
												<section className="inputs">
													<input type="text" data-path={`${path}.${index}`} className="form-control value" value={wrongValue} placeholder={"Opción"} onChange={this.props.handleChange}/>
												</section>
												<div className="c-actions">
													<i className="edit" onClick={AnswerEditorActions.editWrongValue.bind(index)} />
													<i className="delete" onClick={AnswerEditorActions.deleteWrongValue.bind(index)}/>
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

module.exports = MultipleSelection;