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
  function AccessController($scope, $timeout, $state, $interval, University, $ionicViewSwitcher, $ionicScrollDelegate, ScrollService) {
    var UPPER = 12;
    var LOWER = 0;
    var pageParentContainer;

    var showDelayedBecomeGuruHeader = function() {
      $timeout(function() {
        $scope.becomeGuruHeaderActive = true;
      }, 3000);
    }
    var shouldShowBecomeGuruHeader = true;

    //default
    $scope.university = {name:'Harvard'};
    $scope.root.vars.theme = 'essay';

    $interval(function() {
      $scope.university = selectRandom(targettedUniversities);
    }, 3500)

    $scope.goToUniversity = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('^.university');
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
          console.log(university_arr[i].name)
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