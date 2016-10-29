angular.module('uguru.admin')

.controller('AdminChartController', [
  '$scope',
  '$element',
  '$attrs',
  '$transclude',
  '$compile',
  '$timeout',
  'ElementService',
  'ChartService',
  function($scope, $element, $attrs, $transclude, $compile, $timeout, ElementService, ChartService) {
    var attr = $attrs;
    var context = {type: 'on', name: 'init'};



    // $compile(animElem)($scope);


    var chart = this;
    chart.elemUrl = ElementService.constructImportUrlFromObj($attrs.src)
    console.log(chart.elemUrl)

    chart.context = context;

    $scope.renderAnimationStr = function(elem, scope, animations, context) {
      return ElementService.renderAnimationStr(elem, scope, animations, context)
    }


  }

])