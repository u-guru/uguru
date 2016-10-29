<div class='full-x flex' style='height:65px;'>
    <ul class='flex-vertical-center p15-grid'>
        <li ng-click='chart.player.stepBack(chart.player.schedule)'>
            <span class='flex-center svg-32 svg-stroke-6 radius-2'>
                <svg style='transform:rotate(-180deg)' viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M68.3635106,20.0921155 C68.3635106,16.727533 71.0974015,14 74.454538,14 L74.454538,14 C77.8185196,14 80.5455654,16.7345657 80.5455654,20.0921155 L80.5455654,79.9078845 C80.5455654,83.272467 77.8116745,86 74.454538,86 L74.454538,86 C71.0905565,86 68.3635106,83.2654343 68.3635106,79.9078845 L68.3635106,20.0921155 Z M65.6106483,47.0463201 C66.5720751,47.8852207 67.3635106,48.7075094 67.3635106,50.0226176 C67.3635106,51.3349572 66.8005882,52.132328 65.6106483,52.9961465 L23.5085114,85.7243441 C22.8090385,86.2005517 20.0362277,86.4054318 20,83.3433062 L20,16.6991604 C20.0027867,13.8668327 22.5359376,13.6425721 23.5085114,14.3208911 L65.6106483,47.0463201 Z" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
        </li>
        <li class='relative' style='height:49px; width:47px;'>
            <span player-control ng-click="chart.player.play(chart.player)" class='flex-center svg-32 svg-stroke-6 radius-2 stroke-white' on-click="p:[display:none]|s:[play-click:public]" init-with="p:[display:block]" when-paused-click="p:[display:block]"  ng-class="{'opacity-50p':player.state.active}"  ng-include='"shared/templates/components/svg/main/play.html"'></span>
            <span player-control ng-click='chart.player.pause($event)' id='pause-element' class='flex-center svg-32 svg-stroke-6 radius-2 stroke-white' init-with="p:[display:none]" when-play-click="p:[display:block]" on-click="p:[display:none]|s:[paused-click:public]"  ng-include='"shared/templates/components/svg/main/pause.html"'></span>
        </li>
        <li ng-click='chart.player.reset(chart.player)'>
            <span class='flex-center svg-32 svg-stroke-6 radius-2 stroke-white' ng-include='"shared/templates/components/svg/main/sync.html"'></span>
        </li>
        <li ng-click='chart.player.stepForward(chart.player.schedule)'>
            <span class='flex-center svg-32 svg-stroke-6 radius-2 bg stroke-white' ng-include='"shared/templates/components/svg/main/skip.html"'></span>
        </li>
        <li class='flex-vertical-center' style='width:150px !important'>
            <span class='block txt-center relative p15x-p10y weight-900 txt-white txt-20 bg-campus-50p radius-2 width-128'>
                <span inspector-duration>0</span>
                <span class='txt-1 opacity-60p'>/&nbsp;&nbsp;{{chart.player.playerProps.duration}}ms</span>
            </span>
        </li>
    </ul>

    <div class='flex-vertical-center relative flex p30right' style="width:calc(100% - 353px)">
        <div class='relative full-x flex-vertical-center height-50p' style="width:calc(100% - 30px)">
            <a ng-click='chart.player.jumpFromClick(chart.player, $event)' class='full-x'>
                <hr class='absolute top-0 left-0 z-index-2 bg-transparent border-4 border-solid border-moxie radius-10' style='width:0;' inspector-bar />
                <hr class='absolute top-0 left-0 z-index-1 full-x bg-transparent border-4 border-solid radius-10' style="border-color: rgba(255,255,255,.25)"/>
            </a>
            <div class='absolute z-index-3 round bg-smoke' style='left:0; top:9px; width:15px; height:15px' inspector-ball> </div>
        </div>
    </div>
</div>
