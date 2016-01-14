const Reflux = require('reflux');
const QuestionExplorerActions = require('../actions/questionExplorerActions');
const FolderAPI = require('../api/utils/folder');



var QuestionExplorerStore = Reflux.createStore({
		listenables: [QuestionExplorerActions],
		userFoldersTree: {},
		currentRoute: [],
		currentFolder: null,
		init() {},
		getInitialState() {
			return this.generateState();
		},

		listFolders() {
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

		changeFolder(folderId) {
			this.currentFolder = this.userFoldersTree[folderId];
			this.currentRoute = this.generateRoute(this.currentFolder, this.userFoldersTree);
			this.trigger(this.generateState());
		},

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
