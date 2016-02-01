const API = require('../API');
const QuestionAPI = {
  _routes: {
    get: {
      route: "/questions/:questionId",
      method: API._REQUEST_METHOD.get,
    },
    create: {
      route: "/folders/:folderid/questions",
      method: API._REQUEST_METHOD.post
    },

    updateQuestionData: {
      route: "/questions/:questionid/data",
      method: API._REQUEST_METHOD.put
    },

    exportQuestionData: {
      route: "/questions/:questionid/scorms",
      method: API._REQUEST_METHOD.post
    },

    share: {
      route: "/users/questions/:questionId",
      method: API._REQUEST_METHOD.post,
    },

    delete: {
      route: "/questions/:questionId",
      method: API._REQUEST_METHOD.delete,
    },

    validateVariables: {
      route: "/questions/:questionId/variables/validate",
      method: API._REQUEST_METHOD.put
    },

    validateAnswers: {
      route: "/questions/:questionId/answers/validate",
      method: API._REQUEST_METHOD.put
    }
  },
  createQuestion(data){
    const route = this._routes.create;
    return API.callAjaxRequest(route, data);
  },
  loadQuestion(data){
    const route = this._routes.get;
    return API.callAjaxRequest(route, data);
  },
  updateQuestionData(data, cb){
    const route = this._routes.updateQuestionData;
    API.callAjaxRequest(route, data, (err, res) => {
      console.log("Respuesta", res);
      if(err){
        cb(err, null);
      } else {
        cb(!res.body.ok);
      }
    });
  },

  exportQuestionData(data, cb){

    console.log("Data", data);
    const route = this._routes.exportQuestionData;

    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(err, null);
      } else {
        cb(!res.body.ok);
      }
    });
  },

  shareQuestion(data, cb) {
    const route = this._routes.share;
    API.callAjaxRequest(route, data, (err, res) => {
      if (err) {
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body.question)
      }
    });
  },

  deleteQuestion(data) {
    const route = this._routes.delete;
    return API.callAjaxRequest(route, data);
  },
  validateVariables(data){
    const route = this._routes.validateVariables;
    return API.callAjaxRequest(route, data);
  },
  validateAnswers(data){
    const route = this._routes.validateAnswers;
    API.callAjaxRequest(route, data, (err, res) => {
      if(err){
        cb(true, null);
      } else {
        cb(!res.body.ok, res.body);
      }
    });
  }
}

module.exports = QuestionAPI;
