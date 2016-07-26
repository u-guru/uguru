angular.module('uguru.admin')

.controller('AdminPlaygroundController', [
  '$scope',
  '$state',
  '$timeout',
  '$interval',
  '$localstorage',
  '$window',
  'AnimationService',
  'SpecService',
  function($scope, $state, $timeout, $interval, $localstorage, $window, AnimationService, SpecService) {
    var apc = this;
    apc.options = {
      transform: {
        args: [
          {name: 'scale'},
          {name: 'translate'},
          {name: 'rotate'},
          {name: 'skew', value: 'coord'},
          {name: 'origin', value:'coord'},
          {name: 'perspective'},
          {name: 'to', value: 'selector'},
          {name: 'clear', value: ['arg', 'all']},
        ],
        options: {
          coords: ['px', 'vp', '%', 'deg'],
          time: ['s'],
          func: ['timing func']
        }
      }
    }
    console.log('name', $scope.name)
    // playground.sections = processPlaygrounds(playgroundDict);
    // playground.activeSection = playground.sections[0];
    // playground.updateActiveSection = updateActiveSection

    function updateActiveSection(section) {
      playground.activeSection = section;
      $timeout(function() {
        $scope.$apply()
      });
    }
    function processPlaygrounds(_dict) {
      var result_arr = [];
      var index =0;
      for (key in _dict) {
        var sectionDict = _dict[key];
        sectionDict.id = index;
        sectionDict.title = key;
        result_arr.push(sectionDict);
        index ++;
      }
      return result_arr;
    };

  }

])

