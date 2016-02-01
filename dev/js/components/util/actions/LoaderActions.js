var Reflux = require('reflux');

var LoaderActions = Reflux.createActions([
	"hideLoader",
	"showLoader",
	"increaseTime"
]);
module.exports = LoaderActions;