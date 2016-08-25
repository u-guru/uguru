<div class="perspective-container full-xy flex-wrap-center" types='default, ghost-round, ghost-square, split' default-type="default" reference="http://codepen.io/teamuguru/pen/6018db762fec392ead23dceab1584aab?editors=1100">
	<button class="btn-default bg-moxie radius-2 normal p30x" ng-if='activeType === "default"'
		init-with="p-op"
		on-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span>Default button</span>
	</button>

	<button class="btn-ghost-round bg-white" ng-if='activeType === "ghost-round"'
		init-with="p-op"
		on-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]">
		<span></span>
		<span>Ghost round</span>
	</button>

	<button class="btn-ghost-square btn-ghost bg-white" ng-if='activeType === "ghost-square"'
		init-default
		on-init="s:[btn-ghost-sq-init:public]">
		<span init-with="p:[tr:scaleX(0)]"
			when-btn-ghost-sq-init="p:[transform:scaleX(0):scaleX(1):150:easeOutSine]"></span>
		<span init-with="p:[tr:scaleY(0)]"
			when-btn-ghost-sq-init="p:[transform:scaleY(0):scaleY(1):150:easeOutSine]:delay-150"></span>
		<span init-with="p:[tr:scaleX(0)]"
			when-btn-ghost-sq-init="p:[transform:scaleX(0):scaleX(1):150:easeOutSine]:delay-300"></span>
		<span init-with="p:[tr:scaleY(0)]"
			when-btn-ghost-sq-init="p:[transform:scaleY(0):scaleY(1):150:easeOutSine]:delay-450"></span>
		<span></span>
		<span init-with="p-op"
			when-btn-ghost-sq-init="p:[opacity:0:1:100:easeOutSine]:delay-600">Ghost square</span>
	</button>

	<button class="btn-split-slate" ng-if='activeType === "split"'>
		<span init-with="p-op"
			on-init="a:[split-button:set:(dur:1000ms#func:linear):in:delay-800]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:500:easeInOutSine]:delay-1000">Split button</span>
		</span>
		<span init-with="p-op"
			on-init="a:[split-button:set:(dur:1000ms#func:linear):in:delay-800]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:500:easeInOutSine]:delay-1000">$40</span>
		</span>
	</button>
</div>
