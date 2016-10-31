<div class="perspective-container full-xy flex-center p15xy" types='svg, default, link, overlay, checkbox, checkbox-mini, checkbox-short, checkbox-tiny, badge' default-type="checkbox">
	<div class="course-card tiny" ng-if='activeType === "checkbox-tiny"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<div class="course-card-border" style="background: #003262;"></div>
			<h2 style="color: #003262;">BIO 1A</h2>
		</div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div class="course-card short" ng-if='activeType === "checkbox-short"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="50px" viewBox="0 0 240 50">
			<rect x="0" y="0" width="240" height="50" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div class="course-card mini" ng-if='activeType === "checkbox-mini"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div class="course-card" ng-if='activeType === "checkbox"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>

	<div class="course-card" ng-if='activeType === "default"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, transform-origin:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>

	<a class="course-card" ng-if='activeType === "link"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, transform-origin:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</a>

	<div class="course-card with-hover" ng-if='activeType === "overlay"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" tabindex>
			<span style="background: #003262;"></span>
			<div u init-with="p:[opacity:0]"
				when-content-enter="a:[slideInUp-subtle:800ms:linear:0:1:f]">
				Content can go in here.
			</div>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, transform-origin:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>

	<a class="course-card" ng-if='activeType === "badge"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, transform-origin:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
		<span class="course-card-count"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-card-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span style="background: #003262;">2</span>
		</span>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"></div>
	</a>

	<a class="course-card-svg" ng-if='activeType === "svg"'
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
		    <g fill="none" fill-rule="evenodd" font-family="Source Sans Pro" font-weight="600" text-anchor="middle">
				<g class="default">
					<rect class="background" fill="#FFFFFF" x="0" y="0" width="240" height="150" rx="2"></rect>
					<g fill="#003262">
						<path d="M0,145 L240,145 L240,147.995118 C240,149.102384 239.106955,150 237.997273,150 L2.00272724,150 C0.896651527,150 0,149.1061 0,147.995118 L0,145 Z" class="border"></path>
						<text class="name" font-size="14">
							<tspan x="120" y="49">BIO 1A</tspan>
						</text>
						<text class="title" font-size="24" line-spacing="28">
							<tspan x="120" y="80">Introduction to</tspan>
							<tspan x="120" y="108">Biology</tspan>
						</text>
					</g>
				</g>
				<g class="color">
					<rect class="color-background" fill="#003262" x="0" y="0" width="240" height="150" rx="2"></rect>
					<g fill="#FFFFFF">
						<path d="M0,145 L240,145 L240,147.995118 C240,149.102384 239.106955,150 237.997273,150 L2.00272724,150 C0.896651527,150 0,149.1061 0,147.995118 L0,145 Z" class="color-border"></path>
						<text class="color-name" font-size="14">
							<tspan x="120" y="49">BIO 1A</tspan>
						</text>
						<text class="color-title" font-size="24" line-spacing="28">
							<tspan x="120" y="80">Introduction to</tspan>
							<tspan x="120" y="108">Biology</tspan>
						</text>
					</g>
				</g>
		    </g>
		</svg>
	</a>
</div>
