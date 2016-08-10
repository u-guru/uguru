<div class="animation-player bg-slate-75p radius-2 absolute top-0">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal radius-2">
			<div class='bg-cerise ugrid-2'>
		        <div class='bg-auburn' style='width:{{anim.delayVal/(anim.delayVal + anim.durationVal)}}'>
		        </div>
		        <div class='bg-slate'>
		        </div>
		    </div>
		    <div class='flex-wrap semibold txt-18'>
		        <ul class="p15-grid flex-center-vertical">
		            <li ng-if='anim.playState !== "running"'>
		                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
		            </li>
		            <li ng-if='anim.playState === "running"'>
		                <a ng-click='anim.playState = paused;' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
		            </li>
		            <li ng-if='anim.playState === "running"'>
		                <a ng-click='play()' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
		            </li>
		            <li class="opacity-10p">
						{{anim.duration}}
					</li>
		            <li class="opacity-10p">
						{{anim.playState}}
					</li>
		            <li>
						{{anim.delay}}
					</li>
		            <li class="opacity-10p">
						{{anim.fillMode}}
					</li>
		            <li class="opacity-10p">
						{{anim.iter}}
					</li>
		            <li>
						<a class="bg bg-moxie block p05xy radius-2" ng-click='anim.showCss = !anim.showCss'>CSS</a>
					</li>
		        </ul>
				<div class="full-x height-24 p05xy">
					<input ng-model="anim.delay" size="small" type="range"></input>
				</div>
		        <div class='full-x p15xy bg-white-75p txt-charcoal' ng-if='anim.showCss'> <pre class="txt-14">{{anim.css}}</pre> </div>
			</div>
		</div>
	</div>
</div>
