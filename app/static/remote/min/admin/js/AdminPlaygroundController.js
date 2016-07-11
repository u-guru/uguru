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
    var playground = this;
    playground.sections = processPlaygrounds(playgroundDict);
    playground.activeSection = playground.sections[0];
    playground.updateActiveSection = updateActiveSection

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

var playgroundDict = {
  'on-state': {
    examples: [
      { name: 'on-state'},
      { name: 'as-state'},
      { name: 'when-state'}
    ]
  },
  'when-state': {

  },
  'as-state': {

  }
}