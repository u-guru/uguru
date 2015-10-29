angular
	.module('sharedServices')
	.factory('LoadingService', [
		'$scope',
		'$ionicLoading',
		LoadingService]);

function LoadingService($scope, $ionicLoading) {

	return {
		show: show,
		showAmbig: showAmbig,
		showFailure: showFailure,
		showSuccess: showSuccess,
		updateSuccessText: updateSuccessText,
		hide: hide
	};

    function show() {
        $ionicLoading.show({
            templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html'
        });
    }

    function showAmbig(text, duration) {
        $scope.ambigLoaderText = text || '';

        $ionicLoading.show({
            scope: $scope,
            templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
            duration: duration || 1000
        });
        
    }

    function showFailure(text, duration) {
        $scope.ambigLoaderText = text || '';

        $ionicLoading.show({
            scope: $scope,
            templateUrl: BASE + 'templates/u.loader.failure.svg.html',
            duration: duration || 1000
        });
        
    }

    function showSuccess(text, duration, callback) {

        $scope.successLoaderText = text || '';

        $ionicLoading.show({
            scope: $scope,
            templateUrl: BASE + 'templates/u.loader.success.svg.html',
            duration: duration || 1000
        });
        
        if (typeof callback !== 'undefined') {
    		callback();
        } 
    }

    function updateSuccessText(text) {
        $scope.successLoaderText = text || 'loading';
    }

    function hide(delay) {
        $scope.ambigLoaderText = '';
        delay = delay || 0;
        $timeout(function() {
            $ionicLoading.hide();
            
        }, delay);
    }



}