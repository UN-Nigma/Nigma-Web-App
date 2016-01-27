var React = require('react');
var Reflux = require('reflux');
var QuestionEditorStore = require('../../../stores/QuestionEditorStore');
var QuestionEditorActions = require('../../../actions/QuestionEditorActions');
var Collapsible = require('../../util/collapsible');
var QuestionEditor = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData')],
	componentWillMount() {
		var questionId = this.props.params.questionId;
		if(questionId != undefined && questionId != null) {
			QuestionEditorActions.loadQuestion(questionId);
		}
	},

	getSections() {
		var sections = [];
		sections.push({
			title: "Variables",
			icon: "help",
			content: (<div><h1>Variables</h1></div>)
		})

		sections.push({
			title: "Formulación",
			icon: "edit",
			content: (<div><h1>Formulación</h1></div>)
		})

		sections.push({
			title: "Respuestas",
			icon: "done",
			content: (<div><h1>Respuestas</h1></div>)
		})

		sections.push({
			title: "Metadatos",
			icon: "person",
			content: (<div><h1>Metadatos</h1></div>)
		})

		return sections;
	},
	render() {
		var question = this.state.storeData.currentQuestion;
		if(question == undefined || question == null) {
			return null;
		}
		return (
			<section className="QuestionEditor">
				<section className="question-name">
					<span className="text">{question.name}</span>
				</section>
				<nav className="navbar">

				</nav>
				<section className="question-content">
					<Collapsible sections={this.getSections()} />
				</section>
			</section>
		);
	}

});

module.exports = QuestionEditor;