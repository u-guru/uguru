// Uguru upp
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular',
  'ngAnimate', 'uguru.student.controllers', 'uguru.version'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory, 
  $cordovaDialogs, Version, $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {

    //Only when the app is opened after its been closed
    document.addEventListener("deviceready", function () {

        console.log('hiding splash screen..');
        $cordovaSplashscreen.hide();
        var checkForAppUpdates = function () {

            console.log('checking for app updates...');
            Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                    var serverVersionNumber = JSON.parse(response).version;
                    var currentVersion = Version.getVersion()
                    //if brand new user with no version set
                    if ((typeof currentVersion) === "undefined") {
                      console.log('First time opening app - set version to 1.0');
                      currentVersion = 1.0
                      Version.setVersion(1.0);
                    }
                    console.log('user v:' + currentVersion.toString() + '. Server v:' + serverVersionNumber);
                    if (serverVersionNumber != currentVersion) {
                      var msg = 'This will improve your experience'
                      var title = "App Update v" + serverVersionNumber;
                      $cordovaDialogs.confirm(msg, title, ['Not Now','Update'])
                          .then(function(buttonIndex) {
                            // no button = 0, 'OK' = 1, 'Cancel' = 2
                              console.log('user lcicked button');
                              console.log(buttonIndex);
                              var btnIndex = buttonIndex;
                              if (btnIndex === 2) {
                                $ionicHistory.clearCache();
                                $ionicHistory.clearHistory();
                                window.localStorage.clear();
                                Version.setVersion(serverVersionNumber);
                                console.log('V' + serverVersionNumber + 'stored to user');
                                window.location = "http://uguru-rest.herokuapp.com/app/"
                              }
                          });
                    }
               },

               //connectivity issues
              function() {
                  console.log('Version not loaded');
              }
          );

        }
      
        //Set platform in local store
        $localstorage.setObject('platform', ionic.Platform.platform());
        $localstorage.setObject('device', ionic.Platform.device());

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.overlaysWebView(true);
          StatusBar.styleLightContent();
        }

        document.addEventListener("resume", function() {
       
            console.log('device is resuming....')
            checkForAppUpdates();
       
        }, false);

        document.addEventListener("online", function() {
       
            console.log('device is online...')
            checkForAppUpdates();
       
        }, false);

        document.addEventListener("offline", function() {
       
            console.log('device is offline...')
            checkForAppUpdates();
       
        }, false);

        document.addEventListener("pause", function() {
            console.log("App is paused...");
        }, false);

        checkForAppUpdates();

    });
  })
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbversion);
  }

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/student/home');

  //Set up restangular provider
  RestangularProvider.setBaseUrl('http://uguru-rest.herokuapp.com/api/v1');
  // RestangularProvider.setBaseUrl('http://127.0.0.1:5000/api/v1');

  //Client-side router
  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: 'templates/root.html',
  }).
  //TESTING PURPOSES ONLY
  state('root.student', {
        url: '/student',
        abstract: true,
        templateUrl: 'templates/student-root.html'
  }).
  state('root.student.home', {
        url: '/home',
        templateUrl: 'templates/student/student.home.html',
        controller: 'StudentHomeController'
  }).
  state('root.student.request', {
        url: '/request',
        templateUrl: 'templates/student/student.request.html',
  }).
  state('root.student.directory', {
        url: '/directory',
        templateUrl: 'templates/student/directory.html',
  })
});