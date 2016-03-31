var Router = require('react-router');
var RouterContainer = require('./router-container');
var routes = require('./routes');

var router = Router.create({
  routes: routes,
});

RouterContainer.set(router);

module.exports = router;
