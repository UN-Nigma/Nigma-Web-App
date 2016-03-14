var Reflux = require('reflux');

var LoginActions = Reflux.createActions([
	"login",
	"logout",
	"register"
]);
module.exports = LoginActions;