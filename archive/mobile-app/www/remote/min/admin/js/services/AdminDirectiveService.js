angular
.module('uguru.admin')
.factory("AdminDirectiveService", [
  '$state',
  '$timeout',
  '$localstorage',
  'RootService',
  AdminDirectiveService
  ]);

function AdminDirectiveService($state, $timeout, $localstorage, RootService) {


    return {
        getAllDirectives: getAllDirectives,
        getBaseComponents: getBaseComponents,
        getCustomComponents: getCustomComponents,
        getBaseComponentHtml: getBaseComponentHtml
    }

    function getBaseComponents() {
        //todo
        var baseComponentDict = {
            input: ['hover', 'focus', 'blur', 'disabled', 'typing', 'typing:valid', 'typing:invalid', 'selected', 'valid', 'invalid', 'invalid:clear', 'default', 'onEnter', 'onExit', 'empty:hover', 'empty:focus', 'empty:blur', 'empty:invalid'],
            checkbox: ['onLoad', 'onEnter', 'unchecked:hover', 'unchecked:active', 'checked', 'checked:hover', 'checked:active', 'disabled'],
            radio: ['onExit', 'onLoad', 'onEnter', 'unchecked:hover', 'unchecked:active', 'checked', 'checked:hover', 'checked:active', 'disabled'],
            toggle: ['default', 'onLoad', 'onEnter', 'onExit', 'checked', 'hover', 'active', 'disabled'],
            dropdown: ['info:hover', 'option:active', 'option:disabled', 'option:hover', 'onClose', 'onOpen', ':disabled', ':active', ':hover', 'onExit', 'onEnter', 'onLoad', 'default'],
            body: ['default', 'onLoad', 'onEnter', 'onEnter-short', 'onExit', 'onExit-short'],
            header: ['default', 'onEnter', 'onExit', 'onExit-alt'],
            image: ['default', 'onLoad', 'onEnter', 'onExit', 'broken'],
            tooltip: ['defaultTop', 'onEnterTop', 'onExitTop', 'onCompleteTop', 'onSwitchTop', 'defaultRight', 'onEnterRight', 'onExitRight', 'onCompleteRight', 'onSwitchRight', 'defaultBottom', 'onEnterBottom', 'onExitBottom', 'onCompleteBottom', 'onSwitchBottom', 'defaultLeft', 'onEnterLeft', 'onExitLeft', 'onCompleteLeft', 'onSwitchLeft'],
            button: ['default', 'onDrawEnter', 'onEnter', 'onExit', 'onHover', 'onActive', 'defaultLine', 'onDrawEnterLine', 'onEnterLine', 'onExitLine', 'onHoverLine', 'activeLine']
        }
        return baseComponentDict
    }

    function getCustomComponents() {
        var customComponentDict = {
            projector: ['template']
        }
        return customComponentDict
    }

    function getBaseComponentHtml(input_name) {

        var uPrefix = Object(getBaseComponents()).keys().indexOf(input_name) > -1 && "u-" || '';
        if (uPrefix.length) {
            var base_url = RootService.getBaseUrl() + 'shared/templates/components/base/' + input_name.toLowerCase() + '.tpl';
        } else {
            var base_url = RootService.getBaseUrl() + 'shared/templates/components/containers/' + input_name.toLowerCase() + '.tpl';
        }


        return "<ion-view class='flex-wrap-center full-xy absolute'> <" + uPrefix + input_name.toLowerCase() + "></" + input_name.toLowerCase() + "> </ion-view>"
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
