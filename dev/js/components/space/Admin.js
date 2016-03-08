var React = require('react');
import Navbar from '../template/Navbar'
import Loader from '../util/loader'
import Notification from '../util/notification'

var Admin = React.createClass({

	render() {
		return (
			<section className="admin">
				<Navbar />
				<section className="admin-container">
					{this.props.children}
				</section>
				<Loader />
				<Notification />
				<div id="modal_container"/>
			</section>
		);
	}

});

module.exports = Admin;