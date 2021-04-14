angular.module('ionic.utils', [])

.factory('$localstorage', [
  '$window', 
  '$ionicPlatform', //feel free to add more stuff here
  '$cordovaFile',
  function($window, $ionicPlatform, $cordovaFile) {
  

  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },
    removeObject: function(key) {
      $window.localStorage.removeItem(key);
    },
    
    //feel free to pass in extra arguments
    saveToDisk: function(arg1, arg2) {

      console.log('saving to disk...');
      //if android

      //if ios

      //if android

    }, 


  };
}]);