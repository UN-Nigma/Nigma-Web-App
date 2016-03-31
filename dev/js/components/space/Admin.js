var React = require('react');
import Navbar from '../template/Navbar'
import Loader from '../util/loader'
import Notification from '../util/notification'
import Auth from '../../utils/auth'
var Admin = React.createClass({
	componentWillMount() {
		Auth.checkLogin();
	},
	componentWillUpdate(nextProps, nextState) {
		Auth.checkLogin();
	},
	componentWillReceiveProps(nextProps) {
		Auth.checkLogin();
	},
	render() {
		if(!Auth.isLoggedIn()) {
			return null;
		}
		return (
			<section className="admin">
				<Navbar />
				<section className="admin-container">
					{this.props.children}
				</section>
				<div id="modal_container"/>
			</section>
		);
	}

});

module.exports = Admin;