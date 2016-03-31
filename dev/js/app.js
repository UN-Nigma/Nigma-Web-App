import React from "react"

//Components
import Admin from './components/space/Admin'
import Explorer from './components/space/Explorer'
import QuestionEditor from './components/space/question-editor/QuestionEditor'
import Home from "./components/home/Home"

//Utilities
import Loader from './components/util/loader'
import Notification from './components/util/notification'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'


const Nigma = React.createClass({
	render(){
		return (
			<div className="app">
				{this.props.children}
				<Loader />
				<Notification />
			</div>
		)
	}
});



var Routes = React.createClass({
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Nigma}>
					<IndexRoute component={Home} />
					<Route path="home" component={Home}/>
					<Route path="admin" component={Admin}>
						<IndexRoute component={Explorer} />
						<Route path="folder/:folderId" component={Explorer} />
						<Route path="question/:questionId" component={QuestionEditor} />
					</Route>
				</Route>
			</Router>
		);
	}

});

React.render(<Routes />, document.getElementById('main'));



