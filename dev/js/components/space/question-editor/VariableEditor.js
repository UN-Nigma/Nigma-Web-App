const React = require("react");

//Actions
var VariableEditorActions = require('../../../actions/QuestionEditorActions/VariableEditorActions');

//UTIl
var Dropdown = require('../../util/dropdown');


var VariableEditor = React.createClass({
	onCreateType(type) {
		var currentCode = this.editor.getValue();
		VariableEditorActions.createVariable(currentCode, type);
	},
	onValidate(evt) {
		var currentCode = this.editor.getValue();
		VariableEditorActions.validateVariables(currentCode)
	},
	creatorOptions() {
		var self = this;
		return {
			buttonText: "Agregar nueva variable",
			iconName: "add",
			options: [
				{
					onClickFunction: self.onCreateType.bind(self, "uniform"),
					name: "Uniforme"
				},
				{
					onClickFunction: self.onCreateType.bind(self, "specific"),
					name: "Especifica"
				},
				{
					onClickFunction: self.onCreateType.bind(self, "categorical"),
					name: "Categórica"
				}

			]
		}
	},
	render() {
		return (
			<article className="variables">
				<section className="creator">
					<Dropdown {...this.creatorOptions()}/>
				</section>
				<section className="editor">
					<div id="editor">
						{""}
					</div>
				</section>
				<section className="actions">
					<button className="confirm-button" onClick={this.onValidate}>
						<div className="flex">
							<i className="material-icons icon">done</i>
							<span className="text">Validar</span>
						</div>
					</button>
				</section>
			</article>
		);
	},
	componentDidMount() {
		this.editor = ace.edit("editor");
		var editor = this.editor;
		editor.$blockScrolling = Infinity
		this.editorSession = editor.getSession();
		editor.setShowPrintMargin(false);
		editor.setValue(this.props.question.variables, 1);
	},
	componentDidUpdate(prevProps, prevState) {
		var editor = this.editor;
		editor.setValue(this.props.question.variables, 1);
	},
});



module.exports = VariableEditor;

// const Variables = React.createClass({


//   render() {
//     return (
//       <div className="Variables">
//         <Variables.Header />
//         <Variables.Content currentQuestion={this.props.currentQuestion} getQuestionData={this.props.getQuestionData}/>
//       </div>
//     );
//   }

// });

// Variables.Header = React.createClass({

//   render() {
//     return (
//       <nav className="Variables-Header teal">
//        <div className="nav-wrapper">
//          <div className="brand-logo Variables-Header__brand">
//            VARIABLES
//          </div>
//        </div>
//      </nav>
//     )
//   }
// });

// Variables.Content = React.createClass({
//   mixins: [React.addons.LinkedStateMixin],

//   getInitialState: function() {
//     return {
//       text: "",
//       variables: [],
//       validating: false,
//       validationOutput: null
//     };
//   },

//   componentWillMount() {
//     VariableStore.addChangeListener(this._handleChange)
//   },

//   _handleChange(){
//     var variables = VariableStore.getVariables();
//     this.setState({
//       validating: false,
//       text: variables.text,
//       variables: variables.variables
//     });
//   },

//   _validateCode() {
//     this.setState({
//       validating: true,
//       validationOutput: null
//     });
//     var questionId = this.props.currentQuestion._id;
//     VariableActions.validateCode(this.state.text, questionId);
//   },

//   _addVariable(varType) {
//     var currentCode = this.refs.codeArea.getDOMNode().value;
//     VariableActions.addVariable(varType.createSkeleton(), currentCode);
//   },

//   render() {
//     return (
//       <div className="Variables-Content">
//         <AlertMessage data={VariableStore.getValidationOutPut()}/>
//         <Variables.Content.Create  actionAddVariable={this._addVariable}/>
//         <div className="Variables-Content__actions">
//           <textarea valueLink={this.linkState('text')} ref="codeArea" />
//         </div>
//         <Variables.Content.SaveAndCheck validateCode={this._validateCode} validating={this.state.validating}/>
//       </div>
//     )
//   },

//   componentDidMount() {
//     $('.dropdown-button').dropdown();
//   },
//   componentWillUnmount() {
//     VariableStore.removeChangeListener()
//   },
//   componentDidUpdate(prevProps, prevState) {
//   	setTimeout(() => {
//   		var currentCode = this.refs.codeArea.getDOMNode().value;
//   		VariableActions.autoSave(currentCode);
//   	}, 500);

//   }

// });

// Variables.Content.Create = React.createClass({
//   render() {
//     return (
//       <div className="Variables-Content-actions__create">
//         <i className="small material-icons dropdown-button" data-activates='dropme' data-beloworigin='true' data-constrainwidth='false'>add_box</i>
//         <ul id='dropme' className='dropdown-content'>
//           <li onClick={this.props.actionAddVariable.bind(null, Uniform)}>
//               <a>Uniforme</a>
//           </li>
//           <li onClick={this.props.actionAddVariable.bind(null, Categorical)}>
//               <a>Categorica</a>
//           </li>
//           <li onClick={this.props.actionAddVariable.bind(null, Specific)}>
//             <a>Especifica</a>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// });
// Variables.Content.SaveAndCheck = React.createClass({

//   render() {
//     var classCSS = !this.props.validating ? { css: "material-icons", icon: "done"} : {css: "material-icons spin", icon: "loop"}
//     return (
//       <div className="Formulation-AnswerContainer-Validation">
//         <i className={classCSS.css} onClick={this.props.validateCode} >{classCSS.icon}</i>
//       </div>
//     );
//   }
// });
module.exports = VariableEditor;
