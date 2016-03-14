import React from 'react'
import Reflux from 'reflux'
import DeepLinkStateMixin from '../../mixins/DeepLinkState'

//Components
import Modal from '../util/modal'
import QuestionExplorer from './question-explorer/QuestionExplorer'
import Navigator from './question-explorer/Navigator'



window.QuestionExplorerStore = require('../../stores/questionExplorerStore');
import QuestionExplorerActions from '../../actions/questionExplorerActions'
import NotificationActions from '../util/actions/NotificationActions'


var Explorer = React.createClass({
	mixins: [Reflux.connect(QuestionExplorerStore, 'storeData')],
	createQuestion() {
		var content = <CreateQuestionModal currentFolderId={this.state.storeData.currentFolder._id} />
		var modal = React.render(content, document.getElementById('modal_container'));
		modal.openModal();
	},


	componentWillReceiveProps(nextProps) {
		if(nextProps.params.folderId != undefined && nextProps.params.folderId != null) {
			QuestionExplorerActions.changeFolder(nextProps.params.folderId);
		} else {
			QuestionExplorerActions.listMyFolders();
		}
	},

	componentDidMount() {
		if(this.props.params.folderId != undefined && this.props.params.folderId != null) {
			QuestionExplorerActions.changeFolder(this.props.params.folderId);
		} else
			QuestionExplorerActions.listMyFolders();
	},

	createFolder() {
		var content = <CreateFolderModal currentFolderId={this.state.storeData.currentFolder._id} />
		var modal = React.render(content, document.getElementById('modal_container'));
		modal.openModal();
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


var CreateQuestionModal = React.createClass({
	mixins: [DeepLinkStateMixin],
	getInitialState() {
		return {
			questionName: "" ,
			type: "Complete"
		};
	},

	onChange(evt) {
		this.changeState(evt, this);
	},
	openModal() {
		this.refs.modal.openModal();
	},
	createQuestion() {
		if(this.state.questionName != "" && this.state.type != "") {
			QuestionExplorerActions.createQuestion(this.state, this.props.currentFolderId);
			this.refs.modal.closeModal();
		} else {
			NotificationActions.showNotification("Por favor completar toda la información para crear la pregunta", "warning");
		}
	},
	render() {
		return (
			<Modal title="Crear pregunta" ref="modal" positiveActionName="Crear" positiveAction={this.createQuestion} negativeAction={this.closeAndDelete}>
				<article className="QuestionModal">
					<section className="group">
						<label htmlFor="questionName">Nombre de la pregunta</label>
						<input type="text" id="questionName" placeholder="Nombre de la pregunta" className="form-control" data-path="questionName" onChange={this.onChange} value={this.state.questionName}/>
					</section>
					<section className="group">
						<label htmlFor="type">Tipo de pregunta</label>
						<select className="form-control" id="type" value={this.state.type} onChange={this.onChange} data-path="type">
							<option value="Complete">Completación</option>
							<option value="MultipleSelection">Selección multiple</option>
							<option value="Matching">Emparejamiento</option>
							<option value="Ordering">Ordenamiento</option>
						</select>
					</section>
				</article>
			</Modal>
		);
	}

});


var CreateFolderModal = React.createClass({
	mixins: [DeepLinkStateMixin],
	getInitialState() {
		return {
			folderName: ""
		};
	},

	onChange(evt) {
		this.changeState(evt, this);
	},
	openModal() {
		this.refs.modal.openModal();
	},
	createQuestion() {
		if(this.state.folderName != "") {
			QuestionExplorerActions.createFolder(this.state.folderName, this.props.currentFolderId);
			this.refs.modal.closeModal();
		} else {
			NotificationActions.showNotification("Por favor completar toda la información para crear la carpeta", "warning");
		}
	},
	render() {
		return (
			<Modal title="Crear carpeta" ref="modal" positiveActionName="Crear" positiveAction={this.createQuestion} negativeAction={this.closeAndDelete}>
				<article className="QuestionModal">
					<section className="group">
						<label htmlFor="folderName">Nombre de la carpeta</label>
						<input type="text" id="folderName" placeholder="Nombre de la carpeta" className="form-control" data-path="folderName" onChange={this.onChange} value={this.state.folderName}/>
					</section>
				</article>
			</Modal>
		);
	}

});

module.exports = Explorer;