angular.module('uguru.admin')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  'SpecContentService',
  function($scope, $state, $timeout, $localstorage, $window, SpecContentService) {
    //spec service get all


    $scope.search = {text: ''};

    $scope.team_members = SpecContentService.getTeamMembers();


    $scope.user_workflows = [];
    $scope.user_workflows = SpecContentService.getContentSpec('preApp');
    $scope.admin_tasks = SpecContentService.getContentSpecAdmin('preApp');
    // console.log("LOG", $scope.user_workflows[4].bugs.launchBugTab())
    $scope.$watchCollection('$parent.bugReport', function(newNames, oldNames) {
      if (!oldNames && newNames){
        console.log('BUG is Update',newNames);
      }
      else if(oldNames && newNames){
        console.log('BUG is Update',newNames);
      }
      // for(var i= 0 ; i< $scope.user_workflows.length; ++i){
      //   console.log('check', $scope.user_workflows[i]);
      //   for (var x =0 ; i < newNames.length; ++i)
      //   {

      //   };
      // };
    });

    function getUserFirstName(user) {
      return (user && user.name.split(' ')[0].toLowerCase()) || {name: 'jason'};
    }

    $scope.parseMember = function(member_name) {

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