angular.module('uguru.util.controllers', ['sharedServices'])

.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  'University',
  '$ionicViewSwitcher',
  'Geolocation',
  'Settings',
  'Utilities',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, $localstorage,
 	University, $ionicViewSwitcher, Geolocation, Settings, Utilities) {

    $scope.search_text = '';
    $scope.location = false;
    $scope.universities = University.getTargetted();

    //back button
    $scope.goToAccess = function() {
      console.log("pressed goToAccess()");
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.access');
    }

    var sortByRank = function(list) {
      function compareRank(a, b) {
        if (a.rank < b.rank)
          return -1;
        if (a.rank > b.rank)
          return 1;
        return 0;
      }
      return list.sort(compareRank);
    }

    $scope.query = function(input) {
      $scope.universities = Utilities.nickMatcher(input, University.getTargetted());
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
      //STILL NEED TO DO FOR IOS
      // if(DeviceService.getDevice()==="ios") {
      //   Geolocation.enableGPS();
      //   return;
      // }
        var posOptions = {
          timeout: 10000,
          enableHighAccuracy: false, //may cause high errors if true
        }

        $scope.search_text ='';

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, posOptions);
        $scope.loader.show();

        function geoSuccess(position) {
          $scope.loader.hide();
          console.log('location found!', position.coords.latitude, position.coords.longitude);

          $scope.nearestUniversities = Geolocation.sortByLocation(
                                  position.coords.latitude,
                                  position.coords.longitude,
                                  $scope.universities);
          $scope.universities = $scope.nearestUniversities;
          $scope.location = true;
          $localstorage.setObject('nearest-universities', $scope.universities);
        } 
        function geoError(error) {
            $scope.location = true;
            $scope.loader.hide()
            alert('Sorry! Please check your privacy settings check your GPS signal.');
        }
    };


    if ($scope.platform.android) {
      $scope.getGPSCoords();
    } else {
      $scope.universities = sortByRank($scope.universities);
    }



}
