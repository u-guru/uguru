angular.module('uguru.util.controllers')

.controller('CalendarController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicSlideBoxDelegate',
  'CalendarService',
  'KeyboardService',
  '$window',
  function($scope, $state, $timeout, $localstorage, $ionicSlideBoxDelegate, CalendarService, KeyboardService, $window) {
    var gDocUrl = 'https://docs.google.com/document/d/1Xsnsv2cZTvRtUPv9NWXJDG5mMyYYi_RmDZkGsve6xLU/edit'
    var cpFiles = [
      'https://uguru-rest-test.herokuapp.com/static/remote/lib/ionic/js/ionic.bundle.min.v2.js',
      'https://uguru-rest-test.herokuapp.com/static/remote/js/constants.js',
      'https://uguru-rest-test.herokuapp.com/static/remote/lib/restangular.js',
      'https://uguru-rest-test.herokuapp.com/static/remote/js/controllers/util/util.root.ctrl.js'

    ];

    // $scope.$on('$ionicView.loaded', function() {
      $scope.calendar = CalendarService.getNextSevenDaysArr()
      KeyboardService.initOptionPressedAndReleasedFunction(toggleDev, null, 68, 'd', true, null);
      KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 83, 's', true, null);
      KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 27, 'esc', true, null);
      initDevOptions();
    // })

    function toggleDev() {
      $scope.dev.toggleDev = !$scope.dev.toggleDev;
      console.log('setting dev to', $scope.dev.toggleDev);
    }
    function toggleSpec() {
      $scope.dev.toggleSpec = !$scope.dev.toggleSpec;
    }

    $scope.openDocInNewTab = function(){
      $window.open(gDocUrl, '_blank');
    };

    $scope.codepenData = {
      title                 : "Uguru Calendar",
      description           : "Most updated version",
      private               : true, // true || false
      tags                  : [], // an array of strings
      editors               : "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
      layout                : "right", // top | left | right
      html                  : document.querySelector('#uguru-view').innerHTML,
      html_pre_processor    : "",
      css                   : "html { color: red; }",
      css_pre_processor     : "scss",
      css_starter           : "neither",
      css_prefix            : "autoprefixer",
      js                    : "_local=true;",
      js_pre_processor      : "none",
      html_classes          : null,
      head                  : "<meta name='viewport' content='width=device-width'><script>_local=true;_startpage='calendar';</script>",
      css_external          : "https://uguru-rest-test.herokuapp.com/static/remote/css/app_version.css", // semi-colon separate multiple files
      js_external           : cpFiles.join(';'), // semi-colon separate multiple files
      css_pre_processor_lib : null,
      js_modernizr : null,
      js_library   : null,
    }


    function initDevOptions() {
      $scope.dev = {
        viewsDropdown: {},
        screenSizesDropdown: {label: "screen sizes", size: "small", options: ["desktop", "mobile"], selectedIndex:0, onOptionClick: switchScreenSize},
      }


      function switchScreenSize() {

      }
    }
  }

])