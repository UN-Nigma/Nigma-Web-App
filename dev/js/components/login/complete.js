const React = require('react');
const UserActions = require('../../actions/user');
const UserStore = require('../../stores/user');
const Auth = require("../../utils/auth");


var LoginComplete =
  React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
      return this.getComponentData();
    },

    getComponentData: function () {
      return {
        token: this.props.params.token
      }
    },

    componentWillMount: function () {
      UserActions.loginComplete(this.getComponentData());
      this.redirect();
      UserStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this.onChange);
    },

    redirect: function () {
      var user = UserStore.getUser();
      if (user) {
        this.context.router.push("/space");
      }
    },

     onChange: function () {
      this.setState({key: this.getComponentData()});
      this.redirect();
    },

    render: function () {
      return (
        <p>Loggeando espere por favor</p>
      )
    }
  });

module.exports = LoginComplete;

