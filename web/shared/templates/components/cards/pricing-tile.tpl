<div class="perspective-container full-xy flex-center p15xy bg-smoke" types='default, alert' default-type="alert">
	<div class="pricing-tile" ng-show='activeType === "default"'
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[pricing-tile-init:children, start-counter:public:1500] | a:[frame-enter:1000:linear:0:1:f]">
		<!-- on-init="s:[pricing-tile-init:public] | a:[frame-enter:1000:linear:0:1:f]" -->
		<h3>Our Fees</h3>
		<h2 u init-with="p:[op:0, tro:center center]"
			when-pricing-tile-init="a:[fadeInDown:1000:(.8,.1,1,.05):500:1:f]">
			<div>&le;&nbsp;</div>
			<div u when-start-counter="a:[counter:100:5:4000:easeOutCirc:0:1:f]">100</div>
			<div>%</div>
		</h2>
			<!-- For final version, have count up directive for the 5%
			 	when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"
			 	ng-repeat='counter in ["1%", "2%", "3%"]'-->
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>

	<div class="pricing-tile alert" ng-show='activeType === "alert"'
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[pricing-tile-init:children, alert-counter:public:1000] | a:[frame-enter:1000:linear:0:1:f]">
		<h3>Our Fees</h3>
		<h2 u init-with="p:[op:0, tro:center center]"
			when-pricing-tile-init="a:[fadeInDown:1000:(.8,.1,1,.05):500:1:f]">
			<div>&le;&nbsp;</div>
			<div u when-alert-counter="a:[counter:100:5:4000:easeOutCirc:0:1:f]">100</div>
			<div>%</div>
		</h2>
		<!-- <h2 u init-with="p:[opacity:0]"
			when-pricing-tile-init="a:[fadeInDown:1000:(.8,.1,1,.05):500:1:f]"
			when-alert-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"
			ng-repeat='counter in ["1%"]'>&le; 5%</h2> -->
		<span>Guaranteed Lowest</span>
		<svg viewBox="0 0 150 200" preserveAspectRatio="none">
			<path d="M0,0 L150,0 L150,50 L0,150 L0,0 Z"></path>
		</svg>
	</div>
</div>
