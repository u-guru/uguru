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
  '$ionicSideMenuDelegate',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, University, $ionicSideMenuDelegate) {

    $scope.showMainBody = true;

    $scope.search_text = '';

    $scope.backToStudentEditProfile = function(is_saved) {


      if (is_saved) {
        $scope.success.show(0, 1500);
      } else {
        $scope.loader.show();
      }

      if ($scope.root.vars.guru_mode) {

        $state.go('^.guru-profile');

      } else {

        $timeout(function() {
          $ionicSideMenuDelegate.toggleRight();
        }, 500);

      }


      $timeout(function() {
        $scope.loader.hide();

      }, 500);
    }


    $scope.keyboard_force_off = false;

    $scope.setMajorFocus = function(target) {
      if ($scope.major_input.search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementById("major-input").focus();

      }
    };

    $scope.clearSearchInput = function() {
      $scope.major_search_text = '';
    }

    $scope.getMajorsFromServer = function(promise) {
        var university_title = $scope.user.university.title;
        var msg_details = "Retrieving all " + university_title + ' majors'

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

      var majorsLoaded = $q.defer();

      if ($localstorage.getObject('majors').length > 0) {

          return $localstorage.getObject('majors');

      };

      if ($localstorage.getObject('majors').length === 0 && $scope.user.university_id) {

            $scope.getMajorsFromServer(majorsLoaded);
      }


        if ($localstorage.getObject('majors').length > 0) {


          return $localstorage.getObject('majors');


        } else {

          $scope.getMajorsFromServer(majorsLoaded);
        }


        return majorsLoaded.promise;


    };

    $scope.majors = $scope.static.majors || GetMajorsList();

    // console.log($scope.static.majors);

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

    $scope.removeMajor = function(major, index) {

      if ($state.current.name === 'root.become-guru' && !confirm('Remove ' + major.name + '?')) {
        return;
      }

      var confirmCallback = function() {
        $scope.loader.hide();
        $scope.success.show(0, 1000, major.name + ' successfully removed');
      }

      $scope.loader.show();

      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 1000);

    }

    $scope.updateMajorProgress = function(text) {
      $scope.major_progress = text.length > 0;
      if ($scope.major_progress) {
        console.log('text is typed in', $scope.static.majors.length);
      } else {
        console.log('text is not typed in', $scope.static.majors.length);
      }
    }

    $scope.major_progress = false;


    $scope.majorSelected = function(major, $event, $index) {

      console.log('major selected');

      $scope.static.popular_majors.splice($index, 1);





      if (!$scope.user.majors) {
          $scope.user.majors = [];
      }


      if ($scope.majorInput) {
        $scope.majorInput.value = '';
      }
      $scope.showMainBody = true;

      $scope.search_text = '';
      $scope.keyboard_force_off = true;

      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

      $scope.user.majors.push(major)

    }


    $scope.$on('$ionicView.enter', function() {


      $timeout(function() {

        //add event listener
        $scope.majorInput = document.getElementById('major-input');

        $scope.majorInput.addEventListener("keyup", function() {

          console.log($scope.majorInput.value.length);

          // console.log('keyup callback', $scope.majorInput.value, $scope.showMainBody);


        }, 500);


      }, 1000);

    });


  }


])

