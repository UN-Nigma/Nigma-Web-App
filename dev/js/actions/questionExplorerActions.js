var Reflux = require('reflux');

var MenuActions = Reflux.createActions([
	"createFolder",
	"updateFolder",
	"createQuestion",
	"updateQuestion",
	"deleteQuestion",
	"listMyFolders",
	"listSharedFolders",
	"deleteFolder",
	"shareQuestion",
	"shareFolder",
	"changeFolder",
	"sortData"
]);


module.exports = MenuActions;
