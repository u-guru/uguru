angular.module('uguru.directives')
.directive('imageSaver', function (Utilities, $localstorage, DeviceService) {
	return {

		link: function(scope, element, attrs) {
			if (!DeviceService.isMobile() || typeof cordova == "undefined") {
				return;
			}
			var assetURL = attrs.ngSrc.toString();

		 	//var assetURL = attrs.imageSaver.toString();

			var directory = null;

			try {
				directory = cordova.file.dataDirectory;
			} catch(err) {
				return;
			}

			// if(attrs.imageSaver === 'cache' || !Utilities.checkFreeSpace() ) {
			// 	directory = cordova.file.cacheDirectory;
			// }
			var fileName = Utilities.getFileName(assetURL);
			var filePath = directory + fileName;
			window.resolveLocalFileSystemURL(filePath, fileSuccess, function() {downloadAsset(fileName)});

			function fileSuccess() {
				attrs.$set('ng-src', filePath);
			}

			function useSavedFile() {
				attrs.$set('ng-src', filePath);
			}
			function downloadAsset(fileName) {
				var fileTransfer = new FileTransfer();
				var downloadURL = encodeURI(assetURL);
				var startTime = Date.now();
				fileTransfer.download(downloadURL, filePath,
					function(entry) {

						var endTime = Date.now();
						var downloadTime = endTime - startTime;
						entry.file(function(fileObj) {
							var file = Utilities.getFileName(downloadURL);
							var size = ( (fileObj.size/1000) );

							var downloadObj = {
								name: file,
								size_kb: size,
								time_ms: downloadTime
							};
							$localstorage.storeDownloadRecords(downloadObj);
						});
						useSavedFile();
					},
					function(error) {
						attrs.$set('ng-src', assetURL);
					},
					// Boolean for trustAllHosts which accepts all security certs and is useful
					// since Android rejects self-signed security certs.
					// Not recomemended for production use.
					true);
			}
		}
	};
})




