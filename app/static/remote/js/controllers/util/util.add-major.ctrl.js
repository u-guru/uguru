angular.module('uguru.util.controllers')

.controller('AddMajorController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$q',
  '$cordovaKeyboard',
  'University',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, University) {

    $scope.major_search_text = '';
    $scope.keyboard_force_off = false;

    $scope.setMajorFocus = function(target) {
      if ($scope.major_search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementsByName("major-input")[0].focus();
      }
    };

    $scope.clearSearchInput = function() {
      $scope.major_search_text = '';
    }

    $scope.getMajorsFromServer = function(promise) {
        var university_title = $scope.user.university.title;
        var msg_details = "Retrieving all " + university_title + ' majors'

        // if (!$scope.progress_active) {
        //   $scope.progress_active = true;
        //   $cordovaProgress.showSimpleWithLabelDetail(true, "Loading", msg_details);
        // } else {
        //   console.log('progress spinner is already active!');
        // }

        $scope.loader.show()

        University.getMajors($scope.user.university_id).then(
                function(majors) {
                  // $cordovaProgress.hide();
                  $scope.loader.hide()
                  $scope.progress = false;
                    console.log(majors.length + ' majors uploaded from ' + $scope.user.university.title);

                  $timeout(function() {
                      var majorSuccessMsg = majors.length + ' majors Found!';
                      // $scope.showSuccess(majorSuccessMsg);
                  }, 500)

                    if (promise) {
                    promise.resolve(majors);
                }

                $timeout(function() {
                    $scope.setMajorFocus();
                  }, 1000);
                // $timeout(function() {
                //     $cordovaProgress.hide();
                //     $scope.showSuccess('Success!');
                // }, 500)

              $scope.majors = majors;
              $localstorage.setObject('majors', $scope.majors);

                },
                function(error) {
                    console.log('majors NOT successfully loaded');
                    console.log(error);
                }
        );

    }

    var GetMajorsList = function() {

      if ($localstorage.getObject('majors').length > 0) {

          $scope.$on('modal.shown', function() {

          if ($scope.addMajorModal.isShown() &&
            !$scope.addUniversityModal.isShown() &&
              $localstorage.getObject('majors').length > 0) {
              $scope.keyboard_force_off = false;

              $timeout(function() {
                $scope.setMajorFocus();
              }, 500);

            }
          });

          return $localstorage.getObject('majors');

      }

      var majorsLoaded = $q.defer();

      $scope.$on('modal.hidden', function() {

          if (!$scope.addUniversityModal.isShown() &&
            $scope.addMajorModal.isShown() &&
            $scope.user.university_id) {

              //if there are no majors after university modal is shown;
              if ($localstorage.getObject('majors').length === 0) {
                $scope.getMajorsFromServer(majorsLoaded);
              //if there are majors after the modal is shown
              } else {
                //show the keyboard
                $timeout(function() {
                  $scope.setMajorFocus();
                }, 500);
              }
          }

      });

      $scope.$on('modal.shown', function() {

        if ($scope.addMajorModal.isShown() &&
          !$scope.addUniversityModal.isShown() &&
          $localstorage.getObject('majors').length > 0) {
          $scope.keyboard_force_off = false;

          $timeout(function() {
            $scope.setMajorFocus();
          }, 500);

        } else

        if ($scope.addMajorModal.isShown() &&
          $localstorage.getObject('majors').length === 0) {

          $scope.getMajorsFromServer(majorsLoaded);
        }

      });

      return majorsLoaded.promise;
    }

    $scope.majors = GetMajorsList();

    $scope.hidemajorModal = function() {
      if ($scope.platform.mobile && $cordovaKeyboard.isVisible()) {

        $scope.keyboard_force_off = true;
        $scope.major_search_text = '';
        $scope.closeKeyboard();
        $timeout(function() {
          $scope.addMajorModal.hide();
        }, 300)
      } else {
        $scope.addMajorModal.hide();
      }
    }


    $scope.majorSelected = function(major) {


      if (!$scope.user.majors) {
          $scope.user.majors = [];
          // $timeout(function() {
          // popoverOptions = {
          //   targetElement:'.student-major',
          //   title: 'Tap to request help',
          //   delay: 500,
          //   animation:null,
          //   placement: 'bottom',
          //   body: "We'll find a Guru to help you out <br> in a matter of minutes.<br>",
          //   buttonText: 'Got it',
          //   dropshadow: true
          // }

          // Popover.tutorial.show($scope, popoverOptions);

          // }, 1500)
      }
        $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

        $scope.keyboard_force_off = true;
        $scope.user.majors.push(major);

        $scope.major_search_text = '';
        $scope.closeKeyboard();
        // $scope.showSuccess('Major Saved!');
        $timeout(function() {
          $scope.addMajorModal.hide();
        }, 1000);
    }

  }


])