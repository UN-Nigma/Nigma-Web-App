const React         = require("react");
const Router        = require("react-router");
const { Route, Link, DefaultRoute, NotFoundRoute } = Router;

const Nigma = require('../components/app');
const SignIn = require('../components/login/complete');
const Space = require('../components/space/Space');

const Routes = (
  <Route name="nigma" path="/" handler={Nigma}>
    <Route name="signin" path="login/:token" handler={SignIn} />
    <Route name="space" path="space" handler={Space} />
    <DefaultRoute 	handler={Space}/>
  </Route>
)


module.exports = Routes;
