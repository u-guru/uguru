<div class="perspective-container full-xy flex-center" types='default, info, color' default-type="color">

	<div class="dropdown auto" ng-if='activeType === "default"'>
		<div u on-init="s:[dropdown-draw:children:linear-1500, dropdown-load-end:children:1500]">
			<div class="top"
				u init-with="p:[tr:scaleX(0)]"
				when-dropdown-draw="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleX:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="right"
				u init-with="p:[tr:scaleY(0)]"
				when-dropdown-draw="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleY:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="bot"
				u init-with="p:[tr:scaleX(0)]"
				when-dropdown-draw="a:[scaleX:0:1:250:easeOutCubic:0:1:f]:"
				when-dropdown-load-end="a:[scaleX:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="left"
				u init-with="p:[tr:scaleY(0)]"
				when-dropdown-draw="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleY:1:0:500:easeOutCubic:0:1:f]"></div>
			<span class="txt-20"
				u init-with="p:[op:0]"
				when-dropdown-draw="a:[opacity:0:1:500:easeOutSine:0:1:f]">Photography</span>
			<a init-with="p:[op:0]"
				u when-dropdown-draw="a:[opacity:0:1:500:easeOutSine:0:1:f]"
				on-click="s:[dropdown-open:public]">
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"
						u init-with="p:[op:0, tr:none, sdo:102, sda:102]"
						on-init="a:[opacity:0:1:150:linear:0:1:f] | s:[draw-arrow:depth(0):1000]"
						when-draw-arrow="a:[stroke-dashoffset:102:0:450:easeInQuint:0:1:f]"
						when-dropdown-open="a:[rotate:0deg:180deg:150:easeOutBack:0:1:f]"
						when-dropdown-close="a:[rotate:180deg:0deg:150:easeOutBack:0:1:f]"></path>
						<!-- When state bug -->
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			u init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(90deg) translateZ(0px)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:90deg:0deg:250:easeInOutCubic:0:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-150"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:250:1:f, rotateX:0deg:90deg:250:easeInOutCubic:0:1:f,translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-450"
				on-click="s:[dropdown-close:public]">
				<span>Academic</span>
			</li>
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(-90deg) translateZ(0)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:-90deg:0deg:250:easeInOutCubic:0:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-300"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:250:1:f, rotateX:0deg:90deg:250:easeInOutCubic:0:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-300"
				on-click="s:[dropdown-close:public]">
				<span>Baking</span>
			</li>
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:90deg:0deg:250:easeInOutCubic:0:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-450"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:0:1:f, rotateX:0deg:90deg:250:easeInOutCubic:250:1:f,translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-150"
				on-click="s:[dropdown-close:public]">
				<span>Tech</span>
			</li>
		</ul>
	</div>

	<div class="dropdown auto info" ng-if='activeType === "info"'
		u on-init="s:[dropdown-info-draw:children:linear-1500, dropdown-load-end:children:1500]">
		<div>
			<div class="top"
				u init-with="p:[tr:scaleX(0)]"
				when-dropdown-info-draw="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleX:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="right"
				u init-with="p:[tr:scaleY(0)]"
				when-dropdown-info-draw="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleY:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="bot"
				u init-with="p:[tr:scaleX(0)]"
				when-dropdown-info-draw="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleX:1:0:500:easeOutCubic:0:1:f]"></div>
			<div class="left"
				u init-with="p:[tr:scaleY(0)]"
				when-dropdown-info-draw="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"
				when-dropdown-load-end="a:[scaleY:1:0:500:easeOutCubic:0:1:f]"></div>
			<span u init-with="p:[op:0]"
				when-dropdown-info-draw="a:[opacity:0:1:500:easeOutSine:0:1:f]">Photography</span>
			<a u init-with="p:[op:0]"
				when-dropdown-info-draw="a:[opacity:0:1:700:easeOutSine:0:1:f]"
				on-click="s:[dropdown-open:public]">
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"
						u init-with="p:[op:0, tr:none, sdo:102, sda:102]"
						on-init="a:[opacity:0:1:150:linear:0:1:f] | s:[draw-arrow:depth(0):1000]"
						when-draw-arrow="a:[stroke-dashoffset:102:0:450:easeInQuint:0:1:f]"
						when-dropdown-open="a:[rotate:0deg:180deg:150:easeOutBack:0:1:f]"
						when-dropdown-close="a:[rotate:180deg:0deg:150:easeOutBack:0:1:f]"></path>
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			u init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(90deg) translateZ(0px)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:90deg:0deg:250:easeInOutCubic:300:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-150"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:0:1:f, rotateX:0deg:90deg:250:easeInOutCubic:0:1:f,translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-450"
				on-click="s:[dropdown-close:public]">
				<span>Academic</span>
				<a class="dropdown-popup">
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M50,40 L50,70 M50,30 L50,30.5"></path>
					</svg>
				</a>
				<div class="dropdown-info">
					<div>This is information you can put into a dropdown.</div>
					<button class="bg-shamrock">See More</button>
				</div>
			</li>
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(-90deg) translateZ(0)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:-90deg:0deg:250:easeInOutCubic:300:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-300"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:0:1:f, rotateX:0deg:90deg:250:easeInOutCubic:0:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-300"
				on-click="s:[dropdown-close:public]">
				<span>Baking</span>
				<a class="dropdown-popup">
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M50,40 L50,70 M50,30 L50,30.5"></path>
					</svg>
				</a>
				<div class="dropdown-info">
					<div>This is information you can put into a dropdown.</div>
					<button class="bg-shamrock">See More</button>
				</div>
			</li>
			<li tabindex
				u init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="a:[opacity:0:1:250:easeInOutSine:0:1:f, rotateX:90deg:0deg:250:easeInOutCubic:300:1:f, translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-450"
				when-dropdown-close="a:[opacity:1:0:250:easeInOutSine:0:1:f, rotateX:0deg:90deg:250:easeInOutCubic:0:1:f,translateZ:0px:0px:250:easeInOutCubic:0:1:f]:delay-150"
				on-click="s:[dropdown-close:public]">
				<span>Tech</span>
				<a class="dropdown-popup">
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M50,40 L50,70 M50,30 L50,30.5"></path>
					</svg>
				</a>
				<div class="dropdown-info">
					<div>This is information you can put into a dropdown.</div>
					<button class="bg-shamrock">See More</button>
				</div>
			</li>
		</ul>
	</div>

	<div class="dropdown-color" ng-if='activeType === "color"'
		u init-with="p:[op:0]"
		on-init="s:[dropdown-color-card:depth(0), dropdown-color-init:depth(>1)] |a:[opacity:0:1:250:easeOutSine:0:1:f]">

		<a class="bg-robin"
			u on-click="s:[dropdown-color-open:>siblings, dropdown-color-items:siblings]">
				<!-- u on-click="s:[dropdown-color-open:public, dropdown-color-prompt:siblings]" -->
			<div u init-with="p:[tr:scaleX(0)]"
				when-dropdown-color-init="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"></div>
			<div u init-with="p:[tr:scaleY(0)]"
				when-dropdown-color-init="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"></div>
			<div u init-with="p:[tr:scaleX(0)]"
				when-dropdown-color-init="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"></div>
			<div u init-with="p:[tr:scaleY(0)]"
				when-dropdown-color-init="a:[scaleY:0:1:250:easeOutCubic:0:1:f]"></div>
			<span u init-with="p:[op:0]"
				when-dropdown-color-init="a:[opacity:0:1:500:easeOutSine:0:1:f]">Color&nbsp;Dropdown</span>
			<svg viewBox="0 0 100 100">
				<path d="M14,32 L50,68 L86,32"
					u init-with="p:[tro:center center, tr:rotate(0), sdo:102, sda:102]"
					when-dropdown-color-init="a:[stroke-dashoffset:102:0:450:easeOutCubic:0:1:f]:delay-100"
					when-dropdown-color-items="a:[rotate:0deg:180deg:150:easeOutBack:0:1:f]"
					when-dropdown-color-close="a:[rotate:180deg:0deg:150:easeOutBack:0:1:f]"></path>
			</svg>
		</a>
		<div u init-with="p:[visibility:hidden, z-index:-1]"
			when-dropdown-color-open="p:[visibility:visible, z-index:10]"
			when-dropdown-color-close="p:[visibility:hidden, z-index:-1]:delay-400">
			<!-- when-dropdown-color-prompt="s:[dropdown-color-items:children:linear-750]" -->
			<svg viewBox="0 0 396 38"
				u init-with="p:[op:0]"
				when-dropdown-color-open="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-200"
				when-dropdown-color-close="a:[opacity:1:0:250:easeOutSine:0:1:f]:delay-300">
				<path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			<ul>
				<li u init-with="p:[op:0]"
					when-dropdown-color-items="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-100"
					when-dropdown-color-close="a:[opacity:1:0:250:easeOutSine:0:1:f]:delay-300">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-tech"
						u on-click="s:[dropdown-color-close:public]">
						<span>Tech</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li u init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-items="a:[translateY:-48px:0px:250:easeOutQuad:0:1:f, opacity:0:1:250:easeOutQuad:0:1:f]:delay-200"
					when-dropdown-color-close="a:[translateY:0px:-48px:250:easeOutQuad:0:1:f, opacity:1:0:250:easeOutQuad:0:1:f]:delay-300">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-household"
						u on-click="s:[dropdown-color-close:public]">
						<span>Household</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li u init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-items="a:[translateY:-48px:0px:250:easeOutQuad:0:1:f, opacity:0:1:250:easeOutQuad:0:1:f]:delay-300"
					when-dropdown-color-close="a:[translateY:0px:-48px:250:easeOutQuad:0:1:f, opacity:1:0:250:easeOutQuad:0:1:f]:delay-200">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-athletic"
						u on-click="s:[dropdown-color-close:public]">
						<span>Athletic</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li u init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-items="a:[translateY:-48px:0px:250:easeOutQuad:0:1:f, opacity:0:1:250:easeOutQuad:0:1:f]:delay-400"
					when-dropdown-color-close="a:[translateY:0px:-48px:250:easeOutQuad:0:1:f, opacity:1:0:250:easeOutQuad:0:1:f]:delay-100">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-academic"
						u on-click="s:[dropdown-color-close:public]">
						<span>Academic</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
			</ul>
		</div>
	</div>
</div>
