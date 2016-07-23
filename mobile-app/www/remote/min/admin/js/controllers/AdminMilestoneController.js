angular.module('uguru.admin')

.controller('AdminMilestoneController', [
  '$scope',
  '$state',
  '$timeout',
  '$window',
  'SpecService',
  '$stateParams',
  function($scope, $state, $timeout, $window, SpecService, $stateParams) {

    var ms = this;
    var allowed_params = ['initial', 'filter']
    ms.types = ['ugh']//, 'eh', 'ah', 'aha'];
    ms.typeIndex = 0;
    ms.modules = [];
    ms.toggleAll = toggleAll;
    ms.setActivePerson = setActivePerson;
    ms.parseStateParamFilters = parseStateParamFilters;
    $timeout(function() {
      ms.parseStateParamFilters($stateParams, allowed_params);
    }, 100)


    // $scope.$watch('root.milestones', function(new_val) {
    //   for (type in ms.types) {
    //     var indexType = ms.types[type];
    //     ms[indexType] = getAllMilestonesOfType(new_val, indexType)
    //     console.log(ms[indexType]);
    //     $timeout(function() {
    //       $scope.$apply();
    //     })
    //   }
    // })
    // ms.minimal = getAllMilestonesOfType($scope.root.milestones);
    //- list out all the workflows
    //- templates
    //- how to calculate progress


    // --> roles involved
    function parseDimensions(dimen_str) {
      return dimen_str
    }

    function toggleAll(module) {
      for (var i = 0; i < module.workflows.length; i++) {
        module.workflows[i].active = false;
      }
    }

    function parseStateParamFilters(params, allowed) {
      for (key in params) {
        if (allowed.indexOf(key) > -1) {
          var value = params[key].toUpperCase();
          if (ms.activeModule.teamArr.indexOf(value) > -1) {
              ms.setActivePerson(params[key].toUpperCase());
          } else {
            var workflows = ms.activeModule.workflows;
            var valueLower = value.toLowerCase();
            for (var i = 0; i < workflows.length; i++) {
              var iWorkflow = workflows[i];
              var activeIndex = iWorkflow.filter.options.indexOf(valueLower);
              if (activeIndex > -1) {
                iWorkflow.filter.activeIndex = activeIndex;
              }
            }
          }

        }
      }
    }

    function setActivePerson(initial) {
      ms.activeModule.activePerson = initial;
      $timeout(function() {$scope.$apply();})
    }

    ms.open = function(url) {
      var base = window.location.href.split('/#/');
      $window.open(base + url, '_blank');
    }

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