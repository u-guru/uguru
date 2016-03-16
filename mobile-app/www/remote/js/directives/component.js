angular.module('uguru.components', [])
.directive("doc", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/docs/docs.tpl',
    scope: {
        header: '=header',
        steps: '=steps'
    },
    restrict: 'E'
  };
})
.directive("stepByStep", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/containers/steps.tpl',
    scope: {
        header: '=header',
        steps: '=steps'
    },
    restrict: 'E'
  };
})
.directive("dropdown", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/input/dropdown.tpl',
    scope: {
        dropdown: '=ngModel',

    },
    restrict: 'E',
    link: function( scope, element, attr ) {

    }
  };
})