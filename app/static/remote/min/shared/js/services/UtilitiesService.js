angular
.module('uguru.shared.services')
.factory("UtilitiesService", [
    '$rootScope',
    '$compile',
    '$timeout',
    UtilitiesService
    ]);

function UtilitiesService($rootScope, $compile, $timeout) {
    $timeout(function() {
        initSupport();
    })
    return {
        getNetworkSpeed: getNetworkSpeed,
        deg2rad: deg2rad,
        getDistanceInMiles: getDistanceInMiles,
        nickMatcher: nickMatcher,
        removeAllOccurrancesArr: removeAllOccurrancesArr,
        replaceAll: replaceAll,
        getFileName: getFileName,
        camelCase: camelCase,
        camelToDash: camelToDash,
        isElementInViewport: isElementInViewport,
        transitionEndEventName: transitionEndEventName,
        fireBeforeEnter: fireBeforeEnter,
        fireSchoolChange: fireSchoolChange,
        rAF: rAF,
        sortArrObjByKey: sortArrObjByKey,
        checkFreeSpace: checkFreeSpace,
        getFreeSpace: getFreeSpace,
        clearLoader: clearLoader,
        validateEmail: validateEmail,
        validatePhone: validatePhone,
        validateCode: validateCode,
        validateName: validateName,
        validatePassword: validatePassword,
        keyboardExistsAndVisible: keyboardExistsAndVisible,
        keyboardExists: keyboardExists,
        cordovaExists: cordovaExists,
        numberWithCommas: numberWithCommas,
        isAdminRequest: isAdminRequest,
        compileToAngular: compileToAngular,
        initSupport: initSupport
    }

    function camelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function camelToDash(str) {
      return str.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2');
   }

    function initSupport() {
        //cross platform filter
        if (!Array.prototype.filter) {
          Array.prototype.filter = function(fun /*, thisp*/) {
            var len = this.length >>> 0;
            if (typeof fun != "function")
            throw new TypeError();

            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
              if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                res.push(val);
              }
            }
            return res;
          };
        }
        //
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                           || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());
    }


    function removeAllOccurrancesArr(str, remove_arr_str) {
      for (var i = 0; i < remove_arr_str.length; i++) {
        var indexRemoveStr = remove_arr_str[i];
        str = replaceAll(str, indexRemoveStr, '');
      }
      return str;
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);

      function escapeRegExp(str) {
          return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      }

    }

    function sortArrObjByKey(arr, key) {
        function compare(a,b) {
          if (a[key] < b[key])
            return -1;
          if (a[key] > b[key])
            return 1;
          return 0;
        }
        arr.sort(compare);
        return arr
    }

    function compileToAngular(elemID, scope) {
        var elem = document.getElementById(elemID);
        elem && $compile(elem)(scope);
    }

    function getNetworkSpeed() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';


        return networkState;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    function getDistanceInMiles(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        var miles = d * 0.621371; // Convert to miles
        return miles;
    }

    function readError(type, code) {
        if(type==='geolocation') {
            Settings.location = false;
            switch(code) {
                case 1: return 'user denied permission';
                    break;
                case 2: return 'user position is unavailable';
                    break;
                case 3: return 'GPS timed out'
                    break;
            }
        }
    }

    // Pass in an optional ID parameter for specific case handling
    function nickMatcher(input, list, property, id) {

        var matcher = new FastMatcher(list, {
            selector: property,
            caseInsensitive: true,
            preserveOrder: true,
            anyWord: true,
            limit: 1000
        });

        if(id === 'university') matcher.preserveOrder = true;

        return matcher.getMatches(input);
    }

    function QueryURLString() {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
        return query_string;
    }

    function isAdminRequest() {
        var urlParams = QueryURLString();
        if (urlParams.admin_token && urlParams.user_id) {
            return { admin_token: urlParams.admin_token, user_id: urlParams.user_id };
        };
    }

    function loginAsUser() {

    }


    function getFileName(URI) {
        var indexSlash = URI.lastIndexOf("/");
        var fileName = URI.substring(indexSlash + 1);

        return fileName;
    }

    function cordovaExists() {
        return (typeof cordova === 'undefined');
    }

    function keyboardExists() {
        return cordovaExists() && cordova.plugins && cordova.plugins.Keyboard;
    }

    function keyboardExistsAndVisible() {
        return keyboardExists && cordova.plugins.Keyboard.isVisible;
    }

    function isElementInViewport (el) {
        var rect = el[0].getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function transitionEndEventName() {
        var i,
            undefined,
            el = document.createElement('div'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    }

    var BeforeEnterEvent = new CustomEvent("beforeEnter");

    function fireBeforeEnter() {
        return BeforeEnterEvent;
    }

    var SchoolChangeEvent = new CustomEvent('schoolChange');

    function fireSchoolChange() {
        return SchoolChangeEvent;
    }

    function rAF() {
      return
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 16);
        };
    }


    function checkFreeSpace(size) {
        var size_b = size
        if(size_b === undefined) size_b = 300,000,000;
        var free = getFreeSpace(size_b);
        return free;
    }

    function getFreeSpace(size_b) {

        var size_mb = size_b/1000/1000;
        cordova.exec(function(result) {
            var space_mb = result/1000;
                if(space_mb > size_mb) {
                return true;
            } else {
                uTracker.track('Low Disk Space', {
                    '$Free_Space': space_mb,
                    '$File_Size': size_mb
                });
                return false;
            }
        }, function(error) {
            uTracker.track('Callback Error', {
                '$Message': error
            });
            return false;
        }, "File", "getFreeDiskSpace", []);
    }


    function clearLoader() {
        $rootScope.loader.hide();
    }

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validatePhone(phone) {
        var check = phone.match(/\d/g)
        return check!==null && check.length===10;
    }

    function validateCode(code) {
        // if(code!==null) {
        //  return code.length===4;
        // } else return false;
        return code != null && code.length===4
    }

    function validateName(name) {
        var re= /^[A-z ]+$/;
        return re.test(name);
    }

    function validatePassword(password) {
        if(password!==null) {
            return password.length>=6;
        } else return false;
    }

    function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];

    // // for reference
    // $scope.fireKeyUpEvent = function() {
    //   var elem = document.getElementById('card-input');
    //   var e = document.createEvent("KeyboardEvent");
    //   e.initEvent("keyup", true, true);
    //   e.view = window;
    //   e.altKey = false;
    //   e.ctrlKey = false;
    //   e.shiftKey = false;
    //   e.metaKey = false;
    //   e.keyCode = 0;
    //   e.charCode = 'a';
    //   e.keyCode = 32;

    //   elem.dispatchEvent(e);
    // }
}

}




