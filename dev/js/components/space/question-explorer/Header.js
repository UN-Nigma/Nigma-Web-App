import React from 'react';

var Header = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		clickable: React.PropTypes.bool,
		clickAction: React.PropTypes.func,
		clicked: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			clickable: false,
			clicked: false,
			clickAction: function() {}
		}
	},


	render() {
		var clickable = (this.props.clickable) ? "clickable" : "";
		if(this.props.clickable && this.props.clickedState.clicked) {
			clickable = `${clickable} clicked ${this.props.clickedState.status}`
		}
		return (
			<div data-index={this.props.index} className={`header ${clickable}`} onClick={this.props.clickAction}>
				<div className="title" data-index={this.props.index}>
					{this.props.name}
				</div>
			</div>
		);
	}
})




module.exports = Header;
