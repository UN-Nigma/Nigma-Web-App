var React = require('react');

var Modal = React.createClass({
	propTypes: {
		negativeAction: React.PropTypes.func,
		positiveAction: React.PropTypes.func
	},

	getInitialState() {
		return {
			closed: true
		};
	},

	getDefaultProps() {
		return {
			title: "",
			negativeAction: null,
			positiveAction: null,
			positiveActionName: "Guardar",
			negativeActionName: "Cancelar"
		};
	},

	onPositiveClick() {
		var positiveAction = this.props.positiveAction;
		if(positiveAction && (typeof positiveAction) == "function") {
			positiveAction();
		}
	},

	onNegativeClick() {
		var negativeAction = this.props.negativeAction;
		if(negativeAction && (typeof negativeAction) == "function") {
			negativeAction();
		}
	},

	closeModal() {
		console.log("Closing modal")
		this.setState({
			closed: true
		});
		console.log(React.unmountComponentAtNode(React.findDOMNode(this).parentNode));
	},

	openModal() {
		this.setState({
			closed: false
		});
	},

	render() {
		return (
			<article className={`modal ${this.state.closed ? '' : 'showing' }`} ref="modal">
				<section className="modal-content">
					<section className="modal-title">
						<span className="text">{this.props.title}</span>
						<i className="material-icons close" onClick={this.closeModal}>close</i>
					</section>
					<section className="modal-body">
						{this.props.children}
					</section>
					<section className="modal-footer">
						{
							this.props.negativeAction ?
								<button className="button negative" onClick={this.onNegativeClick}>{this.props.negativeActionName}</button> :
								null
						}
						{
							this.props.positiveAction ?
								<button className="button positive" onClick={this.onPositiveClick}>{this.props.positiveActionName}</button> :
								null
						}
					</section>
				</section>
			</article>
		);
	}

});

module.exports = Modal;