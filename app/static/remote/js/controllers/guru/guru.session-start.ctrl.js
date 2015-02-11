angular.module('uguru.student.controllers')

//ALL student controllers
.controller('GuruSessionStartController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$cordovaProgress',
  '$stateParams',
  'Geolocation',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $ionicTabsDelegate, $cordovaProgress, $stateParams,
  Geolocation) {

    $scope.session = JSON.parse($stateParams.sessionObj);

    $scope.session = {
      course: {short_name: 'CS10'},
      guru: {first_name: 'Samir'}
    }

    $scope.guru = {
      first_name: 'Shun',
      course:$scope.session.course.short_name,
      guru_courses: $scope.user.student_courses,
      student: {first_name: 'Samir'}
    }

    $scope.goToSessionMessages = function(session) {
      $state.go('^.^.student.messages', {sessionObj:JSON.stringify(session)});
    }

    $scope.goToGuruProfile = function(guru) {
      $state.go('^.^.student.guru-profile', {guruObj:JSON.stringify(session.student)});
    }

    $scope.goToSessionTimer = function(session) {
      $state.go('^.guru-session', {sessionObj:JSON.stringify(session)});
    }

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/ratings.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.ratingModal = modal;
    });


  }

]);

