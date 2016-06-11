angular.module('uguru.admin')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  'SpecContentService',
  'ReportService',
  function($scope, $state, $timeout, $localstorage, $window, SpecContentService,ReportService) {
    //spec service get all


    $scope.search = {text: ''};

    $scope.team_members = SpecContentService.getTeamMembers();


    $scope.user_workflows = [];
    $scope.user_workflows = SpecContentService.getContentSpec('preApp');
    $scope.admin_tasks = SpecContentService.getContentSpecAdmin('preApp');
    // console.log("LOG", $scope.user_workflows[4].bugs.launchBugTab())

    if (window.location.href.split(':8100').length > 1) {
      $timeout(function() {
        console.log("ACTION")
        initBugs();
      }, 1000)
    }

    function initBugs () {
      ReportService.getBug().then(function(result){
       $scope.bugReport = result;
       console.log('result', $scope.bugReport);
      }, function(reason) {
        console.log(reason);
      });
      $scope.$watchCollection('bugReport', function(newNames, oldNames) {
        if (!oldNames && newNames){
          console.log('bugReport is load');
        }
        else if(oldNames && newNames){
          console.log('bugReport is Update');
        }
      });
    }
    $scope.updateStatus = function(index){
        // console.log($scope.manualBugs.platforms);
        // console.log($scope.bugReport[1].manualState);
        // console.log($scope.manualBugs[$scope.availableState.selectedIndex].platforms[index])
        switch($scope.manualBugs[$scope.availableState.selectedIndex].platforms[index].isPassed){
          case 1:
            $scope.manualBugs[$scope.availableState.selectedIndex].platforms[index].isPassed = -1;
            break;
          case -1:
            $scope.manualBugs[$scope.availableState.selectedIndex].platforms[index].isPassed = 0;
            break;
          case 0:
            $scope.manualBugs[$scope.availableState.selectedIndex].platforms[index].isPassed = 1;
            break;
        }
        // console.log($scope.manualBugs[0].platforms);
        // console.log($scope.bugReport[1].manualState);

        ReportService.syncReport($scope.bugReport);
    };
    $scope.closePlatform = function(){
      var targetElem = document.querySelector('#cta-box-selected-bug');
      var modalElem = document.querySelector('#cta-modal-action-platforms');
      modalElem.classList.remove('show');
    };
    
    $scope.openManualPlatform = function(stateID){
        // $scope.currentStatePlatforms = state.platforms;
        var targetElem = document.querySelector('#cta-box-selected-bug');
        var modalElem = document.querySelector('#cta-modal-action-platforms');
        modalElem.classList.add('show');

        for(var i = 0; i < $scope.bugReport.length ; ++i)
        {
          if ($scope.bugReport[i].stateID === stateID){
            $scope.manualBugs = $scope.bugReport[i].manualState;
            var options = [];
            for (var j = 0; j < $scope.manualBugs.length; ++j ){
              options.push($scope.manualBugs[j].title);
            }
            $scope.availableState = {
              'selectedIndex': 0,
              'options': options
            };
            return;
          }
        }
    };
    $scope.availableOptions = {
        'selectedIndex': 0,
        'options': ['All Bugs','Prioritized Bugs','Recently Complete']
    };
    $scope.getManualState = function(stateID){
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
      for(var i = 0; i < $scope.bugReport.length ; ++i)
      {
        if ($scope.bugReport[i].stateID === stateID){
          var totalPass = 0;
          for (var j = 0; j < $scope.bugReport[i].manualState.length; ++j)
          {
            totalPass += countFailt($scope.bugReport[i].manualState[j]);
          }
          var digit = totalPass/($scope.bugReport[i].manualState.length * 25)* 100;
          return digit.toFixed(2);
        }
      }
      return null;
    };



    $scope.getBug  = function(id){
      var counts;
      if(id && $scope.bugReport){
        for(var i = 0; i < $scope.bugReport.length ; ++i)
        {
          // console.log('index',i);
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