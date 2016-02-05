const React = require("react");

const Auth = require("./utils/auth");
const UserStore = require('./stores/user');
const UserActions = require('./actions/user');
const injectTapEventPlugin = require("react-tap-event-plugin");

//Components
var SignIn = require('./components/login/complete');
var Space = require('./components/space/space');
var QuestionEditor = require('./components/space/question-editor/QuestionEditor');


var Loader = require('./components/util/Loader');
var Notification = require('./components/util/notification');

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
const Nigma = React.createClass({


  getInitialState() {
    return {
      user: ""
    }
  },

  componentWillMount: function () {
    UserActions.setUserStore();
    UserStore.addChangeListener(this._handleChange);
    if (UserStore.getUser()) {
      this.setState({
        user: UserStore.getUser().name
      });
    }
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._handleChange);
  },

  _handleChange() {
    this.setState({
      user: UserStore.getUser().name
    });
  },

  onChange: function () {
    this.setState({name: UserStore.getUser().name});
  },

  render(){
    return (
      <div className="app">
        <div className="Nigma">
        	{this.props.children}
        </div>
        <Loader />
        <Notification />
      </div>
    )
  }
});



var Routes = React.createClass({
	render() {
		console.log("Do something shit")
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Nigma}>
				  <Route path="/login/:token" component={SignIn} />
				  <Route path="/space" component={Space} />
				  <Route path="/space/u/folder/:folderId" component={Space} />
				  <Route path="/space/u/question/:questionId" component={QuestionEditor} />
				  <IndexRoute 	component={Space}/>
				</Route>
			</Router>
		);
	}

});

React.render(<Routes />, document.getElementById('main'));



