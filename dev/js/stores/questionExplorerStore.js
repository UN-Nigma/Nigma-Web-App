const Reflux = require('reflux');
const QuestionExplorerActions = require('../actions/questionExplorerActions');
const FolderAPI = require('../api/utils/folder');
const QuestionAPI = require('../api/utils/question');



var QuestionExplorerStore = Reflux.createStore({
	listenables: [QuestionExplorerActions],
	currentRoute: [],
	currentFolder: null,
	sortOptions: {field: "name", order: 1}
	init() {},
	getInitialState() {
		return this.generateState();
	},

	listMyFolders() {
		var self = this;
		FolderAPI.listFolders({}).then(function(res) {
			self.currentFolder = res.root_folder;
			self.currentRoute = self.generateRoute(self.currentFolder);
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		});
	},
	listSharedFolders() {
		var self = this;
		FolderAPI.listSharedFolders({}).then(function(res) {
			self.currentFolder = res.root_folder;
			self.currentRoute = self.generateRoute(self.currentFolder, self.userFoldersTree);
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		});
	},

	changeFolder(folderid) {
		var self = this;
		FolderAPI.getFolder({folderid: folderid}).then(function(res) {
			var folder = res.folder;
			self.currentFolder = folder;
			self.currentRoute = self.generateRoute(self.currentFolder);
			self.trigger(self.generateState());
		}).catch(function(error) {
			console.error(error);
		})
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
			self.trigger(self.generateState());
		})
		.catch(function(error) {
			console.error(error)
		});
	},

	sortData(field, order) {
		var sortFunction = function(q1, q2) {
			if(q1[field] > q2[field])
				return 1*order;
			else if (q1[field] < q2[field])
				return -1*order;
			else
				return 0;
		};
		this.currentFolder.questions.sort(sortFunction);
		this.currentFolder.folders.sort(sortFunction);
		this.trigger(this.generateState());
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
	generateRoute(folder) {
		var route = [{_id: folder._id, name: folder.name}]
		var parent = folder.parent_folder;
		while(parent != undefined && parent != null && parent != "") {
			route.push({_id: parent._id, name: parent.name});
			parent = parent.parent_folder;
		}
		return route.reverse();
	}
});

module.exports = QuestionExplorerStore;
