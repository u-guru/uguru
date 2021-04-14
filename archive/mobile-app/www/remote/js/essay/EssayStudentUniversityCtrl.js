angular.module('uguru.util.controllers')
.controller('EssayStudentUniversityController', [
  '$scope',
  '$timeout',
  '$state',
  '$interval',
  'University',
  '$ionicViewSwitcher',
  '$ionicScrollDelegate',
  'ScrollService',
  'LoadingService',
  'AnimationService',
  '$ionicSideMenuDelegate',
  function AccessController($scope, $timeout, $state, $interval, University, $ionicViewSwitcher, $ionicScrollDelegate,
    ScrollService, LoadingService, AnimationService, $ionicSideMenuDelegate) {
    var UPPER = 12;
    var LOWER = 0;
    var pageParentContainer;
    $ionicSideMenuDelegate.canDragContent(false);
    $timeout(function() {
      $scope.universities = University.getTargetted();
      $scope.university = $scope.universities[0];
    })

    if (!$scope.user.universities) {
      $scope.user.universities = [];
    }

    var showDelayedBecomeGuruHeader = function() {
      $timeout(function() {
        $scope.becomeGuruHeaderActive = true;
      }, 3000);
    }
    var shouldShowBecomeGuruHeader = true;

    //default
    $timeout(function() {
      $scope.university = {name:'Harvard'};

      $scope.root.vars.hs_mode= true;
      $scope.page = {modals: {backdrop: {active:false}}, toggles:{searchMode:{active:true}}};

      if ($state.current.name.indexOf('essay-student-home') > -1) {
        $scope.page.toggles.searchMode.active = false;
      } else {
        $scope.page.toggles.searchMode.active = true;
      }

    })




    $scope.goToUniversity = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.university');
    }

    $scope.addHighSchoolStudentUniversity = function($event, university, index) {
      if ($scope.lockClicking) {
        return;
      }
      university.active = true;
      $scope.lockClicking = true;
      $timeout(function() {
        $scope.lockClicking = false;
        var university = $scope.universities.splice(index, 1)[0];
        $scope.user.universities.push(university);
      }, 500);
    }

    $scope.goToEssaySignup = function() {
      if (!$scope.user.universities || !$scope.user.universities.length) {
        LoadingService.showMsg('Please add at least one college to continue.', 2500);
        return;
      } else {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('^.essay-student-login');
      }
    }

    $scope.removeHighSchoolStudentUniversity = function(university, index) {
      var university = $scope.user.universities.splice(index, 1)[0];
      university.active = false;
      $scope.universities.unshift(university);
      $timeout(function() {
        if ($scope.user.universities.length === 0) {
          $scope.page.toggles.searchMode.active = true;
        }
      }, 100)
    }

    $scope.goBackToStudentEssayHome = function() {
      if ($scope.desktopMode) {
        $ionicViewSwitcher.nextDirection('back');
        $state.go('^.essay-home');
      } else {
        AnimationService.flip('^.essay-home');
      }
    }


    $scope.showComingSoon = function() {
      LoadingService.showMsg('Coming soon!', 2000);
    }

    $scope.scrollToSection = function(section_selector) {
      var amount = null;
      var successFunction = null;
      var pageParentContainer = '#essay-student-home';
      var duration = 666;
      ScrollService.scrollTo(amount, successFunction, duration, pageParentContainer, section_selector);
    }

    $scope.scrollToPricing = function() {
      var nothing;
    }

    var selectRandom = function(university_arr) {
      return university_arr[Math.floor(Math.random()*university_arr.length)];
    }

    var filterTargetted = function(university_arr) {
      indices_to_slice = [];
      for (var i = 0; i < university_arr.length; i++) {
        university_arr[i].name = university_arr[i].name.replace('University', '').replace('university', '').replace('college', '').replace('College','').replace(' of', '').replace(' Of', '');
        var temp = university_arr[i].short_name && university_arr[i].short_name.replace('University', '').replace('university', '').replace('college', '').replace('College','').replace(' of', '').replace(' Of', '');
        if (temp && temp.length < university_arr[i].name.length) {
          university_arr[i].name = temp;
        }
        if ((university_arr[i].name.length <= UPPER && university_arr[i].name.length >= LOWER)) {
          continue;
        } else {
          indices_to_slice.push(i.toString());
        }
      }
      new_arr = [];
      for (var j =0; j < university_arr.length; j++) {
        if (indices_to_slice.indexOf(j.toString()) === -1) {
          new_arr.push(university_arr[j])
        }
      }

      return new_arr;
    }

    $timeout(function() {
      $scope.targettedUniversities = filterTargetted(University.getTargetted());
    });

    // loaded means first time only
    $scope.$on('$ionicView.loaded', function() {
         $timeout(function() {
          shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader()
         })
    });

  }



]);