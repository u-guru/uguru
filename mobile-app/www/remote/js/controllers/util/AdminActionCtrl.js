angular.module('uguru.util.controllers')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  function($scope, $state, $timeout, $localstorage, $window) {
    //spec service get all
    var defaultRoutes = {
      local: 'http://localhost:8100/#/',
      staging: 'https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/'
    }

    $scope.user_workflows = [
      {
        title: 'User selects a splash tag',
        controller: 'SplashController',
        routes: getRoutes('splash', 'splash.html'),
        spec: getSpec('splash'),
        bugs: getBugInfo('splash')
      },
      {
        title: 'General Calendar',
        controller: 'CalendarController',
        routes: getRoutes('calendar', 'calendar.html', 'controllers/util/CalendarCtrl.js'),
        spec: getSpec('calendar'),
        bugs: getBugInfo('calendar')
      },
      {
        title: 'Jeselle Portfolio',
        controller: 'JeselleController',
        routes: getRoutes('jeselle', 'jeselle.html', 'controllers/util/JeselleController.js'),
        spec: getSpec('calendar'),
        bugs: getBugInfo('calendar')
      }

    ];

    function launchSeparateWindowFunc(url) {
      return function() {
        $window.open(url, '_blank');
      }
    }

    function getBugInfo(wkflow_name) {
      return {
        count: 1,
        launchBugTab: function() {
          alert('coming soon');
        }
      }
    }

    function getSpec(wkflow_name) {
      // codepenSpecUrl.replace('.js','') + '/?editors=0010'
      return {launch: wkflow_name, progress:'78%'};
    }

    function getRoutes(param, template_url, ctrl_url) {
      var localUrl = defaultRoutes.local + param;
      var stagingUrl = defaultRoutes.staging + param;
      return {
        local: {url: localUrl, launch: launchSeparateWindowFunc(localUrl)},
        staging: {url: stagingUrl, launch: launchSeparateWindowFunc(stagingUrl)},
        codepen: {launch: launchCodepenFunc(), template_url: template_url, ctrl_url:ctrl_url}
      }
    }
    function launchCodepenFunc() {
      return function(flow, $event) {
        console.log('flow', flow);
          flow.codepenData = {
            title                 : "Uguru Calendar",
            description           : "Most updated version",
            private               : true, // true || false
            tags                  : [], // an array of strings
            editors               : "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
            layout                : "right", // top | left | right
            html                  : '',
            html_pre_processor    : "",
            css                   : "html { color: red; }",
            css_pre_processor     : "none",
            css_starter           : "neither",
            css_prefix            : "none",
            js                    : "//import this extra file manually https://codepen.io/teamuguru/pen/ONePXN.js",
            js_pre_processor      : "none",
            html_classes          : null,
            head                  : "<meta name='viewport' content='width=device-width'>",
            css_external          : "https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/css/app_version.css",
            js_external           : '',
            css_pre_processor_lib : null,
            js_modernizr : null,
            js_library   : null,
        }
        getHTMLString(flow, getLaunchCB($event.target.parentNode));
      }

      function getLaunchCB($event) {
        return function() {
          $timeout(function() {
            $scope.$apply();
            var elem = $event.querySelectorAll('input');
            elem[0].click();
            elem[1].click();
            angular.element(elem[0]).triggerHandler('click');
            angular.element(elem[1]).triggerHandler('click');
          })
        }
      }

      function getHTMLString(flow, cb) {
        var requestUrl = '';
        if (window.location.href.split(':8100').length > 1) {
          requestUrl = flow.routes.local.url.split('#/')[0] + 'remote/templates/' + flow.routes.codepen.template_url;
        } else {
          requestUrl = flow.routes.staging.url + 'static/remote/templates/' + flow.routes.codepen.template_url;
        }
        loadHTMLSpec(flow, requestUrl, cb);
      }

      function loadHTMLSpec(flow, template_url, cb) {
        console.log('fetching...', template_url);
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', template_url, true );

        xhr.onload = function () {
            flow.codepenData.html = wrapMinUguruHtml(xhr.responseText, flow.routes.codepen.ctrl_url);

            $timeout(function() {
              $scope.$apply();
              $timeout(function() {
                cb && cb()
              }, 500);
            });
        };
        xhr.send();
      }

      function wrapMinUguruHtml(response_html, relative_ctrl_url) {
        return '<body ng-app="uguru" animation="slide-left-right-ios7"><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/u.base.js"></script><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/main.min.js"></script><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/' + relative_ctrl_url + '"></script><ui-view id="uguru-view"><script type="text/ng-template" id="calendar.html">' + response_html + '</div></script></ui-view></body>'
      }

    }

  }

])