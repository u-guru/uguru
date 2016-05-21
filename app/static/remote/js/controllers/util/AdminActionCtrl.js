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

    $scope.search = {text: ''};

    $scope.team_members = [{
                name: "Jeselle",
                first_name: 'jeselle',
                profile_url: 'https://uguru.me/static/web/images/team/jeselle.png',
                priorities: {
                    components: ['tabs', 'steps', 'dropdown', 'refresher']
                }
            },
            {
                name: "Gabrielle",
                first_name: 'gabrielle',
                profile_url: 'https://uguru.me/static/web/images/team/gabrielle.png'
            },
            {
                name: "Jason",
                first_name: 'jason',
                profile_url: 'https://uguru.me/static/web/images/team/jason.png'
            },
            {
                name: 'Samir',
                first_name: 'samir',
                profile_url: 'https://uguru.me/static/web/images/team/samir.png',
                responsibilities: "Dev, Product Specs, Everything else"
            }]



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
        routes: getRoutes('jeselle', 'jeselle/index.html', 'controllers/util/JeselleController.js'),
        spec: getSpec('calendar'),
        bugs: getBugInfo('calendar'),
        members: ['jeselle:priority', 'samir', 'gabrielle:complete', 'jason']
      },
      {
        title: 'Gabrielle Portfolio',
        controller: 'GabrielleController',
        routes: getRoutes('gabrie', 'gabrie/index.html', 'controllers/util/GabrielleController.js'),
        spec: getSpec('calendar'),
        bugs: getBugInfo('calendar'),
        members: ['jeselle']
      },
      {
        title: 'Academic Guru Profile',
        controller: 'GuruProfileController',
        routes: getRoutes('guru-profile', 'guru.profile.html', 'controllers/guru/guru.profile.ctrl.js'),
        spec: getSpec('guru-profile'),
        bugs: getBugInfo('guru-profile'),
        members: ['jeselle']
      },
      {
        title: 'Bakery Guru Profile',
        controller: 'GuruProfileController',
        routes: getRoutes('guru-profile', 'guru.profile.html', 'controllers/guru/guru.profile.ctrl.js'),
        spec: getSpec('guru-profile'),
        bugs: getBugInfo('guru-profile'),
        members: ['jeselle', 'samir']
      },

    ];



    $scope.parseMember = function(member_name) {

      var first_name = member_name.split(':')[0];
      var member = JSON.parse(JSON.stringify(getMemberFromFirstName(first_name)));

      var args = null;
      if (member_name.split(':').length > 1) {
        args = member_name.split(':')[1];
        if (args === 'priority') {
          member.priority = true;
          member.value = 0;
        }
        else if (args === 'complete') {
          member.complete = true;
          member.value = 2;
        }
      } else {
        member.value = 1;
      }
      return member;

      function getMemberFromFirstName(name) {
        for (var i = 0; i < $scope.team_members.length; i++) {
          if ($scope.team_members[i].first_name.toLowerCase() === name.toLowerCase()) {
            return $scope.team_members[i];
          }
        }
      }
    }

    for (var i = 0; i < $scope.user_workflows.length; i++) {
      var indexWF = $scope.user_workflows[i];
      if (indexWF.members && indexWF.members.length) {
        for (var j =0; j < indexWF.members.length; j++) {
          var indexMember = indexWF.members[j];
          var memberString = indexWF.members.splice(j, 1)[0];
          indexWF.members.unshift($scope.parseMember(memberString));
        }
      }
    }
    console.log($scope.user_workflows);

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
      var stagingUrl = defaultRoutes.staging;
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
            title                 : flow.title,
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
          requestUrl = flow.routes.staging.url.split('#/')[0] + 'static/remote/templates/' + flow.routes.codepen.template_url;
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