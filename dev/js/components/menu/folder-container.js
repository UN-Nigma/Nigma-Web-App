const React = require("react");


//USED COMPONENTS
const FolderForm = require('./folder-form');
const FolderList = require('./folder-list');
var MenuStore    = require('../../stores/menu-store');

var FolderContainer = React.createClass({
  getInitialState: function() {
    return {
      folderItems: MenuStore.getFolders()
    };
  },

  componentWillMount: function() {
    MenuStore.addChangeListener(this._handleChange);
  },

  componentWillUnmount: function() {
    MenuStore.removeChangeListener()
  },

  _handleChange() {
    this.setState({
      folderItems: MenuStore.getFolders()
    });
  },

  render() {
    return (
      <div className="FolderContainer container">
        <div className="FolderContainer-header z-depth-1">
          <h3 className="title">Preguntas y temas</h3>
          <div className="divider"></div>
          <FolderForm />
        </div>
        <FolderList folders={this.state.folderItems} />
      </div>
    );
  },

});

module.exports = FolderContainer;
