angular.module('sharedServices')
.factory('ThrottleService', [
	'$timeout',
	throttle
	]);

function throttle($timeout) {
	return function (fn, threshhold, scope) {
		threshhold = threshhold || 250;
		var last, promise;
		return function throttle () {
			var context = scope || this;
			var now = Date.now();
			var args = arguments;
			if (last && now < last + threshhold) {
				//hold on to it
				$timeout.cancel(promise);
				promise = $timeout(function throttleTimeout () {
					last = now;
					fn.apply(context, args);

				}, threshhold);
			} else {
				last = now;
				fn.apply(context, args);
			}

		};
	};
}