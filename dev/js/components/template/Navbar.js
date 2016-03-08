import React  from 'react'
import UserActions from '../../actions/UserActions'
var Navbar = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	moveTo(route) {
		this.context.router.push(route);
	},

	render() {
		return (
			<nav className="TopNavbar">
				<ul className="nav left">
					<li className="item logo" onClick={this.moveTo.bind(this, "/")}>
						<img src="images/logo.png" />
					</li>
					<li className="item" onClick={this.moveTo.bind(this, "/admin")}>
						<span>Mis preguntas</span>
					</li>
				</ul>
				<ul className="nav right">
					<li className="item sublist">
						<span>{this.props.user ? this.props.user.name : "Usuario 1"}</span>
						<ul>
							<li className="sublist-item" onClick={this.moveTo.bind(this, "/admin/info")}>
								<span>Mi información</span>
							</li>
							<li className="sublist-item" onClick={UserActions.logout}>
								<span>Cerrar sesión</span>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		);
	}

});

module.exports = Navbar;