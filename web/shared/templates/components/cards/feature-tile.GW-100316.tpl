<div class="perspective-container full-xy flex-center p15xy">
	<a class="feature-tile" u
		init-with="p:[opacity:0]"
		on-init="s:[feature-tile-init:public]"
		when-feature-tile-init="a:[bounceIn-subtle:1200:linear:0:1:f]"
		on-mouse-enter="s:[icon-wiggle:public]">
		<div class="feature-tile-icon">
			<div class="feature-tile-type bg-lake" ng-include="root.base_url + 'shared/templates/components/svg/main/briefcase.html'" u
				init-with="p:[opacity:0]"
				when-feature-tile-init="a:[bounceIn-subtle:1000:linear:1250:1:f]"
				when-icon-wiggle="a:[wiggle-subtle:1000:linear:0:1:f]"></div>
			<div class="feature-tile-thumb">
				<svg class="bg-white" viewBox="0 0 120 100" u
					init-with="p:[opacity:0]"
					when-feature-tile-init="a:[opacity:0:1:1000:easeOutSine:250:1:f]]">
					<rect x="0" y="0" width="120" height="100" fill="#40484B"
						init-with="p:[opacity:0]"
						when-feature-tile-init="a:[fadeInLeft:800:easeOutSine:500:1:f]"></rect>
					<rect x="0" y="0" width="40" height="100" fill="#7872e3"
						init-with="p:[opacity:0]"
						when-feature-tile-init="a:[fadeInLeft:400:easeOutSine:650:1:f]"></rect>
				</svg>
			</div>
		</div>
		<div class="feature-tile-text">
			<h2 u init-with="p:[opacity:0]"
				when-feature-tile-init="a:[opacity:0:1:1000:easeOutSine:650:1:f]">Guru Shops</h2>
			<p u init-with="p:[opacity:0]"
				when-feature-tile-init="a:[opacity:0:1:500:easeOutSine:850:1:f]">Lorem ipsum dolor sit amet, banana adipiscing </p>
		</div>
	</a>
</div>
