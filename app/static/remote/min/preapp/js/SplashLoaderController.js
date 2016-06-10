angular.module('uguru.preApp')
.controller('SplashLoaderController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {
    var loader = this;

    loader.spec = {data: {toggleDev:false, toggleSpec: false}};
    SpecService.initSpec(loader, $scope, '#bakery-loader', 'loader', 'preapp/templates/loaders/baking.html', 'preapp/js/SplashLoaderController.js', {});
  }
])


