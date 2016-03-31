import React from 'react'
import Login from './Login'
import Auth from '../../utils/auth'
var Home = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	componentWillMount() {
		if(Auth.isLoggedIn()) {
			this.context.router.push("/admin");
		}
	},
	componentWillUpdate(nextProps, nextState) {
		if(Auth.isLoggedIn()) {
			this.context.router.push("/admin");
		}
	},
	componentWillReceiveProps(nextProps) {
		if(Auth.isLoggedIn()) {
			this.context.router.push("/admin");
		}
	},
	render() {
		return (
			<article className="home">
				<nav className="TopNavbar">
					<ul className="nav left">
						<li className="item logo">
							<a href="#about"><img src="images/logo.png" /></a>
						</li>
					</ul>
				</nav>
				<section className="about" id="about">
					<Login />
				</section>
			</article>
		);
	}

});

module.exports = Home;