var React = require('react');
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');

var NavigatorPath = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	changeFolder() {
		this.context.router.push(`/admin/folder/${this.props.folder._id}`);
	},

	render() {
		return (
			<div className="path">
				<span className={`name`} onClick={this.changeFolder} >{this.props.folder.name}</span>
			</div>
		);
	}

});


var Navigator = React.createClass({

	propTypes: {
		route: React.PropTypes.array.isRequired,
	},

	render() {
		return (
			<div className="Navigator">
				{this.props.route.map((folder, index) => <NavigatorPath folder={folder} key={index}/>)}
			</div>
		);
	}

});

module.exports = Navigator;