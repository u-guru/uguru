angular
.module('uguru.shared.services')
.factory('LoaderService', [
    '$rootScope',
    'CompService',
    LoaderService
    ]);

function LoaderService($rootScope, CompService) {
    var loaderAttrs = ['min-ms'];
    return {
        getDefaultLoader: getDefaultLoader,
        getParentBgColor: getParentBgColor,
        setInheritedCSS: setInheritedCSS,
        renderLoaderAttrs: renderLoaderAttrs
    }

    function getDefaultLoader() {

    }

    function renderLoaderAttrs(scope, attr, loader_info) {

        var attrDict = loader_info || {};
        for (attr_name in attr.$attr) {

            if (loaderAttrs.indexOf(attr.$attr[attr_name]) > -1) {


                attrDict[attr_name] = attr[attr_name];
            }
        }
        if (attrDict.minMs) {
            attrDict.minMs = parseInt(attrDict.minMs);
        }


        return attrDict;
    }

    function setInheritedCSS(elem, info_dict){

        // info_dict.width = info_dict.width + 100
        for (prop in info_dict) {
            CompService.css.apply(elem, prop, info_dict[prop]);
        }
    }

    function getParentBgColor(elem, attr, bg_opacity) {
        bg_opacity = bg_opacity || 0.8
        var bgColor = CompService.getParentBackgroundColor(elem);

        if ('background' in bgColor && bgColor.background.indexOf('rgba(0, 0, 0, 0)') === -1
                && ((bgColor.background.indexOf('rgb') > -1) || (bgColor.background.indexOf('rgba') > -1))
            ) {

            return bgColor.background;
        } else {
            var bodyBackground = window.getComputedStyle(document.body)['background'];
            if (bodyBackground.indexOf('rgb(') > -1) {
                var rgbStr = 'rgba(' + bodyBackground.split('rgb(')[1].split(')')[0] + ', ' + bg_opacity + ')';
                return rgbStr;
            }
        }
    }


}