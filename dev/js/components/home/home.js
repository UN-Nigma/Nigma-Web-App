var React = require('react');

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
							<a href="#about">Nigma</a>
						</li>
						<li className="item">
							<a href="#signin">Iniciar sesión</a>
						</li>
					</ul>
				</nav>
				<section className="about" id="about">
					<article className="description">
						<section className="title">
							<p className="text">Nigma</p>
						</section>
						<section className="content">
							<p>Nigma es una herramienta de autor que permite la creación de objetos de aprendizaje con parametros aleatorios y retroalimentación</p>
						</section>
					</article>
				</section>
				<section className="sign-in" id="signin">

				</section>
				<section className="guiame">
				</section>
			</article>
		);
	}

});

module.exports = Home;