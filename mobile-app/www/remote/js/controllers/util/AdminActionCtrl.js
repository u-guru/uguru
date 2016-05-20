angular.module('uguru.util.controllers')

.controller('AdminActionController', [
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  'FileService',
  'CTAService',
  function($scope, $state, $timeout, $localstorage, $window,FileService,CTAService) {
    //spec service get all
    var defaultRoutes = {
      local: 'http://localhost:8100/#/',
      staging: 'https://uguru-rest-test.herokuapp.com/#/'
    }
    $scope.closePlatform = function(){
      element = document.querySelector('#cta-modal-platforms')
      className = element.className.replace('show','')
      element.className = className;
    }
    $scope.openPlatforms = function($event,tests,index){
      var targetElem = $event.target;
      $scope.tests = tests;
      $scope.tests.index = index
      // $scope.backup_bug = angular.copy(bug);
      $scope.lastCTABoxTargetElem = targetElem;
      $scope.lastCTABoxTargetElem.id = 'cta-box-platforms';
      CTAService.initSingleCTA('#' + targetElem.id, '#main-state-content');

      $timeout(function() {
        var targetElem = document.querySelector('#cta-box-platforms');
        var modalElem = document.querySelector('#cta-modal-platforms');
        modalElem && modalElem.classList.add('show');
      })
    }

    $timeout(function() {
      $scope.user_workflows = []
      loadUpdatedWorkflowFile($scope);
    })
 



    // $scope.user_workflows = [
    //   {
    //     title: 'User selects a splash tag',
    //     controller: 'SplashController',
    //     routes: getRoutes('splash', 'splash.html'),
    //     spec: getSpec('splash'),
    //     // layout: getLayout('splash'),
    //     bugs: getBugInfo('splash')
    //   },
    //   {
    //     title: 'General Calendar',
    //     controller: 'CalendarController',
    //     routes: getRoutes('calendar', 'calendar.html', 'controllers/util/CalendarCtrl.js'),
    //     spec: getSpec('calendar'),
    //     // layout: getLayout('calendar'),
    //     bugs: getBugInfo('calendar')
    //   }
    // ];

    setTimeout(function() {
      console.log('workflows: ',$scope.user_workflows)
      initWorkflows($scope.user_workflows)
      // console.log('workflows: ',$scope.user_workflows)
      
    },2000)

    function initWorkflows(workflows){
        for (var i = 0 ; i< workflows.length ;++ i){
          var name = workflows[i].name
          workflows[i].routes = getRoutes(workflows[i].url,workflows[i].file_name)
          workflows[i].spec = getSpec(name)
          workflows[i].bugs = getBugInfo(name)
        }
    }
    function loadUpdatedWorkflowFile($scope){
      FileService.getS3JsonFile(null, 'https://s3.amazonaws.com/uguru-admin/master/layouts/splash.json', callbackFunc)
      function callbackFunc(name, resp) {
        resp.isExpand = false
        $scope.user_workflows.push(resp)
        LoadingService.hide()
        $timeout(function() {
         LoadingService.showSuccess(resp.length + ' Spec loaded', 1000) ;
        })
      }
      
    }
    function getSteps(name){
      return 'hi'
    }

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
            css_external          : "https://uguru-rest-test.herokuapp.com/static/remote/css/app_version.css",
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
          requestUrl = flow.routes.local.staging.split('#/')[0] + '/static/remote/templates/' + flow.routes.codepen.template_url;
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
        return '<body ng-app="uguru" animation="slide-left-right-ios7"><script src="https://uguru-rest-test.herokuapp.com/static/remote/js/u.base.js"></script><script src="https://uguru-rest-test.herokuapp.com/static/remote/js/main.min.js"></script><script src="https://uguru-rest-test.herokuapp.com/static/remote/js/' + relative_ctrl_url + '"></script><ui-view id="uguru-view"><script type="text/ng-template" id="calendar.html">' + response_html + '</div></script></ui-view></body>'
      }

    }

  }

])