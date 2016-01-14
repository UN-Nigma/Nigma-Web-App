var React = require('react');
var moment = require('moment');

const QuestionExplorerActions = require('../../../actions/questionExplorerActions');

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
		QuestionExplorerActions.changeFolder(this.props.item._id)
	},

	openQuestion(evt) {

	},

	selectRow(evt) {
		var self = this;
		this.setState({
			selected: !self.state.selected
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
				<div className="cell">
					<div className="name">
						<i className="material-icons">{type}</i>
						<span className="text">{this.props.item.name}</span>
					</div>
				</div>
				<div className="cell">
					<span className="text">{this.props.item.owner}</span>
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
							moment(this.props.item.update_at).format("MMM DD, YYYY") :
							null
					}
					</span>
				</div>
			</div>
		);
	}
});

module.exports = Row;
