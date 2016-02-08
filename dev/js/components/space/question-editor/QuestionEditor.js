var React = require('react');
var Reflux = require('reflux');
var QuestionEditorStore = require('../../../stores/QuestionEditorStore');
var QuestionEditorActions = require('../../../actions/QuestionEditorActions');
var Collapsible = require('../../util/collapsible');

/*  Question editor  components*/
var VariableEditor = require('./VariableEditor');
var AnswerEditor = require('./AnswerEditor');
var FormulationEditor = require('./FormulationEditor');
var MetadataEditor = require('./MetadataEditor');

var QuestionEditor = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData')],
	componentWillMount() {
		var questionId = this.props.params.questionId;
		if(questionId != undefined && questionId != null) {
			QuestionEditorActions.loadQuestion(questionId);
		}
	},

	exportQuestion() {
		QuestionEditorActions.exportAndDownloadQuestion();
	},
	saveQuestion() {
		QuestionEditorActions.saveQuestion();
	},
	previewQuestion() {
		QuestionEditorActions.previewQuestion();
	},

	getSections() {
		var sections = [];
		var currentQuestion = this.state.storeData.currentQuestion;
		sections.push({
			title: "Variables",
			icon: "functions",
			content: (<VariableEditor question={currentQuestion} />)
		})

		sections.push({
			title: "Formulación",
			icon: "edit",
			content: (<FormulationEditor question={currentQuestion}/>)
		})
		//Answer Editor is subcribed to updates from the store
		sections.push({
			title: "Respuestas",
			icon: "done",
			content: (<AnswerEditor question={currentQuestion}/>)
		})

		sections.push({
			title: "Metadatos",
			icon: "person",
			content: (<MetadataEditor />)
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
					<div className="nav-actions">
						<button className="nav-button" onClick={this.exportQuestion}>
							<i className="material-icons icon">done</i>
							<span className="text">Exportar</span>
						</button>
						<button className="nav-button" onClick={this.previewQuestion}>
							<i className="material-icons icon">search</i>
							<span className="text" >Previsualizar</span>
						</button>
						<button className="nav-button" onClick={this.saveQuestion}>
							<i className="material-icons icon">save</i>
							<span className="text">Guardar</span>
						</button>
					</div>
				</nav>
				<section className="question-content">
					<Collapsible sections={this.getSections()} open={[0,1,2,3]}/>
				</section>
			</section>
		);
	}

});

module.exports = QuestionEditor;