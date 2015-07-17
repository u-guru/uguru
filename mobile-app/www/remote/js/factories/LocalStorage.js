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


      /* $cordovaFile.getFreeDiskSpace().then(function (success){
               // success in kilobytes
               console.log("success");
            }, function (error) {
                // error
               console.log("Error :" error);
            });*/

     /* 
      $cordovaFile.listDir(fileDir + 'test').then( function(entries)
      {
        console.log('listDir: ', entries);
      }, function(err)
      {
        console.error('listDir error: ', err);
      });*/
    },
    saveToDisk: function(platfrom)
    {

      console.log("Check Platform : " + platfrom);
      var hostfile_Path = 'http://192.168.42.83:8100/remote/img/onboarding-phone.svg';
      var fileDir = 'remote/img/'
      var localDataPath =  cordova.file.dataDirectory;
      var clientFile_Path = localDataPath +'remote/img/onboarding-phone.svg';
      var fileTransferOptions = {};
      //console.log("Check Plugin :" + JSON.stringify($cordovaFileTransfer));
      if (platfrom=="Android")        
      {
         console.log('cordova.file.applicationDirectory: ' + cordova.file.applicationDirectory);
         console.log('cordova.file.applicationStorageDirectory: ' + cordova.file.applicationStorageDirectory);
         console.log('cordova.file.dataDirectory: ' + cordova.file.dataDirectory);
         console.log('cordova.file.externalDataDirectory: ' + cordova.file.externalDataDirectory);

        // //$cordovaFile.downloadFile(hostfile_Path, clientFile_Path, true, fileTransferOptions).then(function (success) {
        //   console.log("Download success");
        // }, function (error) {
        //   console.error('Error '+JSON.stringify(error));
        // });
        
        //console.log("Check Plugin :" + JSON.stringify(fileTransfer));

         //check Dir
         //should see error if it is hasn't created yet
        $cordovaFile.checkDir(localDataPath, "remote/img/").then(function (success) {
          console.log("Dir Clear")
        }, function (error) {
          console.error('Dir Error '+JSON.stringify(error));
        });
        //check File
         $cordovaFile.checkFile(localDataPath, "onboarding-phone.svg").then(function (success) {
          console.log("File Clear")
        }, function (error) {
          console.error('File Error '+JSON.stringify(error));
        });

        //create dir
        $cordovaFile.createDir(cordova.file.dataDirectory, "remote/img/", true).then(function (success) {
            // success
            console.log("Dir Create success");
          }, function (error) {
            // error
            console.error('Create Dir Error '+JSON.stringify(error));
          });
        // //create file
        //  $cordovaFile.createFile(cordova.file.dataDirectory, "remote/img/onboarding-phone.svg", true).then(function (success) {
        // // success
        //     console.log("File Create success");
        //   }, function (error) {
        // // error
        //   console.error('Create file Error '+JSON.stringify(error));
        // });



      }







      // console.log("Save To disk");
      // //http://192.168.42.83:8100/remote/img/onboarding-phone.svg
      // //Download the file 
      // var hostfile_Path = 'http://192.168.42.83:8100/remote/img/onboarding-phone.svg';
      // console.log("");
      // var clientPath = fileTransferDir + 'remote/img/onboarding-phone.svg';
      // var fileTransferOptions = {};

    }


  };
}]);