angular.module('uguru.util.controllers', ['sharedServices'])

.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'University',
  '$ionicViewSwitcher',
  '$cordovaGeolocation',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, $localstorage,
 	University,
  $ionicViewSwitcher, $cordovaGeolocation) {

    //scope variables
    $scope.search_text = '';

    //back button
    $scope.goToAccess = function() {
      console.log("pressed goToAccess()");
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.access');
    }

    var filterByTopRankedUniversities = function(universities_arr) {
      results = [];
      for (var i = 0; i < universities_arr.length; i ++) {
        university = universities_arr[i];
        if (university.rank <= 20) {
          results.push(university)
        }
      }
      return results;
    }
    $scope.location = true;

    $scope.searched = function() {
      return ($scope.search_text.length > 0);
    }
    

    $scope.universitySelected = function(university, $event) {

      //if user is switching universities
      if ($scope.user.university_id
          && university.id !== $scope.user.university_id
          && !confirm('Are you sure? Your current courses will be deactivated'))
      {
          return;
      }

      $scope.loader.show();
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.search_text = '';

      //update user to locat storage
      $scope.rootUser.updateLocal($scope.user);

      var payload = {
        'university_id': $scope.user.university_id
      };

      //save university
      var postUniversitySelectedCallback = function() {
          $timeout(function() {
            $scope.loader.hide();
            $ionicViewSwitcher.nextDirection('forward');
              $state.go('^.home')
          }, 1000);
      }

      $scope.user.updateAttr('university_id', $scope.user, payload, postUniversitySelectedCallback, $scope);

    };

    $scope.getGPSCoords = function() {

        var posOptions = {
          timeout: 10000,
          enableHighAccuracy: false, //may cause high errors if true
        }

        $scope.search_text ='';
        $scope.loader.show();
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {

            console.log('location found!', position.coords.latitude, position.coords.longitude);

            if ($state.current.name === 'root.university') {
              //show the loader
              $scope.loader.show();

              var successCallback = function() {
                $scope.loader.hide();
              }
                //grabs the nearest universities
                $scope.nearestUniversities = getNearestUniversity(
                                        position.coords.latitude,
                                        position.coords.longitude,
                                        $scope.universities,
                                        null,
                                        successCallback);
                $scope.universities = $scope.nearestUniversities;
                $localstorage.setObject('nearest-universities', $scope.universities);

          }

      }, function(error) {
          //show & let them know we couldn't find it
          //in case android/ios/windows user turned it off
          $scope.initialUniversities = $scope.universities;
          $scope.loader.hide()
          $scope.user.recent_position = null;
          alert('Sorry! Please check your privacy settings check your GPS signal.');
      });

    };

    $scope.universities = University.getTargetted();

    if ($scope.platform.android) {
      $scope.getGPSCoords();
    } else {
      $scope.initialUniversities = filterByTopRankedUniversities($scope.universities);
    }


}
