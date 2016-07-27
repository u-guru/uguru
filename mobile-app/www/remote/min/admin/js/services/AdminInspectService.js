angular
.module('uguru.admin')
.factory("AdminInspectService", [
  '$state',
  '$timeout',
  '$localstorage',
  'RootService',
  'UtilitiesService',
  '$window',
  AdminInspectService
  ]);

function AdminInspectService($state, $timeout, $localstorage, RootService, UtilitiesService, $window) {
    return {getPropArr:getPropArr};

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


}
