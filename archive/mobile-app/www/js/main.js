// Uguru upp
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'uguru.offline-controllers'])

.directive("popup",function(){
  return {
    restrict: "E",
    template: '<script id="templates/welcomePopup.html" type="text/ng-template"> <div class="row"> <div class="col"> <div class="center"> <img style="background:rgba(105, 179, 165, 1)" src="./img/uguru-04.png" width="60%" class="uguru_glass center"> </div></div></div><div class="row"> <div class="col"> <p style="font-size:2.25em; color:rgba(0,0,0,0.7)"class="bold-font center font-24 line-height-120">Welcome!</p></div></div><div class="row"> <div class="col"> <p style="font-size:15px;"class="osreg-font center grey"> We d like to notify tou when your Guru s<br>accept your request for help.<br>Turn norifications on? </div></div><div class="row"> <div class="col"> <button id="popup-positive-btn" class="button button-full button-positive footer-button"> Get Started </button> <a class="button button-full button-outline" id="popup-cancel-btn" style="background-color:white; border:0px;color:rgba(105, 179, 165, 1); min-height:0px !important;height:30px;"> No Thanks </a> </div></div></script>'
  }
})
.directive("foot",function(){
  return {
    restrict: "E",
    template: '<div class="bar bar-footer uguru-footer"> <div class="row"> <div class="col center border-bottom"><img src="./img/glass.png" class="width"></div><div class="col center"><img src="./img/book.png" class="width"></div><div class="col center"><img src="./img/setting.png" class="width"></div></div></div>'
  }
})
.directive("subheader",function(){
  return {
    restrict: "E",
    template: '<div class="bar bar-subheader"> <div class="row center"> <div class="col border-bottom">MY CLASSES</div><div class="col">PREVIOUS SESSIONS</div></div></div>'
  }
})
.directive("boxcoursename",function(){
  return {
    restrict: "E",
    template: '<div class="lg-box"> <div class="course-name-box"> <div class="text"> BIO 101 </div></div></div>'
  }
})

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory, $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {

    //Only when the app is opened after its been closed
    document.addEventListener("deviceready", function () {
      //Set platform in local store
      var device = ionic.Platform.device();
      var platform = ionic.Platform.platform();
      $localstorage.setObject('platform', platform);
      $localstorage.setObject('device', device);

      console.log(device + ' ' + platform);

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
          StatusBar.overlaysWebView(true);
          StatusBar.styleDefault();
      }

      if ($cordovaNetwork.isOnline()) {
        console.log('device is online..going straight to the app ');
        if (navigator.splashscreen) {
          navigator.splashscreen.show();
        }

        // window.location = "http://192.168.42.66:5000/app/production/";
        window.location = "https://www.uguru.me/app/production/";

        // if (platform === "ios") {
        //   console.log('redirecting to local ios...');
        //   navigator.splashscreen.show();

        //   window.location= "http://u.uguru.me/production/app/";
        //   // window.location = "http://192.168.42.66:5000/production/app/";
        // } else if (platform === 'android' ) {
        //   console.log('yay android has been filtered out');
        //   navigator.splashscreen.show();
        //   console.log('just started the splash attack');
        //   // window.location.href = "http://192.168.42.66:5000/production/app/";
        //   // window.location= "http://u.uguru.me/production/app/";
        }
      else {
        console.log('state is offline')
        navigator.splashscreen.hide();
        $state.go('root.offline')
      }

      document.addEventListener("pause", function() {
            console.log("The application is being paused by the user");
      }, false);

      document.addEventListener("offline", function() {
            $state.go('root.offline');
      }, false);

      document.addEventListener("online", function() {
            if (platform === "ios") {
              navigator.splashscreen.show();
              console.log('redirecting to ios...');
              console.log($localstorage.getObject('version'));

              window.location= "http://uguru-rest.herokuapp.com/app/";
            } else {
              console.log('redirecting to android...');
            }
      }, false);

    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider,
  $cordovaFacebookProvider) {
  if (!window.cordova) {
      var appID = 1416375518604557;
      var version = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, version);
  }


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
  state('root.loading', {
      url: '/loading',
      templateUrl: 'templates/util/loading.html',
  }).
  state('root.offline', {
      url: '/offline',
      templateUrl: 'templates/util/offline.html',
    controller: 'OfflineController'
  }).
  state('root.student.directory', {
        url: '/directory',
        templateUrl: 'templates/student/directory.html',
  }).
  state('root.student.sandbox2', {
      url: '/sandbox2',
      templateUrl: 'templates/student/sandbox2.html'
  }).
  state('root.student.sandbox3', {
      url: '/sandbox3',
      templateUrl: 'templates/student/sandbox3.html'
  }).
  state('root.student.sandbox5', {
      url: '/sandbox5',
      templateUrl: 'templates/student/sandbox5.html'
  }).
  state('root.student.sandbox6', {
      url: '/sandbox6',
      templateUrl: 'templates/student/sandbox6.html'
  }).
  state('root.student.sandbox7', {
      url: '/sandbox7',
      templateUrl: 'templates/student/sandbox7.html'
  }).
  state('root.student.sandbox8', {
      url: '/sandbox8',
      templateUrl: 'templates/student/sandbox8.html'
  }).
  state('root.student.sandbox9', {
      url: '/sandbox9',
      templateUrl: 'templates/student/sandbox9.html'
  }).
  state('root.student.sandbox10', {
      url: '/sandbox10',
      templateUrl: 'templates/student/sandbox10.html'
  }).
  state('root.student.sandbox11', {
      url: '/sandbox11',
      templateUrl: 'templates/student/sandbox11.html'
  }).
  state('root.student.sandbox12', {
      url: '/sandbox12',
      templateUrl: 'templates/student/sandbox12.html'
  }).
  state('root.student.sandbox13', {
      url: '/sandbox13',
      templateUrl: 'templates/student/sandbox13.html'
  }).
  state('root.student.sandbox15', {
      url: '/sandbox15',
      templateUrl: 'templates/student/sandbox15.html'
  }).
  state('root.student.sandbox16', {
      url: '/sandbox16',
      templateUrl: 'templates/student/sandbox16.html'
  }).
  state('root.student.sandbox17', {
      url: '/sandbox17',
      templateUrl: 'templates/student/sandbox17.html'
  }).
  state('root.student.sandbox18', {
      url: '/sandbox18',
      templateUrl: 'templates/student/sandbox18.html'
  }).
  state('root.student.sandbox4', {
      url: '/sandbox4',
      templateUrl: 'templates/student/sandbox4.html'
  }).
  state('root.student.animations', {
        url: '/animations',
        templateUrl: 'templates/student/animations.html',
  }).
  state('root.student.animation1', {
      url: '/animation1',
      templateUrl: 'templates/student/animation1.html',
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
      templateUrl: 'templates/student/animation2.html',
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
      templateUrl: 'templates/student/animation3.html',
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

            setInterval(function () {
              console.log('now');
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
      templateUrl: 'templates/student/animation4.html',
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
  // if device is offline
  // state('root.offline', {
  //     url: '/offline',
  //     templateUrl: 'templates/become-guru/offline.html',
  //     controller: 'OfflineCtrl'
  // })
});