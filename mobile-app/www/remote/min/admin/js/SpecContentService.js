angular
.module('uguru.admin')
.factory("SpecContentService", [
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  SpecContentService
  ]);

function SpecContentService($state, $timeout, $localstorage, $window) {
    var allSpecs = {};
    var allAdminSpecs = {};
    var adminFeedbackArr = ["no docs", "Staging is down", "localhost doesnt work", "override app.css on cp", "dev-toolbar is not working"];
    var adminToolSpec = ["searchable docs", "", "strip data from spec", "univeral per-svg reference", "too many tool-switching (i.e. bounce.js", "upcoming moodbard (no implemented yet)", "todo:learn more about codepen collab", "todsicuss: dev wiki", "default codepen window size ext", "svg bit map", "more robust animation + pause tools", "normlizer"];
    allSpecs.preApp = {
            "workflows":[
              {
                title: 'App Loader Bakery',
                routes: getRoutes('dev/splash/loaders', 'preapp/templates/loaders/main.html', 'preapp/css/scss/loader.scss'),
                spec: getSpec('loader'),
                bugs: getBugInfo('loader'),
                ready:true
              },
              {
                title: 'Madlib Selection',
                controller: 'SplashMadlibController',
                routes: getRoutes('dev/splash/madlib', 'preapp/templates/splash.madlib.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Academic Guru Profile',
                controller: 'GuruProfileController',
                routes: getRoutes('dev/admin/profiles/academic', 'shared/templates/guru.profile.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Tech Guru Profile',
                controller: 'GuruProfileController',
                routes: getRoutes('dev/admin/profiles/tech', 'shared/templates/guru.profile.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Baking Guru Profile',
                controller: 'GuruProfileController',
                routes: getRoutes('dev/admin/profiles/baking', 'shared/templates/guru.profile.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Household Guru Profile',
                controller: 'GuruProfileController',
                routes: getRoutes('dev/admin/profiles/household', 'shared/templates/guru.profile.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Photography Guru Profile',
                controller: 'GuruProfileController',
                routes: getRoutes('dev/admin/profiles/photo', 'shared/templates/guru.profile.html'),
                spec: getSpec('madlib'),
                bugs: getBugInfo('User selects a splash tag'),
                ready:true
              },
              {
                title: 'Nav Controller',
                controller: 'NavController',
                routes: getRoutes('/dev/nav/', 'preapp/templates/nav.html', 'preapp/js/SplashNavController.js'),
                spec: getSpec('nav'),
                bugs: getBugInfo('nav'),

              },
              {
                title: 'Device Controller',
                controller: 'SplashDeviceController',
                routes: getRoutes('/dev/device/', 'preapp/templates/device.html', 'preapp/js/SplashDeviceController.js'),
                spec: getSpec('device'),
                bugs: getBugInfo('device'),
              },
              {
                title: "Jeselle's Portfolio",
                controller: 'JeselleController',
                routes: getRoutes('dev/jeselle', 'jeselle/templates/index.html', 'jeselle/js/JeselleCtrl.js'),
                spec: getSpec('jeselle'),
                bugs: getBugInfo('jeselle'),
                ready:true
              },
              {
                title: "Gabrielle's Portfolio",
                controller: 'GabrielleController',
                routes: getRoutes('dev/gabrielle', 'gabrielle/templates/index.html', 'gabrielle/templates/GabrielleCtrl.js'),
                spec: getSpec('gabrielle'),
                bugs: getBugInfo('gabrielle'),
                ready:true
              }
              ]
            //   {
            //     title: 'splash',
            //     dependencies: ['FakeDataService'],
            //     controller: 'SplashController',
            //     bugs: getBugInfo('splash')
            //   },
            //   {
            //     title: 'GenericGuruProfile',
            //     dependencies: ['FakeDataService'],
            //     controller: 'GuruProfileController'
            //   },
            //   {
            //     title: 'DeviceDemoController',
            //     dependencies: ['GenericGuruProfile']
            //   },
            //   {
            //     title: 'SplashLoaderController',
            //     priority: 1
            //   },
            //   {
            //     title: 'UniversitySearchController',
            //   },
            //   {
            //     title: 'SplashMadLibController',
            //     priority: 1
            //   },
            //   {
            //     title: 'SplashMapController'
            //   },
            //   {
            //     title: 'SplashTransitions',
            //     description: ['Loader:SplashMadLibController']
            //   },
            //   {
            //     title: 'HowItWorksController'
            //   },
            //   {
            //     title: 'BecomeGuruController'
            //   },
            //   {
            //     title: 'SignupController',
            //     notes: 'Needs Refactoring'
            //   },
            //   {
            //     title: 'AccessController'
            //   },
            //   {
            //     title: 'DemographicsController'
            //   },
            //   {
            //     title: 'GettingStartedController'
            //   }
            // ]
    }

    allAdminSpecs.preApp = [
        {
            title: 'Organize', description: 'depth first pre-app', priority: 1
        },
        {
            title: 'Organize Ctrl, Loader, Splash Madlib', description: 'Depth First', priority: 1,
            tags: ['perfect lightweight base', 'loader mvp + spec']
        },
        {
            title: 'Reflects, Best Practices->Docs, Requirements', description: 'Depth First', priority: 1,
            tags: ['perfect lightweight base', 'loader mvp + spec']
        },
        {
            title: 'Modules: Scroll, Moving Tour Service', description: 'Depth First', priority: 2,
            tags: ['perfect lightweight base', 'loader mvp + spec']
        },
        {
            title: 'Tool: Splash Madlib', description: 'Depth First', priority: 2
        },
        {
            title: 'Pre-App Remainder Spec', description: 'Depth First', priority: 3
        },
        {
            title: 'Cleanup Codebase', description: 'directory structure', priority: 3
        },
        {
            title: 'Organize Calendar', description: 'directory structure', priority: 3
        },
    ]

    function getContentSpec(key) {

        // if (key in allSpecs) {

        return allSpecs[key]['workflows']
        // }
    }

    function getContentSpecAdmin(key) {
        return allAdminSpecs[key]
    }

    return {
        getContentSpec: getContentSpec,
        getContentSpecAdmin: getContentSpecAdmin,
        getTeamMembers: getTeamMembers,
        getStatusSpec: getStatusSpec
    }

    function getStatusSpec() {
        return {

            feedback: adminFeedbackArr,
            requested_tools: adminToolSpec

        }
    }



    function getTeamMembers() {
        return [{
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
            }];
    }

    function getRoutes(param, template_url, ctrl_url) {
    var defaultRoutes = {
          local: '/#/',
          staging: 'https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/#/'
        }
        var localUrl = defaultRoutes.local + param;
        var stagingUrl = defaultRoutes.staging + param;
        console.log(param);
        return {
            local: {url: localUrl, launch: launchSeparateWindowFunc(localUrl)},
            staging: {url: stagingUrl, launch: launchSeparateWindowFunc(stagingUrl)},
            codepen: {launch: launchCodepenFunc(), template_url: template_url, ctrl_url:ctrl_url}
        }
    }
    function launchSeparateWindowFunc(url) {
      return function() {
        $window.open(url, '_blank');
      }
    }

    function getBugInfo(wkflow_name) {
      var id = 0;
      // console.log($scope)
      for (var i = 0; i < wkflow_name.length ; ++ i) {
        id += wkflow_name.charCodeAt(i);
      }
      return {
        count: 1,
        stateID: id,
        launchBugTab: function() {
          // console.log("ID",this.bugID)
          var url = document.URL +'/bugs/'+this.stateID;
          $window.open(url);
          // alert('coming soon');
        }
      }
    }
    
    function getSpec(wkflow_name) {
      // codepenSpecUrl.replace('.js','') + '/?editors=0010'
      return {launch: wkflow_name, progress:'78%'};
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
            // $scope.$apply();
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
              // $scope.$apply();
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
