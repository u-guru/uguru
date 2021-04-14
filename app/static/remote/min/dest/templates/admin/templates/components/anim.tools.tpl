<div class="fixed top-0 left-0 full-x" id="admin-anim-tools">
    <!-- Top bar -->
    <div ng-if="stage.status.active" class="absolute full-x p10xy weight-900 text-center txt-white z-index-1000">
        {{stage.status.msg}}
    </div>
    <div class="relative full-x bg-charcoal p15-grid">
        <ul class="flex-stretch full-x">
            <li class="bg-slate weight-500 p10xy flex-wrap-center">
                <div class="txt-1 uppercase opacity-50">Speed</div>
                <div class="weight-900 txt-5">{{stage.player.globals.speed}}x</div>
            </li>
            <li class="bg-slate weight-500 p10xy flex-wrap-center">
                <div class="txt-1 uppercase opacity-50"># Anim</div>
                <div class="weight-900 txt-5">{{stage.animations.length}}</div>
            </li>
            <li class="bg-slate weight-500 p10xy flex-wrap-center">
                <div class="txt-1 uppercase opacity-50">Seconds</div>
                <div class="weight-900 txt-5" ng-if="stage.recorder.time && !stage.player.total_time">{{stage.recorder.time}}s</div>
                <div class="weight-900 txt-5" ng-if="stage.player.total_time">{{stage.player.total_time}}<span class="bg-slate-50p">ms</span></div>
            </li>
            <li class="uppercase weight-500 p10xy" ng-if="!stage.recorder.time" ng-click="stage.recorder.start(stage.recorder)">
                <i class="txt-6 ion-record icon txt-auburn"> </i>
            </li>
            <li class="uppercase weight-500 p10xy" ng-if="!stage.recorder.complete" ng-click="stage.recorder.end(stage.recorder)">
                <i class="txt-6 ion-stop icon txt-auburn"> </i>
            </li>
            <li class="uppercase weight-500 p10xy" ng-if='stage.recorder.complete && stage.player.mode !== "resume" && stage.player.mode !== "play" && stage.player.mode !== "paused"' ng-click="stage.player.play()">
                <i class="txt-6 ion-play icon txt-shamrock"> </i>
            </li>
            <li class="uppercase weight-500 p10xy" ng-if='stage.player.mode === "play" || stage.player.mode === "resume"' ng-click="stage.player.pause()">
                <i class="txt-6 ion-pause icon txt-shamrock"> </i>
            </li>
            <li class="uppercase weight-500 p10xy" ng-if='stage.player.mode === "paused"' ng-click="stage.player.resume()">
                <i class="txt-6 ion-play icon txt-shamrock"> </i>
            </li>
            <li class="uppercase weight-500 p10xy full-x relative">
                <div class="full-xy flex-stretch-center height-48 absolute top-0">
                    <span ng-bind-html="stage.player.globals.offset.beginning">
                    </span>
                    <svg class="full-xy p10x relative block">
                      <line x1="0" x2="100%" y1="50%" y2="50%" style="stroke:rgb(255,255,255);stroke-width:6"/>
                      <circle id="main-player-tweener" kf="0%|tr-x:0%, 100%|tr-x:100%" kf-mode="stage.player.mode" kf-duration="{{stage.player.total_time}}ms" cx="{{stage.player.start_offset}}%" cy="50%" r="10px" fill="red"> </circle>
                    </svg>
                    <span>
                        {{stage.player.total_time || stage.recorder.time}}
                    </span>
                </div>
            </li>

            <anim-player ng-if="false">

            </anim-player>
        </ul>
    </div>
    <div class="relative full-x bg-slate" ng-if="stage.animStats.startEvents.length">
        <ul class="flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
            <li ng-click="stage.player.jumpTo(event.delay/stage.player.total_time*0.1)" style="white-space:nowrap; left: {{event.delay*0.1}}px !important; width: {{event.duration}}px !important; top: {{$index * 40}}px !important" ng-repeat="event in stage.animations" class="absolute">
                <button class="height-36 txt-18 radius-2 normal block">{{event.name}}|{{event.delay}}ms|{{event.duration}}ms </button>
            </li>
        </ul>
        <ul class="ugrid-5 flex-center-vertical p15-grid full-x overflow-x no-scrollbar" ng-if="stage.animationOptions.showTweener">
            <li class="relative">
                <div class="full-x">{{stage.player.globals.offset.beginning}}ms</div>
                <input type="range" ng-mouseup="stage.player.globals.jump_only = false;" ng-model="stage.player.start_offset" ng-change="stage.player.jumpTo(stage.player.start_offset)" min="0" max="100"> 
            </li>
        </ul>
    </div>
</div>