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
    SpecService.initSpec(loader, $scope, '#splash-preapp-loader', 'loader', 'preapp/templates/loaders/main.html', 'preapp/js/SplashLoaderController.js', {}, 'preapp/css/compiled/loader.css');
  }
])
