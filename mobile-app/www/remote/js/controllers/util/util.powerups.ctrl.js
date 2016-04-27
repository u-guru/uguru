angular.module('uguru.util.controllers')

.controller('PowerupController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate) {

        $scope.onMouseLeave = function(event) {
                    var element = event.target;
                    element.style.transform = "none";
                    element.style.webkitTransform = "none";
                    element.classList.add('transition-150');
                }

  }


])