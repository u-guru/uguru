angular.module('sharedServices')
.factory("DownloadService", [
	'Utilities',
	'uTracker',
	DownloadService
	]);

function DownloadService(Utilities, uTracker) {

	return {
		downloadFile: downloadFile,
	}

	function downloadFile(URL) {
		var fileURL = URL.toString();
		console.log("fileURL: " + fileURL);
		var directory = cordova.file.dataDirectory;
		var fileName = Utilities.getFileName(fileURL);
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

			var startTime = Date.now();


			console.log("downloadURL: " + downloadURL);
			fileTransfer.download(downloadURL, filePath,
				function(entry) {

					var endTime = Date.now();
					var downloadTime = endTime - startTime;
					var file = Utilities.getFileName(downloadURL);
					console.log("downloading " + file + " took " + downloadTime + " ms");
					var downloadLog = "downloading " + file + " took " + downloadTime + " ms";
					
					entry.file(function(fileObj) {
						var file = Utilities.getFileName(downloadURL);
						var size = ( (fileObj.size/1000) );						
						var time_s = downloadTime/1000;
						var downloadSpeed = size/time_s;
						console.log(file + " took " + time_s + " seconds to download " + size + "kb");
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
					console.log("Error downloading file. Code: " + error.code);
				},
				// Boolean for trustAllHosts which accepts all security certs and is useful
				// since Android rejects self-signed security certs.
				// Not recomemended for production use.
				true);
		}
	}




};

