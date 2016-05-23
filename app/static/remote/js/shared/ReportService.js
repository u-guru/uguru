angular
.module('sharedServices')
.factory("ReportService", [
    '$timeout',
    'FileService',
    'LoadingService',
     ReportService
]);
function ReportService($timeout,FileService,LoadingService) {
    var bugReport =[]

    /**
    * Redeem the data from amazons services
    *   
    * @param dataUrl
    */
    function initData(bugUrl='https://s3.amazonaws.com/uguru-admin/sync/bugs.json'){
        bugReport = redeemData(bugUrl)
        console.log("Done",bugReport)
        return bugReport
    }
    function redeemData(name,url){
        var data
        LoadingService.showAmbig('Loading....', 10000);
        //https://s3.amazonaws.com/uguru-admin/jason/bugs.json
        //https://s3.amazonaws.com/uguru-admin/sync/bugs.json
        FileService.getS3JsonFile(null, 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', callbackFunc);
        function callbackFunc(name, resp) {
            data = resp
            LoadingService.hide()
            $timeout(function() {
                LoadingService.showSuccess(resp.length + ' bugs loaded', 1000) ;
            })
        }
        $setTimeout(function() {
            console.log("HI:",data)
        }, 1000);
    }

    return{
        init:initData
    }
}