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
  function($rootScope, $scope, $state, $timeout,
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

      var majorName = major.title || major.name || major.abbr || major.code;

      if (!confirm('Remove ' + majorName + '?')) {
        return;
      }

      var removedMajor = $scope.user.majors.splice(index,1).slice();
      
      $scope.majorsSource.unshift(major);
      
      $timeout(function() {
        $scope.search_text.major = "   ";
      },0);
      
      $timeout(function() {
        $scope.search_text.major = "";
      }, 10);

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

    $scope.majorSelected = function(major, index) {

      var majorName = major.title || major.name || major.abbr || major.code;

      $scope.loader.show();

      for(var i=0; i < $scope.majorsSource.length; i++) {
        if($scope.majorsSource[i] === major) {
          console.log("found a match to remove!");
          $scope.majorsSource.splice(i, 1);
        }
      }
  
      $scope.user.majors.push(major);

      refreshMajors();

      $timeout(function() {
        $scope.loader.hide();
      }, 1000);

      //update the server

      uTracker.track(tracker, 'Major Added', {
        '$Major': majorName
      });

      $scope.user.updateAttr('add_user_major', $scope.user, major, null, $scope);

    }


    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.majors && $scope.limit < $scope.majorsSource.length) {
        $scope.limit += 10;
      }
    }

    $scope.clearSearchInput = function() {
      $scope.search_text.major = '';
    }


    var getMajorsBecomeGuru = function() {
      console.log('grabbing majors')
      University.getMajors($scope.user.university_id).then(function(majors) {

        $scope.loader.hide();
        University.majors = majors;
        $scope.majorsSource = majors.plain().slice();


        // Ensures no duplicate majors if the user goes back to home and then back to major list.
        // Not yet optimized for performance, but it works.
        $timeout(function() {
          for(var j = 0; j < $scope.user.majors.length; j++) {
            for(var k = 0; k < $scope.majorsSource.length; k++) {
              if($scope.majorsSource[k].id === $scope.user.majors[j].id) {
                console.log("Deleting duplicate major found.");
                  $scope.majorsSource.splice(k, 1);
              }
            }
          }
          refreshMajors();

        }, 400);
        

        
        $localstorage.setObject('universityMajors', majors.plain())
        refreshMajors();

      },function(err) {
        alert('Something went wrong... Please contact support!');
      });
    }

    $scope.university = $scope.user.university_id;
    getMajorsBecomeGuru();


    $rootScope.$on('schoolChange', function(event) {
      console.log("heard schoolChange event!");
      getMajorsBecomeGuru();
      refreshMajors();
    });


    function refreshMajors() {
      $timeout(function() {
        $scope.search_text.major = '   ';
      },0);
      
      $timeout(function() {
        $scope.search_text.major = '';
      }, 10);
    }


  }


])





