angular
    .module('uguru.shared.services')
    .factory('DataService', [
    '$timeout',
    '$compile',
    '$parse',
    '$rootScope',
    '$stateParams',
    '$interpolate',
    'XHRService',
    'SendService',
    DataService
    ]);

function DataService($timeout, $compile, $parse, $rootScope, $stateParams, $interpolate, XHRService, SendService) {
  var initConfigDict = {
    vars: {},
    base_url: "",
    scripts: [],
  };
  var lib = {random: getRandomDataFuncs()}
  var dataMappings = {};
  var componentModule = baseCompModule;
  var registeredComponents = [];
  var dataCache = {views: {}}
  return {
    parseAppDataJson: parseAppDataJson,
    parseDataParams: parseDataParams,
    registerMappingFunc: registerMappingFunc,
    registerDirectives: registerDirectives,
    detectDataType: detectDataType,
    dataMappings: dataMappings,
    dataCache: dataCache,
    applyListParams: getApplyListParamsFunc($rootScope),
    initComponent: registerDOMCustomComponents,
    initNewAttrDirective: initNewAttrDirective
  }

  function getApplyListParamsFunc(root) {
    instantiateRootListFunctions(root);
    return function(list_str, root) {

      var resultStr = '';
      var listVarSplit = list_str.split(' in ');
      var list = {};
      list.var = listVarSplit[0];
      list.arr = listVarSplit[1];

      if (list.arr.indexOf(':') > -1) {

        var fullListArgsSplit = list.arr.split(']:');

        if (fullListArgsSplit.length > 1) {
          var fullListArgs = fullListArgsSplit[1].split(':');
          fullListArgs.length && fullListArgs.forEach(function(arg, i) {
            list.arr = processListArg(list, arg, i)
          })
        } else if (list.arr.split("':").length > 1) {
          var fullListArgsSplit = list.arr.split("':");
          var fullListArgs = fullListArgsSplit[1].split(':');
          fullListArgs.length && fullListArgs.forEach(function(arg, i) {
            list.arr = processListArg(list, arg, i)
          })
        }
        else {
          var listSplit = list.arr.split(':');
          var listName = listSplit[0];
          var fullListArgs = listSplit.splice(1);
          fullListArgs.length && fullListArgs.forEach(function(arg, i) {
            list.arr = processListArg(list, arg, i)
          })
        }

      }


      function processListArg(list, list_str, i) {
        var list_arr = list.arr
        if (list_str.indexOf('reverse') > -1) {
          list_arr = list_arr.replace(':reverse', '');
          list_arr = list_arr + ' | orderBy:reverse:true'
        }
        if (list_str.indexOf('filter') > -1) {
          list_arr = list_arr.replace(':filter', '')
        }
        if (list_str.indexOf('up') > -1) {
          list_arr = list_arr.replace(':up', '');
          list_arr = list_arr + ' | orderBy '
        }
        if (list_str.indexOf('down') > -1) {
          list_arr = list_arr.replace(':down', '');
          list_arr = list_arr + ' | orderBy:reverse:true'
        }
        if (list_str.indexOf('trim') > -1) {
          var sliceSplit = list_arr.split('trim(')
          var sliceStr = '';
          if (sliceSplit.length) {
            var slicePortion = sliceSplit[1].split(')')[0];

            var sliceStr = ':trim('  + slicePortion + ')';
            list_arr = list_arr.replace(sliceStr, '');;
            slicePortion = slicePortion.replace(', ', ',');
            var sliceParams = slicePortion.split(',');;
            sliceParams.length && sliceParams.forEach(function(slice_param, i) {
              sliceParams[i] = parseInt(slice_param);
            })
            if (sliceParams.length === 1) {
              list_arr = list_arr + '| limitTo:' + sliceParams[0];
            } else {
              list_arr = list_arr + '.slice(' + sliceParams[0] +  ',' + sliceParams[1] +  ')';
            }
          }

          // list_arr = list_arr + ' | orderBy:reverse:true'
        }
        return list_arr;
      }
      // console.log([list.var, list.arr].join(' in ::') + ' track by $index')
      return [list.var, list.arr].join(' in ') + ' track by $index';
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

  function registerDOMCustomComponents(component_arr) {
    var componentLength = component_arr.children.length;
    for (var i = 0; i < componentLength; i++) {
      var component = component_arr.children[i];
      if (!component.nodeName) continue;
      var compDict = {
        name: camelCase(component.nodeName.toLowerCase()),

      }

      if ('attributes' in component) {
        var attributes = component.attributes;

        compDict.fields = getFieldsFromAttributes(attributes);

      }
      if ('scope' in compDict.fields) {
        compDict.scope = false;
      }
      else if (Object.keys(compDict.fields ).length) {
        compDict.scope = compileComponentVars({external: compDict.fields});
      }
      compDict.template = component.innerHTML

      registerOneDirective(compDict)

    }

    function getFieldsFromAttributes(attr_dict) {
      var _dict = {};
      var no_value_fields = ['no-scope'];
      for (attr_name in attr_dict) {

        var kv = attr_dict[attr_name];
        if (kv.name === 'no-scope' && (!kv.value || !kv.value.length)) {
            _dict['scope'] = false;
        } else if (kv.name === 'preprocess') {
          delete _dict['preprocess']
        }
        else if  (kv.value) {
          var elemType = kv.value;
          _dict[kv.name] = kv.value
        }

      }

      return _dict;
    }
  }

  function registerDirectives(component_dict) {

    // for (component in component_dict) {
      var compSpec = component_dict[component];
      var templateUrl = 'template_url' in compSpec && compSpec['template_url']

      var scope = 'fields' in compSpec || {};

      var camelName = camelCase(component.toLowerCase());

      registerOneDirective(camelName, scope, templateUrl);

    // }

  }

  // function registerOneDirective(name, scope, template_url, template) {
  //   console.log()
  //    angular.module('uguru.shared.directives').directive(name, ['$compile', function($compile) {
  //     return {
  //       restrict: 'E',
  //       templateUrl: template_url || null,
  //       template: template || null,
  //       scope: _scope,
  //       replace: true,
  //       link: function(scope, element, attr) {
  //         console.log(element)
  //         // console.log(elemento)
  //       }
  //     }
  //   }])


  // }

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
        if (var_name.indexOf('-') > -1) {
          var temp = vars.external[var_name];
          var_name = camelCase(var_name);
          delete vars.external[var_name]
          vars.external[var_name] = temp;
        }
        if (['dict'].indexOf(vars.external[var_name]) > -1) {
          resultScope[var_name] =  '<' + var_name;
        }
        if (['string'].indexOf(vars.external[var_name]) > -1) {
          resultScope[var_name] =  '&' + var_name;
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
    }
    return var_dict;


  }

  function registerOneDirective(dir_info) {
    if (registeredComponents.indexOf(dir_info.name) === -1) {
      console.log('registering..', dir_info.name, registeredComponents);
      registeredComponents.push(dir_info.name)
    } else {
      console.log('already registered', dir_info.name, registeredComponents);
      return;
    }
    if ('url' in dir_info.fields && dir_info.fields.url.length) {
      dir_info.template_url = dir_info.fields.url;

      delete dir_info.fields.url
    }
    componentModule.directive(dir_info.name, ['ElementService', function(ElementService) {
      var dirObj = {
        restrict: 'E',
        scope: dir_info.scope,
        replace:true,
        transclude:true,
        priority:100,
        templateUrl: dir_info.template_url,
        controllerAs:'comp',
        bindToController:true,
        template: !dir_info.template_url && function(element, attr) {
          var e = angular.element(dir_info.template);
          if (e[0].outerHTML) {
            e.removeAttr('u');
          // e.removeAttr('ngRepeat');
            attr.$set('u', '');
            return e[0].outerHTML
          } else {
            element[0].removeAttribute('u')
            element.removeAttr('u');
            // attr.$set('u', '');
            return element[0].outerHTML
          }

          console.log(dir_info.template);

        },
        controller: function($element, $transclude, $scope, $attrs) {



          var comp = this;
          // comp.globals = $scope.view.data.components.wind.globals;
          // console.log($scope.comp.offsetX);
          // if ($scope.wind_svg) {

          //   // $scope.wind_svg = angular.copy($scope.wind_svg);
          //     // $scope.window[$scope.$index].position.offset.top = $scope.randInt(0, comp.globals.offset.ymax);
          //     // $scope.window[$scope.$index].position.offset.bottom = $scope.randInt(comp.globals.offset.ymin, 0);
          //     $scope.window[$scope.$index].position.offset.left = $scope.randInt(parseInt(comp.globals.offset.xmax)*-1, parseInt(comp.globals.offset.xmax)) * $scope.randInt(-2, 2);
          //     $scope.window[$scope.$index].position.offset.top = $scope.randInt(parseInt(comp.globals.offset.ymax)*-1, parseInt(comp.globals.offset.ymax)) * $scope.randInt(-2, 2);
          //     // $scope.wind_svg.position.offset.left = $scope.randInt(comp.globals.offset.xmin, comp.globals.offset.xmax) * $scope.randInt(-2, 2);
          //     // $scope.wind_svg.position.offset.top = $scope.randInt(comp.globals.offset.xmin, comp.globals.offset.xmax) * $scope.randInt(-2, 2);
          //     comp.wind_svg = $scope.window[$scope.$index]
          //     $scope.wind_svg = comp.wind_svg;
          //     // console.log($scope.wind_svg.id, $scope.wind_svg.position.offset.left, comp.wind_svg.position.offset.top)
          //     // $scope.wind_svg = comp.wind_svg
          //   // $compile($element.children())($scope)
          //   // $element.children($transclude($scope))
          //   // $element.empty();
          // }


          // $element.css('top', $scope.wind_svg.position.offset.top + '%');
          // comp.randInt = function(min, max) {
          //   console.log('running', min, max)
          //   min = Math.ceil(min);
          //   max = Math.floor(max);
          //   var result = Math.floor(Math.random() * (max - min)) + min;
          //   return result
          // }
          $scope.public = $scope.$parent.public;
          $scope.root = $scope.$parent.root;


          // $element[0].setAttribute('u', '')
          $scope.watcherIsCanceled = false;
          var whenStatesToRecompile = [];
          var elemAttr = $element[0].attributes;
          for (key in dir_info.scope) {
            if (dir_info.scope[key].charAt(0) === '&') {
              $scope.comp[key] = $scope.comp[key]()
            }
          }
          for (var i = 0; i < elemAttr.length; i++) {
            if (elemAttr[i].name.indexOf('when') > -1) {
              console.log($attrs[$attrs.$normalize(elemAttr[i].name)])
              var camelAttr = $attrs.$normalize(elemAttr[i].name);
              var interpolatedValue = $interpolate(elemAttr[i].value)($scope);
              // console.log(camelAttr,interpolatedValue);
              $attrs.$set(camelAttr, interpolatedValue);
              $element.attr(elemAttr[i].name, interpolatedValue)

            }
          }

          var watcher = $scope.$parent.$watch('view.main.ready', function(value) {

            if (value) {






              comp.states = ElementService.renderElementStates($element, $attrs);

              if (comp.states.init) {
                comp.states.init.forEach(function(state, i) {
                  if (state.name === 'init' && state.type === 'on') {
                    comp.states.on.push(state);
                  } else if (state.exec && state.name !== 'after') {
                    // console.log(state.name)
                    state.exec($element, null, $attrs)
                  }
                })
              }
              if (comp.states.on) {
                comp.states.on.forEach(function(state, i) {
                  state.exec($element, $scope, $attrs);
                })
              }
              SendService.precompileSendActionArgs(comp.states, $scope, $element, $attrs)


              $scope.watcherIsCanceled = true;

              watcher();
            }
            // var e = $transclude($scope);
            // console.log($element[0].outerHTML)
            // console.log($element[0]);

            // console.log('main status from defined component', value);

            // // $scope.wind_svg = $scope.$parent.wind_svg
            // // console.log($attrs.whenTabIndexChanged)

          })







          // console.log($scope.wind_svg.position.offset)

          // this.innerElem = $transclude($scope);
          // console.log($transclude(function(elem, scope) {
          //   console.log(elem[0])
          // }))
          // console.log($attrs)
          // $attrs.$set('u', '');
          // var e = $compile($element)($scope);



          // console.log(e)
          // $element.css('display', 'initial');
          // $element.replaceWith(e)

          // console.log(e[0])



          // console.log($transclude(function(element, scope) {console.log(element[0])}).contents())
        },
        link: {pre: function prelink(scope, element, attr, ctrl, tr) {
          // if (scope.watcherIsCanceled) {
          //   console.log('it is canceled')
          // } else {
          //   var cancelWatcher = scope.$watch('watcherIsCanceled', function(value) {
          //     if (value) {
          //       console.log('watcher is now canceled')
          //       cancelWatcher();
          //     }
          //   })
          //   console.log('it is NOT canceled')
          // }
          // function renderWhenStates() {
          //   if (ctrl.states && ctrl.states.when.length) {
          //     var varStates = ElementService.filterVarStates(comp.states.when);
          //     if (varStates.length) {
          //       ElementService.registerVarStates(scope, element, attr, varStates);
          //     }
          //   }
          // }

          // if (!scope.watcherIsCanceled) {
          //   scope.watcherIsCanceled = scope.$watch('' function() {

          //   });
          // }
          // ElementService.renderElementStates(element,attr);
          // console.log(element[0])
          }
        }
      }
      return dirObj
    }])
  }

  function initNewAttrDirective(options) {
    var dirName = camelCase(options.pre + '-' + options.postdash);
    var valueSplit = options.value.indexOf(';') > -1 && options.value.split(';') || options.value.split(':');
    var cssArr = [];

    if (valueSplit.length > 1) {
      valueSplit.forEach(function(val) {
        var css = {};
        var valSplit = val.split(':')
        css.key = valSplit[0];
        css.value = valSplit[1];
        cssArr.push(css);
      })


    }
    // console.log(valueSplit, dirName)
      componentModule.directive(dirName, ['ElementService', function(ElementService) {
      var dirObj = {
        restrict: 'A',
        scope: false,
        replace:true,
        priority:100,
        compile: function(element, attr) {
          cssArr && cssArr.forEach(function(css) {
            element.css(css.key, css.value);
          })

        }
      }
      return dirObj;
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

  function getRandomDataFuncs() {
    return {
      lorem:generateRandomLoremIpsum
    }

    function generateRandomLoremIpsum(word_length) {
      return loremChunk.split(' ').slice(0, word_length).join(" ");
    }
  }


  function mapDataFromOneSourceToMain(data_scope) {





  }
}

function generateDataSet(type, length, min, max) {


  function generateRandomDataSet() {

  }

  function generateLoremIpsumDataSet() {

  }
}




var loremChunk = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eaedem res maneant alio modo. Ut optime, secundum naturam affectum esse possit. Disserendi artem nullam habuit. Apud imperitos tum illa dicta sunt, aliquid etiam coronae datum; Quorum altera prosunt, nocent altera. Videamus animi partes, quarum est conspectus illustrior; Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Quae cum dixisset paulumque institisset, Quid est? Nunc agendum est subtilius. Aperiendum est igitur, quid sit voluptas; Quis est tam dissimile homini. Inde sermone vario sex illa a Dipylo stadia confecimus. Verum tamen cum de rebus grandioribus dicas, ipsae res verba rapiunt; Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Sed vos squalidius, illorum vides quam niteat oratio. Non dolere, inquam, istud quam vim habeat postea videro; In schola desinis. Qui est in parvis malis. Nondum autem explanatum satis, erat, quid maxime natura vellet. Et ille ridens: Video, inquit, quid agas; Miserum hominem! Si dolor summum malum est, dici aliter non potest. An vero, inquit, quisquam potest probare, quod perceptfum, quod. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. Incommoda autem et commoda-ita enim estmata et dustmata appello-communia esse voluerunt, paria noluerunt. Dic in quovis conventu te omnia facere, ne doleas. Habent enim et bene longam et satis litigiosam disputationem. Non dolere, inquam, istud quam vim habeat postea videro; Nec vero alia sunt quaerenda contra Carneadeam illam sententiam. Duo Reges: constructio interrete. At modo dixeras nihil in istis rebus esse, quod interesset. Nam ista vestra: Si gravis, brevis; Ergo, si semel tristior effectus est, hilara vita amissa est? Aliter homines, aliter philosophos loqui putas oportere? Atqui iste locus est, Piso, tibi etiam atque etiam confirmandus, inquam; Etenim semper illud extra est, quod arte comprehenditur. Etenim semper illud extra est, quod arte comprehenditur. Quae diligentissime contra Aristonem dicuntur a Chryippo."