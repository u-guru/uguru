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
    .directive('setTrueOnLoad', ['$compile',  function($compile) {
        return {
            restrict: 'A',

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
    .directive('keypressEvents', [
      '$document',
      '$rootScope',
      function($document, $rootScope) {
        return {
          restrict: 'A',
          link: function() {
            $document.bind('keydown', function(e) {

              $rootScope.$broadcast('keydown', e);
              console.log('keydown', e.which)
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
    .directive('types', ['$compile', '$stateParams', "$timeout", function($compile, $stateParams, $timeout) {
        return {
            scope: false,
            link: {pre: function(scope, element, attr) {
                scope.types = attr.types.split(', ');
                scope.activeType = $stateParams.type || scope.types[0];

                var d = angular.element('<div></div>')
                d.attr('ng-include', '"shared/templates/types.tpl"');
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
    // .directive('ignore', ['$compile', function($compile) {
    //     return {
    //         restrict: 'A',
    //         replace:true,
    //         priority:10000,
    //         compile: function compile(element, attr)  {
    //             var elem = element.clone(true);
    //             elem.attr('ng-if', false);

    //             // console.log()
    //             // element[0].setAttribute('ng-if', "false");
    //             console.log()

    //             // element.attr('ng-if', false);
    //         },
    //         link: {pre: function(scope, _element, attr) {
    //             element.parent().contents(elem)
    //             // element.replaceWith(elem)
    //             $compile(elem)(scope)
    //             }

    //         }
    //     }
    // }])
    .directive('graphic', ['$compile', 'CompService', function($compile, CompService) {
        return {
            restrict: 'E',
            scope:false,
            replace:true,
            templateUrl: function(element, attr) {
                return attr.src || attr.url;
            },
            compile: function compile(element, attr)  {
                CompService.renderAllStyleAttributes(element, attr);
            },
            link: {
                post: function(scope, element, attr) {
                    if (scope.chart) scope.chart.elem = element;

                }
            }

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
    .directive("tabs", ["CompService", function(CompService) {
        return {
            restrict: 'E',
            scope: false,
            replace:true,
            templateUrl: function(element, attr) {

                return attr.import;
            },
            compile: function(element, attr) {
                CompService.renderAllStyleAttributes(element, attr);
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
    .directive("image", [function() {
        return {
            restrict: 'E',
            scope: false,
            replace:true,
            templateUrl: 'shared/templates/components/base/image.tpl',
            compile: function(element, attr) {
                CompService.renderAllStyleAttributes(element, attr);
                 return {
                    pre: function preLink(scope, elem, attr) {

                    },
                    post: angular.noop
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
                    console.log('has line height')
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
                return attr.src;
            },
            link: {
                pre:
                    function preLink(scope, p_element, attr) {
                       $compile(p_element)(scope)
                }
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
            scope: true,
            // transclude:true,
            // terminal:true,
            // priority: -1,
            replace:true,
            compile: function(elem, attr) {
                CompService.renderAllStyleAttributes(elem, attr);

                elem[0].style.zIndex = -1;
                elem[0].style.opacity = 0;
                elem[0].style.position = 'fixed';

                var children = elem[0].innerHTML
                CompService.initializeModalAttr(elem, attr, _window);
                return {
                    pre: function preLink(scope, p_elem, _attr) {



                        var _window = scope.root.window;
                        var windowWidth = scope.root.window.width;




                        $timeout(function() {
                            if (scope.root.mainViews && scope.root.mainViews.length) {
                                scope.root.mainViews.forEach(function(parent, i) {

                                    // p_elem.append(clone);
                                    parent.parent().append(p_elem);

                                    // $compile(p_elem)(scope)
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
    .directive("view", ["CompService", "$compile", "$rootScope", "$parse", function(CompService, $compile, $rootScope, $parse) {
        return {
            restrict: 'E',
            replace:true,
            priority: 100,
            compile: function(element, attr, transclude) {
                CompService.renderAllStyleAttributes(element, attr);
                element.addClass('flex absolute full-xy');
                if (attr.type && attr.type === 'column') {
                    element.addClass('flex-vertical-center')
                }
                if (attr.type && attr.type === 'row') {
                    element.addClass('flex flex-wrap');
                }
                // return {
                //     // pre: function preLink(lScope, lElem, lAttr, transcludeFn) {
                //     //     lScope.isView = true;
                //     //     lScope.viewType = attr.type;
                //     //         transclude(lScope, function(clone, innerScope) {
                //     //             // $compile(clone)(innerScope)
                //     //             // var cloneChildren = clone.contents()
                //     //             // console.log(clone)
                //     //             for (var i = 0; i < clone.length; i++) {
                //     //                 clone
                //     //             }
                //     //             // .forEach(function(elem, i) {
                //     //             //     console.log(elem)
                //     //             // })
                //     //             lElem.append(clone)
                //     //         })
                //     // }
                // }
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