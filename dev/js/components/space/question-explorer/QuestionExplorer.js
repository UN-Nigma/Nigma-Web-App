//Dep
var React = require('react');
var Reflux = require('reflux');
//Components
var Header = require('./Header');
var Row =  require('./Row');
var Navigator =  require('./Navigator');
//Stores
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');


var QuestionExplorer = React.createClass({
	getDefaultProps: function() {
		return {
			storeData: {}
		};
	},
	clickHeaderAction(evt) {
		console.log(evt.target);
	},

	componentDidMount() {
		console.log("lol")
		QuestionExplorerActions.listMyFolders();
	},

	createQuestion() {
		QuestionExplorerActions.createQuestion("Nombre quemado", this.props.storeData.currentFolder._id);
	},

	createFolder() {
		QuestionExplorerActions.createFolder("Nombre quemado", this.props.storeData.currentFolder._id);
	},

	render() {
		var questions = (this.props.storeData.currentFolder == null) ? [] : this.props.storeData.currentFolder.questions;
		var folders = (this.props.storeData.currentFolder == null) ? [] : this.props.storeData.currentFolder.folders;
		return (
			<div className="QuestionExplorer">
				<div className="file-table">
					<div className="headers">
						<Header name="Nombre" clickable={true} clickAction={this.clickHeaderAction} />
						<Header name="Propietario" />
						<Header name="Fecha de creación" clickable={true} clickAction={this.clickHeaderAction} />
						<Header name="Ultima modificación" clickable={true} clickAction={this.clickHeaderAction} />
						<Header name="Acciones" />
					</div>

					{folders.map((folder, index) => <Row type="folder" item={folder}  key={index} index={index}/>)}
					{questions.map((question, index) => <Row type="question" item={question}  key={index} index={index}/>)}
				</div>
				<div className="fixed-action-btn" style={{"bottom": "45", "right": "24"}}>
				  <a className="btn-floating btn-large red">
				    <i className="large material-icons">add</i>
				  </a>
				  <ul>
				    <li><a className="btn-floating red" onClick={this.createQuestion}><i className="material-icons">help</i></a></li>
				    <li><a className="btn-floating yellow darken-1" onClick={this.createFolder}><i className="material-icons">folder</i></a></li>
				  </ul>
			  </div>
		  </div>
		);
	}
});
module.exports = QuestionExplorer;
