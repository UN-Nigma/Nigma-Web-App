import React from 'react'
import DeepLinkState from '../../mixins/DeepLinkState'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
var Login = React.createClass({
	mixins: [DeepLinkState],
	getInitialState() {
		return {
			name: "",
			email: "",
			password: "",
			new: false
		};
	},
	onChange(evt) {
		this.changeState(evt, this);
	},
	switchToRegister(evt) {
		var self = this;
		this.setState({
			new:  !self.state.new
		});
	},
	signIn(evt) {
		UserActions.login(this.state.email, this.state.password)
	},
	render() {
		return (
			<article className="login">
				<section className="title">
					<span className="text">{this.state.new ? "Registrarse"  : "Iniciar sesión"}</span>
				</section>
				<section className="form">
					{this.state.new ? <input type="text" placeholder="Nombre" className="form-control" data-path="name" value={this.state.name} onChange={this.onChange} /> : null}
					<input type="email" placeholder="Usuario" className="form-control" data-path="email" value={this.state.email} onChange={this.onChange} />
					<input type="password" placeholder="Contraseña" className="form-control" data-path="password" value={this.state.password} onChange={this.onChange} />
					<section className="buttons">
						<button className="button dark" onClick={this.switchToRegister}>Registrarse</button>
						<button className="button green" onClick={this.signIn}>Iniciar sesión</button>
					</section>
				</section>
			</article>
		);
	}

});

module.exports = Login;