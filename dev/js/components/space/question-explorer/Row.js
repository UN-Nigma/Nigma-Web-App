import React from 'react'
import moment from 'moment'
import DeepLinkStateMixin from '../../../mixins/DeepLinkState'
import Modal from '../../util/modal'
const QuestionExplorerActions = require('../../../actions/questionExplorerActions');
var Row = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			selected: false
		};
	},

	propTypes: {
		item: React.PropTypes.object.isRequired,
		type: React.PropTypes.string.isRequired
	},

	changeFolder(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.context.router.push(`/admin/folder/${this.props.item._id}`);
	},

	openQuestion(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		window.open(`/admin/question/${this.props.item._id}`);
	},

	selectRow(evt) {
		var self = this;
		evt.preventDefault();
		evt.stopPropagation();
		this.setState({
			selected: !self.state.selected
		});
	},

	deleteItem(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if(this.props.type == "question") {
			QuestionExplorerActions.deleteQuestion(this.props.item);
		} else {
			QuestionExplorerActions.deleteFolder(this.props.item);
		}
	},

	editItem(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if(this.props.type == "question") {
			var content = <CreateQuestionModal question={this.props.item} index={this.props.index}/>
			var modal = React.render(content, document.getElementById('modal_container'));
			modal.openModal();
		} else {
			var content = <CreateFolderModal folder={this.props.item} index={this.props.index}/>
			var modal = React.render(content, document.getElementById('modal_container'));
			modal.openModal();
		}
	},

	render() {
		var type = "", onDoubleClickFunction = null;
		var classSelected = this.state.selected ? "selected" : "";
		if(this.props.type == "question"){
			type = "help";
			onDoubleClickFunction = this.openQuestion;
		} else {
			type = "folder";
			onDoubleClickFunction = this.changeFolder;
		}

		console.log(this.props.item);

		return (
			<div className={`Row ${classSelected}`} onDoubleClick={onDoubleClickFunction} onClick={this.selectRow}>
				<div className="cell">
					<div className="name">
						<i className="material-icons">{type}</i>
						<span className="text">{this.props.item.name}</span>
					</div>
				</div>
				<div className="cell">
					<span className="text">{this.props.item.owner.name}</span>
				</div>
				<div className="cell">
					<span className="text">
						{
							this.props.item.created_at != null ?
								moment(this.props.item.created_at).format("MMM DD, YYYY") :
								null
						}
					</span>
				</div>
				<div className="cell">
					<span className="text">
					{
						this.props.item.updated_at != null ?
							moment(this.props.item.updated_at).format("MMM DD, YYYY") :
							null
					}
					</span>
				</div>
				<div className="cell">
					<div className="buttons">
						<button className="round-button danger" onClick={this.deleteItem}><i className="material-icons">delete</i></button>
						<button className="round-button success" onClick={this.editItem}><i className="material-icons">edit</i></button>
					</div>
				</div>
			</div>
		);
	}
});

var CreateQuestionModal = React.createClass({
	mixins: [DeepLinkStateMixin],
	getInitialState() {
		return {
			questionName: this.props.question.name,
			type: this.props.question.type
		};
	},

	onChange(evt) {
		this.changeState(evt, this);
	},
	openModal() {
		this.refs.modal.openModal();
	},
	modifyQuestion() {
		if(this.state.questionName != "" && this.state.type != "") {
			QuestionExplorerActions.updateQuestion(this.props.question, this.props.index, this.state.questionName, this.props.question.type);
			this.refs.modal.closeModal();
		} else {
			NotificationActions.showNotification("Por favor completar toda la información para crear la pregunta", "warning");
		}
	},
	cancelAction() {
		this.refs.modal.closeModal();
		this.state = this.getInitialState();
	},
	render() {
		return (
			<Modal title="Modificar pregunta" ref="modal" positiveActionName="Guardar" positiveAction={this.modifyQuestion} negativeAction={this.cancelAction}>
				<article className="QuestionModal">
					<section className="group">
						<label htmlFor="questionName">Nombre de la pregunta</label>
						<input type="text" id="questionName" placeholder="Nombre de la pregunta" className="form-control" data-path="questionName" onChange={this.onChange} value={this.state.questionName}/>
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
			folderName: this.props.folder.name
		};
	},

	onChange(evt) {
		this.changeState(evt, this);
	},
	openModal() {
		this.refs.modal.openModal();
	},
	updateFolder() {
		if(this.state.folderName != "") {
			QuestionExplorerActions.updateFolder(this.props.folder, this.props.index, this.state.folderName);
			this.refs.modal.closeModal();
		} else {
			NotificationActions.showNotification("Por favor completar toda la información para modificar la carpeta", "warning");
		}
	},
	cancelAction() {
		this.refs.modal.closeModal();
		this.state = this.getInitialState();
	},
	render() {
		return (
			<Modal title="Modificar carpeta" ref="modal" positiveActionName="guardar" positiveAction={this.updateFolder} negativeAction={this.cancelAction}>
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

module.exports = Row;
