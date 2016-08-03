<div class="animation-player bg-slate-75p radius-2 relative">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal radius-2">
			<ul class="p15-grid flex-center-vertical txt-20 semibold">
				<li>
					<a ng-click='tPlayer.play(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
				</li>
				<li>
					<a ng-click='tPlayer.pause(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
				</li>
				<li>
					<a ng-click='tPlayer.reset(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
				</li>
				<!-- @gabrielle, maybe a toggle for ms/s-->
				<!-- <li class="opacity-100">
					{{tPlayer.state.duration}}ms
				</li> -->
				<li class="opacity-100">
					{{tPlayer.state.duration/1000}}s
				</li>
				<li class="opacity-100">
					{{tPlayer.state.speed}}x
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
					<div init-with="p:[transform:translateY(-50%), transition:transform {{50 * $index}}ms ease-in]" on-init="p:[transform:translateY(0)]" class="state-timeline-dot expected bg-moxie height-10 round absolute" style="width: {{animation.env.width}}%; left: {{animation.env.xLeft}}%" ng-repeat='animation in animations'>
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-moxie" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-moxie p05xy txt-16 semibold flex-center-vertical-space-between">{{animation.name}}
								 <span class="opacity-50">{{animation.duration}}</span>,
								<span class="opacity-100">{{animation.delay}}</span>
								</h1>
								<h5 class='opacity-10 txt-1 txt-charcoal'> {{animation.element.className.split(' ').splice(0, 2)[0]}}
								</h5>
								<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
									<span class='ugrid-2' ng-repeat='(prop,value) in animation.css'>{{prop}} {{value}}</span>
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
<!-- <div class="animation-player bg-slate-75p radius-2 relative">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal flex-wrap-center txt-white p15-grid" ng-repeat='animation in animations'>
			<span>{{animation}}</span>
		</div>
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
 -->
 </div>