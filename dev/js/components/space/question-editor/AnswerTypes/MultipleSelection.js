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
	},
	render() {
		var answer = this.state.storeData.currentQuestion.answer;
		return (
			<article className="AnswerEditor-MultipleSelection">
				<MultipleSelection.CorrectValues answer={answer} handleChange={this.handleChange}/>
				<MultipleSelection.CommonErrors answer={answer}/>
				<MultipleSelection.WrongValues answer={answer}/>
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
					{
						this.props.answer.correctValues.map((correctValue, index) => {
							return(
								<article className="common-error-value" key={index} >
									<div className="c-actions">
										<i className="material-icons icon" onClick={AnswerEditorActions.deleteCorrectValue.bind(index)}>delete</i>
									</div>
									<label className="form-label">{`Valor correcto ${index + 1}`}</label>
									<textarea data-path={`${path}.${index}`} className="form-control" value={correctValue} onChange={this.props.handleChange}/>
								</article>
							);
						})
					}
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
					{
						this.props.answer.commonErrors.map((CommonError, index) => {
							return(
								<article className="common-error-value" key={index} >
									<div className="c-actions">
										<i className="material-icons icon" onClick={AnswerEditorActions.deleteCommonError.bind(index)}>delete</i>
									</div>
									<label className="form-label">{`Valor correcto ${index + 1}`}</label>
									<textarea data-path={`${path}.${index}.value`} className="form-control" value={CommonError.value} onChange={this.props.handleChange}/>
									<textarea data-path={`${path}.${index}.message`} className="form-control" value={CommonError.message} onChange={this.props.handleChange}/>
								</article>
							);
						})
					}
				</section>
			</article>
		);
	}
});

MultipleSelection.WrongValues = React.createClass({
	render() {
		return (
			<article className="wrongValues">
				<section className="s-title">
					<i className="s-icon material-icons">error</i>
					<span className="s-text">Valores Incorrectos</span>
					<i className="action-icon material-icons" onClick={this.addCorrectValue}>add</i>
				</section>
			</article>
		);
	}
});

module.exports = MultipleSelection;