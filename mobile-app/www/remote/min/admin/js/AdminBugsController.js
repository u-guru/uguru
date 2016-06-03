angular.module('uguru.admin')
.filter('selectedTags', function() {
  return function(bugs, tags) {
          return bugs.filter(function(bug) {
              //no filter if tags is empty
              if (tags.length === 0){
                return true;
              }
              for (var i in bug.tags) {
                  if (tags.indexOf(bug.tags[i]) !== -1) {
                      return true;
                  }
              }
              return false;

          });
        };
})
.filter('selectedPlatforms', function() {
  return function(bugs, platforms) {
          return bugs.filter(function(bug) {
              //no filter if tags is empty
              if (platforms.length === 0){
                return true;
              }
              for (var i in bug.platforms) {
                  if (platforms.indexOf(bug.platforms[i]) !== -1) {
                      return true;
                  }
              }
              return false;

          });
        };
})
.controller('AdminBugsController', [
  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'FileService',
  'LoadingService',
  'ReportService',
  'CTAService',
  '$localstorage',
  '$timeout',
  'SpecContentService',
  function($scope, $state, $timeout, FileService, LoadingService,ReportService,
            CTAService,$localstorage, $timeou,SpecContentService) {

    $scope.openBugList=function(section){
      $scope.bugs = section.bugs;
      $scope.help = section.help;
      $scope.name = section.name;
      if ($scope.name === ''){
        $scope.addSection = true;
        $scope.newSection ={
          name:'',
          bugs:[],
          help:{}
        };
      }
      else{
        $scope.addSection = false;
      }
    };
    $scope.pushNewSection = function(newSection){
      $scope.bugReport.push(newSection);
      // console.log($scope.bugReport);
      // $scope.addSection = false;
    };
    $scope.removeBug = function(index){
      console.log(index);
      $scope.bugs.splice(index,1);
      $scope.saveBug();
      $scope.closeBug();      
    };    
    $scope.addBug = function(){
      function checkTitleRepeat(title,bugs){
        for (var i = 0; i< bugs.length; ++i){
            if(bugs[i].title === title) {
              return true;
            }
        }
        return false;
      }
      console.log('CHECK', $scope.selectedBug);
      if (!checkTitleRepeat($scope.selectedBug.title,$scope.bugs)){
        $scope.bugs.push($scope.selectedBug);
        $scope.saveBug();
        $scope.closeBug();
      }
      else{
        alert('THIS BUG HAS BEEN ALREADY FILED');
      }
    };
    $scope.saveBug = function(){
      $scope.editMode();
      // console.log($scope.bugReport);
      FileService.postS3JsonFile(JSON.stringify($scope.bugReport), null ,
                                 'https://s3.amazonaws.com/uguru-admin/sync/bugs.json', postCallback);
      function postCallback(firstName, resp) {
          console.log('file successfully saved', resp);
          ReportService.saveBug($scope.bugReport);

          LoadingService.hide();
          $timeout(function() {
            LoadingService.showSuccess('Saved!', 1000);
          });
        }
    };
    $scope.reviseBug = function(){
      $scope.selectedBug = angular.copy($scope.backupBug);
      $scope.editMode();
    };
    $scope.editMode = function(){
      $scope.isEditMode = !$scope.isEditMode;

    };
    $scope.order = function() {
      $scope.reverse = !$scope.reverse;
    };

    $scope.closeBug = function(){
        var element = document.querySelector('#cta-modal-selected-bug');
        var className = element.className.replace('show','');
        element.className = className;
        var target = document.querySelector('#cta-box-selected-bug');
        target.removeAttribute('id');
        $scope.isEditMode = false;
        $scope.isNewBug = false;

    };
    $scope.nextBug = function(){
      console.log($scope.selectedBug.index);
      var index = $scope.selectedBug.index + 1;
      $scope.selectedBug = $scope.bugs[index];
      $scope.selectedBug.index = index;
      $scope.backupBug = angular.copy($scope.selectedBug);

    };
    $scope.fixBug = function(){
      var d = new Date();
      $scope.selectedBug.fix=
      {
        isFixed : true,
        fixedDate : d.toUTCString(),
        getTime : d.getTime()
      };
    };

    $scope.unfixBug = function(){
      $scope.selectedBug.fix=null;
    };

    $scope.preBug = function(){
      var index = $scope.selectedBug.index - 1;
      $scope.selectedBug = $scope.bugs[index];
      $scope.selectedBug.index = index;
      $scope.backupBug = angular.copy($scope.selectedBug);
    };

    $scope.initAndLaunchBugCTA = function($event,bug,index){
      // console.log("Check",$event)
      var targetElem = $event.target;
      if (bug){
        $scope.selectedBug = bug;
        $scope.backupBug = angular.copy(bug);
        $scope.selectedBug.index = index;
      }
      else
      {
        $scope.isNewBug = true;
        $scope.isEditMode = true;
        $scope.selectedBug = {
          title: null,
          file_names:null,
          file_type:null,
          notes:null,
          rank:null,
          element:null,
          priority:null,
          difficulty:null,
          error_msg:null,
          impact_file:[],
          platforms:[],
          tags:[]
        };
        $scope.backupBug = {};
        // $scope.selectedBug.index = -1;
      }
 
      $scope.lastCTABoxTargetElem = targetElem;
      $scope.lastCTABoxTargetElem.id = 'cta-box-selected-bug';
      CTAService.initSingleCTA('#' + targetElem.id, '#main-bug-content');

      $timeout(function() {
        var targetElem = document.querySelector('#cta-box-selected-bug');

        // angular.element(targetElem).triggerHandler('click');
        var modalElem = document.querySelector('#cta-modal-selected-bug');
        // CTAService.showModalCTA(modalElem);

        modalElem.classList.add('show');
      });
    };

    $scope.removePlatform = function(index){
      if ($scope.selectedBug.platforms && $scope.selectedBug.platforms.length) {
        $scope.selectedBug.platforms.splice(index, 1);
      }
    };
    $scope.addNewPlatform = function(name){
      var platlist = $scope.selectedBug.platforms;
      if (name) {
        if ($scope.advanceSearch.platforms.available_list.indexOf(name) < 0){
          return setErrorMsg('We do not support this platforms: '+name);
        }
        if (platlist.indexOf(name) > -1){
          return setErrorMsg('This platform is already exist');
        }
        $scope.selectedBug.platforms.push(name);
      }
      return '';
    };

    $scope.removeTag = function(index){
      if ($scope.selectedBug.tags && $scope.selectedBug.tags.length) {
        $scope.selectedBug.tags.splice(index, 1);
      }
    }
    $scope.addNewTag = function(newTag){
      taglist = $scope.selectedBug.tags
      if (newTag) {
        if (taglist.indexOf(newTag) > -1){
          return setErrorMsg('Repeating Tag')
        }
        $scope.selectedBug.tags.push(newTag);
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
    function genUniqueID(objName){
      var id = 0;
      for (var i = 0; i < objName.length ; ++ i) {
        id += objName.charCodeAt(i);
      }
      return id;
    }
    function linkReport(object){
      var id = genUniqueID(object.title);
      for (var i = 0; i < $scope.bugReport.length; ++ i) {
        if($scope.bugReport[i].bugID === id){
          return;
        }
      }
      return {name:object.title,bugID:id,bugs:[],help:{}};
    }
    function intData(){
    
        $scope.bugs = [];
        $scope.help = {};
        $scope.isEditMode = false;
        $scope.availableOptions = [
                                     {id: '1', name: 'All Bugs'},
                                     {id: '2', name: 'Prioritized Bugs'},
                                     {id: '3', name: 'Recently Complete'}
                                  ];
        $scope.availableOptions = {
            'selectedIndex': 0,
            'options': ['All Bugs','Prioritized Bugs','Recently Complete']
        };
        $scope.reverse = true;
        $scope.selectOption = $scope.availableOptions[0];
        $scope.advanceSearch ={
             'platforms' :{'list':[],'add': addPlatform, 'remove':removePlatform,'available_list':[ 'chrome','firefox','safari','android','android-chrome','ios','ios-safari']},
             'tags': {'list':[], 'add': addTag, 'remove':removeTag, 'err_msg':'', 'empty_tag': {'placeholder':"+   add a tag", 'content': ''}},
        }

        if ($localstorage.getObject('advanceSearch')!=='[]'){
          var cache = $localstorage.getObject('advanceSearch');
          $scope.advanceSearch.platforms.list = cache.platforms.list;
          $scope.advanceSearch.tags.list = cache.tags.list;
          console.log('Reset',$scope.advanceSearch);
        }
        for (var i = 0; i < $scope.bugReport.length; ++ i) {
          if(!$scope.bugReport[i].bugID){
           $scope.bugReport[i].bugID =  genUniqueID($scope.bugReport[i].name);
          }
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
    function getReportIndexByID(id){
        for(var i = 0; i < $scope.bugReport.length ; ++i)
        {
          if ($scope.bugReport[i].bugID === parseInt(id)){
            return i;
          }
        }
        return;
    }

    $timeout(function() {
      loadUpdatedBugsJsonFile($scope);
    });

    $scope.$watchCollection('bugReport', function(newNames, oldNames) {
      if (!oldNames && newNames){
        console.log("Data is Load",newNames)
        intData();
        $scope.indexOfSection = getReportIndexByID(document.URL.split('admin/bugs/')[1]);
        if ($scope.indexOfSection){
          $scope.openBugList($scope.bugReport[$scope.indexOfSection]);

        }
        else{
          $scope.openBugList($scope.bugReport[0]);
        }        
        // $scope.openBugList({name:'',bugs:[],help:{}})
        $scope.userWorkflows = SpecContentService.getContentSpec('preApp');
        ReportService.saveBug($scope.bugReport);
        // console.log('Reprort',ReportService.getBug());

      }
      else if(oldNames && newNames){
          console.log("Data is Update",newNames)
         // $scope.openBugList($scope.bugReport[$scope.bugReport.length-1]);
         $scope.userWorkflows = SpecContentService.getContentSpec('preApp');

      }
    });

    $scope.$watchCollection('userWorkflows', function(newNames, oldNames) {
      if (!oldNames && newNames){
        for (var i = 0; i < $scope.userWorkflows.length; i++)
        {
          var section = linkReport($scope.userWorkflows[i]);
          if (section){
            $scope.bugReport.push(section);
          }
          else{
            console.log('repeat!',section);
          }
        }
      }
      else if(oldNames && newNames){
        console.log('Workflows is Update',newNames);
      }
    });

    window.onbeforeunload = function(event)
      {
        if($scope.isEditMode){
          event.returnValue = 'All file won"t be saved without click save button.\n';
        }

      };

  }


]);