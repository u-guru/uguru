<div class="perspective-container full-xy flex-center p15xy">
	<div class="numerical-bar"
		init-default
		on-init="s:[progress-init:public]">
		<div class="progress bg-slate txt-shamrock"
			u init-with="p:[transform-origin:left center, transform:scaleX(1), opacity:1]"
			when-progress-init="a:[opacity:1:0:150:easeOutSine:0:1:f, scaleX:1:0:600:(0.6,0,0.1,1.3):0:1:f]">
			<span u init-with="p:[width:0]"
				when-progress-1-clicked="a:[width:0%:10%:150:easeOutSine:0:1:f]"
				when-progress-2-clicked="a:[width:10%:30%:150:easeOutSine:0:1:f]"
				when-progress-3-clicked="a:[width:30%:50%:150:easeOutSine:0:1:f]"
				when-progress-4-clicked="a:[width:50%:70%:150:easeOutSine:0:1:f]"
				when-progress-5-clicked="a:[width:70%:90%:150:easeOutSine:0:1:f] | s:[progress-complete:public:delay-700]"
				when-progress-complete="a:[width:90%:100%:150:easeOutSine:0:1:f]"></span>
		</div>
		<ul>
			<li u init-with="p:[opacity:0]"
				when-progress-init="a:[bounceIn-rotate-subtle-small:1000:linear:0:1:f]">
				<div on-click="s:[progress-1-clicked]">
					<svg viewBox="0 0 80 80">
						<path d="M2.5,40 C2.5,60.7106781 19.2893219,77.5 40,77.5 C60.7106781,77.5 77.5,60.7106781 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-1-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
			            <path d="M2.5,40 C2.5,19.2893219 19.2893219,2.5 40,2.5 C60.7106781,2.5 77.5,19.2893219 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-1-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
					</svg>
					<span>1</span>
				</div>
			</li>
			<li u init-with="p:[opacity:0]"
				when-progress-init="a:[bounceIn-rotate-subtle-small:1000:linear:100:1:f]">
				<div on-click="s:[progress-2-clicked]">
					<svg viewBox="0 0 80 80">
						<path d="M2.5,40 C2.5,60.7106781 19.2893219,77.5 40,77.5 C60.7106781,77.5 77.5,60.7106781 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-2-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
			            <path d="M2.5,40 C2.5,19.2893219 19.2893219,2.5 40,2.5 C60.7106781,2.5 77.5,19.2893219 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-2-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
					</svg>
					<span>2</span>
				</div>
			</li>
			<li u init-with="p:[opacity:0]"
				when-progress-init="a:[bounceIn-rotate-subtle-small:1000:linear:200:1:f]]">
				<div on-click="s:[progress-3-clicked]">
					<svg viewBox="0 0 80 80">
						<path d="M2.5,40 C2.5,60.7106781 19.2893219,77.5 40,77.5 C60.7106781,77.5 77.5,60.7106781 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-3-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
			            <path d="M2.5,40 C2.5,19.2893219 19.2893219,2.5 40,2.5 C60.7106781,2.5 77.5,19.2893219 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-3-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
					</svg>
					<span>3</span>
				</div>
			</li>
			<li u init-with="p:[opacity:0]"
				when-progress-init="a:[bounceIn-rotate-subtle-small:1000:linear:300:1:f]]">
				<div on-click="s:[progress-4-clicked]">
					<svg viewBox="0 0 80 80">
						<path d="M2.5,40 C2.5,60.7106781 19.2893219,77.5 40,77.5 C60.7106781,77.5 77.5,60.7106781 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-4-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
			            <path d="M2.5,40 C2.5,19.2893219 19.2893219,2.5 40,2.5 C60.7106781,2.5 77.5,19.2893219 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-4-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
					</svg>
					<span>4</span>
				</div>
			</li>
			<li u init-with="p:[opacity:0]"
				when-progress-init="a:[bounceIn-rotate-subtle-small:1000:linear:400:1:f]">
				<div on-click="s:[progress-5-clicked]">
					<svg viewBox="0 0 80 80">
						<path d="M2.5,40 C2.5,60.7106781 19.2893219,77.5 40,77.5 C60.7106781,77.5 77.5,60.7106781 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-5-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
			            <path d="M2.5,40 C2.5,19.2893219 19.2893219,2.5 40,2.5 C60.7106781,2.5 77.5,19.2893219 77.5,40"
							init-with="p:[sda:117.83, sdo:117.83, fill:#40484b]"
							when-progress-5-clicked="p:[stroke-dashoffset:117.83:0:300:easeOutSine, fill:#40484b:#ffffff:300:easeOutSine]:delay-250"></path>
					</svg>
					<span>5</span>
				</div>
			</li>
		</ul>
	</div>
</div>
