<div class="animation-player bg-slate-75p radius-2 relative">
    <div class="bg-cobalt-25p p05xy radius-2">
		<div class="bg-charcoal radius-2">
			<div ng-if='tPlayer.state.showAnimationsBar' class='border-2-bottom p15-grid full-x'>
				<ul class='overflow-x flex-vertical-center'>
					<li ng-click='animation.env.collapsed = !animation.env.collapsed' ng-class="{'bg-smoke txt-moxie':animation.env.collapsed, 'bg-moxie txt-white':!animation.env.collapsed}" class='m05x p05xy txt-white' ng-repeat='animation in animations'>{{animation.name}}:{{animation.duration}}</li>
				</ul>
			</div>
			<div ng-if='tPlayer.showSettings' on-init='a:[fadeInUp:set(duration:0.5s)]' class='border-2-bottom border-slate'>
				<div ng-if='!tPlayer.showSettings' class='txt-1 full-x txt-white p05y text-center opacity-20p'>
					<div class='full-x'>Also you can set these via the <span><pre class='inline code txt-white'><"timeline-inspect"></pre> attribute</span>
					</div>
				</div>
				<ul class="p15-grid flex-center-vertical txt-20 semibold">
					<li>
						<span class='weight-300'>Start at:</span>
						<span class='weight-600'>{{tPlayer.state.offsetStr}}</span>
						<input type='range' ng-mouseup="" ng-model="tPlayer.state.startAt"> </input>
					</li>
					<li>
						<a class='weight-300'>Duration:</a>
						<a class='weight-600'>{{tPlayer.state.duration}}</a>
						<input type='range' min="0" max="10000" step="100" ng-mouseup="" ng-model="tPlayer.state.duration"> </input>
					</li>
					<li>
						<a class='weight-300'>Speed:</a>
						<a class='weight-600'>{{tPlayer.state.speed}}</a>
						<input type='range' ng-mouseup="tPlayer.state.updateSpeed(tPlayer.state.speed)" ng-model="tPlayer.state.speedValue"> </input>
					</li>
					<li>
						<a class='weight-300'>Fill Mode</a>
						<a class='weight-600'>{{tPlayer.state.speed}}</a>
						<input type='range' ng-mouseup="tPlayer.state.updateSpeed(tPlayer.state.speed)" ng-model="tPlayer.state.speedValue"> </input>
					</li>
				</ul>
				<ul class="p15-grid flex-center-vertical txt-20 semibold">
					<li class='flex-wrap relative flex-wrap-center border-1 border-slate border-dashed p05y p20x'>
						<div><a class='weight-600'>Refresh Options</a></div>
						<div class='p05-grid txt-left m10y'>
							<span class='txt-1 p05xy m10x opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-white':tPlayer.state.play}">Play</span>
							<span class='txt-1 p05xy opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-white':!tPlayer.state.play}">Pause</span>
							<span class='txt-1 p05xy opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-white':!tPlayer.state.play}">Reset</span>
						</div>
					</li>
					<li class='flex-wrap relative flex-wrap-center border-1 border-slate border-dashed p05y p20x'>
						<div><a class='weight-600'>Iteration Count</a></div>
						<div class='p05-grid txt-left m10y'>
							<span class='txt-1 p05xy m10x opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-white':tPlayer.state.iterCount}">{{tPlayer.state.iterCount}}</span>
							<span class='txt-1 p05xy opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-white':!tPlayer.state.play}">Infinit</span>
						</div>
					</li>
					<li class='flex-wrap relative flex-wrap-center border-1 border-slate border-dashed p05y p20x'>
						<div><a class='weight-600'>Precision</a></div>
						<div class='p05-grid txt-left m10y'>
							<span class='txt-1 p05xy m10x opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-
							white':tPlayer.state.iterCount}">1s</span>
							<span class='txt-1 p05xy m10x opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-
							white':tPlayer.state.iterCount}">1.5s</span>
							<span class='txt-1 p05xy m10x opacity-50p' ng-class="{'opacity-100p weight-600 border-1 border-
							white':tPlayer.state.iterCount}">1.55s</span>
						</div>
					</li>
					<li class='flex-wrap relative' >
						<div class='full-x'><a class='weight-300'>Default Direction</a></div>
						<a class='weight-600'>{{tPlayer.state.direction}}</a>
					</li>
					<li class='flex-wrap relative' >
						<div class='full-x'><a class='weight-300'>Fill Mode</a></div>
						<a class='weight-600'>{{tPlayer.state.fillMode}}</a>
					</li>
					<li>
						<div>
							<a class='weight-300'>Iteration Count</a>
							<a class='weight-600'>{{tPlayer.state.iterCount}}</a>
						</div>
						<div>
							<input type='text' class='full-x bg-transparent txt-charcoal' autoselect autofocus ng-mouseup="tPlayer.state.updateSpeed(tPlayer.state.speed)" ng-model="tPlayer.state.iterCount"> </input>
						</div>
					</li>
				</ul>
			</div>
			<ul class="p15-grid flex-center-vertical txt-20 semibold" ng-class='{"opacity-20p":tPlayer.showSettings}'>
				<li ng-class="{'opacity-100': !tPlayer.state.play, 'opacity-50': tPlayer.state.play}">
					<a ng-click='tPlayer.play(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
				</li>
				<li ng-class="{'opacity-100': tPlayer.state.play, 'opacity-50': !tPlayer.state.play}">
					<a ng-click='tPlayer.pause(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
				</li>
				<li ng-class="{'opacity-100': !tPlayer.state.play, 'opacity-50': tPlayer.state.play}">
					<a ng-click='tPlayer.reset(animations, tPlayer.state)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
				</li>
				<li ng-class="{'opacity-100 txt-white': tPlayer.showSettings, 'opacity-50': !tPlayer.showSettings}">
					<a ng-click='tPlayer.showSettings = !tPlayer.showSettings' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/settings.html'"> </a>
				</li>
				<!-- 'paused' for now-->
				<!-- <li ng-if='false'>
					<a ng-click='tPlayer.reset(animations)' class="flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
				</li> -->
				<li class="opacity-100 weight-900">
					{{tPlayer.state.offsetStr}}s
				</li>
				/
				<li class="opacity-50">
					{{tPlayer.state.fDuration.s.str}}
				</li>
				<li class="opacity-100 border-1 border-slate">
					{{tPlayer.state.speed}}
				</li>
				<li class="opacity-10p">
					{{tPlayer.state.fillMode}}
				</li>
				<li class="opacity-10p">
					{{tPlayer.state.direction}}
				</li>
				<!-- @gabrielle .. not really needed here but you can if you need it-->
				<li ng-show='false'>
					{{tPlayer.state.delay}}
				</li>

				<li class="opacity-10p" ng-show='false'>
					{{anim.iter}}
				</li>
				<li ng-show='false'>
					<a class="bg bg-moxie block p05xy radius-2" ng-click='anim.showCss = !anim.showCss'>CSS</a>
				</li>
				<li class="opacity-100 border-1 border-slate" ng-click='tPlayer.state.showAnimationsBar = !tPlayer.state.showAnimationsBar'>
					{{animations.length}} animations
				</li>
			</ul>
			<div class="state-timeline-container full-x height-24 p15xy flex-center">


					<timeline-player points="" state="tPlayer.state"></timeline-player>

				<!-- 	<div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 20%">
						<div class="state-timeline-info absolute z-index-999 radius-2 bg-moxie" style="padding:2px; bottom:15px; min-width:400px">
					<div class="state-timeline-container full-x height-02 round bg-white-25p relative">
					<div init-with="p:[transform:translateY(-50%), transition:transform {{50 * $index}}ms ease-in]" on-init="p:[transform:translateY(0)]" class="state-timeline-dot expected bg-moxie height-10 round absolute" style="width: {{animation.env.width}}%; left: {{animation.env.xLeft}}%" ng-repeat='animation in animations'>
						<div class="state-timeline-info absolute z-index-99 radius-2 bg-moxie" style="padding: 2px; bottom:15px">
							<div class="bg-white radius-2">
								<h1 class="bg-moxie p05xy txt-16 semibold flex-center-vertical-space-between">{{animation.name}}
									<span class="opacity-50">{{animation.duration}}</span>,
									<span class="opacity-100">{{animation.delay}}</span>
								</h1>
								<h5 class='opacity-10 txt-1 txt-charcoal'>{{animation.element.className.split(' ').splice(0, 2)[0]}}</h5>
								<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
									<span class='ugrid-2' ng-repeat='(prop,value) in animation.css'>{{prop}} {{value}}</span>
								</div>
							</div>
						</div>
					</div> -->

					<div ng-class="{'bg-crimson':!animation.env.active, 'bg-moxie':animation.env.active}"  class="state-timeline-dot actual width-10 height-10 absolute round absolute"  style="margin-left:15px;left:{{animation.env.xLeft}}%;" ng-repeat='animation in animations' id="animation-{{animation.env}}">
						<div class="state-timeline-info absolute z-index-99 radius-2" ng-class="{'bg-crimson':!animation.env.active, 'bg-moxie':animation.env.active}" style="padding:2px; bottom:15px; width:250px; height:380px" ng-hide='animation.env.collapsed'>

							<div class="bg-white radius-2 relative full-xy">
								<h1 class='bg-moxie ugrid-3 txt-1'>
									<span class='flex-wrap-center animation-{{animation.env.id}}' style='width:15%;'>
									</span>
									<span class='flex-wrap-center full-x text-left weight-600' style='font-size:12px;width:30%;'>{{animation.name}}</span>
									<span class='ugrid-5' style='width:55%;'>
										<a ng-class='{"bg-moxie txt-white weight-900": !tabIndex}' class='flex-center svg-white svg-stroke-8 svg-24 opacity-50'>{{anim.offsetStr||'0.0'}}</a>
										<a class='flex-center svg-white svg-stroke-8 svg-24 opacity-50' ng-click="animation.set('PlayState', 'running')" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"></a>
										<a class='state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50' ng-click="animation.set('PlayState', 'paused')" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"></a>
										<a class='state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50' ng-click='animation.reset()' ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"></a>
										<a ng-click='animation.env.collapsed = !animation.env.collapsed;' class="state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/up.html'"> </a>
									</span>
								</h1>
								<div class='full-x relative'>
									<svg class='full-x relative animation-timer-{{animation.env.id}}' ng-mousedown="animation.jumpTo()" style="height:10px;" viewBox="0 0 150 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
									    <!--  -->
									    <rect class='z-index:1000' rx="0.5"  width="0" height="1" fill="white"> </rect>
									    <rect rx="0.5"  width="150" height="1" style='opacity:0.2' fill="#F1F1F1"> </rect>
									</svg>
								</div>
								<div class='flex bg-moxie-80p txt-white weight-700 txt-5 full-x'>
									<ul class='ugrid-4 full-x txt-1 overflow-x flex-vertical-center text-center no-scrollbar'>

										<li ng-class='{"bg-moxie txt-white weight-900": !tabIndex}' ng-click='tabIndex = 0' class='p05xy'>A</li>
										<li ng-class='{"bg-moxie txt-white weight-500": tabIndex === 1}' ng-click='tabIndex = 1' class='p05xy'>BP</li>
										<li ng-class='{"bg-moxie txt-white weight-500": tabIndex === 2}' ng-click='tabIndex = 2' class='p05xy'>KF</li>
										<li ng-class='{"bg-moxie txt-white weight-500": tabIndex === 3}' ng-click='tabIndex = 3' class='p05xy'>EASE</li>
									</ul>
								</div>
								<div class="state-timeline-preview fix-abs" style="min-height:0px"></div>
								<div class="txt-slate txt-14 flex-vertical-center bg-charcoal full-x absolute top-0 left-0" style="white-space:nowrap; height:calc(100% - 85px); margin-top:90px;"  ng-init='tabIndex = animation.env.tabIndex'>
									<div ng-if='tabIndex === 0' class='full-xy txt-white relative'>
										<ul class='full-xy flex-vertical-center flex-wrap' style='align-content:stretch'>
											<li class='ugrid-2 full-x flex-vertical-center bg-slate-50p' style='align-self:stretch'>
												<div class='full-x p10x text-center'>
													<span>
														Duration:
													</span>
													<span>
														{{animation.css[animation.prefix+'Duration'].s}}s
													</span>
													<span class='opacity-30p m10x'>
														{{animation.css[animation.prefix+'Duration'].ms}}ms
													</span>
												</div>
												<div class='full-x p10x ugrid-3'>
													<span style='width:10%;'>
														0
													</span>
													<input style='width:80%;' type='range' ng-mouseup="animation.set('Duration')" max="5" min="0" step=".1" ng-model="animation.css[animation.prefix+'Duration'].s"/>
													</input>
													<span style='width:10%;'>
														5
													</span>
												</div>
											</li>
											<li class='ugrid-2 full-x flex-vertical-center bg-charcoal p05y' style='align-self:stretch'>
												<div class='full-x p10x text-center'>
													<span>
														Delay
													</span>
													<span>
														{{animation.css[animation.prefix+'Delay'].s}}s
													</span>
													<span class='opacity-30p m10x'>
														{{animation.css[animation.prefix+'Delay'].ms}}ms
													</span>
												</div>
												<div class='full-x p10x ugrid-3'>
													<span style='width:10%;'>
														0
													</span>
													<input style='width:80%;' type='range' ng-mouseup="animation.set('Delay')" step="0.1" min="0" max="5" ng-model="animation.css[animation.prefix+'Delay'].s"/>
													</input>
													<span style='width:10%;'>
														5
													</span>
												</div>
											</li>
											<li class='ugrid-3 flex-wrap-center full-x bg-slate-50p p05y' style='align-self:stretch'>
												<span>
												Iterations
												</span>
												<span class='p05xy'>
													<input style='width:80%;' type='range' ng-mouseup="animation.set('IterationCount')" ng-model="animation.css[animation.prefix+'IterationCount'].value"/>
													</input>
												</span>
												<span>
													{{animation.css[animation.prefix+'IterationCount'].value}}
												</span>

											</li>
											<li class='ugrid-2 full-x bg-charcoal p05y flex-vertical-center txt-1' style='align-self:stretch; font-size:9px !important;'>
												<span class='flex-wrap p05x weight-700' style='width:20%'>
												Fill mode
												</span>
												<div class='ugrid-4 flex-vertical-center text-center' style='width:80%;'>
													<span class='p05xy border-1 border-dashed border-slate' style='align-self:stretch' ng-class="{'opacity-10p': option !== animation.css[animation.prefix + 'FillMode'].value}" ng-repeat='option in animation.env.fillModeOptions' ng-click="animation.set('FillMode', option)">
														{{option}}
													</div>
												</span>
											</li>
											<li class='ugrid-2 full-x bg-slate-50p p05y flex-vertical-center txt-1' style='align-self:stretch; font-size:10px !important;'>
												<span class='flex-wrap p05x weight-700' style='width:20%'>
												Direction
												</span>
												<span class='ugrid-4 flex-vertical-center' style='width:80%;'>
													 <span class='p05xy border-1 border-dashed border-slate' style='align-self:stretch'ng-class="{'opacity-50p': option !== animation.css[animation.prefix + 'Direction'].value}"  ng-repeat='option in animation.env.directionOptions' ng-click="animation.set('Direction', option)">
														{{option}}
													</span>
												</span>
											</li>
											<li class='ugrid-2 full-x bg-slate-50p p05y flex-vertical-center txt-1' style='align-self:stretch; font-size:10px !important;'>
												<span class='flex-wrap p05x weight-700' style='width:20%'>
												Timing Function
												</span>
												<span class='ugrid-4 flex-vertical-center' style='width:80%;'>
													 <span class='p05xy border-1 border-dashed border-slate' style='align-self:stretch'ng-class="{'opacity-50p': option !== animation.css[animation.prefix + 'Direction'].value}"  ng-repeat='option in animation.env.tsOptions' ng-click="animation.set('TimingFunction', option)">
														{{option}}
													</span>
												</span>
											</li>
											<li class='ugrid-2 full-x flex-vertical-center bg-charcoal' style='align-self:stretch;'>
												<span class='p05x weight-700' style='font:10px;'> Timing Function: </span>
												<span> {{animation.css[animation.prefix + 'TimingFunction'].value || 'ease'}} </span>
											</li>
											<li class='ugrid-2 p10y full-x flex-vertical-center bg-slate-50' style='align-self:stretch;'>
												<span class='p05x weight-700' style='font-size:12px;width:20%;'> Toggles: </span>
												<span class='ugrid-4 text-center flex-wrap-center' style='width:80%; font-size:8px;'>
													<a ng-click='animation.env.active = !animation.env.active'>
														<span class='bg-moxie p05xy txt-white weight-700' ng-if='animation.env.active'>
															Active
														</span>
														<span class='bg-auburn p05xy txt-white weight-700' ng-if='!animation.env.active'>
															Inactive
														</span>
													</a>
													<a ng-click='animation.env.collapsed = !animation.env.collapsed'>
														<span class='bg-tansparent p05xy txt-white weight-700 border-1 border-dashed' ng-if='!animation.env.collapsed'>
															Collapse me
														</span>
													</a>
													<!-- <a disabled>Expand to right</a> -->
												</span>
											</li>
										</ul>
									</div>
									<div ng-if='tabIndex === 1' class='relative full-xy'>
										<ul class='full-xy flex-wrap-center absolute left-0 top-0'>
											<li ng-repeat='point in animation.bp.points' class='full-x ugrid-3 flex-wrap-center'>

												<span> @T== {{point.time}}</span>
												<input type='range' ng-model='animation.bp.newBpValue'> </input>
												<span class='bg-auburn' ng-click='animation.bp.remove'> remove </span>
											</li>
											<li class='full-x p15-grid flex-vertical-center'>

												<span> Add BP</span>
												<input type='range' ng-mouseup="animation.bp.add()" ng-model='animation.bp.newBpValue'> </input>
												<button class='bg-smoke txt-moxie'> Add </button>
											</li>
										</ul>
									</div>
									<div ng-if='tabIndex === 2'>
										<ul>
											<li ng-repeat='frame in animation.keys.frames' class='ugrid-2 ugrid-3 txt-1 flex-vertical-center'>
												<span> {{frame.percent}} </span>
											</li>
											<li class='full-x p15-grid flex-vertical-center'>

												<span> Add BP</span>
												<input type='range' ng-model='animation.key.frames'> </input>
												<button class='bg-smoke txt-moxie'> Add </button>
											</li>
										</ul>
									</div>
									<div ng-if='tabIndex === 3'>
										<ul>
											<li ng-repeat='point in bp.points' class='ugrid-2 flex-vertical-center'>
												<span> @T== </span>
											</li>
											<li class='full-x p15-grid flex-vertical-center'>

												<span> Add BP</span>
												<input type='range' ng-model='anim.bp.newBpValue'> </input>
												<button class='bg-smoke txt-moxie'> Add </button>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
			<!-- 	</div>
			</div> -->
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

	<!-- <div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 20%">
		<div class="state-timeline-info absolute z-index-999 radius-2 bg-moxie" style="padding:2px; bottom:15px; min-width:400px">
			<div class="bg-white radius-2">
				<h1 class="bg-moxie p05xy txt-16 semibold flex-space-between-start">
					<div>
						<span class="block">#element</span>
						<span class="block txt-14 opacity-50">2400</span>
					</div>
					<a class="state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/up.html'"> </a>
				</h1>
				<div class="state-timeline-preview fix-abs" style="min-height: 200px"></div>
				<ul class="txt-slate txt-14" style="padding:2px">
					<li class="flex-center-vertical" style="padding:2px">
						<div style="padding-right: 4px">translateX</div>
						<div class="full-x">
							<div class="relative height-02 round bg-slate-25p">
								<div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 20%"></div>
							</div>
						</div>
					</li>
				</ul>
				<div class="txt-slate txt-14 p05x hide" style="white-space:nowrap">
					<span>bounceInOut&nbsp;(400ms)</span>
				</div>
			</div>
		</div>
	</div>
	<div class="state-timeline-dot expected bg-moxie width-10 height-10 round absolute" style="margin-top: -4px; left: 67%">
		<div class="state-timeline-info absolute z-index-99 radius-2 bg-moxie" style="padding:2px; bottom:15px">
			<div class="bg-white radius-2">
				<h1 class="bg-moxie p05xy txt-16 semibold flex-space-between-start">
					<div>
						<span class="block">#element</span>
						<span class="block txt-14 opacity-50">2400</span>
					</div>
					<a class="state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/up.html'"> </a>
				</h1>
				<div class="state-timeline-preview fix-abs" style="min-height: 100px"></div>
				<div class="txt-slate txt-14 p05x" style="white-space:nowrap">
					<span>op:0 &rarr; op:1&nbsp;(400ms)</span>
				</div>
			</div>
		</div>
	</div>
	<div class="state-timeline-dot actual bg-crimson width-10 height-10 round absolute" style="margin-top: -4px; left: 78%">
		<div class="state-timeline-info absolute z-index-99 radius-2 bg-crimson" style="padding:2px; bottom:15px">
			<div class="bg-white radius-2">
				<h1 class="bg-crimson p05xy txt-16 semibold flex-space-between-start">
					<div>
						<span class="block">#element</span>
						<span class="block txt-14 opacity-50">2400</span>
					</div>
					<a class="state-timeline-info-expand flex-center svg-white svg-stroke-8 svg-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/up.html'"> </a>
				</h1>
				<div class="state-timeline-preview fix-abs" style="min-height: 100px"></div>
				<div class="txt-slate txt-14 p05x flex" style="white-space:nowrap">
					<span>op:0 &rarr; op:1&nbsp;(400ms)</span>
				</div>
			</div>
		</div>
	</div> -->
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