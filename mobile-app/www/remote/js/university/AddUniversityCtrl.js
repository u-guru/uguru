angular.module('uguru.util.controllers', ['sharedServices'])

.controller('AddUniversityCtrl', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'University',
  '$ionicViewSwitcher',
  'Geolocation',
  'Settings',
  'Utilities',
  'deviceInfo',
  'UniversityMatcher',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, University, $ionicViewSwitcher, 
  Geolocation, Settings, Utilities, deviceInfo, UniversityMatcher) {

    console.log("passed deviceInfo: " + deviceInfo);

    $scope.getGPSCoords = function() {
      if(!isTimeout) {
        isTimeout = true;
        getGPS();
        $timeout(function() { isTimeout = false;}, 4000);
      } else {
        console.log("still waiting for $timeout to clear, please try again shortly");
      }
    }

    // if (deviceInfo==='android') {
    //   $scope.getGPSCoords();
    // }

    var schoolList = document.querySelectorAll('#school-list')[0];

    $scope.search_text = '';
    $scope.location = false;
    $scope.universities = University.getTargetted();
    sortByRank(University.getTargetted());
    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.limit < $scope.universities.length) {
        $scope.limit += 10;
      }
    }

    //back button
    $scope.goToAccess = function() {
      console.log("pressed goToAccess()");
      $ionicViewSwitcher.nextDirection('back');
      $state.go('^.access');
    }

    function sortByRank(list) {
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
      //$scope.universities = Utilities.nickMatcher(input, University.getTargetted());
      $scope.universities = UniversityMatcher.cachedMatch(input);
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
    console.log("$scope.location is currenty: " + $scope.location);


    var isTimeout = false;
    function getGPS() {
      // //STILL NEED TO DO FOR IOS
      // // if(DeviceService.getDevice()==="ios") {
      // //   Geolocation.enableGPS();
      // //   return;
      // // }
      console.log("$scope.location is currenty: " + $scope.location);
      if($scope.location) {

        $scope.location = false;
        //sortByRank(University.getTargetted());
        document.querySelector('header a.geolocation-icon .ion-navigate').style.color = 'white';
        console.log("$scope.location is now: " + $scope.location);

      } else if(!$scope.location){

        Geolocation.getLocation();
        document.querySelector('header a.geolocation-icon .ion-navigate').style.color = '#46FF00';
        $timeout(function() {
            $scope.limit = 10;
            schoolList.scrollTop = 0;
            $scope.location = true;
            console.log("$scope.location is now: " + $scope.location);

          }, 1500);
      }

    };


    $scope.$on('$ionicView.enter', function() {
        if (devinceInfo ==='iOS') {
          DeviceService.ios.showStatusBar();
        }
    });


}
