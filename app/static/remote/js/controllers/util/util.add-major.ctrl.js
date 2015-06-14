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
    $scope.root.vars.hide_list = true;
    $scope.major_search_text = '';
    $scope.keyboard_force_off = false;

    $scope.setMajorFocus = function(target) {
      if ($scope.major_search_text.length === 0 && !$scope.keyboard_force_off) {
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

    $scope.removeMajor = function(major, index) {

      var confirmCallback = function() {
        $scope.success.show(0, 2000, major.name + ' successfully removed');
      }

      $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
    }

    $scope.updateView = function(text) {
      console.log(text);
      if (text.length > 0) {
        $scope.root.vars.hide_list = false;
      }
      $scope.major_search_text = text;
    }




    $scope.majorSelected = function(major, $event) {


      if (!$scope.user.majors) {
          $scope.user.majors = [];

      }


        $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

        $scope.keyboard_force_off = true;
        // $scope.user.majors.push(major)
        $scope.major_search_text = '';

        var majorInput = document.getElementById("major-input");
        majorInput.value = '';
        $scope.matchingMajors = [];
        $scope.root.vars.hide_list = true;
    }

  }


])