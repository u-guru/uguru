angular.module('sharedServices')
.factory('PerformanceService', [
	"uTracker",
	"DeviceService",
	"DownloadService",
	PerformanceService
	]);

function PerformanceService(uTracker, DeviceService, DownloadService) {

	var appStartTime, appLoadTime;

	var listResponseTimes = [];

	return {
		getAppLoadTime: getAppLoadTime,
		setListResponseTime: setListResponseTime,
		sendListResponseTime: sendListResponseTime,
		sendNetworkInfo: sendNetworkInfo,
		testNetworkSpeed: testNetworkSpeed
	}

	function getAppLoadTime() {

		appStartTime = Date.now();

		var time_ms = appStartTime - start_dom_time;
		var time_s = (time_ms / 1000.0).toPrecision(3)
		appLoadTime = time_s;
		console.log("appLoadTime: " + appLoadTime);

		uTracker.track(tracker, "App Launch", {
		  "$App_Load_Time": appLoadTime
		});
		uTracker.set(tracker, {
		  "$App_Load_Time": appLoadTime
		});
	}

	function setListResponseTime(time_ms) {

		listResponseTimes.push(time_ms);

	}

	function sendListResponseTime(target) {

		// removing the first item since we're measuring response and not render time, which 
		// won't be noticeable since we're rendering steps ahead
		console.log("listResponseTimes: " + listResponseTimes.toString());
		listResponseTimes.shift();
		if(listResponseTimes.length > 0) {
			var total = 0;
			for(var i = 0; i<listResponseTimes.length; i++) {
				total += listResponseTimes[i];
			}
			var mean = Math.round((total/listResponseTimes.length));
			console.log(target + " mean response time: " + mean);
			var propertyName = "$" + target;
			var performance = 'pass';
			if(mean < 500) performance = 'fail';
			uTracker.track(tracker, "Input Response", {
				propertyName: mean.toString(),
				"$Performance": performance
			});
			// clear the array for the next lists
		}
		listResponseTimes = [];

	}



	function sendNetworkInfo() {
		if(DeviceService.isMobile()) {
			$timeout(function() {
				var downloadRecords = JSON.parse($window.localStorage['download_records'] || '{"files": []}');

				uTracker.track(tracker, "Network Info", {
					"$Download_Speed": downloadRecords.downloadSpeed,
					"$Connection_Type": navigator.connection.type
				});
			}, 5000);
		}
			
	}

	function testNetworkSpeed() {

		console.log("testing network speed...");
		DownloadService.downloadFile("https://placeimg.com/1000/1000/nature");


	}

}












