angular.module('cm', [])
.factory('CacheMoneyService', [
	CacheMoneyService
	]);

function CacheMoneyService() {

	// The directory to store data, make sure deviceready runs before this service is used
	var store = cordova.file.dataDirectory;

	return {
		isCached: isCached,
		cacheFile: cacheFile,
		useCachedFile: useCachedFile
	}

	// Check if image is already cached
	function isCached(src, callback) {

		// Check for the file
		window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

	}

	function downloadAsset() {
		var fileTransfer = new FileTransfer();
		console.log("About ot start transfer");
		fileTransfer.download(assetURL, store + fileName,
			function(entry) {
				console.log("Success!");
				appStart();
			},
			function(err) {
				console.log("Error");
				console.dir(err);
			});
	}

	function appStart() {
		$status.innerHTML = "App ready!";
	}

	
	// Download the img from source and save it to device
	function cacheFile() {

	}

	// Replace the current img source with the cached location
	function useCachedFile() {

		attrs.$set('src', 'file location URI');
	}


}
	





