var Reflux = require('reflux');

var QuestionEditorActions = Reflux.createActions([
	"loadQuestion",
	"saveQuestion",
	"previewQuestion",
	"exportAndDownloadQuestion"
]);


module.exports = QuestionEditorActions;
