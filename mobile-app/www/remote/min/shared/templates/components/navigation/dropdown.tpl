<div class="full-xy flex-center" types='default, color' default-type="default" reference="http://codepen.io/teamuguru/pen/a22af7dfdac53aa76c35f1317740770f?editors=1100, http://codepen.io/teamuguru/pen/c2d938e2a4e4c173187a71cd320bf078?editors=1100, http://codepen.io/teamuguru/pen/e1d55abb071ad8db0845cefd76f7c48f?editors=1100">
	<div class="dropdown auto info" ng-if='activeType === "default"'>
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
			<a>
				<svg viewBox="0 0 100 100">
					<path d="M14,32 L50,68 L86,32"></path>
				</svg>
			</a>
		</div>
		<ul>
			<li tabindex>
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
			<li tabindex>
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
			<li tabindex>
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
		<a class="bg-robin">
			<div></div><div></div>
			<div></div><div></div>
			<span>Color&nbsp;Dropdown</span>
			<svg viewBox="0 0 100 100">
				<path d="M14,32 L50,68 L86,32"></path>
			</svg>
		</a>
		<div>
			<svg viewBox="0 0 396 38">
				<path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			<ul>
				<li>
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-tech">
						<span>Tech</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li>
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-household">
						<span>Household</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li>
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-athletic">
						<span>Athletic</span>
					</a>
					<svg class="arrow" viewBox="0 0 60 30">
						<path d="M4,26 L30,0 L56,26"></path>
					</svg>
				</li>
				<li>
					<div></div><div></div>
					<div></div><div></div>
					<a class="active bg-academic">
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
