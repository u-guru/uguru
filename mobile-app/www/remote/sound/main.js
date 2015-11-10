function defaultErrorCallback(e) {
    console.log(e);
}

angular.module('sound-guru', ['ionic', 'base64', 'authentication', 'musicplayer'])

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
    templateUrl: 'intro/intro.html',
    controller: 'IntroCtrl'
  })

  .state('home', {
    url: '/',
    templateUrl: 'templates/music.home.html',
    controller: 'MusicHomeCtrl'
  })

  .state('playlist', {
    url: '/playlist/:genre',
    params: {
      'genre': null
    },
    templateUrl: 'templates/playlist.html',
    controller: 'PlaylistCtrl'
  })

  ;

  
  $urlRouterProvider.otherwise('/intro');

});
