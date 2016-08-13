// Uguru upp
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular',
  'ngAnimate', 'uguru.student.controllers'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory) {
  $ionicPlatform.ready(function() {

    //Only when the app is opened after its been closed
    document.addEventListener("deviceready", function () {
      $cordovaAppVersion.getAppVersion().then(function (version) {
          //check console.log()
          
          var previousVersion = $localstorage.get('version');
          console.log(previousVersion);

          if (previousVersion != version) {
            console.log("This user is behind, clearing the cache...");
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            
            window.localStorage.clear();
            console.log('Cache is offically clear');


            console.log('This app version is ' + version);
            $localstorage.set("version", version);

            $state.go('root.sandbox-master');
            return;
          }
          
        });

    });

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

  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  if (!window.cordova) {
      var appID = 1416375518604557;
      var version = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, version);
  }

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/student/home');

  //Set up restangular provider
  RestangularProvider.setBaseUrl('http://uguru-rest.herokuapp.com/api/v1');
  // RestangularProvider.setBaseUrl('http://0.0.0.0:5000/api/v1');

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
  state('root.student.directory', {
        url: '/directory',
        templateUrl: 'templates/student/directory.html',
  })
  // state('root.sandbox', {
  //     url: '/sandbox',
  //     templateUrl: 'templates/student/sandbox.html',
  //     controller: 'SandboxCtrl'
  // }).
  // state('root.sandbox2', {
  //     url: '/sandbox2',
  //     templateUrl: 'templates/student/sandbox2.html'
  // }).
  // state('root.sandbox3', {
  //     url: '/sandbox3',
  //     templateUrl: 'templates/student/sandbox3.html',
  //     controller: 'Sandbox3Ctrl'
  // }).
  // state('root.sandbox5', {
  //     url: '/sandbox5',
  //     templateUrl: 'templates/student/sandbox5.html'
  // }).
  // state('root.sandbox6', {
  //     url: '/sandbox6',
  //     templateUrl: 'templates/student/sandbox6.html'
  // }).
  // state('root.sandbox7', {
  //     url: '/sandbox7',
  //     templateUrl: 'templates/student/sandbox7.html',
  //     controller: 'SandboxCtrl'
  // }).
  // state('root.sandbox8', {
  //     url: '/sandbox8',
  //     templateUrl: 'templates/student/sandbox8.html'
  // }).
  // state('root.sandbox9', {
  //     url: '/sandbox9',
  //     templateUrl: 'templates/student/sandbox9.html'
  // }).
  // state('root.sandbox10', {
  //     url: '/sandbox10',
  //     templateUrl: 'templates/student/sandbox10.html'
  // }).
  // state('root.sandbox11', {
  //     url: '/sandbox11',
  //     templateUrl: 'templates/student/sandbox11.html'
  // }).
  // state('root.sandbox12', {
  //     url: '/sandbox12',
  //     templateUrl: 'templates/student/sandbox12.html'
  // }).
  // state('root.sandbox13', {
  //     url: '/sandbox13',
  //     templateUrl: 'templates/student/sandbox13.html'
  // }).
  // state('root.sandbox15', {
  //     url: '/sandbox15',
  //     templateUrl: 'templates/student/sandbox15.html'
  // }).
  // state('root.sandbox16', {
  //     url: '/sandbox16',
  //     templateUrl: 'templates/student/sandbox16.html'
  // }).
  // state('root.sandbox17', {
  //     url: '/sandbox17',
  //     templateUrl: 'templates/student/sandbox17.html'
  // }).
  // state('root.sandbox18', {
  //     url: '/sandbox18',
  //     templateUrl: 'templates/student/sandbox18.html'
  // }).
  // state('root.sandbox4', {
  //     url: '/sandbox4',
  //     templateUrl: 'templates/student/sandbox4.html'
  // });
  // if device is offline
  // state('root.offline', {
  //     url: '/offline',
  //     templateUrl: 'templates/become-guru/offline.html',
  //     controller: 'OfflineCtrl'
  // });
});