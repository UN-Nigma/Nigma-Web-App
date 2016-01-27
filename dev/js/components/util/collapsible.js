var React = require('react');
var _ = require('underscore');
var Collapsible = React.createClass({
	getInitialState: function() {
		return {
			open: [] 
		};
	},
	toggle(evt) {
		var target = evt.target;
		var index = Number(target.getAttribute("data-index"));
		var open = this.state.open;
		var indexInVector = _.indexOf(open, index);
		console.log(target, open)
		if(indexInVector != -1) {
			open.splice(indexInVector, 1);
		} else {
			open.push(index);
		}
		this.setState({
			open: open 
		});
	},
	render() {
		var self = this;
		return (
			<ul className="Collapsible">
			{
				self.props.sections.map(function(section, index) {
					var opened = _.contains(self.state.open, index) ? "c-show" : "c-hide";
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