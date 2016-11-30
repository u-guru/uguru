// todo now
// - animName: in, out, set, before, after, send, setTemp
// - anim
// - tween
// - verify trigger

// todo later
// - trigger args
// - replace trigger scope.watch for 'on' states with a class that initiates the watcher (to prevent future watchers)


// var customModule = angular.module('uguru.shared.directives.custom', [])
angular.module('uguru.shared.directives')

// todo now
// - animName: in, out, set, before, after, send, setTemp
// - anim
// - tween
// - verify trigger

// todo later
// - trigger args
// - replace trigger scope.watch for 'on' states with a class that initiates the watcher (to prevent future watchers)


.directive('transcluder', function() {
// http://stackoverflow.com/questions/24615103/angular-directives-when-and-how-to-use-compile-controller-pre-link-and-post
    return {
        controller: function( $scope, $element, $attrs, $transclude ) {
            console.log( $attrs.log + ' (controller)' );
        },
        compile: function compile( tElement, tAttributes ) {
            console.log( tAttributes.log + ' (compile)'  );
            return {
                pre: function preLink( scope, element, attributes ) {
                    console.log( attributes.log + ' (pre-link)'  );
                },
                post: function postLink( scope, element, attributes ) {
                    console.log( attributes.log + ' (post-link)'  );
                }
            };
         }
     };

})
.directive('start', ['CompService', function(CompService) {
  return {
    restrict: 'A',
    compile: function(element, attr) {
      element.css('justify-content', 'flex-start');
    }
  }
}])
.directive('center', [function() {
  return {
    restrict: 'A',
    compile: function(element, attr) {
      element.css('justify-content', 'center');
    }
  }
}])
.directive('end', [function() {
  return {
    restrict: 'A',
    compile: function(element, attr) {
      element.css('justify-content', 'center');
    }
  }
}])


.directive('import', ['$parse', '$compile', '$timeout', '$rootScope', function($parse, $compile, $timeout, $rootScope) {
  return {
    restrict: 'E',
    replace:true,
    scope: false,
    templateUrl: function(element, attr) {

      var attrUrl = attr.url;
      if ($rootScope.ui && $rootScope.ui.data && 'set' in $rootScope.ui.data) {
        for (var setVar in $rootScope.ui.data.set) {
          var extended = $rootScope.ui.data.set[setVar];
          if (extended !== attr.url && attr.url.indexOf(extended) === -1) {
            attrUrl = attrUrl.replace(setVar, extended);
          }
        }
      }


      var urlSplit = attrUrl.split('.').splice(1)

      if (urlSplit.length === 2) {
        return attr.url
      }

      var ptr = $rootScope.ui.data
      // console.log(ptr, urlSplit)
      var hasSkip = false;
      urlSplit.forEach(function(url_split, i) {

         ptr = ptr[url_split]
         if (typeof ptr === 'object' && 'skip' in ptr) {
          hasSkip = true;
         }
      })
      if (hasSkip) {
        return 404
      }
      return  ptr
    },
    compile: function compile(element, attr) {
      return {
        pre: function preLink(scope, element, attr) {
          if (attr.let) {
            console.log(attr.let)
          }
        }
      }
    }
  }
}])

.directive('linkSrcData', ['XHRService', '$compile', '$timeout', '$rootScope', '$parse', function(XHRService, $compile, $timeout, $rootScope, $parse) {
  return {
    restrict: 'A',
    replace:true,
    scope:true,
    compile: function compile(element, attr) {

        var url;
        var mainUrl;
        if (attr.uSrc || window.location.href.split('8100').length > 1) {

          url = attr.linkSrcData || attr.uSrc || 'coach/static/data/site.json';
        } else if (attr.accessCode) {
          url = 'https://s3-us-west-1.amazonaws.com/ui-coach/users/' + attr.accessCode + '/app.json'
        }

        var varName = attr.linkDataName||url.split('/').reverse()[0].split('.')[0];
        var nestedVars = varName.split('.');
        mainUrl = nestedVars[0];

        if (url && url.length) {
          XHRService.getJSONFile(
            'GET',
            url,
            function(data) {
              console.log('data received!', data)


              var ptr = $rootScope;
              nestedVars.forEach(function(var_name, i) {
                ptr[var_name] = {};
                ptr = ptr[var_name];
              })
              ptr.data = data;

              $rootScope.components = data.components;
              // console.log('registering', data.components)

              // console.log(ptr.data)
              // varName = varName || 'app';

              // $rootScope[varName]= data;
            },
          {});

        }
        return {pre:
          function preLink(scope, p_elem, attr) {

            var watcherFuncCancel = $rootScope.$watch(mainUrl + '.data', function(obj) {
              var data = obj;

              scope[mainUrl] = obj;
              if (!obj || !mainUrl) return

              if ('components' in scope[mainUrl] && scope[mainUrl].components)  {
                var dataComponents = scope[mainUrl].components;
                for (component in scope[mainUrl].components) {
                    scope.root.customComponents.push({name: component, data: scope[mainUrl].components[component]});
                }

                for (component in dataComponents) {

                  var template_url = dataComponents[component].template_url
                  var fields = dataComponents[component].fields
                  var comp_scope = {};
                  if (fields && fields.length) {
                    fields.forEach(function(field_name) {
                      comp_scope[field_name] = '=' + field_name
                    })
                  }
                  angular.module('uguru.shared.directives').directive(component, ['$compile', function($compile) {
                    return {
                      restrict: 'E',
                      templateUrl: template_url,
                      scope: {background: '=background'},
                      replace: true,
                      link: {
                        pre: function preLink(_scope, _element, _attr) {
                          console.log('it gets pre linked')
                          for (attr_name in attr) {
                            console.log(attr_name, attr)
                            if (fields.indexOf(attr_name) > -1) {
                              scope[attr_name] = attr[attr_name]
                            }
                          }
                        }
                      }
                    }
                  }])


                }

              }





            })
          }
        }
      }
  }
}])
// templateUrl: function(element, attr) {
//       return $rootScope.components[element[0].nodeName.toLowerCase]
//     },
.directive('listData', ['$rootScope', 'DataService', '$compile', function($rootScope, DataService, $compile) {
  return {
    restrict: 'A',
    replace:true,
    priority: 100000,
    compile: function(element, attr) {
      var dataParams = attr.listData;

      if (!dataParams || !dataParams.length) return;

      var dataGetAttr = attr.listData;
      if (dataParams.indexOf('=') > -1) {
        dataGetAttr = dataParams.split('=')[1];
      }

      var dataObj = DataService.detectDataType(element, dataGetAttr);
      var limitTo = attr.listLimit && parseInt(attr.listLimit) || dataObj.data.length;
      var resultHtml = '';
      element[0].removeAttribute('list-data');
      element[0].removeAttribute('list-limit');
      element[0].setAttribute('data', dataObj.name);
      var outerHtml = element[0].outerHTML;
      var elem_name = element[0].nodeName.toLowerCase();
      for (var i = 0; i < limitTo; i++) {
        var outerHtmlCp = outerHtml + '';
        resultHtml += outerHtmlCp.replace(dataObj.name, dataObj.name + '[' + i + ']').replace('<' + elem_name, '<' + elem_name + ' custom');
      }
      element.replaceWith(angular.element(resultHtml))
    }

  }
}])
.directive('listDataArchive', ['XHRService', 'DataService', '$compile', '$parse', '$rootScope', function(XHRService, DataService, $compile, $parse, $rootScope) {
  return {
    restrict: 'A',
    priority: 10000,
    scope: false,
    compile: function(element, attr) {
      var dataParams = attr.listData;

      if (!dataParams || !dataParams.length) return;

      var dataGetAttr = attr.listData;
      if (dataParams.indexOf('=') > -1) {
        dataGetAttr = dataParams.split('=')[1];
      }

      var dataObj = DataService.detectDataType(element, dataGetAttr);
      var limitTo = attr.listLimit && parseInt(attr.listLimit) || dataObj.data.length;

      element.removeAttr('listData')
      attr.$set('ngRepeat', attr.listItem + ' in ::' +  dataObj.name + ' track by $index');
      attr.$set('ngInclude', '"' +  $rootScope.components[element[0].nodeName.toLowerCase()].template_url + '"');




      // var resultHtml = '';
      // attr.$set('listData', '')
      // var outerHtml = element[0].outerHTML;



      // // var elem = angular.element(resultHtml);
      // // element.contents(elem);

      // return function(scope, _element, _attr, ctrl) {
      //   transclude(scope, function(clone, inner_scope) {
      //     var result = [];
      //     dataObj.data.forEach(function(_, i) {
      //       if (i >= listBounds.start && i < listBounds.end) {
      //         var extHtml = outerHtml + '';
      //         extHtml = extHtml.replace('list-data=""', 'data="' + dataObj.data[i] + '" custom');
      //         console.log($compile(angular.element(extHtml))(scope)[0])
      //         // console.log($compile(extHtml)(scope)[0]);
      //         result.push(angular.element(extHtml));
      //       }
      //     });
      //     _element.replaceWith(result)

      //   })
      // }

    }
  }
}])
.directive('loader', ['$rootScope', 'LoaderService', function($rootScope, LoaderService) {
  return {
    restrict: 'E',
    templateUrl: function(element, attr) {
      return attr.url || 'ui/templates/components/base/loader.tpl'
    },
    transclude: true,
    controllerAs: 'loader',
    replace:true,
    scope: false,
    compile: function(element, attr, transclude) {


      return function(scope, elem, attrs, ctrl, tr) {

        elem.css('opacity', 0);
        ctrl.watchers.infoHeight = scope.$watch('loader.info.height', function(val){
          if (val) {


            ctrl.watchers.parentHeight();
            ctrl.watchers.infoHeight();
            ctrl.info.opacity = 1;
            console.log(ctrl.info.height, ctrl.info.width)
            LoaderService.setInheritedCSS(elem, ctrl.info)

          }
        })

      }
    },
    controller: function($scope, $element, $attrs, $transclude) {
      var loader = this;
      loader.info = {width: 0, height: 0};

      loader.attr = LoaderService.renderLoaderAttrs($scope, $attrs, loader.info);
      loader.duration = loader.attr.minMs || 1000;

      if (!('bg' in $attrs)) {
        loader.info['background-color'] = LoaderService.getParentBgColor($element, $attrs);
      }

      loader.watchers = {parentHeight: 0};
      var loaderParent = $element.parent()[0] || $element[0].parentNode;
      console.log(loaderParent)
      var loaderParentCoords;

        loader.watchers.parentHeight = $scope.$watch(function() {
          loaderParentCoords = loaderParent && 'getBoundingClientRect' in loaderParent && loaderParent.getBoundingClientRect() || {};

          return loaderParentCoords.height
        }, function(value) {
          if (value > 0) {
            loader.info.height = value;
            loader.info.width = loaderParentCoords.width;

          }
        })

    }
  }
}])
.directive('linkData', ['XHRService', '$compile', '$timeout', '$rootScope', '$parse', 'CompService', function(XHRService, $compile, $timeout, $rootScope, $parse, CompService) {
  return {
    restrict: 'A',

    scope: false,
    transclude: true,
    controller: function($scope) {
      $scope.view = {loader: {}};
    },
    compile: function compile(element, attr, transclude) {
      var scopeRef = null;
      if ('renderAfterExtScripts' in attr) {
        element[0].style.opacity = 0;
      }
      if ('let' in attr && attr.let && attr.let.split('=').length > 1) {
        var letSplit = attr.let.split('=');
        $rootScope.dataMappings[letSplit[0]] = {name: letSplit[1], view: attr.linkData};
      }
      var innerElems = {};
      innerElems.elements = transclude($rootScope, function(transElem, transScope) {
        innerElems.clone = transElem;
        innerElems.scope = transScope;
      });
      var preTranscludeElems = CompService.doesElemHaveLoader(innerElems.elements);


      if (preTranscludeElems.loader) {

        innerElems.loader = preTranscludeElems.loader
        innerElems.loader.setAttribute('loader', '')

        innerElems.timer = new Date().getTime();
        element.append(innerElems.loader);

        // console.log(preTranscludeElems.remaining.forEach(function( item, i) {
        //   if ('innerHTML' in item) {
        //     item.style.opacity = 0;
        //   }
        // }))

      }

      XHRService.getJSONFile(
            'GET',
        attr.linkData,
        function(data) {

          $rootScope.dataCache.views[attr.linkData] = {data: data, name: attr.name || attr.linkData };
          if (scopeRef) {
            scopeRef[attr.setDataName || 'data'] = data;
          } else {
            $timeout(function() {
              scopeRef[attr.setDataName || 'data'] = data;
            },1)
          }
        },
      {});

      return {
        pre: function(scope, p_element, p_attr) {
          scopeRef = scope;


          if ('renderAfterExtScripts' in attr) {
            scope.$watch('data.config.processed.scriptStatus.complete', function(value) {
              if (value) {

                  if (!$rootScope.activeView) {
                    $rootScope.activeView = {name: attr.linkDataName, data: scope.data};
                    // scope.$watch(attr.linkDataName + '.data', function(value) {
                        // if (value) {

                          // element.after(preTranscludeElems.remaining)

                              if (!preTranscludeElems.loader) {
                                transclude(scope, function(clone, innerScope) {
                                  if (attr.let && attr.let.length) {
                                    var letAttrSplit = attr.let.split('=');
                                    innerScope[letAttrSplit[0]] = $parse(letAttrSplit[1])(scope)
                                  }
                                  $compile(clone)(innerScope);

                                  element.append(clone);

                                })
                              }
                              else {
                                innerElems.loaderInfo = innerElems.scope.loader.info;
                                console.log()
                                var timeNow = new Date().getTime();

                                var maxLoadTime = innerElems.scope.loader.info.minMs || 1000;
                                var ttl_loader_complete = maxLoadTime - (timeNow - innerElems.timer);
                                console.log(ttl_loader_complete);
                                $timeout(function() {
                                  innerElems.clone.empty();
                                  p_element.empty();

                                  transclude(scope, function(clone, innerScope) {
                                    if (attr.let && attr.let.length) {
                                      var letAttrSplit = attr.let.split('=');
                                      innerScope[letAttrSplit[0]] = $parse(letAttrSplit[1])(scope)
                                    }
                                    for (var i = 0; i < clone.length; i++) {

                                      if (i !== preTranscludeElems.loaderIndex) {
                                        $compile(clone[i])(innerScope);
                                        element.append(clone[i]);
                                      }
                                    }
                                    console.log(clone)





                                  })


                                }, ttl_loader_complete)


                                // var clone = preTranscludeElems.remaining;
                                // if (attr.let && attr.let.length) {
                                //     var letAttrSplit = attr.let.split('=');
                                //     scope[letAttrSplit[1]] = $parse(letAttrSplit[1])(scope)
                                // };

                                // transclude(scope, function(clone, innerScope) {
                                //   console.log(clone)
                                // })

                                //   // if (attr.let && attr.let.length) {
                                //   //   var letAttrSplit = attr.let.split('=');
                                //   //   innerScope[letAttrSplit[0]] = $parse(letAttrSplit[1])(scope)
                                //   // }
                                //   // $compile(clone)(scope);

                                //   element.append($compile(preTranscludeElems.remaining)(scope));
                                // // })


                              }

                            p_element[0].style.opacity = 1;
                        // }
                    // })
                }
              }
            })
          } else {
            if (!$rootScope.activeView) {
                    $rootScope.activeView = {name: attr.linkDataName, data: scope.data};
            }
            transclude(scope, function(clone, innerScope) {

                $compile(clone)(innerScope);

                element.append(clone);
                p_element[0].style.opacity = 1;

            })
          }
            // if ('linkData' in attr && 'linkDataName' in attr) {

          // }

        },
        post: angular.noop
      }

    }
  }
}])
.directive('set', ['$parse', '$rootScope', function($parse, $rootScope) {
  return {
    restrict: 'A',
    replace:true,
    scope: false,
    compile: function(elem, attr) {
      var setVars = attr.set && attr.set.length && attr.set.split('=');
      varName = setVars[0].trim();
      varVal = setVars[1].trim();
      if (!('set' in $rootScope.ui.data)) {

            $rootScope.ui.data.set = {};
        }
      $rootScope.ui.data.set[varName] = varVal
      // console.log($rootScope.ui.data)
    },
    link: function preLink(scope, element, attr) {

      console.log('var', varName)



        if (setVars && setVars.length > 1 && setVars[0].length > 1) {

          scope[varName] = $parse(varVal)(scope)
          // console.log(setVars[0].trim(),




        }
    }

  }
}])
.directive('syncWith', ['UtilitiesService', '$timeout', function(UtilitiesService, $timeout) {
  return {
    restrict: 'A',
    scope: false,
    link: {
      post: function(scope, element, attr) {
          scope.$watch('scroll.y', function(new_val, old_val) {
            element[0].style['transitionDuration'] = 100/Math.abs(old_val - new_val)
            element[0].style['opacity'] = (new_val/100)
          })
      }
    }
  }
}])
// .directive("id", ["$compile", "RootService", "$timeout", function($compile, RootService, $timeout) {
//   return {
//     restrict: 'A',
//     scope: false,
//     priority: 1000,
//        compile: function(element, attr) {


//           if (!(attr.id in RootService.elemIdCache)) {
//               var elementRect = element[0].getBoundingClientRect();
//               RootService.elemIdCache[attr.id] = JSON.parse(JSON.stringify(elementRect));
//           }

//        }
//    }
//   }])
.directive("counter", ["$compile", "ElementService", "$timeout", function($compile, ElementService, $timeout) {
  return {
    restrict: 'A',
    scope: false,
    link: {
       compile: function(element, attr, transclude) {
        elem, name, value, name_camel;
            this.states = ElementService.renderState(elem, name, value, name_camel);
            var states = this.states;
        }
    }
  }
}])

.directive('staggerChildren', ['UtilitiesService', 'DirectiveService', '$timeout', '$compile', function(UtilitiesService, DirectiveService, $timeout, $compile) {
  return {
    restrict: 'AE',
    replace:true,
    transclude:true,
    priority: 100,
      compile: function(element, attr, transclude) {
        // element[0].style.display = 'none';
          var elems = element[0].querySelectorAll('*')
          var attrDelay = attr.delay
          var attrInterval = attr.interval;
          var attrApply = attr.apply;
          var attrLength = element[0].attributes.length;
          var staggerDict = {};
          var postponedElem = [];
          //

          var stagDict = DirectiveService.processStaggerArgs(attr)
          // console.log('its compiling', attr.onEnter)

          return {
            post: function postLink(lScope, lElem, lAttr) {
              var parent = lElem.parent();


              parent && parent.children().length && parent[0].removeChild(lElem[0])
                  transclude(lScope, function(clone, innerScope) {

                    var clonedChildrenWithAttr = [];
                    console.log(clone)

                    // for (var i = 0; i < clone.length; i++) {
                    //   // console.log(angular.element(clone[i]).parent())
                    //   if (clone[i] && clone[i].attributes) {

                    //     clonedChildrenWithAttr.push(clone[i])
                    //   }
                    // }
                    // console.log(clonedChildrenWithAttr.length)
                    //go through each element
                    for (key in stagDict) {

                      var hasKey = key in stagDict && stagDict[key];
                      var stateTime = hasKey && 'time' in stagDict[key] && stagDict[key].time;
                      if (hasKey && stateTime && (!stateTime.values || !stateTime.values.length)) {
                        console.log
                        if (stateTime.valueFunc) {
                          stateTime.valueFunc(clone, stateTime);
                          // if ()
                        }
                      }
                    }
                    for (var i = 0; i < clone.length; i++) {
                      var iChild = clone[i];
                      for (key in stagDict) {
                          keyDashed = UtilitiesService.camelToDash(key).toLowerCase();

                          var hasAttribute = iChild.getAttribute && iChild.getAttribute(keyDashed);
                          if (hasAttribute && hasAttribute.length && stagDict[key].time) {



                            var keyAttr = hasAttribute
                            var selectorPrefs = stagDict[key].selector;

                            var matchesWithConstraints = DirectiveService.verifyStaggerChildSelector(selectorPrefs[0], iChild)
                            if (key.indexOf('when') > -1) {
                              console.log(stagDict[key], stagDict[key].time.values)
                            }
                            if (matchesWithConstraints && stagDict[key].time.values && stagDict[key].time.values.length) {
                              var delayVal = stagDict[key].time.values.shift();
                              // console.log(delayVal)
                              var extensionValue = '';
                              if (keyAttr.indexOf('^') > -1 && delayVal > 0) {
                                keyAttr = UtilitiesService.replaceAll(keyAttr, '^', 0);
                              }
                              if (delayVal > 0) {
                                extensionValue = ':' + 'delay-' + delayVal
                              }

                              // iChild.removeAttribute(keyDashed);
                              iChild.setAttribute(keyDashed, keyAttr + extensionValue);

                            }

                          }
                        }
                        iChild.removeAttribute && iChild.removeAttribute('style')
                        $compile(iChild)(innerScope)
                        clonedChildrenWithAttr.push(iChild);
                      }

                      clonedChildrenWithAttr.forEach(function(elem, i) {


                        // elem.setAttribute && setAttribute('style', '');
                        parent.append(elem)
                        // $compile(elem)(lScope)
                      })
                      $compile(parent)(lScope)

                  });

                },
          }
      }
  }
}])
.directive('scrollable', ['UtilitiesService', '$timeout', function(UtilitiesService, $timeout) {
  return {
    restrict: 'A',
    scope:false,
    link: {
      pre: function(scope, element, attr) {
        var scrollCmds = getScrollParams(attr.scrollable);
        var scrollName = scrollCmds.name;
        scope.scroll = {x: 0, y:0};


        var sListener = element[0].addEventListener('wheel', function(e) {
          getImptWheelAttr(e, scrollCmds);
          var offset = UtilitiesService.calcScrollOffset(element[0]);
          scope.scroll.x = offset.x;
          scope.scroll.y = offset.y;
          $timeout(function() {
            scope.$apply()
          })
        });

        function getImptWheelAttr(e, elem_cmds) {
          console.log(elem_cmds)
          var overrideX = elem_cmds.override && elem_cmds.override.indexOf('x') > -1;
          var overrideY = elem_cmds.override && elem_cmds.override.indexOf('y') > -1;
          var sendEvents = 'send' in elem_cmds
          etargetRect = e.target.getBoundingClientRect();
          var deltaX = e.deltaX;
          var deltaY = e.deltaY;
          if (overrideX && Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();

          }
          if (overrideY && Math.abs(deltaY) > Math.abs(deltaX)) {
            e.preventDefault();
          }

          if (sendEvents) {
            applySendEvents(e, elem_cmds);
          }

          return e;
        }

        function applySendEvents(e, elem_cmds) {
          console.log(elem_cmds)
          cmds = parseSendCommands(elem_cmds['send']);
          var offset = UtilitiesService.calcScrollOffset(e.target);
          for (var i = 0; i < cmds.length; i++) {
            var dim = cmds[i].dim;
            var oper = cmds[i].operand
            var val = cmds[i].value;
            var msgName = UtilitiesService.camelCase('when-' + cmds[i].eventName);

            if (oper === '+' && !val) {
              if (e['delta' + dim.toUpperCase()] > 0) {
                scope.$parent.root.public.customStates['when'][msgName] = {yOffset: offset.y/100}
              }
            }
            if (oper === '=' && val) {
              val = parseFloat(val.replace('%', ''))
              if (val === offset[dim]) {
                console.log(offset, msgName, offset.y/100)
                scope.$parent.root.public.customStates['when'][msgName] = true
              }

            }
            if (oper === '-' && !val) {
              if (e['delta' + dim.toUpperCase()] < 0) {
                scope.$parent.root.public.customStates['when'][msgName] = {yOffset: offset.y/100}
              }
            }

          }
        }

        function parseSendCommands(str) {
          str = UtilitiesService.removeAllOccurrancesArr(str, ['(', ')']);
          str = UtilitiesService.replaceAll(str, ' | ', '|');
          triggers = str.split('|');
          var commandArr = [];
          for (var i = 0; i < triggers.length; i++) {
            var triggerDict = {};
            var iTrigSplit = triggers[i].split('@')
            var iEvent = iTrigSplit[0];
            var iConstraint = iTrigSplit[1];
            triggerDict.eventName = iEvent;
            triggerDict.dim = iConstraint[0];
            triggerDict.operand = iConstraint[1];
            triggerDict.value = iConstraint.length > 1 && iConstraint.substring(2, iConstraint.length)
            commandArr.push(triggerDict);
          }
          return commandArr;
        }

        function getScrollParams(str) {
          var _dict = {};
          str=UtilitiesService.removeAllOccurrancesArr(str, ['[',']']);
          str=UtilitiesService.replaceAll(str, ', ', ',');
          var strSplit = str.split(':');
          if (!strSplit.length > 1) return _dict;
          strSplit = str.split(',')
          console.log(strSplit);
          for (var i = 0; i < strSplit.length; i++) {
            var itemSplit = strSplit[i].split(':')
            if (!itemSplit || !itemSplit.length) continue;
            itemKey = itemSplit[0];
            itemValue = itemSplit[1];
            _dict[itemKey] = itemValue;
          }
          return _dict;
        }
      }
    }
  }
}])
.directive('dynamicData', ['$timeout', 'RootService', function($timeout, RootService) {
  return {
    restrict: 'A',
    scope: false,
    link: {
      pre: function(scope, element, attr) {
          var queuedVal = null;
          var endListener = null;
          var browserName = RootService.getBrowserPrefix();
          if (browserName && browserName.length) {
            var animEndEventName = browserName + 'AnimationEnd';
          } else {
            var animEndEventName = animEndEventName;
          }

          attr.$observe('dynamicData', function(val, old_val) {

            console.log(val, old_val)

          })

          $timeout(function() {
            element[0].classList.add('on-exit');
          }, 5000)
      }
    }
  }
}])


.directive("uClass", ["$compile", "ElementService", function($compile, ElementService) {
      return {
          restrict: 'E',
          replace: true,
          priority:1,
          compile: function(element, attr, transclude) {
            attr.prefix && attr.prefix.length && ElementService.addShortcuts(attr.prefix, element[0].childNodes, attr);
            // return {
            //       pre:
            //         function (scope, lElem, lAttr) {
            //           attr.prefix && attr.prefix.length && ElementService.addShortcuts(attr.prefix, lElem[0].childNodes, attr);
            //         }
            // }
          }
        }
}])


.directive("u", ["$compile", "ElementService", "$timeout", "$rootScope", "SendService", "CompService", "$parse", "$rootScope", function($compile, ElementService, $timeout, $rootScope, SendService, CompService, $parse, $rootScope) {
      return {
          restrict: 'A',
          replace: false,
          priority:100,
          scope:true,
          require: '?ngInclude',
          compile: function(element, attr, transclude) {
            // attr.$set('public', 'public');
            // attr.$set('root', 'root');
            var elemName = element[0].nodeName.toLowerCase();

            var hasInitAfter = false;
              if (attr.initAfter && attr.initAfter.length) {
                hasInitAfter = ElementService.toCamelCaseBridge(attr.initAfter)
                var hasInitAfterCamel = ElementService.toCamelCaseBridge('when-' + attr.initAfter);
                attr.$set(hasInitAfterCamel, attr.onInit);
                element[0].removeAttribute('init-after');
                element[0].removeAttribute('on-init')
                delete attr['initAfter']
                delete attr['onInit']
                delete attr.$attr['on-init']
                // attr.$set();
              }

              this.states = ElementService.renderElementStates(element, attr);
              // console.log(element, this.states)
              var states = this.states;
              // console.log(states)
              var filterStates =  [];
              for (var state in states) {
                states[state].length && states[state].forEach(function(_state) {
                  if (_state.actions && _state.actions.reverse && _state.actions.stateName && _state.actions.stateName.length) {
                    var stateSplit = _state.actions.stateName.split('-');
                    if (stateSplit.length >= 2) {
                      var stateType = stateSplit[0];
                      var stateArgName = stateSplit[1]
                      if (stateType in states) {
                        var stateToCopy = stateArgName;
                        if (states[stateType]) {
                          states[stateType].forEach(function(to_copy_state) {
                            if (to_copy_state.name.indexOf(stateArgName) > -1 && to_copy_state.actions.anim) {

                              var animSplit = (to_copy_state.actions.anim.parsed + "").split(':')
                              if (animSplit.length > 7) {
                                var animParsed = [animSplit[0], animSplit[2], animSplit[1]].join(':') + ':' + animSplit.slice(3).join(":");
                              } else {
                                var reverseDict = {'f': 'r', 'r': 'f', 'a': 'ar', 'ar': 'a'};
                                var lastArg = animSplit[animSplit.length - 1];
                                var animParsed = animSplit.slice(0, animSplit.length - 1).join(':') + ":" + reverseDict[lastArg]
                                console.log(animParsed)
                              }
                              _state.actions.anim = {};
                              for (key in to_copy_state.actions.anim) {
                                _state.actions.anim[key] = to_copy_state.actions.anim[key]
                              }
                              _state.actions.anim.parsed = animParsed;
                              // _state.actions.anim.parsed = animParsed;

                            }
                          })
                        }
                      }
                    }

                  }
                })
              }
              // console.log(filterStates)


                  if (states.init) {
                      states.init.forEach(function(state, i) {
                        // if (state.actions.send) {
                        //   state.actions.send.parsed.split(',').forEach(function(message_str, i) {
                        //     var msgNameCamel = ElementService.toCamelCaseBridge(message_str.split(':')[0]);
                        //     SendService.prepareToSendMessage(msgNameCamel, message_str, scope);
                        //   })
                        // }

                        if (state.name === 'init' && state.type === 'on') {
                          states.on.push(state);
                        } else if (state.exec ) {

                          state.exec(element, null, attr)
                        }
                      })
                    }

              var postStates = [];
              return {
                  pre: function (scope, lElem, lAttr) {
                    if (attr.data) {
                      var attrData = attr.data;

                      if ($rootScope.ui && $rootScope.ui.data && 'set' in $rootScope.ui.data) {
                        for (var setVar in $rootScope.ui.data.set) {
                          var extended = $rootScope.ui.data.set[setVar];
                          if (extended !== attr.data && attr.data.indexOf(extended) === -1) {
                            attrData = attrData.replace(setVar, extended);
                            scope[setVar] = $parse(extended)(scope);
                            // var ptr = scope;

                            // parseSetAttributeUrl(extended, scope, setVar)
                          }
                        }
                      }
                      // console.log(scope.options, lElem[0])
                      // $compile(lElem.contents())($parse(attrData)(scope))

                    }


                    scope.states = states || {};
                    scope.hasInitAfter = hasInitAfter;
                    scope.elem = lElem;
                    scope.parentCompiled = false;
                    scope.inheritedFromParent = [];
                    // scope.public = scope._public
                    element.ready(function() {
                      console.log('compiling send states for', element)
                      // postStates.forEach(function(state) {
                      //   state.exec(lElem, scope, lAttr);
                      // })

                    })


                    scope.whenCallbacks = {};


                      if (states.on) {


                        states.on.forEach(function(state, i) {
                          if (!('actions' in state) || !state.actions) return;
                          // if (state.actions.send) {
                          //   state.actions.send.parsed.split(',').forEach(function(message_str, i) {
                          //   var msgNameCamel = ElementService.toCamelCaseBridge(message_str.split(':')[0]);
                          //   SendService.prepareToSendMessage(msgNameCamel, message_str, scope);
                          // })
                          // }
                          // if (state.name.indexOf('init') > -1) {
                          //   postStates.push(state);
                          //   return;
                          // }
                          if (state.actions.debug) {
                            ElementService.launchExternalWindow(state.actions.debug, element);
                          }
                          console.log('initializing', state.name)
                          state.exec(lElem, scope, lAttr);
                          if (state.name.indexOf('debug') > -1) {
                            ElementService.launchExternalWindow(state.actions.anim.parsed, element);
                          }
                        })
                      }

                      if (states.when && scope.hasInitAfter) {

                        states.when.forEach(function(w_state, i) {
                          console.log(w_state, scope.hasInitAfter)
                          if (w_state.nameCamel === scope.hasInitAfter) {
                            w_state.exec = function(a1, a2, a3, a4) {
                              transclude(scope, function(clone, innerScope) {
                                    $compile(clone)(innerScope)

                                    lElem.append(clone);
                                    // $compile(clone)(scope)
                                    // $compile(lElem.contents())(scope);



                              });
                            }
                          }
                        })
                      }



                      SendService.precompileSendActionArgs(states, scope, lElem, lAttr)



                      // });
                      // if (attr.data) {
                      //   console.log('yo')
                      //   scope.data = $parse(attr.data)(scope);
                      //   $compile(lElem.html())(scope);
                      // }



                  }
              }
          }
      }
}])
.directive("innerSrc", ["$compile", function($compile) {
      return {
          restrict: 'A',
          replace: true,
          priority: 100,
          compile: function(element, attr) {
            var div = angular.element('<div></div>');
            for (var key in attr.$attr) {
              if (key !== 'u') {
                div[0].setAttribute(key, attr[key]);
              }
            }

            // element[0].removeAttribute('inner-src');

            return {
              pre: function(scope, pElem, attr) {
                element.replaceWith(div);
                div.attr('ng-include', attr.innerSrc);
                $compile(div)(scope);
                element[0].removeAttribute('inner-src');
              }
            }
          }
        }
}])
.directive("initLater", ["CompService", "$compile", function(CompService, $compile) {
      return {
          restrict: 'A',
          replace: true,
          transclude: true,
          priority:1,
          compile: function(element, attr, transclude) {

              return {
                  pre:
                  function (scope, lElem, lAttr) {


                      scope.$watch(function() {
                        return element.attr('class');
                      }, function(new_classes) {

                        if (new_classes && new_classes.indexOf('init') > -1) {

                          transclude(scope, function(clone, innerScope) {
                              $compile(clone)(innerScope)
                              lElem.append(clone)
                          })

                        }
                      })

                  },
                  post: angular.noop
              }
          }
      }
}])

.directive('desktop', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    priority: 1,
    require: '^?RootController',
      link: {
        pre: function(scope, element, attr) {
          if (!scope.root.window.desktop) {
            attr.$set('ngIf', scope.root.window.desktop);
            $compile(element[0])(scope);
          } else {
            attr.$set('desktop', null);
          }
      }
    }
  }
}])
.directive('tablet', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    priority: 1,
    require: '^?RootController',
      link: {
        pre: function(scope, element, attr) {
          if (!_browser.size.tablet) {
            attr.$set('ngIf', scope.root.window.desktop);
            $compile(element[0])(scope);
          } else {
            attr.$set('tablet', null);
          }
          // console.log(_browser)
          // if (!scope.root.window.desktop) {
          //   attr.$set('ngIf', scope.root.window.desktop);
          //   $compile(element[0])(scope);
          // } else {
          //   attr.$set('desktop', null);
          // }
      }
    }
  }
}])
.directive('mobile', ['DirectiveService', '$compile', function(DirectiveService, $compile) {
  return {
    restrict: 'A',
    require: '^?RootController',
    priority: 1,
      link: {
        pre: function(scope, element, attr) {
          if (!scope.root.window.mobile) {
            attr.$set('ngIf', scope.root.window.mobile);
            $compile(element[0])(scope);
          } else {
            attr.$set('mobile', null);
          }
      }
    }
  }
}])

.directive('initDefault', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attr, controller) {
          var listenerArgs = DirectiveService.detectExternalStates(attr);
          for (key in listenerArgs) {
            var type = listenerArgs[key].type
            var _attr = listenerArgs[key].attr;
            DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
          }
    }
  }
}])
// .directive('u', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attr, controller) {
//           var listenerArgs = DirectiveService.detectExternalStates(attr);
//           if ('switch' in attr) {
//             console.log('initializing', attr.switch)
//           }
//           for (key in listenerArgs) {
//             var type = listenerArgs[key].type
//             var _attr = listenerArgs[key].attr;
//             DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);
//           }
//     }
//   }
// }])

.directive('onEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onEnter, 'on-enter', element);
        var supportedCommands = DirectiveService.supportedCommands;
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-enter') > -1) {
            element[0].classList.remove('on-enter');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        });
      }
    }
  }
}])


.directive('onChange', ['$timeout', 'DirectiveService', '$parse', '$compile', function ($timeout, DirectiveService, $parse, $compile) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {


        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onChange);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-change') > -1) {
            console.log('onChange elem args', attr.onChange, elemArgs)
            element[0].classList.remove('on-change');
            // element[0].style.opacity = 0;
            var formattedAttrOnChange = (attr.onChange + "").replace('[', '').replace(']', '');
            var func = $parse(elemArgs.eval.functions[0].custom);
            // element[0].style.opacity = 0;
            var temp = element[0].style.display + '';
            element[0].style.display = 'none';
            func(scope.$parent);
            // $compile(element)(scope);
            element[0].style.display = temp;
            $timeout(function() {
              // element[0].style.opacity = 1;
            // $compile(element)(scope);
              element[0].classList.add('on-enter');
              // element[0].style.opacity= 1;
            });

            // $timeout(function() {

            //   // scope.$apply();

            // })
            // $timeout(function() {
            //   element[0].style.opacity = 1;
            // }, 100)
            // $timeout(function() {
            //   // scope.$apply();
            //   element[0].style.opacity = 1;
            // })
            // for (key in elemArgs) {
            //   if (supportedCommands.indexOf(key) > -1) {
            //     DirectiveService.activateArg(key, elemArgs[key], scope, element);
            //   }
            // }
          }
        });

        // var elemArgs = DirectiveService.parseArgs(attr.onChange);
        // var supportedCommands = DirectiveService.supportedCommands;
        // scope.$watch(function() {
        //   return element.attr('class');
        // }, function(new_classes, old_classes) {
        //   if (new_classes && new_classes.indexOf('on-enter') > -1) {
        //     element[0].classList.remove('on-enter');
        //     for (key in elemArgs) {
        //       if (supportedCommands.indexOf(key) > -1) {
        //         DirectiveService.activateArg(key, elemArgs[key], scope, element);
        //       }
        //     }
        //   }
        // });
      }
    }
  }
}])
.directive('onExit', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onExit, 'on-exit', element);
        var supportedCommands = DirectiveService.supportedCommands;
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
          if (new_classes && new_classes.indexOf('on-exit') > -1) {
            element[0].classList.remove('on-exit');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        });
      }
    }
  }
}])
.directive('onClick', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onClick, 'on-click', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('click', function () {
          console.log('click activated');
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onBlur', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onBlur, 'on-blur', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('blur', function () {
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onFocus', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onFocus, 'on-focus', element);
        var supportedCommands = DirectiveService.supportedCommands;
        element.on('focus', function () {
            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
        });
      }
    }
  }
}])
.directive('onValid', ['$timeout', 'DirectiveService', function($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        if (!attr.onValid || !attr.onValid.length) return;
        var stringValidArgsSplit = attr.onValid.split(':]')
        var parseArgStr = stringValidArgsSplit[0] + ':]';
        var evalFuncStr = stringValidArgsSplit[1];
        var elemArgs = DirectiveService.parseArgs(parseArgStr, 'on-valid', element);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {


            if (new_classes && new_classes.indexOf('on-valid') > -1) {
              var func = $parse(evalFuncStr);
              if (func(scope) || func === 'true') {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
              }
            }
        });
      }
    }
  }
}])
.directive('onInvalid', ['$timeout', 'DirectiveService', function($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        if (!attr.onInvalid || !attr.onInvalid.length) return;
        var stringInValidArgsSplit = attr.onInvalid.split(':]')
        var parseArgStr = stringInValidArgsSplit[0] + ':]';
        var evalFuncStr = stringInValidArgsSplit[1];
        var elemArgs = DirectiveService.parseArgs(parseArgStr, 'on-invalid', element);

        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes, old_classes) {
            if (new_classes && new_classes.indexOf('on-invalid') > -1) {
              var func = $parse(evalFuncStr);
              if (!func(scope) || func === 'false') {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
              }
            }
        });
      }
    }
  }
}])
.directive('onMouseEnter', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseEnter, 'MouseEnter', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var mouseEnterDelay = parseInt(attr.onMouseEnterDelay) || 250;
        element.on('mouseenter', function () {
            var inTimeout = true;
            $timeout(function () {
              if (inTimeout) {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
                scope.$apply();
              }
            }, mouseEnterDelay);
        });

        element.on('mouseleave', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('onMouseOver', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseOver, 'MouseOver', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var hoverDelay = parseInt(attr.onMouseOverDelay || DirectiveService.defaults.activate.hover) || 500;
        element.on('mouseover', function () {
          inTimeout = true;
          $timeout(function () {
            if (inTimeout) {
              for (key in elemArgs) {
                if (supportedCommands.indexOf(key) > -1) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
                }
              }
              scope.$apply();
            }
          }, hoverDelay);
        });
         element.on('mouseleave', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('onMouseLeave', ['$timeout', 'DirectiveService', function ($timeout, DirectiveService) {
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attr) {
        scope.root && scope.root.inspect && scope.root.pauseElement(element, attr);
        var elemArgs = DirectiveService.parseArgs(attr.onMouseLeave, 'MouseLeave', element);
        var supportedCommands = DirectiveService.supportedCommands;
        var inTimeout = false;
        var mouseLeaveDelay = parseInt(attr.onMouseLeaveDelay) || 250;


        element.on('mouseleave', function () {
            var inTimeout = true;
            $timeout(function () {
              if (inTimeout) {
                for (key in elemArgs) {
                  if (supportedCommands.indexOf(key) > -1) {
                    DirectiveService.activateArg(key, elemArgs[key], scope, element);
                  }
                }
                scope.$apply();
              }
            }, mouseLeaveDelay);
        });

        element.on('mouseenter', function () {
          inTimeout = false;
        });
      }
    }
  }
}])
.directive('draw', ['$timeout', 'SVGService', '$compile', function ($timeout, SVGService, $compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clonedElem = element[0].cloneNode(true);
      var currentFrame = parseInt(attr.initFrame) || 0;
      var delay = attr.drawDelay || 0;
      var totalFrames = SVGService.computeDrawDuration(attr.drawDuration) || 60;
      var svgPaths = element[0].querySelectorAll('path:not([draw]):not([draw-ignore]), line:not([draw]):not([draw-ignore]), circle:not([draw]):not([draw-ignore]), rect:not([draw]):not([draw-ignore]), polygon:not([draw]):not([draw-ignore])');

      $timeout(function() {
        element[0].classList.add('activate');
      }, 2000)
      scope.$watch(function() {
        return element.attr('class');
      }, function(new_value) {
        if (new_value && new_value.indexOf('activate') > -1) {
            if (element[0].nodeName !== 'path') {
              var path = SVGService.svgShapeToPath(element[0])[0];
              element[0].parentNode.replaceChild(path, element[0]);
            } else {
              var path = element[0];
            }

            var pathLength = path.getTotalLength()
            var _default = path.style.fill;
            path.style.fill = 'none';
            path.style.strokeDashoffset = pathLength;
            path.style.strokeDasharray = pathLength;
            path.style.webkitTransition = 'all 3000ms ease-out';
            $timeout(function() {
              path.style.strokeDashoffset = 0;
              path.style.strokeDasharray = 0;
              path.style.fill = _default;
              // path.style.strokeWidth = '5';
              // path.style.fill = defaultPath;
            }, 1000)
            // SVGService.drawOneShape(path, 50, pathLength, pathLength)



          // pathLength = SVGService.getTotalPathLength(path[0]);

          // var transitionStr = ['stroke-dashoffset', attr.drawDuration || '250ms', 'ease'].join(' ');
          // element.css('-webkit-transition', transitionStr);
          // element[0].style.strokeDashoffset = 0;
        }

        // element[0].style.stroke = 'blue';
        // if (element[0].classList.contains('activate') || (attr.drawOnClass && element[0].classList.contains(attr.drawOnClass))) {
        //     console.log(attr.drawDuration, pathLength/2, totalFrames)
        //     $timeout(function() {
        //       //concurrent case
        //       var startTime = new Date().getTime();
        //       var requestFrameHandle = 0;
        //       function draw() {
        //         var progress = currentFrame/totalFrames;
        //         if (progress > 1) {
        //           var endTime = new Date().getTime();
        //            window.cancelAnimationFrame(requestFrameHandle);
        //         } else {
        //           currentFrame++;
        //           for(var j=0; j<svgPaths.length;j++){
        //             svgPaths[j].style.strokeDasharray += ' ' + pathLength;
        //           }
        //           requestFrameHandle = window.requestAnimationFrame(draw);
        //         }
        //       }
        //       draw()
        //     }, drawShapesDelay);
        //   }

        })
      }
    }
}])

.directive('customShortcuts', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : {
      pre: function(scope, element, attr) {
        attr.$set('ngHide', true);
        scope.root.public.customShortcuts = {state: {}, args: {}, cssProps:{}, cssPropValues:{}, cmds:{}};
        DirectiveService.setShortcutDict(scope.root.public.customShortcuts);
      }
    }
  }
}])
.directive('argShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.args)) {
            scope.root.public.customShortcuts.args[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('animPropShortcut', ['$timeout', 'AnimationFrameService', function ($timeout, AnimationFrameService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
      var defaultArr = ['stream', 'default', 'custom', 'name', 'start', 'end', 'duration', 'easingFunc', 'delay', 'iter', 'direction'];
        if (!scope.root.public.customShortcuts.animProps) {
          scope.root.public.customShortcuts.animProps = {};
          defaultArr.forEach(function(name, i) {
            scope.root.public.customShortcuts.animProps[name] = {};
          })
        }
        //if not Arg
        if (!attr.arg || ('arg' in attr && defaultArr.indexOf(attr.arg.toLowerCase()) === -1)) return;
        if ('replace' in attr && 'with' in attr) {
          scope.root.public.customShortcuts.animProps[attr.arg][attr.replace] = attr.with;
        }
        if ('for' in attr && 'setDefault' in attr) {
          scope.root.public.customShortcuts.animProps[attr.arg][attr.for] = attr.setDefault;
        }
    }
  }
}])
.directive('propShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cssProps)) {
            scope.root.public.customShortcuts.cssProps[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('propValueShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cssPropValues)) {
            scope.root.public.customShortcuts.cssPropValues[attr.with] = attr.replace;
          }
        }
    }
  }
}])
.directive('cmdShortcut', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    priority: 10,
    link : function(scope, element, attr) {
        if ('replace' in attr && 'with' in attr) {
          if (!(attr.replace in scope.root.public.customShortcuts.cmds)) {
            scope.root.public.customShortcuts.cmds[attr.with] = attr.replace;
          }
        }
    }
  }
}])

.directive('customStates', ['$timeout', 'DirectiveService', 'UtilitiesService', function ($timeout, DirectiveService, UtilitiesService) {
  return {
    restrict: 'E',
    link: {
      pre: function(scope, element, attr) {
        var customStateDict = DirectiveService.parseCustomStateAttr(attr);
          for (key in customStateDict) {
            if (!(key in scope.root.public.customStates)) {
              scope.root.public.customStates[key] = {};
            }
            //if not arr
            if (!customStateDict[key].length) continue;

            var customKeyStates = customStateDict[key];
            for (var i = 0; i < customKeyStates.length; i++) {
              var camelCaseCustomState = UtilitiesService.camelCase(customKeyStates[i]);
              var watchState = 'root.public.customStates.' + key + '.' + camelCaseCustomState;
              scope.root.public.customStates[key][camelCaseCustomState] = false;
              scope.$watch(watchState, function(new_value) {
                // console.log('watching..', camelCaseCustomState, watchState, new_value);
              });
              // scope.$watch
            }
          }
      }
    }
  }
}])
.
directive("evalOnInit", ["$timeout", 'AnimationService', '$parse', function($timeout, AnimationService, $parse) {
      return {
          restrict: 'A',
          link: {pre: function(scope, element, attr) {
                var func = $parse(attr.evalOnInit);
                func(scope);
                $timeout(function() {
                  scope.$apply();
                })
              }
          }
      }
}])
.
directive("evalOnReady", ["$timeout", '$parse', function($timeout, $parse) {
      return {
          restrict: 'A',
          link: {post: function(scope, element, attr) {
                element.ready(function() {
                  var func = $parse(attr.evalOnReady);
                  func(scope);
                  $timeout(function() {
                    scope.$apply();
                  })
                })
              }
          }
      }
}])
.directive('classOnInit', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.ready(function(){

        if (attr.classOnInit && attr.classOnInit.length) {
          var args = attr.classOnInit.split(':');
          if (args.length > 1 && args[1].split('delay').length > 1) {
            var delay = parseInt(args[1].replace('delay-', ''));
            var className = args[0];
            $timeout(function() { element[0].classList.add(className); }, delay)
          }
          element[0].classList.add(attr.classOnInit)
        }
        return;
      })
    }
  }
}])
.directive('parallaxParent', ['$state', '$timeout', function ($state, $timeout) {
    // TODO --> provide support bool | integer
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
          var parallaxArgs = ["clipRelativeInput", "relativeInput", "calibrationThreshold", "calibrationDelay", "supportDelay", "calibrateX", "calibrateY","invertX", "invertY","limitX","limitY","scalarX","scalarY","frictionX","frictionY","originX","originY"];
          var parallaxArgsType = ["bool", "bool", "int", "int", "int", "bool", "bool", "bool", "bool", "bool", "bool", "float", "float", "float", "float", "float", "float"];
          var elemParallaxArgs = [];
          $timeout(function() {
            if (attr.parallaxParent && attr.parallaxParent.length) {
              var elemParallax = new Parallax(element[0]);
              for (var i = 0; i < parallaxArgs.length; i++) {
                 var parsedIndexArg = "parallax" + parallaxArgs[i][0].toUpperCase() + parallaxArgs[i].slice(1);
                 if (!parsedIndexArg || !parsedIndexArg.length) continue;
                 var indexArg = parallaxArgs[i];
                 elemParallaxArgs.push(parsedIndexArg);
                 elemParallax[indexArg] = parseArg(attr[parsedIndexArg], parallaxArgsType[i]) || elemParallax[indexArg]
              }
              $timeout(function() {
                elemParallax.enable();
                elemParallax.updateLayers();
                scope.root.parallax[attr.parallaxParent] = elemParallax
              })

              scope.root.parallax[attr.parallaxParent] = elemParallax
            }
          })
          function parseArg(arg, _type) {
            if (_type === "float") {
              return parseFloat(arg)
            }
            if (_type === "bool") {
              return arg === "true"
            }
            if (_type === "int") {
              return parseInt(arg)
            }
          }
      }
    }
}])
.directive("inspect", ['$timeout', 'RootService', '$compile', 'AdminInspectService',
  function($timeout, RootService, $compile, AdminInspectService) {
      return {
        restrict: 'C',
        scope: false,
        priority: 10000,
        replace: true,
        link: {
          pre: function(scope, element, attr) {
            'initLater' in attr && element.removeAttr('init-later');


            if (scope.root.inspectCount) {
              scope.root.inspectCount += 1;
            } else {
              scope.root.inspectCount = 1;
            }

            var inspect_index = element[0].classList && element[0].classList.value.indexOf('inspect-');

            if (inspect_index > -1) {

              var stateToTrigger = element[0].classList.value.split('inspect-')[1];
              stateToTrigger = stateToTrigger.split(' ')[0];

              //inspect requirement
              if (stateToTrigger.indexOf('on-') > -1) {
                element[0].classList.add(stateToTrigger);
                element.ready(function() {
                  element.triggerHandler(stateToTrigger.replace('on-', ''));
                })
              }



            } else {
              //inspect main
              scope.root.inspect = true;
              console.log('set to true', scope.root.inspect = true);
              element.ready(function() {
                initInspector();
              })
            }


            // document.body.addEventListener()

            // console.log('initializing inspector')
            function initInspector() {
              scope.state = {play: false, pause: false, complete: false, timer: {start:0, pause:0}};
              scope.$watch(function() {
                return element.attr('style');
              }, function(new_style, old_classes) {
                if (new_style && !scope.play) {
                  scope.originalStyle = new_style;

                  scope.origProp = {duration: getDuration(element), transition: (element[0].style.webkitTransition || element[0].style.webkitTransition)}
                  scope.props = {arr: AdminInspectService.getPropArr(new_style), duration: scope.origProp.duration, transition: scope.origProp.transition, style: new_style};
                  scope.parsedAttr = AdminInspectService.getAttrDict(scope, element, attr, new_style);
                  scope.play = getPlayFunction(element, attr, scope.props, scope.state, scope)
                  scope.pause = getPauseFunction(element, attr, scope.props, scope.state, scope)
                  scope.update = getUpdateFunction(element, attr, scope.props, scope.state, scope);
                  attr.$set('style', null);
                  scope.props.attr = scope.parsedAttr;
                  initPlayer(scope);
                }
              })
            }
            // }
          }
        }
      }

      function getPauseFunction(element, attr, props, state) {
        return function() {
          state.pause = true;
          state.play = false;
          state.timer.pause = state.timer.pause + (new Date().getTime() - state.timer.start);
          computedStyle = window.getComputedStyle(element[0]);
          props.arr = AdminInspectService.getPropArr('transform:' + computedStyle.getPropertyValue('transform') +';' +element[0].getAttribute('style'))
          state.playerPos = state.timer.pause
          element.css('transform', computedStyle.getPropertyValue('transform') || computedStyle.getPropertyValue('webkit-transform'));
          element.css('transition', null);
          element.css('webkit-transition', null);
          console.log(state.pause, state.play, state.timer.pause)
        }
      }

      function getUpdateFunction(element, attr, props, state, scope) {
        return function(value) {
          state.timer.pause = true;
          state.play = false;
          state.timer.pause = value;
          attr.$set('style', null);
          $timeout(function() {
            scope.$apply();
            attr.$set('style', props.style);
            element.css('transition-delay', (state.timer.pause * -1) + 'ms');
            element.css('-webkit-transition-delay', (state.timer.pause * -1) + 'ms');
            computedStyle = window.getComputedStyle(element[0]);
            element.css('transform', computedStyle.getPropertyValue('transform') || computedStyle.getPropertyValue('webkit-transform'));
            $timeout(function() {
              scope.$apply();
              element.css('transition', null);
              element.css('webkit-transition', null);
            })
          })
        }
      }

      function getPlayFunction(element, attr, props, state, scope) {
        return function() {




          if (state.pause && state.timer.pause) {
            var durationOffset = props.duration - state.timer.pause;
            attr.$set('style', props.style);
            element.css('transition-duration', durationOffset + 'ms');
            element.css('webkit-transition-duration', durationOffset + 'ms');
            bindElementWithTransitionEnd();
          } else {
            bindElementWithTransitionEnd();
            attr.$set('style', props.style);
          }
          state.timer.start = new Date().getTime();
          state.play = true;

          function bindElementWithTransitionEnd()  {
            element.bind('webkitTransitionEnd', function() {
              state.play = false;
              state.pause = false;
              state.complete = true;
              state.timer.start = 0;
              state.timer.pause = 0;
              attr.$set('style', null);
              $timeout(function() {
                scope.$apply()
              })
              // attr.$set('style', props.style);

            })
          }

        }
      }

      function initPlayer(scope) {
          var div = document.querySelector('#transition-player');
          scope.name = 'player'
          if (!div) {
            div = document.createElement('div');
            div.classList.add('full-x', 'fixed', 'top-0', 'left-0', 'animated', 'slideInDown');
            div.style.zIndex = 100000;
            div.id = 'transition-player';
            div.innerHTML = '<player play=play root=root pause=pause state=state update=update props=props start-offset=state.timer.pause duration=duration></player>'
            document.querySelector('ui-view').appendChild(div)
          }

          scope.playerPos = 0
          scope.duration = 2000;
          $compile(div)(scope)
          $timeout(function() {
            scope.$apply();
          })
      }

      function getDuration(element) {
        return parseFloat((element[0].style.webkitTransitionDuration || element[0].style.transitionDuration).split('ms')[0]);
      }
}])
.directive('switches', ['$state', '$timeout', 'DirectiveService', 'UtilitiesService', 'SwitchService', function($state, $timeout, DirectiveService, UtilitiesService, SwitchService) {
    return {
      restrict: 'A',
      scope: {},
      link: function preLink(scope, element, attr) {
        if (!attr.switches || !attr.switches.length) {
          return;
        }

        scope.root = scope.$parent.root;
        // var listenerArgs = DirectiveService.detectExternalStates(attr);

        // for (key in listenerArgs) {

        //     var type = listenerArgs[key].type
        //     var _attr = listenerArgs[key].attr;
        //     console.log(type, attr);
        //     DirectiveService.initCustomStateWatcher(scope, element,  type, _attr, attr[_attr.camel]);

        //   }
        var supportedCommands = DirectiveService.supportedCommands;
        scope.switches = SwitchService.parseSwitches(element, attr);
        var classesToWatch = [];
        if (scope.switches.classes) {




          classesToWatch = scope.switches.classes;
          delete scope.switches.classes['classes']
          scope.$watch(
            function() {
              return element.attr('class');
            },
            function(new_classes, old_classes) {
              if (!new_classes) {
                return;
              }
              var modifiedClasses = [];

              classesToWatch.forEach(
                function(c, i) {
                  if (new_classes.indexOf(c) > -1) {
                    modifiedClasses.push(c);
                    element[0].classList.remove(c);
                  }
              });
              for (var i = 0; i < modifiedClasses.length; i++) {
                var iClass = modifiedClasses[i];
                for (key in scope.switches) {
                  if (scope.switches[key].nameDashed === iClass) {
                    var iSwitchObj = scope.switches[key];
                    break;
                  }
                }
              }
              if (iSwitchObj) {
                iSwitchObj.value = !iSwitchObj.value;
                var stateValue = (iSwitchObj.value && 'on') || 'off';
                if (stateValue in iSwitchObj) {
                  var elemArgs = iSwitchObj[stateValue].args;
                  for (key in elemArgs) {
                    if (supportedCommands.indexOf(key) > -1) {
                      console.log(key, elemArgs[key])
                      DirectiveService.activateArg(key, elemArgs[key], scope, element);
                    }
                  }
                }
              }
            }
          );
        }
        // console.log(scope.switches);

        // scope.switchClasses = [];
        // for (key in attr) {
        //   console.log(key);
        // }
      }
    }
}])
.directive('switch', ['$state', '$timeout', 'DirectiveService', function($state, $timeout, DirectiveService) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attr) {
        //shortcut
        scope.switch = {name: null, value:false};

        if ('switchOn' in attr) {
          scope.switch.on = {args: DirectiveService.parseArgs(attr.switchOn)}
        }

        if ('switchOff' in attr) {
          scope.switch.off = {args: DirectiveService.parseArgs(attr.switchOff)}
        }
        scope.$watch(function() {
          return element.attr('class');
        }, function(new_classes) {
          if (new_classes && new_classes.indexOf('switch-toggle') > -1) {

            element[0].classList.remove('switch-toggle');
            scope.switch.value = !scope.switch.value;
            var toggleValue = scope.switch.value && 'on' || 'off';

            var elemArgs = scope.switch[toggleValue].args;

            var supportedCommands = DirectiveService.supportedCommands;

            for (key in elemArgs) {
              if (supportedCommands.indexOf(key) > -1) {
                  DirectiveService.activateArg(key, elemArgs[key], scope, element);
              }
            }
          }
        })
    }
  }
}])
.directive('parallaxChild', ['$state', '$timeout', function ($state, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if (attr.parallaxChild && attr.parallaxChild.length) {
          var floatValue =  parseFloat(attr.parallaxChild);

          element[0].setAttribute('data-depth', floatValue)
          element[0].classList.add('layer');
          $timeout(function() {
            if (attr.parallaxParentRef && attr.parallaxParentRef.length && scope.root.parallax[attr.parallaxParentRef]) {
              scope.root.parallax[attr.parallaxParentRef] && scope.root.parallax[attr.parallaxParentRef].updateLayers();
            }
          }, 1000)
        }
      }
    }
}])
.directive('rootAnimation', [function () {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, element, attr) {
        if (attr.off) {
          scope.root.animStatus.off = true;
        }
      }
    }
}])
.directive('swiper', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        type: '=type',
      },
      template: '<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
      transclude: true,
      replace: true,
      link: {
        pre: function (scope, element, attr, controllerFn, transclude, data) {

          var swiperOptions = {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 100,
            effect: 'coverflow',
            speed: 600,
            coverflow: {
              slideShadows: false
            },
            paginationClickable: true,
            keyboardControl: true,
            parallax: true,
            ref: 'http://idangero.us/swiper/api/#.V57mX9ArLOQ'
          }
          scope.swiper = {instance: null, options: swiperOptions}
          if ('width' in attr && attr.width.length) {
            element[0].style.width = attr.width;
          }
          if ('height' in attr && attr.height.length) {
            element[0].style.height = attr.height;
          }
          // nextButton: '.header-swiper-front .swiper-button-next',
          //   prevButton: '.header-swiper-front .swiper-button-prev',
          // $timeout(function() {

          //   // scope.swiper.instance.update(true);
          //   // scope.swiper.instance.startAutoplay();
          // }, 1000)
        },
        post: function(scope,element, attr) {

          var className = '.' + element[0].classList.value.split(' ').join('.')
          scope.swiper.instance =  new Swiper(className, scope.swiper.options);
          scope.$parent.swiperOptions = scope.swiper.options;

          scope.$parent.swiper = scope.swiper;

        }
      }
    }
}])
.directive('slide', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {data: '=data', index: '=index'},
      transclude: true,
      priority:1,
      replace:true,
      template: '<div class="swiper-slide" ng-transclude></div>',
      link:  {
            pre: function(scope, element, attr) {
              if (!scope.$parent.data) {
                scope.$parent.data = [];
              }
              scope.$parent.data.push(scope.data);
            },
            post: function(scope, element, attr) {
              $timeout(function() {
                if ('width' in attr && attr.width.length) {
                  element.css('width', attr.width)
                }
                if ('height' in attr && attr.height.length) {
                    element.css('height', attr.height)
                  }
              })
            }
          }
    }
}])
.directive('swiperNext', [function () {
    return {
      restrict: 'E',
      scope: false,
      priority:1,
      replace:true,
      transclude: true,
      template: '<div class="swiper-button-next" ng-transclude></div>',
      link: function preLink(scope, element, attr) {
        console.log();
        scope.$parent.swiper.options.nextButton = element[0];
      }
    }
}])
.directive('bgImage', ['$parse',function($parse){
    return function(scope, element, attrs){
        attrs.$observe('bgImage', function(value) {
            var bgAttrValues = value.split('|');

            element.css({
                'background-image': 'url(' + bgAttrValues[0]  +')',
                'background-position': bgAttrValues[1],
                'background-size' : bgAttrValues[2],
                'background-repeat': bgAttrValues.length > 3 && bgAttrValues[3] || 'no-repeat',
                'background-color': bgAttrValues.length > 4 && bgAttrValues[4] || 'none',
            });

        });
    };
}])
.directive('swiperBack', [function () {
    return {
      restrict: 'E',
      scope: false,
      priority:1,
      replace:true,
      transclude: true,
      template: '<div class="swiper-button-prev" ng-transclude></div>',
      link: function preLink(scope, element, attr) {
        console.log();
        scope.$parent.swiper.options.prevButton = element[0];
      }
    }
}])
.directive('swiperControls', [function () {
    return {
      restrict: 'E',
      priority:10,
      replace:true,
      scope: false,
      link:
        {
          pre: function(scope, element, attr) {
            scope.swiperOptions = scope.$parent.swiper.options;

            }
          // post: function(scope, element, attr) {


          // }
      }
    }
}])
.directive('swipeVar', [function () {
    return {
      restrict: 'E',
      priority:11,
      replace:true,
      scope: {key:'@key', value:'@value'},
      link:
        {
          pre: function(scope, element, attr) {

            if (scope.key && scope.key.length && scope.value && (scope.value + '').length) {
              if (!isNaN(parseFloat(scope.value)) && isFinite(scope.value)) {
                scope.value = parseFloat(scope.value);
              }
              scope.$parent.swiperOptions[scope.key] = scope.value;
              if (!scope.$parent.swiperOptions.modified) {
                scope.$parent.swiperOptions.modified =[];
              }
              scope.$parent.swiperOptions.modified.push(scope.key);
            }
          }
        }
    }
}])

.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',

        compile: function (tElement, tAttrs) {
            tElement.replaceWith(tElement.children());
            return {
                post : angular.noop
            };
        }
    };
});