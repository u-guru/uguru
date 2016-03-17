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
.directive("demo", ['$compile', function($compile) {
  return {
    restrict: 'E',
    scope: '=',
    link: function(scope, element, attr) {

      if (attr.template && attr.template.length) {
        element.html(attr.template);
        $compile(element.contents())(scope);
      }
    }
  };
}])
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
.directive("userIcon", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/user.icon.tpl',
    scope: {
        url: '=url',
        size: '=size'
    },
    restrict: 'E',
    link: function( scope, element, attr ) {
      if (scope.size && scope.size === 'small') {
        scope.size = '-32'
      } else if (scope.size && scope.size === 'medium'){
        scope.size= '-64'
      }
      if (!scope.url || !scope.url.length) {
        scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
      }
    }
  };
})
.directive("tooltip", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/tooltip.tpl',
    scope: {
        title: '=title',
        text: '=buttonText',
        direction: '=direction'
    },
    restrict: 'E',
    link: function( scope, element, attr ) {
      if (!scope.text || !scope.text.length) {
        scope.text = null;
      }
      if (!scope.direction) {
        scope.direction = 'top';
      }
    }
  };
})
.directive("rating", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/rating.tpl',
    scope: {
        avg: '=avg',
    },
    restrict: 'E',
    link: function( scope, element, attr ) {
      console.log(scope.avg);
      if (!scope.avg || typeof(scope.avg) !== "number") {
        scope.avg = 5;
      }
      scope.total_full_stars = getArraySize(Math.floor(scope.avg));
      scope.total_empty_stars = getArraySize(5 - scope.total_full_stars.length);
      scope.show_half = (Math.ceil(scope.avg) - scope.avg) <= 0.99 && (Math.ceil(scope.avg) - scope.avg) >= 0.25;
      if (scope.show_half) {
        scope.total_empty_stars.splice(0,1)
      }
      console.log(scope.show_half);
      function getArraySize(num) {
        var arr =[];
        for (var i = 0; i < num; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  };
})
.directive("tabs", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/containers/tabs.tpl',
    scope: {
        options: '=tabs',
        key: '=key',
        index: '=index'
    },
    restrict: 'E',
    link: function( scope, element, attr ) {
      // scope.index = scope.index || 0;
    }
  };
})