angular.module('uguru.version', [])
.factory('Version', [
	'$localstorage',
	'Restangular',
	function($localstorage, Restangular) {

	    var Version;

	    Version = {

	    		setVersion: function(version_num) {
		            $localstorage.set('version', version_num);
		        },
		        getVersion: function() {
		        	return $localstorage.get('version');
		        },
		        //check server
		        getUpdatedVersionNum: function() {
		            return Restangular
		                .one('version').get();
		        },

	    };
	    return Version;
}]);