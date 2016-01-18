const Reflux = require('reflux');
const QuestionExplorerActions = require('../actions/questionExplorerActions');
const FolderAPI = require('../api/utils/folder');
const QuestionAPI = require('../api/utils/question');



var QuestionExplorerStore = Reflux.createStore({
	listenables: [QuestionExplorerActions],
	userFoldersTree: {},
	currentRoute: [],
	currentFolder: null,
	init() {},
	getInitialState() {
		return this.generateState();
	},

	listMyFolders() {
		var self = this;
		FolderAPI.listFolders({}).then(function(res) {
			res.root_folder.name = "Mis preguntas";
			self.currentFolder = res.root_folder;
			self.formatTreeStructure(res.root_folder);
			self.currentRoute = self.generateRoute(self.currentFolder, self.userFoldersTree);
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		});
	},
	listSharedFolders() {
		var self = this;
		FolderAPI.listSharedFolders({}).then(function(res) {
			res.root_folder.name = "Compartidas conmigo";
			self.currentFolder = res.root_folder;
			self.formatTreeStructure(res.root_folder);
			self.currentRoute = self.generateRoute(self.currentFolder, self.userFoldersTree);
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		});
	},

	changeFolder(folderId) {
		this.currentFolder = this.userFoldersTree[folderId];
		this.currentRoute = this.generateRoute(this.currentFolder, this.userFoldersTree);
		this.trigger(this.generateState());
	},

	createQuestion(questionName, parentFolderId) {
		var self = this;
		var data = {
			folderid: parentFolderId,
			question: {
				name: questionName
			}
		}
		QuestionAPI.createQuestion(data)
		.then(function(res) {
			var question = res.question;
			self.currentFolder.questions.push(question);
			self.trigger(self.generateState());
		})
		.catch(function(error) {
			console.error(error);
		})
	},

	createFolder(folderName, parentFolderId) {
		var self = this;
		var data = {
			folderid: parentFolderId,
			folder: {
				name: folderName
			}
		};
		FolderAPI.createFolder(data)
		.then(function(res) {
			var folder = res.folder;
			self.currentFolder.folders.push(folder);
			self.userFoldersTree[folder._id] = folder;
			self.trigger(self.generateState());
		})
		.catch(function(error) {
			console.error(error);
		});
	},

	deleteQuestion(question) {
		var self = this;
		QuestionAPI.deleteQuestion({questionId: question._id})
		.then(function(res) {
			self.currentFolder.questions = self.currentFolder.questions.filter((currentQuestion) => (currentQuestion._id != question._id));
			self.trigger(self.generateState());
		})
		.catch(function(error) {
			console.error(error)
		})
	},

	deleteFolder(folder) {
		var self = this;
		FolderAPI.deleteFolder({folderid: folder._id})
		.then(function(res) {
			self.currentFolder.folders = self.currentFolder.folders.filter((directory) => (directory._id != folder._id));
			delete self.userFoldersTree[folder._id];
			self.trigger(self.generateState());
		})
		.catch(function(error) {
			console.error(error)
		});
	},

	//Helpers

	generateState() {
		var self = this;
		return {
			currentFolder: self.currentFolder,
			currentRoute: self.currentRoute
		};
	},

	formatTreeStructure(rootFolder) {
		if(rootFolder != undefined && rootFolder != null && rootFolder._id != undefined && rootFolder._id != null){
			var tree = {};
			this.userFoldersTree[rootFolder._id] = rootFolder;
			var folders = rootFolder.folders;
			for(var i = 0;i < folders.length; i++)
				this.formatTreeStructure(folders[i]);
		}
	},
	generateRoute(folder, currentTree) {
		var route = [{_id: folder._id, name: folder.name}]
		var parent = folder.parent_folder;
		while(parent != null && parent != "") {
			folder = currentTree[parent]
			if(folder == null) break;
			route.push({_id: folder._id, name: folder.name});
			parent = folder.parent_folder;
		}
		return route.reverse();
	}
});

module.exports = QuestionExplorerStore;
