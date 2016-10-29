angular.module('uguru.shared.directives.base.components', []);
angular.module('uguru.shared.directives.base.components')
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
    .directive('keypressEvents', [
      '$document',
      '$rootScope',
      function($document, $rootScope) {
        return {
          restrict: 'A',
          link: function() {
            $document.bind('keydown', function(e) {

              $rootScope.$broadcast('keydown', e);
              $rootScope.$broadcast('keydown:' + e.which || e.keyCode, e);
            });
            $document.bind('keyup', function(e) {

              $rootScope.$broadcast('keyup', e);
              $rootScope.$broadcast('keyup:' + e.which || e.keyCode, e);
            });
          }
        };
      }
    ])
    .directive("uInput", ["CompService", "$compile", '$timeout', function(CompService, $compile, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: true,
            templateUrl:CompService.getCompTemplateType('input'),
            compile: function(element, attr, transclude) {
                var input = {
                    placeholder: attr.placeHolder || 'this is a placeholder',
                    type: attr.iType,
                    text: attr.text,
                    element: null,
                    ghost: null
                };
                return {
                    pre:
                    function (scope, lElem, lAttr) {

                        scope.input = input;
                        scope.input.func = {
                            onKeyPress: onKeyPress(scope),
                            focusAndSelectText: focusInvisibleInput(scope),
                            addKeyListener: onKeyPress(scope)
                        }


                         transclude(scope, function(clone, innerScope) {


                            lElem.html(clone.html());
                            $compile(lElem)(scope);

                        })

                         $timeout(function() {
                            scope.input.element = lElem.find('input');
                            scope.input.ghost = lElem[0].querySelector('#ghost-input-container');
                            if (scope.input.ghost) {
                                scope.input.ghost = angular.element(scope.input.ghost);
                            }
                            scope.input.ghost.innerHTML = '';
                         })


                    },
                    post: angular.noop
                }
            }
        }
        function focusInvisibleInput(scope) {
            return function(input, $event) {
                // angular.element(input.element[0]).triggerHandler('focus');
                scope.input.element.triggerHandler('click').triggerHandler('select')


                // scope.input.element[0].focus();

            }

        }
        function onKeyPress(scope) {
            return function(input, text, $event) {
                scope.input.element.triggerHandler('click').triggerHandler('select')

                input.element.on('keydown', function($event) {
                    var newLetters = angular.element('<letter keep type="squishBounce">' + $event.key + '</letter>');
                    scope.input.ghost.append(newLetters)
                    $compile(newLetters)(scope);

                })
                if (!scope.input.element && $event.target.nodeName.toLowerCase() === 'label') {
                    scope.input.element = $event.target;
                }

            }
        }
    }])
    .directive('types', ['$compile', '$stateParams', "$timeout", function($compile, $stateParams, $timeout) {
        return {
            scope: false,
            link: {pre: function(scope, element, attr) {
                scope.types = attr.types.split(', ');
                scope.activeType = $stateParams.type;

                var d = angular.element('<div></div>')
                d.attr('ng-include', '"admin/templates/types.tpl"');
                element.parent().append(d);
                $compile(d)(scope)
                scope.activateType = function($event, type) {
                    $timeout(function() {
                      scope.activeType = type;
                      scope.$apply();
                      $compile(d)(scope)
                      // $compile(angular.element(elem))($scope);
                    })
                }
                // console.log(element)
            }}
        }
    }])
    .directive('uChart', ['$compile', function($compile) {
// http://stackoverflow.com/questions/24615103/angular-directives-when-and-how-to-use-compile-controller-pre-link-and-post
    return {
            restrict: 'E',
            replace:true,
            transclude: true,
            templateUrl: 'shared/templates/components/base/grid/state.chart.tpl',
            controller: 'AdminChartController',
            controllerAs:'chart',
            compile: function compile( element, attr ) {

                if (!attr.src) attr.src = 'shared:components.svg.logo.guru-head.html'

                return {
                    pre: function preLink( scope, element, attributes ) {

                        element.append(scope.chart.element)
                        $compile(element)(scope)
                        element.replaceWith(scope.chart.element.children().children().contents())
                        // $compile(element)(scope)


                        console.log( attributes.log + ' (pre-link)'  );
                    },
                    post: function postLink( scope, element, attributes ) {
                        $compile(element)(scope)
                        // var animObj = scope.renderAnimationStr(element.find('svg'), null, attr.state, scope.chart.context);
                        // scope.chart.player = animObj.player;
                        console.log( attributes.log + ' (post-link)'  );
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
    .directive('item', ['StyleService', '$compile', function (StyleService, $compile) {
      return {
        restrict: 'AE',
        templateUrl: 'shared/templates/components/base/svg/item.svg.tpl',
        compile: function(elem, attr) {
          elem.css(StyleService.css.flexItem);
          ('height' in attr) && attr.$set('height', attr.height);
        },
        replace: true,
        transclude: true,
        priority:1
      };
    }])
    angular.module('uguru.shared.directives.base.components')
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
    .directive("data", ["$compile", 'XHRService', function($compile, XHRService) {
        return {
            restrict: 'A',
            replace: true,
            compile: function(lElem, lAttr) {
                return {
                    pre: function(scope, elem, attr) {
                        var dataSets = ['api'];
                        var callback = function(data) {scope.$parent[attr.data] = data; console.log(data); $compile(elem.contents())(scope)};
                        XHRService.getJSONFile('get', 'admin/spec/' + attr.data + '.json', callback);

                    },
                    post: angular.noop
                }
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
    .directive("gridItem", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            transclude:true,
            priority: 100,
            template: '<div class="flex"></div>',
            compile: function(element, attr, transclude) {
                CompService.renderAllStyleAttributes(element, attr);

                attr.spacing && attr.spacing === 'center' && element.addClass('flex-center')
                if (attr.width) {
                    if (attr.width.indexOf('%') === -1 && attr.width.indexOf('px') === -1) {
                        element.css('width', attr.width + '%')
                    } else {
                        element.css('width', attr.width)
                    }
                }
                if (attr.height) {
                    if (attr.height.indexOf('%') === -1 && attr.height.indexOf('px') === -1) {
                        element.css('height', attr.height + '%')
                    } else {
                        element.css('height', attr.height)
                    }
                }
                if (attr.type && attr.type === 'row') {
                    element.addClass('flex-wrap-center', 'flex-wrap')
                }
                return {
                    pre: function preLink(lScope, lElem, lAttr, transcludeFn) {

                            transclude(lScope, function(clone, innerScope) {
                                lElem.append(clone)
                            })
                    }
                }
            }
        }
    }])
    .directive("gridView", ["CompService", "$compile", function(CompService, $compile) {
        return {
            restrict: 'E',
            replace:true,
            transclude:true,
            priority: 100,
            template: '<div class="flex absolute full-xy left-0 top-0"></div>',
            compile: function(element, attr, transclude) {
                if (attr.type && attr.type === 'column') {
                    element.addClass('flex-vertical-center')
                }
                if (attr.type && attr.type === 'row') {
                    element.addClass('flex-wrap-center', 'flexwrap')
                }
                return {
                    pre: function preLink(lScope, lElem, lAttr, transcludeFn) {

                            transclude(lScope, function(clone, innerScope) {
                                lElem.append(clone)
                            })
                    }
                }
            }
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
    .directive("uButton", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/button.tpl',
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
    .directive("uImage", ["RootService", function(RootService) {
        return {
            templateUrl: RootService.getBaseUrl() + 'shared/templates/components/base/image.tpl',
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