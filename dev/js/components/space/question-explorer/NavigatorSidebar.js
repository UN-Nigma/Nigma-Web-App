var React = require('react');
const QuestionExplorerActions = require('../../../actions/questionExplorerActions');
var NavigatorSidebar = React.createClass({

	render: function() {
		return (
			<div className="sidebar">
				<a className="waves-effect waves-light btn red create-btn">Nuevo</a>
				<ul className="options">
					<li onClick={QuestionExplorerActions.listMyFolders}>Mis preguntas</li>
					<li onClick={QuestionExplorerActions.listSharedFolders}>Compartidas conmigo</li>
				</ul>
			</div>
		);
	}

});

module.exports = NavigatorSidebar;