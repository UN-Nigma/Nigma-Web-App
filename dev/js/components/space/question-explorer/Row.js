var React = require('react');
var moment = require('moment');

const QuestionExplorerActions = require('../../../actions/questionExplorerActions');
import {Navigation} from 'react-router';
var Row = React.createClass({
	mixins: [Navigation],
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
		//QuestionExplorerActions.changeFolder(this.props.item._id)
		this.transitionTo(`/space/u/folder/${this.props.item._id}`);

	},

	openQuestion(evt) {

	},

	selectRow(evt) {
		var self = this;
		this.setState({
			selected: !self.state.selected
		});
	},

	deleteItem(evt) {
		if(this.props.type == "question") {
			QuestionExplorerActions.deleteQuestion(this.props.item);
		} else {
			QuestionExplorerActions.deleteFolder(this.props.item);
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
						this.props.item.update_at != null ?
							moment(this.props.item.updated_at).format("MMM DD, YYYY") :
							null
					}
					</span>
				</div>
				<div className="cell">
					<div className="buttons">
						<a className="btn-floating btn-medium waves-effect waves-light green" onClick={onDoubleClickFunction}><i className="material-icons">publish</i></a>
						<a className="btn-floating btn-medium waves-effect waves-light red" onClick={this.deleteItem}><i className="material-icons">delete</i></a>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Row;
