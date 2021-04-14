angular.module('uguru.util.controllers')

//ALL student controllers
.controller('HowItWorksController', [
  '$scope',
  '$state',
  '$stateParams',
  function($scope, $state, $stateParams){

    var hiw = this;

    hiw.switchScene = function(index) {
      var currentActive = document.querySelector('.how-scene .hiw-single-scene.active-scene');
      if (currentActive) {
        currentActive.classList.remove('active-scene');
        currentActive.classList.add('clear');
      }
      var selectedIndexScene = document.querySelector('.how-scene-' + index);
      if (selectedIndexScene) {
        selectedIndexScene.classList.add('active-scene', 'activate');
      }
    }

    }

]);