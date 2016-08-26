<div class="perspective-container full-xy flex-center" types='top, bottom, left, right, line-top, line-bottom, line-left, line-right' default-type="line-right" reference="http://codepen.io/teamuguru/pen/0962d66493f8814b2a2f2ed830548022?editors=1100">
	<div class="tooltip tooltip-top" ng-if='activeType === "top"'
		init-with="p:[tro:center top, op:0]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot" ng-if='activeType === "bottom"'
		init-with="p:[tro:center bottom, op:0]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-left" ng-if='activeType === "left"'
		init-with="p:[tro:left center, op:0]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-right" ng-if='activeType === "right"'
		init-with="p:[tro:right center, op:0]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip-line tooltip-top" ng-if='activeType === "line-top"'>
		<span init-with="p:[tr:scale(0)]"
			on-init="p:[transform:scale(0):scale(1):150:easeOutSine]"
			when-top-complete="p:[transform:scale(1):scale(0):450:easeInOutQuad]:delay-750"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeOutSine]:delay-450"
			when-top-complete="p:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutQuad]:delay-450">
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutQuad]:delay-250"
				when-top-complete="p:[transform:scaleX(1):scaleX(0):250:easeInOutQuad]:delay-750"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutQuad]:delay-250"
				when-top-complete="p:[transform:scaleX(1):scaleX(0):250:easeInOutQuad]:delay-750"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):100:easeInOutQuad]:delay-450"
				when-top-complete="p:[transform:scaleY(1):scaleY(0):100:easeInOutQuad]:delay-570"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):125:easeInQuad]:delay-570"
				when-top-complete="p:[transform:scaleY(1):scaleY(0):125:easeInOutQuad]:delay-450"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutQuad]:delay-750"
				when-top-complete="p:[transform:scaleX(1):scaleX(0):250:easeInOutQuad]"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInQuad]:delay-750"
				when-top-complete="p:[transform:scaleX(1):scaleX(0):250:easeInQuad]"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):125:easeInQuad]:delay-750"
				when-top-complete="p:[transform:scaleY(1):scaleY(0):125:easeInQuad]:delay-450"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):100:easeOutQuad]:delay-450"
				when-top-complete="p:[transform:scaleY(1):scaleY(0):100:easeOutQuad]:delay-570"></div>
			<span init-with="p:[op:0, tr:translateY(-10%)]"
				on-init="p:[opacity:0:1:500:easeInOutQuad, transform:translateY(-10%):translateY(0%):500:easeInOutQuad]:delay-450"
				when-top-complete="p:[opacity:1:0:500:easeInOutQuad:delay-100, transform:translateY(0%):translateY(-10%):500:easeInOutQuad]:delay-450]">This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateY(-10px)]"
				on-init="p:[opacity:0:1:800:easeInOutExpo:delay-100, transform:translateY(-10px):translateY(1px):800:easeOutExpo]:delay-650"
				on-click="send:[top-complete:public]"
				when-top-complete="p:[opacity:1:0:800:easeInOutExpo:delay-100, transform:translateY(0px):translateY(-10px):800:easeOutExpo]:delay-250">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-bot" ng-if='activeType === "line-bottom"'>
		<span init-with="p:[tr:scale(0)]"
				on-init="p:[transform:scale(0):scale(1):150:easeOutSine]"
				when-bot-complete="p:[transform:scale(1):scale(0):150:easeOutSine]:delay-750"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 		on-init="p:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeOutSine]:delay-450"
				when-bot-complete="p:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeOutSine]:delay-450">
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutSine]:delay-750"
				when-bot-complete="p:[tr:scaleX(1):scaleX(0):250:easeInOutSine]"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutSine]:delay-750"
				when-bot-complete="p:[tr:scaleX(1):scaleX(0):250:easeInOutSine]"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):125:easeInSine]:delay-570"
				when-bot-complete="p:[transform:scaleY(1):scaleY(0):125:easeOutSine]:delay-450"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):100:easeOutSine]:delay-450"
				when-bot-complete="p:[transform:scaleY(1):scaleY(0):100:easeInSine]:delay-375"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutSine]:delay-250"
				when-bot-complete="p:[tr:scaleX(1):scaleX(0):250:easeInOutSine]:delay-570"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeInOutSine]:delay-250"
				when-bot-complete="p:[tr:scaleX(1):scaleX(0):250:easeInOutSine]:delay-570"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):100:easeOutSine]:delay-450"
				when-bot-complete="p:[transform:scaleY(1):scaleY(0):100:easeInSine]:delay-375"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):125:easeInSine]:delay-570"
				when-bot-complete="p:[transform:scaleY(1):scaleY(0):125:easeOutSine]:delay-450"></div>
			<span init-with="p:[op:0, tr:translateY(10px)]"
			on-init="p:[opacity:0:1:1000:easeOutExpo, transform:translateY(10px):translateY(0px):1000:easeOutExpo]:delay-650"
				when-bot-complete="p:[opacity:1:0:500:easeInOutExp,transform:translateY(0px):translateY(10px):500:easeInOutExpo]:delay-650"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateY(10px)]"
				on-init="p:[opacity:0:1:600:linear, transform:translateY(10px):translateY(0px):600:easeInOutExpo]:delay-450"
				on-click="send:[bot-complete:public]"
				when-bot-complete="p:[opacity:1:0:1000:easeInOutExpo, transform:translateY(0px):translateY(10px):1000:easeInOutExpo]:delay-450">Okay</button>
				<!-- Note: Still too snappy -->
		</div>
	</div>

	<div class="tooltip-line tooltip-left" ng-if='activeType === "line-left"'>
		<span init-with="p:[tr:scale(0)]"
				on-init="p:[transform:scale(0):scale(1):150:easeOutSine]"
				when-left-complete="p:[transform:scale(1):scale(0):450:easeInOutSine]:delay-750"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 		on-init="p:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeInOutSine]:delay-450"
				when-left-complete="p:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutSine]:delay-450">
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-250"
				when-left-complete="p:[transform:scaleX(1):scaleX(0):125:easeOutSine]:delay-375"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-375"
				when-left-complete="p:[transform:scaleX(1):scaleX(0):125:easeInSine]:delay-250"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-570"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-570"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-375"
				when-left-complete="p:[transform:scaleX(1):scaleX(0):125:easeInSine]:delay-250"></div>
			<div init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-250"
				when-left-complete="p:[transform:scaleX(1):scaleX(0):125:easeOutSine]:delay-375"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
			<div init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"
				when-left-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
			<span init-with="p:[op:0, tr:translateX(-10px)]"
				on-init="p:[opacity:0:1:500:linear,transform:translateX(-10px):translateX(0px):500:easeInOutExpo]:delay-450"
				when-left-complete="p:[opacity:1:0:500:linear,transform:translateX(0px):translateX(-10px):500:easeInOutExpo]:delay-450"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateX(-10px)]"
				on-init="p:[opacity:0:1:600:linear,transform:translateX(-10px):translateX(0px):1000:easeOutExpo]:delay-650"
				when-left-complete="p:[opacity:1:0:600:linear,transform:translateX(0px):translateX(-10px):1000:easeOutExpo]:delay-650"
				on-click="send:[left-complete:public]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-right" ng-if='activeType === "line-right"'>
		<span init-with="p:[tr:scale(0)]"
				on-init="p:[transform:scale(0):scale(1):150:easeOutSine]"
				when-right-complete="p:[transform:scale(1):scale(0):450:easeInOutSine]:delay-750"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0):rgba(255#255#255#0.9):500:easeInOutSine]:delay-450"
			when-right-complete="p:[background:rgba(255#255#255#0.9):rgba(255#255#255#0):500:easeInOutSine]:delay-450">
				<div init-with="p:[tr:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-570"
					when-right-complete="p:[transform:scaleX(1):scaleX(0):125:easeInSine]:delay-250"></div>
				<div init-with="p:[tr:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-450"
					when-right-complete="p:[transform:scaleX(1):scaleX(0):125:easeOutSine]:delay-375"></div>
				<div init-with="p:[tr:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-250"
					when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
				<div init-with="p:[tr:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-250"
					when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-500"></div>
				<div init-with="p:[tr:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeInSine]:delay-450"
					when-right-complete="p:[transform:scaleX(1):scaleX(0):125:easeOutSine]:delay-375"></div>
				<div init-with="p:[tr:scaleX(0)]"
					on-init="p:[transform:scaleX(0):scaleX(1):125:easeOutSine]:delay-570"
					when-right-complete="p:[transform:scaleX(1):scaleX(0):125:easeInSine]:delay-250"></div>
				<div init-with="p:[tr:scaleY(0)]"
					on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-750"
					when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"></div>
				<div init-with="p:[tr:scaleY(0)]"
						on-init="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]:delay-750"
						when-right-complete="p:[transform:scaleY(0):scaleY(1):250:easeInOutSine]"></div>
			<span init-with="p:[op:0, tr:translateX(10px)]"
				on-init="p:[opacity:0:1:500:linear,transform:translateX(10px):translateX(0px):1000:easeOutExpo]:delay-450"
				when-right-complete="p:[opacity:1:0:500:linear,transform:translateX(0px):translateX(10px):1000:easeOutExpo]:delay-450">This is a tip with a button.</span>
			<button class="bg-moxie" init-with="p:[op:0, tr:translateX(10px)]"
				on-init="p:[opacity:0:1:300:linear,transform:translateX(10px):translateX(0):1000:easeInOutExpo]:delay-650"
				on-click="send:[right-complete:public]"
				when-right-complete="p:[opacity:1:0:500:linear,transform:translateX(0px)translateX(10px):1000:easeOutExpo]:delay-650">Okay</button>
		</div>
	</div>
</div>
