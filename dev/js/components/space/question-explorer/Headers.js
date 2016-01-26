var React = require('react');
var Header = require('./Header');
var QuestionExplorerActions = require('../../../actions/questionExplorerActions');

var Headers = React.createClass({
	getInitialState: function() {
		return {
			clicked: {
				index: 0,
				status: "down"
			}
		};
	},
	headers() {
		var self = this;
		return [
			{name: "Nombre", clickable: true, clickAction: self.sort, field: "name"},
			{name: "Propietario"},
			{name: "Fecha de creación", clickable: true, clickAction: self.sort, field: "created_at"},
			{name: "Ultima modificación", clickable: true, clickAction: self.sort, field: "updated_at"},
			{name: "Acciones"},
		];
	},

	sort(evt) {
		var target = evt.target;
		var index = Number(target.getAttribute("data-index"));
		var status = this.state.clicked.status;
		if(index == this.state.clicked.index) {
			status = (status == "down") ? "up":"down";
		} else {
			status = "down";
		}

		this.setState({
			clicked: {index: index, status: status}
		});

		if(status == "down"){
			QuestionExplorerActions.sortData(this.headers()[index].field, 1)
		} else {
			QuestionExplorerActions.sortData(this.headers()[index].field, -1)
		}

	},

	clickedState(index) {
		var self = this;
		return {
			clicked: (index == self.state.clicked.index),
			status: (index == self.state.clicked.index) ? self.state.clicked.status : null
		}
	},
	render: function() {
		return (
			<div className="headers">
				{this.headers().map((header, index) => <Header key={index} index={index} {...header} clickedState={this.clickedState(index)}/>)}
			</div>
		);
	}

});

module.exports = Headers;