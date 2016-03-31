import Auth from './auth'
import QuestionAPI from '../api/utils/question'
class CkeditorController {
	constructor(questionId) {
		this.currentInstance = null;
		this.focusManager = null;
		this.questionId = questionId;
	}

	createInstance(domId) {
		this.currentInstance = CKEDITOR.document.getById(domId);
		this.currentInstance = CKEDITOR.replace(domId, {
			filebrowserUploadUrl: QuestionAPI.getRoute({questionId: self.questionId}, "uploadImage"),
			imageUploadUrl: QuestionAPI.getRoute({questionId: self.questionId}, "uploadImage")
		});
		var focusManager = new CKEDITOR.focusManager(this.currentInstance);
		this.focusManager = focusManager;
		return this.currentInstance;
	}

	setQuestionId(questionId) {
		this.questionId = questionId;
	}

	setEvents() {
		var self = this;
		this.currentInstance.on( 'fileUploadRequest', function( evt ) {
			var fileLoader = evt.data.fileLoader,
        formData = new FormData(),
        xhr = fileLoader.xhr;
			xhr.open("POST", QuestionAPI.getRoute({questionId: self.questionId}, "uploadImage") , true);
			xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
			xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken());
			xhr.setRequestHeader( 'X-File-Name', evt.data.fileLoader.fileName );
			xhr.setRequestHeader( 'X-File-Size', evt.data.fileLoader.file.size );
			formData.append( 'upload', fileLoader.file, fileLoader.fileName );
			xhr.send( formData );

			// Prevented default behavior.
			evt.stop();
		});
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