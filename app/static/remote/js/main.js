// Uguru upp
var LOCAL = false;
var BASE = '';
if (LOCAL) {
  BASE = 'remote/';
}
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'fastMatcher',
  'ngAnimate', 'uguru.student.controllers', 'uguru.version', 'uguru.util.controllers',
  'uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps', 'uguru.directives', 'mgcrea.ngStrap'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory, 
  $cordovaDialogs, Version, $cordovaSplashscreen, $rootScope, $templateCache) {
  $ionicPlatform.ready(function() {
    //Only when the app is opened after its been closed
    document.addEventListener("deviceready", function () {
        console.log('hiding splash screens..');
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
                      var msg = JSON.parse(response).ios_msg;
                      var title = "New Updates! v" + serverVersionNumber;
                      $cordovaDialogs.confirm(msg, title, ['Not Now','Update'])
                          .then(function(buttonIndex) {
                            // no button = 0, 'OK' = 1, 'Cancel' = 2
                              console.log('user clicked button');
                              console.log(buttonIndex);
                              var btnIndex = buttonIndex;
                              if (btnIndex === 2) {
                                $ionicHistory.clearCache();
                                $ionicHistory.clearHistory();
                                $cordovaSplashscreen.show();
                                window.localStorage.clear();

                                //remove all angular templates
                                $templateCache.removeAll();

                                Version.setVersion(serverVersionNumber);
                                $localstorage.set('recently_updated', true);
                                console.log('V' + serverVersionNumber + 'stored to user');
                                window.location = "http://uguru-rest.herokuapp.com/app/"
                                // window.location = "http://127.0.0.1:5000/app/";
                                // window.location = "http://192.168.1.233:8101/remote/index.html#/student/home"
                                window.location.reload(true);
                                // window.location = "http://uguru-rest.herokuapp.com/app/"
                                

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

        // document.addEventListener("pause", function() {
        //     console.log("App is paused...");
        // }, false);

        checkForAppUpdates();

    });

  })
})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  // if (!window.cordova) {
  //     var appID = 1416375518604557;
  //     var fbVersion = "v2.2"; // or leave blank and default is v2.0
  //     $cordovaFacebookProvider.browserInit(appID, fbversion);
  // }
        

  angular.extend($popoverProvider.defaults, {
    html: true
  });

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
        controller: function($scope, $localstorage, User, RootService) {
          
          // $localstorage.removeObject('user');
          $scope.user = User.getLocal();
          $scope.rootUser = User;
          $scope.root = RootService;
        }
  }).
  state('root.student', {
        url: '/student',
        abstract: true,
        templateUrl: 'templates/student-root.html'
  }).
  state('root.student.home', {
        url: '/home',
        templateUrl: BASE + 'templates/student/student.home.html',
        controller: 'StudentHomeController'
  }).
  state('root.student.request', {
        url: '/request/:courseObj',
        templateUrl: BASE +  'templates/student/student.request.html',
        controller: 'StudentRequestController'
  }).
  state('root.student.active-session', {
        url: '/session/:sessionObj',
        templateUrl: BASE +  'templates/student/student.active-session.html',
        controller: 'StudentActiveSession'
  }).
  state('root.student.settings', {
        url: '/settings',
        templateUrl: BASE + 'templates/student/student.settings.html',
  }).
  state('root.student.directory', {
        url: '/directory',
        templateUrl: BASE + 'templates/student/directory.html',
  }).
  state('root.student.add-payment', {
        url: '/payment',
        templateUrl: BASE + 'templates/student/add-payment.html',
  }).
  state('root.student.request-status', {
        url: '/request-status/:courseObj',
        templateUrl: BASE + 'templates/student/student.request-status.html',
        controller: 'RequestStatusController'
  }).
  state('root.student.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student.guru-available', {
        url: '/guru-available',
        templateUrl: BASE + 'templates/student/student.guru-available.html',
        controller: 'GuruAvailableController'
  }).
  state('root.student.guru-profile', {
        url: '/guru-profile',
        templateUrl: BASE + 'templates/student/student.guru-profile.html',
        controller: 'GuruProfileController'
  }).

  state('root.student.animations', {
        url: '/animations',
        templateUrl: BASE + 'templates/student/animations.html',
  }).
  state('root.student.animation1', {
      url: '/animation1',
      templateUrl: BASE + 'templates/student/animation1.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          var testarray = document.getElementsByClassName("sq");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].className += " active";
          }          
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("sq");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");

          }          
        }
      }
  }).
  state('root.student.animation2', {
      url: '/animation2',
      templateUrl: BASE + 'templates/student/animation2.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].className += " active";
          }
          document.getElementsByClassName("yon").className += " active";
          document.getElementsByClassName("goo").className += " active";
          document.getElementsByClassName("rok").className += " active";
          document.getElementsByClassName("ryk").className += " active";
          document.getElementsByClassName("x7").className += " active";
          document.getElementsByClassName("x8").className += " active";
          document.getElementsByClassName("x9").className += " active";
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }          
        }
      }
  }).
  state('root.student.animation3', {
      url: '/animation3',
      templateUrl: BASE + 'templates/student/animation3.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          !function () {
            var boomTimeout;
            var p = document.querySelector('p');

            // dataset isn't well supported enough yet...
            p.setAttribute('data-content', p.textContent);

            function boom () {
              p.className = 'boom';
              window.clearTimeout(boomTimeout);
              boomTimeout = window.setTimeout(unboom, 300);
            }

            function unboom () {
              p.className = '';
            }

            setInterval(function () {r
              boom();
              setTimeout(boom, 400);
            }, 1800);

            boom();

            p.addEventListener('click', boom, false);
          }();
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }          
        }
      }
  }).
  state('root.student.animation4', {
      url: '/animation4',
      templateUrl: BASE + 'templates/student/animation4.html',
      controller: function($scope) {
        $scope.startAnimation = function() {
          
              //Create the canvas
              var canvas = document.getElementById("canvas");
              var context = canvas.getContext("2d");
              document.getElementsByClassName('animation-box')[0].appendChild(canvas);

              setInterval(function() {
                  //Generating random positions
                  var posX = Math.floor(Math.random() * 200);
                  var posY = Math.floor(Math.random() * 200);

                  //Picking selected colors at random 
                  var colors = ['rgba(220, 20, 60, 0.8)', 'rgba(255, 105, 180,0.6)', 'rgba(255, 20, 147, 0.8)', 'rgba(255, 140, 0,0.6)', 'rgba(143, 188, 143,0.7)'];
                  var color = Math.floor(Math.random() * colors.length);

                  //Drawing on the canvas
                  context.beginPath();
                  context.moveTo(200, 0);
                  context.lineTo(1, -1);
                  context.fillStyle = colors[color];
                  context.arc(posX, posY, 0, 0, Math.PI * 2, true);
                  context.closePath();
                  context.fill();
              }, 80);
          
        }
        $scope.endAnimation = function() {
          var testarray = document.getElementsByClassName("a");
          for(var i = 0; i < testarray.length; i++)
          {
              testarray[i].classList.remove("active");
          }          
        }
      }
  })
});
