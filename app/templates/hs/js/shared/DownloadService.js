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
					console.log("Successfully deleted " + fileEntry.name);
				}
				function removeError(msg) {
					console.log("Error " + msg + ": Could not delete " + fileEntry.name);
				}
			}
			function fileError() {
				console.log("Could not find " + fileName);
			}

		}
	}

	function downloadFile(URL) {
		if(DeviceService.isMobile()) {
			var fileURL = URL.toString();
			//console.log("fileURL: " + fileURL);
			directory = null;
			try {
				directory = cordova.file.dataDirectory;	
			} catch(err) {
				//console.log('Turning off imageSaver since deviceReady did not load in time.');
				return;
			}
			var fileName = Utilities.getFileName(fileURL);
			//console.log("fileName: " + fileName);
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, downloadAsset);	
		}
		

		function fileSuccess() {
			//console.log("File is already saved on device: " + filePath);
		}

		function downloadAsset() {
			var fileTransfer = new FileTransfer();
			//console.log("About to start file download");
			var downloadURL = encodeURI(fileURL);

			var startTime = Date.now();


			//console.log("downloadURL: " + downloadURL);
			fileTransfer.download(downloadURL, filePath,
				function(entry) {

					var endTime = Date.now();
					var downloadTime = endTime - startTime;
					var file = Utilities.getFileName(downloadURL);
					//console.log("downloading " + file + " took " + downloadTime + " ms");
					var downloadLog = "downloading " + file + " took " + downloadTime + " ms";
					
					entry.file(function(fileObj) {
						var file = Utilities.getFileName(downloadURL);
						var size = ( (fileObj.size/1000) );						
						var time_s = downloadTime/1000;
						var downloadSpeed = size/time_s;
						//console.log(file + " took " + time_s + " seconds to download " + size + "kb");
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
					//console.log("Error downloading file. Code: " + error.code);
				},
				// Boolean for trustAllHosts which accepts all security certs and is useful
				// since Android rejects self-signed security certs.
				// Not recomemended for production use.
				true);
		}
	}

	function testNetworkSpeed() {
		//console.log("testing network speed...");
		downloadFile("https://placeimg.com/800/800/nature");
	}




};

