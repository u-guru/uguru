<div class="perspective-container full-xy flex-center p15xy">
	<a class="feature-tile"
		u
		init-with="p:[opacity:0]"
		on-init="s:[feature-bounce:self, feature-tile:children]"
		when-feature-bounce="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-mouseenter="s:[icon-wiggle:public]">
		<!-- on-mouseenter="s:[icon-wiggle:public]" -->
		<div class="feature-tile-icon">
			<div class="feature-tile-type bg-lake"
				u init-with="p:[transform:scale(0), tro:center center]"
				when-feature-tile="a:[bounceIn-subtle:1000:linear:0:1:f]:delay-1000"
				when-icon-wiggle="a:[wiggle-subtle:1000:linear:0:1:f]">
				<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				    <path d="M24.2468514,82.1914358 C18.6246851,82.1914358 14,77.5667506 14,71.9445844 L14,42.6549118 C14,37.0327456 18.6246851,32.4080605 24.2468514,32.4080605 L75.6624685,32.4080605 C81.2846348,32.4080605 85.9093199,37.0327456 85.9093199,42.6549118 L85.9093199,71.9445844 C86,77.5667506 81.3753149,82.1914358 75.6624685,82.1914358 L24.2468514,82.1914358 Z M14,66.3224181 L86,66.3224181 M41.1133501,54.534005 L58.8866499,54.534005 M27.8740554,32.1360202 L27.8740554,29.2342569 C27.8740554,22.97733 33.0428212,17.8085642 39.2997481,17.8085642 L60.790932,17.8085642 C67.0478589,17.8085642 72.2166247,22.97733 72.2166247,29.2342569 L72.2166247,32.1360202" fill="none"  stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
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
