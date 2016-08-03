<div class="animation-player bg-slate-75p radius-2 relative">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal radius-2">
			<ul class="p15-grid flex-center-vertical txt-20 semibold">
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
			<div class="state-timeline-container full-x height-24 p15xy flex-center">
				<div class="state-timeline-container full-x height-02 round bg-white-25p relative">
					<div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 20%">
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-moxie" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-moxie p05xy txt-16 semibold flex-center-vertical-space-between">#element <span class="opacity-50">2400</span></h1>
								<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
									<span>bounceInOut&nbsp;(400ms)</span>
								</div>
							</div>
						</div>
					</div>
					<div class="state-timeline-dot actual bg-crimson width-10 height-10 round absolute" style="margin-top: -4px; left: 25%">
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-crimson" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-crimson p05xy txt-16 semibold flex-center-vertical-space-between">#element <span class="opacity-50">2500</span></h1>
								<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
									<span>bounceInOut&nbsp;(400ms)</span>
								</div>
							</div>
						</div>
					</div>
					<div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 67%">
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-moxie" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-moxie p05xy txt-16 semibold flex-center-vertical-space-between">#element <span class="opacity-50">2400</span></h1>
								<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
									<span>op:0 &rarr; op:1&nbsp;(400ms)</span>
								</div>
							</div>
						</div>
					</div>
					<div class="state-timeline-dot actual bg-crimson width-10 height-10 round absolute" style="margin-top: -4px; left: 78%">
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-crimson" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-crimson p05xy txt-16 semibold flex-center-vertical-space-between">#element <span class="opacity-50">2500</span></h1>
								<div class="txt-slate txt-14 p05x flex" style="white-space:nowrap">
									<span>op:0 &rarr; op:1&nbsp;(400ms)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="full-x height-24 p05xy">
				<input ng-model="anim.delay" size="small" type="range"></input>
			</div> -->
		</div>
		<div class="bg-charcoal radius-2" ng-if="false">
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
