angular
.module('uguru.admin')
.factory("SpecService", [
  '$state',
  '$timeout',
  '$localstorage',
  '$window',
  '$compile',
  'KeyboardService',
  'UtilitiesService',
  SpecService
  ]);

function SpecService($state, $timeout, $localstorage, $window, $compile, KeyboardService, UtilitiesService) {

    return {
        initSpec: initSpec,
        getSpec: getSpec
    }

    function initSpec(scope, real_scope, parent_container, param, template_path, ctrl_path, states, css_path) {
        if ((window.location.href.split('/dev/').length === 1) && window.location.href.split('codepen').length === 1) {
            return;
        }
        //checks codepen environment
        // if (window.location.href.split('codepen.io').length > 1) return;
        var specObj = getSpec(param, template_path, ctrl_path, css_path);
        var callbackFunc = getInstantiateAndInjectFunc(scope, real_scope, specObj, parent_container, param, states)
        getCodepenSpec(specObj.url, callbackFunc)

    }

    function getInstantiateAndInjectFunc(scope, real_scope, specObj, parent_container, param, states) {
        // console.log(states);
        return function(obj) {

            specObj.data = obj;
            calcUseCasesCompletedness(specObj.data.use_cases)
            //@gabrielle note
            specObj.data.toggleDev = true;
            specObj.data.toggleSpec = false;
            specObj.data.toggleDocs = false;
            specObj.data.toggleShortcuts = false;
            specObj.data.toggleSettings = true;
            specObj.data.docs = {launch:launchDocs}
            specObj.data.mobile = {toggle:toggleMobileMode, width:400, height:768, show:false, template:specObj.template_path, url:window.location.href}
            specObj.data.open = specObj.open;
            specObj.data.statesDropdown = generateDropdownFromStates(states, parent_container, real_scope);
            specObj.data.stateTags = specObj.data.statesDropdown.options;
            specObj.data.stateTagClicked = specObj.data.statesDropdown.onOptionClick;
            specObj.data.initCodepenData = launchNewCodepen(scope);
            $timeout(function() {
                specObj.data.codepenData = getCodepenData(scope, specObj.data.title, specObj.template_path, specObj.ctrl_path, specObj.css_path);
            })
            specObj.data.openGDoc = openGDocSpecFunc(specObj.data.gdoc);
            for (specProp in specObj) {
                scope.spec[specProp] = specObj[specProp]
            }
            elem = document.querySelector(parent_container);
            console.log('parent containeter', elem);
            specElem = document.createElement('spec');
            specElem.className = 'fixed bottom-0 left-0 full-x';
            specElem.style.zIndex = '100000';
            specObj.data.toggles = {devBar: toggleDev, docs: toggleDocs, spec:toggleSpec, settings:toggleSettings, shortcuts:toggleShortcuts};
            specObj.data.keyboardListeners = initKeyboardFunction();
            // specElem.setAttribute('ng-if', 'spec && spec.data');
            specElem.setAttribute('data', param + '.spec.data');
            if (elem) {
                elem.appendChild(specElem)
                $timeout(function() {
                    $compile(specElem)(real_scope);
                })
            }

            function openGDocSpecFunc(url) {
                return function() {
                    $window.open(url, '_blank');
                }
            }

            function initKeyboardFunction() {
                KeyboardService.initOptionPressedAndReleasedFunction(toggleDev, null, 68, 'd', true, null);
                KeyboardService.initOptionPressedAndReleasedFunction(toggleSpec, null, 83, 's', true, null);
                KeyboardService.initOptionPressedAndReleasedFunction(toggleSettings, null, 90, 'z', true, null);
                KeyboardService.initOptionPressedAndReleasedFunction(toggleShortcuts, null, 75, 'k', true, null);
                KeyboardService.initOptionPressedAndReleasedFunction(launchDocs, null, 78, 'n', false, 750);
                KeyboardService.initOptionPressedAndReleasedFunction(toggleMobileMode, null, 77, 'm', true, null);
                // KeyboardService.initOptionPressedAndReleasedFunction(function() {toggleDev(true); toggleSpec(true);}, null, 27, 'esc', true, null);
            }

            function toggleDev(value) {
                var newValue = !scope.spec.data.toggleDev;

              if (newValue) {
                scope.spec.data.toggleDev = newValue;
                return;
              }
              else if (!newValue) {
                var devSpecContainer = document.querySelector('#dev-toolbar');
                devSpecContainer.classList.remove('slideInDown');
                $timeout(function() {
                    devSpecContainer.classList.add('slideOutDown');
                })
                $timeout(function() {
                    scope.spec.data.toggleDev = newValue;
                }, 750);
              }

            }
            function toggleShortcuts() {
                var newValue = !scope.spec.data.showShortcuts;
                if (newValue  && scope.spec.data.toggleDev) {
                    scope.spec.data.showShortcuts = newValue;
                    return;
                }
                else if (newValue && !scope.spec.data.toggleDev) {
                    scope.spec.data.toggleDev = true;
                    $timeout(function() {
                        scope.spec.data.showShortcuts = newValue;
                    }, 750)
                }
                else if (!newValue) {
                    var showShortcutsContainer = document.querySelector('#dev-bar-shortcuts');
                    showShortcutsContainer.classList.remove('lightSpeedIn');
                    $timeout(function() {
                        showShortcutsContainer.classList.add('lightSpeedOut');
                    })
                    $timeout(function() {
                        scope.spec.data.showShortcuts = newValue;
                        showShortcutsContainer.classList.add('lightSpeedOut');
                    }, 750);
                }
            }

            function toggleSettings() {
                var newValue = !scope.spec.data.showSettings;
                if (newValue  && scope.spec.data.toggleDev) {
                    scope.spec.data.showSettings = newValue;
                    return;
                }
                else if (newValue && !scope.spec.data.toggleDev) {
                    scope.spec.data.toggleDev = true;
                    $timeout(function() {
                        scope.spec.data.showSettings = newValue;
                    }, 750)
                }
                else if (!newValue) {
                    var showSettingsContainer = document.querySelector('#dev-bar-settings');
                    showSettingsContainer.classList.remove('lightSpeedIn');
                    $timeout(function() {
                        showSettingsContainer.classList.add('lightSpeedOut');
                    })
                    $timeout(function() {
                        scope.spec.data.showSettings = newValue;
                        showSettingsContainer.classList.add('lightSpeedOut');
                    }, 750);
                }
            }

            function launchDocs() {
                var url = 'https://uguru-rest-test.herokuapp.com/#/admin/docs';
                if (window.location.href.split(':81').length > 1 || window.location.href.split(':5000').length > 1) {
                    url = window.location.href.split('/#/')[0] + '/#/admin/docs';
                }
                $window.open(url, '_blank');
            }

            function toggleMobileMode(value) {
                //flex-center --> ion-nav-view
                //set the width and height to ion-nav-view-first-child

                if (value && typeof(value) === 'boolean') {
                    scope.spec.data.mobile.show = value;
                } else {
                    scope.spec.data.mobile.show = !scope.spec.data.mobile.show;
                }
                var parent_elem = document.querySelector(parent_container);
                var spec_elem = parent_elem.querySelector(parent_container + ' > div[data]');
                if (scope.spec.data.mobile.show) {
                    if (!scope.spec.data.mobile.initDimensions) {
                        var computedDimensionsView = window.getComputedStyle(parent_elem.parentNode);
                        var computedDimensionsSpec = window.getComputedStyle(spec_elem);
                        scope.spec.data.mobile.initDimensions = {view: {}, devTools: {}};
                        scope.spec.data.mobile.initDimensions.view = {height: computedDimensionsView.height, width: computedDimensionsView.width}
                        scope.spec.data.mobile.initDimensions.devTools = {height: computedDimensionsSpec.height, width: computedDimensionsSpec.width}
                    }
                    parent_elem.parentNode.classList.add('flex-center');
                    parent_elem.style.width = scope.spec.data.mobile.width + 'px';
                    parent_elem.style.height = scope.spec.data.mobile.height + 'px';
                    var parentElemMarginTop = (0 - parent_elem.getBoundingClientRect().top);
                    parent_elem.style.marginTop =  parentElemMarginTop + 'px';
                    spec_elem.style.marginBottom = (parentElemMarginTop - parent_elem.getBoundingClientRect().top ) + 'px';

                    spec_elem.style.width = scope.spec.data.mobile.initDimensions.devTools.width;
                    spec_elem.style.left = (0 - parent_elem.getBoundingClientRect().left) + 'px';
                    spec_elem.classList.remove('full-x', 'left-0', 'top-0');
                    spec_elem.classList.remove('relative');
                    var mobileSpecOptionsBar = spec_elem.querySelector('#spec-mobile-options');
                    if (mobileSpecOptionsBar) {
                        mobileSpecOptionsBar.classList.add('absolute', 'left-0', 'full-x');
                        mobileSpecOptionsBar.style.top = (0 - spec_elem.getBoundingClientRect().height + mobileSpecOptionsBar.getBoundingClientRect().height * 0.5) + 'px';
                    }
                    // var devToolHeightInt = parseInt(scope.spec.data.mobile.initDimensions.devTools.height.replace('px', ''));
                    // var viewHeightInt = parseInt(scope.spec.data.mobile.initDimensions.view.height.replace('px', ''));
                    // var bottomOffset = 0 - (viewHeightInt - scope.spec.data.mobile.height);

                    // spec_elem.style.bottom =  bottomOffset + 'px';
                    parent_elem.style.overflow = 'visible';
                    $timeout(function() {
                        real_scope.$apply();
                        parent_elem.classList.add('mobile');
                    }, 100)

                } else {
                    parent_elem.parentNode.classList.remove('flex-center');
                    parent_elem.classList.remove('mobile');
                    parent_elem.style.width = scope.spec.data.mobile.initDimensions.view.width;
                    parent_elem.style.height = scope.spec.data.mobile.initDimensions.view.height;
                    spec_elem.style.marginBottom = 'initial';
                    parent_elem.style.marginTop = 'auto';
                    // spec_elem.classList.add('full-x', 'bottom-0');
                    spec_elem.classList.add('full-x', 'left-0', 'bottom-0', 'relative');
                    spec_elem.style.width = '';
                    parent_elem.style.overflow = 'hidden';
                    parent_elem.classList.remove('mobile');
                    var mobileSpecOptionsBar = spec_elem.querySelector('#spec-mobile-options');
                    if (mobileSpecOptionsBar) {
                        mobileSpecOptionsBar.classList.remove('absolute', 'left-0', 'full-x');
                        mobileSpecOptionsBar.style.top = 'initial'
                    }
                }
            }

            function toggleSpec(value) {
              var newValue = !scope.spec.data.toggleSpec;
              if (newValue) {
                scope.spec.data.toggleSpec = newValue;
                scope.spec.data.toggleDocs = false;
                return;
              }
              else if (!newValue) {
                var devSpecContainer = document.querySelector('#dev-spec');
                devSpecContainer.classList.remove('slideInDown');
                $timeout(function() {
                    devSpecContainer.classList.add('fadeOutUp');
                })
                $timeout(function() {
                    scope.spec.data.toggleSpec = newValue;
                }, 750);
              }
            }
            function toggleDocs(value) {
              var newValue = !scope.spec.data.toggleDocs;
              if (newValue) {
                scope.spec.data.toggleDocs = newValue;
                scope.spec.data.toggleSpec = false;
                return;
              }
              else if (!newValue) {
                var docSpecContainer = document.querySelector('#dev-docs');
                docSpecContainer.classList.remove('slideInDown');
                $timeout(function() {
                    docSpecContainer.classList.add('fadeOutUp');
                })
                $timeout(function() {
                    scope.spec.data.toggleDocs = newValue;
                }, 750);
              }
            }

        }

    }

    function calcUseCasesCompletedness(use_case_arr) {
        for (var i = 0; i < use_case_arr.length; i++) {
            var indexUseCase = use_case_arr[i];
            if (!indexUseCase.columns) indexUseCase.columns = {};
            var indexUseCaseColumns = indexUseCase.columns
            for (column in indexUseCaseColumns) {
                var indexColumnObj = indexUseCaseColumns[column];
                var columnSumComplete = 0;
                if (indexColumnObj.items && indexColumnObj.items.length) {
                    var columnItems = indexColumnObj.items;
                    for (var j = 0; j < columnItems.length; j++) {
                        var actionItem = indexColumnObj.items[j];
                        if (actionItem.value) columnSumComplete += 1;
                        if (actionItem.sub_items && actionItem.sub_items.length) {
                            var actionSum = 0;
                            var actionSubItemTotal = actionItem.sub_items.length;
                            for (var k = 0; k < actionItem.sub_items.length; k++) {
                                var indexSubItem = actionItem.sub_items[k];
                                if (indexSubItem.value) actionSum += 1;
                            }
                            actionItem.status = {
                                fraction: actionSum + '/' + actionSubItemTotal,
                                remaining: actionSubItemTotal - actionSum,
                                total: actionSubItemTotal,
                                percentage: (100.0 * ((actionSum * 1.0)/indexColumnObj.items.length)).toFixed(1) + '%'
                            }
                        }
                    }
                }
                indexColumnObj.status = {
                    fraction: columnSumComplete+'/'+indexColumnObj.items.length,
                    remaining: indexColumnObj.items.length - columnSumComplete,
                    total: indexColumnObj.items.length,
                    percentage: (100.0 * ((columnSumComplete * 1.0)/indexColumnObj.items.length)).toFixed(1) + '%'
                }
            }
        }
    }

    function launchNewCodepen(scope) {
            var title = 'New Uguru Codepen';
            var base_url = 'https://uguru-rest-test.herokuapp.com/static/remote/min/';
            return {
                title                 : title,
                description           : "Most updated version",
                private               : false, // true || false
                tags                  : [], // an array of strings
                editors               : "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
                layout                : "right", // top | left | right
                html                  : "<body ng-app='uguru' animation='slide-left-right-ios7' > <ui-view id='uguru-view'> <script type='text/ng-template' id='demo.html'><div class='splash-hero-content full-xy z-index-100' ng-controller='NewCodepenController as codepen' id='codepen-view' ng-show='true'> <div class='splash-guru-head' on-activate='pulse:animIn'> <div class='splash-hero-guru splash-logo-guru' ng-include='" + '"shared/templates/components/svg/guru-head.html"' +"'></div> </div> <h1 class='flex-wrap-center full-x'> Aint nothin here to see *yet* </h1> </div></script></ui-view></body>",
                html_pre_processor    : "",
                css                   : "//@import 'mixins' already included within codepen\n\n#codepen-view{@extends .full-xy}",
                css_pre_processor     : "scss",
                css_starter           : "neither",
                css_prefix            : "none",
                js                    : "angular.module('uguru.preApp') .controller('NewCodepenController', ['$scope', '$state', '$timeout', 'SpecService', function($scope, $state, $timeout, SpecService) { var codepen = this; var states = {}; SpecService.initSpec(codepen, $scope, '#codepen-view', 'demo', null, null, states, null);} ])",
                js_pre_processor      : "none",
                html_classes          : null,
                head                  : '<meta charset="utf-8"><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"><title></title><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/min/util/base.js"></script>',
                css_external          : "https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/min/app.css;http://codepen.io/teamuguru/pen/ce57163cc68d7c34cc4bc84c985ed993",
                js_external           : '',
                css_pre_processor_lib : null,
                js_modernizr : null,
                js_library   : null,
        }
    }

    function getCodepenData(scope, title, template_url, ctrl_path, css_path) {
        console.log(template_url, ctrl_path);
        $timeout(function() {
            template_url && loadHTMLSpec(scope, template_url, ctrl_path)
        })
        $timeout(function() {
            ctrl_path && loadJsSpec(scope, template_url, ctrl_path)
        })
        $timeout(function() {
            css_path && loadCssSpec(scope, css_path);
        })
        var base_url = 'https://uguru-rest-test.herokuapp.com/static/remote/min/';
        return {
            title                 : title,
            description           : "Most updated version",
            private               : false, // true || false
            tags                  : [], // an array of strings
            editors               : "111", // Set which editors are open. In this example HTML open, CSS closed, JS open
            layout                : "right", // top | left | right
            html                  : '',
            html_pre_processor    : "",
            css                   : "",
            css_pre_processor     : "scss",
            css_starter           : "neither",
            css_prefix            : "none",
            js                    : "",
            js_pre_processor      : "none",
            html_classes          : null,
            head                  : '<meta charset="utf-8"><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"><title></title><script src="https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/min/util/base.js"></script>',
            css_external          : "https://uguru_admin:wetrackeverything@uguru-rest-test.herokuapp.com/static/remote/min/app.css;http://codepen.io/teamuguru/pen/ce57163cc68d7c34cc4bc84c985ed993",
            js_external           : '',
            css_pre_processor_lib : null,
            js_modernizr : null,
            js_library   : null,
        }



        function loadHTMLSpec(scope, template_url, controller_url) {

            if (window.location.href.split(':8100').length > 1) {
              template_url = window.location.href.split('#/')[0] + template_url;
            } else {
              template_url = 'https://uguru-rest-test.herokuapp.com/static/remote/min/' + template_url;
            }
            console.log(template_url);
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', template_url, true );

            xhr.onload = function () {
                scope.spec.data.codepenData.html = wrapMinUguruHtml(xhr.responseText, controller_url);
            };
            xhr.send();
        }

        function loadJsSpec(scope, template_url, controller_url) {

            if (window.location.href.split(':8100').length > 1) {
              template_url = window.location.href.split('#/')[0] + controller_url;
            } else {
              template_url = 'https://uguru-rest-test.herokuapp.com/static/remote/min/' + controller_url;
            }
            console.log(template_url);
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', template_url, true );

            xhr.onload = function () {
                scope.spec.data.codepenData.js = xhr.responseText;
            };
            xhr.send();
        }

        function loadCssSpec(scope, css_url) {
            if (!css_url) {
                return '';
            }
            if (window.location.href.split(':8100').length > 1) {
              template_url = window.location.href.split('#/')[0] + css_url;
            } else {
              template_url = 'https://uguru-rest-test.herokuapp.com/static/remote/min/' + css_url;
            }
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', template_url, true );

            xhr.onload = function () {
                scope.spec.data.codepenData.css += xhr.responseText.replace('@import', '//@import');
            };
            xhr.send();
        }

        function wrapMinUguruHtml(response_html, relative_ctrl_url) {
            var result = '<body ng-app="uguru" animation="slide-left-right-ios7" > <ui-view id="uguru-view"> <script type="text/ng-template" id="demo.html"> ' + response_html +'</script> </ui-view> <script src="https://uguru-rest-test.herokuapp.com/static/remote/min/' + relative_ctrl_url + '"></script> </body>'
            return result;
        }

    }

    function getSpecObj(spec_id, template_url, ctrl_url, css_url) {
        var url = template_url && constructCodepenUrl(spec_id);
        return {
            open: openCodepenSpecFunc(url),
            url: url + '.js',
            ctrl_path: ctrl_url,
            css_path: css_url,
            template_path: template_url,
            data: {}
        }

        function openCodepenSpecFunc(url) {
            if (!url) return function() {};
            return function() {
                $window.open(url + '/?editors=0010?layout=top', '_blank');
            }
        }
        function constructCodepenUrl(spec_id) {
            return "https://codepen.io/teamuguru/pen/" + spec_id;
        }


    }

    function generateDropdownFromStates(states, parent_container, scope) {
        var dropdownArr = [];
        var elemUniqueStateArr = [];
        var elemStateArr = [];
        var parentContainer = document.querySelector(parent_container);
        if (parentContainer) {
            var elementsWithStates = parentContainer.querySelectorAll('[elem-states]');

            for (var i = 0; i < elementsWithStates.length; i++) {
                var indexElemWithState = elementsWithStates[i];
                var indexElemStates = indexElemWithState.getAttribute('elem-states');
                var elemStates = UtilitiesService.removeAllOccurrancesArr(indexElemStates, ['[', ']', ' ', "'", '"']).split(',');
                for (var j = 0; j < elemStates.length; j++) {
                    var indexState = elemStates[j];
                    var onEnterState = 'on-' + indexState + '-enter';
                    var onExitState = 'on-' + indexState + '-exit';
                    var elemHasEnterAttribute = indexElemWithState.getAttribute(onEnterState);
                    var elemHasExitAttribute = indexElemWithState.getAttribute(onExitState);
                    if (elemHasEnterAttribute && elemUniqueStateArr.indexOf(UtilitiesService.camelCase(onEnterState)) === -1) {
                        elemUniqueStateArr.push(UtilitiesService.camelCase(onEnterState));
                        elemStateArr.push({title: UtilitiesService.camelCase(onEnterState), state: onEnterState})
                    }
                    if (elemHasExitAttribute  && elemUniqueStateArr.indexOf(UtilitiesService.camelCase(onExitState)) === -1) {
                        elemUniqueStateArr.push(UtilitiesService.camelCase(onExitState));
                        elemStateArr.push({title: UtilitiesService.camelCase(onExitState), state: onExitState})
                    }
                }
            }
        }
        for (key in states) {
            dropdownArr.push({title:key, state: states[key], parent_elem: parent_container, parent_scope: scope})
        }
        for (var i = 0; i < elemStateArr.length; i++) {
            elemStateArr[i].parent_elem = parent_container;
            elemStateArr[i].parent_scope = scope;
            elemStateArr[i].is_elem_state = true;
            dropdownArr.push(elemStateArr[i]);
        }
        var result = {
            label: 'toggle states',
            options: dropdownArr,
            key: 'title',
            onOptionClick: applyDropdownAction,
            selectedIndex: getDefaultSelectedIndex(states)
        }

        return result;

        function getDefaultSelectedIndex(states) {
            return 1;
        }

        function applyDropdownAction(option, index) {
            if (option.title === 'onInit') {
                window.location.reload(true);
            } else if (option.title.toLowerCase().indexOf('onclick') > -1) {
                elem = document.querySelector(option.state);
                $timeout(function() {
                    angular.element(elem).triggerHandler('click');
                    option.parent_scope.$apply();
                })
            }
            else if (option.title.toLowerCase().indexOf('click') > -1) {
                elem = document.querySelector(option.state);
                $timeout(function() {
                    angular.element(elem).triggerHandler('click');
                    option.parent_scope.$apply();
                })
            } else if (option.title.toLowerCase() === 'onhover') {
                parent_elem = document.querySelector(option.parent_elem);
                onHoverElems = parent_elem.querySelectorAll('[on-hover]');
                for (var i = 0 ; i < onHoverElems.length; i++) {
                    onHoverElems[i].classList.add('activate-hover');
                }
            }
            else if (option.title.toLowerCase() === 'onactivate') {
                parent_elem = document.querySelector(option.parent_elem);
                onActivateElems = parent_elem.querySelectorAll('[on-activate]');
                for (var i = 0 ; i < onActivateElems.length; i++) {
                    onActivateElems[i].classList.add('activate');
                }
            }
            else if (option.is_elem_state) {
                var stateElems = document.querySelectorAll('[' + option.state + ']')
                for (var i = 0; i < stateElems.length; i++) {
                    stateElems[i].classList.add(option.state)
                }
            }

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

    function getSpec(_id, template_url, ctrl_url, css_path) {
        var specTokens = {'calendar': 'ddd2f97039f2fec817d52499dd3c00ac', 'madlib': '5c0ecd57c10973ddfe65af113522a809', 'jeselle': '98f138f534428eb8af27ea5c2b6944ef', 'gabrie': '9d8ddaef35241c63a3a95032485bf645'};
        if (Object.keys(specTokens).indexOf(_id) > -1) {
            return getSpecObj(specTokens[_id], template_url, ctrl_url, css_path)
        } else {
            return getSpecObj('98f138f534428eb8af27ea5c2b6944ef', template_url, ctrl_url, css_path)
        }
    }

}
