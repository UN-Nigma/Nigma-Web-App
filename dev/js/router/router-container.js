// RouterContainer.js
var _router = null;

function container(){
  return _router;
}

container.set = function(router){
  _router = router;
}

module.exports = container;
