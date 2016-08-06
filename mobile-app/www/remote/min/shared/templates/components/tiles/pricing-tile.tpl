<div class="perspective-container full-xy flex-center p15xy bg-smoke" types='default, alert' default-type="default">
	<div class="pricing-tile" ng-if='activeType === "default"'>
		<h3>Our Fees</h3>
		<h2>&le; 5%</h2>
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
	<div class="pricing-tile alert" ng-if='activeType === "alert"'>
		<h3>Our Fees</h3>
		<h2>&le; 5%</h2>
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
</div>
