angular.module('sharedServices')
.factory('PerformanceService', [
	"uTracker",
	"DownloadService",
	PerformanceService
	]);

function PerformanceService(uTracker, DownloadService) {

	var appStartTime, appLoadTime;

	var listResponseTimes = [];

	return {
		getAppLoadTime: getAppLoadTime,
		setListResponseTime: setListResponseTime,
		sendListResponseTime: sendListResponseTime,
		sendNetworkInfo: sendNetworkInfo,
	};

	function getAppLoadTime() {

		appStartTime = Date.now();

		var time_ms = appStartTime - start_dom_time;
		var time_s = (time_ms / 1000.0).toPrecision(3);
		appLoadTime = time_s;
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
		listResponseTimes.shift();
		if(listResponseTimes.length > 0) {
			var total = 0;
			for(var i = 0; i<listResponseTimes.length; i++) {
				total += listResponseTimes[i];
			}
			var mean = Math.round((total/listResponseTimes.length));
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


	// Should only call on mobile, but don't implement a check in here, otherwise it throws circular dependency error
	// Instead implement the check from the context of which this function is being called.
	function sendNetworkInfo() {

			$timeout(function() {
				var downloadRecords = JSON.parse($window.localStorage['download_records'] || '{"files": []}');
				uTracker.track(tracker, "Network Info", {
					"$Download_Speed": downloadRecords.downloadSpeed,
					"$Connection_Type": navigator.connection.type
				});
			}, 5000);
	}

}












