angular.module('sharedServices')
.factory('UniversityWorker', [
	'$q',
	UniversityWorker
	]);

function UniversityWorker($q) {

	var worker = new Worker('remote/js/shared/UniversityMatcher.js');
	var defer;

	worker.onmessage = function(e) {
		defer.resolve(e.data);
	};

	return {
		startWorker: startWorker
	}

	function startWorker(input) {
		defer = $q.defer();
		worker.postMessage({
			input: input
		});
		return defer.promise;
	}
}