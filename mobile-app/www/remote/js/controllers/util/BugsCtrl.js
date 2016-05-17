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
    $scope.help = {};
    $scope.listOption = ['All Bugs', 'Prioritized Bugs','Recently Complete'];
    $scope.selectOption = $scope.listOption[0]
    $scope.openBugList=function(section){
        console.log("Click",section.name)
        $scope.bugs = section.bugs
        $scope.help = section.help
        $scope.name = section.name
    }


    $scope.$on('$ionicView.beforeEnter', function() {
  
      loadUpdatedBugsJsonFile($scope);
    })

    function loadUpdatedBugsJsonFile(scope) {
      LoadingService.showAmbig('Loading....', 10000);
      //https://s3.amazonaws.com/uguru-admin/jason/bugs.json
      //https://s3.amazonaws.com/uguru-admin/sync/bugs.json
      FileService.getS3JsonFile(null, 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', callbackFunc);
      function callbackFunc(name, resp) {
        scope.bugReport = resp
        LoadingService.hide()
        $timeout(function() {
         LoadingService.showSuccess(resp.length + ' bugs loaded', 1000) ;
        })
      }
    }
    setTimeout(function() {
      console.log($scope.bugReport)
    }, 1000);



  }


])