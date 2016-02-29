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
			</section>
		);
	},

	componentDidMount() {
		var CkeditorController = QuestionEditorStore.getCKeditorController();
		this.editor = CkeditorController.createInstance('ck-editor');
		CkeditorController.setValue(this.props.question.formulation);
		console.log(CkeditorController);
	},
	componentDidUpdate(prevProps, prevState) {
		var CkeditorController = QuestionEditorStore.getCKeditorController();
		CkeditorController.setValue(this.props.question.formulation);
	},

});

module.exports = FormulationEditor;