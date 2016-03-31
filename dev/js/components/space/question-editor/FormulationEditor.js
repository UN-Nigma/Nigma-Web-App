var React = require('react');
var FormulationEditorActions = require('../../../actions/QuestionEditorActions/FormulationEditorActions');
var FormulationEditor = React.createClass({
	saveData(data) {
		FormulationEditorActions.saveFormulationData(data);
	},
	render() {
		return (
			<section className="formulation">
				<div className="ck-editor" id="ck-editor"/>
				<p className="disclaimer">Arrastre y suelte sus imagenes adentro del editor para poder usarlas</p>
			</section>
		);
	},

	componentDidMount() {
		var CkeditorController = QuestionEditorStore.getCKeditorController();
		CkeditorController.setQuestionId(this.props.question._id);
		this.editor = CkeditorController.createInstance('ck-editor');
		CkeditorController.setValue(this.props.question.formulation);
		CkeditorController.setEvents();
		console.log(CkeditorController);
	},
	componentDidUpdate(prevProps, prevState) {
		var CkeditorController = QuestionEditorStore.getCKeditorController();
		CkeditorController.setValue(this.props.question.formulation);
	},

});

module.exports = FormulationEditor;