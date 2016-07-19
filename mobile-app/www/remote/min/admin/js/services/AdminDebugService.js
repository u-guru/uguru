angular
.module('uguru.admin')
.factory("AdminDebugService", [
  '$state',
  '$timeout',
  '$localstorage',
  'RootService',
  AdminDebugService
  ]);

function AdminDebugService($state, $timeout, $localstorage, RootService) {


    return {
        applyHighlight: applyHighlight,
        getAllDebugElems: getAllDebugElems,
        getParentScope: getParentScope
    }

    function applyHighlight() {

    };

    function getParentScope(elem) {
        console.log(elem);
        var controllerInfo = elem.getAttribute('ng-controller');
        var controllerInfoSplit = controllerInfo.split(' as ');
        if (controllerInfoSplit.length > 1) {
            return controllerInfoSplit[controllerInfoSplit.length - 1]
        }
    }

    function getAllDebugElems(parent_elem) {
        var debugElems = parent_elem.querySelectorAll('[debug-id]');
        var resultArr =[];
        for (var i = 0; i < debugElems.length; i++) {
            var elemIndexDebugInfo = processDebugElem(debugElems[i])
            if (elemIndexDebugInfo.id) {
                resultArr.push(elemIndexDebugInfo);
            }
        }
        return resultArr;
    }

    function processDebugElem(elem) {
        return {
            id: elem.getAttribute('debug-id') || null
        }
    }

}
