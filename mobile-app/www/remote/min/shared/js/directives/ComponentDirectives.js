angular.module('uguru.shared.directives')
.directive("tag", ['$compile', '$timeout', function($compile, $timeout) {
        function getTemplateURL(elem, attr) {
            if (attr.type && attr.type === 'splash') {
                return BASE + 'templates/elements/components/inputs/tags/splash.tpl'
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

            }
        }
}]);