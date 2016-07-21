angular.module('uguru.shared.services')
.factory("SwitchService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    'RootService',
    SwitchService
        ]);

function SwitchService($timeout, $state, UtilitiesService, AnimationService, RootService) {
      var parseElemAttrs;
      var isPartOfSwitchSet;
      /*todo
             --> notify siblings + delay
             --> refactor code + apply to on-enter, etc
             --> does delay work?
             --> docs+demo
      */
      return {

        parseElemAttrs: parseElemAttrs,
        isPartOfSwitcheSet: isPartOfSwitchSet

      };


      function parseElemAttrs(scope, elem, attr) {

        if (attr && 'switch' in attr && attr.switch.length) {
          var switch_arr_str = attr.switch.split(',');
          var switchObj = {};
          for (var i = 0; i < switch_arr_str.length; i++) {
            var indexSwitchStr = switch_arr_str[0];
            var indexSwitchSplit = indexSwitchStr.split(':')
            var switchName = indexSwitchSplit[0];
            switchObj.name = switchName;
            if (indexSwitchSplit.length > 1) {
              var switchAttrArgs = indexSwitchSplit.splice(1).join(':');
              var parsedSwitchOptions = parseSwitchAttrOptions(switchAttrArgs);
              switchObj.default = parsedSwitchOptions.default;
              switchObj.active = switchObj.default.indexOf('inactive') === -1
            } else {
              switchObj.active = false;
              switchObj.default = 'inactive';
            }

          }
          return switchObj;
        }
      }

      function parseSwitchAttrOptions(option_str) {
        var resultObj = {};
        if (option_str.indexOf('active') > -1) {
          resultObj.default = 'active';
          resultObj.active = true;
        }
        if (option_str.indexOf('inactive') > -1) {
          resultObj.default = 'inactive';
          resultObj.active = false;
        }
        return resultObj;
      }

      function isPartOfSwitchSet() {};

  }
