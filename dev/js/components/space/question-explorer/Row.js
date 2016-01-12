import React from 'react';
var MenuActions = require('../../../actions/menu-actions');




var Row = React.createClass({

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
		console.log("working");
		console.log(this.props.item);
	},

	openQuestion(evt) {

	},

	selectRow(evt) {
		this.setState({
			selected: true
		});
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
				<div className="cell name">
					<i className="material-icons">{type}</i>
					<span className="text">{this.props.item.name}</span>
				</div>
				<div className="cell owner">
					<span className="text">{this.props.item.owner}</span>
				</div>
				<div className="cell created-at">
					<span className="text">{this.props.item.created_at}</span>
				</div>
				<div className="cell last-modified">
					<span className="text">{this.props.item.update_at}</span>
				</div>
			</div>
		);
	}
});

module.exports = Row;
