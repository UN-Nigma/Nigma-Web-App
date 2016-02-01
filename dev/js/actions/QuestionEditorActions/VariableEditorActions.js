
var Reflux = require('reflux');

var VariableEditorActions = Reflux.createActions([
	"createVariable",
	"validateVariables"
]);


module.exports = VariableEditorActions;

// const QuestionAPI = require('../../api/utils/question');
// var Dispatcher = require('../../dispatchers/dispatcher');

// var VariableActions = {
//   addVariable(variableCode, code) {
//     code = code.split("\n").filter(variable => variable != '')
//     Dispatcher.dispatch({
//       type: VariableConstants.ADD_VARIABLE,
//       variableCode: variableCode,
//       code: code
//     });
//   },
//   validateCode(code, questionId) {
//     var data = {
//       variables: {
//         text: code
//       },
//       questionId: questionId
//     };
//     QuestionAPI.validateVariables(data, (err, res) => {
//       if(err && res == null) {
//         console.log("Validación de variables: Un error inesperado ha ocurrido");
//         Dispatcher.dispatch({
//           type: VariableConstants.VALIDATE_CODE,
//           output: {ok: false, errors: ["Ocurrió un error inesperado."], values: null},
//           code: code
//         });
//       } else {
//         Dispatcher.dispatch({
//           type: VariableConstants.VALIDATE_CODE,
//           output: res,
//           code: code
//         });
//       }
//     });

//   },
//   loadVariables(variables) {
//     Dispatcher.dispatch({
//       type: VariableConstants.LOAD_VARIABLES,
//       variables: variables
//     });
//   },
//   autoSave(variables) {
//   	Dispatcher.dispatch({
//       type: VariableConstants.AUTO_SAVE_VARIABLES,
//       variables: variables
//     });
//   }
// }

