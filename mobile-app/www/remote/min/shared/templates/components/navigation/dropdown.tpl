<div class="perspective-container full-xy flex-center" types='default, info, color' default-type="color" reference="http://codepen.io/teamuguru/pen/a22af7dfdac53aa76c35f1317740770f?editors=1100, http://codepen.io/teamuguru/pen/c2d938e2a4e4c173187a71cd320bf078?editors=1100, http://codepen.io/teamuguru/pen/e1d55abb071ad8db0845cefd76f7c48f?editors=1100">
	<div class="dropdown auto" ng-if='activeType === "default"'>
		<div>
			<div class="top"
				init-with="p:[tr:scaleX(0)]"></div>
			<div class="right"
				init-with="p:[tr:scaleY(0)]"></div>
			<div class="bot"
				init-with="p:[tr:scaleX(0)]"></div>
			<div class="left"
				init-with="p:[tr:scaleY(0)]"></div>
			<span class="txt-20">Photography</span>
			<a init-default
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
						init-with="p:[tr:none, t:all 150ms ease-in-out]"
						when-dropdown-open="p:[tr:rotate(180deg)]"
						when-dropdown-close="p:[tr:rotate(0)]"></path>
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="p:[op:1:delay-250, tr:rotateX(0) translateZ(0):delay-250, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-750, tr:rotateX(90deg) translateZ(0):delay-750]"
				on-click="s:[dropdown-close:public]">
				<span>Academic</span>
			</li>
			<li tabindex
				init-with="p:[op:0, tr:rotateX(-90deg) translateZ(0)]"
				when-dropdown-open="p:[op:1:delay-500, tr:rotateX(-0deg) translateZ(0):delay-500, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-500, tr:rotateX(-90deg) translateZ(0):delay-500]"
				on-click="s:[dropdown-close:public]">
				<span>Baking</span>
			</li>
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="p:[op:1:delay-750, tr:rotateX(0) translateZ(0):delay-750, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-250, tr:rotateX(90deg) translateZ(0):delay-250]"
				on-click="s:[dropdown-close:public]">
				<span>Tech</span>
			</li>
		</ul>
	</div>

	<div class="dropdown auto info" ng-if='activeType === "info"'>
		<div>
			<div class="top"
				init-with="p:[tr:scaleX(0)]"></div>
			<div class="right"
				init-with="p:[tr:scaleY(0)]"></div>
			<div class="bot"
				init-with="p:[tr:scaleX(0)]"></div>
			<div class="left"
				init-with="p:[tr:scaleY(0)]"></div>
			<span>Photography</span>
			<a init-default
				on-click="s:[dropdown-open:public]">
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"
						init-with="p:[tr:none, t:all 150ms ease-in-out]"
						when-dropdown-open="p:[tr:rotate(180deg)]"
						when-dropdown-close="p:[tr:rotate(0)]"></path>
				</svg>
			</a>
		</div>
		<ul class="perspective-container"
			init-with="p:[z-index:-1]"
			when-dropdown-open="p:[z-index:99]"
			when-dropdown-close="p:[z-index:-1]">
			<li tabindex
				init-with="p:[op:0, tr:rotateX(90deg) translateZ(0)]"
				when-dropdown-open="p:[op:1:delay-250, tr:rotateX(0) translateZ(0):delay-250, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-750, tr:rotateX(90deg) translateZ(0):delay-750]"
				on-click="s:[dropdown-close:public]"
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
				when-dropdown-open="p:[op:1:delay-500, tr:rotateX(-0deg) translateZ(0):delay-500, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-500, tr:rotateX(-90deg) translateZ(0):delay-500]"
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
				when-dropdown-open="p:[op:1:delay-750, tr:rotateX(0) translateZ(0):delay-750, t:all 250ms ease-in-out#background 150ms ease-in-out]"
				when-dropdown-close="p:[op:0:delay-250, tr:rotateX(90deg) translateZ(0):delay-250]"
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
			init-default
			on-click="s:[dropdown-color-open:public]">
			<div></div><div></div>
			<div></div><div></div>
			<span>Color&nbsp;Dropdown</span>
			<svg viewBox="0 0 100 100">
				<path d="M14,32 L50,68 L86,32"
					init-with="p:[tro:center center, tr:rotate(0), t:all 150ms ease-in-out]"
					when-dropdown-color-open="p:[tr:rotate(180deg)]"
					when-dropdown-color-close="p:[tr:rotate(0)]"></path>
			</svg>
		</a>
		<div init-with="p:[visibility:hidden, z-index:-1]"
			when-dropdown-color-open="p:[visibility:visible, z-index:10]"
			when-dropdown-color-close="p:[visibility:hidden, z-index:-1]:delay-400">
			<svg viewBox="0 0 396 38"
				init-with="p:[ op:0, t:all 250ms ease-out]"
				when-dropdown-color-open="p:[op:1]:delay-200"
				when-dropdown-color-close="p:[op:0]:delay-300">
				<path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			<ul>
				<li init-with="p:[ op:0, t:all 250ms ease-out]"
					when-dropdown-color-open="p:[op:1]:delay-200"
					when-dropdown-color-close="p:[op:0]:delay-300">
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
				<li init-with="p:[tr:translate3d(0#-48px#0), op:0, t:all 250ms ease-out]"
					when-dropdown-color-open="p:[tr:none, op:1]:delay-200"
					when-dropdown-color-close="p:[tr:translate3d(0#-48px#0), op:0]:delay-300">
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
				<li init-with="p:[tr:translate3d(0#-48px#0), op:0, t:all 250ms ease-out]"
					when-dropdown-color-open="p:[tr:none, op:1]:delay-300"
					when-dropdown-color-close="p:[tr:translate3d(0#-48px#0), op:0]:delay-200">
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
				<li init-with="p:[tr:translate3d(0#-48px#0), op:0, t:all 250ms ease-out]"
					when-dropdown-color-open="p:[tr:none, op:1]:delay-400"
					when-dropdown-color-close="p:[tr:translate3d(0#-48px#0), op:0]:delay-100">
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
