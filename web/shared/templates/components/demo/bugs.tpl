<div class="full-xy flex-center">
	<ul class="flex-wrap-center p15-grid">
		<li>
			<div class="bg-moxie flex-center width-128 height-128 radius-2"
				u init-with="p:[scaleY:0, transform-origin:center top]"
				on-init="a:[scaleY:0:1:1000:(.8,.1,1,.05):0:1:f]">
				<h1 class="txt-14 semibold txt-center">scaleY<br/>cubic-bezier</h1>
			</div>
		</li>

		<li>
			<div class="bg-auburn flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:0, transform-origin:center center]"
				on-init="a:[bounceIn-subtle-o:1000:linear:0:1:f, opacity:0:1:800:linear:0:1:f]">
				<h1 class="txt-14 semibold txt-center">custom transforms no longer work</h1>
			</div>
		</li>

		<!-- <li>
			<div class="bg-auburn flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:0, transform-origin:center center]"
				on-init="a:[slideInDown-subtle:1000:linear:0:1:f]">
				<h1 class="txt-14 semibold txt-center">slideInDown-subtle<br/>opacity</h1>
			</div>
		</li> -->

		<li>
			<div class="bg-moxie flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[translateX:-100px:0px:350:easeInOutExpo:0:1:f, rotate:-60deg:0deg:350:easeInExpo:0:1:f, scaleX:0:1:350:easeInBack:0:1:f, scaleY:0:1:350:easeInBack:0:1:f]">
				<h1 class="txt-14 semibold txt-center">transform property animations</h1>
			</div>
		</li>

		<li>
			<div class="relative width-128 height-128 flex-center">
				<svg class="fill-moxie absolute top-0 left-0 width-128 height-128" viewBox="0 0 128 128">
					<rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" rx="2"
						u init-with="p:[stroke:#F6C64E, transform-origin:center center, stroke-dasharray:115.47, stroke-dashoffset:38.49]"
						on-init="a:[stroke:#F6C64E:#55A4B7:450:easeOutSine:250:1:f, stroke-dashoffset:38.49:0:450:easeOutSine:250:1:f]"></rect>
				</svg>
				<h1 class="relative z-index-2 txt-14 semibold txt-center">stroke-dashoffset</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:0, rotate:40deg, transform-origin:center top]"
				on-init="s:[demo-1-state:self]"
				when-demo-1-state="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">when states</h1>
			</div>
		</li>

		<li class="perspective-container">
			<a class="bg-auburn flex-center width-128 height-128 radius-2 translateZ-hover"
				u init-with="p:[opacity:0, rotate:40deg, transform-origin:center top]"
				on-init="s:[demo-1-state:self]"
				when-demo-1-state="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">CSS hovers</h1>
			</a>
		</li>

	</ul>
</div>
