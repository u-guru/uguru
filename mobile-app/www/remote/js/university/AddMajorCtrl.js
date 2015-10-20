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


    $scope.refresh = {
      majors: ''
    };

    function updateDOM() {
      $timeout(function() {
        $scope.refresh.majors = 'update';
      }, 0);
      $timeout(function() {
        $scope.refresh.majors = '';
      }, 0);
    }

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

      $scope.user.majors.splice(index,1)
      $scope.majorsSource.unshift(major);



      var confirmCallback = function() {

        uTracker.track(tracker, 'Major Removed', {
          '$Major': majorName
        });

        updateDOM();

        //$scope.loader.showSuccess(majorName + ' successfully removed', 1200);
      }


      $localstorage.setObject('user', $scope.user);


      $timeout(function() {
        $scope.user.updateAttr('remove_major', $scope.user, major, confirmCallback, $scope);
      }, 200);

    }

    $scope.fastSelectMajor = function() {

      var majorsList = document.querySelectorAll('#major-list');
      var items = majorsList[0].querySelectorAll('ul li a');

      console.log("items.length: " + items.length);

      if (items.length === 1) {
        console.log("fast selecting the one present major");
        $timeout(function() {
          angular.element(items[0]).triggerHandler('click');
        }, 0);

      } else {
        console.log("ignoring since more than one majors in the source list");
      }
    }


    $scope.majorSelected = function(major) {

      var majorName = major.title || major.name || major.abbr || major.code;

      for(var i=0; i < $scope.majorsSource.length; i++) {
        if($scope.majorsSource[i].id === major.id) {
          console.log("transferring major from source to user");
          $scope.majorsSource.splice(i, 1);
        }
      }

      $scope.user.majors.push(major);

      $scope.search_text.major = '';

      updateDOM();


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

      if (University.majors.length > 0) {

        $scope.majorsSource = University.majors.slice();

        $timeout(function() {
          for(var j = 0; j < $scope.user.majors.length; j++) {
            for(var k = 0; k < $scope.majorsSource.length; k++) {
              if($scope.majorsSource[k].id === $scope.user.majors[j].id) {
                console.log("Deleting duplicate major found.");
                  $scope.majorsSource.splice(k, 1);
              }
            }
          }
          updateDOM();

        }, 400);

        return;
      }
      //$scope.loader.showAmbig("Fetching majors...", 60000);
      University.getMajors($scope.user.university_id).then(function(majors) {

        //$scope.loader.hide();
        University.majors = majors.plain();
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
          updateDOM();

        }, 400);

        $localstorage.setObject('universityMajors', majors.plain());

      },function(err) {
        console.log("MAJORS NOT FOUND",err);
      });
    }

    if(!$scope.majorsSource) {
      getMajorsBecomeGuru();
    }


    $rootScope.$on('schoolChange', function(event) {
      console.log("majors: heard schoolChange event!");
      $scope.user.majors.splice(0, $scope.user.majors.length);
      getMajorsBecomeGuru();

    });




  }


])





