var React = require('react');

var Popover = React.createClass({
	getInitialState: function() {
		return {
			fade: false
		};
	},
	hide() {
		this.setState({
			fade: false
		});
	},
	render() {
		var props = this.props;
		var style = props.position;
		var fade = (this.state.fade ? " fade": "");
		return (
			<div className={`popover${fade}`} style={style}>
				<span className="message">{props.message}</span>
			</div>
		);
	},
	componentDidMount() {
		setTimeout(() => this.setState({fade: true}), 100);
	},

});

module.exports = Popover;