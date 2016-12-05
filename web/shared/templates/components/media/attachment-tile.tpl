<div class="perspective-container full-xy flex-center p15xy">
	<a class="attachment-tile overflow-hidden" style="width: 350px"
		u init-with="p:[op:0]"
		on-init="s:[attachment-tile-card:self, attachment-tile-enter:children]"
		when-attachment-tile-card="a:[bounceInUp-subtle:1000:linear:0:1:f]">
		<div class="attachment-tile-icon"
			u on-init="s:[attachment-icon-enter:depth(>1):1000]">
			<svg viewBox="0 0 100 100">
			    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M68,14 L68,28.0100002 C68,30.2099991 69.7917156,32 71.9947834,32 L86,32 L68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32" stroke="#f1f1f1" stroke-width="2" stroke-opacity="0.2" fill="none"></path>
					<path d="M68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32 L68,14 L68,14 Z" fill="#F25A5B"
						u init-with="p:[op:0]"
						when-attachment-icon-enter="a:[opacity:0:1:1000:easeOutSine:0:1:f]"></path>
					<path d="M68,14 L68,28.0052166 C68,30.2114745 69.7917156,32 71.9947834,32 L86,32 L68,14 Z" fill="#A25B5D"
						u init-with="p:[op:0]"
						when-attachment-icon-enter="a:[opacity:0:1:1000:easeOutSine:0:1:f]"></path>
					<g stroke-width="2">
						<path d="M68,14 L68,28.0100002 C68,30.2099991 69.7917156,32 71.9947834,32 L86,32 L68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32" stroke="#A25B5D"
							u init-with="p:[sda:306.6, sdo:306.6]"
							when-attachment-icon-enter="a:[stroke-dashoffset:306.6:0:750:easeOutSine:0:1:f]"></path>
				        <g stroke="#FFFFFF">
							<path d="M26,50 L26,78 L73,78"
								u init-with="p:[sda:75, sdo:75]"
								when-attachment-icon-enter="a:[stroke-dashoffset:75:0:500:easeOutSine:0:1:f]:delay-500"></path>
					        <path d="M26.0065349,27 L58.452381,27"
								u init-with="p:[sda:32.45, sdo:32.45]"
								when-attachment-icon-enter="a:[stroke-dashoffset:32.45:0:500:easeOutSine:0:1:f]:delay-500"></path>
					        <path d="M26.0065349,39 L73,39"
								u init-with="p:[sda:47, sdo:47]"
								when-attachment-icon-enter="a:[stroke-dashoffset:47:0:500:easeOutSine:0:1:f]:delay-500"></path>
					        <path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542"
								u init-with="p:[sda:77.98, sdo:77.98]"
								when-attachment-icon-enter="a:[stroke-dashoffset:77.98:0:500:easeOutSine:0:1:f]:delay-500"></path>
						</g>
					</g>
			    </g>
			</svg>
		</div>
		<div class="attachment-tile-desc">
			<h3 u init-with="p:[op:0]"
				when-attachment-tile-enter="a:[bounceInUp-subtle:1000:linear:1000:1:f]">ingredients.pdf</h3>
			<p u init-with="p:[op:0]"
				when-attachment-tile-enter="a:[bounceInUp-subtle:1000:linear:1100:1:f]">A list of my ingredients in case of allergies or other restrictions.</p>
		</div>
	</a>
</div>
