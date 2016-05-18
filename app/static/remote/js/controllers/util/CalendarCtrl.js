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
    var gDocUrl = 'https://docs.google.com/document/d/1Xsnsv2cZTvRtUPv9NWXJDG5mMyYYi_RmDZkGsve6xLU/edit';
    var codepenSpecUrl = 'http://codepen.io/teamuguru/pen/ddd2f97039f2fec817d52499dd3c00ac.js';
    var cpFiles = [
      'https://uguru-rest-test.herokuapp.com/static/remote/js/min.app.js'
    ];

    $scope.dev = {
        viewsDropdown: {},
        screenSizesDropdown: {label: "screen sizes", size: "small", options: ["desktop", "mobile"], selectedIndex:0, onOptionClick: switchScreenSize},
        toggleDev: false,
        toggleSpec: false
    }

    $scope.spec = {};

    // $scope.$on('$ionicView.loaded', function() {
      $timeout(function() {
        $scope.calendar = CalendarService.getNextSevenDaysArr()
        KeyboardService.initOptionPressedAndReleasedFunction(toggleDev, null, 68, 'd', true, null);
        KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 83, 's', true, null);
        KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 27, 'esc', true, null);
        if (window.location.href.split('codepen').length === 1) {
          $timeout(function() {
            loadCodepenSpec();
            generateCodePenData();
          }, 2000);
        }
      }, 1000)
    // })

    function loadCodepenSpec() {
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', codepenSpecUrl, true );

      xhr.onload = function () {
          $scope.spec = JSON.parse(xhr.responseText);

          $timeout(function() {
            $scope.$apply();
          });
      };
      xhr.send();

    }

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

    $scope.openCodepenSpec = function() {
      $window.open(codepenSpecUrl.replace('.js','') + '/?editors=0010', '_blank');
    }

    function getHtmlString() {
      var calendar_view_html = document.querySelector('#calendar-view').parentNode.innerHTML;
      return '<body ng-app="uguru" animation="slide-left-right-ios7"><ui-view id="uguru-view"><script type="text/ng-template" id="calendar.html">' + calendar_view_html + '</div></script></ui-view></body>'
    }
    function generateCodePenData () {

      $scope.codepenData = {
        title                 : "Uguru Calendar",
        description           : "Most updated version",
        private               : true, // true || false
        tags                  : [], // an array of strings
        editors               : "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
        layout                : "right", // top | left | right
        html                  : getHtmlString(),
        html_pre_processor    : "",
        css                   : "html { color: red; }",
        css_pre_processor     : "css",
        css_starter           : "neither",
        css_prefix            : "none",
        js                    : "//import this extra file manually https://codepen.io/teamuguru/pen/ONePXN.js",
        js_pre_processor      : "none",
        html_classes          : null,
        head                  : "<meta name='viewport' content='width=device-width'><script>_local=false;_startpage='calendar';</script>",
        css_external          : "https://uguru-rest-test.herokuapp.com/static/remote/css/app_version.css",
        js_external           : 'https://uguru-rest-test.herokuapp.com/static/remote/js/u.base.js;https://uguru-rest-test.herokuapp.com/static/remote/js/main.min.js',
        css_pre_processor_lib : null,
        js_modernizr : null,
        js_library   : null,
      }

    }

    console.log('controller has loaded');

    function switchScreenSize() {
      return;
    }


  }

])