var Reflux = require('reflux');

var NotificationActions = Reflux.createActions([
	"hideNotification",
	"showNotification",
]);
module.exports = NotificationActions;