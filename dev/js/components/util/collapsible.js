var React = require('react');
var _ = require('underscore');
var Collapsible = React.createClass({
	getInitialState: function() {
		return {
			opened: this.props.open || []
		};
	},
	toggle(evt) {
		var target = evt.target;
		var index = Number(target.getAttribute("data-index"));
		var opened = this.state.opened;
		var indexInVector = _.indexOf(opened, index);
		if(indexInVector != -1) {
			opened.splice(indexInVector, 1);
		} else {
			opened.push(index);
		}
		this.setState({
			opened: opened
		});
	},
	render() {
		var self = this;
		return (
			<ul className="Collapsible">
			{
				self.props.sections.map(function(section, index) {
					var opened = _.contains(self.state.opened, index) ? "c-show" : "c-hide";
					return (
						<li className={`item ${opened}`} key={index} data-index={index}>
							<section className="title" data-index={index} onClick={self.toggle}>
								<i className="material-icons icon" data-index={index}>{section.icon}</i>
								<span className="text" data-index={index}>{section.title}</span>
							</section>
							<section className="collapsible-content">
								{section.content}
							</section>
						</li>
					);
				})
			}
			</ul>
		);
	}

});

module.exports = Collapsible;