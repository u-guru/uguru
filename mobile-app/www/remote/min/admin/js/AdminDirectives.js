angular.module('uguru.admin')
.directive("spec", ['$timeout', function($timeout) {
        return {
            templateUrl: 'admin/templates/components/spec.tpl',
            scope: {
                spec: '=data'
            },
            replace: true,
            restrict: 'E',
            link: function(scope, element, attr) {
            }
        }
    }
]);
