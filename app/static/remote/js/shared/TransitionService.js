angular
    .module('sharedServices')
    .factory('TransitionService',[TransitionService
        ]);

function TransitionService() {

    var supportedCrossPlatformTransitionListeners = ['oTransitionEnd', 'transitionend', 'webkitTransitionEnd'];
    var elemFuncDict = {};
    return {
        initListener:initListener,
        appendFuncToListener:appendFuncToListener
    }

    function initListener(elem){
        elem = elem || window.document.querySelector('ion-side-menu-content');
        if (!elem) return;

        transitionEvents = supportedCrossPlatformTransitionListeners.slice();

        for (var i =0; i < transitionEvents.length; i++) {
            consoleLogFunc = function(e) {
                return
            }
            elemFuncDict[elem.id] = [];
            elem.addEventListener(transitionEvents[i], runFunctionsForEvent);
        }

    }

    function appendFuncToListener(elem, func) {
        if (!elem || !elem.id) {
            return;
        }

        elemFuncDict[elem.id].push(func);
    }

    function runFunctionsForEvent(e) {


        var elem = e.target;
        oneElemFunctionArr = elemFuncDict[elem.id];

        if (!oneElemFunctionArr || !oneElemFunctionArr.length) {
            return;
        }
        for (var i = 0; i < oneElemFunctionArr.length; i++) {
            indexFunction = oneElemFunctionArr[i];
            indexFunction();
        }
    }

}