angular.module('uguru.shared.directives')
    .directive("tag", ['$compile', '$timeout', 'RootService', function($compile, $timeout, RootService) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'splash') {
                return RootService.getBaseUrl() + 'preapp/templates/components/splash.tag.tpl'
            } else
            if (attr.type && attr.type === 'input') {
                return RootService.getBaseUrl() + 'templates/elements/components/inputs/text/tag.tpl'
            } else {
                return RootService.getBaseUrl() + 'templates/elements/components/inputs/tags/base.tpl'
            }

        }

        return {
            templateUrl: getTemplateURL,
            args:'abc',
            scope: {
                innerText: '=',
                category: '=',
                blankNum: '=',
                animArgs: '=',
                placeholder: '@',
                desktopMode: '=desktop',
                click: "=ngClick"
            },
            restrict: 'E',
            replace: true,
            link: function(scope, element, attr) {
                if (attr.type && attr.type.toLowerCase() === 'splash') {
                    scope.type = 'splash';
                }

                if (scope.blankNum && scope.blankNum.length) {
                    scope.blankNum = 1
                }

                scope.click = function($event) {
                    var childElemLink = element[0].querySelector('a');
                    var splashAdlibContainerLink = document.querySelector('.splash-adlib');
                    if (childElemLink && childElemLink.className.indexOf('recently-active') > -1) {
                        return;
                    }
                    if (childElemLink && childElemLink.className.indexOf('translate-blank-1') > -1) {
                        childElemLink.classList.remove('translate-blank-1', 'active');
                        splashAdlibContainerLink.classList.remove('blank-1-filled');
                        $timeout(function() {
                            splashAdlibContainerLink.classList.remove('blank-1-filled');
                        }, 100)
                    }
                    if (childElemLink && childElemLink.className.indexOf('translate-blank-2') > -1) {
                        childElemLink.classList.remove('translate-blank-2', 'active');
                        $timeout(function() {
                            splashAdlibContainerLink.classList.remove('blank-2-filled');
                        }, 100)
                    }
                    childElemLink.style.webkitTransform = null;
                    childElemLink.style.MozTransform = null;
                    childElemLink.style.msTransform = null;
                    childElemLink.style.OTransform = null;
                    childElemLink.style.transform = null;
                }

            }
        }
    }])
    .directive("dropdown", ['$timeout', 'RootService', function($timeout, RootService) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'color') {
                return RootService.getBaseUrl() + 'templates/elements/components/inputs/dropdowns/color.tpl'
            } else {
                return RootService.getBaseUrl() + 'shared/templates/components/dropdown.tpl'
            }
        }
        return {
            templateUrl: getTemplateURL,
            scope: {
                dropdown: '=ngModel'
                    // tests:'=testArr',
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
                if (!scope.size) {
                    scope.size = 'small';
                }
                if (attr.type && attr.type.toLowerCase() === 'color') {
                    scope.type = 'color';
                } else {
                    scope.type = '';
                }
                scope.click = function(option, index) {

                    scope.dropdown.selectedIndex = index;

                    $timeout(function() {
                        scope.$apply();
                    })

                    if (scope.dropdown.onOptionClick) {
                        scope.dropdown.onOptionClick(option, index);
                    }

                    scope.toggle();

                }
                scope.toggle = function() {
                    scope.dropdown.active = !scope.dropdown.active;
                    if (scope.dropdown.onToggle) {
                        scope.dropdown.onToggle(scope.dropdown.active);
                    }
                }
            }
        };
    }])
    .directive("checkbox", ['RootService', function(RootService) {
        return {
            templateUrl: 'shared/templates/components/checkbox.tpl',
            scope: {
                onChecked: '=onChange',
                label: '=label',
                value: '=value',
                checked: "=checked"
            },
            restrict: 'E',
            link: function(scope, element, attr) {
                scope.label = attr.label || scope.label;

                scope.onValueChanged = function(value) {
                        scope.onChecked && scope.onChecked(value);
                    }
                    // scope.value = scope.value || attr.value;
                    // if (scope.onPropChange) {
                    //   // scope.onPropChange(scope, )
                    // }
            }
        }
}])
