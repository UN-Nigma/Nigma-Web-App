var AceEdit = {
	currentInstance: null,
	createInstance(domId) {
		this.currentInstance = ace.edit(domId);
		var editor = this.currentInstance;
		editor.$blockScrolling = Infinity
		editor.setShowPrintMargin(false);
		return this.currentInstance;
	},
	getValue() {
		return this.currentInstance.getValue();
	},
	setValue(value) {
		this.currentInstance.setValue(value, 1);
	},
	getInstance() {
		return this.currentInstance;
	}
};

module.exports = AceEdit;