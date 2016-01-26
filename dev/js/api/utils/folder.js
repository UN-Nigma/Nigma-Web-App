const API = require('../API');
const FolderAPI = {
  _routes: {
    create: {
      route: "/folders/:folderid/folders",
      method: API._REQUEST_METHOD.post
    },
    get: {
      route: "/folders/:folderid",
      method: API._REQUEST_METHOD.get
    },
    update: {
      route: "/folders/:folderid",
      method: API._REQUEST_METHOD.put
    },
    delete: {
      route: "/folders/:folderid",
      method: API._REQUEST_METHOD.delete
    },
    list: {
      route: "/users/folders",
      method: API._REQUEST_METHOD.get
    },
    listSharedFolders: {
      route: "/users/folders/shared-with-me",
      method: API._REQUEST_METHOD.get
    },
    share: {
      route: "/users/folders/:folderid",
      method: API._REQUEST_METHOD.post,
    }
  },
  listFolders(data){
    const route = this._routes.list;
    return API.callAjaxRequest(route, data);
  },
  listSharedFolders(data){
    const route = this._routes.listSharedFolders;
    return API.callAjaxRequest(route, data);
  },

	getFolder(data){
    const route = this._routes.get;
    return API.callAjaxRequest(route, data);
  },

  createFolder(data, cb){
    const route = this._routes.create;
    return API.callAjaxRequest(route, data);
  },
  deleteFolder(data, cb){
    const route = this._routes.delete;
    return API.callAjaxRequest(route, data);
  },
  updateFolder(data, cb){
    const route = this._routes.update;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.ok);
      }
    });
  },
  shareFolder(data, cb) {
    const route = this._routes.share;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        const {ok} = res.body;
        cb(!ok, ok);
      }
    })
  }
}

module.exports = FolderAPI;
