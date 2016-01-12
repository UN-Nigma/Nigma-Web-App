import React from 'react';

var Header = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		clickable: React.PropTypes.bool,
		clickAction: React.PropTypes.func,
	},

	getDefaultProps() {
		return {
			clickable: false,
			clickAction: function() {}
		}
	},

	getInitialState() {
		return {
			clicked: true
		};
	},

	render() {
		var clickable = (this.props.clickable) ? "clickable" : "";
		return (
			<div className={`header ${clickable}`}>
				<div className="title">
					{this.props.name}
				</div>
			</div>
		);
	}
})




module.exports = Header;
