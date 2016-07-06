angular
.module('uguru.admin')
.factory("AdminDirectiveService", [
  '$state',
  '$timeout',
  '$localstorage',
  AdminDirectiveService
  ]);

function AdminDirectiveService($state, $timeout, $localstorage) {


    return {
        getAllDirectives: getAllDirectives
    }

    function getAllDirectives() {
        var appDirectiveModules = angular.module('uguru.shared.directives')
        var resultsArr = [];
        appDirectiveModules['_invokeQueue'].forEach(
            function(value){
                var title = value[2][0];
                var args = parseDirectiveSpec(value[2][1]);
                var resultDict = {
                    title: title,
                    type: args.type,
                    replace: args.replace || false,
                }
                if (args.tags) resultDict.tags = args.tags;
                resultsArr.push(resultDict);
            }
        )
        return resultsArr
    }

    function parseDirectiveSpec(args_arr) {
        var resultDict = {type: parseType}
        var lastArg = args_arr[args_arr.length - 1]
        if (!lastArg) {
            responseDict = args_arr();
        } else {
            responseDict = lastArg();
        }
        responseDict.type = parseType(responseDict['restrict'])
        delete responseDict['restrict'];

        return responseDict

        function parseType(dir_type) {

            if (dir_type.length === 1 && dir_type.toLowerCase() === 'a') {
                return 'attribute'
            } else {
                return 'element'
            }
        }
    }


}
