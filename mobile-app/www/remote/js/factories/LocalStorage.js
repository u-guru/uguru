angular.module('ionic.utils', [])
  
.factory('$localstorage', ['$window','$cordovaFile',function($window,$cordovaFile) {
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
    updateDisk: function() {
      console.log("UpdateDisk :"+JSON.stringify(cordova.file));
      //console.log("Error List :"+ JSON.stringify($cordovaFileError));
    

      //JSON.stringify()
      console.log("FreeDisk :"+JSON.stringify($cordovaFile.getFreeDiskSpace()));


      $cordovaFile.getFreeDiskSpace().then(function (success){
               // success in kilobytes
               console.log("success");
            }, function (error) {
                // error
               console.log("Error :" error);
            });
     /* 
      $cordovaFile.listDir(fileDir + 'test').then( function(entries)
      {
        console.log('listDir: ', entries);
      }, function(err)
      {
        console.error('listDir error: ', err);
      });*/
    },
    saveToDisk: function()
    {
      console.log("Save To disk");

    }


  };
}]);