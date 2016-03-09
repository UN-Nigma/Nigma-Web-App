import React from 'react'
import Login from './Login'

var Home = React.createClass({
	render: function() {
		return (
			<article className="home">
				<nav className="TopNavbar">
					<ul className="nav left">
						<li className="item logo">
							<a href="#about"><img src="images/logo.png" /></a>
						</li>
						<li className="item">
							<a href="#signin">Iniciar sesión</a>
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