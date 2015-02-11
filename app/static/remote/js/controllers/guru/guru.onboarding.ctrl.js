angular.module('uguru.guru.controllers', [])

//ALL student controllers
.controller('BecomeGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$cordovaKeyboard',
  function($scope, $state, $timeout, $localstorage, $ionicModal,
    $cordovaProgress, $cordovaKeyboard) {

    $scope.progressMax = 4;

    if (!$scope.user.majors) {
      $scope.user.majors = [];
    }

    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }

    $scope.calculateProgress = function(user) {
      count = 0;

      //filled out university
      if (user.university_id) {
        count += 1;
      }

      //filled out major
      if ($scope.user.majors.length > 0 && user.majors[0].id) {
        count += 1;
      }

      //filled out courses
      if ($scope.user.guru_courses.length > 0) {
        count += 1;
      }

      //filled out guru introduction
      if ($scope.user.guru_introduction) {
        count += 1;
      }

      $scope.progressValue = count;
      return count;

    };

    $scope.progressValue = $scope.calculateProgress($scope.user);

    console.log($scope.user.guru_courses);
    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/add-course.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addCourseModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/add-major.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addMajorModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/university.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addUniversityModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/components/modals/guru-intro.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addGuruIntroModal = modal;
    });

    $scope.showSuccess = function(msg) {
      if (!$scope.progress_active)  {
          $scope.progress_active = true;
          $cordovaProgress.showSuccess(true, msg)
          $timeout(function() {
            $cordovaProgress.hide();
            $scope.progress_active = false;
          }, 1000);
      } else {

        console.log('Show success cannot be shown because progress bar is already active');
      }
    }

    $scope.closeKeyboard = function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.close();
      }
    }

    $scope.goToGuruHome = function() {
      $state.go('^.home');
    }

    $scope.submitGuruOnboarding = function() {
      $scope.user.is_a_guru = true;
      $scope.rootUser.updateLocal($scope.user);
      $scope.user.updateAttr('is_a_guru', $scope.user, true);
      $state.go('^.home');
    }


  }

]);
