angular
.module('uguru.admin')
.factory("AdminInspectService", [
  '$state',
  '$timeout',
  '$localstorage',
  'RootService',
  'UtilitiesService',
  'DirectiveService',
  AdminInspectService
  ]);

function AdminInspectService($state, $timeout, $localstorage, RootService, UtilitiesService, DirectiveService) {
    return {
        getPropArr:getPropArr,
        getAttrDict: getAttrDict
    };

    function getAttrDict(scope, element, attr, style) {
        var supportedStates = DirectiveService.getSupportedOnStates()
        supportedStates.forEach(function(state, index) { supportedStates[index] = UtilitiesService.camelCase(state) })

        var resultDict = {};
        var elementKeys = Object.keys(attr).slice();

        for (key in elementKeys) {
            var strKey = elementKeys[key];

            if (supportedStates.indexOf(strKey) > -1) {

                var rawString = attr[strKey].substring();

                var obj = (rawString && rawString.length && DirectiveService.parseArgs(rawString + ''))
                var firstKey = Object.keys(obj)[0]
                var secondKey = Object.keys(obj[firstKey])[1];
                console.log();


                resultDict[strKey] = {raw: rawString, type: firstKey, arr:obj[firstKey][secondKey] , activate: getActivateFunc(scope, element, obj)};
            }
        }
        resultDict.style = {raw: style, arr: getPropArr(style), type:'css', activate: null}
        console.log(resultDict);
        return resultDict;
    }

    function getPropArr(style_attr) {
        var cssKVSplit = (style_attr + '').split(';')
        var propArr = [];
        cssKVSplit.forEach(
            function(css_pair, index) {
                var cssPairSplit = css_pair.split(':');
                if (cssPairSplit[1]) {
                    propArr.push(
                        {
                            prop: cssPairSplit[0].trim(),
                            value: cssPairSplit[1]
                        }
                    )
                }
            })
        return propArr;
    }

    function getActivateFunc(scope, element, obj) {
        return function() {
            var supportedCommands = DirectiveService.supportedCommands;
            for (key in obj) {
                if (supportedCommands.indexOf(key) > -1) {
                    console.log('activating');
                    DirectiveService.activateArg(key, obj[key], scope, element);
                }
            }
        }
    }


}
