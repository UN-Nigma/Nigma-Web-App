var React = require('react');
var Reflux = require('reflux');
var QuestionExplorer = require('./question-explorer/QuestionExplorer');
var Navigator = require('./question-explorer/Navigator');
var NavigatorSidebar = require('./question-explorer/NavigatorSidebar');
window.QuestionExplorerStore = require('../../stores/questionExplorerStore');

var Space = React.createClass({
	mixins: [Reflux.connect(QuestionExplorerStore, 'storeData')],
	render() {
		return (
			<div className="UserDrive">
				<Navigator route={this.state.storeData.currentRoute} />
				<div className="container">
					<NavigatorSidebar />
					<QuestionExplorer storeData={this.state.storeData}/>
				</div>
			</div>
		);
	}

});

module.exports = Space;