<div class="perspective-container full-xy flex-center p15xy" types='uc-berkeley, boston-college, manhattan-college, university-of-chicago, williams-college, case-western' default-type="uc-berkeley">
	<div class="course-card" ng-if='activeType === "uc-berkeley"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #003262;">BIO 1A</h2>
			<h1 style="color: #003262;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #003262;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "boston-college"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #910039;">BIO 1A</h2>
			<h1 style="color: #910039;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #910039;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "manhattan-college"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #006838;">BIO 1A</h2>
			<h1 style="color: #006838;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #006838;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "university-of-chicago"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #DE0A2A;">BIO 1A</h2>
			<h1 style="color: #DE0A2A;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #DE0A2A;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "williams-college"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #FFD700;">BIO 1A</h2>
			<h1 style="color: #FFD700;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #FFD700;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>

	<div class="course-card" ng-if='activeType === "case-western"'
		init-with="p:[op:0]"
		on-init="s:[course-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="course-card-inside"
			init-with="p:[op:0]"
			when-course-card-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
			<h2 style="color: #184c8c;">BIO 1A</h2>
			<h1 style="color: #184c8c;">Introduction to Biology</h1>
		</div>
		<div class="course-card-border" style="background: #184c8c;"
			init-with="p:[tr:scaleX(0)]"
			when-course-card-init="p:[tr:scaleX(1), tro:center center, t:all 250ms ease-out]"></div>
	</div>
</div>
