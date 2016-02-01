const FormulationConstants = require('../../constants/space/formulation-constants');
var Dispatcher = require('../../dispatchers/dispatcher');
var SpaceApi = require('../../api/utils/space');
var QuestionAPI = require('../../api/utils/question');
var FormulationActions = {
  addFormulation(formulation){
    Dispatcher.dispatch({
      type: FormulationConstants.ADD_FORMULATION,
      formulation: formulation
    });
  }
}

module.exports = FormulationActions;
