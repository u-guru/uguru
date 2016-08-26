<div class="perspective-container full-xy flex-center" types='default, info, color' default-type="color" reference="http://codepen.io/teamuguru/pen/a22af7dfdac53aa76c35f1317740770f?editors=1100, http://codepen.io/teamuguru/pen/c2d938e2a4e4c173187a71cd320bf078?editors=1100, http://codepen.io/teamuguru/pen/e1d55abb071ad8db0845cefd76f7c48f?editors=1100">
	<div class="dropdown auto" ng-if='activeType === "default"'>
		<div>
			<div class="top"
				init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"
				when-load-end="p:[transform:scaleX(1):scaleX(0):500:easeOutCubic]"></div>
			<div class="right"
				init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]:delay-150"
				when-load-end="p:[transform:scaleY(1):scaleY(0):500:easeOutCubic]"></div>
			<div class="bot"
				init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]:delay-300"
				when-load-end="p:[transform:scaleX(1):scaleX(0):500:easeOutCubic]"></div>
			<div class="left"
				init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]:delay-450"
				when-load-end="p:[transform:scaleY(1):scaleY(0):500:easeOutCubic]"></div>
			<span class="txt-20"
				init-with="p-op"
				on-init="p:[opacity:0:1:500:easeOutSine]:delay-700 | send:[load-end:public:delay-1200]">Photography</span>
			<a init-with="p-op"
				on-init="p:[opacity:0:1:500:easeOutSine]:delay-1000"
				on-click="s:[dropdown-open:public]">
				<!-- @samir couldn't get this one to work, pls help -->
				<!-- <a init-default
					on-click="t:[switch:self]"
					switch
					switch-on="t:[dropdown-open-link]"
					switch-off="t:[dropdown-close-link]"
					when-dropdown-open-link="s:[dropdown-open:public]"
					when-dropdown-close-link="s:[dropdown-open:public]"> -->
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"
						init-with="p:[op:0, tr:none, sdo:102, sda:102]"
						on-init="p:[opacity:0:1:150:linear] | send:[draw-arrow:public:delay-1000]"
						when-draw-arrow="p:[stroke-dashoffset:102:0:450:easeInQuint]"
						when-dropdown-open="p:[transform:rotate(0deg):rotate(180deg):150:easeOutBack]"
						when-dropdown-close="p:[transform:rotate(180deg):rotate(0deg):150:easeOutBack]"></path>
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0px)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-150"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(90deg) translateZ(0px):250:easeInOutCubic]:delay-450"
				on-click="s:[dropdown-close:public]">
				<span>Academic</span>
			</li>
			<li tabindex
				init-with="p:[op:0, tr:rotateX(-90deg) translateZ(0)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(-90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-300"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(-90deg) translateZ(0px):250:easeInOutCubic]:delay-300"
				on-click="s:[dropdown-close:public]">
				<span>Baking</span>
			</li>
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-450"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(90deg) translateZ(0px):250:easeInOutCubic]:delay-150"
				on-click="s:[dropdown-close:public]">
				<span>Tech</span>
			</li>
		</ul>
	</div>

	<div class="dropdown auto info" ng-if='activeType === "info"'>
		<div>
			<div class="top"
				init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"
				when-load-end="p:[transform:scaleX(1):scaleX(0):500:easeOutCubic]"></div>
			<div class="right"
				init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]:delay-150"
				when-load-end="p:[transform:scaleY(1):scaleY(0):500:easeOutCubic]"></div>
			<div class="bot"
				init-with="p:[tr:scaleX(0)]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]:delay-300"
				when-load-end="p:[transform:scaleX(1):scaleX(0):500:easeOutCubic]"></div>
			<div class="left"
				init-with="p:[tr:scaleY(0)]"
				on-init="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]:delay-450"
				when-load-end="p:[transform:scaleY(1):scaleY(0):500:easeOutCubic]"></div>
			<span
				init-with="p-op"
				on-init="p:[opacity:0:1:500:easeOutSine]:delay-700 | send:[load-end:public:delay-1200]">Photography</span>
			<a  init-with="p-op"
				on-init="p:[opacity:0:1:700:easeOutSine]:delay-1000"
				on-click="s:[dropdown-open:public]">
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"
						init-with="p:[op:0, tr:none, sdo:102, sda:102]"
						on-init="p:[opacity:0:1:150:linear] | send:[draw-arrow:public:delay-1000]"
						when-draw-arrow="p:[stroke-dashoffset:102:0:450:easeInQuint]"
						when-dropdown-open="p:[transform:rotate(0deg):rotate(180deg):150:easeOutBack]"
						when-dropdown-close="p:[transform:rotate(180deg):rotate(0deg):150:easeOutBack]"></path>
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0px)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-150"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(90deg) translateZ(0px):250:easeInOutCubic]:delay-450"
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
				init-with="p:[op:0, tr:rotateX(-90deg) translateZ(0)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(-90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-300"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(-90deg) translateZ(0px):250:easeInOutCubic]:delay-300"
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
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="p:[opacity:0:1:250:easeInOutSine, transform:rotateX(90deg) translateZ(0px):rotateX(0deg) translateZ(0px):250:easeInOutCubic]:delay-450"
				when-dropdown-close="p:[opacity:1:0:250:easeInOutSine, transform:rotateX(0deg) translateZ(0px):rotateX(90deg) translateZ(0px):250:easeInOutCubic]:delay-150"
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

	<div class="dropdown-color" ng-if='activeType === "color"'>
		<a class="bg-robin"
			init-with="p:[background:rgba(43#179#184#0)]"
			on-init="p:[background:rgba(43#179#184#0):rgba(43#179#184#1):1000:easeOutExpo]:delay-1200"
			on-click="s:[dropdown-color-open:public]">
			<!-- @Gabrielle: Animating color -->
			<div init-with="p:[tr:scaleX(0), background:#2BB3B8]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"
				when-load-end="p:[background:#2BB3B8:#ffffff:500:easeOutSine]"></div>
			<div init-with="p:[tr:scaleY(0), background:#2BB3B8]"
				on-init="p:[tr:scaleY(1):delay-150, t:transform 250ms ease-out]"
				when-load-end="p:[background:#2BB3B8:#ffffff:500:easeOutSine]"></div>
			<div init-with="p:[tr:scaleX(0), background:#2BB3B8]"
				on-init="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]:delay-300"
				when-load-end="p:[background:#2BB3B8:#ffffff:500:easeOutSine]"></div>
			<div init-with="p:[tr:scaleY(0), background:#2BB3B8]"
				on-init="p:[transform:scaleY(0):scaleX(1):250:easeOutCubic]:delay-450"
				when-load-end="p:[background:#2BB3B8:#ffffff:500:easeOutSine]"></div>
			<span init-with="p-op"
				on-init="p:[opacity:0:1:500:easeOutSine]:delay-700 | send:[load-end:public:delay-1200]">Color&nbsp;Dropdown</span>
			<svg viewBox="0 0 100 100">
				<path d="M14,32 L50,68 L86,32"
					init-with="p:[tro:center center, tr:rotate(0), sdo:102, sda:102, op:0]"
					on-init="p:[stroke-dashoffset:102:0:450:easeOutCubic, opacity:0:1:450:easeOutSine]:delay-1000"
					when-dropdown-color-open="p:[transform:rotate(0deg):rotate(180deg):150:easeOutBack]"
					when-dropdown-color-close="p:[transform:rotate(180deg):rotate(0deg):150:easeOutBack]"></path>
			</svg>
		</a>
		<div init-with="p:[visibility:hidden, z-index:-1]"
			when-dropdown-color-open="p:[visibility:visible, z-index:10]"
			when-dropdown-color-close="p:[visibility:hidden, z-index:-1]:delay-400">
			<svg viewBox="0 0 396 38"
				init-with="p-op"
				when-dropdown-color-open="p:[opacity:0:1:250:easeOutSine]:delay-200"
				when-dropdown-color-close="p:[opacity:1:0:250:easeOutSine]:delay-300">
				<path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			<ul>
				<li init-with="p-op"
					when-dropdown-color-open="p:[opacity:0:1:250:easeOutSine]:delay-200"
					when-dropdown-color-close="p:[opacity:1:0:250:easeOutSine]:delay-300">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-tech"
						init-default
						on-click="s:[dropdown-color-close:public]">
						<span>Tech</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-open="p:[transform:translateY(-48px):translateY(0px):250:easeOutQuad, opacity:0:1:250:easeOutQuad]:delay-200"
					when-dropdown-color-close="p:[transform:translateY(0px):translateY(-48px):250:easeOutQuad, opacity:1:0:250:easeOutQuad]:delay-300">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-household"
						init-default
						on-click="s:[dropdown-color-close:public]">
						<span>Household</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-open="p:[transform:translateY(-48px):translateY(0px):250:easeOutQuad, opacity:0:1:250:easeOutQuad]:delay-300"
					when-dropdown-color-close="p:[transform:translateY(0px):translateY(-48px):250:easeOutQuad, opacity:1:0:250:easeOutQuad]:delay-200">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-athletic"
						init-default
						on-click="s:[dropdown-color-close:public]">
						<span>Athletic</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li init-with="p:[tr:translateY(-48px), op:0]"
					when-dropdown-color-open="p:[transform:translateY(-48px):translateY(0px):250:easeOutQuad, opacity:0:1:250:easeOutQuad]:delay-400"
					when-dropdown-color-close="p:[transform:translateY(0px):translateY(-48px):250:easeOutQuad, opacity:1:0:250:easeOutQuad]:delay-100">
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-academic"
						init-default
						on-click="s:[dropdown-color-close:public]">
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
