//Dep
var React = require('react');
var Reflux = require('reflux');
//Components
var Headers = require('./Headers');
var Row =  require('./Row');
var Navigator =  require('./Navigator');
//Stores
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');


var QuestionExplorer = React.createClass({
	getDefaultProps: function() {
		return {
			storeData: {}
		};
	},

	render() {
		var questions = (this.props.storeData.currentFolder == null) ? [] : this.props.storeData.currentFolder.questions;
		var folders = (this.props.storeData.currentFolder == null) ? [] : this.props.storeData.currentFolder.folders;
		return (
			<div className="QuestionExplorer">
				<div className="file-table">
					<Headers />
					{folders.map((folder, index) => <Row type="folder" item={folder}  key={index} index={index}/>)}
					{questions.map((question, index) => <Row type="question" item={question}  key={index} index={index}/>)}
				</div>

		  </div>
		);
	}
});
module.exports = QuestionExplorer;
