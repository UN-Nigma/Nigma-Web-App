var React = require('react');
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');

var NavigatorPath = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	changeFolder() {
		this.context.router.push(`/space/u/folder/${this.props.folder._id}`);
	},

	render() {
		return (
			<div className="path">
				<span className={`name ${this.props.isLast ? "last" : ""}`} onClick={this.changeFolder} >{this.props.folder.name}</span>
				{this.props.isLast ? null: <span className="separator"> > </span>}
			</div>
		);
	}

});


var Navigator = React.createClass({

	propTypes: {
		route: React.PropTypes.array.isRequired,
	},

	render() {
		var routeSize = this.props.route.length;
		return (
			<div className="Navigator">
				{this.props.route.map((folder, index) => <NavigatorPath folder={folder} isLast={((index + 1) == routeSize)} key={index}/>)}
			</div>
		);
	}

});

module.exports = Navigator;