angular.module('sharedServices')
.factory("DownloadService", [
	Utilities,
	DownloadService
	]);

function DownloadService(Utilities) {

	return {
		downloadFile: downloadFile
	}

	function downloadFile(URL) {
		var fileURL = URL.toString();
		console.log("fileURL: " + fileURL);
		var directory = cordova.file.dataDirectory;
		var fileName = Utilities.getFileName(assetURL);
		console.log("fileName: " + fileName);
		var filePath = directory + fileName;
		window.resolveLocalFileSystemURL(filePath, fileSuccess, downloadAsset);

		function fileSuccess() {
			console.log("File is already saved on device: " + filePath);
		}

		function downloadAsset() {
			var fileTransfer = new FileTransfer();
			console.log("About to start file download");
			var downloadURL = encodeURI(fileURL);
			console.log("downloadURL: " + downloadURL);
			fileTransfer.download(downloadURL, filePath,
				function(entry) {
					console.log("Successfully downloaded file: " + filePath);
				},
				function(error) {
					console.log("Error downloading file. Code: " + error.code);
				},
				// Boolean for trustAllHosts which accepts all security certs and is useful
				// since Android rejects self-signed security certs. 
				// Not recomemended for production use.
				true);
		}
	}




};

