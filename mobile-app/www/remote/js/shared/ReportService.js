angular
.module('sharedServices')
.factory("ReportService", [
    '$timeout',
    'FileService',
    'LoadingService',
     ReportService
]);
function ReportService($timeout,FileService,LoadingService) {
    var bugReport
    var bugCache 
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


    function updateBugReport(data){
        bugReport = data
    }

    function initBug(){
        redeemData('https://s3.amazonaws.com/uguru-admin/sync/bugs.json',callback)
        function callback(resp){
            bugReport = resp
            bugCache = true
            LoadingService.hide()
            $timeout(function() {
             LoadingService.showSuccess(resp.length + ' bugs loaded', 1000) ;
            })
        }
    }
    function getBug(){
        if (!bugCache){
            console.log("no bugCache")
            initBug()
        }
        else
            console.log("yes bugCacheg")
        return bugReport
    }

    return{
        updateBug: updateBugReport,
        initBug: initBug,
        getBug: getBug
    }
}