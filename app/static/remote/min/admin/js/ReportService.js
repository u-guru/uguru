angular
.module('uguru.admin')
.factory('ReportService', [
    '$timeout',
    'FileService',
    'LoadingService',
     ReportService
]);
function ReportService($timeout,FileService,LoadingService) {
    var bugReport
    var states
    var caches 

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
    function getBug(){
        if (!caches){
            console.log("no bugCache")
            initData('bugs','https://s3.amazonaws.com/uguru-admin/sync/bugs.json')
        }
        else
            console.log("yes bugCacheg",bugReport)
        return bugReport
    }
    function getStates(){
        if (!caches){
            console.log("no workflow cache found")
            initData('states','https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json')
        }
        else
            console.log("yes cacheg")
        return bugReport
    }
    return{
        initData: initData,
        getBug: getBug,
        getStates: getStates
    }
}