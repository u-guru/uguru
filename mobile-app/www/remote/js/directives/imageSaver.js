angular.module('uguru.directives')
.directive('imageSaver', function (Utilities, $localstorage) {
	return {

		link: function(scope, element, attrs) {
			if (!scope.platform.mobile) {
				 console.log('sorry not on mobile device');
				return;
			}
			var assetURL = attrs.ngSrc.toString();
			 console.log("Current ngSrc value: " + assetURL);
			var directory = cordova.file.dataDirectory;
			var fileName = Utilities.getFileName(assetURL);
			 console.log("fileName: " + fileName);
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, downloadAsset);

			function fileSuccess() {
				 console.log(fileName + " found on device, retrieving from local storage");
				 console.log("Image is already saved on device and will be used: " + filePath);
				attrs.$set('ng-src', filePath);
			}

			function useSavedFile() {
				 console.log("Replacing ng-src with saved file: " + filePath);
				attrs.$set('ng-src', filePath);
			}
			function downloadAsset() {
				var fileTransfer = new FileTransfer();
				 console.log("About to start file download");
				var downloadURL = encodeURI(assetURL);

				var startTime = Date.now();

				console.log("downloadURL: " + downloadURL);
				fileTransfer.download(downloadURL, filePath,
					function(entry) {

						var endTime = Date.now();
						var downloadTime = endTime - startTime;
						entry.file(function(fileObj) {
							var file = Utilities.getFileName(downloadURL);
							var size = ( (fileObj.size/1000) );
							console.log(file + " took " + downloadTime + " ms to download " + size);

							var downloadObj = {
								name: file,
								size_kb: size,
								time_ms: downloadTime
							};
							console.log("downloadObj: " + JSON.stringify(downloadObj));
							$localstorage.storeDownloadRecords(downloadObj);
						});
						console.log("Successfully downloaded image: " + fileName);
						useSavedFile();
					},
					function(error) {
						// console.log("Error downloading image. Code: " + error.code);
					},
					// Boolean for trustAllHosts which accepts all security certs and is useful
					// since Android rejects self-signed security certs.
					// Not recomemended for production use.
					true);
			}
		}
	};
})




