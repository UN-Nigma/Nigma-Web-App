var React = require("react");
var Reflux = require("reflux");
var MetadataActions = require("../../../actions/QuestionEditorActions/MetadataActions");
var Auth = require("../../../utils/auth");
var QuestionEditorStore = require('../../../stores/QuestionEditorStore');
var DeepLinkStateMixin = require('../../../mixins/DeepLinkState');
var moment = require('moment');

var MetadataEditorActions = React.createClass({
	mixins: [Reflux.connect(QuestionEditorStore, 'storeData'), DeepLinkStateMixin],
	handleChange(evt) {
		this.changeState(evt, this);
	},
  render() {
  	var metadata = this.state.storeData.currentQuestion.metadata;
  	metadata.date = moment(metadata.date);
    return (
      <div className="MetadataEditor" >
        <div className="group">
          <label className="control-label" htmlFor="autor">Autor</label>
          <input id="autor" value={metadata.autor} data-path="storeData.currentQuestion.metadata.autor" type="text"  className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="group">
          <label className="control-label" htmlFor="publisher"  className="active">Afiliacion</label>
          <input id="publisher" data-path="storeData.currentQuestion.metadata.publisher" type="text"  className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="group">
          <label className="control-label" htmlFor="title"  className="active">Titulo</label>
          <input id="title"   value={metadata.title} data-path="storeData.currentQuestion.metadata.title" type="text"  className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="group">
          <label className="control-label" htmlFor="description"  className="active">Descripción</label>
          <textarea id="description" value={metadata.description}  data-path="storeData.currentQuestion.metadata.description" type="text"  className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="group">
          <label className="control-label" htmlFor="keywords" className="active">Palabras Claves</label>
          <input id="keywords"    value={metadata.keywords} data-path="storeData.currentQuestion.metadata.keywords" type="text"  className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="group">
          <label className="control-label" htmlFor="date">Fecha</label>
          <input id="date" ref='date' value={
							metadata.date != null ? metadata.date.format("YYYY-MM-DD") : null} type="date"   data-path="storeData.currentQuestion.metadata.date" className="datepicker"  className="form-control" onChange={this.handleChange}/>
        </div>

        <div  className="group">
          <label>Idioma</label>
          <select ref="idioma" value={metadata.language} className="form-control" data-path="storeData.currentQuestion.metadata.language" onChange={this.handleChange}>
            <option value="Español" >Español</option>
            <option value="Inglés" >Inglés</option>
            <option value="Portugués" >Portugués</option>
          </select>
        </div>

         <div className="group">
          <label>Cobertura</label>
          <select ref="cobertura"  value={metadata.coverage} className="form-control" data-path="storeData.currentQuestion.metadata.coverage" onChange={this.handleChange} >
            <option value="">Ninguna</option>
            <option value="Ed. Preescolar">Ed. Preescolar</option>
            <option value="Ed. Primaria">Ed. Primaria</option>
            <option value="Ed. Secundaria" >Ed. Secundaria</option>
            <option value="Ed. Superior" >Ed. Superior</option>
          </select>

        </div>

      </div>
    )
  }
});

module.exports = MetadataEditorActions;
