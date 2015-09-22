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

  //var networkState = navigator.connection.type;
  var deviceUUID = DeviceService.getUUID();
  var deviceModel =  DeviceService.getModel();
  var devicePlatform =  DeviceService.getPlatform();
  var deviceVersion = DeviceService.getVersion();
  console.log("deviceUUID: " + deviceUUID);
  if( deviceUUID===null || deviceUUID===undefined) deviceUUID = 'undefined';
  var mixpanelID = deviceUUID.substring(0,8);
  console.log("mixpanelID: " + mixpanelID);

  //TODO: current implementation of deviceready() isn't optimal. isn't always ready to provide device info
  mixpanel.identify('testid_iphone5');
  
  document.addEventListener("pause", lastSearch, false);
  document.addEventListener("backbutton", lastSearch, false);
  function lastSearch() {
    mixpanel.track("Paused/Back", {
      "$Search_Input": $scope.input.search_text
    });
  }

  mixpanel.people.set({
      "$email": "testphone@gmail.com",
      
      "$created": "2015-09-22 16:53:54",
      "$last_login": new Date(),
      '$Device_UUID': deviceUUID,
      '$Device_Model': deviceModel,
      '$Device_Platform': devicePlatform,
      '$Device_Version': deviceVersion,
      //'$network_state': networkState,                
  });


  var appLoadTime;
  var appStartTime;

  $scope.getLoadTime = function() {

        appStartTime = (new Date()).getTime();
        var time_ms = appStartTime - start_dom_time;
        var time_s = (time_ms / 1000.0).toPrecision(3)
        var loadTime = time_s;
        appLoadTime = loadTime;
        console.log("appLoadTime: " + appLoadTime);
        mixpanel.track("App Launch", {
          "$App_Load_Time": appLoadTime
        });
        mixpanel.people.set({
          "$App_Load_Time": appLoadTime
        });
  }

  var stopLoop = false;
  var stats = new Stats();

    $scope.beforeEnter = function() {
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
          //var fpsValue = "meanFPS: " + meanFPS + "/ fpsArray: " + fpsArray.toString();
          //console.log("fpsValue: " + fpsValue);

          mixpanel.track("Entered Access Code", {
              "$Mean_FPS": meanFPS,
              "$FPS_Array": fpsArray.toString()
          });
          mixpanel.people.set({
            "$Mean_FPS": meanFPS
          });

        }
      }
      requestAnimationFrame(update);
      //console.log('called beforeEnter');
    };

    $scope.afterEnter = function() {
      stopLoop = true;
      //console.log("called afterEnter");
    };

    console.log("passed deviceInfo: " + deviceInfo);


    // var universityInput = document.querySelectorAll('#university-input')[0];
    // console.log("universityInput BLAH BLAH BLAH BLAH: " + universityInput);
    // universityInput.addEventListener('keydown', measureResponse);

    var listResponseTime = 0;
    var active = true;
    var listEndTime = 0;
    $scope.$on('uniListFinished', function() {
      
      if(active) {
        if($scope.input.search_text.length > 0) {
          listResponseTime = Date.now();
          console.log("setting listResponseTime: " + listResponseTime);
          //console.log("listResponseTime in scope.$on: " + listResponseTime);
          // var measureTime = listResponseTime - startTime;
          // console.log("measureTime: " + measureTime);
          active = false;
        }
        else if($scope.input.search_text.length === 0) {
          listEndTime = Date.now();
          console.log("listEndTime: " + listEndTime);
        }  
      }
    });

    var measure = true;
    var startTime = 0;
    $scope.measureResponse = function() {
      if(measure) {
        measure = false;
        startTime = Date.now();
        console.log("setting startTime: " + startTime);
        // while(listResponseTime === null) {
          $scope.universities = UniversityMatcher.cachedMatch($scope.input.search_text);
          //console.log("empty loop");
        // }
        // $timeout(function() { 
        //   var endTime = Date.now();
        //   var responseTime = endTime - startTime;
        //   console.log("responseTime: " + responseTime);
        //   console.log("listResponseTime in measureResponse: " + (listResponseTime - startTime));
        // }); 
        
      }
    }


    var queryTimeout = false;
    var emptyTimeout = false;
    $scope.limit = 10;
    $scope.query = function(input) {
      if(!measure) {

        if(!queryTimeout) {
          //queryTimeout = true;
          //$scope.universities = Utilities.nickMatcher(input, University.getTargetted());
          $scope.universities = UniversityMatcher.cachedMatch(input);
          //$timeout(function() {queryTimeout = false;}, 600);
        }
        else if(input.length === 0) {
          if(!emptyTimeout) {
            emptyTimeout = true;
            $scope.universities = UniversityMatcher.cachedMatch(input);
            $timeout(function() {emptyTimeout = false;}, 600);
          }
        }

      }
      

    }

    $scope.input = {
      search_text: ''
    }
    $scope.location = false;
    $scope.universities = University.getTargetted();
    sortByRank(University.getTargetted());
    $scope.limit = 10;
    $scope.increaseLimit = function() {
      if($scope.limit < $scope.universities.length) {
        $scope.limit += 10;
        console.log('limit increased is being called', $scope.limit, $scope.universities.length);
      }
    }

    //back button
    $scope.goToAccess = function() {
      $scope.input.search_text = '';
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

      var searchResponseTime = listResponseTime - startTime;
      console.log("searchResponseTime: " + searchResponseTime);

      var listRenderTime = listEndTime - appStartTime;
      console.log("listRenderTime: " + listRenderTime);



      mixpanel.track("Selected University", {
          "$University": university.name,
          "$Search_Input": $scope.input.search_text
      });
      mixpanel.people.set({
          "$University": university.name,
          "$Search_Response_Time": searchResponseTime,
          "$List_Render_Time": listRenderTime
      });
      ga('send', 'event', 'Selected University', 'action', university.name);
      //if user is switching universities
      if ($scope.user.university_id
          && university.id !== $scope.user.university_id
          && !confirm('Are you sure? Your current courses will be deactivated'))
      {
          return;
      }
      mixpanel.track("Changed University", {
          "$University": university.name,
          "$Search_Input": $scope.input.search_text
      });
      mixpanel.people.set({
          "$University": university.name,
      });
      $scope.loader.show();
      $scope.user.university_id = university.id;
      $scope.user.university = university;
      $scope.input.search_text = '';

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
    console.log("$scope.location is currently: " + $scope.location);


    var isTimeout = false;
    $scope.getGPSCoords = function() {
      if(!isTimeout) {
        isTimeout = true;
        getGPS();
        $timeout(function() { isTimeout = false;}, 4000);
      } else {
        console.log("still waiting for $timeout to clear, please try again shortly");
      }
    }

    function getGPS() {

      var schoolList = document.querySelectorAll('#school-list')[0];

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
