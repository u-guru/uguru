<div class="perspective-container full-xy flex-center p15xy" types='left-hover, bottom-hover, top-default, right-default' default-type="right-default">
	<a class="badge-container click" ng-if='activeType === "left-hover"'>
		<span class="badge-left bg-moxie"
			init-with="p:[tro:right center, op:0]"
			on-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:250:easeOutSine]:delay-450">1</span>
		</span>
		<span init-with="p-op"
			on-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">Messages</span>
	</a>

	<a class="badge-container click" ng-if='activeType === "bottom-hover"'>
		<span init-with="p-op"
			on-init="a:[bounceInDown-subtle:set:(dur:1000ms#func:linear):in]">Students</span>
		<span class="badge-bottom bg-robin"
			init-with="p:[tro:center top, op:0]"
			on-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:250:easeOutSine]:delay-450">4</span>
		</span>
	</a>

	<div class="badge-container" ng-if='activeType === "top-default"'>
		<span class="badge-top bg-orange"
			init-with="p:[tro:center bottom, op:0]"
			on-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:250:easeOutSine]:delay-450">6</span>
		</span>
		<span init-with="p-op"
			on-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]">Reviews</span>
	</div>

	<div class="badge-container" ng-if='activeType === "right-default"'>
		<span init-with="p-op"
			on-init="a:[bounceInLeft-subtle:set:(dur:1000ms#func:linear):in]">Gurus</span>
		<span class="badge-right bg-cobalt"
			init-with="p:[tro:left center, op:0]"
			on-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:250:easeOutSine]:delay-450">3</span>
		</span>
	</div>
</div>
