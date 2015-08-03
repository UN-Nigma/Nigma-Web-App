const React       = require("react");
const Router      = require("react-router");
const mui         = require("material-ui");
const TopBar      = require("./topbar.js");
const ThemeMixin  = require("../mixins/ui-theme");
const Auth = require("../utils/auth");

const {RouteHandler} = Router;
const injectTapEventPlugin = require("react-tap-event-plugin");

const Nigma = React.createClass({

  mixins: [ThemeMixin],

  render(){
    return (
      <div>
        <TopBar user={Auth.getUserName()}/>
        <RouteHandler />
      </div>
    )
  }
});

injectTapEventPlugin();

module.exports = Nigma;
