class CkeditorController {
	constructor() {
		this.currentInstance = null;
		this.focusManager = null;
	}

	createInstance(domId) {
		this.currentInstance = CKEDITOR.document.getById(domId);
		this.currentInstance = CKEDITOR.replace(domId);
		var focusManager = new CKEDITOR.focusManager(this.currentInstance);
		this.focusManager = focusManager;
		return this.currentInstance;
	}

	getInstance() {
		return this.currentInstance;
	}

	getValue() {
		return this.currentInstance.document.getBody().getHtml();
	}

	setValue(value) {
		this.currentInstance.setData(value);
	}

	hasFocus() {
		return this.focusManager.hasFocus;
	}

	setOnBlur(cb) {
		this.currentInstance.on('blur', cb);
	}
}

module.exports = CkeditorController;