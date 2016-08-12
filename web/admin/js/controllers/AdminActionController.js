angular.module('uguru.admin')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  'SpecContentService',
  'ReportService',
  '$interval',
  function($scope, $state, $timeout, $localstorage, $window, SpecContentService,ReportService,$interval) {
    //spec service get all


    $scope.search = {text: ''};

    $scope.team_members = SpecContentService.getTeamMembers();

    $timeout(function() {console.log($scope.team_members)});


    $scope.user_workflows = [];
    $scope.user_workflows = SpecContentService.getContentSpec('preApp');
    $scope.admin_tasks = SpecContentService.getContentSpecAdmin('preApp');


    $interval(initBugs, 5000);

    if (window.location.href.split(':8100').length > 1) {
      $timeout(function() {
        initBugs();
      }, 500);
    }

    function countFailt(eachState)
    {
      var count = 0;
      for (var i = 0; i < eachState.platforms.length; ++i){
        if (eachState.platforms[i].isPassed === 1){
           ++ count;
        }
      }
      return count;
    }

    function initBugs () {
      ReportService.getBug().then(function(result){
       if(!$scope.bugReport){
          $scope.bugReport = result['workflows'];
          $scope.lastReportUpdate = result['lastUpdate'];
       }
       else {
          // console.log("check", $scope.lastReportUpdate , result['lastUpdate'])
          classList = document.querySelector('#cta-modal-action-platforms').classList
          if (result['lastUpdate'] > $scope.lastReportUpdate && !classList.contains('show')){
            console.log("UPDATED")
            $scope.bugReport = result['workflows'];
            $scope.lastReportUpdate = result['lastUpdate'];
          }
          // else
          // {
          //   console.log("No data need to updated");
          // }
       }

      }, function(reason) {
        // console.log(reason);
      });
    }

    $scope.$watchCollection('bugReport', function(newNames, oldNames) {
      if (!oldNames && newNames){
        console.log('bugReport is load',$scope.lastReportUpdate);

      }
      if(oldNames && newNames){
        console.log('bugReport is Updated');
      }
    });


    $scope.updateStatus = function(index){
        switch( $scope.statePlatforms[$scope.availableState.selectedIndex].platforms[index].isPassed){
          case 1:
            $scope.statePlatforms[$scope.availableState.selectedIndex].platforms[index].isPassed = -1;
            break;
          case -1:
            $scope.statePlatforms[$scope.availableState.selectedIndex].platforms[index].isPassed = 0;
            break;
          case 0:
            $scope.statePlatforms[$scope.availableState.selectedIndex].platforms[index].isPassed = 1;
            break;
        }
        var report = {
           'workflows': $scope.bugReport,
           'lastUpdate': new Date().getTime()
         }
        ReportService.syncReport(report);
    };
    $scope.closePlatform = function(){
      var targetElem = document.querySelector('#cta-box-selected-bug');
      var modalElem = document.querySelector('#cta-modal-action-platforms');
      modalElem.classList.remove('show');
    };


    $scope.openPlatform = function(workFlowID,key){
        var targetElem = document.querySelector('#cta-box-selected-bug');
        var modalElem = document.querySelector('#cta-modal-action-platforms');
        modalElem.classList.add('show');
        if (key === 'states'){
          $scope.isAutoState = true;
        }
        else{
          $scope.isAutoState = false;
        }
        for(var i = 0; i < $scope.bugReport.length ; ++i)
        {
          if ($scope.bugReport[i].workFlowID === workFlowID){
            // $scope.statePlatforms = $scope.bugReport[i][key];
            $scope.autoReport =  $scope.bugReport[i][key];
            if(key === 'manualState'){
              $scope.manualFound = $scope.bugReport[i]['manualBugs'];
              // console.log('CHECK RESULT',$scope.manualFound);
            }

            // var options = [];

            // for (var j = 0; j <  $scope.statePlatforms.length; ++j ){
            //   options.push( $scope.statePlatforms[j].title);
            // }
            // for (var j = 0; j <  $scope.manualFound.length; ++j ){
            //   options.push( $scope.manualFound[j].title);
            // }
            $scope.statePlatforms = $scope.autoReport;
            setOptions($scope.statePlatforms)
            console.log($scope.statePlatforms,$scope.availableState)
            // $scope.availableState = {
            //   'selectedIndex': 0,
            //   'options': options
            // };
            return;
          }
        }
    };
    $scope.switchSates = function(obj){
      $scope.statePlatforms = obj;
      setOptions($scope.statePlatforms);
    }

    function setOptions(object){
      var options = [];
      for (var j = 0; j <  object.length; ++j ){
        options.push( object[j].title);
      }
      $scope.availableState = {
        'selectedIndex': 0,
        'options': options
      };
    }

    $scope.availableOptions = {
        'selectedIndex': 0,
        'options': ['All Bugs','Prioritized Bugs','Recently Complete']
    };

    // $scope.calState = function(title,key){
    $scope.calState = function(id,key){

      // console.log('check', stateID)
      function convertTitle(str){
          var id = 0;
          for (var i = 0; i < str.length ; ++ i) {
            id += str.charCodeAt(i);
          }
          return id;
      }
      var workFlowID = id;
      // console.log("CHECK",$scope.bugReport)
      for(var i = 0; i < $scope.bugReport.length ; ++i)
      {
        if ($scope.bugReport[i].workFlowID === workFlowID){
          var totalPass = 0;
          for (var j = 0; j < $scope.bugReport[i][key].length; ++j)
          {
            totalPass += countFailt($scope.bugReport[i][key][j]);
          }
          if (key ==='manualState'){
            for (var k = 0; k < $scope.bugReport[i]['manualBugs'].length; ++k)
            {
              totalPass += countFailt($scope.bugReport[i]['manualBugs'][k]);
            }
            var digit = totalPass/($scope.bugReport[i][key].length * 25 +
              $scope.bugReport[i]['manualBugs'].length*25)* 100;
          }
          else{
            var digit = totalPass/($scope.bugReport[i][key].length * 25)* 100;
          };
          return parseFloat(digit.toFixed(2));
        }
      }
      return ' - ';
    };


    $scope.getBug  = function(id){
      var counts;
      if(id && $scope.bugReport){
        for(var i = 0; i < $scope.bugReport.length ; ++i)
        {
          if ($scope.bugReport[i].bugID === id){
            return $scope.bugReport[i].bugs.length;
          }
        }
      }

      return 0;
    };

    function getUserFirstName(user) {
      return (user && user.name.split(' ')[0].toLowerCase()) || {name: 'jason'};
    }

    $scope.parseMember = function(member_name) {
      if (!member_name) {
        return {
          first_name: 'plz login',
          name: 'plz-login',
          profile_url: '',
          priority: true
        }
      }
      var first_name = member_name.split(':')[0];
      var member = JSON.parse(JSON.stringify(getMemberFromFirstName(first_name)));

      var args = null;
      if (member_name.split(':').length > 1) {
        args = member_name.split(':')[1];
        if (args === 'priority') {
          member.priority = true;
          member.value = 0;
        }
        else if (args === 'complete') {
          member.complete = true;
          member.value = 2;
        }
      } else {
        member.value = 1;
      }
      return member;

      function getMemberFromFirstName(name) {
        for (var i = 0; i < $scope.team_members.length; i++) {
          if ($scope.team_members[i].first_name.toLowerCase() === name.toLowerCase()) {
            return $scope.team_members[i];
          }
        }
      }
    }

    for (var i = 0; i < $scope.user_workflows.length; i++) {
      var indexWF = $scope.user_workflows[i];
      if (indexWF.members && indexWF.members.length) {
        for (var j =0; j < indexWF.members.length; j++) {
          var indexMember = indexWF.members[j];
          var memberString = indexWF.members.splice(j, 1)[0];
          indexWF.members.unshift($scope.parseMember(memberString));
        }
      }
    }


  }

])