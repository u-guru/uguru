angular.module('uguru.util.controllers')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  'SpecContentService',
  function($scope, $state, $timeout, $localstorage, $window, SpecContentService) {
    //spec service get all


    $scope.search = {text: getUserFirstName($scope.user) || ''};

    $scope.team_members = SpecContentService.getTeamMembers();


    $scope.user_workflows = [];
    $scope.user_workflows = SpecContentService.getContentSpec('preApp');
    $scope.admin_tasks = SpecContentService.getContentSpecAdmin('preApp');
    console.log('admin spec', $scope.admin_tasks);


    function getUserFirstName(user) {
      return user.name.split(' ')[0].toLowerCase();
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


// $scope.closePlatform = function(){
//   element = document.querySelector('#cta-modal-platforms')
//   className = element.className.replace('show','')
//   element.className = className;
// }
// $scope.openPlatforms = function($event,tests,index){
//   var targetElem = $event.target;
//   $scope.tests = tests;
//   $scope.tests.index = index
//   // $scope.backup_bug = angular.copy(bug);
//   $scope.lastCTABoxTargetElem = targetElem;
//   $scope.lastCTABoxTargetElem.id = 'cta-box-platforms';
//   CTAService.initSingleCTA('#' + targetElem.id, '#main-state-content');

//   $timeout(function() {
//     var targetElem = document.querySelector('#cta-box-platforms');
//     var modalElem = document.querySelector('#cta-modal-platforms');
//     modalElem && modalElem.classList.add('show');
//   })
// }

// $timeout(function() {
//   $scope.user_workflows = []
//   loadUpdatedWorkflowFile($scope);
// })

// setTimeout(function() {
//   console.log('workflows: ',$scope.user_workflows)
//   initWorkflows($scope.user_workflows)
//   // console.log('workflows: ',$scope.user_workflows)
  
// },2000)

// function initWorkflows(workflows){
//     for (var i = 0 ; i< workflows.length ;++ i){
//       var name = workflows[i].name
//       workflows[i].routes = getRoutes(workflows[i].url,workflows[i].file_name)
//       workflows[i].spec = getSpec(name)
//       workflows[i].bugs = getBugInfo(name)
//     }
// }
// function loadUpdatedWorkflowFile($scope){
//   FileService.getS3JsonFile(null, 'https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json', callbackFunc)
//   function callbackFunc(name, resp) {
//     resp.isExpand = false
//     $scope.user_workflows.push(resp)
//     LoadingService.hide()
//     $timeout(function() {
//      LoadingService.showSuccess(resp.length + ' Spec loaded', 1000) ;
//     })
//   }
  
// }