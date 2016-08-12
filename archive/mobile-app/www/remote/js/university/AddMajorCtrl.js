angular.module('uguru.util.controllers')

.controller('AddMajorController', [

  //All imported packages go here
  '$rootScope',
  '$scope',
  '$state',
  '$timeout',
  '$q',
  'Major',
  '$ionicSideMenuDelegate',
  'Utilities',
  '$localstorage',
  'uTracker',
  'University',
  'LoadingService',
  function($rootScope, $scope, $state, $timeout,
  $q, Major, $ionicSideMenuDelegate, Utilities,
  $localstorage, uTracker, University, LoadingService) {

    $scope.source = University.source;

    $scope.refresh = {
      majors: '',
      majorsLength: $scope.source.majors.length
    };


    if (!$scope.user.majors) {
      $scope.user.majors = [];
    }

    $scope.keyboard_force_off = false;

    $scope.search_text = {
      major: ''
    };

    // function setMajorFocus(target) {
    //   if ($scope.search_text.major.length === 0 && !$scope.keyboard_force_off) {
    //     document.getElementById("major-input").focus();
    //   }
    // };


    $scope.removeMajor = function(major, index) {

      var majorName = major.title || major.name || major.abbr || major.code;

      if (!confirm('Remove ' + majorName + '?')) {
        return;
      }

      $scope.user.majors.splice(index,1);
      $scope.source.majors.unshift(major);


      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': majorName
        });

        updateDOM();

        //LoadingService.showSuccess(majorName + ' successfully removed', 1200);
      };

      $localstorage.setObject('user', $scope.user);


      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 200);

    };

    $scope.fastSelectMajor = function() {

      var majorsList = document.querySelectorAll('#major-list');
      var items = majorsList[0].querySelectorAll('ul li a');

      if (items.length === 1) {
        $timeout(function() {
          angular.element(items[0]).triggerHandler('click');
        }, 0);

      }
    };


    $scope.majorSelected = function(major) {

      var majorName = major.title || major.name || major.abbr || major.code;

      for(var i=0; i < $scope.source.majors.length; i++) {
        if($scope.source.majors[i].id === major.id) {
          $scope.source.majors.splice(i, 1);
        }
      }

      $scope.user.majors.push(major);

      $scope.search_text.major = '';

      updateDOM();

      uTracker.track(tracker, 'Major Added', {
        '$Major': majorName
      });
      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

    };


    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.majors && $scope.limit < $scope.source.majors.length) {
        $scope.limit += 10;
      }
    };

    $scope.clearSearchInput = function() {
      $scope.search_text.major = '';
    };



  }


]);





