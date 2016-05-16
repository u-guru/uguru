angular.module('uguru.util.controllers')

.controller('BugsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'FileService',
  'LoadingService',
  function($scope, $state, $timeout, FileService, LoadingService) {
    $scope.bugs = [];



    $scope.$on('$ionicView.enter', function() {

      loadUpdatedBugsJsonFile($scope);

    })

    function loadUpdatedBugsJsonFile(scope) {
      LoadingService.showAmbig('Loading....', 10000);
      FileService.getS3JsonFile(null, 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', callbackFunc);
      function callbackFunc(name, resp) {
        scope.bugs = resp;
        LoadingService.hide()
        $timeout(function() {
         LoadingService.showSuccess(resp.length + ' bugs loaded', 1000) ;
        })
      }
    }



  }


])