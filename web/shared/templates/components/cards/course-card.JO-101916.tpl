<div class="perspective-container full-xy flex-center p15xy" types='default, link, overlay, checkbox, checkbox-mini, checkbox-short, checkbox-tiny, badge'>
	<!-- svg  -->

	<div ng-if='activeType === "checkbox-tiny"' class="course-card tiny"
		u init-with="p:[opacity:0]"
		on-init="s:[checkbox-tiny-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-checkbox-tiny-init="a:[bounceIn-subtle:1000:linear:150:1:f]">
			<div class="course-card-border" style="background: #003262;"></div>
			<h2 style="color: #003262;">BIO 1A</h2>
		</div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-checkbox-tiny-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>


	<div ng-if='activeType === "checkbox-short"' class="course-card short"
		u init-with="p:[opacity:0]"
		on-init="s:[checkbox-short-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="50px" viewBox="0 0 240 50">
			<rect x="0" y="0" width="240" height="50" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-checkbox-short-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[transform:scaleY(0)]"
			when-checkbox-short-init="a:[scaleY:0:1:500:easeOutSine:0:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-checkbox-short-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>


	<div ng-if='activeType === "checkbox-mini"' class="course-card mini"
		u init-with="p:[opacity:0]"
		on-init="s:[checkbox-mini-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-checkbox-mini-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[transform:scaleX(0), tro:center center]"
			when-checkbox-mini-init="a:[scaleX:0:1:500:easeOutBounce:150:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-checkbox-mini-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>


	<div ng-if='activeType === "checkbox"' class="course-card"
		u init-with="p:[opacity:0]"
		on-init="a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f] | s:[checkbox-init:public]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-checkbox-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[transform:scaleX(0), tro:center center]"
			when-checkbox-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
		<div class="course-card-count-container"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-checkbox-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span class="course-card-count">
				<span style="background: #003262;"></span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
	</div>


	<div ng-if='activeType === "default"' class="course-card"
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):300:1:f]">
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
			u init-with="p:[transform:scaleX(0), transform-origin:center center]"
			when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>


	<a ng-if='activeType === "link"' class="course-card"
		u init-with="p:[opacity:0]"
		on-init="s:[course-link-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseEnter="p:[transform:translateZ(10px)]"
		on-mouseLeave="p:[transform:translateZ(0px)]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-link-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[transform:scaleX(0), transform-origin:center center]"
			when-course-link-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</a>


	<div ng-if='activeType === "overlay"' class="course-card with-hover"
		u init-with="p:[opacity:0]"
		on-init="s:[course-overlay-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-overlay-init="a:[bounceIn-subtle:1000:linear:150:1:f]">
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
			when-course-overlay-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
	</div>


	<a ng-if='activeType === "badge"' class="course-card"
		u init-with="p:[opacity:0]"
		on-init="s:[course-badge-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			u init-with="p:[opacity:0]"
			when-course-badge-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			u init-with="p:[scaleX:0, transform-origin:center center]"
			when-course-badge-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
		<span class="course-card-count"
			u init-with="p:[opacity:0, transform-origin:right top]"
			when-course-badge-init="a:[bounceIn-subtle:1000:linear:250:1:f]">
			<span style="background: #003262;">2</span>
		</span>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"></div>
	</a>


	<!-- <a ng-if='activeType === "svg"' class="course-card-svg"
		u init-with="p:[opacity:0]"
		on-init="s:[course-svg-init:public] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
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
	</a> -->

</div>
