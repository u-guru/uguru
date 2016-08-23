<div class="perspective-container full-xy flex-center p15xy" types='svg, default, link, overlay, checkbox, badge' default-type="default">
	<a class="course-card-svg" ng-if='activeType === "svg"'
		init-with="p-op"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
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

	<div class="course-card" ng-if='activeType === "default"'
		init-with="p:[opacity:0:1:1000ms:elastic, transform:rotate(-360deg) translateX(0%):rotate(0deg) translateX(-100%):2000ms:elastic]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p-op"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<a class="course-card" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p-op"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</a>

	<div class="course-card with-hover" ng-if='activeType === "overlay"'
		init-with="p-op"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in] | send:[content-enter:public]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p-op"
			when-course-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-hover" tabindex>
			<span style="background: #003262;"></span>
			<div init-with="p-op"
				when-content-enter="a:[slideInUp-subtle:set:(dur:800ms#func:linear):in]">
				Content can go in here.
			</div>
		</div>
		<div class="course-card-border" style="background: #003262;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "checkbox"'
		init-with="p-op"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="course-card-inside"
			init-with="p-op"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"></div>
		<span class="course-card-count"
			init-with="p:[op:0, tro:right top]"
			when-course-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span style="background: #003262;"></span>
			<svg viewBox="0 0 100 100">
				<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
			</svg>
		</span>
	</div>

	<a class="course-card" ng-if='activeType === "badge"'
		init-with="p-op"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p-op"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
		<span class="course-card-count"
			init-with="p:[op:0, tro:right top]"
			when-course-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-250]">
			<span style="background: #003262;">2</span>
		</span>
		<div class="course-card-hover" style="background: #003262;"></div>
		<div class="course-card-border" style="background: #003262;"></div>
	</a>
</div>