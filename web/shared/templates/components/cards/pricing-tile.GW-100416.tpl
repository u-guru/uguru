<div class="perspective-container full-xy flex-center p15xy bg-smoke" types='default, alert' default-type="default">
	<div class="pricing-tile" ng-if='activeType === "default"'
		u init-with="p:[opacity:0, transform-origin:center center]"
		on-init="s:[pricing-tile-init:public] | a:[frame-enter:1000:linear:0:1:f]">
		<h3>Our Fees</h3>
		<h2 u init-with="p:[opacity:0]"
			when-pricing-tile-init="a:[fadeInDown:1000:(.8,.1,1,.05):500:1:f]">&le; 5%</h2>
			<!-- For final version, have count up directive for the 5% -->
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
	<div class="pricing-tile alert" ng-if='activeType === "alert"'
		u init-with="p:[opacity:0, transform-origin:center center]"
		on-init="s:[pricing-tile-init:public] | a:[frame-enter:1000:linear:0:1:f]">
		<h3>Our Fees</h3>
		<h2	u init-with="p:[opacity:0]"
			when-pricing-tile-init="a:[fadeInDown:1000:(.8,.1,1,.05):500:1:f]">&le; 5%</h2>
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
</div>
