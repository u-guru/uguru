<div class="perspective-container full-xy flex-center p15xy">
	<div class="tag-adlib-container overflow-hidden"
		u init-with="p:[op:0]"
		on-init="a:[bounceIn-subtle:1000:linear:0:1:f] | s:[tag-adlib-init:>c]">
		<a class="tag-adlib tag-household">
			<svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
				<rect x="2" y="2" width="280" height="84" rx="16"
					u init-with="p:[sdo:728, sda:728]"
					when-tag-adlib-init="a:[stroke-dashoffset:728:0:500:easeOutSine:250:1:f]"></rect>
			</svg>
			<svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
				<rect x="2" y="2" width="256" height="72" rx="16"></rect>
			</svg>
			<b u init-with="p:[op:0]"
				when-tag-adlib-init="a:[slideInUp-subtle:1000:linear:250:1:f]">
				<i>adlib tag</i>
			</b>
		</a>
		<span class="tag-adlib ghost active-ghost"
			u init-with="p:[op:0]">
			<svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
				<rect x="2" y="2" width="280" height="84" rx="16"></rect>
			</svg>
			<svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
				<rect x="2" y="2" width="256" height="72" rx="16"></rect>
			</svg>
		</span>
	</div>
</div>
