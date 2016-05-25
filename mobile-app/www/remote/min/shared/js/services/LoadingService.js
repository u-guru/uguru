angular
.module('uguru.shared.services')
.factory('LoadingService', [
    '$rootScope',
    '$ionicLoading',
    '$timeout',
    LoadingService
    ]);

function LoadingService($rootScope, $ionicLoading, $timeout) {
    var loadingDiv;
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

    function showMsg(message, duration, callback, _class) {
        if (duration <= 3000 && message && message.length > 20)  {
            duration = 3000;
        }

        $timeout(function() {
            loadingDiv = document.querySelector('.loading');
            loadingDiv && loadingDiv.classList.add('animated', 'bounceInUp');
        }, 100)

        $ionicLoading.show({
            template: '<span id="E2E-msg" class="capitalized">' + message + '</span>',
            duration: duration || 3000,
        });

        $timeout(function() {
            if (callback && typeof callback !== 'undefined') {
                callback();
            }
        }, duration);

        $timeout(function() {
            if (loadingDiv) {
                loadingDiv.classList.remove('animated', 'bounceInUp');
                loadingDiv.classList.add('animated', 'bounceOutDown');
                $timeout(function() {
                    loadingDiv.classList.remove('animated', 'bounceOutDown');
                }, 2000)
            }
        }, duration - 750);
    }

    function showAmbig(text, duration, callback) {
        $rootScope.ambigLoaderText = text || '';
        if (text && text.length > 20 && duration <= 2500) {
            duration = 2500
        }
        $ionicLoading.show({
            scope: $rootScope,
            templateUrl: BASE + 'templates/u.loader.ambiguous.svg.html',
            duration: duration || 2500
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
            duration: duration || 2000
        });

    }

    function showSuccess(text, duration, callback) {
        duration = duration || 2000
        if (duration <= 2000) {
            duration = 2000;
        }
        $rootScope.successLoaderText = text || '';

        $ionicLoading.show({
            scope: $rootScope,
            templateUrl: BASE + 'templates/u.loader.success.svg.html',
            duration: duration || 2000
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