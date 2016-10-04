<div class="perspective-container full-xy flex-center">
	<div class="tooltip tooltip-top"
		u init-with="p:[transform-origin:center top, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot"
		u init-with="p:[transform-origin:center bottom, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>
</div>


<!-- <div class="perspective-container full-xy flex-center" types='top, bottom, left, right, line-top, line-bottom, line-left, line-right' default-type="line-right" reference="http://codepen.io/teamuguru/pen/0962d66493f8814b2a2f2ed830548022?editors=1100">
	<div class="tooltip tooltip-top" ng-if='activeType === "top"'
		u init-with="p:[transform-origin:center top, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot" ng-if='activeType === "bottom"'
		u init-with="p:[transform-origin:center bottom, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-left" ng-if='activeType === "left"'
		u init-with="p:[transform-origin:left center, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-right" ng-if='activeType === "right"'
		u init-with="p:[transform-origin:right center, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip-line tooltip-top" ng-if='activeType === "line-top"'>
		<span u init-with="p:[transform:scale(0)]"
			on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
			when-top-complete="a:[scale:1:0:450:easeInOutQuad:750:1:f]"></span>
		<div u init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="a:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeOutSine:450:1:f]"
			when-top-complete="a:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutQuad:450:1:f]">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:450:easeInOutQuad:250:1:f]"
				when-top-complete="a:[scaleX:1:0:450:easeInOutQuad:750:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInOutQuad:250:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInOutQuad:750:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:100:easeInOutQuad:450:1:f]"
				when-top-complete="a:[scaleY:1:0:100:easeInOutQuad:570:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:125:easeInQuad:570:1:f]"
				when-top-complete="a:[scaleY:1:0:125:easeInQuad:450:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInOutQuad:750:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInOutQuad:0:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInQuad:750:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInQuad:0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:125:easeInQuad:750:1:f]"
				when-top-complete="a:[scaleY:1:0:125:easeInQuad:450:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:100:easeOutQuad:450:1:f]"
				when-top-complete="a:[scaleY:1:0:100:easeOutQuad:570:1:f]"></div>
			<span u init-with="p:[opacity:0, transform:translateY(-10%)]"
				on-init="a:[opacity:0:1:500:easeInOutQuad:0:1:f, translateY:-10%:0%:500:easeInOutQuad:450:1:f]"
				when-top-complete="a:[opacity:1:0:500:easeInOutQuad:100:1:f, translateY:0%:-10%:500:easeInOutQuad:450:1:f]">This is a tip with a button.</span>
			<button class="bg-moxie"
				u init-with="p:[opacity:0, transform:translateY(-10px)]"
				on-init="a:[opacity:0:1:500:easeOutSine:100:1:f, translateY:-10px:0px:600:easeOutExpo:650:1:f]"
				on-click="s:[top-complete:public]"
				when-top-complete="a:[opacity:1:0:500:easeOutSine:100:1:f, translateY:0px:-10px:600:easeOutExpo:250:1:f]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-bot" ng-if='activeType === "line-bottom"'>
		<span u init-with="p:[transform:scale(0)]"
				on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
				when-bot-complete="a:[scale:1:0:150:easeOutSine:750:1:f]"></span>
		<div u init-with="p:[background:rgba(255#255#255#0)]"
		 		on-init="a:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeOutSine:450:1:f]"
				when-bot-complete="a:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeOutSine:450:1:f">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInOutSine:750:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:easeInOutSine:0:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="p:[scaleX:0:1:250:easeInOutSine:750:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:easeInOutSine:0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:125:easeInSine:570:1:f]"
				when-bot-complete="a:[scaleY:1:0:125:easeOutSine:450:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:100:easeOutSine:450:1:f]"
				when-bot-complete="a:[scaleY:1:0:100:easeInSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInOutSine:250:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:easeInOutSine:570:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:250:easeInOutSine:250:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:easeInOutSine:570:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:100:easeOutSine:450:1:f]"
				when-bot-complete="a:[scaleY:1:0:100:easeInSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:125:easeInSine:570:1:f]"
				when-bot-complete="a:[scaleY:1:0:125:easeOutSine:450:1:f]"></div>
			<span u init-with="p:[opacity:0, transform:translateY(10px)]"
				on-init="a:[opacity:0:1:1000:easeOutExpo:650:1:f, translateY:10px:0px:1000:easeOutExpo:650:1:f]"
				when-bot-complete="p:[opacity:1:0:500:easeInOutExp:650:1:f, translateY:0px:10px:500:easeInOutExpo:650:1:f]"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				u init-with="p:[opacity:0, transform:translateY(10px)]"
				on-init="a:[opacity:0:1:500:easeOutSine:550:1:f, translateY:10px:0px:600:easeOutExpo:450:1:f]"
				on-click="s:[bot-complete:public]"
				when-bot-complete="p:[opacity:1:0:500:easeOutSine:550:1:f, translateY:0px:10px:600:easeInOutExpo:450:1:f]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-left" ng-if='activeType === "line-left"'>
		<span u init-with="p:[transform:scale(0)]"
				on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
				when-left-complete="a:[scale:1:0:450:easeInOutSine:750:1:f]"></span>
		<div u init-with="p:[background:rgba(255#255#255#0)]"
		 		on-init="a:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeInOutSine:450:1:f]"
				when-left-complete="a:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutSine:450:1:f]">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:125:easeInSine:250:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:125:easeOutSine:375:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:easeInOutSine:570:1:f]"
				when-left-complete="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:easeInOutSine:570:1:f]"
				when-left-complete="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"></div>
			<div init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:125:easeOutSine:375:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
			<div init-with="p:[transform:scaleX(0)]"
				on-init="a:[scaleX:0:1:125:easeInSine:250:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
			<div init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
			<div init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
			<span init-with="p:[op:0, tr:translateX(-10px)]"
				on-init="p:[opacity:0:1:500:linear,transform:translateX(-10px):translateX(0px):500:easeInOutExpo]:delay-450"
				when-left-complete="p:[opacity:1:0:500:linear,transform:translateX(0px):translateX(-10px):500:easeInOutExpo]:delay-450"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateX(-10px)]"
				on-init="p:[opacity:0:1:500:easeOutSine:100, transform:translateX(-10px):translateX(0px):600:easeOutExpo]:delay-650"
				when-left-complete="p:[opacity:1:0:600:easeOutSine:100, transform:translateX(0px):translateX(-10px):600:easeOutExpo]:delay-650"
				on-click="s:[left-complete:public]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-right" ng-if='activeType === "line-right"'>
		<span init-with="p:[transform:scale(0)]"
				on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
				when-right-complete="a:[scale:1:0:450:easeInOutSine:750:1:f]"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeInOutSine]:delay-450"
			when-right-complete="p:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutSine]:delay-450">
				<div init-with="p:[transform:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-570"
					when-right-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
				<div init-with="p:[transform:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-450"
					when-right-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
				<div init-with="p:[transform:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-250"
					when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
				<div init-with="p:[transform:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-250"
					when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
				<div init-with="p:[transform:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-450"
					when-right-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
				<div init-with="p:[transform:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-570"
					when-right-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
				<div init-with="p:[transform:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-750"
					when-right-complete="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"></div>
				<div init-with="p:[transform:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-750"
					when-right-complete="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"></div>
			<span init-with="p:[op:0, tr:translateX(10px)]"
				on-init="p:[opacity:0:1:500:linear,transform:translateX(10px):translateX(0px):1000:easeOutExpo]:delay-450"
				when-right-complete="p:[opacity:1:0:500:linear,transform:translateX(0px):translateX(10px):1000:easeOutExpo]:delay-450">This is a tip with a button.</span>
			<button class="bg-moxie" init-with="p:[op:0, tr:translateX(10px)]"
				on-init="p:[opacity:0:1:500:easeOutSine:100, transform:translateX(10px):translateX(0):600:easeInOutExpo]:delay-650"
				on-click="s:[right-complete:public]"
				when-right-complete="p:[opacity:1:0:500:easeOutSine:100, transform:translateX(0px)translateX(10px):600:easeOutExpo]:delay-650">Okay</button>
		</div>
	</div>
</div> -->
