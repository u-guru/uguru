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
  'University',
  function($scope, $state, $timeout,
  $q, Major, $ionicSideMenuDelegate, Utilities,
  $localstorage, uTracker, University) {

    if (!$scope.user.majors) {
      $scope.user.majors = [];
    }

    $scope.keyboard_force_off = false;

    $scope.search_text = {
      major: ''
    };


    function setMajorFocus(target) {
      if ($scope.search_text.major.length === 0 && !$scope.keyboard_force_off) {
        document.getElementById("major-input").focus();
      }
    };


    $scope.removeMajor = function(major, index) {
      if (!confirm('Remove ' + major.name + '?')) {
        return;
      }

      var majorName = major.title || major.name || major.abbr || major.code;

      var removedMajor = $scope.user.majors.splice(index,1);
      
      $scope.majors.unshift(removedMajor);

      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': majorName
        });
        $scope.loader.showSuccess(majorName + ' successfully removed', 2000);
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
        $scope.majors.splice(index, 1);
      }, 250)

      $timeout(function() {
        $scope.user.majors.push(major);
      }, 250)


      // t == 1
      $timeout(function() {
        $scope.loader.hide();
        $scope.search_text.major = '';
      }, 1250);

      //update the server

      uTracker.track(tracker, 'Major Added', {
        '$Major': major.name
      });

      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

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

    $scope.removeEmptyMajors = function() {
      var majorIndicesToSlice = [];
      if ($scope.majors && $scope.majors.length) {
        for (var i = 0; i < $scope.majors.length; i ++) {
            var indexMajor = $scope.majors[i];
            if ((!indexMajor.name) && (!indexMajor.title) && (!indexMajor.abbr)) {
              console.log('adding', i, indexMajor);
              majorIndicesToSlice.push(i);
            }
          }
        }
        console.log('emptyMajors', majorIndicesToSlice.length, $scope.majors.length)
        // tricky plz ask;
        var offset = 0;
        for (var j = 0; j < majorIndicesToSlice.length; j++) {
          indexToRemove = majorIndicesToSlice[j]
          // console.log(indexToRemove, $scope.majors[indexToRemove])
          $scope.majors.splice(indexToRemove - offset, 1);
          offset++;
        }
        console.log('new length', $scope.majors.length)

      }




    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.majors && $scope.limit < $scope.majors.length) {
        $scope.limit += 10;
      }
    }

    // $scope.removeUserMajorsFromMaster();

    $scope.clearSearchInput = function() {
      $scope.search_text = '';
    }

    var getMajorsBecomeGuru = function() {
      console.log('grabbing majors')
      University.getMajors($scope.user.university_id).then(function(majors) {

        University.majors = majors;
        $scope.majorsSource = majors.plain().slice();
        $scope.majors = majors.plain().slice();
        // for (var major in $scope.majorsSource) {
        //   major['universalName'] = major.title || major.name || major.abbr || major.code;
        // }
        // for (var major in $scope.majors) {

        //   major['universalName'] = major.title || major.name || major.abbr || major.code;
        //   console.log("major.universalName: " + major.universalName + " major.title: "  + major.title + " major.name: " + major.name + " major.abbr: " + major.abbr + " major.code: " + major.code);
        // }
        $localstorage.setObject('universityMajors', majors.plain())


      },function(err) {

        alert('Something went wrong... Please contact support!');

      });
    }
    getMajorsBecomeGuru();

  }


])





