// const MenuActionConstants = require('../constants/menu-constants');
// const FolderAPI = require('../api/utils/folder');
// const QuestionAPI = require('../api/utils/question');
// var Dispatcher = require('../dispatchers/dispatcher.js');

// var MenuActions = {
// 	createFolder(folderName, rootId, folderRoot) {
// 		FolderAPI.createFolder({
// 			folderid: rootId,
// 			folder: {
// 				name: folderName
// 			}
// 		}, (err, folder) => {
// 			if(!err){

// 				Dispatcher.dispatch({
// 					type: MenuActionConstants.ADD_FOLDER,
// 					folder: folder,
// 					folderRoot: folderRoot,
// 				});
// 			}
// 		});

// 	},
// 	createQuestion(questionName, folderId, folderRoot) {
// 		var data = {
// 			folderid: folderId,
// 			question: {
// 				name: questionName
// 			}
// 		}
// 		QuestionAPI.createQuestion(data)
// 			.then(function(res) {
// 				var question = res.question;
// 				Dispatcher.dispatch({
// 					type: MenuActionConstants.ADD_QUESTION,
// 					question: question,
// 					folderRoot: folderRoot,
// 				});
// 			})
// 			.catch(function(error) {
// 				console.error(error);

// 			})
// 	},


// 	listFolders() {
// 		FolderAPI.listFolders({})
// 			.then(function(res) {
// 				Dispatcher.dispatch({
// 					type: MenuActionConstants.LIST_FOLDERS,
// 					rootFolder: res.root_folder,
// 					shareFolder: res.root_shared_folders,
// 				});
// 			})
// 			.catch(function(error) {
// 				console.error(error)
// 			})
// 	},
// 	deleteFolder(folderIndex, folder) {
// 		FolderAPI.deleteFolder({folderid: folder._id}, (err, res) => {
// 			if(!err){
// 				Dispatcher.dispatch({
// 					type: MenuActionConstants.DELETE_FOLDER,
// 					folderIndex: folderIndex,
// 					folder: folder
// 				});
// 			}
// 		});
// 	},
// 	shareQuestion(questionIndex, question, email) {
// 		const data =  {
// 			user: {
// 				email: email,
// 			},
// 			questionId: question._id,
// 		}
// 		QuestionAPI.shareQuestion(data, (err, res) => {
// 			if (!err) {
// 				const type = MenuActionConstants.SHARE_ITEM;
// 				Dispatcher.dispatch({
// 					type,
// 					question,
// 					questionIndex
// 				});
// 			}
// 		});
// 	},

// 	shareFolder(folderIndex, folder, email) {
// 		const data =  {
// 			user: {
// 				email: email,
// 			},
// 			folderId: folder._id,
// 		}
// 		FolderAPI.shareFolder(data, (err, res) => {
// 			if (!err) {
// 				const type = MenuActionConstants.SHARE_FOLDER;
// 				Dispatcher.dispatch({
// 					type,
// 					folder,
// 					folderIndex
// 				});
// 			}
// 		});
// 	}

// }

var Reflux = require('reflux');

var MenuActions = Reflux.createActions([
	"createFolder",
	"createQuestion",
	"deleteQuestion",
	"listFolders",
	"deleteFolder",
	"shareQuestion",
	"shareFolder",
	"changeFolder"
]);


module.exports = MenuActions;
