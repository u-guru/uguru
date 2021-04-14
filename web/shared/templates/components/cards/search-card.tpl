<div class="perspective-container full-xy flex-center p15xy">
	<a class="course-card"
		u init-with="p:[opacity:0]"
		on-init="s:[course-card-init:children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]">
		<!-- on-mouseEnter="p:[transform:translateZ(10px)]"
		on-mouseLeave="p:[transform:translateZ(0px)]" -->
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
</div>
