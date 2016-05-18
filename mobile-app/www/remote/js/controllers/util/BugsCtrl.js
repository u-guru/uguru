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
    }
    $scope.closeBug = function(){
        element = document.querySelector('#cta-modal-selected-bug')
        className = element.className.replace('show','')
        element.className = className;
    }
    $scope.nextBug = function(){
      console.log($scope.selected_bug.index)
      var index = $scope.selected_bug.index + 1
      $scope.selected_bug = $scope.bugs[index]
      $scope.selected_bug.index = index
    }
    $scope.preBug = function(){
      var index = $scope.selected_bug.index - 1
      $scope.selected_bug = $scope.bugs[index]
      $scope.selected_bug.index = index
    }

    $scope.initAndLaunchBugCTA = function($event,bug,index){
      var targetElem = $event.target;
      $scope.selected_bug = bug;
      $scope.selected_bug.index = index
      $scope.lastCTABoxTargetElem = targetElem;
      $scope.lastCTABoxTargetElem.id = 'cta-box-selected-bug';
      CTAService.initSingleCTA('#' + targetElem.id, '#main-bug-content');

      $timeout(function() {
        var targetElem = document.querySelector('#cta-box-selected-bug');
        angular.element(targetElem).triggerHandler('click');
        var modalElem = document.querySelector('#cta-modal-selected-bug');
        modalElem && modalElem.classList.add('show');
      })
    }

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
        $scope.isEditMode = false
        $scope.reverse = true;
        $scope.selectOption = $scope.availableOptions[0]
        $scope.advanceSearch ={
             'tags': {'list':[], 'add': addTag, 'remove':removeTag, 'err_msg':'', 'empty_tag': {'placeholder':"+   add a tag", 'content': ''}},
        }

    }

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

    $scope.$on('$ionicView.beforeEnter', function() {

      loadUpdatedBugsJsonFile($scope);
      intData()
    })

    setTimeout(function() {
      console.log($scope.bugReport)
      $scope.openBugList($scope.bugReport[0])

    }, 1000);


  }


])