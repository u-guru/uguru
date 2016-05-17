angular.module('uguru.util.controllers')
.filter('selectedTags', function() {
  return function(bugs, tags) {
          return bugs.filter(function(bug) {
              //no filter if tags is empty
              if (tags.length == 0){
                return true
              }
              for (var i in bug.tags) {
                  if (tags.indexOf(bug.tags[i]) != -1) {
                      return true;
                  }
              }
              return false;

          });
        }
})
.controller('BugsController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'FileService',
  'LoadingService',
  'CTAService',
  function($scope, $state, $timeout, FileService, LoadingService ,CTAService) {
    
    $scope.openBugList=function(section){
        $scope.bugs = section.bugs
        $scope.help = section.help
        $scope.name = section.name
    }
    $scope.order = function() {
      $scope.reverse = !$scope.reverse;
    };
    function addTag(content){
        taglist = $scope.advanceSearch.tags.list
        if (content.length > 0 ) {
          if (taglist.indexOf(content) > -1){
            $scope.advanceSearch.tags.empty_tag.content = '';
            $scope.advanceSearch.tags.err_msg = 'Repeating Tag';
            $timeout(function() {
              $scope.advanceSearch.tags.err_msg = '';
            }, 2500);
            return
          }
            
          $scope.advanceSearch.tags.list.push(content);
          $scope.advanceSearch.tags.empty_tag.content = '';
        }

    }
    function removeTag(index){
      if ($scope.advanceSearch.tags.list && $scope.advanceSearch.tags.list.length) {
        $scope.advanceSearch.tags.list.splice(index, 1);
      }
    }

    function intData(){
        $scope.bugs = [];
        $scope.help = {};
        $scope.availableOptions = [
                                     {id: '1', name: 'All Bugs'},
                                     {id: '2', name: 'Prioritized Bugs'},
                                     {id: '3', name: 'Recently Complete'} 
                                   ]
        $scope.reverse = true;
        $scope.selectOption = $scope.availableOptions[0]
        $scope.advanceSearch ={
             'tags': {'list':[], 'add': addTag, 'remove':removeTag, 'err_msg':'', 'empty_tag': {'placeholder':"+   add a tag", 'content': ''}},
        }

    }


    $scope.$on('$ionicView.beforeEnter', function() {
  
      loadUpdatedBugsJsonFile($scope);
      intData()
      setTimeout(function() {
        CTAService.initSingleCTA('#cta-box-request-payments', '#request-cta-payment', function() {
          $scope.card = {exp: '', number: '', cvc: '', placeholder:"**** **** **** 4242"};
          initHandlers($scope, '#request-cta-payment');
        });
      }, 500);
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