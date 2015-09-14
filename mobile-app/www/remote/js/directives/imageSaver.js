angular.module('uguru.directives')
.directive('imageSaver', function (Utilities) {
	return {

		link: function(scope, element, attrs) {

			var assetURL = attrs.ngSrc.toString();
			//console.log("Current ngSrc value: " + assetURL);
			var directory = cordova.file.dataDirectory;
			var fileName = Utilities.getFileName(assetURL);
			//console.log("fileName: " + fileName);
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, downloadAsset);

			function fileSuccess() {
				//console.log("Image is already saved on device and will be used: " + filePath);
				attrs.$set('ng-src', filePath);
			}

			function useSavedFile() {
				//console.log("Replacing ng-src with saved file: " + filePath);
				attrs.$set('ng-src', filePath);
			}
			function downloadAsset() {
				var fileTransfer = new FileTransfer();
				//console.log("About to start file download");
				var downloadURL = encodeURI(assetURL);
				//console.log("downloadURL: " + downloadURL);
				fileTransfer.download(downloadURL, filePath,
					function(entry) {
						//console.log("Successfully downloaded image: " + fileName);
						useSavedFile();
					},
					function(error) {
						//console.log("Error downloading image. Code: " + error.code);
					},
					// Boolean for trustAllHosts which accepts all security certs and is useful
					// since Android rejects self-signed security certs. 
					// Not recomemended for production use.
					true);
			}
		}
	};
})




