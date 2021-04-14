angular.module('uguru.admin')
.directive("timelineTool", ['$timeout', 'RootService', 'TimelineService', function($timeout, RootService, TimelineService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/timeline.player.tpl',
        restrict: 'E',
        scope: {animations:'=animations', options: '=options'},
        replace: true,
        terminal: true,
        link: function(scope, element, attr) {
            element.ready(function() {
                scope.animations = scope.animations.filter(function(a, i) {return a.duration !== '0s'});
                // scope.animations.forEach(function(a, i) {console.log(scope.animations[i])});
                scope.animations = TimelineService.initAnimations(scope.animations);
                scope.tPlayer = {};
                scope.tPlayer.state = scope.animations.length && TimelineService.initGlobalPlayer(scope.options, scope.animations[0].env, scope.animations);
                scope.tPlayer.play = TimelineService.func.playAll(scope.tPlayer.state);
                scope.tPlayer.playOne = TimelineService.func.play;
                scope.tPlayer.pause = TimelineService.func.pauseAll(scope.tPlayer.state);
                scope.tPlayer.pauseOne = TimelineService.func.pause;
                scope.tPlayer.reset = TimelineService.func.resetAll;
                scope.tPlayer.resetOne = TimelineService.func.reset;
                scope.tPlayer.jump = TimelineService.func.jumpAll(scope.tPlayer.state);

                scope.tPlayer.state.duration = scope.animations.length && scope.animations[0].env.duration;

                // scope.$watch('tPlayer.state.jumpDirection', function(direction) {

                //     if (['reverse', 'normal'].indexOf(direction) > -1) {

                //         scope.tPlayer.jump(scope.animations, scope.tPlayer.state);
                //     }

                // })


                scope.tPlayer.state.offsetStr = "0.0";
                // scope.animations.forEach(function(a, i) {a.events.start(); a.events.end()})
                // scope.tPlayer.pause(scope.animations);
            })

        }
    }
}])
.directive('timelineInspector', ['RootService', 'TimelineService', '$timeout', '$compile', function(RootService, TimelineService, $timeout, $compile) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: TimelineService.getAnimatableTemplateFunc,
    scope: {
        template: '@template',
        speed: '@speed',
        duration: '@duration',
        play: '@play',
        pause: '@pause',
        _import: '@import'
    },
    link: {
      pre: function(scope, element, attr) {
        scope.root = scope.$parent.root;
        attr.$set('timeline-inspector', '');
        scope.timeline = {listeners: {}};
        scope.window = scope.$parent.root.window;
        scope.animations = [];
        scope.animLookupDict = {};

        var browserPrefix = RootService.getBrowserPrefix();
        scope.timeline.listeners = {
            start: TimelineService.getAnimationStartListener(scope, browserPrefix, element[0]),
            end: TimelineService.getAnimationEndListener(scope, browserPrefix, element[0])
        }

        var cb = function(element) {
            $compile(element)(scope);
            $timeout(function() {
                scope.$apply();
            })
        }

        // var startListener = scope.timeline.listeners.start();
        // var endListener = scope.timeline.listeners.end();

        scope.options = {
            play: attr.play,
            speed: attr.speed,
            template: attr.template,
            import: attr.import,
            direction: attr.direction,
            duration: attr.duration,
            delay: '0s',
            expand: attr.expand,
            tabIndex: 0
        }

        element.ready(function() {
            $timeout(function() {
                scope.animations = TimelineService.processAnimations(scope, element);
                injectAnimationWithPlayer(scope.animations, element, cb, scope.window, scope.options);
            }, 200)




        })

      }
    }
  }
}])
.directive("timelinePlayer", ['$timeout', 'RootService', 'TimelineService', function($timeout, RootService, TimelineService) {
    return {
        templateUrl:'admin/templates/components/timeline.playbar.tpl',
        restrict: 'E',
        scope: {points:'=points', state: '=state'},
        replace: true,
        terminal: true,
        link: {
            pre: function(scope, element, attr) {
                var bgElem = element.children()[1];
                var bgElemCoords = bgElem.getBoundingClientRect();
                var progressElem = element.children()[0];
                scope.state.initialTransitionSet;
                scope.state.progressElem = progressElem;


                // scope.jumpTo = TimelineService.jumpTo(scope.state, progressElem, bgElemCoords);

                // scope.$watch('state.play', function(play_status) {
                //     if (play_status === true) {
                //         if (!scope.state.initialTransitionSet) {
                //             angular.element(progressElem).css('transition', 'width ' + scope.state.duration + 'ms linear');
                //             scope.state.initialTransitionSet = true;
                //         }
                //         document.querySelector('svg rect').setAttribute('width', '100%')
                //         progressElem.setAttribute('width', '100%');
                //     } else  if (play_status === false && scope.state.initialTransitionSet){
                //         var progressElemRect = progressElem.getBoundingClientRect()
                //         var percentComplete = ((progressElemRect.width/bgElemCoords.width)).toFixed(4);

                //         progressElem.setAttribute('width', (percentComplete * 100) + '%');
                //         var durationRemaining = (scope.state.duration * (1-percentComplete));
                //         angular.element(progressElem).css('transition', 'width ' + durationRemaining + 'ms linear' );

                //     }
                // });
                // scope.$watch('state.complete', function(is_complete) {
                //     if (is_complete) {
                //         var origTransition = angular.element(progressElem).css('transition');
                //         console.log(origTransition);
                //         angular.element(progressElem).css('transition', 'width ' + '400ms linear' );
                //         progressElem.setAttribute('width','0%');
                //         is_complete = false;
                //         scope.state.scaleOffset = 10;
                //         scope.state.timer.reset(scope.state)

                //         $timeout(function() {
                //             scope.state.scaleOffset = 1;
                //             scope.state.initialTransitionSet = false;
                //             // scope.state.play = false;
                //         }, 400)
                //     }
                // })
            }
        }
    }
}])

function injectAnimationWithPlayer(animations, elem, cb, _window, options) {
        var elemCoords = elem[0].getBoundingClientRect();
        elemCoords.height = elemCoords.height/10.0;
        elemCoords.width =  elemCoords.width/10.0;
        var dx = Math.abs(elemCoords.width - _window.width);
        var dy = Math.abs(elemCoords.height - _window.height);

        div = document.createElement('div');
        div.innerHTML = '<timeline-tool animations=animations options=options></timeline-tool>'
        div.style.zIndex = 100000;

        if (dx/_window.width < 0.1) {
          div.classList.add('bottom-0', 'left-0', 'full-x', 'fixed');
          var elem = document.querySelector('ui-view');
          elem.appendChild(div);
        } else {
          div.classList.add('relative', 'animated', 'slideInUp');
          elem[0].parentNode.appendChild(div);
        }
        cb && cb(div);
    }





function getAnimationStartListener(scope, browser, element) {
      return function(cb) {

        var startAnimationEvent = browser + 'animationStart';

        if (browser && browser.length) {
          startAnimationEvent = browser + 'AnimationStart';
        }
        return element.addEventListener(startAnimationEvent, function(e) {
            scope.animations.push({
                target: e.target,
                timeStamp: e.timeStamp,
                type: e.type,
                animation: {name: e.animationName, obj: scope.getAnimationFromName(e.animationName)}
            })
            e.target.style[browser.toLowerCase() + 'AnimationPlayState'] = 'paused';

            var duration = (e.target.style[browser.toLowerCase() + 'AnimationDuration'].split('ms')[0] / 10) + 'ms';
            e.target.style[browser.toLowerCase() + 'AnimationDuration'] = duration;
            e.target.style[browser.toLowerCase() + 'AnimationPlayState'] = 'running';
            cb && cb(e);
        })
      }
    }

function getAnimationEndListener(scope, browser, element) {

    return function(cb) {
    var startAnimationEvent = 'animationEnd';
    if (browser && browser.length) {
      startAnimationEvent = browser + 'AnimationEnd';
    }
    return element.addEventListener(startAnimationEvent, function(e) {
        cb && cb();

        if (browser) {
          console.log('pausing');
          e.target.style[browser + 'AnimationPlayState'] = 'paused';
        } else {
          e.target.style['animationPlayState'] = 'paused';
        }
        e.target.style.offsetWidth = e.target.style.offsetWidth;
        console.log('animation ending', e.target);
       })
    }
}