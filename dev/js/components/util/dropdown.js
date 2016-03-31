var React = require('react');

var Dropdown = React.createClass({
	getInitialState: function() {
		return {
			opened: false
		};
	},
	toggle(evt) {
		var self = this;
		this.setState({
			opened: !self.state.opened
		});
	},
	hide(evt) {
		var self = this;
		setTimeout(function() {
			if(self.state.opened)
				self.setState({
					opened: false
				});
		}, 100);

	},
	render() {
		return (
			<div className={`dropdown ${this.state.opened ? "d-show" : ""}`}>
				<button className="button" onClick={this.toggle} onBlur={this.hide}>
					{this.props.iconName != undefined ? <i className="icon material-icons">{this.props.iconName}</i> : null}
					<span className="text">{this.props.buttonText}</span>
				</button>
				<ul className={`content`}>
					{this.props.options.map((option, index) => (
						<li key={index} className="option" onClick={option.onClickFunction}>
							{option.iconName != undefined ? <i className="icon material-icons">{option.iconName}</i> : null}
							<span className="text">{option.name}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}

});

module.exports = Dropdown;