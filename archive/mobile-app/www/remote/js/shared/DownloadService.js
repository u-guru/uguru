angular.module('sharedServices')
.factory("DownloadService", [
	'Utilities',
	'uTracker',
	'DeviceService',
	DownloadService
	]);

function DownloadService(Utilities, uTracker, DeviceService) {

	return {
		downloadFile: downloadFile,
		deleteFile: deleteFile,
		testNetworkSpeed: testNetworkSpeed
	}

	function deleteFile(URL) {
		if(DeviceService.isMobile()) {
			var fileName = Utilities.getFileName(URL.toString());
			var directory = cordova.file.dataDirectory;
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, fileError);
			function fileSuccess(fileEntry) {
				fileEntry.remove(removeSuccess, removeError);

				function removeSuccess() {
					return
				}
				function removeError(msg) {
					console.error("Error " + msg + ": Could not delete " + fileEntry.name);
				}
			}
			function fileError() {
				console.error("Could not find " + fileName);
			}

		}
	}

	function downloadFile(URL) {
		if(DeviceService.isMobile()) {
			var fileURL = URL.toString();
			directory = null;
			try {
				directory = cordova.file.dataDirectory;	
			} catch(err) {
				return;
			}
			var fileName = Utilities.getFileName(fileURL);
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, downloadAsset);	
		}
		

		function fileSuccess() {
			return
		}

		function downloadAsset() {
			var fileTransfer = new FileTransfer();
			var downloadURL = encodeURI(fileURL);
			var startTime = Date.now();


			fileTransfer.download(downloadURL, filePath,
				function(entry) {

					var endTime = Date.now();
					var downloadTime = endTime - startTime;
					var file = Utilities.getFileName(downloadURL);
					var downloadLog = "downloading " + file + " took " + downloadTime + " ms";
					
					entry.file(function(fileObj) {
						var file = Utilities.getFileName(downloadURL);
						var size = ( (fileObj.size/1000) );						
						var time_s = downloadTime/1000;
						var downloadSpeed = size/time_s;
						uTracker.track(tracker, "DownloadFile", {
							"$File_Name": file,
							"$Size_kb": size,
							"$Time_s": time_s,
							"$Download_Speed": downloadSpeed,
							"$Network_Type": navigator.connection.type
						});
					});
					
				},
				function(error) {
					return	
				},
				// Boolean for trustAllHosts which accepts all security certs and is useful
				// since Android rejects self-signed security certs.
				// Not recomemended for production use.
				true);
		}
	}

	function testNetworkSpeed() {
		downloadFile("https://placeimg.com/800/800/nature");
	}




};

