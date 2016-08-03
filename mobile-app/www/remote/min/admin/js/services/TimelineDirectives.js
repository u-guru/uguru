angular.module('uguru.admin')
.directive("timelinePlayer", ['$timeout', 'RootService', 'TimelineService', function($timeout, RootService, TimelineService) {
    return {
        templateUrl: RootService.getBaseUrl() + 'admin/templates/components/timeline.player.tpl',
        restrict: 'E',
        scope: {animations:'=animations', options: '=options'},
        replace: true,
        terminal: true,
        link: function(scope, element, attr) {
            scope.tPlayer = {};
            scope.tPlayer.state = TimelineService.initGlobalPlayer(scope.options);
            scope.tPlayer.play = TimelineService.func.playAll;
            scope.tPlayer.playOne = TimelineService.func.play;
            scope.tPlayer.pause = TimelineService.func.pauseAll;
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

        scope.timeline = {listeners: {}};
        // scope.timelineAnimations = TimelineService.processStyleAnimations(scope._import);


        scope.window = scope.$parent.root.window;

        // scope.getAnimationFromName = AnimationService.getAnimationObjFromAnimationName;
        scope.animations = [];
        scope.animLookupDict = {};
        //if attr.template




        // for (key in anim.obj.cssRules) console.log(anim.obj.cssRules[key]);

        // anim.duration = attr.duration && parseFloat(attr.duration) || 3000;
        // anim.direction = attr.direction;
        // anim.func = attr.func.replace('cb', 'cubic-bezier');
        // anim.delay = attr.delay|| 0;
        // anim.css = anim.obj.cssText;
        // anim.playState = (((attr.play === 'true') && "running") || "paused");
        // anim.iter = attr.iter;
        // anim.fillMode = attr.fillMode;
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
            scope.animations = TimelineService.processAnimations(scope, element)
            injectAnimationWithPlayer(scope.animations, element, cb, scope.window, scope.options);
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
        div.innerHTML = '<timeline-player animations=animations options=options></timeline-player>'
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