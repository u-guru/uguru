angular.module('uguru.admin')
.directive("timelineTool", ['$timeout', 'RootService', 'TimelineService', function($timeout, RootService, TimelineService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/timeline.player.tpl',
        restrict: 'E',
        scope: {animations:'=animations', options: '=options'},
        replace: true,
        terminal: true,
        link: function(scope, element, attr) {
            scope.tPlayer = {};
            scope.tPlayer.state = TimelineService.initGlobalPlayer(scope.options, scope.animations[0].env);
            scope.tPlayer.play = TimelineService.func.playAll(scope.tPlayer.state);
            scope.tPlayer.playOne = TimelineService.func.play;
            scope.tPlayer.pause = TimelineService.func.pauseAll(scope.tPlayer.state);
            scope.tPlayer.pauseOne = TimelineService.func.pause;
            scope.tPlayer.reset = TimelineService.func.resetAll;
            scope.tPlayer.resetOne = TimelineService.func.reset;

            scope.$watchCollection('tPlayer', function(player) {
                console.log(player)
            })

            if (!scope.tPlayer.state.play) {
                scope.tPlayer.pause(scope.animations);
            }

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
            duration: attr.duration
        }
        element.ready(function() {
            scope.animations = TimelineService.processAnimations(scope, element);
            injectAnimationWithPlayer(scope.animations, element, cb, scope.window, scope.options);
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
                var initialTransitionSet;
                element.ready(function() {
                    console.log(scope.state, element[0]);
                })

                scope.$watch('state.speed', function() {

                })

                scope.$watch('state.play', function(play_status) {
                    if (play_status) {
                        if (!initialTransitionSet) {
                            angular.element(progressElem).css('transition', 'width ' + scope.state.duration + 'ms linear');
                            initialTransitionSet = true;
                        }
                        document.querySelector('svg rect').setAttribute('width', '100%')
                        progressElem.setAttribute('width', '100%');
                    } else {
                        var progressElemRect = progressElem.getBoundingClientRect()
                        var percentComplete = ((progressElemRect.width/bgElemCoords.width)).toFixed(4);

                        progressElem.setAttribute('width', (percentComplete * 100) + '%');
                        var durationRemaining = (scope.state.duration * (1-percentComplete));
                        console.log(durationRemaining);
                        angular.element(progressElem).css('transition', 'width ' + durationRemaining + 'ms linear' );


                        // console.log(progress.style.transition);
                        // angular.element(progressElem).css('transition', 'width ' + scope.state.duration + ' ease');
                        // document.querySelector('svg rect').setAttribute('width', '100%')
                        // progressElem.setAttribute('width', '100%');
                    }
                    console.log('play clicked', scope.state, play_status)
                })
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