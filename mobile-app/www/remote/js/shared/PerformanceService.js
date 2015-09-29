angular.module('sharedServices')
.factory('PerformanceService', [
	uTracker,
	PerformanceService
	]);

function PerformanceService(uTracker) {

	var appStartTime, appLoadTime;

	return {
		getAppLoadTime: getAppLoadTime
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
}