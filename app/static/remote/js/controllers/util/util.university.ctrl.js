angular.module('uguru.util.controllers', [])

.controller('AddUniversityController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$cordovaProgress',
  '$q',
  'University',
  '$cordovaKeyboard',
  '$ionicLoading',
  function($scope, $state, $timeout, $localstorage,
 	$ionicModal, $cordovaProgress, $q, University,
  $cordovaKeyboard, $ionicLoading) {

    $scope.search_text = '';
    $scope.keyboard_force_off = false;

    $scope.setFocus = function(target) {
      if ($scope.search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("university-input")[0].focus();
      }
    };

    var GetUniversityList = function() {

      var universitiesLoaded = $q.defer();

      $scope.$on('modal.shown', function() {

        if ($scope.addUniversityModal.isShown() &&
          $localstorage.getObject('universities').length === 0) {
            $scope.getUniversitiesFromServer(universitiesLoaded);
          }

        if ($scope.addUniversityModal.isShown() &&

            $localstorage.getObject('universities').length > 0) {
            $scope.keyboard_force_off = false;
            $timeout(function() {
                $scope.setFocus();
            }, 500);
        }

      });

      if ($localstorage.getObject('universities').length > 0) {

          return $localstorage.getObject('universities');

      } else {

        return universitiesLoaded.promise;

      }


    }

    $scope.universities = GetUniversityList();

    $scope.getUniversitiesFromServer = function(promise) {
        if (!$scope.progress_active) {
          $scope.loader.show();
        }
        University.get().then(
          function(universities) {
              $scope.loader.hide();
              $scope.keyboard_force_off = false;

              $timeout(function() {
                $scope.showSuccess('Success!');
              }, 500);

              $timeout(function() {
                $scope.setFocus();
              }, 1000);

              universities = JSON.parse(universities);
              if (promise) {
                promise.resolve(universities);
              }
              $scope.universities = universities;

              $localstorage.setObject('universities', $scope.universities);
              console.log($scope.universities.length + ' universities successfully loaded');
          },
          function() {
              console.log('Universities NOT successfully loaded');
          }
      );
    }

    $scope.clearSearchInput = function() {
        $scope.search_text = '';
    };

    $scope.universitySelected = function(university) {

      var successCallback = function() {
        console.log('cleared previous universities courses from the cache')
          //TODO COME BACK TO THIS
          $scope.user.guru_courses = [];
          $scope.user.student_courses = [];
          $localstorage.removeObject('courses');

      }

      //if they have already selected one
      if ($scope.user.university_id && university.id !== $scope.user.university_id) {
        var dialog = {
          msg: 'Are you sure you want to change universities? This will deactive your current courses.',
          title: 'Warning',
          button_arr: ['No Thanks', "I'm sure"],
          arr_callback: [null, successCallback]
        }
        $scope.root.dialog.confirm(dialog.msg, dialog.title, dialog.button_arr, dialog.arr_callback);
      }

      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.user.university.latitude = university.location.latitude;
      $scope.user.university.longitude = university.location.longitude;
      $scope.search_text = '';
      $scope.keyboard_force_off = true;
      $scope.rootUser.updateLocal($scope.user);
      $scope.user.updateAttr('university_id', $scope.user, $scope.user.university_id);
      $scope.closeKeyboard();
      $scope.showSuccess('University Saved!');
      $timeout(function() {
        $scope.addUniversityModal.hide();
      }, 1000);

    }

    $scope.hideUniversityModal = function() {
      if ($cordovaKeyboard.isVisible()) {
        $scope.keyboard_force_off = true;
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addUniversityModal.hide();
        }, 300)
      } else {
        $scope.addUniversityModal.hide();
      }
    }
    //case 1: if universities do not exist in local storage ... go get them
    //case 2: if user has ios && user has not been prompted... , prompt the display to get access
    //case 3: if coordinates are available && nearest_universities are not displayed..., calculate the nearest gps

  }


])