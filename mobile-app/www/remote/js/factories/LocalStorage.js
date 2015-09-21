var logOb;
angular.module('ionic.utils', [])
  
.factory('$localstorage', ['$window','$cordovaFile', '$timeout', 
  function($window,$cordovaFile, $timeout) {
  
  var currentLog = JSON.parse($window.localStorage['download_log'] || '[]');

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
    storeDownloadLog: function(log) {
      
      //var currentLog = JSON.parse($window.localStorage['download_log'] || '[]');
      currentLog.push(log);
      $timeout(function() {
        $window.localStorage['download_log'] = JSON.stringify(currentLog);  
        $timeout(function() {
          mixpanel.people.set({
              "$Download_Log": currentLog,
          });
        }, 3000);
      }, 10000);
    },
    getDownloadLog: function() {
      return JSON.parse($window.localStorage['download_log']);
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
    init: function()
    {

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
        console.log("got main dir",dir);
        dir.getFile("log.txt", {create:true}, function(file) {
          console.log("got the file", JSON.stringify(file));
          logOb = file;
        var str = "App started";
        if(!logOb) return;
        var log = str + " [" + (new Date()) + "]\n";
        console.log("going to log "+log);
        logOb.createWriter(function(fileWriter) {
          
          fileWriter.seek(fileWriter.length);
          
          var blob = new Blob([log], {type:'text/plain'});
          fileWriter.write(blob);
          console.log("ok, in theory i worked");
        }, fail);
        });
      });
    },
    writeLog: function(str)
    {
      if(!logOb) return;
      var log = str + " [" + (new Date()) + "]\n";
      console.log("going to log "+log);
      logOb.createWriter(function(fileWriter) {
        
        fileWriter.seek(fileWriter.length);
        
        var blob = new Blob([log], {type:'text/plain'});
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
  }, fail);
    }
    // saveToDisk: function(platfrom)
    // {

    //   console.log("Check Platform : " + platfrom);
    //   var hostfile_Path = 'http://192.168.42.83:8100/remote/img/onboarding-phone.svg';
    //   var fileDir = 'remote/img/'
    //   var localDataPath =  cordova.file.dataDirectory;
    //   var clientFile_Path = localDataPath +'remote/img/onboarding-phone.svg';
    //   var fileTransferOptions = {};
    //   //console.log("Check Plugin :" + JSON.stringify($cordovaFileTransfer));
    //   if (platfrom=="Android")        
    //   {
    //      console.log('cordova.file.applicationDirectory: ' + cordova.file.applicationDirectory);
    //      console.log('cordova.file.applicationStorageDirectory: ' + cordova.file.applicationStorageDirectory);
    //      console.log('cordova.file.dataDirectory: ' + cordova.file.dataDirectory);
    //      console.log('cordova.file.externalDataDirectory: ' + cordova.file.externalDataDirectory);
    //     // localDataPath = localDataPath.replace('file:///storage/emulated/0/','');
    //      //console.log('Check externalDataDirectory: ' + localDataPath);

    //     // //$cordovaFile.downloadFile(hostfile_Path, clientFile_Path, true, fileTransferOptions).then(function (success) {
    //     //   console.log("Download success");
    //     // }, function (error) {
    //     //   console.error('Error '+JSON.stringify(error));
    //     // });
        
    //     //console.log("Check Plugin :" + JSON.stringify(fileTransfer));

    //      //check Dir
    //      //should see error if it is hasn't created yet
    //     $cordovaFile.checkDir(localDataPath + "remote/img").then(function (success) {
    //       console.log("Dir Clear")
    //     }, function (error) {
    //       console.error('Dir Error '+JSON.stringify(error));
    //     });
    //     //check cache
    //     console.log("FreeDisk :"+JSON.stringify($cordovaFile.getFreeDiskSpace()));
        
    //     //check File
    //      $cordovaFile.checkFile(localDataPath +"remote/img/onboarding-phone.svg").then(function (success) {
    //       console.log("File Clear")
    //     }, function (error) {
    //       console.error('File Error '+JSON.stringify(error));
    //     });

    //     //create dir
    //     $cordovaFile.createDir(localDataPath , "remote/img", true).then(function (success) {
    //         // success
    //         console.log("Dir Create success");
    //       }, function (error) {
    //         // error
    //         console.error('Create Dir Error '+JSON.stringify(error));
    //       });

    //     // //create file
    //     //  $cordovaFile.createFile(cordova.file.dataDirectory, "remote/img/onboarding-phone.svg", true).then(function (success) {
    //     // // success
    //     //     console.log("File Create success");
    //     //   }, function (error) {
    //     // // error
    //     //   console.error('Create file Error '+JSON.stringify(error));
    //     // });



    //   }







    //   // console.log("Save To disk");
    //   // //http://192.168.42.83:8100/remote/img/onboarding-phone.svg
    //   // //Download the file 
    //   // var hostfile_Path = 'http://192.168.42.83:8100/remote/img/onboarding-phone.svg';
    //   // console.log("");
    //   // var clientPath = fileTransferDir + 'remote/img/onboarding-phone.svg';
    //   // var fileTransferOptions = {};

    // }


  };
}]);