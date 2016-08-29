<div class="full-xy flex-center bg-smoke txt-slate" types='gabrie, jeselle' default-type="gabrie">
	<ul class="p15-grid full-x" ng-if='activeType === "gabrie"'>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:10px:0px:1000:easeOutElastic]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:10px:0px:1000:easeOutBounce]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:10px:0px:1000:easeOutBack]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:-10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:-10px:0px:1000:easeOutElastic]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:-10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:-10px:0px:1000:easeOutBounce]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:-10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:-10px:0px:1000:easeOutBack]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<h1 class="semibold"
					init-with="p:[letter-spacing:10px, op:0]"
					on-click="p:[opacity:0:1:1000:easeOutSine, letter-spacing:10px:0px:1000:easeInElastic]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<div init-with="p:[op:1]"
					on-click="p:[opacity:1:0:1000:easeOutSine]:delay-250">
					<h1 class="semibold"
						init-with="p:[letter-spacing:0px, op:1]"
						on-click="p:[letter-spacing:0px:10px:1000:easeInElastic]">The quick brown fox jumps over the lazy dog.</h1>
				</div>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<div init-with="p:[op:1]"
					on-click="p:[opacity:1:0:1000:easeOutSine]:delay-250">
					<h1 class="semibold"
						init-with="p:[letter-spacing:0px, op:1]"
						on-click="p:[letter-spacing:0px:10px:1000:easeInBounce]">The quick brown fox jumps over the lazy dog.</h1>
				</div>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy txt-slate">
				<div init-with="p:[op:1]"
					on-click="p:[opacity:1:0:1000:easeOutSine]:delay-250">
					<h1 class="semibold"
						init-with="p:[letter-spacing:0px, op:1]"
						on-click="p:[letter-spacing:0px:10px:1000:easeInBack]">The quick brown fox jumps over the lazy dog.</h1>
				</div>
			</div>
		</li>
		<li>
			<div class="bg-slate-05p radius-2 p05xy">
				<!-- @samir, color should be 100ms long but is visually 1000ms long. Try switching the letter-spacing and color around to see the difference. -->
				<h1 class="semibold"
					init-with="p:[letter-spacing:0px, color:#40484b]"
					on-click="p:[letter-spacing:0px:10px:1000:easeInBack:0, color:#40484b:#FFFFFF:100:easeOutSine:0]">The quick brown fox jumps over the lazy dog.</h1>
			</div>
		</li>
	</ul>
	<ul class="p15-grid full-x" ng-if='activeType === "jeselle"'>
		<li class="txt-center">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeOutExpo]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-center">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeInOutBack]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-left">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeInElastic]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-left">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:1000:easeInBounce]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-left">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeOutCirc]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-right">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeOutBounce]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-right">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:0px:500:easeInElastic]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-center">
			<h1 class="semibold"
				init-with="p:[letter-spacing:1px, op:1]"
				on-click="p:[letter-spacing:1px:20px:3000:easeInOutCubic, opacity:1:0:100:easeInOutCubic]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
		<li class="txt-center">
			<h1 class="semibold"
				init-with="p:[letter-spacing:15px]"
				on-click="p:[letter-spacing:15px:3px:500:easeOutBounce]">The quick brown fox jumps over the lazy dog.</h1>
		</li>
	</ul>
</div>
