var Reflux = require('reflux');

var QuestionEditorActions = Reflux.createActions([
	"loadQuestion",
	"saveQuestion",
	"exportQuestion",
	"previewQuestion"
]);


module.exports = QuestionEditorActions;
