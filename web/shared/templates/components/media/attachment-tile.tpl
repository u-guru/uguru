<div class="perspective-container full-xy flex-center p15xy">
	<a class="attachment-tile overflow-hidden" style="width: 350px"
		init-with="p-op"
		on-init="s:[attachment-tile-init]"
		when-attachment-tile-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]">
		<div class="attachment-tile-icon">
			<svg viewBox="0 0 100 100">
			    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M68,14 L68,28.0100002 C68,30.2099991 69.7917156,32 71.9947834,32 L86,32 L68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32" stroke="#f1f1f1" stroke-width="2" stroke-opacity="0.2" fill="none"></path>
					<path d="M68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32 L68,14 L68,14 Z" fill="#F25A5B"
						init-with="p-op"
						when-attachment-tile-init="p:[opacity:0:1:1000:easeOutSine]:delay-1000"></path>
					<path d="M68,14 L68,28.0052166 C68,30.2114745 69.7917156,32 71.9947834,32 L86,32 L68,14 Z" fill="#A25B5D"
						init-with="p-op"
						when-attachment-tile-init="p:[opacity:0:1:1000:easeOutSine]:delay-1000"></path>
					<g stroke-width="2">
						<path d="M68,14 L68,28.0100002 C68,30.2099991 69.7917156,32 71.9947834,32 L86,32 L68,14 L17.9926786,14 C15.7875831,14 14,15.7977484 14,17.9994146 L14,82.0005854 C14,84.2094011 15.7977484,86 17.9994146,86 L82.0005854,86 C84.2094011,86 86,84.2033234 86,82.0073214 L86,32" stroke="#A25B5D"
							init-with="p:[sda:306.6, sdo:306.6]"
							when-attachment-tile-init="p:[stroke-dashoffset:306.6:0:750:easeOutSine]:delay-1000"></path>
				        <g stroke="#FFFFFF">
							<path d="M26,50 L26,78 L73,78"
								init-with="p:[sda:75, sdo:75]"
								when-attachment-tile-init="p:[stroke-dashoffset:75:0:500:easeOutSine]:delay-1500"></path>
					        <path d="M26.0065349,27 L58.452381,27"
								init-with="p:[sda:32.45, sdo:32.45]"
								when-attachment-tile-init="p:[stroke-dashoffset:32.45:0:500:easeOutSine]:delay-1500"></path>
					        <path d="M26.0065349,39 L73,39"
								init-with="p:[sda:47, sdo:47]"
								when-attachment-tile-init="p:[stroke-dashoffset:47:0:500:easeOutSine]:delay-1500"></path>
					        <path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542"
								init-with="p:[sda:77.98, sdo:77.98]"
								when-attachment-tile-init="p:[stroke-dashoffset:77.98:0:500:easeOutSine]:delay-1500"></path>
						</g>
					</g>
			    </g>
			</svg>
		</div>
		<div class="attachment-tile-desc"
			init-with="p:[color:white]">
			<h3 init-with="p-op"
				when-attachment-tile-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-1000]">ingredients.pdf</h3>
			<p init-with="p-op"
				when-attachment-tile-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-1100]">A list of my ingredients in case of allergies or other restrictions.</p>
		</div>
	</a>
</div>
