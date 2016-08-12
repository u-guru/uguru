angular.module('uguru.shared.services')
.factory("SwitchService", [
    '$timeout',
    '$state',
    'UtilitiesService',
    'AnimationService',
    'RootService',
    'DirectiveService',
    SwitchService
        ]);

function SwitchService($timeout, $state, UtilitiesService, AnimationService, RootService, DirectiveService) {
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
        isPartOfSwitcheSet: isPartOfSwitchSet,
        parseSwitches: parseSwitches

      };

      function parseSwitches(element, attr) {
        var switchDict = {};
        var switchesMainAttrArray = parseSwitchesMainAttr(attr);
        var allPossibleSwitchAttrArr = [];
        var validClassesToWatch = [];
        switchesMainAttrArray.forEach(function(str, i) {switchesMainAttrArray[i] = {name: str, on:{args: null, }, nameDashed: 'switch-' + str.toLowerCase()}});
        for (var i = 0; i < switchesMainAttrArray.length; i++) {
          var iSwitchObj = switchesMainAttrArray[i];
          iSwitchObj.value = false;
          var iSwitchCamelName = UtilitiesService.camelCase(iSwitchObj.nameDashed);
          var className;

          var attrKeys = Object.keys(attr).slice();
          for (var j = 0; j < attrKeys.length; j++) {
            var indexKey = attrKeys[j].toLowerCase();
            var onArg = (iSwitchCamelName.toLowerCase() + 'on').trim();
            var offArg = (iSwitchCamelName.toLowerCase() + 'off').trim();

            if (indexKey === onArg) {
              className = attrKeys[j].replace('Off', '').replace('On', '').replace('off', '').replace('on', '');
              className = UtilitiesService.camelToDash(className).toLowerCase();
              validClassesToWatch.indexOf(className) === -1 && validClassesToWatch.push(className)
              iSwitchObj.on = {args: DirectiveService.parseArgs(attr[attrKeys[j]]), camel:attrKeys[j], dashed: UtilitiesService.camelToDash(attrKeys[j])}
            }
            if (indexKey === offArg) {
              className = attrKeys[j].replace('Off', '').replace('On', '').replace('off', '').replace('on', '');
              className = UtilitiesService.camelToDash(className).toLowerCase();
              validClassesToWatch.indexOf(className) === -1 && validClassesToWatch.push(className)
              iSwitchObj.off = {args: DirectiveService.parseArgs(attr[attrKeys[j]]), camel:attrKeys[j], dashed: UtilitiesService.camelToDash(attrKeys[j])}
            }

          }


          switchDict[switchesMainAttrArray[i].name] = iSwitchObj;
        }
        switchDict.classes = validClassesToWatch;
        console.log(switchDict);
        return switchDict;

        function getSwitchAttr(name) {

        }

        function parseSwitchesMainAttr(attr) {
          var switchesNameStr = UtilitiesService.removeAllOccurrancesArr(attr.switches, ['[', ']']);
          switchesNameStr = UtilitiesService.replaceAll(switchesNameStr, ', ', ',');
          switchNameArr = switchesNameStr.split(',');
          return switchNameArr
        }

      }


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
