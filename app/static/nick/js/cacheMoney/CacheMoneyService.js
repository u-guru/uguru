angular.module('cm', [])
.factory('CacheMoneyService', [
	'Utilities',
	CacheMoneyService
	]);

function CacheMoneyService(Utilities) {

	// The directory to store data, make sure deviceready runs before this service is used
	var directory = cordova.file.dataDirectory;

	return {
		isSaved: isSaved,
		downloadAsset: downloadAsset,
		useSavedFile: useSavedFile
	}

	var assetURL;
	var fileName;

	// Check if image is already cached
	function isSaved(src, callback) {

		assetURL = src;
		fileName = Utilities.getFileName(assetURL);

		// Check for the file
		// resolveLocalFileSystemURL(URL, successCallback(returns fileName obj), errorCallback)
		window.resolveLocalFileSystemURL(directory + fileName, useSavedFile, downloadAsset);

	}

	// Download the img from source and save it to device
	function downloadAsset() {
		var fileTransfer = new FileTransfer();
		console.log("About to start transfer");
		fileTransfer.download(assetURL, directory + fileName,
			function(entry) {
				console.log("Success!");
				
				// TODO: Need to place logic here to save in right location, grab new URI
				// and have useCachedFile() call it properly

				useSavedFile();
			},
			function(err) {
				console.log("Error");
				console.dir(err);
			},
			// Boolean for trustAllHosts which accepts all security certs and is useful
			// since Android rejects self-signed security certs. 
			// Not recomemended for production use.
			true);
	}


	// Replace the current img source with the cached location
	function useSavedFile() {

		attrs.$set('src', unknownSource.toString());
	}


}
	





