<div class="full-xy flex-center">
	<ul class="flex-wrap-center p15-grid">
	<!-- 	<li>
			<div class="bg-moxie flex-center width-128 height-128 radius-2"/>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[scaleY:0, transform-origin:center top]"
				on-init="a:[scaleY:0:1:1000:(.8,.1,1,.05):0:1:f]"
				on-click="a:[scaleY:0:1:1000:(.8,.1,1,.05):0:1:f]">
				<h1 class="txt-14 semibold txt-center">scaleY<br/>cubic-bezier</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:0, transform-origin:center center]"
				on-init="a:[bounceIn-subtle:1000:linear:0:1:f]"
				on-click="a:[bounceIn-subtle:1000:linear:0:1:f]">
				<h1 class="txt-14 semibold txt-center lowercase">custom transforms work</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:0, transform-origin:center center]"
				on-init="a:[slideInDown-subtle:1000:bouncePast:0:1:f]">
				<h1 class="txt-14 semibold txt-center lowercase">slideInDown-subtle<br/>opacity</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[translateX:-100px:0px:350:easeInOutExpo:0:1:f, rotate:-60deg:0deg:350:easeInExpo:0:1:f, scaleX:0:1:350:easeInBack:0:1:f, scaleY:0:1:350:easeInBack:0:1:f]">
				<h1 class="txt-14 semibold txt-center lowercase">transform property animations</h1>
			</div>
		</li>

		<li>
			<div class="relative width-128 height-128 flex-center">
				<svg class="fill-moxie absolute top-0 left-0 width-128 height-128" viewBox="0 0 128 128">
					<rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" rx="2"
						u init-with="p:[stroke:#F6C64E, transform-origin:center center, stroke-dasharray:115.47, stroke-dashoffset:38.49]"
						on-init="a:[stroke:#F6C64E:#FFFFFF:450:easeOutSine:250:1:f, stroke-dashoffset:38.49:0:450:easeOutSine:250:1:f]"></rect>
				</svg>
				<h1 class="relative z-index-2 txt-14 semibold txt-center">stroke-dashoffset</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[opacity:1, rotate:40deg, transform-origin:center top]"
				on-init="s:[demo-1-state:self]"
				on-click="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]|s:[demo-1-state:self]"
				when-demo-1-state="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">when states working</h1>
			</div>
		</li>

		<li class="perspective-container">
			<a class="bg bg-moxie p10xy flex-center width-128 height-128 radius-2 translateZ-hover"
				u init-with="p:[opacity:0, rotate:40deg, transform-origin:center top]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]"
				on-click="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">CSS hovers working with !important</h1>
			</a>
		</li>

		<li>
			<a class="bg bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-click="a:[scaleX:1:1.5:1000:easeOutElastic:0:1:f, scaleY:1:1.5:1000:easeOutElastic:0:1:f]"
				on-mouseenter="a:[scaleX:1:1.5:1000:easeOutElastic:0:1:f]"
				on-mouseleave="a:[scaleX:1.5:1:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">on-mouseenter + scaleX</h1>
			</a>
		</li>

		<li>
			<a class="bg bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:200:1:ar, scaleY:0:1:1000:bouncePast:0:1:f, rotate:180deg:0deg:1000:easeOutSine:0:11:ar]">
				<h1 class="txt-14 semibold txt-center">end points are wrong<br/>rotate(-0.0195deg)</h1>
			</a>
		</li>

		 <li>
			<div class="bg-moxie flex-center width-128 height-128 radius-2"
				u init-with="p:[scaleX:0, transform-origin:center top]"
				on-init="a:[scaleIn-bounceDown:1500:linear:0:1:f]">
				<h1 class="txt-14 semibold txt-center">Iteration count (2) doesn't work for custom transforms</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f]:delay-2500 | send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">external delays don't work<br/>:delay-2500</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[tro:left center]"
				on-init="a:[hiw-hour-hand:12000:linear:0:i:f]:delay-2000">
				<h1 class="txt-14 semibold txt-center">custom animation</h1>
			</div>
		</li>

		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[op:0, tro:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f] | send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">shortcuts</h1>
			</div>
		</li>


		<li>
			<a class="bg bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[scale:0.5:1:1000:easeOutElastic:0:1:f, rotate:-445deg:0deg:1000:bouncePast:0:2:ar]">
				<h1 class="txt-14 semibold txt-center">scale doesn't work</h1>
			</a>
		</li>
		<li>
			<a class="bg bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-mouseenter="a:[scale:1:1.5:1000:easeOutElastic:0:1:f]"
				on-mouseleave="a:[scale:1.5:1:1000:easeOutElastic:0:1:f]">
				<h1 class="txt-14 semibold txt-center">types</h1>
			</a>
		</li> -->
		<li>
			<div class="bg-auburn p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f]:delay-200 | send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">triggers</h1>
			</div>
		</li>
		<li>
			<div class="relative bg-auburn p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeOutElastic:0:1:f]:delay-2500">
				<h1 class="txt-14 semibold txt-center">stagger-children doesn't work</h1>
				<div class="absolute bottom-0 left-0 flex-center full-x">
					<ul class="pf-rating rating-stars" data-rating="4" data-half="true" u on-init="t-enter">
						<stagger-children on-init="[rating]:2500:linear">
							<li rating class="rating"
								u init-with="p:[opacity:0, transform:scale(0) rotate(-90deg)]"
								on-init="s:[stars-come-out:public:delay-1000]"
								when-stars-come-out="a:[opacity:0:1:200:easeOutSine:0:1:f, scaleX:0:1:500:easeOutBack:0:1:f, scaleY:0:1:500:easeOutBack:0:1:f, rotate:-90deg:0deg:500:easeOutExpo:0:1:f]">
								<svg class="fill-white" viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li rating class="rating"
								u init-with="p:[opacity:0, transform:scale(0) rotate(-90deg)]"
								on-init="s:[stars-come-out:public:delay-1000]"
								when-stars-come-out="a:[opacity:0:1:200:easeOutSine:0:1:f, scaleX:0:1:500:easeOutBack:0:1:f, scaleY:0:1:500:easeOutBack:0:1:f, rotate:-90deg:0deg:500:easeOutExpo:0:1:f]">
								<svg class="fill-white" viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li rating class="rating"
								u init-with="p:[opacity:0, transform:scale(0) rotate(-90deg)]"
								on-init="s:[stars-come-out:public:delay-1000]"
								when-stars-come-out="a:[opacity:0:1:200:easeOutSine:0:1:f, scaleX:0:1:500:easeOutBack:0:1:f, scaleY:0:1:500:easeOutBack:0:1:f, rotate:-90deg:0deg:500:easeOutExpo:0:1:f]">
								<svg class="fill-white" viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li rating class="rating"
								u init-with="p:[opacity:0, transform:scale(0) rotate(-90deg)]"
								on-init="s:[stars-come-out:public:delay-1000]"
								when-stars-come-out="a:[opacity:0:1:200:easeOutSine:0:1:f, scaleX:0:1:500:easeOutBack:0:1:f, scaleY:0:1:500:easeOutBack:0:1:f, rotate:-90deg:0deg:500:easeOutExpo:0:1:f]">
								<svg class="fill-white" viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li rating class="rating"
								u init-with="p:[opacity:0, transform:scale(0) rotate(-90deg)]"
								on-init="s:[stars-come-out:public:delay-1000]"
								when-stars-come-out="a:[opacity:0:1:200:easeOutSine:0:1:f, scaleX:0:1:500:easeOutBack:0:1:f, scaleY:0:1:500:easeOutBack:0:1:f, rotate:-90deg:0deg:500:easeOutExpo:0:1:f]">
								<svg class="fill-white" viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>

						</stagger-children>
					</ul>
				</div>
			</div>
		</li>
		<li>
			<div class="bg-gold p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[icon-enter:1000:linear:250:1:f]:delay-500">
				<h1 class="txt-14 semibold txt-center">Icon enter</h1>
			</div>
		</li>
		<li>
			<div class="bg-auburn p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f]:delay-200 | send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">Verify Iterations</h1>
			</div>
		</li>
	</ul>
</div>
