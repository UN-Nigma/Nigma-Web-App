var React = require('react');
var Reflux = require('reflux');

var NotificationActions = require('./actions/NotificationActions');
var NotificationStore = require('./stores/NotificationStore');
var notification = React.createClass({
	mixins: [Reflux.connect(NotificationStore, 'storeData')],
	render() {
		var storeData = this.state.storeData;
		var showingClass = storeData.isShowing ? "n-show" : "";
		return (
			<div className={`notification ${storeData.type} ${showingClass}`}>

				<i className="icon material-icons" onClick={NotificationActions.hideNotification}>close</i>
				<span className="message">{storeData.message}</span>
			</div>
		);
	},

	componentDidUpdate(prevProps, prevState) {
		var storeData = this.state.storeData;
		var prevStoreData = prevState.storeData;
		if(!prevStoreData.isShowing && storeData.isShowing) {
			setTimeout(NotificationActions.hideNotification, 6000);
		}
	},

});

module.exports = notification;