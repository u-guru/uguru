angular
.module('uguru.admin')
.factory('ReportService', [
    '$timeout',
    'FileService',
    'LoadingService',
    '$q',
     ReportService
]);
function ReportService($timeout,FileService,LoadingService,$q) {
    var bugReport
    var states
    var caches 
    var defaultEnvi= []
    /**
    * Redeem the data from amazons services
    *   
    * @param dataUrl
    */
    // function initData(bugUrl='https://s3.amazonaws.com/uguru-admin/sync/bugs.json'){
    //     bugReport = redeemData(bugUrl)
    //     console.log("Done",bugReport)
    //     return bugReport
    // }
    function redeemData(url, cb){
          var xhr = new XMLHttpRequest();
        xhr.open( 'GET', url, true );

        xhr.onload = function () {
            var resp = window.JSON.parse( xhr.responseText );
            cb && cb(resp);
        };
        xhr.send();
    }

    function initData(name,url){
        redeemData(url,callback)
        function callback(resp){
            bugReport = resp
            caches = true
            LoadingService.hide()
            $timeout(function() {
             LoadingService.showSuccess(resp.length + ' '+name+' loaded', 1000) ;
            })
        }
    }

    function saveBug(newObject){
        bugReport = newObject;
    }
    
    function syncReport(newObject){
      
      FileService.postS3JsonFile(JSON.stringify(newObject), null ,
                                 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', postCallback);
      function postCallback(firstName, resp) {
          saveBug(newObject);
          console.log('file successfully saved', resp);          
        }
    }
    function getBug(id){
        var deferred = $q.defer();
         setTimeout(function() {
           if (bugReport) {
              var found;
              deferred.resolve(bugReport);
              // for(var i = 0; i < bugReport.length; ++ i)
              //   { 
              //     if(bugReport[i].bugID === id){
              //       found = bugReport[i];
              //     }
              //   }

              //   if (found){
              //       deferred.resolve(found);
              //   }
              //   else{
              //       deferred.reject('Unable to lunch bug report');

              //   }
           } 
           else {
             deferred.reject('Unable to lunch bug report',bugReport);
           }
         }, 3000);

         return deferred.promise;
    }

    function getStates(){
        if (!caches){
            initData('states','https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json');
        }
        return bugReport;
    }
    return{
        initData: initData,
        getBug: getBug,
        saveBug: saveBug,
        getStates: getStates,
        syncReport:syncReport
    };
}