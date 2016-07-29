<div  class="animation-player border-dashed border-2-top">
    <div class='bg-cerise bg-slate ugrid-2'>
        <div class='bg-auburn' style='width:{{anim.delayVal/(anim.delayVal + anim.durationVal)}}'>
        </div>
        <div class='bg-slate'>
        </div>
    </div>
    <div class='flex-center-vertical-stretch flex-wrap'>
        <ul class="p15-grid flex">
            <li ng-if='anim.playState !== "running"'>
                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
            </li>
            <li ng-if='anim.playState === "running"'>
                <a ng-click='anim.playState = paused;' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
            </li>
            <li ng-if='anim.playState === "running"'>
                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
            </li>
        </ul>
        <ul class="p15-grid flex">
            <li> {{anim.duration}} </li>
            <li> {{anim.playState}} </li>
            <li> {{anim.delay}} <input ng-model="anim.delay" type="range"></input> </li>
            <li> {{anim.fillMode}} </li>
            <li> {{anim.iter}} </li>
            <li ng-click='anim.showCss = !anim.showCss'>CSS</li>
        </ul>
        <div class='full-x txt-1' ng-if='anim.showCss'> {{anim.css}} </li>
</div>
