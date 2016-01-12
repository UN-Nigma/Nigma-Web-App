import React from 'react';
import Header from './Header'
import Row from './Row'
var MenuActions = require('../../../actions/menu-actions');
var QuestionExplorer = React.createClass({
	getInitialState: function() {
		return {
			actualFolder: MenuStore.getRootFolder()
		};
	},

	clickHeaderAction(evt) {
		console.log(evt.target);
	},

	componentDidMount() {
		MenuStore.addChangeListener(this._handleChange)
		MenuActions.listFolders();
	},

	_handleChange() {
		console.log(MenuStore.getRootFolder());
		this.setState({
			actualFolder: MenuStore.getRootFolder()
		});
	},

	render() {
		var questions = (this.state.actualFolder == null) ? [] : this.state.actualFolder.questions;
		var folders = (this.state.actualFolder == null) ? [] : this.state.actualFolder.folders;
		return (
			<div className="QuestionExplorer">
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
