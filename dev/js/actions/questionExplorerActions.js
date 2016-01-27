var Reflux = require('reflux');

var MenuActions = Reflux.createActions([
	"createFolder",
	"createQuestion",
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
