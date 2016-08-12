<div class="perspective-container full-xy flex-center p15xy bg-smoke" types='default, alert' default-type="default">
	<div class="pricing-tile" ng-if='activeType === "default"'
		init-with="p:[op:0, tro:center center]"
		on-init="a:[frame-enter:set:(dur:1000ms#func:linear):in]">
		<h3>Our Fees</h3>
		<h2
			init-with="p-op"
			on-init="a:[fadeInDown:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-500]">&le; 5%</h2>
			<!-- For final version, have count up directive for the 5% -->
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
	<div class="pricing-tile alert" ng-if='activeType === "alert"'
		init-with="p:[op:0, tro:center center]"
		on-init="a:[frame-enter:set:(dur:1000ms#func:linear):in]">
		<h3>Our Fees</h3>
		<h2	init-with="p-op"
			on-init="a:[fadeInDown:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-500]">&le; 5%</h2>
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
</div>
