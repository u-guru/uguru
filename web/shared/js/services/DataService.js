angular
    .module('uguru.shared.services')
    .factory('DataService', [
    '$timeout',
    '$compile',
    '$parse',
    '$rootScope',
    '$stateParams',
    'XHRService',
    DataService
    ]);

function DataService($timeout, $compile, $parse, $rootScope, $stateParams, XHRService) {
  var initConfigDict = {
    vars: {},
    base_url: "",
    scripts: []
  };
  return {
    parseAppDataJson: parseAppDataJson,
    parseDataParams: parseDataParams
  }

  function initDataScopeAndConfig(data_scope) {
    if (data_scope === undefined) data_scope = {};
    if (data_scope && !('config' in data_scope)) {
      data_scope.config = JSON.parse(JSON.stringify(initConfigDict));
    }
  }

  function parseDataParams(data_scope, path_data) {


    var pathDepthsArr = path_data.split('/');
    var depthCont = pathDepthsArr.length;
    var varPtr = data_scope.config.vars;
    var pathParams = 'pathParams' in data_scope.config && data_scope.config['pathParams'];
    var depthNum = 0;

    pathDepthsArr.forEach(function(var_name) {

      var pathParamsDepth = pathParams && getPathParamVarsForDepth(pathParams, depthNum) || [];
      pathDepthsArr[depthNum] = {depth: depthNum, stateParam: var_name, values: pathParamsDepth}
      depthNum++;
    })

    return pathDepthsArr
  }

  function getPathParamVarsForDepth(vars_scope, depth) {
    var results = [];
    if (vars_scope && Object.keys(vars_scope)) {
      for (key in vars_scope) {
        if (vars_scope[key] === depth) {
          results.push(key)
        }
      }
    }
    return results;
  }

  function executeExternalScripts(data_scope) {
    var script_scope = data_scope.config.scripts
    var baseURL = 'base' in script_scope && script_scope.base ||'';
    if ('queue' in script_scope && script_scope.queue.length) {
      script_scope.queue.forEach(function(single_script_dict, i) {
        var url = baseURL  + single_script_dict.path;
        var name = single_script_dict.name;
        if (!name || !name.length) {
          name = 'param' - (i+1)
        }

        XHRService.getJSONFile('GET', url, generatePostExternalScriptCallback(data_scope, name), {})
      })
    }

  }

  function generatePostExternalScriptCallback(data_scope, name) {
    if (!('content') in data_scope) data_scope.content = {};
    data_scope.config.processed.scripts = {};
    data_scope.config.processed.scripts[name] = false;
    return function(response) {
      data_scope['content'][name] = response;
      data_scope.config.processed.scripts[name] = true;
      checkExtScriptStatus(data_scope)
    }
  }

  function checkExtScriptStatus(data_scope) {
    var script_scope = data_scope.config.processed.scripts;
    var numFalse = 0;
    var count = 0;
    for (key in script_scope) {

      if (key in script_scope && !script_scope[key]) {
        numFalse++;
      }
      count ++;
    }
    if (numFalse) {
      data_scope.config.processed.scriptStatus = {
        remaining: numFalse,
        total: count,
        complete: false
      }
      console.log('remaining', numFalse);
    } else {
      console.log('complete', numFalse);
      if ('complete' in data_scope.config.processed.scriptStatus) {
        data_scope.config.processed.scriptStatus.complete = true;
      } else {
        data_scope.config.processed.scriptStatus = {complete: true};
      }
    }
  }

  function parseAppDataJson(data_scope) {
    // init
    initDataScopeAndConfig(data_scope);
    data_scope.config.processed = {};

    // init

    if ('path' in $stateParams) {
      data_scope.config.processed.path = parseDataParams(data_scope, $stateParams.path)
    }

    if ('scripts' in data_scope.config) {
      executeExternalScripts(data_scope);
    }

    if ('components' in data_scope) {

      if (!$rootScope.components) {
        $rootScope.components = {};
      }
      for (compName in data_scope.components) {
        $rootScope.components[compName] = data_scope.components[compName]
      }

    }

  }

}