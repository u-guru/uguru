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
  '$compile',
  'SpecService',
  function($scope, $state, $timeout, $localstorage, $ionicSlideBoxDelegate, CalendarService, KeyboardService, $window, $compile, SpecService) {
    var gDocUrl = 'https://docs.google.com/document/d/1Xsnsv2cZTvRtUPv9NWXJDG5mMyYYi_RmDZkGsve6xLU/edit';
    var codepenSpecUrl = 'http://codepen.io/teamuguru/pen/ddd2f97039f2fec817d52499dd3c00ac.js';
    var cpFiles = [
      'https://uguru-rest-test.herokuapp.com/static/remote/js/min.app.js'
    ];

    $scope.dev = {
        viewsDropdown: {},
        screenSizesDropdown: {label: "screen sizes", size: "small", options: ["desktop", "mobile"], selectedIndex:0, onOptionClick: switchScreenSize},
        toggleDev: false,
        toggleSpec: true
    }

    $scope.spec = {};
    var originalHTML = document.querySelector('#calendar-view').parentNode.innerHTML + "";

    $scope.calendar = CalendarService.getNextSevenDaysArr()
    // $scope.$on('$ionicView.loaded', function() {
      $timeout(function() {
        loadHTMLSpec();
        if (window.location.href.split('codepen').length === 1) {
          $timeout(function() {
            // loadCodepenSpec();
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

    function loadHTMLSpec() {
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', 'https://uguru-rest-test.herokuapp.com/static/remote/templates/calendar.html', true );

      xhr.onload = function () {
          $scope.rawHTML = xhr.responseText;

          $timeout(function() {
            $scope.$apply();
          });
      };
      xhr.send();
    }



    $scope.openDocInNewTab = function(){
      $window.open(gDocUrl, '_blank');
    };

    $scope.openCodepenSpec = function() {
      $window.open(codepenSpecUrl.replace('.js','') + '/?editors=0010', '_blank');
    }

    function getHtmlString() {
      var calendarView = document.querySelector('#calendar-view').parentNode;
      var calendar_view_html = angular.element(calendarView).contents()[1].innerHTML;
      return '<body ng-app="uguru" animation="slide-left-right-ios7"><script src="https://uguru-rest-test.herokuapp.com/static/remote/js/u.base.js"></script><script src="https://uguru-rest-test.herokuapp.com/static/remote/js/main.min.js"></script><script src="https://codepen.io/teamuguru/pen/ONePXN.js"></script><ui-view id="uguru-view"><script type="text/ng-template" id="calendar.html">' + $scope.rawHTML + '</div></script></ui-view></body>'
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
        css_pre_processor     : "none",
        css_starter           : "neither",
        css_prefix            : "none",
        js                    : "//import this extra file manually https://codepen.io/teamuguru/pen/ONePXN.js",
        js_pre_processor      : "none",
        html_classes          : null,
        head                  : "<meta name='viewport' content='width=device-width'>",
        css_external          : "https://uguru-rest-test.herokuapp.com/static/remote/css/app_version.css",
        js_external           : '',
        css_pre_processor_lib : null,
        js_modernizr : null,
        js_library   : null,
      }

    }

    console.log('controller has loaded');

    function switchScreenSize() {
      return;
    }
    $scope.spec = {};
    SpecService.initSpec($scope, '#calendar-view', 'calendar', 'calendar.html', 'controllers/util/CalendarCtrl.js');

  }

])