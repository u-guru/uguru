angular.module('uguru.util.controllers')

.controller('DemosController', [
  '$scope',
  '$state',
  '$timeout',
  'SVGService',
  function($scope, $state, $timeout, SVGService) {
    $timeout(function() {
        var fillBgDemo = document.querySelector('#fill-bg-demo');
        fillBgDemo.classList.add('activate');
    }, 2500);
  }

])