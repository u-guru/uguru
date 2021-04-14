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
.filter('selectedPlatforms', function() {
  return function(bugs, platforms) {
          return bugs.filter(function(bug) {
              //no filter if tags is empty
              if (platforms.length == 0){
                return true
              }
              for (var i in bug.platforms) {
                  if (platforms.indexOf(bug.platforms[i]) != -1) {
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
  '$localstorage',
  '$timeout',
  function($scope, $state, $timeout, FileService, LoadingService,CTAService,$localstorage, $timeout) {

    $scope.openBugList=function(section){
        $scope.bugs = section.bugs
        $scope.help = section.help
        $scope.name = section.name
    }

    $scope.saveBug = function(index){
      $scope.editMode();
      console.log($scope.bugReport)
      FileService.postS3JsonFile(JSON.stringify($scope.bugReport), null , 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', post_callback)
      function post_callback(first_name, resp) {
          console.log('file successfully saved', resp);
          LoadingService.hide();
          $timeout(function() {
            LoadingService.showSuccess('Saved!', 1000);
          })
        }
    }
    $scope.reviseBug = function(){
      $scope.selected_bug = angular.copy($scope.backup_bug)
      $scope.editMode();
    }
    $scope.editMode = function(){
      $scope.isEditMode = !$scope.isEditMode;

    }
    $scope.order = function() {
      $scope.reverse = !$scope.reverse;
    }
    $scope.closeBug = function(){
        element = document.querySelector('#cta-modal-selected-bug')
        className = element.className.replace('show','')
        element.className = className;
        $scope.isEditMode = false
    }
    $scope.nextBug = function(){
      console.log($scope.selected_bug.index)
      var index = $scope.selected_bug.index + 1
      $scope.selected_bug = $scope.bugs[index]
      $scope.selected_bug.index = index
      $scope.backup_bug = angular.copy($scope.selected_bug)

    }
    $scope.fixBug = function(){
      $scope.selected_bug.fixed = true
      $scope.selected_bug.fixedDate = new Date()
    }

    $scope.unfixBug = function(){
      $scope.selected_bug.fixed = false
      $scope.selected_bug.fixedDate = null
    }

    $scope.preBug = function(){
      var index = $scope.selected_bug.index - 1
      $scope.selected_bug = $scope.bugs[index]
      $scope.selected_bug.index = index
      $scope.backup_bug = angular.copy($scope.selected_bug)
    }
    $scope.initAndLaunchBugCTA = function($event,bug,index){
      var targetElem = $event.target;
      $scope.selected_bug = bug;
      $scope.backup_bug = angular.copy(bug);
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

    $scope.removePlatform = function(index){
      if ($scope.selected_bug.platforms && $scope.selected_bug.platforms.length) {
        $scope.selected_bug.platforms.splice(index, 1);
      }
    }
    $scope.addNewPlatform = function(name){
      platlist = $scope.selected_bug.platforms
      if (name) {
        if ($scope.advanceSearch.platforms.available_list.indexOf(name) < 0){
          return setErrorMsg('We do not support this platforms: '+name)
        }
        if (platlist.indexOf(name) > -1){
          return setErrorMsg('This platform is already exist')
        }
        $scope.selected_bug.platforms.push(name);
      }
      return ''
    }

    $scope.removeTag = function(index){
      if ($scope.selected_bug.tags && $scope.selected_bug.tags.length) {
        $scope.selected_bug.tags.splice(index, 1);
      }
    }
    $scope.addNewTag = function(newTag){
      taglist = $scope.selected_bug.tags
      if (newTag) {
        if (taglist.indexOf(newTag) > -1){
          return setErrorMsg('Repeating Tag')
        }
        $scope.selected_bug.tags.push(newTag);
      }
      return ''
    }
    function setErrorMsg(desc){
      $scope.error_msg = desc;
      $timeout(function() {
        $scope.error_msg = '';
      }, 2500);
      return ''
    }
    function addPlatform(content){
      $scope.advanceSearch.platforms.list.push(content);
      $localstorage.setObject('advanceSearch', $scope.advanceSearch);
    }
    function removePlatform(content){
      if ($scope.advanceSearch.platforms.list && $scope.advanceSearch.platforms.list.length) {
        var index = $scope.advanceSearch.platforms.list.indexOf(content)
        $scope.advanceSearch.platforms.list.splice(index, 1);
        $localstorage.setObject('advanceSearch', $scope.advanceSearch);

      }
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
          console.log($scope.advanceSearch)
          $localstorage.setObject('advanceSearch', $scope.advanceSearch);
        }

    }
    function removeTag(index){
      if ($scope.advanceSearch.tags.list && $scope.advanceSearch.tags.list.length) {
        $scope.advanceSearch.tags.list.splice(index, 1);
        $localstorage.setObject('advanceSearch', $scope.advanceSearch);
      }
    }

    function intData(){
        $scope.bugs = [];
        $scope.help = {};
        $scope.isEditMode = false;
        $scope.availableOptions = [
                                     {id: '1', name: 'All Bugs'},
                                     {id: '2', name: 'Prioritized Bugs'},
                                     {id: '3', name: 'Recently Complete'}
                                  ]
        $scope.availableOptions = {
            'selectedIndex': 0,
            'options': ['All Bugs','Prioritized Bugs','Recently Complete']
        }
        $scope.reverse = true;
        $scope.selectOption = $scope.availableOptions[0]
        $scope.advanceSearch ={
             'platforms' :{'list':[],'add': addPlatform, 'remove':removePlatform,'available_list':[ 'chrome','firefox','safari','android','android-chrome','ios','ios-safari']},
             'tags': {'list':[], 'add': addTag, 'remove':removeTag, 'err_msg':'', 'empty_tag': {'placeholder':"+   add a tag", 'content': ''}},
        }

        if ($localstorage.getObject('advanceSearch')!='[]'){
          var cache = $localstorage.getObject('advanceSearch');
          $scope.advanceSearch.platforms.list = cache.platforms.list
          $scope.advanceSearch.tags.list = cache.tags.list
          console.log('Reset',$scope.advanceSearch)
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

    // only need this for standalone view, since this function is not relevant to the view rendering, you're better off just showing a loader until it's complete
    // $scope.$on('$ionicView.beforeEnter', function() {


    // })
    // $scope.$on('$routeChangeStart',function(){
    //   alert("Hello! I am an alert box!!");
    // })

    $timeout(function() {
      loadUpdatedBugsJsonFile($scope);
      intData()
    })

    setTimeout(function() {
      console.log($scope.bugReport)
      $scope.openBugList($scope.bugReport[0])

    }, 1000);
    window.onbeforeunload = function(event)
      {
        if($scope.isEditMode){
          event.returnValue = "All file won't be saved without click save button.\n";
        }

      };

  }


])