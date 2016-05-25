angular.module('uguru.shared.directives')
.directive("tag", ['$compile', '$timeout', function($compile, $timeout) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'splash') {
                return 'preapp/templates/components/splash.tag.tpl'
            } else
            if (attr.type && attr.type === 'input') {
                return BASE + 'templates/elements/components/inputs/text/tag.tpl'
            } else {
                return BASE + 'templates/elements/components/inputs/tags/base.tpl'
            }

        }

        return {
            templateUrl: getTemplateURL,
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
}]);
