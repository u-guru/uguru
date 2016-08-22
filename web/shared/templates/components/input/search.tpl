
<inspector-gadget show-log="false" ball-color="smoke" reverse-speed="10" speed="0.5x" class="bottom-0 bg-azure" auto-play="false" step-size="100" play-infinite="false" > </inspector-gadget>
<div class="perspective-container full-xy flex-center p15xy">
	<!-- transition-free -->
	<fieldset class="search-bar"
		init-with="p:[op:0, width:48px]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | s:[search-bar-init:public]"
		inspector-elem="when-search-bar-clicked"
		when-search-bar-clicked="p:[width:48px:500px:250:easeOutBack]"
		on-click="s:[search-bar-clicked:public]"
		>
		<div>
			<label for="search-bar"
				init-default>
				<svg viewBox="0 0 100 100">
			        <path d="M62.994485,62.994485 L85.6624699,85.6624699"
						init-with="p:[sda:32.06, sdo:32.06]"
						when-search-bar-init="p:[stroke-dashoffset:32.06:0:200:easeOutSine]:delay-750"></path>
			        <circle cx="42.5" cy="42.5" r="28.5"
						init-with="p:[sda:179.07, sdo:179.07, t:stroke-dashoffset 250ms ease-out]"
						when-search-bar-init="p:[stroke-dashoffset:179.07:0:200:easeOutSine]:delay-500"></circle>
				</svg>
			</label>

			<input id="search-bar" placeholder="Filter" value=""
				init-with="p-op"
				when-search-bar-clicked="p:[opacity:0:1:250:easeOutSine]:delay-250"/>
		</div>
	</fieldset>
</div>
