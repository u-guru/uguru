<div class="perspective-container full-xy flex-center p15xy">
	<!-- needs color directives -->
	<a class="feature-tile"
		u init-with="p:[opacity:0]"
		on-init="s:[feature-tile:children, feature-tile-enter:self]"
		when-feature-tile-enter="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-mouseenter="s:[icon-wiggle:public]">
		<div class="feature-tile-icon">
			<div class="feature-tile-type bg-lake"
				u init-with="p:[transform:scale(0), tro:center center]"
				when-feature-tile="a:[bounceIn-subtle:1000:linear:0:1:f]:delay-1000"
				when-icon-wiggle="a:[wiggle-subtle:1000:linear:0:1:f]">
				<graphic url='shared/templates/components/svg/main/briefcase.html'></graphic>
			</div>
			<div class="feature-tile-thumb">
				<svg class="bg-white" viewBox="0 0 120 100"
					u init-with="p:[opacity:0]"
					when-feature-tile="a:[opacity:0:1:1000:easeOutSine:0:1:f]"
					on-init="s:[feature-tile-thumb:children:easeOutExpo-650]">
					<rect x="0" y="0" width="120" height="100" fill="#40484B"
						u init-with="p:[opacity:0, transform:translateX(-30px)]"
						when-feature-tile-thumb="a:[translateX:-30px:0px:400:easeOutSine:100:1:f] | p:[op:1]"></rect>
					<rect x="0" y="0" width="40" height="100" fill="#7872e3"
						u init-with="p:[opacity:0, transform:translateX(-30px)]"
						when-feature-tile-thumb="a:[translateX:-30px:0px:200:easeOutSine:100:1:f] | p:[op:1]"></rect>
				</svg>
			</div>
		</div>
		<div class="feature-tile-text">
			<h2 u init-with="p:[opacity:0]"
				when-feature-tile="a:[opacity:0:1:1000:easeOutSine:400:1:f]">Guru Shops</h2>
			<p u init-with="p:[opacity:0]"
				when-feature-tile="a:[opacity:0:1:500:easeOutSine:600:1:f]">Lorem ipsum dolor sit amet, banana adipiscing </p>
		</div>
	</a>
</div>
