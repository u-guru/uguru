var logOb;
angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', '$timeout',
  function($window, $timeout) {

  var downloadRecords = JSON.parse($window.localStorage['download_records'] || '{"files": []}');
  var downloadPromise = null;

  var isLocalStorageSupported = true;
  try {
    $window.localStorage["test"] = "test";
    $window.localStorage.removeItem('test');
  } catch (error) {
    //alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    console.log("Local Storage not supported.");
    isLocalStorageSupported = false;
  }

  return {
    set: function(key, value) {
      if(isLocalStorageSupported)
      $window.localStorage[key] = value;
      else console.log("Local Storage not supported.");
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    //Returns # of keys
    getLength:function() {
      return $window.localStorage.length;
    },
    clear: function() {
      return $window.localStorage.clear();
    },
    setObject: function(key, value) {
      if(isLocalStorageSupported)
      $window.localStorage[key] = JSON.stringify(value);
      else console.log("Local Storage not supported.");
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    },
    removeObject: function(key) {
      $window.localStorage.removeItem(key);
    },

    // TODO: Seems like mixpanel allows up to 255 properties per object, so we'll need to create
    // additional logs to store as the count reaches the limit
    storeDownloadRecords: function(obj) {

      downloadRecords.files.push(obj);
      if(downloadPromise) {
        //console.log("canceling downloadPromise");
        $timeout.cancel(downloadPromise);
      }
      downloadPromise = $timeout(function() {

        var totalSize = 0;
        var totalTime = 0;
        for(var i=0; i<downloadRecords.files.length; i++) {
          totalSize += downloadRecords.files[i].size_kb;
          totalTime += (downloadRecords.files[i].time_ms / 1000);
        }
        var downloadSpeed = (totalSize/totalTime).toFixed(2);
        //console.log("downloaded: " + totalSize + "kb in " + totalTime + "ms. resulting in a speed of " + downloadSpeed + " kb/s");

        downloadRecords.downloadSpeed = downloadSpeed;
        $window.localStorage['download_records'] = JSON.stringify(downloadRecords);

        downloadPromise = null;

        // uTracker.track(tracker, 'Network Info', {
        //   "$Download_Speed": downloadSpeed,
        //   "$Network_Type": navigator.connection.type
        // });

      }, 7000);
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


  };
}]);