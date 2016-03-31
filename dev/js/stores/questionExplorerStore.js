const Reflux = require('reflux');
const QuestionExplorerActions = require('../actions/questionExplorerActions');
const FolderAPI = require('../api/utils/folder');
const QuestionAPI = require('../api/utils/question');
const LoaderActions = require('../components/util/actions/LoaderActions');
const NotificationActions = require('../components/util/actions/NotificationActions');


var QuestionExplorerStore = Reflux.createStore({
	listenables: [QuestionExplorerActions],
	currentRoute: [],
	currentFolder: null,
	sortOptions: {field: "name", order: 1},
	init() {},
	getInitialState() {
		return this.generateState();
	},

	listMyFolders() {
		var self = this;
		LoaderActions.showLoader("Cargando datos, espere por favor");
		FolderAPI.listFolders({}).then(function(res) {
			self.currentFolder = res.root_folder;
			self.currentRoute = self.generateRoute(self.currentFolder);
			self.trigger(self.generateState());
			LoaderActions.hideLoader();
		}).catch(function(error) {
			console.error(error);
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
			LoaderActions.hideLoader();
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
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
		});
	},

	changeFolder(folderid) {
		var self = this;
		LoaderActions.showLoader("Espere por favor");
		FolderAPI.getFolder({folderid: folderid}).then(function(res) {
			var folder = res.folder;
			self.currentFolder = folder;
			self.currentRoute = self.generateRoute(self.currentFolder);
			self.sort(self.sortOptions.field, self.sortOptions.order);
			self.trigger(self.generateState());
			LoaderActions.hideLoader();
		}).catch(function(error) {
			console.error(error);
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
			LoaderActions.hideLoader();
		})
	},

	createQuestion(questionData, parentFolderId) {
		var self = this;
		var data = {
			folderid: parentFolderId,
			question: questionData
		}
		LoaderActions.showLoader("Creando pregunta");
		QuestionAPI.createQuestion(data)
		.then(function(res) {
			var question = res.question;
			self.currentFolder.questions.push(question);
			self.trigger(self.generateState());
			LoaderActions.hideLoader();
			window.open(`/admin/question/${question._id}`);
		})
		.catch(function(error) {
			console.error(error);
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
			LoaderActions.hideLoader();
		})
	},

	updateQuestion(question, index, newQuestionName, newQuestionType) {
		var data = {questionId: question._id, question: {name: newQuestionName, type: newQuestionType}};
		var self = this;
		LoaderActions.showLoader("Actualizando");
		QuestionAPI.updateQuestion(data).then(function(res) {
			var ok = res.ok;
			if(ok) {
				self.currentFolder.questions[index].name = newQuestionName;
				self.currentFolder.questions[index].type = newQuestionType;
			}
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Actualización éxitosa");
			self.trigger(self.generateState());
		}).catch(function(err) {
			LoaderActions.hideLoader();
			console.error(err);
			NotificationActions.showNotification("Ha ocurrido un error", "alert");
		})
	},

	updateFolder(folder, index, newFolderName) {
		var data = {folderid: folder._id, folder: {name: newFolderName}};
		var self = this;
		LoaderActions.showLoader("Actualizando");
		FolderAPI.updateFolder(data).then(function(res) {
			var ok = res.ok;
			if(ok) {
				self.currentFolder.folders[index].name = newFolderName;
			}
			LoaderActions.hideLoader();
			NotificationActions.showNotification("Actualización éxitosa");
			self.trigger(self.generateState());
		}).catch(function(err) {
			LoaderActions.hideLoader();
			console.error(err);
			NotificationActions.showNotification("Ha ocurrido un error", "alert");
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
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
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
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
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
			NotificationActions.showNotification("Ocurrió un error, intente de nuevo más tarde", "alert");
		});
	},

	sortData(field, order) {
		this.sort(field, order);
		this.sortOptions = {
			field: field,
			order: order
		}
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
	generateRoute(folder) {
		var route = [{_id: folder._id, name: folder.name}]
		var parent = folder.parent_folder;
		while(parent != undefined && parent != null && parent != "") {
			route.push({_id: parent._id, name: parent.name});
			parent = parent.parent_folder;
		}
		return route.reverse();
	},

	sort(field, order) {
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
	}
});

module.exports = QuestionExplorerStore;
