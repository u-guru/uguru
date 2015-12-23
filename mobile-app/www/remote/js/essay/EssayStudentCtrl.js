angular.module('uguru.util.controllers')
.controller('EssayStudentController', [
  '$scope',
  '$timeout',
  '$state',
  '$interval',
  'University',
  '$ionicViewSwitcher',
  '$ionicScrollDelegate',
  'ScrollService',
  'ContentService',
  function AccessController($scope, $timeout, $state, $interval, University, $ionicViewSwitcher, $ionicScrollDelegate, ScrollService, ContentService) {
    var UPPER = 12;
    var LOWER = 0;
    var pageParentContainer;
    var scrollDuration= 500;

    var showDelayedBecomeGuruHeader = function() {
      $timeout(function() {
        $scope.becomeGuruHeaderActive = true;
      }, 3000);
    }
    var shouldShowBecomeGuruHeader = true;

    $scope.faqs = ContentService.faq;
    $scope.how_it_works = ContentService.how_it_works;

    //default
    $scope.university = {name:'Harvard'};
    $scope.root.vars.theme = 'essay';
    $scope.page = {modals: {backdrop: {active:false}}};

    $interval(function() {
      $scope.university = selectRandom(targettedUniversities);
    }, 3500)

    $scope.goToUniversity = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.essay-student-university');
    }

    $scope.scrollToSection = function(section_selector) {
      var amount = null;
      var successFunction = null;
      var pageParentContainer = '#essay-student-home';
      ScrollService.scrollTo(amount, successFunction, scrollDuration, pageParentContainer, section_selector);
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

    $scope.targettedUniversities = filterTargetted(University.getTargetted());

    // loaded means first time only
    $scope.$on('$ionicView.loaded', function() {
         shouldShowBecomeGuruHeader && showDelayedBecomeGuruHeader()
    });

  }



]);