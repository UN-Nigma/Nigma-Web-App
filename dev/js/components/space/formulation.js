const React = require("react");
//Utils
const ContentEditable       = require("../utils/content-editable");
const MaterializeComponents = require("../utils/material-components");
const {Button} = MaterializeComponents;
const Ckeditor = require('../../utils/ckeditor');

//Custom components
const ExpresionGenerator  = require("./expresion-generator");

const Formulation = React.createClass({

  propTypes: {
    showExpresions: React.PropTypes.func,
    expresions: React.PropTypes.bool
  },

  getInitialState() {
    return {
      html: "escribe algo...",
    }
  },

  componentDidMount() {
    setTimeout(Ckeditor.start(this._onOpen, this._onClose),100);
    this.props.changeDialogTex(Ckeditor.getTeX);
  },

  componentWillReceiveProps(nextProps) {   
    if(this.props.dialogTeX != nextProps.dialogTeX) {
      Ckeditor.addTeX(nextProps.dialogTeX);
    }
  },

  _onOpen() {
    this.props.showExpresions(true);
  },

  _onClose() {
    this.props.showExpresions(false);
  },
  /**
   * [set html->state, when  any change is
   * made on content-editable]
   * @param  {event} e [event target of input]
   */
  _onChangeContentEditable(e) {
    this.setState({html: e.target.value})    
  },

  _addExpresion(TeX) {
    Ckeditor.addTeX(TeX);
  },

  onAddQuestion(){
   let question =Ckeditor.getValue();
   console.log(question);
   console.log('acá va el parseo con lo del sotillo');
  },

  render() {
    return (
      <div className="Formulation u-tab-content">
        <div className="row Formulation-CKEditor">
          <div id="editor">
            <p>{this.state.html}</p>
          </div>
        </div>
        <div className="btn-floating btn waves-effect waves-light pink accent-3" onClick={this.onAddQuestion} >
          +
        </div>
      </div>
    )
  }
});


module.exports = Formulation;
