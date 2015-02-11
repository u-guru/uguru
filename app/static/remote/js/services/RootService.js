angular.module('uguru.root.services', [])
.service('RootService',
    [
    '$cordovaKeyboard',
    '$localstorage',
    '$timeout',
    '$cordovaProgress',
    function($cordovaKeyboard, $localstorage, $timeout, $cordovaProgress) {

    this.util = {
        objectFindByKey: function(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        return array[i];
                    }
            }
            return null;
        },
        objectFindByIndexByKey: function(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        return i;
                    }
            }
            return null;
        }
    }

    this.keyboard =  {
        close: function(bool) {
          if (window.cordova && window.cordova.plugins.Keyboard) {
              $cordovaKeyboard.close();
          }
        },
        isVisible: function() {
            return $cordovaKeyboard.isVisible();
        },
        show: function(target, delay) {
          var delay_seconds = delay || 0.1;
          if (!this.forceOff()) {
            $timeout(function() {
                document.getElementsByName(target)[0].focus();
            }, delay_seconds)
          }
        },
        forceOff: function(bool) {
            var currentState = $localstorage.get('keyboard_force_off', null);

            //if currentState is not initialized, initialize it
            if (!currentState&& bool === null) {
                $localstorage.setObject('keyboard_force_off', false);
                return false;
            }
            //user is getting
            else if (bool === null) {
                return currentState;
            }
            //user is setting
            else {
                $localstorage.setObject('keyboard_force_off', bool)
            }

        },
    }

    this.progress = {
        //TODO
        showSuccess: function() {
            return false;
        },
        isVisible: function(bool) {
            var currentState = $localstorage.get('is_progress_visible', null);

            if (!currentState&& bool === null) {
                $localstorage.setObject('is_progress_visible', false);
                return false;
            }
            //user is getting
            else if (bool === null) {
                return currentState;
            }
            //user is setting
            else {
                $localstorage.setObject('is_progress_visible', bool)
            }
        }
    }

    this.button = {
        showButtonPressedAndHide: function(targetElement) {
            targetElement.classList.add('active');
            $timeout(
                function() {
                    var button = targetElement.classList.remove('active');
                },
            250)
        }
    }

    return this;

}]);