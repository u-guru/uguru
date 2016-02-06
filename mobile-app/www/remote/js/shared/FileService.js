angular
.module('sharedServices')
.factory("FileService", [
  FileService
	]);

function FileService() {

    return {
        initDropzoneFromSelector: initDropzoneFromSelector
    }

    function initDropzoneFromSelector(elem_selector) {
        if (elem_selector) {
            var dropzoneElem = new Dropzone(elem_selector, getDefaultRequestDropzone());
        }
    }

    function getDefaultRequestDropzone() {
        return {
                    previewTemplate: document.getElementById('preview-template').innerHTML,
                    url: 'sample'
                }
    }

}









