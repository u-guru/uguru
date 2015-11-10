function defaultErrorCallback(e) {
    console.log(e);
}

var BASE = '';
var LOCAL = true;

if (LOCAL) {

  BASE = 'remote/';
}

angular.module('sound-guru', ['ionic', 'base64', 'authentication', 'musicplayer', 'ionic.utils'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(false);
      StatusBar.styleDefault();
      StatusBar.show();
    }
  });

  document.addEventListener('deviceready', function() {

    console.log("Device is ready from main.js!");
    console.log("window.open works well");
    console.log("media works well");
    console.log(Media);

  });

})

.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

  .state('intro', {
    url: '/intro',
    templateUrl: BASE + 'sound/intro/intro.html',
    controller: 'IntroCtrl'
  })

  // .state('home', {
  //   url: '/',
  //   templateUrl: BASE + 'templates/music.home.html',
  //   controller: 'MusicHomeCtrl'
  // })

  .state('playlist', {
    url: '/playlist/:genre',
    params: {
      'genre': null
    },
    templateUrl: BASE + 'sound/player/player.html',
    controller: 'PlayerCtrl'
  })

  ;

  
  $urlRouterProvider.otherwise('/intro');

});
