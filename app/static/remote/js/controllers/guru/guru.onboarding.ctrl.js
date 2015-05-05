angular.module('uguru.guru.controllers', [])

//ALL student controllers
.controller('BecomeGuruController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaKeyboard',
  '$cordovaStatusbar',
  '$ionicPlatform',
  function($scope, $state, $timeout, $localstorage, $ionicModal,
    $cordovaKeyboard, $cordovaStatusbar, $ionicPlatform) {

    $scope.progressMax = 4;

    if (!$scope.user.majors) {
      $scope.user.majors = [];
    }

    if (!$scope.user.guru_courses) {
      $scope.user.guru_courses = [];
    }

    $ionicPlatform.ready(function() {

      if (window.StatusBar) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(true);
      }

    });

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
    $ionicModal.fromTemplateUrl(BASE + 'templates/add-course.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addCourseModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/add-major.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addMajorModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/university.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addUniversityModal = modal;
    });

    $ionicModal.fromTemplateUrl(BASE + 'templates/guru-intro.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addGuruIntroModal = modal;
    });

    // $scope.showSuccess = function(msg) {
    //   if (!$scope.progress_active)  {
    //       $scope.progress_active = true;
    //       $cordovaProgress.showSuccess(true, msg)
    //       $timeout(function() {
    //         $cordovaProgress.hide();
    //         $scope.progress_active = false;
    //       }, 1000);
    //   } else {

    //     console.log('Show success cannot be shown because progress bar is already active');
    //   }
    // }

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
      $localstorage.setObject('user', $scope.user);
      $state.go('^.guru-home');
      $scope.user.updateAttr('is_a_guru', $scope.user, true, null, $scope);
      // $scope.user.guru_mode = true;

      //save to local

    }

    $scope.uberFriendlyChange = function() {
      $scope.user.updateAttr('uber_friendly', $scope.user, $scope.user.uber_friendly, null, $scope);
    }

    $scope.outsideSchoolChange = function() {
      $scope.user.updateAttr('outside_university', $scope.user, $scope.user.outside_university, null, $scope);
    }

    $scope.summer15Change = function() {
      $scope.user.updateAttr('summer_15', $scope.user, $scope.user.summer_15, null, $scope);
    }

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('before view enter...')

      if (window.StatusBar) {
        StatusBar.styleLightContent();
      }
    });


  }

]);
