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
  'Major',
  '$ionicSideMenuDelegate',
  'Utilities',
  function($scope, $state, $timeout, $localstorage,
  $ionicModal, $ionicTabsDelegate, $q,
  $cordovaKeyboard, Major, $ionicSideMenuDelegate,
  Utilities) {

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


    // $scope.majors = $scope.static.majors || GetMajorsList();

    $scope.removeCheckedMajor = function(major, index, event)  {
      if (confirm('Remove ' + major.name + '?')) {
          $scope.removeMajor(major, index);
      }
    }

    $scope.removeMajor = function(major, index) {

      if ($state.current.name === 'root.become-guru' && !confirm('Remove ' + major.name + '?')) {
        return;
      }


      var removedMajor = $scope.user.majors.splice(index,index+1);
      $scope.majors.push(removedMajor);

      var confirmCallback = function() {
        $scope.loader.hide();
        $scope.success.show(0, 1000, major.name + ' successfully removed');
      }

      $scope.loader.show();

      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 1000);

    }




    $scope.majorSelected = function(major, $event, $index) {


      $scope.loader.show();

      //t == 0
      $timeout(function() {
        $scope.majors.splice($index, 1);
        $scope.preIndexedMajors.splice($index, 1);
      }, 250)


      //update the server
      $scope.search_text = '';
      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

      // t == 1
      $timeout(function() {
        $scope.loader.hide();
      }, 500)

      // t == 2 --> update local regardless of server
      if (!$scope.user.majors) {
          $scope.user.majors = [];
      }
      $timeout(function() {
        $scope.user.majors.push(major);
      }, 500)

    }

    $scope.query = function(input) {
      $scope.majors = Utilities.nickMatcher(input, Major.getGeneral());
    }

    $scope.removeUserMajorsFromMaster = function() {
      if ($scope.static.majors && $scope.user.majors) {
        for (var i = 0; i < $scope.static.majors; i ++) {
          var indexMajor = $scope.static.majors[i];
          for (var j = 0; j < $scope.user.majors; j++) {
            var userMajor = 0;
            if (indexMajor.id === userMajor.id)
              $scope.static.majors.slice(i, i+1);
            }
          }
        }
      }

    $scope.$on('$ionicView.enter', function() {
      $scope.removeUserMajorsFromMaster();

      $timeout(function() {

        //add event listener
        $scope.majorInput = document.getElementById('major-input');

        $scope.majorInput.addEventListener("keyup", function() {


        }, 500);


      }, 1000);

    });

    $scope.majors = Major.getGeneral();

  }


])

