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
        tests:'=testArr',
    },
    restrict: 'E',
    link: function( scope, element, attr ) {
        // console.log(scope.dropdown)
        // var  = ;
        // console.log("WTF",attr.eventFocus)
        // console.log("WTF",movable)

        element.find('a').on(attr.eventFocus, function() {
           // focus(attr.eventFocusId);
           var stack =[]
           for (var i = 0 ; i < scope.tests.length;++i)
              if (i != (parseInt(attr.index)) && scope.tests[i].active)
                  stack.push(i)
           for(var i = 0; i < stack.length;++i)
           {
              scope.$apply(function() {
                console.log("APPLY",stack[i])
                scope.tests[stack[i]].active = false
              });
           }
         });
    }
  };
})