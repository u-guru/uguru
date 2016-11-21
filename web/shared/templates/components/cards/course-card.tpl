<div class="perspective-container full-xy flex-center p15xy" types='default, link, overlay, checkbox, checkbox-short, checkbox-tiny, checkbox-mini, badge'>
	<div ng-show='activeType === "default"' class="course-card"
		u init-with="p:[op:0]"
		on-init="s:[course-card-init:children:150, course-scoop:self]"
		when-course-scoop="a:[scoop-enter:900:linear:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[op:0, tro:center center]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[tr:scaleX(0), tro:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>

	<a ng-show='activeType === "link"' class="course-card"
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[course-link-init:children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150"
			u on-mouse-enter="p:[tr:translateZ(10px)]"
			on-mouse-leave="p:[tr:translateZ(0px)]">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-course-link-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[bg:#003262, tr:scaleX(0), tro:center center]"
			when-course-link-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</a>

	<div ng-show='activeType === "overlay"' class="course-card with-hover"
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[course-overlay-init:children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-click="s:[content-enter:depth(1)]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-course-overlay-init="a:[bounceIn-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" tabindex>
			<span u init-with="p:[bg:#003262]"></span>
			<div u init-with="p:[op:0]"
				when-content-enter="a:[slideInUp-subtle:800:linear:0:1:f]">
				Content can go in here.
			</div>
		</div>
		<div class="course-card-border"
			u init-with="p:[bg:#003262, scaleX:0, tro:center center]"
			when-course-overlay-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>

	<div ng-show='activeType === "checkbox"' class="course-card"
		u init-with="p:[op:0]"
		on-init="s:[checkbox-card:self, checkbox-init:public:150]"
		when-checkbox-card="a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="s:[course-card-enter:children] | a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="s:[course-card-enter:children] | a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="s:[course-card-leave:children] | a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="s:[course-card-down:children] | a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="s:[course-card-up:children] | a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[tr:scale(0)]"
			when-checkbox-init="a:[bounceInUp-subtle:1000:linear:0:1:f]">
			<h2 u init-with="p:[color:#003262]">BIO 1A</h2>
			<h1 u init-with="p:[color:#003262]">Introduction to Biology</h1>
		</div>
		<div class="course-card-border"
			u init-with="p:[bg:#003262, tr:scaleX(0), tro:center center]"
			when-checkbox-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[op:0, tro:right top]"
			when-checkbox-init="a:[bounceIn-subtle:1000:linear:100:1:f]">
			<span class="course-card-count"
				u init-with="p:[op:0]"
				when-course-card-enter="a:[opacity:0:0.5:150:easeOutSine:0:1:f]"
				when-course-card-leave="a:[opacity:0.5:0:150:easeInSine:0:1:f]">
				<!-- @gabrielle error with course-card states -->
				<span u init-with="p:[bg:#003262]"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div ng-show='activeType === "checkbox-short"' class="course-card short"
		u init-with="p:[op:0]"
		on-init="s:[checkbox-short-init:children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="50px" viewBox="0 0 240 50">
			<rect x="0" y="0" width="240" height="50" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-checkbox-short-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[tr:scaleY(0)]"
			when-checkbox-short-init="a:[scaleY:0:1:500:easeOutSine:0:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[op:0, tro:right top]"
			when-checkbox-short-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div ng-show='activeType === "checkbox-tiny"' class="course-card tiny"
		u init-with="p:[op:0]"
		on-init="s:[checkbox-tiny-init:children:150, checkbox-card:self]"
		when-checkbox-card="a:[scoop-enter:900:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-checkbox-tiny-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
			<div class="course-card-border" style="background: #003262;"></div>
			<h2 style="color: #003262;">BIO 1A</h2>
		</div>
		<div class="course-card-count-container"
			u init-with="p:[op:0, tro:right top]"
			when-checkbox-tiny-init="a:[bounceIn-subtle:1000:linear:100:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div ng-show='activeType === "checkbox-mini"' class="course-card mini"
		u init-with="p:[op:0]"
		on-init="s:[checkbox-mini-init:children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-checkbox-mini-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[tr:scaleX(0), tro:center center]"
			when-checkbox-mini-init="a:[scaleX:0:1:500:easeOutBounce:150:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[op:0, tro:right top]"
			when-checkbox-mini-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<a ng-show='activeType === "badge"' class="course-card"
		u init-with="p:[op:0]"
		on-init="s:[course-badge-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[op:0]"
			when-course-badge-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, tro:center center]"
			when-course-badge-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
		<span class="course-card-count"
			u init-with="p:[op:0, tro:right top]"
			when-course-badge-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span style="background: #003262;">2</span>
		</span>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"></div>
	</a>

</div>
