angular.module('uguru.util.controllers')

.controller('DemosController', [
  '$scope',
  '$state',
  '$timeout',
  'SVGService',
  'LoadingService',
  '$interval',
  function($scope, $state, $timeout, SVGService, LoadingService, $interval) {

//     $(document).ready(function() {
//   //variable for the 'stroke-dashoffset' unit
//   var $dashOffset = $(".path").css("stroke-dashoffset");
//   //on a scroll event - execute function
//   $(window).scroll(function() {
//     //calculate how far down the page the user is
//     var $percentageComplete = (($(window).scrollTop() / ($("html").height() - $(window).height())) * 100);
//     //convert dashoffset pixel value to interger
//     var $newUnit = parseInt($dashOffset, 10);
//     //get the value to be subtracted from the 'stroke-dashoffset'
//     var $offsetUnit = $percentageComplete * ($newUnit / 100);
//     //set the new value of the dashoffset to create the drawing effect
//     $(".path").css("stroke-dashoffset", $newUnit - $offsetUnit);
//   });
// });
    $timeout(function() {


      var parentContainer = document.querySelector('ion-content');
      var elements = document.querySelectorAll('svg .path');
      var initialOffset = 1000;
      var pageHeight = parentContainer.scrollHeight;
      var viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      for (var i = 0; i < elements.length; i++) {
        var indexelement = elements[i];
        indexelement.style.strokeDashoffset = initialOffset;
      }


      // var pathLength = SVGService.getTotalPathLength(element);
      parentContainer.addEventListener('scroll', function() {
        var viewPortScrollTop = parentContainer.scrollTop;
        var percentage = ((viewPortScrollTop / (pageHeight - viewPortHeight)) * 100);

        for (var i = 0; i < elements.length; i++) {
          var indexElement = elements[i];
          var currentStrokeDashoffset = parseInt(indexElement.style.strokeDashoffset, 10);
          var offsetScaledPercent = percentage * (currentStrokeDashoffset / 100);
          indexElement.style.strokeDashoffset = initialOffset - offsetScaledPercent;
        }
      })

    }, 2000)



    // $timeout(function() {
    //     var fillBgDemo = document.querySelector('#fill-bg-demo');
    //     fillBgDemo.classList.add('activate');
    // }, 2500);
  }

])