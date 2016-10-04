<div class="perspective-container full-xy flex-center p15xy">
	<a class="feature-tile"
		init-with="p-op"
		on-init="s:[feature-tile-init:public]"
		when-feature-tile-init="a:[bounceIn-subtle:set:(dur:1200ms#func:linear):in]"
		on-mouse-enter="s:[icon-wiggle:public]">
		<div class="feature-tile-icon">
			<div class="feature-tile-type bg-lake" ng-include="root.base_url + 'shared/templates/components/svg/main/briefcase.html'"
				u init-with="p:[opacity:0]"
				on-init="a:[bounceIn-subtle:1000:linear:250:1:f]"
				on-mouse-enter="a:[wiggle-subtle:1000:linear:0:1:f]"></div>
			<div class="feature-tile-thumb">
				<svg class="bg-white" viewBox="0 0 120 100"
					init-with="p-op"
					when-feature-tile-init="p:[opacity:0:1:1000:easeOutSine]:delay-250]">
					<rect x="0" y="0" width="120" height="100" fill="#40484B"
						init-with="p-op"
						when-feature-tile-init="a:[fadeInLeft::set:(dur:800ms#func:ease-out):in:delay-500]"></rect>
					<rect x="0" y="0" width="40" height="100" fill="#7872e3"
						init-with="p-op"
						when-feature-tile-init="a:[fadeInLeft:set:(dur:400ms#func:ease-out):in:delay-650]"></rect>
				</svg>
			</div>
		</div>
		<div class="feature-tile-text">
			<h2 init-with="p-op"
				when-feature-tile-init="p:[opacity:0:1:1000:easeOutSine]:delay-650">Guru Shops</h2>
			<p init-with="p-op"
				when-feature-tile-init="p:[opacity:0:1:500:easeOutSine]:delay-850">Lorem ipsum dolor sit amet, banana adipiscing </p>
		</div>
	</a>
</div>
