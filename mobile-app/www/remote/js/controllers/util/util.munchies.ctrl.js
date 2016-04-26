  angular.module('uguru.util.controllers')

.controller('MunchiesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  function($scope, $state, $timeout, $localstorage) {

    //@gabrielle-note
    //here is the selector string
    var svgShapeSelector = 'svg.demo-2 path';

    $timeout(function() {

      var parentContainer = document.querySelector('ion-content');
      var elements = document.querySelectorAll(svgShapeSelector);
      var initialOffset = 1000;
      var pageHeight = parentContainer.scrollHeight;
      console.log('scroll height', pageHeight, elements);
      var viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      for (var i = 0; i < elements.length; i++) {
        var indexelement = elements[i];
        indexelement.style.strokeDashoffset = initialOffset;
      }
      console.log(parentContainer);

      // var pathLength = SVGService.getTotalPathLength(element);
      parentContainer.addEventListener('scroll', function() {
        var viewPortScrollTop = parentContainer.scrollTop;
        console.log(viewPortScrollTop, pageHeight, viewPortHeight);
        var percentage = ((viewPortScrollTop / (pageHeight - viewPortHeight)) * 100);

        for (var i = 0; i < elements.length; i++) {
          var indexElement = elements[i];
          var currentStrokeDashoffset = parseInt(indexElement.style.strokeDashoffset, 10);
          var offsetScaledPercent = percentage * (currentStrokeDashoffset / 900);
          indexElement.style.strokeDashoffset = initialOffset - offsetScaledPercent;
        }
      })

    }, 2000)

      // var circleElem = document.querySelector('#svg-demo-1 svg circle');
      // var pathElem = document.querySelector('#svg-demo-1 svg path');
      // var startPoint = pathStartPoint(pathElem);

      // circleElem.style.transform = "translate(" + startPoint + ")";
      // circleElem.style.webkitTransform = "translate(" + startPoint[0] + "px," + startPoint[1] +"px)";



    function pathStartPoint(path) {
      var d = path.getAttribute("d"),
      dsplitted = d.split(" ");
      return dsplitted[1].split(",");
    }

    function translateAlong(path) {
      var l = path.getTotalLength();
      return function(i) {
        return function(t) {
          var p = path.getPointAtLength(t * l);
          return "translate(" + p.x + "," + p.y + ")";//Move marker
        }
      }
    }



  }


])
