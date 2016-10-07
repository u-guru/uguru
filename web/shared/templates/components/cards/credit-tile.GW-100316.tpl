<div class="perspective-container full-xy flex-center p15xy"
	u on-init="s:[credit-tile-load:public]">
	<div class="credit-tile bg-cobalt"
		u init-with="p:[opacity:0.1]"
		on-mouse-leave="s:[credit-tile-load:self]"
		when-credit-tile-load="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-mouse-enter="s:[icon-wiggle:public]">
		<ul>
			<li class="top">
				<h2 u init-with="p:[opacity:0]"
					when-credit-tile-load="a:[popup-header-enter:800:linear:500:1:f]">Starter</h2>
				<svg viewBox="0 0 100 100">
					<path d="M18,35.9241161 C18,33.7138926 19.789271,31.9221524 21.992559,31.9221524 L79.007441,31.9221524 C81.2124705,31.9221524 83,33.7135616 83,35.9241161 L83,43.9432546 C83,46.1534782 81.210729,47.9452184 79.007441,47.9452184 L21.992559,47.9452184 C19.7875295,47.9452184 18,46.1538092 18,43.9432546 L18,35.9241161 Z M74.0353197,47.9726092 C74.0353197,47.9726092 74.0353197,49.75446 74.0353197,51.967453 L74.0353197,81.9777654 C74.0353197,84.1840567 72.2453037,85.9726092 70.0404691,85.9726092 L28.9595309,85.9726092 C26.7532358,85.9726092 24.9646803,84.1907584 24.9646803,81.9777654 L24.9646803,47.9726092 M50,32.5 L50,85.5 M50.0036528,30.5727978 C49.8937891,22.9747016 52.2826875,18.9104187 54.4018461,16.1704732 C56.0986237,13.9766413 59.9416412,13.1502563 62.5358793,15.0912829 C65.1301174,17.0323095 64.6365984,20.7630907 62.5358793,23.1724961 C60.1581937,25.8995664 56.3625396,28.1647902 50.0036528,30.5727978 Z M50,30.5727978 C50.1098637,22.9747016 47.7209653,18.9104187 45.6018066,16.1704732 C43.9050291,13.9766413 40.0620115,13.1502563 37.4677734,15.0912829 C34.8735353,17.0323095 35.3670543,20.7630907 37.4677734,23.1724961 C39.8454591,25.8995664 43.6411131,28.1647902 50,30.5727978 Z M46.5,30 C46.5,30 43.9668578,27.6098322 35.4798086,25.2249928 C26.9927594,22.8401534 22.7515469,23.0023244 20.5,23.0023244 M53.5,30 C53.5,30 56.0331422,27.6098322 64.5201914,25.2249928 C73.0072406,22.8401534 77.2484531,23.0023244 79.5,23.0023244" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" u
						init-with="p:[stroke-dashoffset:481, stroke-dasharray:481, transform-origin:center center]"
						when-credit-tile-load="a:[stroke-dashoffset:481:0:1500:easeOutSine:500:1:f]"
						when-icon-wiggle="a:[wiggle-subtle:750:easeInOutSine:0:1:f]">
						</path>
				</svg>
			</li>
			<li class="bottom">
				<h1>50 Credits</h1>
				<button class="btn-split">
					<span u init-with="p:[opacity:0]"
						when-credit-tile-load="a:[split-button:1000:linear:1000:1:f]">
						<span u init-with="p:[opacity:0]"
							when-credit-tile-load="a:[opacity:0:1:500:easeInOutSine:1200:1:f]">Split button</span>
					</span>
					<span u init-with="p:[opacity:0]"
						when-credit-tile-load="a:[split-button:1000:linear:1000:1:f]">
						<span u init-with="p:[opacity:0]"
							when-credit-tile-load="a:[opacity:0:1:500:easeInOutSine:1200:1:f]">$40</span>
					</span>
				</button>
			</li>
		</ul>
	</div>
</div>
