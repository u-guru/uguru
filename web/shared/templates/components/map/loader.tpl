<div class="echo-loader-container"
	init-with="p:[z-index:2]">
	<!-- when-search-school-complete="p:[z-index:-1:delay-500, opacity:1:0:500:easeOutSine]:delay-2000" -->
	<svg class="echo-loader" width="300px" height="300px" viewBox="0 0 300 300"
		u on-init="s:[search-school-init:public]">
		<g fill="none">
			<g u init-with="p:[tro:center center]"
				when-search-school-init="a:[ping:1500:easeInOutSine:0:10:f]">
				<circle class="echo-loader-echo"
					stroke="#69B3A5" fill-opacity="0.2" fill="#69B3A5"
					cx="150" cy="150" r="50"
					u when-search-school-init="a:[echo-loader-main:4500:linear:0:1:f]"
					when-search-school-complete="p:[sdo:0, stroke:rgba(247,205,88,1)]:delay-2500"></circle>
			</g>
			<circle class="echo-loader-track"
				stroke-opacity="0.4" stroke="#FFFFFF" stroke-width="2" fill="#40484B"
				cx="150" cy="150" r="100"></circle>
			<path d="M150,250 C205.228475,250 250,205.228475 250,150 C250,94.771525 205.228475,50 150,50 C94.771525,50 50,94.771525 50,150 C50,205.228475 94.771525,250 150,250 L150,250 Z"
				class="echo-loader-main"
				stroke="#69B3A5" stroke-width="2"
				u init-with="p:[sda:629, sdo:629]"
				when-search-school-init="a:[echo-loader-main:4500:linear:0:1:f] | s:[search-school-complete:public]:delay-2500"
				when-search-school-complete="p:[sdo:0, stroke:rgb(247,205,88,1)]:delay-2500"></path>
		</g>
	</svg>
</div>
