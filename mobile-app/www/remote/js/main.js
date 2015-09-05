// Uguru upp

var LOCAL = true; //local to the 8100 codebasebirbirs
var FIRST_PAGE='^.access';



var BASE_URL = 'https://uguru-rest.herokuapp.com/production/app/';
var REST_URL = 'https://uguru-rest.herokuapp.com'

var BASE = '';
if (LOCAL) {
  BASE = 'remote/';
  //BASE_URL = 'http://192.168.42.66:8100';
  BASE_URL = 'http://localhost:8100'
 // REST_URL = 'http://localhost:5000';
  //REST_URL = 'https://uguru-rest.herokuapp.com'
  REST_URL = 'http://192.168.42.78:5000'

} else {
  img_base = '/static/'
}

mixpanel = window.mixpanel || null;

if (mixpanel) mixpanel.track("App Launch");
angular.module('uguru', ['ionic','ionic.utils','ngCordova', 'restangular', 'fastMatcher',
  'ngAnimate', 'uguru.onboarding.controllers', 'uguru.student.controllers','uguru.guru.controllers', 'uguru.version',
  'uguru.util.controllers','uguru.rest', 'uguru.user', 'uguru.root.services', 'uiGmapgoogle-maps',
  'uguru.directives', 'mgcrea.ngStrap', 'ionic.device', 'ui.bootstrap'])

.run(function($ionicPlatform, $cordovaStatusbar, $localstorage,
  $cordovaNetwork, $state, $cordovaAppVersion,$ionicHistory,
  $cordovaDialogs, Version, $rootScope, $cordovaSplashscreen,
  $templateCache, Device, User, $cordovaLocalNotification,
  $cordovaGeolocation, $cordovaDevice) {


// $ionicPlatform.ready(function() {

  document.addEventListener("deviceready", function () {
        // console.log('list of all plugins checkpoint 2', JSON.stringify(cordova.require("cordova/plugin_list").metadata));
        if (calcTimeSinceInit) {
          deviceReadyLoadTime = calcTimeSinceInit();
          console.log('Device ready load time:', deviceReadyLoadTime, 'seconds');
        }

          if ($cordovaSplashscreen && $cordovaSplashscreen.hide) {


            $cordovaSplashscreen.hide();
          }


            var posOptions = {
              timeout: 2000,
              enableHighAccuracy: false, //may cause high errors if true
            }

            $rootScope.platform = {
                ios: ionic.Platform.isIOS(),
                android: ionic.Platform.isAndroid(),
                windows: ionic.Platform.isWindowsPhone(),
                mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(),
                web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone()),
                device: ionic.Platform.device(),
            }

            console.log(JSON.stringify($rootScope.platform));


            if ($cordovaDevice && $cordovaDevice.getPlatform() === 'Win32NT') {
              $rootScope.platform.windows = true;
              $rootScope.platform.mobile = true;
              $rootScope.platform.web = false;
            }

            console.log('user is on device:', ionic.Platform.platform());
            if (ionic.Platform.isWindowsPhone()) {
              console.log('woooooo we detected were on windows niggaaa');
            }
            //performing mobile tasks
            // console.log('STARTING MOBILE ONLY tasks below \n\n');

            if (!window.cordova) {
              // console.log('sorry aint no cordova up in here');
            }

            if (window.cordova && $rootScope.platform.mobile) {

                //hiding the splash screen
                console.log('1. hiding splashscreen on mobile devices \n\n');

                if (navigator.splashscreen) {
                  // console.log('hide the splash screen on ios via cordova navigator v2');
                  navigator.splashscreen.hide();
                  // $cordovaSplashscreen.hide();
                } else {
                  // console.log('did not hide the splash screen on device since there is none?');
                }


                //grabbing nextwork speed


                //Local Storage
                 // $localstorage.saveToDisk(device.platform);
               //$localstorage.updateDisk();
               //console.log("LOG "+$localstorage.getFreeDiskSpace());




                //save device
                // console.log('3. Saving device to server:', $rootScope.platform.device.model, '\n\n')
                $rootScope.current_device = ionic.Platform.device();


                //keyboard settings for android / ios
                // console.log('4. Setting up ios keyboard default + status bars..');
                if (cordova.plugins.Keyboard && cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                  cordova.plugins.Keyboard.disableScroll(true);
                }

                //styling status bars
                if ($rootScope.platform.ios) {

                  if (window.StatusBar) {
                    // console.log('Extra #1. Styling iOS status bar to black \n\n');
                    StatusBar.styleDefault();
                    StatusBar.overlaysWebView(true);
                  }

                }
          }

    });
    // checkForAppUpdates(Version, $ionicHistory, $templateCache, $localstorage);
  // });

})

.config(function($stateProvider, $urlRouterProvider, $popoverProvider, RestangularProvider,
  $cordovaFacebookProvider, $ionicConfigProvider, $compileProvider, uiGmapGoogleMapApiProvider,
  $provide) {

  uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'places'
    });

  $provide.decorator("$exceptionHandler", function($delegate, $injector) {
    return function(exception, cause) {
      // var gh_title;
      // if (exception.message) {
      //   gh_title =  '"' +  exception.message;
      // }
      // if (cause) {
      //   gh_title += '" since "' + JSON.stringify(cause);
      // }
      // if (exception.line) {
      //   gh_title += '". See line ' + exception.line
      // }
      // if (exception.sourceURL) {
      //   var exceptionUrlSplit = exception.sourceURL.split('/');
      //   exception.location = exceptionUrlSplit[exceptionUrlSplit.length - 1];
      //   gh_title += ' in file ' + exception.location
      // }
      // var gh_body = '*Line*: ' + exception.line + '\n' + '*Column*: ' + exception.column + '\n*File*: ' + exception.location + '\n*File URL*: ' + exception.sourceURL + '\n\n*Message*: ' + exception.message + ', where the cause is _' + JSON.stringify(cause) + '_\n\n*Exception Type*: ' + exception.name + '\n\n*Full Error Object*: \n\n' + JSON.stringify(exception) + '\n\n\n*Full Stack Trace*: \n\n' + exception.stack;
      // var user = $injector.get("$localstorage").getObject("user");
      // var user_info = {
      //   id: user.id,
      //   name: user.name,
      //   guru_courses: user.guru_courses,
      //   devices: user.devices,
      //   age: user.time_created,
      //   last_updated: user.last_active
      // }
      // var device_details = {
      //           ios: ionic.Platform.isIOS(),
      //           android: ionic.Platform.isAndroid(),
      //           windows: ionic.Platform.isWindowsPhone(),
      //           mobile: ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone(),
      //           web: !(ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone()),
      //           device: ionic.Platform.device(),
      //         }

      // ghObj = {
      //   issue_title: gh_title,
      //   issue_body: gh_body,
      //   user_agent: navigator.userAgent,
      //   user_details: user_info,
      //   device_info: device_details
      // }

      // var GithubHTTP = $injector.get("Github");
      // GithubHTTP.post(ghObj).then(
      //   function(response) {
      //     console.log(response);
      //   },
      //   function(err) {
      //     console.log(JSON.stringify(err));
      //   }
      // )

      $delegate(exception, cause);
    };
  });


  if (ionic.Platform.isWindowsPhone()) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|x-wmapp.?):|data:image\//);
  }

  // })

  if (!window.cordova) {
      var appID = 1416375518604557;
      var fbVersion = "v2.2"; // or leave blank and default is v2.0
      $cordovaFacebookProvider.browserInit(appID, fbVersion);
  }

  if ($ionicConfigProvider) $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.tabs.position("bottom");

  // $compileProvider.imgSrcSanitizationWhitelist('Captu  redImagesCache/');

  //Set up restangular provider
  RestangularProvider.setBaseUrl(REST_URL + '/api/v1');
  // RestangularProvider.setBaseUrl('http://10.193.138.226:5000/api/v1');
  //Client-side router
  $stateProvider
  .state('root', {
        url: '',
        abstract: true,
        templateUrl: 'templates/root.html',
        controller: 'RootController'
  }).
  state('root.university', {
        url: '/university',
        templateUrl: BASE + 'templates/university.html',
        controller: 'HomeController'
  }).
  state('root.university-container', {
        url: '/university-container',
        templateUrl: BASE + 'templates/university.container.html',
        controller: 'AddUniversityController'
  }).
  state('root.majors-container', {
        url: '/majors-container',
        templateUrl: BASE + 'templates/majors.container.html',
        controller: 'AddMajorController'
  }).
  state('root.guru-courses-container', {
        url: '/guru-courses-container',
        templateUrl: BASE + 'templates/guru.courses.container.html',
        controller: 'CoursesController'
  }).
  state('root.signup', {
        url: '/signup',
        templateUrl: BASE + 'templates/signup.html',
        controller: 'SignupController'
  }).
  state('root.guru-remote', {
    url:'/guru-remote',
    templateUrl: BASE + 'templates/guru.remote.html',
    controller: 'GuruRemoteController'
  }).
  state('root.guru-languages', {
    url:'/guru-languages',
    templateUrl: BASE + 'templates/guru.languages.container.html',
    controller: 'LanguagesController'
  }).
  state('root.guru-experiences', {
    url:'/guru-experiences',
    templateUrl: BASE + 'templates/guru.experiences.container.html',
    controller: 'ExperiencesController'
  }).
  state('root.payments', {
        url: '/payments:cardObj',
        templateUrl: BASE + 'templates/payments.html',
        controller: 'PaymentsController'
  }).
  state('root.home', {
        url: '/new-home',
        templateUrl: BASE + 'templates/home.html',
        controller: 'HomeController'
  }).
  state('root.guru', {
        url: '/guru',
        templateUrl: BASE + 'templates/guru.html',
        controller: 'GuruController'
  }).
  state('root.cashout', {
        url: '/cashout',
        templateUrl: BASE + 'templates/guru.cashout.html',
        controller: 'GuruCashoutController'
  }).
  state('root.guru-questions', {
        url: '/guru-questions',
        templateUrl: BASE + 'templates/guru.questions.html',
        controller: 'GuruQuestionsController'
  }).
  state('root.become-guru', {
        url: '/become-guru',
        templateUrl: BASE + 'templates/become.guru.html',
        controller: 'BecomeGuruController'
  }).
  state('root.courses', {
        url: '/courses',
        templateUrl: BASE + 'templates/courses.html',
        controller: 'CoursesController'
  }).
  state('root.gpa', {
        url: '/gpa',
        templateUrl: BASE + 'templates/dev/gpa.html',
        controller: 'gpaController'
  }).
  state('root.student-session', {
        url: '/student-session:sessionObj',
        templateUrl: BASE + 'templates/student.session.html',
        controller: 'StudentSessionController'
  }).
  state('root.guru-session', {
        url: '/guru-session:sessionObj',
        templateUrl: BASE + 'templates/guru.session.html',
        controller: 'GuruSessionController'
  }).
  state('root.onboarding', {
        url: '/onboarding',
        templateUrl: BASE + 'templates/onboarding.html',
        controller: 'OnboardingController'
  }).
  state('root.browse', {
        url: '/browse',
        templateUrl: BASE + 'templates/browse.html',
        // controller: 'BrowseController'
  }).
  state('root.guru-ranking', {
        url: '/guru-ranking',
        templateUrl: BASE + 'templates/guru.ranking.html',
        controller: 'GuruRankingController'
  }).
  state('root.guru-tasks', {
        url: '/guru-tasks',
        templateUrl: BASE + 'templates/guru.tasks.html',
        controller: 'GuruTaskController'
  }).
  state('root.guru-profile', {
        url: '/guru-profile',
        templateUrl: BASE + 'templates/guru.profile.html',
        controller: 'GuruProfileController'
  }).
  state('root.guru-courses', {
        url: '/guru-courses',
        templateUrl: BASE + 'templates/guru-courses.html',
        controller: 'CoursesController'
  }).
  state('root.messages', {
        url: '/messages/:sessionObj',
        templateUrl: BASE + 'templates/student.messages.html',
        controller: 'StudentMessagesController'
  }).
  state('root.student-conversations', {
        url: '/student-conversations',
        templateUrl: BASE + 'templates/student.conversations.html'
  }).
  state('root.bill-student', {
        url: '/bill-student',
        templateUrl: BASE + 'templates/guru.bill-student.html',
        controller: 'BillStudentController'
  }).
  state('root.test-error', {
        url: '/test-error',
        templateUrl: BASE + 'templates/guru.bill-student.html',
        controller: function($scope) {
          throw "Test error";
        }
  }).
  state('root.access', {
        url: '/access',
        templateUrl: BASE + 'templates/access.html',
        controller: 'AccessController'
  }).
  state('root.guru-conversations', {
        url: '/guru-conversations',
        templateUrl: BASE + 'templates/guru.conversations.html'
  });



  $urlRouterProvider.otherwise('/access');


});

var checkForAppUpdates = function (Version, $ionicHistory, $templateCache, $localstorage) {

            Version.getUpdatedVersionNum().then(
              //if user gets the right version
              function(response) {
                    var serverVersionNumber = JSON.parse(response).version;
                    console.log('server number', serverVersionNumber);
                    var currentVersion = Version.getVersion();

                    //if brand new user with no version set
                    if ((typeof currentVersion) === "undefined") {
                      // console.log('First time opening app - set version to 1.0');
                      currentVersion = 1.0;
                      Version.setVersion(1.0);
                    }



                    if (serverVersionNumber != currentVersion) {


                      console.log('versions are different...\n');

                      $ionicHistory.clearCache();
                      $ionicHistory.clearHistory();
                      $localstorage.removeObject('user');
                      $localstorage.removeObject('courses');
                      $localstorage.removeObject('universities');

                      if ($cordovaSplashscreen) {
                        $cordovaSplashscreen.show();
                      }
                      $templateCache.removeAll();
                      window.localStorage.clear();
                      //remove all angular templates


                      Version.setVersion(serverVersionNumber);
                      $localstorage.set('recently_updated', true);



                      console.log('V' + serverVersionNumber + 'stored to user');




                      window.location.href = BASE_URL;
                      window.location.replace(true);


                    }
               },

               //connectivity issues
              function(error) {
                  console.log(error);
                  console.log('Version not loaded');
              }
          );
        };
//background loading stuff


var processSkills = function($scope) {

  if ($scope.static.skills && $scope.static.skills.length > 0) {

        $scope.static.professional_skills = [];
        $scope.static.specialized_skills = [];
        $scope.static.chores_skills = [];
        $scope.static.labor_skills = [];

        for (var i = 0; i < $scope.static.skills.length; i ++) {
          var skill = $scope.static.skills[i];
          if (skill.category === 'labor') {
            $scope.static.labor_skills.push(skill);
          }
          if (skill.category === 'specialized') {
            $scope.static.specialized_skills.push(skill);
          }
          if (skill.category === 'chores') {
            $scope.static.chores_skills.push(skill);
          }
          if (skill.category === 'professional') {
            $scope.static.professional_skills.push(skill);
          }
        }
    }
    console.log('skills processed');
}

var on_app_open_retrieve_objects = function($scope, $state, $localstorage, University, callback, Geolocation, Major, Skill, Profession) {
  console.log('getting university from server');
  // $cordovaSplashscreen.hide();
  University.get().then(
      function(universities) {
          console.log('universities successfully loaded');
          universities = JSON.parse(universities);
          $scope.static.universities = universities;
          $localstorage.setObject('universities', $scope.static.universities);
          console.log($scope.static.universities.length + ' universities successfully loaded');
          if ($scope.user && $scope.user.position && $scope.user.position.coords) {
          getNearestUniversity($scope.user.position.coords.latitude, $scope.user.position.coords.longitude, $scope.static.universities, 100,
              $localstorage, $scope, callback, $state);
          } else
          if ($scope && $scope.platform && $scope.platform.android) {
            Geolocation.getUserPosition($scope, null, null, $state);
          }
      },
      function() {
          console.log('Universities NOT successfully loaded');
      }
  );

  Major.get().then(
    function(majors) {
        console.log('Majors successfully loaded');
        majors = JSON.parse(majors)["majors"];

        $scope.static.majors = majors;
        $localstorage.setObject('majors', majors);
        $scope.static.popular_majors = majors.slice(0,16);
        $localstorage.setObject('popular_majors', $scope.static.popular_majors);
    },
    function() {
        console.log('Majors NOT successfully loaded');
    }
  );

  Skill.get().then(function(skills) {
    var skills = skills.plain();
    $scope.static.skills = skills;
    $localstorage.setObject('skills', skills);
    $scope.static.popular_skills = skills.slice(0, 16);
    $localstorage.setObject('popular_skills', $scope.static.popular_skills);
    processSkills($scope);

  },
  function() {
    console.log('Skills NOT successfully loaded');
  })

  Profession.get().then(function(professions) {
    var professions = professions.plain();
    $scope.static.professions = professions;
    $scope.static.popular_professions = professions.slice(0, 16);
    $localstorage.setObject('professions', $scope.static.professions);
    $localstorage.setObject('popular_professions', $scope.static.popular_professions);
    console.log(professions.length, 'professions loaded')
  },
  function() {
    console.log('professions NOT successfully loaded');
  })


}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

var getNetworkSpeed = function() {

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);

    return networkState;

}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function getNearestUniversity(user_lat, user_long, uni_list, limit, local_storage, $scope, callback, $state) {


    var sort = function(array) {
      var len = array.length;
      if(len < 2) {
        return array;
      }
      var pivot = Math.ceil(len/2);
      var results = merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
      return results;
    };

    var merge = function(left, right) {
      var result = [];
      while((left.length > 0) && (right.length > 0)) {


            uni_1_lat = left[0].location.latitude;
            uni_1_long = left[0].location.longitude;
            uni_2_lat = right[0].location.latitude;
            uni_2_long = right[0].location.longitude;

            d1 = getDistanceFromLatLonInKm(user_lat, user_long, uni_1_lat, uni_1_long);
            d2 = getDistanceFromLatLonInKm(user_lat, user_long, uni_2_lat, uni_2_long);
            left[0].miles = parseInt(d1 / 0.62 * 10) / 10;
            right[0].miles = parseInt(d2 / 0.62 * 10) / 10;
            if ( d1 < d2 ) {
                result.push(left.shift());
            }
            else {
              result.push(right.shift());
            }
      }

      result = result.concat(left, right);
      return result;
    };

    var largeList = sort(uni_list);

    // $scope.nearest_universities = largeList;
    $scope.static.nearest_universities = largeList;
    if (callback) {
      callback($scope, $state);
    }

    return largeList.slice(0,10);

};