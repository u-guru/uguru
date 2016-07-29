<div class="animation-player bg-slate-75p radius-2">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal radius-2">
			<div class='bg-cerise ugrid-2'>
		        <div class='bg-auburn' style='width:{{anim.delayVal/(anim.delayVal + anim.durationVal)}}'>
		        </div>
		        <div class='bg-slate'>
		        </div>
		    </div>
		    <div class='flex-center-vertical-wrap'>
		        <ul class="p15-grid flex">
		            <li ng-if='anim.playState !== "running"'>
		                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
		            </li>
		            <li ng-if='anim.playState === "running"'>
		                <a ng-click='anim.playState = paused;' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
		            </li>
		            <li ng-if='anim.playState === "running"'>
		                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
		            </li>
		            <li> {{anim.duration}} </li>
		            <li> {{anim.playState}} </li>
		            <li> {{anim.delay}} <input ng-model="anim.delay" size="small" type="range"></input> </li>
		            <li> {{anim.fillMode}} </li>
		            <li> {{anim.iter}} </li>
		            <li ng-click='anim.showCss = !anim.showCss'>CSS</li>
		        </ul>
		        <div class='full-x txt-1' ng-if='anim.showCss'> {{anim.css}} </div>
			</div>
		</div>
	</div>
</div>
