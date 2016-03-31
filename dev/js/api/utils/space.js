const API = require('../API');
const SpaceApi = {
  _routes: {
    preview: {
      route: "/questions/:questionid/scorms/preview",
      method: API._REQUEST_METHOD.put
    }
  },
  preview(data, cb){
    const route = this._routes.preview;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  }
}

module.exports = SpaceApi;
