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
  var dataMappings = {};
  var componentModule = baseCompModule;
  var dataCache = {views: {}}
  return {
    parseAppDataJson: parseAppDataJson,
    parseDataParams: parseDataParams,
    registerMappingFunc: registerMappingFunc,
    registerDirectives: registerDirectives,
    detectDataType: detectDataType,
    dataMappings: dataMappings,
    dataCache: dataCache,
    applyListParams: getApplyListParamsFunc($rootScope)
  }

  function getApplyListParamsFunc(root) {
    instantiateRootListFunctions(root);
    return function(list_str, root) {

      var resultStr = '';
      var listVarSplit = list_str.split(' in ');
      var list = {};
      list.var = listVarSplit[0];
      list.arr = listVarSplit[1]
      if (list_str.indexOf(':reverse') > -1) {
        list.arr = list.arr.replace(':reverse', '') + '.reverse()';
      }


      return [list.var, list.arr].join(' in ') + ' track by ($index + 1)';
    }
  }

  function instantiateRootListFunctions(root) {
    if (!('list' in root)) root.list = {};
    root.list.incrementIndexByOne = function($index) {
      return $index + 1;
    }
  }

  function detectDataType(element, data_attr) {
    var data_attr_parsed = parseDataAttr(data_attr);
    // if (typeof data_attr_parsed === 'string') {
    //   return $parse(data_attr_parsed['name'])(parsedData)
    // }
    if ('view' in data_attr_parsed && data_attr_parsed['view'] in dataCache.views) {
      var parsedData = dataCache.views[data_attr_parsed['view']];
      return {name: data_attr_parsed['name'], data: $parse(data_attr_parsed['name'])(parsedData)}
      // if (data_attr_parsed.split('.')[0] in parsedData) {

      //   // var data_attr = $parse()(parsedData);
      //   // console.log(data_attr)
      // }
    }
    console.log(data_attr_parsed, dataCache.views[data_attr_parsed.view])

  }

  function parseDataAttr(data_attr) {
      var isVar = data_attr.indexOf(".") > -1;
      if (isVar) {
        var varSplit = data_attr.split('.');
        var ptr = dataMappings;
        varSplit.forEach(function(data_var) {
          if (data_var in ptr) {
            ptr = ptr[data_var]
            data_attr = data_attr.replace(data_var, ptr["name"])
          }
        })
        var result = {view: ptr['view'], name: data_attr};
        return result;
      } else
      if (data_attr in dataMappings) {
        return dataMappings[data_attr];
      }
  }

  function camelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
  }

  function registerDirectives(component_dict) {

    for (component in component_dict) {
      var compSpec = component_dict[component];
      var templateUrl = 'template_url' in compSpec && compSpec['template_url']
      var scope = 'fields' in compSpec || {};
      var camelName = camelCase(component.toLowerCase());

        registerOneDirective(camelName, scope, templateUrl)
    }

  }

  function registerOneDirective(name, scope, template_url) {
    console.log('registering', name, scope, template_url)
     angular.module('uguru.shared.directives').directive(name, ['$compile', function($compile) {
      return {
        restrict: 'E',
        templateUrl: template_url,
        scope: _scope,
        replace: true,
        link: function(scope, element, attr) {
          console.log(elemento)
        }
      }
    }])

  }

  function registerMappingFunc(root_scope) {

    return function(attr_name, value) {
      console.log(attr_name, value)
      if (root_scope.activeView) {
        console.log(root_scope.activeView.name)
      }
    }


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
        single_script_dict.base_url = baseURL
        fetchAndOrganizeExternalJson(data_scope, single_script_dict);

      })
    }
  }

  function fetchAndOrganizeExternalJson(data_scope, script_info) {

    var url = script_info.base_url  + script_info.path;
    var name = script_info.name || '';
    XHRService.getJSONFile('GET', url, generatePostExternalScriptCallback(data_scope, name, script_info), {})
  }

  function generatePostExternalScriptCallback(data_scope, name, script_info) {
    // console.log(mapping)
    if (!('content') in data_scope) data_scope.content = {};
    if (!name || !name.length) {
      name = 'param' - (i+1)
    }
    data_scope.config.processed.scripts = {};
    data_scope.config.processed.scripts[name] = false;

    return function(response) {
      if (script_info.mapping) {
        mapPostDataToDataScope(data_scope, response, script_info.mapping)
      } else if (script_info.mappings) {
        script_info.mappings.forEach(function(mapping) {
          mapPostDataToDataScope(data_scope, response, mapping)
        })
      }




      checkExtScriptStatus(data_scope)

      if ('parse' in data_scope.config) {
        applyAndUpdateParseData(data_scope, data_scope.config.parse)
      }

      data_scope.config.processed.scripts[name] = true;

    }
  }

  function applyAndUpdateParseData(scope, parse_fields) {
    for (key in parse_fields) {
      console.log(key, parse_fields[key][0], $parse(parse_fields[key][0])(scope));
    }
  }

  function mapPostDataToDataScope(source, incoming, spec) {
    // source['content'][spec.name] = incoming;
    if ('from' in spec) {
      var incomingFormatted = retrieveDataFromNestedPath(incoming, spec);
      if (incomingFormatted) {
        incoming = incomingFormatted
      }
    }
    if ('to' in spec) {
      setDataToNestedPath(source, incoming, spec)
    }

    if(!('to' in spec) && !('from' in spec)) {
      source['content'][name] = incoming;
    } else  if (!('to' in spec) && !('from' in spec) && !('name' in spec)){
      source['unknown-' + (new Date().getTime() + "")] = incoming;
    }
  }


  function retrieveDataFromNestedPath(incoming, spec) {

    if ('from' in spec)  {
      var path = spec.from.split('.');
      var ptr = incoming;
      var nestingNumber = 0;
      var lastVarName;
      var resp = $parse(spec.from)(incoming);
      if (typeof resp === 'object') {
        return resp;
      }


    }
  }

  function setDataToNestedPath(source, incoming, spec) {
    // console.log(source, incoming, spec)
    if ('to' in spec)  {
      var path = spec.to.split('.');
      var ptr = source;
      var nestingNumber = 0;
      var lastVarName;
      var previousPtr;
      path.forEach(function(var_name) {
        nestingNumber += 1;
        if (var_name in ptr) {
          previousPtr = ptr;
          ptr = ptr[var_name]
          // console.log(nestingNumber, var_name, ptr)
        } else {
          ptr[var_name] = {};
          previousPtr = ptr;
          ptr = ptr[var_name]
        }
        lastVarName = var_name
      })
      previousPtr[lastVarName] = incoming



    }
  }



  function checkExtScriptStatus(data_scope) {

    var script_scope = data_scope.config.processed.scripts;

    if (!('scriptStatus' in data_scope.config.processed)) {
      data_scope.config.processed.scriptStatus = {
        remaining: Object.keys(script_scope).length,
        total: Object.keys(script_scope).length,
        complete: false
      }
    }
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
      $timeout(function() {
        checkExtScriptStatus(data_scope)
      }, 100)

    }
    else {

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
      compileComponentsIntoDirectives(data_scope.components)
      if (!$rootScope.components) {
        $rootScope.components = {};
      }
      for (compName in data_scope.components) {
        $rootScope.components[compName] = data_scope.components[compName]
      }
    }
  }

  function compileComponentsIntoDirectives(comp_dict) {

    for (key in comp_dict) {
      var dirInfo = {
        name: key.replace(/-(\w)/g, function(match) {
          return match[1].toUpperCase();
          }),
        templateUrl: 'template_url' in comp_dict[key] && comp_dict[key]['template_url'],
        scope: compileComponentVars(comp_dict[key]['data']),
        config: 'config' in comp_dict[key] && comp_dict[key]['config']
      };
      if (dirInfo.name && dirInfo.templateUrl) {
        registerOneDirective(dirInfo)
      }
    }
    // baseCompModule.directive('vizBar', ['$rootScope',function($rootScope) {
    //   return {
    //     restrict: 'E',
    //     replace:true,
    //     scope: {
    //         'animationType': '=animationType'
    //     },
    //     templateUrl: function(element, attr) {
    //         return $rootScope.components[element[0].nodeName.toLowerCase()]['template_url']
    //     }
    //   }
    // }])
  }

  //todo eventually: variable service
  function compileComponentVars(vars) {
      if (!vars) return false;
      if (!('external' in vars)) return;
      var resultScope = {};
      vars.external = parseScopeVarsByType(vars.external)
      for (var_name in vars.external) {
        if (['dict'].indexOf(vars.external[var_name]) > -1) {
          resultScope[var_name] =  '<' + var_name;
        }
        else if (vars.external[var_name] === 'var') {
          resultScope[var_name] = '=' + var_name;
        } else {
          resultScope[var_name] = '@' + var_name;
        }

      }
      if (!Object.keys(resultScope).length) return false;

      return resultScope;
  }

  function parseScopeVarsByType(var_dict) {
    for (_var_name in var_dict) {
      var value = var_dict[_var_name];
      console.log(value)
    }
    return var_dict;


  }

  function registerOneDirective(dir_info) {
    console.log(dir_info.scope, dir_info.templateUrl)
    componentModule.directive(dir_info.name, [function() {
      var dirObj = {
        restrict: 'E',
        transclude:'element',
        replace:true,
        scope: dir_info.scope,
        templateUrl: function(element, attr) {
            return dir_info.templateUrl
        },
        link: function(scope, element, attr, ctrl, transclude) {
            processScopeVars(scope, attr);

            // element.append()
            // var e = transclude(scope, function(transEl, transScope) {
            //   console.log(transEl)
            // })
            // $compile(e.contents())(scope)
            // element.append(e)

          }
      }
      return dirObj
    }])
  }

  function processScopeVars(scope, attr) {

    for (attr_name in attr.$attr) {
      if (attr_name in scope) {
        if (typeof scope[attr_name] === 'function') {
          scope[attr_name] = scope[attr_name]()
        }
        detectScopeType(scope[attr_name])
      }
    }
  }

  function detectScopeType(var_data) {
    if (isArray(var_data)) {

    } else
    if (isObject(var_data)) {

      var_data.titles = [];
      var_data.arr = [];
      for (key in var_data) {
        if (['titles', 'arr'].indexOf(key) > -1) continue;
        var innerObj = {}
        innerObj.name = key;
        innerObj.contents = var_data[key];
        var_data.arr.push(innerObj)
        var_data.titles.push(key + "")
      }

      // var_data.titles =  titles.slice()
      // var_data.arr = innerObjects.slice()

      return var_data
    }
    function isObject ( obj ) {
       return obj && (typeof obj  === "object");
    }

    function isArray ( obj ) {
      return isObject(obj) && (obj instanceof Array);
    }
  }


  function mapDataFromOneSourceToMain(data_scope) {





  }

}