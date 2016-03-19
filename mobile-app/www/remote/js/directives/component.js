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
.directive("demo", ['$compile', '$timeout', function($compile, $timeout) {
  return {
    restrict: 'E',
    scope: '=',
    link: function(scope, element, attr) {
      $timeout(function() {

        if (attr.template && attr.template.length) {
          element.html(attr.template);
          $compile(element.contents())(scope);

          console.log('compile')
        }
      }, 1000);
    }
  };
}])
.directive("dropdown", function() {
  return {
    templateUrl: BASE + 'templates/components/dev/input/dropdown.tpl',
    scope: {
 
        dropdown: '=ngModel'
        // tests:'=testArr',

    },
    replace: true,
    restrict: 'E',
    link: function( scope, element, attr ) {
        // // console.log(scope.dropdown)
        // // var  = ;
        // // console.log("WTF",attr.eventFocus)
        // // console.log("WTF",movable)

        // element.find('a').on(attr.event, function() {
        //    // focus(attr.eventFocusId);
        //      var stack =[]
        //      for (var i = 0 ; i < scope.tests.length;++i)
        //         if (i != (parseInt(attr.index)) && scope.tests[i].active)
        //             stack.push(i)
          
        //      scope.$apply(function() {
        //           for(var i = 0; i < stack.length;++i)
        //           {
        //               scope.tests[stack[i]].active = false
        //           }
        //           // if (i == (parseInt(attr.index)) && scope.tests[i].active)
        //           //   element.find('ul')[0].focus();
        //      });
        //  });

      scope.click = function(index) {
        scope.dropdown.selectedIndex = index;
        scope.toggle();
      }
      scope.toggle = function() {
        scope.dropdown.active = !scope.dropdown.active;
      }
    }
  };
})
.directive("userIcon", ['$compile',function($compile) {
  return {
    templateUrl: BASE + 'templates/components/dev/user.icon.tpl',
    scope: {
        url: '=url',
        size: '=size'
    },
    replace:true,
    restrict: 'E',
    link: function( scope, element, attr ) {

      console.log('Check',!scope.url, typeof(scope.url))
      if (attr.size && attr.size === 'small') {
        scope.size = '-32'
      } else if (attr.size && attr.size === 'medium'){
        scope.size= '-64'
      }

      if (typeof(scope.url) == 'undefined') {
        scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
      }

      var request = new XMLHttpRequest();  
      request.open('GET', scope.url , true);
      request.onreadystatechange = function(){
          if (request.readyState === 4){
              if (request.status === 404) {  
                scope.url = 'https://uguru.me/static/remote/img/avatar.svg';
                // element.attr('url',scope.url);
                // $compile(element.contents())(scope);
                // scope.$apply();
                console.log("YES",scope)
              }  
          }
      };
      request.send()

    }
  };
}])
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
    replace: true,
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
        options: '=options',
        key: '@?key',
        tabIndex: '=index'
    },
    restrict: 'E',
    replace: true,
    link: function( scope, element, attr ) {
      if (! ('index' in attr)) {
        scope.tabIndex = 0;
      }
      scope.updateTabIndex = function ($index) {
        scope.tabIndex = $index;
      }
    }
  };
})