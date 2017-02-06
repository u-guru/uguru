angular.module('uguru.shared.services')
.factory("EvalService", [
    "$compile",
    "$parse",
    "$interpolate",
    "$rootScope",
    EvalService
        ]);

function EvalService($compile, $parse, $interpolate, $rootScope) {
    var supportedActions = ["set", "apply", "increment", "decrement", ""]
    return {
        parseRawExpression: parseRawExpression,
        parseAndRenderExpressions: parseAndRenderExpressions,
        getExpressionTypes: getExpressionTypes,
        renderActionExpressions: renderActionExpressions
    }

    function parseAndRenderExpressions(element, scope, attr, eval_actions, context) {

        if (!scope && context.type === 'init') {
            attr.$set('evalAgain', true)
            return;
        }
        if (eval_actions.raw.indexOf('eval:[') === -1 && eval_actions.raw.indexOf('e:[') === -1) {
            return
        }
        var evalArgs = eval_actions.parsed && getEvalArgs(eval_actions.parsed);

        if (evalArgs.varName && evalArgs.action) {

            renderEvalStatement(scope, evalArgs);
        }

        // console.log(expr_str)

        // var exprTypes = getExpressionTypes(expr_str);
        // console.log(scope, )
        // var exprArr = expr_str.split(', ').join(',').split(',');
        // exprArr.forEach(function(expr, i) {
        //     exprArr[i] = parseRawExpression(expr)
        // })
        // return exprTypes;
    }

    function renderEvalStatement(scope, eval_dict) {
        if (eval_dict.delay) {
            $timeout(function() {
                renderEvalStatement(eval_dict)
            }, eval_dict.delay + 0)
            return;
        }
        // if (!('vars' in scope)) {
        //     scope.vars = {};
        // }

            // console.log($interpolate(eval_dict.value.current)(scope))
            var evalString =  eval_dict.varName + '=' + autoDetectValueType($interpolate(eval_dict.value.current)(scope), eval_dict);

            scope.$parent.$eval(evalString);
            // console.log(evalString)
            // console.log(scope.$parent.view.data.tabIndex)
        return;
    }

    function autoDetectValueType(current, dict) {
        var parsedResult = current;
        // console.log(current);
        if (!dict.type) {
            if (["true", "false"].indexOf(current) > -1) {
                dict.type = 'bool';
            } else if (parseFloat(current) !== NaN) {
                dict.type = 'num';
            } else {
                dict.type = 'string';
            }
        }
        if (dict.type === 'num') {
            parsedResult = parseFloat(current)
        }
        if (dict.type === 'bool') {
            parsedResult = (current === 'true')
        }

        return parsedResult
    }

    function getEvalArgs(eval_str) {
        var evalSplit = eval_str.split(":");
        var evalDict = {};
        evalSplit.forEach(function(arg, i) {
            if (i > 1 && (!evalDict.action || !evalDict.varName)) {
                return {};
            }
            if (!evalDict.action) {
                evalDict.action = arg;
            }
            else if (!evalDict.varName) {
                evalDict.varName = arg;
            } else if (!eval.value) {
                evalDict.value = parseEvalValue(arg)
            } else if (!eval.delay) {
                evalDict.delay = parseInt(arg);
            } else if (!eval.repeat) {
                evalDict.repeat = parseInt(arg)
            }

        })

        return evalDict;

        function parseEvalValue(str) {
            var strSplit = str.split('|');
            var type = 'num';
            if (strSplit.length > 1) {
                type = strSplit[1];
            }
            return {
                    type: type,
                    original: str,
                    current: str,
                    interpolate: str.indexOf('{{'),
                    history: [str]
                }
        }
    }

    function getExpressionTypes(scope, action_dict) {

        for (key in action_dict) {
            var actionType = key;
            actionInfo = action_dict[key];
            if (['prop', 'send', 'anim', 'eval'].indexOf(actionType) > -1) {
                renderActionExpressions(scope, actionInfo);
            }
        }
        return action_dict;
    }


    function renderActionExpressions(scope, attr, actionInfo) {
        var delayedInterpolArr = [];
        var actionInfo = angular.copy(actionInfo);
        for (key in actionInfo) {
            var actionValue = actionInfo[key];
            var actionType = typeof actionValue;

            if (actionType === "string" && actionValue.indexOf("{{") === -1) {
                continue
            }
            else if (actionType  === "string" && actionValue.indexOf('{{') > -1) {

                if (!scope) {
                    attr.$set('interpolate', true);
                    delayedInterpolArr.push(getInterpolationFunction(actionInfo, key));

                } else {

                    actionInfo[key] = $interpolate(actionValue)(scope);
                }

            } else
            if (actionType === "object") {
                for (avKey in actionValue) {
                    if (typeof actionValue[avKey] === "string" && actionValue[avKey].indexOf('{{') > -1) {

                        if (scope) {
                            // actionValue[avKey] = renderActionExpressions(scope, attr, actionValue[avKey])
                            actionValue[avKey] = $interpolate(actionValue[avKey])(scope);

                        } else {
                            attr.$set('interpolate', true);
                        }

                    }
                }

            }
        }
        if (delayedInterpolArr.length) {
            attr.$set('interpolate', true);
        }
        function getInterpolationFunction(action_info, key) {
            return function(scope) {
                action_info[key] = $interpolate(action_info[key])(scope);
            }

        }
        return actionInfo
    }





    function parseRawExpression(expr_str) {
        var result = {};
        return result;
    }
}
