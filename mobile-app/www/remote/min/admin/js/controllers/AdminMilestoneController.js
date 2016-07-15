angular.module('uguru.admin')

.controller('AdminMilestoneController', [
  '$scope',
  '$state',
  '$timeout',
  'SpecService',
  function($scope, $state, $timeout, SpecService) {

    var ms = this;
    ms.types = ['minimal', 'hifi'];
    ms.typeIndex = 0;
    ms.minimal = getAllMilestonesOfType($scope.root.milestones);
    console.log(ms.minimal)

    function getAllMilestonesOfType(ms_arr) {
        return {
            'actions': [{group: 'Splash'}]
        }
    }

  }
])