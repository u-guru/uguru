angular.module('uguru.root.services', [])
.service('RootService',
    [
    '$cordovaKeyboard',
    '$localstorage',
    '$timeout',
    '$cordovaProgress',
    '$cordovaDialogs',
    '$ionicHistory',
    '$ionicViewSwitcher',
    '$state',
    '$ionicPlatform',
    function($cordovaKeyboard, $localstorage, $timeout, $cordovaProgress, $cordovaDialogs, $ionicHistory, $ionicViewSwitcher, $state, $ionicPlatform) {

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
        },
        updateObjectByKey: function(array, key, value, update_key, new_value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        array[i][update_key] = new_value;
                        return true;
                    }
            }
            console.log('object not found for key', key, 'value', value);
            return null;
        },
        removeObjectByKey: function(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        array.splice(i, 1);
                        return;
                    }
            }
            console.log('object not found for key', key, 'value', value);
            return null;

        }
    }

    this.time = {

        since: function(js_date) {
            js_date = js_date.setHours(js_date.getHours() + 7);
            var seconds = Math.floor((new Date() - js_date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }

            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + "d ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + "hr ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + "m ago";
            }
            return Math.floor(seconds) + "s ago";
        },

        formatHoursAndMinutes: function(date_obj, is_end_time) {
            var hours = date_obj.hours;
            var minutes = date_obj.minutes;

            result = ''

            //if 12am
            if (hours === 0 || hours === 12) {
                result += '12';
            }

            else if (hours > 0 && hours < 12) {
                result += hours;
            }

            else if (hours > 12 && hours <= 23) {
                result += hours % 12
            }



            //format minutes
            if (minutes > 0 && minutes === 30) {
                result += ':30'
            }

            if (is_end_time && hours >= 12) {
                result += 'pm';
            }

            if (is_end_time && hours < 12) {
                result += 'am';
            }

            return result
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
        openAndroid: function() {
            if (ionic.Platform.isAndroid() && window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.show();
            }
        }
    }

    this.slider = {
        hide: function() {
            var element_arr = document.getElementsByClassName('slider-pager');

            if (element_arr && element_arr.length > 0) {
                element_arr[0].style.display = "none";
            }
        },
        show: function() {
            var element_arr = document.getElementsByClassName('slider-pager');
            if (element_arr && element_arr.length > 0) {
                element_arr[0].style.display = "block";
            }
        },
        shiftUp: function(amount) {
            var element_arr = document.getElementsByClassName('slider-pager');
            if (element_arr && element_arr.length > 0) {
                element_arr[0].style.marginBottom = amount +'px';
            }
        }

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

    this.nav = {
        goBack: function() {
            console.log('root nav go back was clicked');
            $ionicViewSwitcher.nextDirection('back');
            $state.go('^.student-home');
        }
    }

    this.dialog = {
        //IMPORTANT: WEB-ONLY QUIRK: Confirm does not have a button index if canceled

        alert: function(msg, title, button_name, callback) {
          $cordovaDialogs.alert(msg, title, button_name).then(function() {
            if (callback) {
              callback();
            }
          });
        },

        confirm: function(msg, title, button_array, arr_callback, $scope) {
          $cordovaDialogs.confirm(msg, title, button_array).then(function(button_index) {
            if (button_index === 1) {
                if (arr_callback[0]) {
                    arr_callback[0]();
                }
            }

            if (button_index === 2) {
                arr_callback[1]();
            }

          });
        }
    }

    return this;

}]);