var React = require('react');
var Reflux = require('reflux');
var QuestionExplorer = require('./question-explorer/QuestionExplorer');
var Navigator = require('./question-explorer/Navigator');

window.QuestionExplorerStore = require('../../stores/questionExplorerStore');
var QuestionExplorerActions = require('../../actions/questionExplorerActions');

var Space = React.createClass({
	mixins: [Reflux.connect(QuestionExplorerStore, 'storeData')],
	createQuestion() {
		QuestionExplorerActions.createQuestion("Nombre quemado", this.state.storeData.currentFolder._id);
	},


	componentWillReceiveProps: function(nextProps) {
		if(nextProps.params.folderId != undefined && nextProps.params.folderId != null) {
			QuestionExplorerActions.changeFolder(nextProps.params.folderId);
		}
	},

	componentDidMount() {
		if(this.props.params.folderId != undefined && this.props.params.folderId != null) {
			QuestionExplorerActions.changeFolder(this.props.params.folderId);
		} else
			QuestionExplorerActions.listMyFolders();
	},

	createFolder() {
		QuestionExplorerActions.createFolder("Nombre quemado", this.state.storeData.currentFolder._id);
	},
	render() {
		return (
			<div className="UserDrive">
				<div className="topbar-container">
					<Navigator route={this.state.storeData.currentRoute} />
					<div className="Actions">
						<button className="btn btn-success" onClick={this.createQuestion}>Crear pregunta</button>
						<button className="btn btn-success" onClick={this.createFolder}>Crear carpeta</button>
					</div>
				</div>
				<div className="container">
					<QuestionExplorer storeData={this.state.storeData}/>
				</div>
			</div>
		);
	}

});

module.exports = Space;