<div class="perspective-container full-xy flex-center p15xy">
	<a class="attachment-tile overflow-hidden" style="width: 350px"
		init-with="p:[op:0, bg:#40484b]"
		on-init="s:[attachment-tile-init]"
		when-attachment-tile-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]"
		on-mouse-enter="p:[bg:#637074]"
		on-mouse-leave="p:[bg:#40484b]">
		<div class="attachment-tile-icon">
			<svg viewBox="0 0 100 100">
			    <g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#f1f1f1" stroke-opacity="0.2" fill="none"></path>
			        <path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#A25B5D" fill="#F25A5B"
						init-with="p:[sda:302.44, sdo:302.44, fill:none, t:stroke-dashoffset 750ms ease-out#fill 500ms ease-out]"
						when-attachment-tile-init="p:[sdo:0:delay-1000, fill:#F25A5B:delay-1500]"></path>
			        <path d="M26,50 L26,78 L73,78" stroke="#FFFFFF"
						init-with="p:[sda:75, sdo:75, t:all 500ms ease-out]"
						when-attachment-tile-init="p:[sdo:0:delay-1500]"></path>
			        <path d="M26.0065349,27 L58.452381,27" stroke="#FFFFFF"
						init-with="p:[sda:32.45, sdo:32.45, t:all 500ms ease-out]"
						when-attachment-tile-init="p:[sdo:0:delay-1500]"></path>
			        <path d="M26.0065349,39 L73,39" stroke="#FFFFFF"
						init-with="p:[sda:47, sdo:47, t:all 500ms ease-out]"
						when-attachment-tile-init="p:[sdo:0:delay-1500]"></path>
			        <path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542" stroke="#FFFFFF"
						init-with="p:[sda:77.98, sdo:77.98, t:all 500ms ease-out]"
						when-attachment-tile-init="p:[sdo:0:delay-1500]"></path>
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
