var React = require('react');
var Reflux = require('reflux');
var LoaderStore = require('./stores/LoaderStore');
var LoaderActions = require('./actions/LoaderActions');

var Loader = React.createClass({
	mixins: [Reflux.connect(LoaderStore, 'storeData')],
	render() {
		if(!this.state.storeData.showing) {
			return null;
		}
		var loaderType = this.state.storeData.loaderType;
		if(loaderType == 'simple'){
			return (
				<div className="loader">
					<i className="icon material-icons spin">autorenew</i>
					<span className="message">{this.state.storeData.message}</span>
				</div>
			);
		}else if(loaderType == 'count_down'){
			return (
				<div className="loader">
					<span className="timer">{this.state.storeData.options.currentTime/1000}</span>
					<span className="message">{this.state.storeData.message}</span>
				</div>
				);
		}
		console.log(this.state.storeData);
	},
	componentDidUpdate(prevProps, prevState) {
		if(this.state.storeData.loaderType == 'count_down' && this.state.storeData.options.currentTime < this.state.storeData.options.time){
				LoaderActions.increaseTime();
		}
	},

});

module.exports = Loader;
