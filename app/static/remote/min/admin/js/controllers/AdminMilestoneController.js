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

    $scope.$watch('root.milestones', function(new_val) {
      for (type in ms.types) {
        var indexType = ms.types[type];
        ms[indexType] = getAllMilestonesOfType(new_val, indexType)
        console.log(ms[indexType]);
        $timeout(function() {
          $scope.$apply();
        })
      }
    })
    // ms.minimal = getAllMilestonesOfType($scope.root.milestones);


    function getAllMilestonesOfType(ms_arr, type) {
        var resultArr = [];
        for (var i = 0; i < ms_arr.length; i++) {
          var indexMS = ms_arr[i];
          if (indexMS.type === type) {
            indexMS = parseActionObjProperties(indexMS)
            resultArr.push(indexMS)
          }
        }
        return resultArr
    }

    function parseActionObjProperties(action_obj) {
      action_obj.time = action_obj.time && parseTime(action_obj.time)
      action_obj.items = action_obj.items && parseItems(action_obj.items);
      action_obj.collapsed = false;
      return action_obj;

      function parseTime(time_str) {
        if (time_str.indexOf('h') > -1) {
          return {hours: parseFloat(time_str)}
        }
        if (time_str.indexOf('d') > -1) {
          return {days: parseFloat(time_str)}
        }
      }
      function parseItems(items) {

        return items.split(',')
      }

    }

  }
])