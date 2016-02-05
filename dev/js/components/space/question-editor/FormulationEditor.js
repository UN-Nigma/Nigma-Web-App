var React = require('react');
var CkeditorController = require('../../../utils/ckeditor');
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
		this.editor = CkeditorController.createInstance('ck-editor');
		CkeditorController.setValue(this.props.question.formulation);
	},
	componentDidUpdate(prevProps, prevState) {
		CkeditorController.setValue(this.props.question.formulation);
	},

});

module.exports = FormulationEditor;