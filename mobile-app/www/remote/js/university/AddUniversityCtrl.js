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
  '$ionicSlideBoxDelegate',
  'DeviceService',
  '$ionicModal',
  AddUniversityCtrl]);

function AddUniversityCtrl($scope, $state, $timeout, University, $ionicViewSwitcher, 
  Geolocation, Settings, Utilities, deviceInfo, UniversityMatcher, $ionicSlideBoxDelegate,
  DeviceService, $ionicModal) {


  //uuid
  ga('set', 'dimension1', DeviceService.getUUID());

  ga('set', 'dimension2', DeviceService.getModel());
  ga('set', 'dimension3', DeviceService.getPlatform());
  ga('set', 'dimension4', DeviceService.getVersion());


  var appLoadTime;
  console.log("from the accessCtrl");
  $scope.getLoadTime = function() {

        var current_time = (new Date()).getTime();
        var time_ms = current_time - start_dom_time;
        var time_s = (time_ms / 1000.0).toPrecision(3)
        var loadTime = time_s;
        appLoadTime = loadTime;
        console.log("appLoadTime: " + appLoadTime);
        ga('set', 'dimension5', appLoadTime);
  }

  var stopLoop = false;
  var stats = new Stats();

    $scope.testBefore = function() {
      stopLoop = false;
      var fpsArray = [];
      function update() {
        stats.begin();  
        stats.end();
        fpsArray.push(stats.getFPS());
        // console.log("FPS: " + stats.getFPS());
        if(!stopLoop) {
          requestAnimationFrame(update);          
        } else {
          var total = 0;    
          for(var i=0; i<fpsArray.length; i++) {
            total += fpsArray[i];
          }
          //we are disregarding the first value since it's most likely 0 due to initial transition
          fpsArray.shift();
          var meanFPS = Math.round(total / (fpsArray.length));
          console.log("meanFPS: " + meanFPS);
          console.log("fpsArray: " + fpsArray);
          var fpsValue = "meanFPS: " + meanFPS + "/ fpsArray: " + fpsArray.toString();
          //console.log("fpsValue: " + fpsValue);
          ga('set', 'dimension6', fpsValue);

        }
      }
      requestAnimationFrame(update);
      console.log('called beforeEnter');
    };

    $scope.testAfter = function() {

      stopLoop = true;


      console.log("called afterEnter");
    };

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



    var queryTimeout = false;
    var emptyTimeout = false;
    $scope.query = function(input) {
      if(!queryTimeout) {
        queryTimeout = true;
        //$scope.universities = Utilities.nickMatcher(input, University.getTargetted());
        $scope.universities = UniversityMatcher.cachedMatch(input);
        $timeout(function() {queryTimeout = false;}, 600);
      }
      else if(input.length === 0) {
        if(!emptyTimeout) {
          emptyTimeout = true;
          $scope.universities = UniversityMatcher.cachedMatch(input);  
          $timeout(function() {emptyTimeout = false;}, 600);
        }       
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
      console.log("increaseLimit!");
      if($scope.limit < $scope.universities.length) {
        $scope.limit += 10;
      }
    }

    $ionicSlideBoxDelegate.update();
    //back button
    $scope.goToAccess = function() {
      // console.log("pressed goToAccess()");
      // $ionicViewSwitcher.nextDirection('back');
      // $state.go('^.access');

    $ionicSlideBoxDelegate.previous();
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

    $scope.universitySelected = function(university, $event) {

      ga('send', 'event', 'Selected University', 'action', university.name);
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
            UniversityMatcher.clearCache();
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


    $ionicModal.fromTemplateUrl(BASE + 'templates/how-it-works.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.howItWorksModal = modal;
    });

    $scope.launchHowItWorksModal = function() {
      $scope.howItWorksModal.show();
    }


}
