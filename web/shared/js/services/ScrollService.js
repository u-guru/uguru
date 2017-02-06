angular
.module('uguru.shared.services')
.factory("ScrollService", [
    '$timeout',
  ScrollService
    ]);

function ScrollService($timeout) {
    var scrollElems = {};
    var scroll = {main: {element: window, showStatus:false}, contained:{}};
    var rootScrollDiv = document.body;

    return {
        initScrollable: initScrollSubscriber,
        initScrollContainer: initScrollContainer,
        showStatus: showStatus,
        scroll: scroll,
        linkScrollStateToContainer: linkScrollStateToContainer,
        getScrollFunction: getAnchorScrollFunction,
        scrollToY:scrollToY,
        detectScrollWhenState: detectScrollWhenState,
        insertElementActionsIntoContainer: insertElementActionsIntoContainer,
        getPositiveScrollActions: getPositiveScrollActions,
        getNegativeScrollActions: getNegativeScrollActions
    }

    function insertElementActionsIntoContainer(scroll_obj, element_info, callback)  {

        var containerObj = {name: scroll_obj.name, percent: null, direction: null, axis: scroll_obj.axis};
        if (!(scroll_obj.name.toLowerCase() in scroll.contained)) {
            $timeout(function() {
                insertElementActionsIntoContainer(scroll_obj, element_info)
            }, 1000)
            return;
        }
        var container = scroll.contained[scroll_obj.name];
        if (!container.posDict) {
            container.posDict = {};
        }
        if (!container.postDictQueue) {
            container.postDictQueue = [];
        }


        if ('actions' in element_info) {
            for (action_type in element_info.actions) {
                var action_value = element_info.actions[action_type]
                if (action_type === 'prop') {
                    for (prop_name in action_value.delays.internal) {
                        if ('delay' in action_value.delays.internal[prop_name]) {
                            var internalProp = action_value.delays.internal[prop_name];
                            var posDictPercents = internalProp['delay'];
                            // action_value.delays.internal[prop_name] = {};
                            // console.log('yo', internalProp)
                            // for (key in action_value) {
                            //     if (key !== 'delays') {
                            //         // console.log('before', action_value[key]);

                            //         var actionKeySplit = action_value[key].split(':')
                            //         var poppedPercent = actionKeySplit.pop(2);
                            //         if (poppedPercent.indexOf(']') > -1) {
                            //             actionKeySplit[2] += ']';
                            //         }
                            //         action_value[key] = actionKeySplit.join(":");
                            //     }
                            // }

                            posDictPercents.forEach(function(percent) {
                                var percentStr = percent + '';
                                if (!(percent + '' in container.posDict)) {
                                    container.posDict[percentStr] = {
                                        x: {pos: {}, neg: {}},
                                        y: {pos: {}, neg: {}}
                                    }
                                }

                                    for (axis in scroll_obj.axis) {
                                        if (scroll_obj.axis[axis]) {
                                            if (element_info.element) {

                                                container.postDictQueue.push({
                                                        elem_info: element_info,
                                                        element: element_info.element,
                                                        scrollInfo: {container: scroll_obj.name, percent: percent, pos:internalProp.pos || !internalProp.neg, neg: internalProp.neg, axis: axis},
                                                })

                                            }

                                        }
                                    }
                                    // container.posDict[percentStr]
                                // }
                                if (action_value.delays.internal[prop_name].neg) {
                                    for (axis in scroll_obj.axis) {
                                        if (scroll_obj.axis[axis]) {
                                            if (element_info.element) {
                                                container.postDictQueue.push({
                                                        elem_info: element_info,
                                                        element: element_info.element,
                                                        scrollInfo: {container: scroll_obj.name, percent: percent, pos:internalProp.pos || !internalProp.neg, neg: internalProp.neg, axis: axis},
                                                })
                                            }
                                            // container.postDict[percentStr].pos[axis];

                                        }
                                    }
                                }
                                // element.scope(), element, actions||updatedActions, attr, context
                                // console.log(percent, element_info.element, element_info.scope)
                            })

                        }

                    }

                }

            }
        }
        if (container.postDictQueue.length) {
            element_info.actions.scroll = true;
        }

        // function extract
    }



    function detectScrollWhenState(name) {
        var result = {
            name: '',
            type: 'changes',
            axis:
                {
                    x: {pos:true, neg: true},
                    y: {pos: true, neg:true}
            }
        }
        var nameSplit = name.replace('scroll-', '').replace('changes-', '').split('-');

        if (nameSplit.length >= 1) {
            result.name = nameSplit[0].toLowerCase();
        }

        if (nameSplit.length >= 1) {
            var axis = nameSplit[1];
            if (axis.length === 1 && axis === 'x') {
                result.axis.y = false;
            }
            if (axis.length === 1 && axis === 'y') {
                result.axis.x = false;
            }
        }
        if (nameSplit.length >=2) {
            var direction = nameSplit[2];
            if (direction === 'pos') {
                result.axis[nameSplit[1]].neg = false;
            }
            if (direction === 'neg') {
                result.axis[nameSplit[1]].pos = false;
            }
        }
        return result
    }

    function linkScrollStateToContainer(name, element, stream, args_arr) {

        if (!(name in scroll.contained))  return;
        var result = {};
        for (var i = 0; i < args_arr.length; i++) {
            if (args_arr[i] === 'x') {
                result.scrollX = true;
            } else if (args_arr[i] === 'xy') {
                result.scrollY = true;
                result.scrollX = true;
            } else if (result.scrollY === 'y') {
                result.scrollY = true;
            }
        }
        result.element = element;
        result.props = {};

        stream.stream.events.forEach(function(ev) {

            var currentIndex = Math.ceil(parseFloat(ev.offset/ev.duration)*ev.values.length);
            var currentValue = ev.values[currentIndex];
            result.props[ev.name] = {pointer: 0, min:ev.values[0], max:ev.values[ev.values.length - 2], values: ev.values, current: ''};
        });
        result.lineHeight = toPX('ex', 0);
        var dupExists = false;
        if (scroll.contained[name].info.element) {
            if (scroll.contained[name].info.elements.length) {
                scroll.contained[name].info.elements.forEach(function(elem_result) {
                        if (elem_result.element[0] === result.element[0] && scroll.contained[name].elements.length) {
                            dupExists = true;
                        }
                })
            } else {
                scroll.contained[name].info.elements.push(result);
            }
        }
        // scroll.contained[name].info.elements.forEach(function(elem_result, i) {


        // })
        // if (!dupExists) {
        //     scroll.contained[name].elements.push(result);
        // }


        // element, stream, name.slice(1));
    }




    function showStatus(bool) {
        scroll.main.element.showStatus = bool;

    }


  function initScrollSubscriber(element, no_scroll_x, no_scroll_y) {
    // if (!scroll.main.listener) {
    //     scroll.main.listener = initScrollListener(scroll.main.element, callback, false);

    // }
    // scroll.contained.elements.push(initElementForScroll(element), no_scroll_x, no_scroll_y);
  }

  function initScrollContainer(element, attr) {
    if (!scroll.main.listener) {
        scroll.main.listener = initScrollListener();
    }
    var container = {elements:[], info:{}};
    if (attr.scrollable && attr.scrollable.length) {
        var scrollSplit = attr.scrollable.split('|');
        if (scrollSplit.length > 1) {
            container.name = scrollSplit[0];
            container.info.scrollY = false;
            container.info.scrollX = false;

            //x existence

            if (scrollSplit[1].indexOf('x') > -1) {
                container.info.scrollX = true;
            }

            //y existence
            if (scrollSplit[1].indexOf('y') > -1) {
                container.info.scrollY = true;
            }
        }

    }

    var containerName = container.name;
    // console.log(containerName)
    delete container['name'];
    scroll.contained[containerName] = {};
    scroll.contained[containerName].info = {
        element: element,
        elements: [],
        height: null,
        width: null,
        scrollY: container.info.scrollY,
        scrollX: container.info.scrollX
    };



    element.css('transition', 'transform 16ms linear')
    element.ready(function() {

        // var rect = element.parent().children()[0].getBoundingClientRect();
        // console.log(rect, element.parent().children(), element[0].scrollTop)
        // scroll.contained[containerName].info = {
        //     height: rect.height,
        //     width: rect.width,
        //     element: element[0]
        // }

    })
    return containerName



  }

  function initElementForScroll(elem, no_scroll_x, no_scroll_y) {
    var result = {lock: {x: no_scroll_x || false, y: no_scroll_y || false}};

    result.lineHeight = toPX('ex', elem[0]);
    return result
  }

  // function parseScrollLimitFromAttr(attr) {
  //   for (key in attr.$attr) {
  //       console.log(key)
  //   }
  // }

  function initScrollListener() {
    var lineheight = toPX('ex', scroll.main.element);




        return scroll.main.element.addEventListener('wheel', function(ev) {




            var dx = ev.deltaX || 0;
            var dy = ev.deltaY || 0;
            var dz = ev.deltaZ || 0;
            var mode = ev.deltaMode;



            if(dx || dy || dz) {
                var coords = {x: dx, y:dy, z:dz};
                renderElementsWithinContainers(scroll.contained, ev,coords, lineheight);
            }

            // if (noScroll) {
            //     ev.preventDefault()
            // } else {
                // processScrollEvent(elem, scroll)
            // }
            // return elem;
        })

    }

    function getScrollParentContainer(s_target, destination) {
        var scrollTop = s_target.scrollTop;
        if (scrollTop > 0 || s_target === document.body) {
            return s_target
        }
        else {
            var scrollTop = getScrollParentContainer(s_target.parentNode);
            return scrollTop;
        }

        // if (s_target.outerHTML === destination.outerHTML) {

        //     return s_target.scrollTop;
        // } else {
        //     return getScrollParentContainer(s_target.parentNode, destination)
        // }
    }

    function getNegativeScrollActions(actions, specialPropFunc) {
        var result = {};
        for (prop in actions) {
          var isProp = typeof actions[prop] === "object" && prop !== 'scroll';
          if (isProp) {
            var argType = prop;

            var argActionValue = actions[argType];
            if ('parsed' in argActionValue) {

              var pValSplit = specialPropFunc(argActionValue.parsed).split(',');
              var parsedValues = pValSplit.filter(function(s_value, index) {

                if (s_value.split(':').length > 2) {
                  var secondValue = s_value.split(':')[2]
                  if (parseInt(secondValue) < 0) {
                    return true;
                  }
                  return;
                }
              });

              var posActions = angular.copy(actions[argType]);

              parsedValues.forEach(function(p_val, index) {
                if (p_val.indexOf('|') > -1) {
                  p_val = p_val.split('|').join(",")
                }
                parsedValues[index] = p_val.split(':').slice(0,2).join(":");
              })
              posActions.parsed = parsedValues.join(",");
              // console.log('positive only\nbefore:', pValSplit.join(",") + '\n', "after:" + posActions.parsed, '\n')

              result[argType] = posActions;
            }
          }
        }
        return result
    }

    function getPositiveScrollActions(actions, specialPropFunc) {
        var result = {};
        for (prop in actions) {
          var isProp = typeof actions[prop] === "object" && prop !== 'scroll';
          if (isProp) {
            var argType = prop;

            var argActionValue = actions[argType];
            if ('parsed' in argActionValue) {

              var pValSplit = specialPropFunc(argActionValue.parsed).split(',');
              var parsedValues = pValSplit.filter(function(s_value, index) {

                if (s_value.split(':').length > 2) {
                  var secondValue = s_value.split(':')[2]
                  if (parseInt(secondValue) < 0) {
                    return;
                  }
                  return true;
                }
                return;
              });

              var posActions = angular.copy(actions[argType]);

              parsedValues.forEach(function(p_val, index) {
                if (p_val.indexOf('|') > -1) {
                  p_val = p_val.split('|').join(",")
                }
                parsedValues[index] = p_val.split(':').slice(0,2).join(":");
              })
              posActions.parsed = parsedValues.join(",");
              // console.log('positive only\nbefore:', pValSplit.join(",") + '\n', "after:" + posActions.parsed, '\n')

              result[argType] = posActions;
            }
          }
        }
        return result
    }

    function calculateScrollContainerPosition(element, pos_info) {

        if (!('pos' in pos_info )) {
            pos_info.pos = {x: {percent: 0, px: 0}, y:{percent: 0, px: 0}};
        }
        // console.log(pos_info.pos.y)
        var result = {x: {}, y:{}};
        result.x = {width: element.scrollWidth, left: element.scrollLeft};
        result.y = {height: element.scrollHeight, top: element.scrollTop};
        if (result.x.width > 0 && result.x.left) {
            var parentWidth = pos_info.rect.width;

            var xPercent = Math.floor(result.x.left/(result.x.width - pos_info.rect.width) * 100)
            if (xPercent) {

                result.x.percent = xPercent;
                result.x.px = result.x.top;
                result.x.delta = {};
                result.x.delta.px = result.x.px - pos_info.pos.x.px;
                result.x.delta.percent = result.x.percent - pos_info.pos.x.percent;

            }
        }
        if (result.y.height > 0){
            var yPercent = Math.floor(result.y.top/(result.y.height-result.y.top) * 100)
            if (yPercent) {
                result.y.percent = yPercent;
                result.y.px = result.y.top;
                result.y.delta = {};

                result.y.delta.px = result.y.px - pos_info.pos.y.px;
                result.y.delta.percent = result.y.percent - pos_info.pos.y.percent;
            }

        }
        return result
    }

    function renderElementsWithinContainers(contained, ev, coords, lh) {
        // ev.preventDefault()
        var _scroll = {}
        //compare (ev, and .ev.last)
        if (!_scroll.ev) {
            _scroll.ev = {};
        }



        _scroll.ev.last = ev;
        _scroll.mouse = {vp:{x:_scroll.ev.last.clientX, y:_scroll.ev.last.clientY}}
        var filteredContained = {};
        if (!coords.y || !coords.x) {
            for (key in contained) {
                if (!coords.y && 'info' in contained[key] && !contained[key].info.scrollX) {
                    continue;
                }
                if (!coords.x && 'info' in contained[key] && !contained[key].info.scrollY) {
                    continue;
                }
                filteredContained[key] = contained[key];
            }
        } else {
            filteredContained = contained;
        }
        for (scroll_container_name in filteredContained) {
            var container = contained[scroll_container_name];

            var params = {
                top: container.info.top,
                height: container.info.scrollHeight,
                position: calculateScrollContainerPosition(container.info.element[0], container.info),
            }

            // var percentDeltas = [params.position.y.delta, params.position.x.delta];
            if (params.position.y.delta && params.position.y.delta.percent) {
                var isDownwards = (params.position.y.delta.percent > 0)
                params.position.y.direction = {neg: !isDownwards, pos: isDownwards};
                var percentStr = params.position.y.percent;
                var start = Math.min(params.position.y.percent, params.position.y.percent + params.position.y.delta.percent);
                var end = Math.max(params.position.y.percent, params.position.y.percent + params.position.y.delta.percent)
                if (Math.abs(coords.y) > 20)  {
                    start = Math.max(1, Math.floor(start*0.5));
                    end = Math.min(100, Math.floor(end/0.5));
                }
                for (i = start; i <= end; i++) {
                    if (i in container.posDict && container.posDict[i].y) {
                        console.log(container.posDict[i].y.pos)
                        if (params.position.y.direction.pos && 'pos' in container.posDict[i].y &&
                            'functions' in container.posDict[i].y.pos) {

                            var functions = container.posDict[i].y.pos.functions;
                            functions.forEach(function(func_info) {
                                var i = func_info
                                var func = i.function;
                                console.log(func_info)
                                // func(i.scope, i.element, i.actions);
                                func(i.scope, i.element, i.actions, i.attr, i.context)

                            })
                        }
                    }
                    if (i in container.posDict && container.posDict[i].y) {

                        if (params.position.y.direction.neg && 'neg' in container.posDict[i].y &&
                            'functions' in container.posDict[i].y.neg) {
                            var functions = container.posDict[i].y.neg.functions;
                            functions.forEach(function(func_info) {
                                var i = func_info
                                var func = i.function;
                                // func(i.scope, i.element, i.actions);
                                func(i.scope, i.element, i.actions, i.attr, i.context)

                            })
                        }
                    }
                }
                // if (percentStr in container.posDict) {
                //     console.log(;
                // }
            }
            container.info.pos = params.position;

            // START: ARCHIVE
            // params.percent = parseInt(params.position/params.height * 100);

            // _scroll.height = contained[scroll_container_name].info.scrollHeight;

            // var yPos = contained[scroll_container_name].info.posY + coords.y/2;
            // _scroll.container = scroll_container_name;
            // var scrollPercent = yPos/_scroll.height;

            // if (scrollPercent > 1 || scrollPercent < 0) {
            //     if (scrollPercent > 1) {
            //         contained[scroll_container_name].info.posY = contained[scroll_container_name].info.scrollHeight;
            //         scrollPercent = 1;
            //     } else {
            //         contained[scroll_container_name].info.posY = 0;
            //         scrollPercent = 0;
            //     }
            // } else {
            //     contained[scroll_container_name].info.posY += coords.y/2;
            // }

            // if (scrollPercent >= 0 && scrollPercent <= 1) {
            //     _scroll.top = {element: getScrollParentContainer(ev.target, contained[scroll_container_name].info.element)}

            //     _scroll.top.element = {scrollTop: _scroll.top.element.scrollTop, rect: _scroll.top.element.getBoundingClientRect(_scroll.top.element)};
            //     _scroll.top.element.top = _scroll.top.element.rect.top;
            //     _scroll.top.element.height = _scroll.top.element.rect.height;

            //     _scroll.top.percent = (_scroll.top.element.top + _scroll.top.element.scrollTop)/_scroll.height;
            //     // _scroll.top.container = _scroll.top.from/_scroll.height * 100;

            //     _scroll.abs = {percent: (_scroll.top.element.height + _scroll.top.element.scrollTop)/contained[scroll_container_name].info.scrollHeight};
            //     // console.log('abs: %', _scroll.abs.percent*100, '\nmy mouse is X:'+_scroll.mouse.vp.x, 'Y:'+_scroll.mouse.vp.y )
            // }
            // console.log(_scroll.abs.percent)

            // var details = contained[scroll_container_name].info;
            // var elements = scroll.contained[scroll_container_name].info.elements;

            // if (coords.y && details.scrollY && elements.length) {

            //     // for (var i = 0; i < elements.length; i++) {


            //         elements.forEach(function(elem) {

            //             var element = elem.element;

            //             var props = elem.props;

            //             for (prop in props) {
            //                 // for (prop in props) {
            //                     var propInfo = props[prop];
            //                     var propValues = props[prop].values;
            //                     // console.log(propValues.length, scrollContainerTop, contained[scroll_container_name].info.scrollHeight)
            //                     // var nxtPointer = propInfo.pointer + Math.abs(coords.y)/coords.y;
            //                     // // console.log(propInfo.pointer, '=>', nxtPointer);
            //                     // if (nxtPointer < (propValues.length-1) && nxtPointer > -1) {
            //                     //     propInfo.pointer = nxtPointer;
            //                     //     var value = propValues[nxtPointer];
            //                     //     if (!elem.transitions) {
            //                     //         elem.transitions = [];
            //                     //     }
            //                     //     if (elem.transitions.indexOf(prop) === -1) {
            //                     //         elem.transitions.push(prop);
            //                     //         var transitionProps = elem.transitions.join(" ")
            //                     //         // console.log(transitionProps);
            //                     //         elem.css('transition', transitionProps + ' 16ms' + ' ease');
            //                     //     }
            //                     //     console.log(prop, value, element)
            //                     //     elem.element.css(prop, value);
            //                     // }


            //                 // }

            //             }
            //         })


                // }
            // }
            // if (coords.x && details.scrollX) {
            //     for (var i = 0; i < scroll.contained[scroll_container_name].elements.length; i++) {
            //         if ('elements' in scroll.contained[scroll_container_name]) {
            //             var elements = scroll.contained[scroll_container_name].elements;
            //             elements.forEach(function(elem) {
            //                 var element = elem.element;
            //                 var props = elem.props;
            //                 // console.log(props)
            //                 for (prop in props) {
            //                     var propInfo = props[prop];
            //                     var propValues = props[prop].values;



            //                 }
            //             })
            //         }

            //     }
            //     // console.log(coords.x, ev.target, );
            // }
            //END: ARCHIVE
        }
    }

    function calcRespectiveScale(ev, line_height, coords) {
        var scale = 1;
        switch(ev.deltaMode) {
            case 1:
                scale = lineHeight;
                break;
            case 2:
                scale = window.innerHeight;
                break;
        }
        coords.x *= scale;
        coords.y *= scale;
        // dz *= scale;
        // return dx, dy, dz;
    }


    function parseUnit(str, out) {
        if (!out)
        out = [ 0, '' ]

        str = String(str)
        var num = parseFloat(str, 10)
        out[0] = num
        out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
        return out
    }


    var PIXELS_PER_INCH = 96

    function getPropertyInPX(element, prop) {
        var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))
        return parts[0] * toPX(parts[1], element)
    }

    //This brutal hack is needed
    function getSizeBrutal(unit, element) {
        var testDIV = document.createElement('div')
        testDIV.style['font-size'] = '128' + unit
        element.appendChild(testDIV)
        var size = getPropertyInPX(testDIV, 'font-size') / 128
        element.removeChild(testDIV)
        return size
    }

    function toPX(str, element) {
        element = element || document.body
        str = (str || 'px').trim().toLowerCase()
        if(element === window || element === document) {
           element = document.body
        }
        switch(str) {
            case '%':  //Ambiguous, not sure if we should use width or height
        return element.clientHeight / 100.0
            case 'ch':
            case 'ex':
        return getSizeBrutal(str, element)
            case 'em':
        return getPropertyInPX(element, 'font-size')
            case 'rem':
        return getPropertyInPX(document.body, 'font-size')
            case 'vw':
        return window.innerWidth/100
            case 'vh':
        return window.innerHeight/100
            case 'vmin':
        return Math.min(window.innerWidth, window.innerHeight) / 100
            case 'vmax':
        return Math.max(window.innerWidth, window.innerHeight) / 100
            case 'in':
        return PIXELS_PER_INCH
            case 'cm':
        return PIXELS_PER_INCH / 2.54
            case 'mm':
        return PIXELS_PER_INCH / 25.4
            case 'pt':
        return PIXELS_PER_INCH / 72
            case 'pc':
        return PIXELS_PER_INCH / 6
        }
        return 1
    }


    function getAnchorScrollFunction(scroll_parent, target_id) {
        if (target_id === '#') return;
        var elem = document.querySelector(target_id);
        if (!elem) return
        var elemToTop = elem.getBoundingClientRect().top;
        return function(updated_parent) {
            console.log(updated_parent, scroll_parent, elemToTop)
          scrollToY(updated_parent || scroll_parent, elemToTop, 500, 'easeOutSine');
        }
    }

      // main function
    function scrollToY(scrollParent, scrollTargetY, speed, easing) {
          // scrollTargetY: the target scrollY property of the window
          // speed: time in pixels per second
          // easing: easing equation to use
          // scrollParent = scrollParent.parent().children()[0];
          // var scrollTop = scrollParent.scrollTop;
          // for (container_name in scroll.contained) {
          //   scrollTop = scroll.contained[container_name].info.element[0].scrollTop
          //   scrollParent = scroll.contained[container_name].info.element[0];
          // }
          var scrollY = scrollParent.scrollTop || document.documentElement.scrollTop,
              scrollTargetY = scrollTargetY || 0,
              speed = speed || 2000,
              easing = easing || 'easeOutSine',
              currentTime = 0;
              console.log(scrollY, scrollTargetY, easing, currentTime)
          // min time .1, max time .8 seconds
          var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

          // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
          var easingEquations = {
                  easeOutSine: function (pos) {
                      return Math.sin(pos * (Math.PI / 2));
                  },
                  easeInOutSine: function (pos) {
                      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                  },
                  easeInOutQuint: function (pos) {
                      if ((pos /= 0.5) < 1) {
                          return 0.5 * Math.pow(pos, 5);
                      }
                      return 0.5 * (Math.pow((pos - 2), 5) + 2);
                  }
              };
          var animationFrame = new AnimationFrame();
          // add animation loop
          function tick() {
              currentTime += 1 / 60;
              console.log('ticking', currentTime, time, scrollParent.scrollTop)
              var p = currentTime / time;
              var t = easingEquations[easing](p);

              if (p < 1) {

                  animationFrame.request(tick);

                  scrollParent.scrollTop = scrollY + ((scrollTargetY - scrollY) * t);
              } else {
                  console.log('scroll done');
                  // scrollParent.scrollTop(0, scrollTargetY);
              }
          }

          // call it once to get started
          tick();
      }



    function callback(ev, elem, dx, dy, dz) {



        elem.css('transform', 'translateY(' + dy + 'px)');
        console.log(elem.parent(), dx, dy +'px', dz)
        // totalX -= dx
        // totalY -= dy
        // elem.style.left = totalX + 'px'
        // elem.style.top = totalY + 'px'
        // infoLog.innerHTML =
        // '<p>Scroll:' + dx + ',' + dy + ' - ' + totalX + ',' + totalY + '</p>'
    }
}
