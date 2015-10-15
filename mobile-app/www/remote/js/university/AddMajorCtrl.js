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

      $scope.user.majors.splice(index,1)
      $scope.majorsSource.unshift(major);
      
      

      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': majorName
        });
        refreshMajors();
        //$scope.loader.showSuccess(majorName + ' successfully removed', 1200);
      }


      $localstorage.setObject('user', $scope.user);


      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 200);

    }

    $scope.majorSelected = function(major) {

      var majorName = major.title || major.name || major.abbr || major.code;

      // for(var i=0; i < $scope.majorsSource.length; i++) {
      //   if($scope.majorsSource[i] === major) {
      //     console.log("transferring major from source to user!");
      //     $scope.majorsSource.splice(i, 1);
      //   }
      // }

      for(var i=0; i < $scope.majorsSource.length; i++) {
        if($scope.majorsSource[i].id === major.id) {
          console.log("transferring major from source to user");
          $scope.majorsSource.splice(i, 1);
        }
      }
  
      $scope.user.majors.push(major);

      refreshMajors();

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



      $scope.search_text.major = '';
      //$scope.loader.showAmbig("Fetching majors...", 60000);
      University.getMajors($scope.user.university_id).then(function(majors) {

        //$scope.loader.hide();
        University.majors = majors;
        $scope.majorsSource = majors.plain().slice();

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

    if(!$scope.majorsSource) {
      getMajorsBecomeGuru();  
    }
    

    $rootScope.$on('schoolChange', function(event) {
      console.log("majors: heard schoolChange event!");
      $scope.user.majors.splice(0, $scope.user.majors.length);
      getMajorsBecomeGuru();
      refreshMajors();
    });


    function refreshMajors() {
      // $timeout(function() {
      //   $scope.search_text.major = '   ';
      // },0);
      // $timeout(function() {
      //   $scope.search_text.major = '';
      // },0);

      $timeout(function() {
        $scope.search_text.major += ' ';
        $scope.search_text.major = '';
        try {
          $scope.majors = Utilities.nickMatcher('', $scope.majorsSource, 'name', 'major');  
        } catch(err) {
          console.log("fastmatcher slice error (threw from inside MajorCtrl, probably due to trying to load too fast): " + err)
        }
        
      }, 0)


      $timeout(function() {
        $scope.search_text.major += ' ';
        $scope.search_text.major = '';
      }, 250);
      
    }


  }


])





