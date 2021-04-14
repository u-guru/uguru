angular.module('uguru.admin')

.controller('AdminMilestoneController', [
  '$scope',
  '$state',
  '$timeout',
  '$window',
  'SpecService',
  '$stateParams',
  'UtilitiesService',
  function($scope, $state, $timeout, $window, SpecService, $stateParams, UtilitiesService) {

    var ms = this;
    var allowed_params = ['initial', 'filter', 'type']
    var teamDefaultDict = {JH: 'testReady', GW: 'states', SM:'stories', JO:'states'};
    var teamDefaultFilter = {JH: 'func', GW: 'func', SM:'func', JO:'func'};
    ms.types = ['ugh']//, 'eh', 'ah', 'aha'];
    ms.typeIndex = 0;
    ms.modules = [];
    ms.toggleAll = toggleAll;
    ms.setActivePerson = setActivePerson;
    ms.parseStateParamFilters = parseStateParamFilters;
    $timeout(function() {
      ms.parseStateParamFilters($stateParams);
    }, 500)


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

    function parseStateParamFilters(params, workflow) {
      var allowed = allowed_params
      for (key in params) {
        if (allowed.indexOf(key) > -1) {
          var value = params[key].toUpperCase();
          if (ms.activeModule.teamArr.indexOf(value) > -1) {
            ms.activeModule.activePerson = value;
            $timeout(function() {$scope.$apply();})

          } else {
            var workflows = ms.activeModule.workflows;
            var value = value.toLowerCase();
            if (value.indexOf('-') > -1) {
              var value = UtilitiesService.camelCase(value);
            }
            if (workflow) {
              var workflows = [workflow];
            }
            for (var i = 0; i < workflows.length; i++) {
              var iWorkflow = workflows[i];
              var activeIndex = iWorkflow.filter.options.indexOf(value);
              // if ('type' in params && key === 'type' &&  (!(key in iWorkflow) || iWorkflow[key] !== params['type'])) {
              //   iWorkflow.enabled = false;
              // }
              if (activeIndex > -1) {
                iWorkflow.filter.activeIndex = activeIndex;
                ms.activeFilter = iWorkflow.filter.options[activeIndex];
                ms.activeFilterFormatted = UtilitiesService.camelToDash(ms.activeFilter).split('-')
                ms.activeFilterFormatted.forEach(function(word, index) {return word.substring(0,1).toUpperCase() + word[index].substring(1)})
                ms.activeFilterFormatted = ms.activeFilterFormatted.join(" ");
                workflows[i].active = false;
              }
            }
            workflows.filter(function(w, i) {return !w.complete})[0].active = true;
          }

        }
      }
    }

    function setActivePerson(initial) {
      ms.activeModule.activePerson = initial;
      // $timeout(function() {$scope.$apply()})
      $state.go('^.milestones', {initial: initial, filter: teamDefaultDict[initial]})
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