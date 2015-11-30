angular
.module('sharedServices')
.factory('LoadingService', [
	'$rootScope',
	'$ionicLoading',
    '$timeout',
	LoadingService
    ]);

function LoadingService($rootScope, $ionicLoading, $timeout) {

	return {
		show: show,
		showAmbig: showAmbig,
		showFailure: showFailure,
		showSuccess: showSuccess,
		updateSuccessText: updateSuccessText,
		hide: hide,
        showMsg: showMsg
	};

    function show() {
        $ionicLoading.show({
            templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html'
        });
    }

    function showMsg(message, duration, callback) {
        $ionicLoading.show({
            template: '<span id="E2E-msg" class="capitalized">' + message + '</span>',
            duration: duration || 2000,
        });

        if (typeof callback !== 'undefined') {
            $timeout(function() {
                callback();
            }, duration)
        }
    }

    function showAmbig(text, duration, callback) {
        $rootScope.ambigLoaderText = text || '';

        $ionicLoading.show({
            scope: $rootScope,
            templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
            duration: duration || 1000
        });

        if (typeof callback !== 'undefined') {
            $timeout(function() {
                callback();
            }, duration)
        }

    }

    function showFailure(text, duration) {
        $rootScope.ambigLoaderText = text || '';

        $ionicLoading.show({
            scope: $rootScope,
            templateUrl: BASE + 'templates/u.loader.failure.svg.html',
            duration: duration || 1000
        });

    }

    function showSuccess(text, duration, callback) {
        duration = duration || 1000
        $rootScope.successLoaderText = text || '';

        $ionicLoading.show({
            scope: $rootScope,
            templateUrl: BASE + 'templates/u.loader.success.svg.html',
            duration: duration || 1000
        });

        if (typeof callback !== 'undefined') {
    		$timeout(function() {
                callback();
            }, duration)
        }
    }

    function updateSuccessText(text) {
        $rootScope.successLoaderText = text || 'loading';
    }

    function hide(delay) {
        $rootScope.ambigLoaderText = '';
        delay = delay || 0;
        $timeout(function() {
            $ionicLoading.hide();

        }, delay);
    }



}