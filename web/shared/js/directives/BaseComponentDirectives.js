var baseCompModule = angular.module('uguru.shared.directives.base.components', []);

 angular.module('uguru.shared.directives.base.components')
    .directive("letter", ["CompService", "$compile", function(CompService, $compile) {

    }])
    .directive("letter", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl:CompService.getCompTemplateType('letter'),
            compile: function(element, attr, transclude) {
                return {
                    pre:
                    function (lScope, lElem, lAttr) {
                         transclude(lScope, function(clone, innerScope) {
                            // lElem[0].innerHTML = clone[0].innerHTML;

                            lElem.html(clone.html())// = .innerHTML;
                            lElem.attr('u', '');
                            $compile(lElem)(lScope);
                        })
                    },
                    post: angular.noop
                }
            }
        }
    }])
    .directive('attachContainer', [function() {
        return {
            restrict: 'AE',
            templateUrl: 'shared/templates/attach.container.tpl',
            controller: 'AttachFileContainerController',
            controllerAs: 'files'
        }
    }])
    .directive('list', ['$compile', '$rootScope', '$parse',  function($compile, $rootScope, $parse) {
        return {
            restrict: 'A',
            replace:true,
            scope:true,
            priority:10000,
            compile: function(element, attr, transclude) {



                var elemName = (element[0].nodeName.toLowerCase() + "").replace(/-(.)/g, function(match, group1) {
                  return group1.toUpperCase();
                });
                this.elemNameDashed = element[0].nodeName.toLowerCase();
                var resultHtml = '';

                if ($rootScope.activeView && elemName in $rootScope.activeView.data.vars.components) {
                    element[0].removeAttribute('list');
                    element[0].setAttribute('custom', '');

                    attr.$set('data', '');
                    $rootScope.activeView.data.vars.components[elemName].forEach(function(data, i) {
                        var dataStr = JSON.stringify(data)
                        resultHtml += element[0].outerHTML.replace('data=""', "data='" + $rootScope.activeView.name + ".data.vars.components." + elemName + "[" + i + "]'").replace('custom=""', 'custom');
                    })
                }
                if (resultHtml.length) {

                    var elem = angular.element(resultHtml);
                    element.replaceWith(elem)
                } else if (attr.list.length) {


                    // var varNameSplit = attr.list.split('.');
                    // var varName = varNameSplit[varNameSplit.length - 1];
                    // if (varName.charAt(varName.length - 1) === 's') {
                    //     varName = varName.substring(0, varName.length -1);
                    // } else {
                    //     varName = 'data';
                    // }
                    // attr.$set('ngRepeat', varName + ' in ' + attr.list);

                    // attr.$set('data', varName )
                    // element[0].setAttribute('custom', '')
                    // element.replaceWith(angular.element(element[0].outerHTML))

                    element.removeAttr('list');
                    return function(scope, elem, _attr) {

                        var elemNameDashed = elem[0].nodeName.toLowerCase();
                        var listData = [];
                        if (attr.list.indexOf('.') > -1) {
                            attrListSplit = attr.list.split('.');

                            listData = $parse(attr.list)(scope);


                                if (isArray(listData)) {
                                    listData.forEach(function(item, i) {
                                        // console.log(i, elem[0].outerHTML)

                                        resultHtml += '<' + elemNameDashed  + '  data="' + attr.list + '[' + i + ']" custom></' + elemNameDashed + '>';


                                        // element[0].removeAttribute('list');

                                        // element.replaceWith(elem)
                                    })
                                    replaceElementAfterListInScope(elem, listData, attr.list, scope, true)
                                }

                                else if (isObject(listData)) {
                                    var scopePtr = scope[attr.list.split('.')[0]];
                                    var newArray = [];
                                    var splitList = attr.list.split('.').splice(1);
                                    var lastKey = splitList.pop();
                                    splitList.forEach(function(scope_var, i) {
                                        scopePtr = scopePtr[scope_var]
                                    })
                                    scopePtr[lastKey] = [];
                                    for (key in listData) {
                                        var _dict = listData[key];
                                        _dict.name = key;
                                        scopePtr[lastKey].push(_dict)
                                    }
                                    replaceElementAfterListInScope(elem, scopePtr[lastKey], attr.list, scope)
                                    // for (key in listData) {
                                    //     scopePtr = scopePtr[key];
                                    //     listData.push(scopePtr[key]);
                                    // }
                                    console.log(scopePtr, listData)
                                }
                                //     if (listData.length) {

                                //         scopePtr = listData;

                                //         // replaceElementAfterListInScope(elem, value, attr.list, scope)
                                //     }
                                // }
                            // }
                        }
                        if (attr.list in scope) {

                            listData = scope[attr.list];


                            listData.forEach(function(listData, i) {
                                // console.log(i, elem[0].outerHTML)

                                resultHtml += '<' + elemNameDashed  + '  data="' + attr.list + '[' + i + ']" custom></' + elemNameDashed + '>';


                                // element[0].removeAttribute('list');

                                // element.replaceWith(elem)
                            })
                            // scope[attr.list] = listData;
                            elem.replaceWith(angular.element(resultHtml));
                        } else {
                            var watcherCancel = scope.$watch(attr.list, function(value) {
                                if (value) {
                                    if (value.length) {

                                        scope[attr.list] = value;

                                        replaceElementAfterListInScope(elem, value, attr.list, scope)

                                        watcherCancel();

                                    }
                                }
                            })
                        }



                        function replaceElementAfterListInScope(elem, list_elements, data_name, scope, skip_compile) {
                            var resultHtml = '';
                            var elemNameDashed = elem[0].nodeName.toLowerCase();
                            list_elements.forEach(function(list_item, i) {
                                resultHtml += '<' + elemNameDashed  + '  data="' + data_name + '[' + i + ']" custom></' + elemNameDashed + '>';
                            })
                            if (resultHtml.length && !skip_compile) {
                                elem.replaceWith($compile(angular.element(resultHtml))(scope))
                            } else {
                                $compile(angular.element(resultHtml))(scope)
                            }

                        }
                        // console.log(scope.options);





                        // $compile(elem)(scope)
                    }

                    function isObject ( obj ) {
                       return obj && (typeof obj  === "object");
                    }

                    function isArray ( obj ) {
                      return isObject(obj) && (obj instanceof Array);
                    }

                    // previous functioning
                    // var elem = angular.element('<article-option-item  data="options[0]" custom></article-option-item>');


                    // element[0].removeAttribute('list');

                    // element.replaceWith(elem)


                }

            }
        }
    }])
    .directive('custom', ['$compile', '$rootScope', '$parse',  function($compile, $rootScope, $parse) {
        return {
            restrict: 'A',
            replace:true,
            // transclude: true,
            scope:true,
            priority: 10000,
            templateUrl: function(element, attr) {

                var elemName = element[0].nodeName.toLowerCase();
                // element.removeAttr('custom')
                // $rootScope.components[elemName]

                if ($rootScope.components) {
                    return $rootScope.components[elemName]['template_url']
                }
            },
            link: function preLink(scope, elem, attr) {
                if ('data' in attr) {

                    if ('keepName' in attr) {
                        var attrName = attr.data;
                        // if (attr.data.indexOf('.') > -1) {
                        //     var dataAttrSplit = attr.data.split('.');
                        //      attrName = dataAttrSplit[dataAttrSplit.length - 1];

                        // }

                        scope[attrName] = $parse(attr.data)(scope);
                        // if (isObject(scope[attrName]) && !isArray(scope[attrName])) {
                        //     var newArray = [];
                        //     var _dict = scope[attrName];
                        //     for (key in _dict) {
                        //         _dict[key].name = key;
                        //         newArray.push(_dict[key]);
                        //     }
                        //     scope[attrName] = newArray;
                        // }
                    }
                    else if ('listItem' in attr) {
                        var attrName = attr.listItem;
                        var attrValue = $parse(attr.data)(scope);

                        scope[attrName] = attrValue;
                    }
                    else if (!attr.keepName) {
                        var attrValue = $parse(attr.data)(scope)

                        for (attr_name in attrValue) {
                            // if (attrValue[attr_name].split('/').length > 3) {
                            //     attrValue[attr_name] = '"' + attrValue[attr_name].split('/').join(".") +
                            //     console.log(attrValue[attr_name] + '"')
                            // }

                            scope[attr_name] = attrValue[attr_name]
                        }
                    }
                    if (!elem[0].outerHTML) {
                        return;
                    }
                    elem.removeAttr('custom');




                    var newElem = $compile(angular.element(elem[0].outerHTML))(scope);
                    elem.replaceWith(newElem)

                    // console.log($parse(angular.element(elem[0].innerHTML.trim())[0].innerHTML.trim())(scope))
                    // console.log($parse(angular.element(elem[0].innerHTML)[0].innerHTML + '')(scope))
                }






            }

            // compile:function(element, attr, transclude) {
            //     return {

            //     pre: function preLink(scope, p_elem, p_attr) {

            //         // scope.public = scope.$parent.public
            //         // scope.root = scope.$parent.root
            //         // scope.data = $parse(p_attr.data)(scope);
            //         console.log(scope.data)

            //         if (scope.data) {
            //             for (key in scope.data) {
            //                 console.log('setting', key, scope.data[key])
            //                 scope[key] = scope.data[key];
            //             }
            //         } else {
            //             for (attr in p_attr.$attr) {
            //                 var camelAttrName = p_attr.$normalize(attr);

            //                 if (p_attr[camelAttrName].length) {
            //                     scope[camelAttrName] = p_attr[camelAttrName];
            //                 }
            //             }
            //         }



            //         p_elem.removeAttr('custom');
            //         $compile(p_elem)(scope)

            //         transclude(scope, function(clone, innerScope) {
            //             console.log(clone)

            //             $compile(clone)(innerScope);

            //             // p_elem.contents(clone)

            //             // $compile(p_elem)(scope.$parent)
            //             // p_elem.removeAttr('custom')
            //             // p_elem.contents(clone)

            //         })


            //         },
            //     post: angular.noop

            // }
        // }
        }
    }])

    // .directive('uImage', ['$compile',  function($compile) {
    //     return {
    //         restrict: 'E',
    //         replace: true,
    //         templateUrl: function(element, attr) {
    //             return 'shared/templates/components/graphic/image.' + (attr.type && (attr.type + '.')  || '') + 'tpl';
    //         },
    //         link: {
    //             pre: function (scope, element, attrs) {
    //                     var imageElem = element[0].querySelector('img');
    //                     console.log(imageElem)
    //                 }

    //         }
    //     }
    // }])
    .directive('media', ['$compile', 'XHRService', '$timeout', 'CompService', function($compile, XHRService, $timeout, CompService) {
        return {
            restrict: 'E',
            replace: true,

            templateUrl:'shared/templates/components/base/media.tpl',
            compile: function(element, attrs) {
                var progressFunc;
                var callback;

                var imgSrc = attrs.src;
                var img = element[0].firstChild;


                return {
                    pre: function(scope, lElem, lAttr) {
                        scope.m = {type: lAttr.type, url: lAttr.url, media:{url:''}, loader: {url: '', duration: 0, mb: {total:0, loaded:0},kb: {total:0, loaded:0}}};
                        scope.imgLoaded = false;
                        scope.loadRate = 0;

                        var startTime = new Date().getTime();
                        if (lAttr.loadWith) {
                            scope.m.loader.url = 'shared/templates/components/base/loader/' + lAttr.loadWith + '.tpl';
                        }

                        if (lAttr.import) {
                            scope.m.media.url = 'shared/templates/components/base/media/' + lAttr.import + '.tpl';
                        }

                        progressFunc = function(oEvent) {
                            var kbRemaining = oEvent.loaded/1000;
                            var kbTotal = oEvent.total/1000;
                            var deltaT = new Date().getTime() - startTime;
                            var percent = parseInt(10000*(kbRemaining/kbTotal))/100;
                            var eta = 100/percent * deltaT;

                            if (!scope.loadRate) {
                                scope.loadRate = (1000/deltaT) * 1500;
                            }
                            scope.m.loader.kb.total = kbTotal;
                            scope.m.loader.kb.loaded = kbRemaining;
                            scope.m.loader.mb.total = kbTotal/1000;
                            scope.m.loader.mb.loaded = kbRemaining/1000;
                            scope.m.loader.duration = Math.max(eta, 1000);
                            scope.m.loader.percent = percent;
                        };
                        callback = function(response) {

                            scope.m.loader.complete = true;
                            scope.m.data_url = window.URL.createObjectURL(new Blob([response]));
                            var elem = document.querySelector('[media-child]');

                            elem.style.backgroundImage = "url('" + response + "')";
                            elem.setAttribute('u', '');
                            $compile(angular.element(elem))(scope)
                            // CompService.getMediaElemOfType(lAttr.type, response, lElem[0].attributes, scope, lAttr, lElem);
                            scope.$parent.public.customStates['when-loader-complete'][0].func()
                        }
                        XHRService.getFileWithProgress(lAttr.url, progressFunc, null, callback)

                        // scope.img =  {imgHTML: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' /></svg>"}
                    },
                    post: angular.noop
                }
            }
        }
    }])
    .directive('scrollRef', ['ScrollService', '$timeout', '$interpolate', function(ScrollService, $timeout, $interpolate) {
        return {
            restrict: 'A',
            terminal: true,
            controller: function($attrs, $scope) {
                if ($attrs.scrollRef.indexOf('{{') > -1) {
                    $scope.scrollRef = $attrs.scrollRef;
                }

            },
            link: {post: function postLink(scope, element, attr) {

                // $timeout(function() {
//
                    // scope.$watch(function() {
                    //     var mainScrollContainerElem = ScrollService.scroll.current;
                    //     return mainScrollContainerElem
                    // }, function(value) {
                        // if (value && 'nodeName' in value) {
                            // var scrollFunc = ScrollService.getScrollFunction(value, attr.scrollRef)
                            // CONSOLE.LOG(ELEMENT)
                            // element.ready(function() {


                                var cancelWatcher = scope.$watch(function() {
                                    var scrollTop = element[0].offsetTop;
                                    return scrollTop;
                                }, function(offset_top_value) {

                                    if (offset_top_value > 0 && attr.scrollRef && attr.scrollRef.length && attr.scrollRef !== '#') {
                                        var elemToScroll = document.querySelector(attr.scrollRef);
                                        console.log(elemToScroll)
                                    }
                                })
                                // })


                            // })
                            element.on('click', function(e) {
                                var scrollToId = scope.scrollRef && $interpolate(scope.scrollRef)(scope) || attr.scrollRef;
                                var elemToScrollTo = document.querySelector(scrollToId);
                                var currentTop = elemToScrollTo.offsetTop - ScrollService.scroll.currentTop;
                                if (Math.floor(currentTop)) {
                                    ScrollService.scrollToY(ScrollService.scroll.current[0], currentTop,  500, 'easeInOutQuint');
                                }
                                // document.querySelector('[scrollable]').scrollTop = 500

                            })
                        // }
                    // })


                // })
            }
                    // })
                // }

            }
        }
    }])
    .directive('scrollable', ['ScrollService', '$timeout', function(ScrollService, $timeout) {

        return {
            restrict: 'A',
            compile: function(element, attr) {
                var scrollName = ScrollService.initScrollContainer(element, attr);
                var rect;
                return function postLink(scope, elem) {
                    // elem.ready(function() {

                    //     // ScrollService.scroll.contained[scrollName].info.element = elem;
                    //     // if (!ScrollService.scroll.current) {

                    //     // }
                    //     for (container_name in ScrollService.scroll.contained) {
                    //         var container = ScrollService.scroll.contained[container_name]
                    //         if ('info' in container && container['info'].element) {
                    //             if (container.info.element[0].outerHTML === elem[0].outerHTML) {
                    //                 if (ScrollService.scroll.current[0].scrollHeight) {
                    //                     ScrollService.scrollToY(ScrollService.scroll.current[0], 500, 500, 'easeInOutSine')
                    //                 }
                    //             }
                    //         }
                    //     }
                    // })

                    var pos = {};
                    var cancelWatcher = scope.$watch(function() {
                        pos.rect = elem[0].getBoundingClientRect();
                        return pos.rect.height

                    }, function(value) {

                        if (value && parseInt(value) && value > 0) {

                            for (key in ScrollService.scroll.contained) {
                                if (scrollName === key && 'info' in ScrollService.scroll.contained[scrollName]) {
                                    if (pos.rect) {
                                        // console.log(rect.height, rect.width);
                                        ScrollService.scroll.contained[scrollName].info.height = pos.rect.height;
                                        ScrollService.scroll.contained[scrollName].info.width = pos.rect.width;
                                        ScrollService.scroll.contained[scrollName].info.top = pos.rect.top;
                                        ScrollService.scroll.contained[scrollName].info.left = pos.rect.left;
                                        ScrollService.scroll.contained[scrollName].info.rect = pos.rect;
                                        ScrollService.scroll.contained[scrollName].info.posY = elem[0].scrollTop;
                                        ScrollService.scroll.contained[scrollName].info.posX = elem[0].scrollLeft;
                                        ScrollService.scroll.contained[scrollName].info.scrollWidth = elem[0].scrollWidth;
                                        ScrollService.scroll.contained[scrollName].info.scrollHeight = elem[0].scrollHeight;
                                        var scrollPos = {};
                                        var _elem;
                                        scope.$watch(function() {
                                            _elem = elem;
                                            return _elem[0].scrollTop

                                        }, function(value) {
                                            if ((value || _elem[0].scrollHeight) && _elem[0].scrollHeight > pos.rect.height) {
                                                console.log('scrollHeight detected', pos.rect.height)
                                                ScrollService.scroll.contained[scrollName].info.posY = value;
                                                ScrollService.scroll.contained[scrollName].info.top = pos.rect.top;
                                                ScrollService.scroll.contained[scrollName].info.element = _elem;
                                                ScrollService.scroll.current = _elem;
                                                ScrollService.scroll.currentTop = _elem[0].getBoundingClientRect().top;
                                            }
                                            if ((value || _elem[0].scrollWidth)&& _elem[0].scrollWidth > pos.rect.width) {
                                                ScrollService.scroll.contained[scrollName].info.posX = value;
                                                ScrollService.scroll.contained[scrollName].info.left = pos.rect.left;
                                                ScrollService.scroll.contained[scrollName].info.element = _elem;
                                                ScrollService.scroll.current = _elem;
                                                ScrollService.scroll.currentLeft = pos.rect.left;
                                            }


                                        })
                                        cancelWatcher();
                                    }

                                }
                                // ScrollService.scroll.contained[scrollName].info.element = elem;

                            }
                        }
                        // console.log(value)
                    })

                }
            },

        }
    }])
    .directive('keypressEvents', [
      '$document',
      '$rootScope',
      'KeyboardService',
      function($document, $rootScope, KeyboardService) {
        return {
          restrict: 'A',
          link: function() {
            $document.bind('keydown', function(e) {
            KeyboardService.record(e);
              $rootScope.$broadcast('keydown', e);

              $rootScope.$broadcast('keydown:' + e.which || e.keyCode, e);
              if (document.activeElement && document.activeElement.nodeName.toLowerCase() === 'input') {
                    return;
                }
            });
            $document.bind('keyup', function(e) {
                if (document.activeElement && document.activeElement.nodeName.toLowerCase() === 'input') {
                    return;
                }
              $rootScope.$broadcast('keyup', e);
              $rootScope.$broadcast('keyup:' + e.which || e.keyCode, e);
            });
          }
        };
      }
    ])
    .directive('types', ['$compile', '$stateParams', "$timeout", function($compile, $stateParams, $timeout) {
        return {
            scope: false,
            link: {pre: function(scope, element, attr) {
                scope.types = attr.types.split(', ');
                scope.activeType = $stateParams.type || scope.types[0];

                var d = angular.element('<div></div>')
                d.attr('ng-include', '"admin/templates/types.tpl"');
                element.parent().append(d);
                $compile(d)(scope)
                scope.activateType = function($event, type) {
                    $timeout(function() {
                      scope.activeType = type;

                      scope.$apply();

                      // $compile(angular.element(elem))($scope);
                    })
                }
                // console.log(element)
            }}
        }
    }])
    .directive('chartPlayer', ['$compile', function($compile) {
        return {
            restrict: 'E',
            scope: {'player':'='},
            templateUrl: 'admin/templates/animations/chart.player.tpl',
            replace:true
        }
    }])
    .directive('childGrow', ['$compile', function($compile) {
    return {
        restrict: 'A',
        scope:true,
        replace: false,
        transclude:true,
        compile: function(element, attr, transclude) {
            return function preLink(scope, p_element, p_attr) {
                transclude(scope, function(clone, inner_scope) {
                    p_element.append(clone);
                    p_element.removeAttr('child-grow')
                    p_element = $compile(p_element.contents())(scope)
                })
            }
        }
    }
    }])
    .directive('size', ['$compile', function($compile) {
        return {
            restrict: 'A',
            priority: 10000,
            compile: function(element, attr, transclude) {
                var sizeAttr = attr.size;
                var dim = {};
                if (sizeAttr.length) {
                    var sizeAttrSplit = sizeAttr.split(' ');
                    if (sizeAttrSplit.length === 2)  {
                        dim.width = sizeAttrSplit[0];
                        dim.height = sizeAttrSplit[1];
                    } else {
                        dim.width = sizeAttrSplit[0];
                        dim.height = sizeAttrSplit[0];
                    }
                }
                var extension = '';
                if (dim.width.indexOf('%') === -1 && dim.width.indexOf('px') === -1) {
                    extension = '%';
                }
                if (dim.height.indexOf('%') === -1 && dim.height.indexOf('px') === -1) {
                    extension = '%';
                }

                element.css('height', dim.width + extension);
                element.css('width', dim.height + extension);
                element.removeAttr('size');
                // e.append(element)
            }
        }
    }])
    .directive('inspectData', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        return {
            restrict: 'E',
            scope:false,
            priority: 10000,
            link: function postLink(scope, element, attr) {
                // if (element[0] && element[0].outerHTML) element[0].outerHTML = '';
                if (!$rootScope.inspected) {
                    $rootScope.inspected = true;

                    $timeout(function() {
                        _scope = scope;
                        var dataFields = Object.keys(attr.$attr);
                        var index = 1;
                        if (!dataFields.length) {
                            dataFields = Object.keys(_scope).filter(function(key) {return key.indexOf('$') === -1})
                        }





                        console.log('\n\nDATA AUDIT - ' + dataFields.length + ' fields found\n\n');


                        var fields = 'fields' in attr && attr.fields.split(',') || [];

                        dataFields.forEach(function(field_name) {
                            var obj = {};
                            if (field_name in _scope) {
                                obj[field_name] = _scope[field_name]
                                console.log('#' + index + ':', field_name, obj);
                            } else {
                                console.log('#' + index + ':', 'does not exist in current environment');
                            }
                            index++;
                        })
                        var parentDataFields = Object.keys(scope.$parent).filter(function(key) {return key.indexOf('$') === -1})

                    }, 100)
                }
            }
        }
    }])
    .directive('replace', ['$compile', function($compile) {
        return {
            restrict: 'E',
            transclude: 'element',
            replace:true,
            priority:100,
            scope: false,
            link: {pre: function preLink(scope, element, attr, ctrl, transclude) {

                var urlElem = "<graphic " + " url='" + attr.with + "'></graphic>"

                    e = angular.element(urlElem)
                    for (key in attr.$attr) {
                        e.attr(key, attr[key])
                    }

                    $compile(e)(scope)
                    element.after(e)

                }
            }
        }
    }])
    // .directive('url', [function() {
    //     return {
    //         restrict: 'A',
    //         scope:false,
    //         priority: 10000,
    //         compile: function(element, attr) {

    //             if (element[0].nodeName.toLowerCase() === 'graphic') {
    //                 return;
    //             }

    //             if (attr.url.indexOf('/') === -1) {

    //                 attr.$set('ngInclude', attr.url);
    //                 element.removeAttr('url');
    //             } else {
    //                 attr.$set('ngInclude', "'" +  attr.url + "'");
    //             }

    //         },
    //         link: function(scope, elem, attr) {
    //             console.log('ay', scope.nav)
    //         }
    //     }
    // }])
    .directive('modal', ['$compile', function($compile) {
        return {
            restrict: 'E',
            transclude:'element',
            template: '<ui-view ng-transclude></ui-view>',
            controller: function($scope, $attrs, $transclude) {
                console.log($transclude());
            }
        }
    }])
    .directive('resize', ['$compile', '$parse', function($compile, $parse) {
        return {
            restrict: 'A',
            terminal: true,
            controller: function($scope, $attrs, $element) {

                var value = $attrs.resize;

                if (value.length && value.indexOf('.') === -1) {
                    var cancelAfter = $attrs.$observe('resize', function(value) {
                        findAndResizeElement($scope.view.main.element, $element, value)
                        cancelAfter();
                    })
                }
                else if ($scope.view.main && $scope.view.main.element){
                    findAndResizeElement($scope.view.main.element, $element, $attrs.resize)
                }
                else if (!$scope.view.main) {
                    var watcherMain = $scope.$watch(function(value) {
                        if ('element' in value) {
                            watcherMain();
                            findAndResizeElement($scope.view.main.element, $element, $attrs.resize)
                        }
                    })
                }

                function findAndResizeElement(main_elem, elem, resize_elem) {
                    main_elem.ready(function() {
                        if (resize_elem.split('select').length > 1) {


                                // elem.ready(function() {
                            var elemRef = resize_elem.split('select:')[1];
                            var params = [];
                            var paramsMap = {'w': 'width', 'h':'height', 'l':'left', 'r': 'right', 't': 'top', 'b': 'bottom'}
                            if (elemRef.split(':').length > 1) {
                                params = elemRef.split(':')[1].split(',');
                                elemRef  = elemRef.split(':')[0];


                            }
                            elem.ready(function() {


                                var searchedElem = main_elem[0].querySelector(elemRef);
                                if (searchedElem) {
                                    var bounds = searchedElem.getBoundingClientRect();
                                    if (params.length) {
                                        $scope.resize = {};
                                        params.forEach(function(param, i) {
                                            param = param.replace('[', '').replace(']', '');

                                            var multiplier = ['*','+','-', '/'].filter(function(oper, i) {return param.indexOf(oper) > -1});
                                            if (multiplier.length) {
                                                multiplier.forEach(function(oper, i){

                                                    multiplier[i] = {num: parseFloat(param.split(oper)[1]), oper: oper}
                                                    if (i === 0) {
                                                        param = param.split(oper)[0];
                                                    }
                                                })
                                            }

                                            if (param in paramsMap) {
                                                var prop = paramsMap[param];
                                                var value = bounds[prop]
                                                if (multiplier.length) {
                                                    var valuestr = value;
                                                    multiplier.forEach(function(obj, i) {
                                                        valuestr += obj.oper + obj.num
                                                    })
                                                    value = $parse(valuestr)($scope)


                                                }
                                                $scope.resize[prop] = value + 'px';
                                                elem.css(prop, value + 'px');
                                            }

                                            // elem.css('width', bounds.width + 'px');
                                            // elem.css('left', bounds.left + 'px');
                                        })
                                    } else {

                                    }

                                }

                            })


                        }

                    })

                }
            }
        }
    }])
    .directive('graphic', ['$compile', 'CompService',  function($compile, CompService) {
        return {
            restrict: 'E',
            priority: 10001,
            transclude: true,
            templateUrl: function(element, attr) {
                return attr.url
            },
            controller: function($scope,$transclude, $element, $attrs) {

                $scope.$watch('url', function(value){
                    if (value) {
                        console.log(value)
                    }
                })
            }
            // compile: function compile(element, attr, transclude)  {

            //     // CompService.renderAllStyleAttributes(element, attr);
            //     var url = attr.url;
            //     console.log('it gets here', 2)
            //     return {
            //         pre: function(post_scope, post_element, post_attr) {
            //             if (url && url.indexOf('/') > -1 && post_element[0].outerHTML) {
            //                 post_element.removeAttr('ngInclude')
            //                 post_element.removeAttr('url')
            //                 // $compile(post_element)(post_scope)
            //                 // if (post_attr.ngInclude) {
            //                 //     if (post_element[0].outerHTML) {
            //                 //         post_element.removeAttr('ngInclude')
            //                 //     }

            //                 // }

            //                 // console.log(url, post_element[0])
            //             }
            //             if (post_scope.chart) post_scope.chart.elem = post_element;

            //         }
            //     }
            // }
        }
    }])

    .directive('uChart', ['$compile', '$timeout', function($compile, $timeout) {
// http://stackoverflow.com/questions/24615103/angular-directives-when-and-how-to-use-compile-controller-pre-link-and-post
    return {
            restrict: 'E',
            replace:true,
            transclude:true,
            templateUrl: 'shared/templates/components/base/grid/state.chart.tpl',
            controller: 'AdminChartController',
            controllerAs:'chart',
            scope: true,
            compile: function compile( element, attr ) {

                if (!attr.src) attr.src = 'shared:components.svg.logo.guru-head.html'

                return {
                    pre: function preLink( scope, lElem, attributes ) {
                        console.log(lElem[0])
                        // element.append(scope.chart.element)
                        // $compile(element)(scope)
                        // element.replaceWith(scope.chart.element.children().children().contents())
                        // $compile(element)(scope)


                        console.log( attributes.log + ' (pre-link)'  );
                    },
                    post: function postLink( scope, pElem, attributes ) {
                        // $compile(element)(scope)
                        // var animObj = scope.renderAnimationStr(element.find('svg'), null, attr.state, scope.chart.context);
                        // scope.chart.player = animObj.player;

                        $timeout(function() {
                            // scope.chart.elem = document.querySelector('#chart-elem');
                            // console.log(scope.chart.elem)
                        })
                    }
                };
             }
         };

    }])
    .directive("chart", ["$compile", "SVGService", "$timeout", function($compile, SVGService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'shared/templates/components/base/grid/chart.tpl',
            scope: {stream:'=cData', player: '=player'},
            compile: function(lElem, attr, transclude) {
                return {
                    pre: function(scope, elem, attr) {

                        if (scope.stream || typeof scope.stream !== 'object') {
                            console.log('expecting string', attr.state);
                            return;
                        }



                        scope.stream.showProps = false;
                        scope.chart = scope.stream.plot;
                        scope.chart.mouseEntered = false;
                        scope.chart.mouseEnteredPoint = null;
                        scope.chart.focusedPoints = [];
                        scope.chart.showDetails = false;
                        scope.chart.lastPointHovered = null;
                        scope.chart.lastPointEntered = null;
                        scope.chart.lastPointHoveredIndex = 0;

                        scope.chart.onMousePointEnter = function(index, point, $event) {
                            console.log('entering...', point, $event);
                            scope.chart.lastPointHovered = point;
                            scope.chart.lastPointHoveredIndex = index;
                        }
                        // scope.chart.onMousePointLeave = function(point, $event) {
                        //     console.log('leaving...', point, $event.type);
                        // }

                        scope.chart.onMousePointDown = function(point, $event) {
                            scope.chart.lastPointEntered = point;
                            $timeout(function() {
                                scope.$apply();
                            })
                        }

                        scope.chart.onMousePointUp = function(point, $event) {
                            console.log('unpressing...', point, $event);
                        }
                        scope.chart.onClick = function(stream, $event) {

                            var percent = $event.layerX / elem[0].getBoundingClientRect().width;
                            console.log(percent)
                            scope.player.jump(scope.player, percent, 1);
                        }
                        scope.chart.onMouseEnter = function(stream, $event) {

                            scope.player.focusStream(scope.player, stream);
                            scope.chart.showDetails = true;
                            if (scope.chart.mouseEntered) {
                                scope.chart.mouseEnterPending = false;
                                return
                            }
                            scope.chart.mouseEnterPending = true;
                            $timeout(function() {
                                if (!scope.chart.mouseEntered && scope.chart.mouseEnterPending) {
                                    scope.chart.mouseEntered = true;
                                }
                            } )
                        }

                        scope.chart.onMouseLeave = function(stream, $event) {
                            scope.chart.showDetails = false;
                            scope.player.unFocusStream(scope.player, stream)
                        }
                        scope.chartReady = true;
                        for (vb in scope.chart.vb) {
                            vb = scope.chart.vb[vb].toFixed(2)
                        }
                        scope.chart.mouseEntered = false;
                        scope.chart.mouseEnterPending = false;
                        $compile(elem)(scope);

                    }
                }
            }
        }
    }])
.directive('text', ['StyleService', '$compile', '$timeout', function (StyleService, $compile, $timeout) {
      return {
        restrict: 'AE',
        priority: 1,
        compile: function(elem, attr) {
          !('fill' in attr) && attr.$set('fill', 'white');

          !('x' in attr) && attr.$set('x', '50');
          !('y' in attr) && attr.$set('y', '56.25');
          !('fontSize' in attr) && attr.$set('font-size', '75');
          !('textAnchor' in attr) && attr.$set('text-anchor', 'middle');
          // return {
          //       pre:function (lScope, lElem, lAttr) {

          //           transclude(lScope, function(clone, innerScope) {
          //               // lElem[0].innerHTML = clone[0].innerHTML;
          //               // lElem.html(clone.html())// = .innerHTML
          //           })
          //       }
          //   }

        }
      };
    }])
    // .directive('item', ['StyleService', '$compile', function (StyleService, $compile) {
    //   return {
    //     restrict: 'AE',
    //     templateUrl: 'shared/templates/components/base/svg/item.svg.tpl',
    //     compile: function(elem, attr) {
    //       elem.css(StyleService.css.flexItem);
    //       ('height' in attr) && attr.$set('height', attr.height);
    //     },
    //     replace: true,
    //     transclude: true,
    //     priority:1
    //   };
    // }])
    // angular.module('uguru.shared.directives.base.components')
    .directive("render", ["AdminSVGRenderService", "$compile", function(AdminSVGRenderService, $compile) {
        return {
            restrict: 'E',
            templateUrl:function(element, attr) {
                var srcSplit = attr.src.split('.');
                var ending = '.' + srcSplit[srcSplit.length - 1];
                return srcSplit.slice(0, srcSplit.length - 1).join('/') + ending;
            },
            transclude:true,
            terminal:true,
            compile: function(element, attr, transclude) {
                elem = AdminSVGRenderService.parseRawSVG(element.children());
                element.parent().contents(elem);
                console.log(element.children()[0])
                // return {
                //     pre:function (lScope, lElem, lAttr) {

                //          transclude(lScope, function(clone, innerScope) {
                //             lElem.contents(clone);
                //             // lElem[0].innerHTML = clone[0].innerHTML;
                //             // lElem.html(clone.html())// = .innerHTML;
                //             // $compile(lElem)(lScope);
                //         })
                //     },
                //     post: angular.noop
                // }
            }
        }
    }])

    .directive("l", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl:CompService.getCompTemplateType('letter'),
            compile: function(element, attr, transclude) {
                return {
                    pre:
                    function (lScope, lElem, lAttr) {
                         transclude(lScope, function(clone, innerScope) {
                            // lElem[0].innerHTML = clone[0].innerHTML;
                            lElem.html(clone.html())
                            $compile(lElem)(lScope);
                        })
                    },
                    post: angular.noop
                }
            }
        }
    }])
    .directive("paragraph", ["CompService", "$compile", "UtilitiesService", function(CompService, $compile, UtilitiesService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl:CompService.getCompTemplateType('letter'),
            compile: function(element, attr, transclude) {

                return {
                    pre:
                        function (lScope, lElem, lAttr) {
                            var tpl = lElem
                            var delay = 0;
                            if (!('keep' in attr)) {
                                lElem = lElem.parent().html('');
                            }
                            if ('delay' in attr && attr.delay.length) {
                                delay = parseInt(attr.delay);
                            }

                            transclude(lScope, function(clone, innerScope) {

                                var words = clone[0].innerHTML;
                                var wordArr = (words && words.length && words.split(' ')) || []
                                var wordCloudDiv = '<div class="flex-wrap">'
                                wordArr.forEach(function(wd, i) {wordCloudDiv += '<span>' + wd + '</span>&nbsp;'});
                                wordCloudDiv += '</div>'
                                wordCloudDiv = angular.element(wordCloudDiv);
                                $compile(wordCloudDiv)(innerScope);



                                lElem.css('visibility', 'hidden');
                                lElem.append(wordCloudDiv);
                                var uniqueSpans = lElem[0].firstChild.children
                                var lineDict = {};
                                for (var i = 0; i < uniqueSpans.length; i++) {
                                    var iSpan = uniqueSpans[i];
                                    var rectTop = parseInt(iSpan.getBoundingClientRect().top);
                                    if (!(rectTop in lineDict)) {
                                        lineDict[rectTop] = [];
                                    }
                                    lineDict[rectTop].push(iSpan.innerHTML)
                                }
                                var lineWordArr = [];
                                wordCloudDiv.html('')
                                lElem.css('visibility', 'visible');
                                var index = 0;
                                for (key in lineDict) {
                                    var lineClone = tpl.clone();
                                    var sentence = lineDict[key].join(" ")

                                    lineClone.html('');

                                    if (delay) {
                                        CompService.applyDelayToWord(lineClone, delay * index);
                                    }

                                    lineClone[0].innerHTML = sentence

                                    $compile(lineClone)(innerScope);
                                    lElem.children().append(lineClone);
                                    index++;
                                }

                            })
                        }
                    }
                }
            }
    }])
    .directive("sentence", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl:CompService.getCompTemplateType('letter'),
            compile: function(element, attr, transclude) {
                return {
                    pre:
                        function (lScope, lElem, lAttr) {
                            var tpl = lElem
                            var delay = 0;
                            if (!('keep' in attr)) {
                                lElem = lElem.parent().html('');
                            }
                            if ('delay' in attr && attr.delay.length) {
                                delay = parseInt(attr.delay);
                            }
                            transclude(lScope, function(clone, innerScope) {
                                var wordArr = [];

                                var textStr = clone.html().split(' ');
                                for (var i = 0; i < textStr.length; i++) {
                                    var iChild = textStr[i]
                                    if (i < textStr.length - 1) {
                                        iChild += '&nbsp;';
                                    }
                                    var cloneLetter = tpl.clone();
                                    if (delay) {
                                        CompService.applyDelayToWord(cloneLetter, delay * i);
                                    }
                                    cloneLetter.html(iChild);
                                    $compile(cloneLetter)(innerScope)
                                    lElem.append(cloneLetter);
                                }
                                if ('keep' in attr ) {
                                    keepContainer = angular.element('<div></div>');
                                    lElem.parent().append(keepContainer);
                                    var children = lElem.contents();
                                    lElem.replaceWith(keepContainer)
                                    keepContainer.append(children);
                                }
                            })
                        }
                    }
                }
            }
    }])
.directive("word", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {innerText: '=text'},
            templateUrl:CompService.getCompTemplateType('letter'),
            compile: function(element, attr, transclude) {

                return {
                    pre:
                    function (lScope, lElem, lAttr) {
                        // if (lScope.innerText) {


                        //     lElem[0].innerHTML =lScope.innerText;
                        // }
                        var tpl = lElem
                        var delay = 0;
                        if (!('keep' in attr)) {
                            lElem = lElem.parent();
                            if (!lElem) lElem = element;
                            lElem.attr('class', attr.class);
                            lElem.html('');

                            if (!lElem) {
                                lElem = element;
                            }
                        }
                        if ('delay' in attr && attr.delay.length) {
                            delay = parseInt(attr.delay);
                        }



                        transclude(lScope, function(clone, innerScope) {
                            var childArr = [];
                            var textStr = clone.html() || lScope.innerText;
                            if (textStr.charAt(textStr.length - 1) !== ' ') {
                                textStr += ' '
                            }
                            for (var i = 0; i < textStr.length; i++) {

                                var iChild = textStr.charAt(i);
                                if (iChild === ' ') {
                                    iChild += '&nbsp;';
                                }
                                var cloneLetter = tpl.clone();
                                cloneLetter.css('webkit-transition', 'none');

                                cloneLetter.attr('on-init', cloneLetter.attr('on-init') + ':delay-' + (delay * i || 0));
                                cloneLetter.attr('u', '')
                                if (delay) {
                                    CompService.applyDelayToWord(cloneLetter, delay * i);
                                }
                                cloneLetter.html(iChild);



                                $compile(cloneLetter)(innerScope);
                                lElem.append(cloneLetter);

                            }
                            console.log(lElem.contents()[0])
                            if ('keep' in attr ) {
                                keepContainer = angular.element('<div></div>');
                                lElem.parent().append(keepContainer);
                                var children = lElem.contents();
                                lElem.replaceWith(keepContainer)

                                keepContainer.append(children);
                            } else {
                                lElem.replaceWith(lElem.children());
                                lElem.addClass('flex-vertical-center')
                            }

                            $compile(lElem)(lScope);


                        })
                    }
                }
            }
        }
    }])
    .directive("item", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            priority: 102,
            compile: function(element, attr, transclude) {
                CompService.renderAllStyleAttributes(element, attr);

            }
        }
    }])
    .directive("gridItem", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            priority: 102,
            compile: function(element, attr, transclude) {
                CompService.renderAllStyleAttributes(element, attr);
            }
        }
    }])
    .directive("bg", [function(CompService) {
        return {
            restrict: 'A',
            scope: false,
            replace:true,
            compile: function(element, attr) {
                if (attr.mBg && attr.mBg.length && _window.mobile) return;

                var backgroundString = attr.bg;
                if (attr.bg && attr.bg.length) {
                    var hasHex = attr.bg.indexOf('#');
                    var hasRgb = attr.bg.indexOf('rgb');
                    if (hasHex > -1 || hasRgb > -1) {
                        element.css('backgroundColor', attr.bg);
                    }
                    else if (attr.bg.length){
                        element.addClass('bg-' + attr.bg);
                    }
                }
            }
        }
    }])
    .directive("uInput", ["CompService", function(CompService) {
        return {
            restrict: 'E',
            scope: false,
            replace:true,
            templateUrl: 'shared/templates/components/base/input.tpl',
            compile: function(element, attr) {
                CompService.renderAllStyleAttributes(element, attr);
                 return {
                    pre: function preLink(scope, elem, attr) {
                        scope.type = attr.type || 'light';
                    }
                }
            }
        }
    }])
    .directive("attrValueSet", ["DataService", function(DataService) {
        return {
            restrict: 'E',
            scope: false,
            replace:true,
            compile: function(element, attr) {
                for (attr_name in attr.$attr) {
                    if (attr_name.indexOf('$') === -1 && attr[attr_name].split(' as ').length === 2) {
                        var attr_d = {};
                        var attrNameSplit = attr[attr_name].split(' as ');
                        attr_d.pre = attr_name;
                        attr_d.postdash = attrNameSplit[1].trim();
                        attr_d.value = attrNameSplit[0];
                        console.log(attr_d)
                        DataService.initNewAttrDirective(attr_d);
                    }
                }
            }
        }
    }])
    .directive("publicAttr", [function() {
        return {
            restrict: 'A',
            scope: false,
            link: {
                post: function(scope, elem, attr) {
                    if (!(elem[0].id in scope.root.publicAttr)) {
                        scope.root.publicAttr[elem[0].id] = [];
                    }
                    if (attr.publicAttr && attr.publicAttr.length) {
                        attr.publicAttr.split(' ').forEach(function(attr_str, i) {
                            if (attr_str === 'coords') {
                                scope.root.publicAttr[elem[0].id].push(elem[0].getBoundingClientRect());
                                console.log(scope.root.publicAttr)
                            }
                        })
                    }


                }
            }
        }
    }])
    // .directive("image", [function() {
    //     return {
    //         restrict: 'E',
    //         scope: false,
    //         replace:true,
    //         templateUrl: 'shared/templates/components/base/image.tpl',
    //         compile: function(element, attr) {
    //             CompService.renderAllStyleAttributes(element, attr);
    //              return {
    //                 pre: function preLink(scope, elem, attr) {

    //                 },
    //                 post: angular.noop
    //             }
    //         }
    //     }
    // }])
    .directive("if", [function() {
        return {
            restrict: 'A',
            priority:1000000,
            template: function(element, attr) {
                attr.$set('ngIf', attr.if);
                element.removeAttr('attr');
                console.log(element)
                return '<!--' + attr.if + '-->'
            },
            link: {
                pre: angular.noop,
                post: function postLink(element, attr) {
                    console.log(element);
                }
            }
        }
    }])
    .directive("calendar", ["$compile", "CompService", function($compile, CompService) {
        return {
            restrict: 'E',
            scope: false,
            replace:true,
            templateUrl: 'shared/templates/components/base/calendar.tpl',
            compile: function(element, attr, transclude) {
                CompService.renderAllStyleAttributes(element, attr);

                return {
                    pre: function preLink(scope, elem, attr) {
                        // var

                        var today = new Date();

                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        scope.daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

                        var calendar = {
                            month: months[today.getMonth()],
                            date: today.getUTCDate(),
                            year: today.getYear() + 1900,
                            day: today.getDay() + 1,
                            numDays: new Date(today.getFullYear(), today.getMonth()+1, 0).getUTCDate(),
                            days: []
                        }



                        for ( var i = 0; i < calendar.numDays; i++) {
                            calendar.days.push({
                                isBefore: calendar.date > i,
                                isToday: calendar.date === i,
                                isAfter: calendar.date < i,
                                dayName: scope.daysOfWeek[calendar.day % 6],
                                day: i
                            })
                        }
                        console.log(calendar.days)
                        scope.calendar = calendar;

                        // transclude(scope, function(clone, innerScope) {

                        //     console.log();
                        //     for (var i = 0; i < clone.length; i++) {
                        //         console.log(clone[i]);
                        //     }
                        // });
                        // for (var i = 0; i < scope.numDays)





                    }
                }
            }
        }
    }])
    .directive("txt", ["CompService",function(CompService) {
        return {
            restrict: 'E',
            scope: false,
            compile: function(element, attr) {
                if (attr.txt && attr.txt.length && _window.mobile) return;
                CompService.renderAllStyleAttributes(element, attr);
                element.addClass('flex-vertical-center')
                if (attr.center) {
                    element.css('text-align', 'center');
                }
                if (attr.lineHeight) {
                    element.css('line-height', parseFloat(attr.lineHeight));
                }
            }
        }
    }])
    .directive("m-txt", ["CompService",function(CompService) {
        return {
            restrict: 'E',
            scope: false,
            compile: function(element, attr) {
                if (!scope.root.window.mobile) {
                    return;
                }
                CompService.renderAllStyleAttributes(element, attr);
                element.addClass('flex-vertical-center')
                if (attr.center) {
                    element.css('text-align', 'center');
                }
                if (attr.lineHeight) {
                    console.log('has line height')
                    element.css('line-height', parseFloat(attr.lineHeight));
                }
            }
        }
    }])
    .directive("mBg", [function(CompService) {
        return {
            restrict: 'A',
            scope: false,
            link: {pre:
                 function preLink(scope, element, attr) {

                    if (!scope.root.window.mobile) {
                        return;
                    }
                    var backgroundString = attr.mBg;
                    if (attr.bg && attr.mBg.length) {
                        if (attr.mBg.indexOf('#') > -1 || attr.mBg.indexOf('rgb') > -1) {
                            element.css('backgroundColor', '#FFFFF');
                        } else {
                            element.addClass('bg-' + attr.mBg);
                        }
                    }

                }
            }
        }
    }])
    // http://41.media.tumblr.com/ae90b8caeba47c980d343fedfc547b55/tumblr_n9v9gbigA21sciteso1_500.png
    .directive("importView", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            priority: 1000,
            templateUrl: function(element, attr) {
                return attr.url;
            }
        }
    }])
    .directive("mainView", [function() {
        return {
            restrict: 'E',
            scope: false,
            compile: function(elem, attr, transclude) {
                return {
                    post: angular.noop,
                    pre: function postLink(scope,elem,attr) {
                        scope.root.mainViews.push(elem);
                    }
                }
            }
        }
    }])
    .directive("modal", ["CompService", "$compile", '$timeout', function(CompService, $compile, $timeout) {
        return {
            restrict: 'E',
            priority: 100000,
            scope: false,
            replace:true,
            compile: function(elem, attr) {
                CompService.renderAllStyleAttributes(elem, attr);

                elem[0].style.zIndex = -100;
                elem[0].style.opacity = 0;
                elem[0].style.position = 'fixed';
                CompService.initializeModalAttr(elem, attr, _window);
                var children = elem[0].innerHTML
                if (attr.scaleTo && attr.scaleTo.length) {
                    var elemToScale = document.querySelector(attr.scaleTo);
                    if (elemToScale) {
                        var elemRect = elemToScale.getBoundingClientRect();
                        console.log(elemRect)
                        for (key in elemRect) {
                            elem.css(key, elemRect[key] + 'px');
                        }
                    }

                }


                return {
                    pre: function preLink(scope, p_elem, p_attr) {

                        var _window = scope.root.window;
                        var windowWidth = scope.root.window.width;

                        // $compile(p_elem)(scope)


                        $timeout(function() {
                            if (scope.root.mainViews && scope.root.mainViews.length) {
                                scope.root.mainViews.forEach(function(parent, i) {

                                    // p_elem.append(clone);
                                    parent.parent().append(p_elem);
                                    // $compile(p_elem.contents)(scope)
                                    p_elem.addClass('full-xy absolute')
                                    if (attr.scaleTo && attr.scaleTo.length) {
                                        var elemToScale = document.querySelector(attr.scaleTo);
                                        if (elemToScale) {
                                            var elemRect = elemToScale.getBoundingClientRect();
                                            var ratioWidth;
                                            var ratioHeight;
                                            for (key in elemRect) {
                                                if (key === 'width') {
                                                    ratioWidth = _window.width/elemRect[key];
                                                    console.log(key, 'width:' +  _window.width, 'ratio:' + ratioWidth, 'inverse:' + 1/ratioWidth, p_elem)

                                                }
                                                else if (key === 'height') {
                                                    ratioHeight = _window.height/elemRect[key];
                                                    console.log(key, 'width:' +  _window.height, 'ratio:' + ratioHeight, 'inverse:' + 1/ratioHeight, p_elem)
                                                }

                                            }
                                            if (ratioHeight && ratioWidth) {
                                                elem.css('transform', 'scaleX(' + 1/ratioWidth +  ') scaleY(' +  1/ratioHeight  + ')' )
                                            }
                                        }

                                    }

                                    // p_elem.attr('u', '')
                                    // $compile(p_elem)(scope.$parent)
                                    // if (parent[0].contains(p_elem[0])) {
                                    //     transclude(scope, function(clone, innerScope) {

                                    //         p_elem.append(clone);

                                    //         parent.parent().append(p_elem);

                                    //         p_elem.attr('u', '')

                                    //         $compile(p_elem)(scope.$parent)
                                    //         p_elem[0].className = '';
                                    //         attr.bg && p_elem[0].classList.add('bg-' + attr.bg)

                                    //     })
                                    // }
                                })
                            }
                        })

                    }
                }
            }
        }
    }])
    .directive("replaceMe", ['$compile', function($compile) {
        return {
            restrict: 'A',
            priority: 100000,
            replace:true,
            transclude: 'element',
            templateUrl: 'shared/templates/debug.tpl',
            controller: function($element, $transclude) {
                // console.log($element)
                // $element.append($transclude());
            },
            link: function(scope, elem, attr, ctrl, transclude) {
                var e = (transclude(scope, function(clone, _scope) {
                    elem.append(clone)
                }))
            }
        }
    }])

    .directive('logic', ['$compile', function($compile) {
        return {
            restrict: 'E',
            transclude: 'element',
            template: '<!-- -->',
            controller: function($scope, $transclude, $element) {
                $element.parent().replaceWith($element);
                // console.log()

                // var afterTemplReplace = $transclude(function(elem, scope) {
                //     originElem = $compile(elem)(scope);
                // })
                // console.log(originElem[0], afterTemplReplace)
                // $element.append(afterTemplReplace);
                console.log($element, $transclude())
            },
            compile: function(element, attr){

                return function preLink(scope, elem, attr, ctrl, transclude) {
                    e = transclude(function(inner_elem, inner_scope) {
                        console.log(inner_elem[0])
                    })
                    console.log(elem)
                }


            }
        }
    }])
    .directive('mainView', ['$compile', function($compile) {
        return {
            template: '<ui-view height="100" width="100"></ui-view>',
            priority: 1000000
        }
    }])
    .directive("bindings", [function() {
        return {
            restrict: 'E',
            transclude: true,
            controllerAs: 'view',
            template: '<ng-transclude></ng-transclude>',
            link: function(scope, elem, attr, ctrl, transclude) {
                var queue  = [];
                var children = transclude(scope);
                for (var i = 0; i < children.length; i++) {

                    // console.log(children[i])
                    // if (children[i].innerHTML) {
                    //     console.log(children[i])
                    // }
                }

            }
        }
    }])
    .directive("utility", [function() {
        return {
            restrict: 'E',
            terminal:true,
            replace:true,
            transclude:true,
            require:'?view',
            template: function(element, attr) {
                if (attr.type === 'footer') {
                    return '<div fixed z-index="100" bg="charcoal-20p" ng-transclude> </div>'
                }
            },
            controller: function($scope, $element, $attrs) {

            },
            link: function(scope, elem, attr, ctrl, transclude) {
                var queue  = [];
                var children = transclude(scope);
                // elem.after(children);
            }
        }
    }])
    .directive("importDict", ['$parse', '$timeout', 'XHRService', function($parse, $timeout, XHRService) {
        return {
            restrict: 'E',
            require: '?view',
            transclude: 'element',
            scope: false,
            link: function(scope, element, attr, ctrl, tr) {
                var dataName = ('as' in attr && attr.as) || 'key' in attr && attr.key;

                var indexNum = scope.view.activeImports.length;

                if (attr.url && attr.url.length) {
                    scope.view.activeImports+= 1;

                    XHRService.getJSONFile('GET', attr.url, function(data) {
                        if (!('data' in scope.view)) scope.view.data = {};
                        if (dataName) {
                            scope.view.activeImports-= 1;
                            // scope.view.activeImports.pop(0);

                            if (!scope.view.activeImports.length) {
                                console.log(scope.view.activeImports)
                                // $timeout(function(){
                                //     scope.$apply();
                                // })
                            }
                            // addDataToViewDict(dataName, dict)
                            if (attr.key) {
                                scope.view.data[dataName] = data[dataName];
                            } else {
                                scope.view.data[dataName] = data;
                            }

                        }
                    })
                } else {
                    var innerDict = tr()[0].innerHTML;
                    var dict = $parse(innerDict)(scope);
                    // if (!scope.view.data) scope.view.data = {};
                    // console.log(scope.view.data, scope.$parent.view.data)
                    if (dataName) {
                        scope.view.data[dataName] = dict;
                        console.log(scope.view.data)

                    } else {
                        scope.view.data = dict;
                    }
                }

                // scope.$watch('view.data' , function(value) {



                //     for (key in dict) {
                //         value[key] = dict;
                //     }
                // })
            }
        }
    }])
    .directive("importFont", ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            require: '?view',
            replace:false,
            template: function(element, attr) {
                if (attr.fF && attr.url && attr.ext) {
                    var font = {};
                    font.family = attr.fF;
                    font.url = 'https://' + attr.url;
                    var extSplit = attr.ext.split(',');
                    extSplit.forEach(function(ext, i) {
                        var formatSplit = ext.split('|');
                        var format;
                        if (formatSplit.length >1) {
                            format = formatSplit[1];
                        } else {
                            format = ext
                        }

                        extSplit[i] = {
                            url:[font.url,ext].join("."),
                            format:format
                        }
                    });
                    font.ext = extSplit;
                    var links = [createLinkElement([font.url,'?family=',font.family].join(""), 'stylesheet', 'text/css'), createFontStyleElement(font)]
                    var header =  document.head || document.getElementsByTagName('head')[0];
                    // links.forEach(function(link, i) {
                    //     if (link.styleSheet) {
                    //         style.styleSheet.cssText = link.innerHTML
                    //     }
                    //     header.appendChild(link);
                    // })
                    function createLinkElement(href, rel, type) {
                        var linkE = document.createElement('link');
                        linkE.setAttribute('href', href)
                        linkE.setAttribute('rel', rel)
                        linkE.setAttribute('type', type)
                        return linkE
                    }
                    function createFontStyleElement(font_str) {
                        var importUrl = ['\@import url(', font.url, '?family=', font.family, ');'].join("")
                        var fontFaceCSS = ['{\@font-face \{font-family: "', font.family, '";\n', "\}\}"].join("");
                        font.ext.forEach(function(ext_dict, i) {
                            fontFaceCSS += ['src: url("', ext_dict.url, '") format("', ext_dict.format, '");'].join("") + "\n";
                        })

                        var linkE = document.createElement('style');
                        linkE.appendChild(document.createTextNode(font_str))
                        return linkE
                    }
                    console.log(font.url)
                    var fontStr = "<style> @font-face { font-family: " + font.family + "; src: url('" + font.url + "') format('woff'); }main{font-family:'" + font.family + "';}"
                    var link =  createFontStyleElement(fontStr);
                    header.appendChild(link);
                    return "<style> @font-face { font-family: " + font.family + "; src: url('" + font.url + "') format('woff'), url('" + font.url.replace('.woff2', '') + ".woff2') format('woff2'), url('" + font.url.replace('woff', '') + ".ttf') format('truetype'); }main{font-family:'" + font.family + "';}"
                }
                return null
            }
        }
    }])
    .directive("view", ["CompService", "$compile", "$rootScope", "$parse", "DataService", "ViewService", "$timeout", function(CompService, $compile, $rootScope, $parse, DataService, ViewService, $timeout) {
        return {
            restrict: 'E',
            // templateUrl: 'shared/templates/view.tpl',
            template: "<div  width='100%' height='100%' abs top='0' left='0' class='view'> <div ng-transclude='imports'> </div><div ng-transclude='loader'></div> <div size='100%' ng-transclude ng-transclude-slot='main'></div> <div ng-transclude='hidden'></div> <div ng-transclude='utility'></div></div>",
            transclude: {
                imports: '?imports',
                loader: '?loader',
                main: '?main',
                hidden: "?hidden",
                utility: "?utility"
            },
            controllerAs: 'view',
            bindToController:true,
            controller: ["$element", "$attrs", "$scope", "$transclude", function($element, $attrs, $scope, $transclude) {
                var view = this;
                view.logic = {}
                view.loader = {}
                view.content = {};
                view.activeImports = 0;
                view.data = {};
                // view.data = {};
                view.components = {rendered:false};
                view.inner = {elems: {pre: {}, post:{}}, loader: {}};
                view.main = {ready:false};
                view.inner.elems.post = $transclude($scope, function(transElem, transScope) {
                    view.inner.elems.pre = transElem;
                    view.inner.scope = transScope;
                });
                view.refreshLock = false;
                // view.refresh = function(view_data) {
                //     view.main.refresh = true;
                //     console.log(view_data)
                //     // view.data.components.wind = view_data;

                //     $timeout(function() {
                //         // $scope.$apply();
                //         view.main.refresh = false;
                //     })
                // }
                var numChildren = view.inner.elems.post.length;

                for (var i = 0; i < numChildren; i++) {
                    var child = view.inner.elems.post[i];

                    if (child && child.outerHTML && child.nodeName) {

                        if (child.nodeName.toLowerCase() === 'components') {
                            DataService.initComponent(child);
                        }
                    }
                }
                // console.log('components are rendered')
                view.components.rendered = true;
                if (!('immediate' in $attrs)) {

                    var watcher = $scope.$watch('view.activeImports', function(value) {
                        console.log('view update for activeImports', value);
                        if (value === 0) {

                            $scope.view.main.ready = true;
                            watcher();

                        }

                        // $scope.view.data
                    })
                }
            }]
                // archive
                // var view = this;
                // view.logic = {}
                // view.loader = {}
                // view.content = {};
                // $scope.view.activeImports = 0;
                // $scope.view.data = {};
                // view.components = {rendered:false};
                // view.inner = {elems: {pre: {}, post:{}}, loader: {}};
                // $scope.view.main = {ready:false};
                // view.inner.elems.post = $transclude($scope, function(transElem, transScope) {
                //     view.inner.elems.pre = transElem;
                //     view.inner.scope = transScope;
                // });
                // view.refreshLock = false;
                // view.refresh = function(view_data) {
                //     view.main.refresh = true;
                //     console.log(view_data)
                //     // view.data.components.wind = view_data;

                //     $timeout(function() {
                //         $scope.$apply();
                //         view.main.refresh = false;
                //     })
                // }
                // var numChildren = view.inner.elems.post.length;
                // for (var i = 0; i < numChildren; i++) {
                //     var child = view.inner.elems.post[i];

                //     if (child && child.outerHTML && child.nodeName) {

                //         if (child.nodeName.toLowerCase() === 'components') {
                //             DataService.initComponent(child);
                //         }
                //     }
                // }
                // // console.log('components are rendered')
                // view.components.rendered = true;

                // if (!('immediate' in $attrs)) {

                //     $scope.$watch('view.activeImports', function(value) {
                //         if (value === 0) {
                //             console.log('we can compile main');
                //             $scope.view.main.ready = true;

                //         }

                //         // $scope.view.data
                //     })
                // }





                // var hasLoader = CompService.doesElemHaveLoader(view.inner.elems);
                // view.inner.loader = hasLoader.loader;



              //   // console.log(preTranscludeElems.remaining.forEach(function( item, i) {
              //   //   if ('innerHTML' in item) {
              //   //     item.style.opacity = 0;
              //   //   }
              //   // }))

              // }
              //   // $element.append($transclude($scope));
              //   console.log($transclude(function(elem, scope) {
              //       console.log(elem)
              //   }))

        }
    }])
    .directive("grid", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            transclude:true,
            priority: 100,
            template: CompService.getCompTemplateType('grid'),
            compile: function(element, attr, transclude) {

                var dimArr = CompService.getAndParseDimensions(attr.d);
                return {
                    pre: function preLink(lScope, lElem, lAttr, transcludeFn) {

                            transclude(lScope, function(clone, innerScope) {
                                var childArr = [];
                                for (var i = 0; i < clone.length; i++) {
                                    if (clone[i].nodeType === 1) {
                                        childArr.push(clone[i]);
                                        console.log(clone[i])
                                    }
                                }
                                for (var i = 0; i < dimArr.length; i++) {
                                    var iChild = childArr[i % childArr.length];
                                    iChild.style.width= dimArr[childArr.length].width + '%';
                                    iChild.style.height = dimArr[childArr.length].height + '%';
                                    var cloneNode = iChild.cloneNode(true);
                                    $compile(cloneNode)(innerScope);
                                    lElem.append(cloneNode)

                                    $compile(lScope)(lElem)

                                }
                                console.log('grid has transcluded')
                            })
                            console.log('grid has compiled')

                    }

                }
            }
        }
    }])
    .directive("svgTable", [function() {
        return {
            templateUrl: 'shared/templates/components/base/grid/svg.table.tpl',
            scope: {},
            restrict: 'E',
            replace: true,
            transclude: true,
            priority:2,
            link: {
                pre: function(scope, element, attr) {
                    scope.vb = {};
                    var parentDim = element.parent()[0].getBoundingClientRect();

                    if (parentDim.width > parentDim.height) {
                        scope.vb.height = Math.round(((parentDim.height/parentDim.width)*100), 2)
                        scope.vb.width = 100;
                        console.log(scope.vb)
                    } else {
                        scope.vb.height = 100;
                        scope.vb.width = Math.round(((parentDim.width/parentDim.height)*100), 2)
                    }
                    element[0].setAttribute('viewBox', '0 0 ' + scope.vb.width + ' ' + scope.vb.height);
                    scope.rows = parseInt(attr.rows);
                }
            }
        }
    }])
    .directive('svgTableItem', ['$compile', function ($compile) {
        return {
        restrict: 'AE',
        scope: {rows:'=rows'},
        template: '<rect rows=rows columns=columns ng-transclude></rect>',
        replace: true,
        transclude: true,
        priority:0,
        compile: function(element, attr) {
            return function preLink(scope, element, attr) {

                var dim = element.parent()[0].getAttribute('dim');
                var columns = parseInt(dim.split('x')[0])
                var rows = parseInt(dim.split('x')[1])
                var parent = element[0].parentNode;
                var index = Array.prototype.indexOf.call(parent.children, element[0]);
                //column
                var rowIndex = parseInt(index/rows) % rows;

                var columnIndex = index % columns;
                element[0].setAttribute('width', 100/rows + '%');
                element[0].setAttribute('x', rowIndex * (100/rows) + '%');
                element[0].setAttribute('y', columnIndex * (100/columns) + '%');
                element[0].setAttribute('height', 100/columns + '%');
            }
        }
      };
    }])
    .directive("bar", ["RootService", "$timeout", function(RootService, $timeout) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/grid/bar.tpl',
            restrict: 'E',
            scope: {
                overflowX:'=',
                options: '=ngModel',
                title: '=title',
                key: '=key',
            },
            link: {
                pre: function(scope, element, attr) {
                }
            }
        }
    }])
    .directive("uBody", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/body.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uBody", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/body.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uCheckbox", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/checkbox.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uDropdown", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/dropdown.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uHeader", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/header.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])

    .directive("uRadio", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/radio.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uToggle", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/toggle.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    .directive("uTooltip", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/tooltip.tpl',
            restrict: 'E',
            link: {
                pre: function(scope, element, attr) {
                    return
                }
            }
        }
    }])
    // .directive('x', ['CompService', function(CompService) {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //         if (element[0].nodeName.toLowerCase() === 'SVG' || element[0].ownerSVGElement) return;
    //         var mappings = {
    //             'center': 'center',
    //             'end': 'flex-end',
    //             'space-between': 'space-between',
    //             'sb': 'space-between',
    //             'sa': 'space-around',
    //             'space-around': 'space-around',
    //             'top': 'flex-start'
    //         }
    //         var value = (attr.x && attr.x.length && attr.x in mappings && mappings[attr.x]) || 'center'
    //       element.css('justify-content', value);
    //       element.css('align-items', value);
    //     }
    //   }
    // }])
    // .directive('y', ['CompService', function(CompService) {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //         var nodeName = element[0].nodeName.toLowerCase();
    //         var restrictedNodes = ['SVG', 'svg', '#comment'];
    //         if (restrictedNodes.indexOf(nodeName) > -1 || element[0].ownerSVGElement) return;
    //         var mappings = {
    //             'center': 'center',
    //             'end': 'flex-end',
    //             'space-between': 'space-between',
    //             'sb': 'space-between',
    //             'sa': 'space-around',
    //             'space-around': 'space-around',
    //             'top': 'flex-start'
    //         }
    //         var value = (attr.y && attr.y.length && attr.y in mappings && mappings[attr.y]) || 'center'

    //       element.css('align-content', value);
    //       if (['space-between', 'space-around'].indexOf(value) === -1) {
    //         element.css('align-items', value);
    //       }
    //     }
    //   }
    // }])
    // .directive('end', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'flex-end');
    //     }
    //   }
    // }])
    // .directive('start', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'flex-start');
    //     }
    //   }
    // }])
    // .directive('left', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'flex-start');
    //     }
    //   }
    // }])
    // .directive('right', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'flex-end');
    //     }
    //   }
    // }])
    // .directive('center', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'center');
    //     }
    //   }
    // }])
    // .directive('stretch', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'stretch');
    //     }
    //   }
    // }])
    // .directive('spaceBetween', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'space-between');
    //     }
    //   }
    // }])
    // .directive('spaceAround', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-self', 'space-around');
    //     }
    //   }
    // }])
    // .directive('xEnd', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('justify-content', 'flex-end');
    //     }
    //   }
    // }])

    // .directive('sA', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('justify-content', 'space-around');
    //     }
    //   }
    // }])
    // .directive('sB', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('justify-content', 'space-between');
    //     }
    //   }
    // }])
    // .directive('yEnd', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'flex-end');
    //       element.css('align-items', 'flex-end');
    //     }
    //   }
    // }])
    // .directive('yStretch', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'stretch');
    //       element.css('align-items', 'stretch');
    //     }
    //   }
    // }])
    // .directive('yStart', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'flex-start');
    //       element.css('align-items', 'flex-start');
    //     }
    //   }
    // }])
    // .directive('yCenter', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'center');
    //       element.css('align-items', 'center');
    //     }
    //   }
    // }])
    // .directive('xEnd', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('justify-content', 'flex-end');
    //     }
    //   }
    // }])
    // .directive('ySpaceBetween', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'space-between');
    //     }
    //   }
    // }])
    // .directive('ySpaceAround', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'space-around');
    //     }
    //   }
    // }])
    // .directive('ySa', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('align-content', 'space-around');
    //     }
    //   }
    // }])
    // .directive('ySb', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('justify-content', 'space-between');
    //     }
    //   }
    // }])
    //  .directive('row', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-direction', 'row');
    //     }
    //   }
    // }])
    // .directive('rowReverse', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-direction', 'row-reverse');
    //     }
    //   }
    // }])
    // .directive('column', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-direction', 'column');
    //     }
    //   }
    // }])
    // .directive('columnReverse', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-direction', 'row-reverse');
    //     }
    //   }
    // }])
    // .directive('wrap', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-wrap', 'wrap');
    //     }
    //   }
    // }])
    // .directive('nowrap', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-wrap', 'nowrap');
    //     }
    //   }
    // }])
    //  .directive('wrapReverse', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-wrap', 'wrap-reverse');
    //     }
    //   }
    // }])
    //  .directive('order', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('order', parseInt(attr.order));
    //     }
    //   }
    // }])
    //  .directive('grow', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-grow', parseInt(attr.grow));
    //     }
    //   }
    // }])
    // .directive('shrink', [function() {
    //   return {
    //     restrict: 'A',
    //     compile: function(element, attr) {
    //       element.css('flex-shrink', parseInt(attr.shrink));
    //     }
    //   }
    // }])
    // .directive('uList', ['$compile', function($compile) {
    //     return {
    //         restrict: 'A',
    //         priority: 100000,
    //         transclude:true,
    //         compile: function(element, attr) {

    //             if (!attr.uList || !attr.uList.length) return;

    //             var listParams = attr.uList + ' track by $index';
    //             if (listParams.indexOf('in') === -1 && listParams.charAt(0) === '[' && listParams.charAt(listParams.length - 1) === ']') {
    //                 var e = angular.element(element[0].outerHTML)
    //                 listParams = 'item in ' + listParams;

    //                 e[0].setAttribute('ng-repeat', listParams);

    //                 element.replaceWith(e);
    //             } else {
    //                 element[0].setAttribute('ng-repeat', listParams);
    //             }
    //             element.removeAttr('uList');
    //             return function preLink(scope, p_element, p_attrs, ctrl, transclude) {
    //                 transclude(function(transEl, transScope) {
    //                     console.log(transEl[0])
    //                 })

    //             }
    //         }
    //     }
    // }])
    .directive('uList', ['$compile', '$rootScope', 'DataService', function($compile, $rootScope, DataService) {
        return {
            restrict: 'A',
            priority: 100000000,
            replace:true,
            template: function(element, attr) {
                element[0].removeAttribute('u-list');
                var uListAttr = attr.uList.replace('in ', 'in ');

                element[0].setAttribute('ng-repeat', DataService.applyListParams(uListAttr));

                return element[0].outerHTML;
            }

        }
    }])
    .directive('initIf', ['$compile', 'DataService', function($compile, DataService) {
        return {
            restrict: 'A',
            transclude:'element',
            replace:true,
            scope:false,
            priority: 10000,
            controller: function($scope, $element, $transclude, $attrs) {
                var transEl;
                $transclude($scope, function(transEl, scope) {
                    transEl = transEl;
                });
                $scope.$watch($attrs.initIf, function(value) {
                    console.log(value)
                    if (value) {
                        $element.append(transEl);
                    }
                });
            }

        }
    }])
    // .directive('uList', ['$rootScope', '$compile', '$parse', function($rootScope, $compile, $parse) {
    //   return {
    //     transclude: 'element',
    //     restrict: 'A',
    //     replace:true,
    //     link: function(scope, el, attrs, ctrl, transclude) {

    //         var attrSplit = attrs.uList.split('in');
    //         var varName;
    //         attrSplit.forEach(function(str, i) {attrSplit[i] = attrSplit[i].trim()});
    //         if (attrSplit.length === 2) {
    //             varName = attrSplit[0];
    //         }
    //         if (attrSplit.length < 2 || !varName.length) {
    //             varName = 'item';
    //         }
    //         var coll = scope.$eval(attrSplit[1]);

    //       if ('start' in attrs && 'end' in attrs) {
    //         coll = coll.slice(parseInt(attrs.start), parseInt(attrs.end))
    //       }
    //       console.log(coll)
    //       if (!coll) {
    //         console.log(scope.data)
    //         scope.$watch(attrSplit[1], function(value) {
    //             console.log(value)
    //         })
    //       } else {
    //                 var children = [];

    //                 coll.forEach(function(each, i) {
    //                     transclude(function(transEl, transScope) {
    //                     transScope[varName] = each;
    //                     transScope['index'] = i + 1;
    //                     transEl[0].removeAttribute('u-list');

    //                     // for (attr in attrs) {
    //                     //     if (attr.charAt(0) === 'u') {
    //                     //         var varName = attr.substring(1, attr.length)
    //                     //         varName = varName[0].toLowerCase() + varName.substring(1, varName.length)
    //                     //         console.log('setting', varName, $parse(attrs[attr])($parse))
    //                     //         transScope[varName] = scope.$eval(attrs[attr])
    //                     //     }


    //                     // }

    //                   // for (attr in el.attributes) {

    //                   // }
    //                     $compile(transEl)(transScope)
    //                     el.parent().append(transEl)

    //                     });
    //                  });
    //                 el.replaceWith(el.contents())
    //       }


    //     }
    //   };
    // }])

    .directive('htmlSnippet', ['$compile',function($compile) {
        return {
            restrict: 'E',
            scope: {html: '=html'},
            replace: true,
            link: function(scope, element, attr, ctrl, transclude) {


                var language = attr.language || 'markup';

                var elem = Prism.highlight(scope.html, Prism.languages[language]);
                var codeElem = angular.element('<pre class="formatted language-' + language + '"></pre>');
                codeElem.append(angular.element(elem));
                element.replaceWith(codeElem);

                // element.contents()
                // var html =
            }
        }
    }])
    .directive('htmlRender', ['$compile',function($compile) {
      return {
        restrict: 'E',
        scope: {html: '=html'},
        transclude: true,
        replace:false,
        compile: function(element, attr, transclude) {

            return {
                pre: function preLink(scope, pre_elem, pre_attr) {
                    if (!scope.html || !scope.html.length || scope.html.indexOf('>') === -1) return;
                    var e = $compile(scope.html)(scope)

                    pre_elem.replaceWith(angular.element(e));
                    pre_attr.compile && transclude(scope, function(clone, innerScope) {

                    })
                }
            }
        }

      }
    }]).config(function($controllerProvider, $provide, $compileProvider) {
        baseCompModule.directive = function(name, factory) {
            $compileProvider.directive(name, factory);
            return (this);
        }
    });

    var propDirectives = [
        'width',
        'height',
        'fontSize',
        'm',
        'mX',
        'mY',
        'mTop',
        'marginTop',
        'marginBot',
        'marginBottom',
        'marginLeft',
        'marginRight',
        'mBot',
        'mBottom',
        'mLeft',
        'mRight',
        "marginX",
        "marginY",
        "p",
        "padding",
        "margin",
        "pX",
        "pY",
        "pTop",
        "pBottom",
        "pLeft",
        "pRight",
        "paddingX",
        "paddingY",
        "paddingBottom",
        "paddingBot",
        "pBot",
        "paddingTop",
        "paddingLeft",
        "paddingRight",
        "basis",
        "shrink",
        "grow",
        "order",
        "wrapReverse",
        "wrap",
        "nowrap",
        "end",
        "start",
        "left",
        "right",
        "center",
        "stretch",
        "spaceBetween",
        "spaceAround",
        "sA",
        "sB",
        "xEnd",
        "yEnd",
        "yStretch",
        "yStart",
        "yCenter",
        "xEnd",
        "ySpaceBetween",
        "ySpaceAround",
        "ySa",
        "ySb",
        "row",
        "rowReverse",
        "rR",
        "column",
        "columnReverse",
        "cR",
        "x",
        "y",
        "xCenter",
        "top",
        "left",
        "right",
        "bottom",
        "t",
        "l",
        "r",
        "b",
        "bot",
        "rad",
        "radius",
        "zIndex",
        "maxHeight",
        "minHeight",
        "minWidth",
        "maxWidth",
        "w",
        "h",
        "fS",
        "flex",
        "rel",
        "relative",
        "abs",
        "absolute",
        "border",
        "z",
        "bWidth",
        "borderWidth",
        "bW",
        "bS",
        "borderStyle",
        "borderColor",
        "bC",
        "bR",
        "static",
        "fixed",
        "fix",
        "op",
        "overflow",
        "oFlow",
        "scrollX",
        "scrollY",
        "scrollXY",
        "scrollable",
        "noScroll",
        "hideX",
        "hideY",
        "scroll",
        "fW",
        "fontWeight",
        "lineHeight",
        "lH",
        "lS",
        "letterSpacing",
        "pointer",
        "point",
        "content",
        "inherit",
        "fF",
        "noOverflow",
        "inheritHW",
        "inheritH",
        "inheritW",
        "inheritWH",
        "inheritSize",
        "inherit",
        "alignSelf",
        "alignItems"
        ]

    var modulePointer = angular.module('uguru.shared.directives.base.components');

    if (_browser.size.tablet) {
        renderPropDirectives(propDirectives, 't');
    }
    if (_browser.size.mobile) {
        renderPropDirectives(propDirectives, 'm');
    }
    if (_browser.size.orientation === 'landscape') {
        renderPropDirectives(propDirectives, 'l');
    }
    if (_browser.size.orientation === 'portrait') {
        renderPropDirectives(propDirectives, 'p');
    }
    renderPropDirectives(propDirectives);

    function camelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
          return group1.toUpperCase();
        });
      }

    function renderPropDirectives(props, prefix) {

        props.forEach(function(prop) {
            // console.log(prop)
            var propName = prop;
            if (prefix) {

                propName = camelCase((prefix + '-' + prop.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()).toLowerCase());

            }


        var propNameRender = prop
            modulePointer.directive(propName, ['CompService','$parse', function(CompService, $parse) {
              return {
                restrict: 'A',
                templateNamespace: 'html',
                priority: 100000,
                replace:true,
                compile: function(element, attr) {
                    if (element[0].nodeName === '#comment') return;
                    var ignoreCompile = false;
                    var unPrefix = false;
                    var renderLater = false;
                    var prefixedProp = '';
                    if (propName in attr && attr[propName].indexOf('}}') > -1) {
                        element[0].setAttribute(propName,attr[propName].replace('}}', '').replace('{{', ''))
                        attr.$set(propName,attr[propName].replace('}}', '').replace('{{', ''))
                        renderLater = true;
                    }
                    // if (propName.toLowerCase().indexOf('width') > -1) {
                        ['t', 'm', 'l', 'p'].forEach(function(p) {
                            prefixedProp = p + propName.charAt(0).toUpperCase() + propName.substring(1);
                            if (prefixedProp in attr && _browser.size.mobile) {
                                if (propName !== prefixedProp) {

                                    ignoreCompile=true;
                                } else {

                                    unPrefix = true;
                                }
                            }
                        })

                    if (propName === 'mWidth' && 'width' in attr) {
                        if (_browser.size.mobile) {
                            element.css('width', attr.mWidth);
                            return;
                        } else  if (_browser.size.desktop){
                            return;
                        }
                    }

                    if (propName === 'mHeight' && 'height' in attr) {
                        if (_browser.size.mobile) {
                            element.css('height', attr.mHeight);
                            return;
                        } else  if (_browser.size.desktop){
                            return;
                        }
                    }

                    if (!(propNameRender in CompService.css.render)) {
                        propNameRender = 'general'
                    }

                    var options = {
                        propName: propName,
                        attr: attr
                        // scope: scope
                    }
                    if (ignoreCompile && _browser.size.desktop) return;
                    if (element[0] && element[0].nodeType === 1 && !renderLater) {

                        // if (propName === 'mWidth') {
                        //     console.log('yo', propNameRender, propName)
                        // }
                        CompService.css.render[propNameRender](element, attr[propName], options);

                    }

                    return {
                        pre: function preLink(scope, pre_elem, pre_attr) {

                            if (propName in pre_attr) {
                                if (pre_attr[propName].split('.').length > 1) {
                                    return;
                                }
                            }
                            // if (!scope.html || !scope.html.length || scope.html.indexOf('>') === -1) return;
                            // var e = $compile(scope.html)(scope)

                            // pre_elem.replaceWith(angular.element(e));
                            // pre_attr.compile && transclude(scope, function(clone, innerScope) {

                            // })
                        }
                    }
                    // {
                    //     pre: function preLink(scope, pre_element, pre_attr) {

                    //         var isVarSplitStr = attr[propName].split('.');
                    //         if (isVarSplitStr.length > 1) {

                    //             attr[propName] = $parse(attr[propName])(scope);
                    //             CompService.css.render[propNameRender](pre_element, value, options);
                    //         } else {
                    //             var cancelWatcher = scope.$watch(attr[propName], function(value) {

                    //                 if (value && value.split('.').length < isVarSplitStr.length) {
                    //                     console.log(pre_attr[propName], propNameRender)
                    //                     var options = {
                    //                         propName: propName,
                    //                         attr: pre_attr
                    //                     }
                    //                     CompService.css.render[propNameRender](pre_element, value, options);
                    //                 }
                    //                 cancelWatcher();
                    //             })
                    //         }
                    //     }
                    // }
                }
              }
            }])
        })
    }
