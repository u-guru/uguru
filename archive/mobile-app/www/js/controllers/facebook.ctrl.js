angular.module('uguru.facebook.ctrl', [])

.controller('FbCreateCtrl', ['$scope','$state', '$localstorage',
    '$cordovaFacebook', '$ionicHistory', '$timeout', 'User', 'University', 'Major', 'Course',
    'user', 'StaticDataService','$cordovaAppVersion', 'cfpLoadingBar', '$ionicLoading',
    function($scope, $state, $localstorage, $cordovaFacebook, $ionicHistory, $timeout, User,
        University, Major, Course, user, StaticDataService, $cordovaAppVersion, cfpLoadingBar, $ionicLoading) {
 
    document.addEventListener("deviceready", function () {
      $cordovaAppVersion.getAppVersion().then(function (version) {
          //check console.log()

          console.log('This app version is ' + version);
          $scope.currentVersion = version;
          
        });
    });

    $scope.getLoginStatus = function () {
      $cordovaFacebook.getLoginStatus().then(function (status) {
        $scope.status = status;
        console.log($scope.status);
      }, function (error) {
        $scope.status = error;
        console.log($scope.status);
      });
    };

    $scope.login = function () {

        $cordovaFacebook.login(["email","public_profile","user_friends", "user_work_history", "user_location", "user_education_history"]).then(function (success) {
        
        $scope.loginInfo = success;
        
        console.log(success);
        cfpLoadingBar.start();
        document.getElementsByClassName('bar')[0].style.top = 0;
          // $timeout(function() {
          //   if (cfpLoadingBar.status()) {
          //       cfpLoadingBar.complete();
          //       console.log('Facebook timed-out');
          //       $ionicLoading.show({
          //           template: 'Something went wrong, please try again in a couple of minutes.',
          //           duration: 3000
          //       });
          //   }
          // }, 10000);

        //get user information
        $scope.getMe();
        console.log('Getting Facebook information...');
      },

      //error function
      function (error) {
        $scope.error = error;
        console.log('FB CONNECT FAILED...');
        console.log('Error from logging from facebook:' + JSON.stringify(error));
        $scope.logout();
      });

    };

    $scope.fbConnect = function () {
      console.log('Attempting to login through facebook...');
      $scope.login();
    };


    //get all standard facebook information
    $scope.getMe = function () {
      $cordovaFacebook.api("me", null).then(function (success) {
        console.log(success);

        console.log('Received facebook information');
        console.log(JSON.stringify(success));
        $scope.user = success;
        

        // console.log('Getting User, Major, Course data...');
        // getStaticData($scope, $state, $localstorage, University, Major, Course);

        
        user = success;

        console.log('Received Facebook Photo');
        
        user.profile_url = "https://graph.facebook.com/" + success.id + "/picture?width=100&height=100";
        console.log(user);

        console.log('Submit payload & create a user');
        submitPayload(user, User);

        // console.log('Attempting to get their facebook photo...');
        // $scope.getPhoto(success);
        

      }, function (error) {
        $scope.error = error;
        console.log(error);
      });
    };

    $scope.getPhoto = function (fb_payload) {
      $cordovaFacebook.api("me/picture", null)
        .then(function (success) {
            
            console.log('Received Facebook Photo');
            console.log(success);

            

        }, function (error) {
            $scope.error = error;
        });
    };

    $scope.logout = function () {
      

      $cordovaFacebook.logout().then(function (success) {
        console.log(success);
        console.log('Attempting to login again...');
        $cordovaFacebook.getLoginStatus().then(function (status) {
            $scope.status = status;
            console.log($scope.status);
          }, function (error) {
            $scope.status = error;
            console.log($scope.status);
          });
      }, function (error) {
        $scope.error = error;
        console.log(JSON.stringify($scope.error));
      });
    };


    //This function creates a user or updates on if they already exist
    var submitPayload = function(local_user, User) {

        // $localstorage.setObject('user', local_user);

        User.create(local_user)

        .then(

        //success callback 
        function(user_response){

            var statusBarHeight = document.getElementsByClassName('bar-header')[0].getBoundingClientRect().height;
            document.getElementsByClassName('bar')[0].style.top=statusBarHeight;
            cfpLoadingBar.complete();
            $scope.user = user_response;
            
            console.log('Parent object updated...Heres what it looks like');

            console.log('Server provided response from Submit Payload Request');
            console.log(user_response);

            user = user_response;
            console.log('Parent object updated');

            console.log("Set the local object in the submitPayload function");
            $localstorage.setObject("user", user);

            StaticDataService.getStaticData(user);

            if (!user.tos_version) {
                $state.go('^.password');
            }

            //user has already completed their application
            else if ($scope.user.guru_courses.length > 0 &&
                $scope.user.guru_introduction &&
                $scope.user.majors.length > 0 &&
                $scope.user.university_id) {

                $state.go('^.guru.complete');

            }
            
            //User does have password and has already begun application
            else if (user.tos_version && user.university_id){
                $state.go('^.wizard.list');
                return;
            }
            
            //They haven't started yet
            else {
                $state.go('^.wizard-splash');
            }
            
            return;

        },

        //error callback
        function(response) {
            console.log('No response from the server...oops..');
            //TODO SAMIR: Bring up modal, dialog
            // $state.go('launch');
        }
        
    );};

    $scope.checkOffline = function() {
            console.log('checking network status..');
            if ($localstorage.getObject('network') === 'offline') {
                $state.transitionTo('root.offline');
            }
    };

    $timeout(function() {
      $scope.checkOffline();
    }, 1000);

    console.log('Loading launch view...Here is the user we have on file.');
    $scope.user = user;

    if (typeof($scope.user) == "object" && $scope.user.id) {
        
        StaticDataService.getStaticData($scope.user);

        if (! $scope.user.tos_version) {
            $state.go('^.password');
        }

        else if ($scope.user.guru_courses.length > 0 &&
            $scope.user.guru_introduction &&
            $scope.user.majors.length > 0 &&
            $scope.user.university_id) {

            $state.go('^.guru.complete');

        }
        //User does have password and is not a guru
        else if ($scope.user.tos_version && $scope.user.university_id){
            $state.go('^.wizard.list');
            $ionicHistory.clearHistory();
            return;
        }
        //User is already a guru 
        else {
            $state.go('^.wizard-splash');
        }
        return;
    }

}]);