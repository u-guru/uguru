angular
.module('sharedServices')
.factory("SpecService", [
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  '$compile',
  'KeyboardService',
  SpecService
  ]);

function SpecService($state, $timeout, $localstorage, $window, $compile, KeyboardService) {
    var specTokens = {'calendar': 'ddd2f97039f2fec817d52499dd3c00ac', 'jeselle': '98f138f534428eb8af27ea5c2b6944ef', 'gabrie': '9d8ddaef35241c63a3a95032485bf645'};

    return {
        initSpec: initSpec,
        getSpec: getSpec
    }

    function initSpec(scope, parent_container, param, template_path, ctrl_path) {
        //checks codepen environment
        if (window.location.href.split('codepen.io').length > 1) return;

        var specObj = getSpec(param, template_path, ctrl_path);
        var callbackFunc = getInstantiateAndInjectFunc(scope, specObj, parent_container)
        console.log('spec obj', specObj.url, specObj, callbackFunc)
        getCodepenSpec(specObj.url, callbackFunc)

    }

    function getInstantiateAndInjectFunc(scope, specObj, parent_container) {
        return function(obj) {

            specObj.data = obj;
            specObj.data.toggleDev = true;
            specObj.data.toggleSpec = false;
            specObj.data.open = specObj.open;
            specObj.data.codepenData = getCodepenData(scope, specObj.data.title, specObj.template_path, specObj.ctrl_path)
            specObj.data.openGDoc = openGDocSpecFunc(specObj.data.gdoc);
            scope.spec = specObj;
            elem = document.querySelector(parent_container);
            specElem = document.createElement('spec');
            specElem.className = 'fixed bottom-0 left-0 full-x'
            KeyboardService.initOptionPressedAndReleasedFunction(toggleDev, null, 68, 'd', true, null);
            KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 83, 's', true, null);
            KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 27, 'esc', true, null);
            specElem.setAttribute('ng-if', 'spec && spec.data');
            specElem.setAttribute('data', 'spec.data');
            if (elem) {
                elem.appendChild(specElem)
                $timeout(function() {
                    $compile(specElem)(scope);
                    scope.$apply();
                })
            }

            function openGDocSpecFunc(url) {
                return function() {
                    $window.open(url, '_blank');
                }
            }

            function toggleDev() {
              scope.spec.data.toggleDev = !scope.spec.data.toggleDev;
            }
            function toggleSpec() {
              scope.spec.data.toggleSpec = !scope.spec.data.toggleSpec;
            }

        }

    }

    function getCodepenData(scope, title, template_url, ctrl_path) {
        $timeout(function() {
            loadHTMLSpec(scope, template_url, ctrl_path)
        })
        return {
            title                 : title,
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

        function loadHTMLSpec(scope, template_url, controller_url) {

            if (window.location.href.split(':8100').length > 1) {
              template_url = 'http://localhost:8100/remote/templates/' + template_url;
            } else {
              template_url = 'https://uguru-rest-test.herokuapp.com/static/remote/templates/' + template_url;
            }

            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', template_url, true );

            xhr.onload = function () {
                scope.spec.data.codepenData.html = wrapMinUguruHtml(xhr.responseText, controller_url);

                $timeout(function() {
                  scope.$apply();
                });
            };
            xhr.send();
        }

        function wrapMinUguruHtml(response_html, relative_ctrl_url) {
            return '<body ng-app="uguru" animation="slide-left-right-ios7"><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/u.base.js"></script><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/main.min.js"></script><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/js/' + relative_ctrl_url + '"></script><ui-view id="uguru-view"><script type="text/ng-template" id="calendar.html">' + response_html + '</div></script></ui-view></body>'
        }

    }

    function getSpecObj(spec_id, template_url, ctrl_url) {
        var url = constructCodepenUrl(spec_id);
        return {
            open: openCodepenSpecFunc(url),
            url: url + '.js',
            ctrl_path: ctrl_url,
            template_path: template_url,
            data: {}
        }

        function openCodepenSpecFunc(url) {
            return function() {
                $window.open(url + '/?editors=0010?layout=top', '_blank');
            }
        }
        function constructCodepenUrl(spec_id) {
            return "https://codepen.io/teamuguru/pen/" + spec_id;
        }
    }

    function getCodepenSpec(url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', url, true );

      xhr.onload = function () {
          var responseDict = JSON.parse(xhr.responseText);
          cb(responseDict);
      };
      xhr.send();
    }

    function getSpec(_id, template_url, ctrl_url) {

        if (Object.keys(specTokens).indexOf(_id) > -1) {
            return getSpecObj(specTokens[_id], template_url, ctrl_url)
        }
        return
    }



}