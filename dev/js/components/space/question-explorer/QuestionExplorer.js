//Dep
var React = require('react');
var Reflux = require('reflux');
//Components
var Header = require('./Header');
var Row =  require('./Row');
var Navigator =  require('./Navigator');
//Stores
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');
var QuestionExplorerStore = require('../../../stores/questionExplorerStore');

var QuestionExplorer = React.createClass({
	mixins: [Reflux.connect(QuestionExplorerStore, 'storeData')],

	clickHeaderAction(evt) {
		console.log(evt.target);
	},

	componentDidMount() {
		QuestionExplorerActions.listFolders();
	},

	render() {
		var questions = (this.state.storeData.currentFolder == null) ? [] : this.state.storeData.currentFolder.questions;
		var folders = (this.state.storeData.currentFolder == null) ? [] : this.state.storeData.currentFolder.folders;
		return (
			<div className="QuestionExplorer">
				<Navigator route={this.state.storeData.currentRoute} />
				<div className="file-table">
					<div className="headers">
						<Header name="Nombre" clickable={true} clickAction={this.clickHeaderAction} />
						<Header name="Propietario" />
						<Header name="Fecha de creación" clickable={true} clickAction={this.clickHeaderAction} />
						<Header name="Ultima modificación" clickable={true} clickAction={this.clickHeaderAction} />
					</div>

					{folders.map((folder, index) => <Row type="folder" item={folder}  key={index}/>)}
					{questions.map((question, index) => <Row type="question" item={question}  key={index}/>)}
				</div>

			</div>
		);
	}
});
module.exports = QuestionExplorer;
