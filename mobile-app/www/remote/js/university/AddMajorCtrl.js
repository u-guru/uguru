angular.module('uguru.util.controllers')

.controller('AddMajorController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$q',
  'Major',
  '$ionicSideMenuDelegate',
  'Utilities',
  '$localstorage',
  'uTracker',
  function($scope, $state, $timeout,
  $q, Major, $ionicSideMenuDelegate, Utilities,
  $localstorage, uTracker) {



    if (!$scope.user.majors) {
      $scope.user.majors = [];
    }

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

    function setMajorFocus(target) {
      if ($scope.search_text.length === 0 && !$scope.keyboard_force_off) {
        document.getElementById("major-input").focus();
      }
    };

    // $scope.majors = $scope.static.majors || GetMajorsList();

    $scope.removeMajor = function(major, index) {

      if (!confirm('Remove ' + major.name + '?')) {
        return;
      }

      var removedMajor = $scope.user.majors.splice(index,1);
      $scope.majors.push(removedMajor);

      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': major.name
        });
        $scope.success.show(0, 2000, major.name + ' successfully removed');
      }


      $localstorage.setObject('user', $scope.user);


      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 200);

    }

    // t == 2 --> update local regardless of server


    $scope.majorSelected = function(major, index) {



      $timeout(function() {
        $scope.loader.show();
      }, 250)

      //t == 0
      $timeout(function() {
        $scope.majors.splice(index, index + 1);
      }, 250)



      // t == 1
      $timeout(function() {
        $scope.loader.hide();
        $scope.search_text = '';
      }, 1250);

      if ($scope.majorInput && $scope.majorInput.value) {
        $scope.majorInput.value = '';
      }

      $timeout(function() {
        $scope.user.majors.push(major);
        $localstorage.setObject('user', $scope.user);
      }, 750)

      //update the server

      uTracker.track(tracker, 'Major Added', {
        '$Major': major.name
      });

      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

    }

    $scope.query = function(input) {
      $scope.majors = Utilities.nickMatcher(input, Major.getGeneral());
    }

    $scope.removeUserMajorsFromMaster = function() {
      var majorIndicesToSlice = [];
      if ($scope.majors && $scope.user.majors) {
        for (var i = 0; i < $scope.majors.length; i ++) {
          var indexMajor = $scope.majors[i];
          for (var j = 0; j < $scope.user.majors.length; j++) {
            userMajor  = $scope.user.majors[j];
            if (indexMajor.id === userMajor.id)
              majorIndicesToSlice.push(i);
          }
        }
        // tricky plz ask;
        var offset = 0;
        for (var i = 0; i < majorIndicesToSlice.length; i++) {
          $scope.majors.splice(i - offset, i - offset + 1);
          offset++;
        }

      }
    }




    $scope.$on('$ionicView.enter', function() {


      $timeout(function() {

        $scope.majorInput = document.getElementById('major-input');
        //add event listener

        majorInput.addEventListener("keyup", function() {

        }, 500);


      }, 1000);

    });

    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.majors && $scope.limit < $scope.majors.length) {
        $scope.limit += 10;
      }
    }


    $scope.majors = $scope.data.majors || Major.getGeneral();
    $scope.removeUserMajorsFromMaster();

  }


])

