const MenuActionsConstants = require('../constants/menu-constants');
const CHANGE_EVENT = 'change';

var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
let _rootFolder = null;
var _folders = [];
var _sharedRootFolder = [];

function _setRootFolder(rootFolder) {
  _rootFolder = rootFolder;
}

function _getRootFolder() {
  return _rootFolder;
}

function getFolders() {
  return _folders;
}

function _addFolder(folder) {
  _rootFolder.folders.push(folder);
}

function _setFolders(folders) {
  _folders = folders;
}

function _setSharedRootFolder(folder) {
  _sharedRootFolder = folder;
}

function _createQuestion(question) {
  _rootFolder.questions = (_rootFolder.questions) ? _rootFolder.questions : [];
  _rootFolder.questions.push(question);
  //_folders[folderIndex].questions.push(question)
}

function _deleteFolder(folderIndex, folder) {
  if(_rootFolder.folders[folderIndex]._id == folder._id){
    _rootFolder.folders.splice(folderIndex, 1)
  }
}

function _deleteQuestion(index, question) {
  if(_rootFolder.questions[index]._id == question._id){
    _rootFolder.questions.splice(index, 1)
  }
}

function _editFolder(folderIndex, folder, folderName) {
  if(_folders[folderIndex]._id == folder._id){
    _folders[folderIndex].name = folderName
  }
}

function _shareFolder(folderIndex, folder) {
  if(_folders[folderIndex]._id == folder._id){
    _folders[folderIndex].name = folderName
  }
}

function _shareQuestion(QuestionIndex, question) {
  console.log(question);
  console.log("AGGGGHHHH");
  // if (_rootFolder.questions[QuestionIndex].id == question.id) {
  //   _rootFolder.questions[QuestionIndex]
  // }
}

var MenuStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRootFolder(){
    return _rootFolder;
  },
  getFolders() {
    return _folders;
  },
  getRootSharedFolders() {
    return _sharedRootFolder;
  }
});

MenuStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case MenuActionsConstants.ADD_FOLDER:
      _setRootFolder(action.folderRoot);
      _addFolder(action.folder);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.ADD_QUESTION:
      _setRootFolder(action.folderRoot);
      _createQuestion(action.question);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.LIST_FOLDERS:
      _setRootFolder(action.rootFolder);
      _setSharedRootFolder(action.shareFolder)
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.DELETE_FOLDER:
      _deleteFolder(action.folderIndex, action.folder);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.DELETE_QUESTION:
      _deleteQuestion(action.index, action.question);
      MenuStore.emitChange();
      break;

    case MenuActionsConstants.EDIT_FOLDER:
      _editFolder(action.folderIndex, action.folder, action.folderName);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.SHARE_FOLDER:
      _shareFolder(action.folderIndex, action.folder);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.SHARE_QUESTION:
      _shareQuestion(action.QuestionIndex, action.question);
      MenuStore.emitChange();
      break;
    default:
  }
});

module.exports = MenuStore;
