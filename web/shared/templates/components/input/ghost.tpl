<div class="perspective-container full-xy flex-center p15xy">
	<div class="tag-adlib-container overflow-hidden"
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | s:[tag-adlib-init]">
		<a class="tag-adlib tag-household">
			<svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
				<rect x="2" y="2" width="280" height="84" rx="16"
					init-with="p:[sdo:728, sda:728]"
					when-tag-adlib-init="p:[stroke-dashoffset:728:0:500:easeOutSine]:delay-250"></rect>
			</svg>
			<svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
				<rect x="2" y="2" width="256" height="72" rx="16"></rect>
			</svg>
			<b init-with="p-op"
				when-tag-adlib-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
				<i>adlib tag</i>
			</b>
		</a>
		<span class="tag-adlib ghost active-ghost"
			init-with="p-op">
			<svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
				<rect x="2" y="2" width="280" height="84" rx="16"></rect>
			</svg>
			<svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
				<rect x="2" y="2" width="256" height="72" rx="16"></rect>
			</svg>
		</span>
	</div>
</div>
