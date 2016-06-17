angular
.module('uguru.admin', [])
.factory("AnimToolService", [
  '$state',
  '$timeout',
  '$localstorage',
  "$interval",
  'RootService',
  'AnimationService',
  AnimToolService
  ]);

function AnimToolService($state, $timeout, $localstorage, $interval, RootService, AnimationService) {
    var animationList = [];
    var toResolveAnimations = [];
    var animComplete = false;
    var animNameObjDict = {};
    var recorder = {};
    var player = {};
    var browser_prefix = RootService.getBrowserPrefix();
    var stage;
    var parent_elem;
    var animStartCallback;
    var animEndCallback;

    var animEventStartName = getAnimEventName(browser_prefix, 'Start');
    var animEventEndName = getAnimEventName(browser_prefix, 'End');


    return {
        initPlayer:initPlayer,
        initRecorder: initRecorder,
        setStage: setStage,
    }

    function initPlayer() {
        player.duration = recorder.time;
        player.play = playStageAnimations;
        player.time = null;
        player.jumpTo = jumpTo;
        player.animations = {queued: [], active: [], complete:[]};
        player.cleanAnimations = cleanAnimations;
        player.pauseAnimation = pauseAnimation;
            // player.start = getStartFunc();
            // player.pause = getPauseFunc();
            // player.changeRatio = getChangeRatioFunc()
        return player;
    }

    function pauseAnimation() {
        stage.player.mode = 'paused';
        if (player.timeout) {
            console.log('canceling complete animation effort');
            $timeout.cancel(player.timeout);
        }
        console.log('start offset', stage.player.start_offset);
        updateAnimPlayerOnPause();
        var animPlayStateKey = formatAnimationOption('AnimationPlayState', browser_prefix);
        for (var i = 0; i < stage.player.animations.queued.length; i++) {
            var indexAnim = stage.player.animations.queued[i];
            if (indexAnim.elem) {
                indexAnim.elem.style[animPlayStateKey] = 'paused';
            }
        }
    }

    function updateAnimPlayerOnPause() {
        stage.player.start_offset = getCurrentPlayProgress();
        stage.player.globals.offset.beginning =  ((stage.player.start_offset/100.0) * stage.player.total_time).toFixed(0);
    }

    function getCurrentPlayProgress() {
        var circle = document.querySelector('#main-player-tweener');
        if (circle) {
            var currentValue = circle.style['cx'];
            return parseInt(currentValue.replace('%', ''));
        }
    }

    function resumeAnimation() {
        stage.player.mode = 'resume';
        var animPlayStateKey = formatAnimationOption('AnimationPlayState', browser_prefix);
        for (var i = 0; i < stage.player.animations.queued.length; i++) {
            var indexAnim = stage.player.animations.queued[i];
            if (indexAnim.elem) {
                indexAnim.elem.style[animPlayStateKey] = 'running';
            }
        }
        var currentProgressMs = getCurrentPlayProgress();
        var msRemaining = stage.player.total_time - ((currentProgressMs/100.0) * stage.player.total_time).toFixed(0);
        triggerEndPlayerGlobalAnimation(msRemaining);
    }

    function triggerEndPlayerGlobalAnimation(time_ms) {
        console.log('checking to see if animation complete')
        player.timeout = $timeout(function() {
            if (stage.player.mode === "play" || stage.player.mode === 'resume' && player.timeout) {
                console.log('playing...');
                stage.player.mode = null;
                jumpTo(0)
            }
        }, time_ms)
    }

    function cleanAnimations() {
        stage.animations.sort(function(a1, a2) {
            a1.last_anim = null;
            a2.first_anim = null;
            return (a2.delay + a2.duration) - (a1.delay + a1.duration);
        }).reverse();
        var lastAnim = stage.animations[stage.animations.length - 1];
        lastAnim.last_anim = true;
        stage.animations[0].first_anim = true;
        stage.player.total_time = lastAnim.utc_start_time + lastAnim.duration - stage.animations[0].utc_start_time;
    }

    function jumpTo(percent) {
        var total_ms = stage.recorder.time * 1000;
        stage.player.globals.offset.beginning = ((percent/100) * total_ms).toFixed(1);
        stage.player.globals.jump_only = true;
        for (var i = 0; i < stage.animations.length; i++) {
            var animation = stage.animations[i];
            var animationString = constructAnimationString(stage.animations[i], stage.animationOptions);
            var formattedAnimationKey = formatAnimationOption('Animation', browser_prefix);
            animation.elem.style[formattedAnimationKey] = '';
            animation.elem.style[formattedAnimationKey] = animationString;
        }
    }

    function playStageAnimations() {
        stage.player.animations = {queued: [], active: [], complete:[]};
        stage.player.cleanAnimations();
        stage.player.mode = 'play';
        stage.player.pause = pauseAnimation;
        stage.player.resume = resumeAnimation;
        parent_elem = document.querySelector(stage.parentElem);
        parent_elem.addEventListener( animEventStartName , playStartCb);
        parent_elem.addEventListener( animEventEndName , playEndCb);
        var stage_animations_cp = stage.animations.slice();
        for (var i = 0; i < stage.animations.length; i++) {
            var clonedStageAnim = stage_animations_cp[i];
            stage.player.animations.queued.push(stage_animations_cp[i]);
            runAnimationsWithSettings(stage.animations[i], stage.animationOptions);

        }

        function runAnimationsWithSettings(animation, options) {
            var animationString = constructAnimationString(animation, stage.animationOptions);
            if (animation.elem) {
                var formattedAnimationKey = formatAnimationOption('Animation', browser_prefix);
                initBaseAnimElemListener(animation.elem);
                animation.elem.style[formattedAnimationKey] = '';
                $timeout(function() {
                    animation.elem.style[formattedAnimationKey] = animationString;
                })

            }
        }

        function playStartCb(e) {
            if (e.target) {
                // console.log('animation started', e);
                var anim_num = e.target.getAttribute('anim-num')
                var anim_name = e.animationName;
                var queued_anim;
                for (var j = 0; j < stage.player.animations.queued.length; j++) {
                    if (stage.player.animations.queued[j].name === anim_name) {
                        queued_anim = stage.player.animations.queued[j];
                        break;
                    }
                }
                queued_anim.elem = e.target;
                stage.player.animations.active.push(queued_anim);
            }
        }

        function playEndCb(e) {
            if (e.target) {
                // console.log('animation started', e);
                var anim_num = e.target.getAttribute('anim-num')
                var anim_name = e.animationName;
                var active_anim;
                for (var k = 0; k < stage.player.animations.active.length; k++) {
                    if (stage.player.animations.active[k].name === anim_name) {
                        active_anim = stage.player.animations.active[k];
                        break;
                    }
                }
                stage.player.animations.complete.push(active_anim);

                console.log(getCurrentPlayProgress() + '%', 'completed', stage.player.animations.complete.length);
            }
        }


        function initBaseAnimElemListener(elem) {
            // console.log(anim.elem, animEventStartName);
            // function startAnimCb(animation) {
            //     return function(e) {
            //         console.log(animation, e)
            //         if (animation.first_anim) {
            //             console.log('first anim started', animation.name);
            //         }
            //         function endAnimCb(animation) {
            //             return function(e) {
            //                 if (animation.first_anim) {
            //                     console.log('first anim complete', animation.name)
            //                 }
            //                 e.target.style[formattedAnimationKey] = '';
            //                 animation.elem.removeEventListener(endAnimCb, animEventEndName);
            //             }
            //         };
            //         animation.elem.addEventListener(animEventEndName, endAnimCb(animation));
            //     }
            // }
            function endAnimCb(e) {
                // return function(e) {
                    console.log('finished');
                    if (anim.first_anim) {

                    }
                    e.target.style[formattedAnimationKey] = '';
                    elem.removeEventListener(endAnimCb, animEventEndName);
                // }
            };
            elem.addEventListener(animEventEndName, endAnimCb);
            // anim.elem.addEventListener(animEventStartName, startAnimCb(anim));
        }
    }

    function formatAnimationOption(option, browser_prefix) {
        return browser_prefix && browser_prefix.length && (browser_prefix + option) || option[0].toLowerCase() + option.substring(1)
    }

    function constructAnimationString(animation, options) {

        var name, duration, time_f, delay, iter, direc, f_mode, play_state;

        if (options.speed) {
            duration = animation.duration / options.speed;
            delay = animation.delay / options.speed;
        }


        if (stage.player.globals.offset.beginning) {
            delay = animation.delay - stage.player.globals.offset.beginning;
        }

        if (stage.player.globals.jump_only) {
            play_state = 'paused';
        } else {
            play_state = 'running';
        }



        //formatting
        name = animation.name || 'temp-anim';
        duration = (duration && duration + 'ms') || '1s';
        time_f = animation.timing_function || 'ease';
        delay = delay + 'ms' || '0s';
        iter = animation.iteration_count || 1;
        direc = animation.direction || 'normal';
        f_mode = animation.fill_mode || 'none';
        play_state = play_state || '';

        var full_animation_string = name + " " + duration + " " + time_f + " " + delay + " " + iter + " " + direc + " " + f_mode + " " + play_state;
        return full_animation_string
    }

    function setStage(_stage) {
        stage = _stage || {};
        stage.animStats = initAnimStats();
        stage.animations = [];
        stage.animationOptions = {jump_only:true, speed: 1.5, showTweener: false, offset: {beginning:2000}};
        stage.player = player;
        stage.player.globals = {jump_only:false, speed: 1, showTweener: false, offset: {beginning:0}};
        stage.player.start_offset = '0';
        return stage;
    };

    function updatePlayerStartOffset(total_time_ms, offset_ms) {
        stage.player.start_offset = ((offset_ms/(total_time_ms * 1000)) * 100).toFixed('2');
    }

    function initAnimationListener(browser_prefix, _parent_elem) {


        animStartCallback = function(e) {
            var reservedIDs = ['admin-anim-tools'];
            if (e.target && reservedIDs.indexOf(e.target.id) > -1) {
                return;
            }
            stage.animStats.numActiveStart += 1;
            e.time_stamp = new Date().getTime();
            e.current_classname = e.target.className + "";
            stage.animStats.startEvents.push(e);
            if (stage.animStats.uniqueAnimArr.indexOf(e.animationName) === -1) {
                stage.animStats.uniqueAnimArr.push(e.animationName);
            }
            formatAndPushTimelineAnimObj(stage.animations.length, e.time_stamp, e.animationName, e.target, e.current_classname);


        }

        animEndCallback = function (e) {
            e.time_stamp = new Date().getTime();
            stage.animStats.numActiveEnd += 1;
            stage.animStats.endEvents.push(e);
            checkIfAnimationComplete(stage.animStats, stage.animStats.numActiveStart + 0, stage.animStats.numActiveEnd + 0);
            resolveAnimation(e);
        }

        parent_elem = document.querySelector(_parent_elem);
        parent_elem.addEventListener( animEventStartName , animStartCallback)
        parent_elem.addEventListener( animEventEndName, animEndCallback)
    }

    function resolveAnimation(evt) {
        var elementsMatched = [];
        for (var i = 0; i < toResolveAnimations.length; i++) {
            var anim = toResolveAnimations[i]
            if (evt.animationName === anim.name && evt.target === anim.elem) {
                elementsMatched.push(i);
            }
        }
        if (elementsMatched.length > 1) {
            alert('something went wrong see console');
            console.log('ERROR: event is matching more than two animations/elements', evt, toResolveAnimations);
            return;
        } else if (elementsMatched.length === 1) {
            var anim = toResolveAnimations.splice(toResolveAnimations[0], 1)[0]
            anim.duration = evt.time_stamp - anim.utc_start_time;
            if (!stage.animations.length) {
                anim.delay = 0;
            }
            anim.elem.setAttribute('anim-num', stage.animations.length + 1);
            stage.animations.push(anim);
        }
    }

    function checkIfAnimationComplete(stats, current_start, current_end) {
        if (animComplete) return;


        $timeout(function() {
            // case one -- its been over 1 second since the last animation has started
            var timeStampLastStartAnim = stats.numActiveStart && stats.startEvents[stats.startEvents.length - 1].time_stamp;
            if (new Date().getTime() - timeStampLastStartAnim > 1000 && !animComplete) {
                animComplete = true;
                var intervalCounter = 0;
                var waitInterval = setInterval(function() {
                    intervalCounter += 1;
                    if (intervalCounter === 1 && (stats.startEvents.length > stats.endEvents.length)) {
                        recorder.end(recorder);
                        window.clearTimeout(waitInterval);
                    }
                    else if (stats.startEvents.length === stats.endEvents.length) {
                        recorder.end(recorder);
                        window.clearTimeout(waitInterval);
                    }
                }, 1000)

            }
        }, 1000);
    }



    function getAnimEventName(prefix, _type) {
        if (['ms', 'moz', 'webkit', 'o'].indexOf(prefix.toLowerCase()) > -1) {
            return prefix + 'Animation' + _type
        }
        return "animation" + _type.toLowerCase();

    }



    function formatAndPushTimelineAnimObj(index, start_time, name, elem, class_name) {
        $timeout(function() {
            var js_obj = AnimationService.getAnimationObjFromAnimationName(name);
            var anim = {
                id: index,
                name: name,
                js_obj: js_obj,
                delay:start_time - recorder.start_time,
                utc_start_time: start_time,
                duration: null,
                elem: elem,
                _class: class_name
            }
            toResolveAnimations.push(anim);
        })
    }

    function mergeDurationToAnimObj(f_anim, start_events, end_event) {
        for (var j = 0; j < start_events.length; j++) {
            var indexEvent = start_events[j];
            if (indexEvent.target === f_anim.elem) {
                f_anim.duration = indexEvent.time_stamp - f_anim.utc_start_time;
                console.log(f_anim.name, 'will start', f_anim.delay +'ms for', f_anim.duration/1000 + 's')
            }
        }
    }

    function initRecorder(stage, scope) {
        var startCallback = function() {
            return function() {
                initAnimationListener(browser_prefix, stage.parentElem);
            }
        }
        return getRecordObj(scope, startCallback())
    }

    function initAnimStats() {
        return {
            uniqueAnimArr: [],
            startEvents:[],
            uniqueElems:[],
            numActiveStart: 0,
            numActiveEnd: 0,
            endEvents:[],
            animDict: {}
        }
    };

    function getRecordObj(scope, start_cb) {

        recorder = {
            start: function(r_obj) {

                if (start_cb) {
                    start_cb();
                }
                $timeout(function() {
                    if (!r_obj.start_time) {
                        r_obj.time = 0;
                        r_obj.start_time = new Date().getTime();
                        r_obj.time_promise = $interval(function() {
                            var current_time = new Date().getTime();
                            r_obj.time = ((current_time - r_obj.start_time)/1000).toFixed(1);
                        }, 10)
                    }
                })
            },
            start_time: null,
            end: function(r_obj) {
                stage.animations.sort(function(a1, a2) {
                    return (a2.delay + a2.duration) - (a1.delay + a1.duration);
                }).reverse();
                var current_time = new Date().getTime();

                parent_elem.removeEventListener(animEventStartName, animStartCallback);
                parent_elem.removeEventListener(animEventEndName, animEndCallback);
                $interval.cancel(r_obj.time_promise);
                stage.player.start_offset = 50
                stage.animationOptions.showTweener = true;

                var lastAnim = stage.animations[stage.animations.length - 1];
                stage.recorder.complete = true;
                stage.recorder.time = ((lastAnim.utc_start_time + lastAnim.duration -  stage.animations[0].utc_start_time)/1000.0).toFixed(2);
                stage.player.total_time = stage.recorder.time;
                stage.player.orig_time = stage.recorder.time;
                updatePlayerStartOffset(stage.player.total_time * 1000, 0);
                stage.recorder.end_time = current_time;
                stage.recorder.total_time = current_time - r_obj.start_time;

                $timeout(function() {
                    scope.$apply();
                })
            },
            end_time: null,
            complete:false,
            time: 0,
            total_time: 0,
            time_promise: null,
            clear: function(record_obj) {
                if (confirm('are you sure you want to remove this data?')) {
                    r_obj.start_time = 0;
                    r_obj.complete = false;
                    r_obj.total_time = 0;
                    r_obj.time = 0;
                    r_obj.time_promise = false;
                }
            }
        }
        stage.recorder = recorder;
        return recorder;
    }
}