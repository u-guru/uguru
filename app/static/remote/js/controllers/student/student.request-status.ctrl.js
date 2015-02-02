angular.module('uguru.student.controllers')

.controller('RequestStatusController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$stateParams',
  function($scope, $state, $timeout, $localstorage, 
 	$ionicModal, $cordovaProgress, $stateParams) {
    
    $scope.course = JSON.parse($stateParams.courseObj);
    $scope.progress_active = false;

    $scope.convertTimeEstimate = function(time_int) {
      var time_options = ['30 minutes', '1 Hour', '1.5 hours', '2+ hours'];
      return time_options[time_int];
    }

    $scope.showSuccess = function(msg) {
      if (!$scope.progress_active)  {
          $scope.progress_active = true;
          $cordovaProgress.showSuccess(true, msg)
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 2000);
      } else {

        console.log('Show success cannot be shown because progress bar is already active');
      }
    }

    $scope.cancelRequest = function() {
      
      var student_course = $scope.root.util.objectFindByKey($scope.user.student_courses, 'short_name', $scope.course.short_name);
      var student_request = $scope.root.util.objectFindByKey($scope.user.requests, 'time_created', $scope.course.active_request.time_created);
      student_request.status = 'canceled';
      student_course.active_request = null;
      $scope.rootUser.updateLocal($scope.user);
      var cancelMsg = $scope.course.short_name + ' request canceled';
      $scope.showSuccess(cancelMsg);
      $timeout(function() {
        $state.go('^.home');
      }, 500);
    }

  }


])