<div class="full-xy flex-center">
	<ul class="flex-wrap-center p15-grid">
		<li>
			<div class="relative width-128 height-128 flex-center"
				u on-init="s:[portal-hover:public]">
				<svg class="fill-moxie absolute top-0 left-0 width-128 height-128" viewBox="0 0 128 128">
					<rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" rx="2"
						u init-with="p:[stroke-dasharray:1207, stroke-dashoffset:1207, stroke:rgba(57, 96, 120, 1)]"
						when-portal-hover="a:[portal-progress-color:2000:linear:250:1:f, stroke-dashoffset:1207:0:2000:linear:250:1:f] | s:[portal-complete:public:2000]"></rect>
				</svg>
				<h1 class="relative z-index-2 txt-14 semibold txt-center">stroke-dashoffset</h1>
			</div>
		</li>

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
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f] | s:[show-header-elem:public]:delay-1000">
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
		</li>
		<li>
			<div class="bg-auburn p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f]:delay-200 | send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">bugs on init-with</h1>
			</div>
		</li>
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


					</ul>
				</div>
			</div>
		</li>
		-->

		<!-- <li>
			<div class="relative bg-moxie p10xy flex-center width-128 height-128 radius-2">
				<h1 class="txt-14 semibold txt-center">layered when states on same element as on-init don't work</h1>
				<a class="category-tile bg-household absolute top-0 left-0 full-xy" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
					u init-with="p:[opacity:0]"
					on-init="s:[category-tile-init:public:delay-1000]"
					when-category-tile-init="a:[bounceIn-subtle:1000:linear:0:1:f]"
					on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]">
					<svg width="128px" height="128px" viewBox="0 0 150 150">
						<rect x="0" y="0" width="128" height="128" fill="none"></rect>
					</svg>
					<div class="category-tile-inside">
						<div class="category-tile-icon"
							u init-with="p:[opacity:0, transform-origin:center center]"
							when-category-tile-init="a:[icon-enter:1000:linear:250:1:f]">
							<svg viewBox="0 0 100 100">
								<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
									u init-with="p:[sdo:286, stroke-dasharray:286]"
									when-category-tile-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
							</svg>
						</div>
						<h1 u init-with="p:[opacity:0]"
							when-category-tile-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
						<div class="category-tile-border"
							u init-with="p:[transform-origin:center center, scaleX:0]"
							when-category-tile-init="a:[scaleX:0:1:450:easeOutSine:200:1:f]"></div>
					</div>
					<span class="category-tile-count">6</span>
				</a>
			</div>
		</li> -->
		<li>
			<div class="bg-gold p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[icon-enter:1000:linear:0:2:f]:+1000">
				<h1 class="txt-14 semibold txt-center">Icon enter</h1>
			</div>
		</li>
		<li>
			<div class="bg-gold p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[frame-enter:1000:linear:0:1:f]:+1000">
				<h1 class="txt-14 semibold txt-center">Frame enter</h1>
			</div>
		</li>
		<li>
			<div class="bg-moxie p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[opacity:0:1:1000:linear:0:10:a, scale:0:1:1000:linear:0:10:a,rotate:-360deg:0deg:1000:easeOutSine:0:10:a]| send:[show-header-elem:public]:delay-1000">
				<h1 class="txt-14 semibold txt-center">Verify Iterations</h1>
			</div>
		</li>
		<li>
			<div class="bg-auburn p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[transform-origin:center center]"
				on-init="a:[background-color:rgba(255,255,255,1):rgba(0,0,0,1):5000:linear:0:10:a, scale:1.25:1:5000:linear:0:10:ar]">
				<h1 class="txt-14 semibold txt-center p10xy" u on-init="a:[background-color:rgba(0,0,0,1):rgba(255,255,255,1):5000:linear:0:10:a]">Jesus</h1>
			</div>
		</li>
		<li>
			<div class="p10xy flex-center width-128 height-128 radius-2"
				u init-with="p:[background:rgba(236, 116, 101, 1)]"
				on-init="a:[background:rgba(236, 116, 101, 1):rgba(57, 96, 120, 1):10000:linear:10:a]">
				<h1 class="txt-14 semibold txt-center p15xy"
					u init-with="p:[background-color:rgba(255,255,255,1), color:rgba(236, 116, 101, 1)]"
					on-init="a:[background-color:rgba(255,255,255,0):rgba(255,255,255,1):1500:linear:0:100:a, color:rgba(236, 116, 101, 1):rgba(57, 96, 120, 1):10000:linear:10:ar]">RGBA values</h1>
					<!-- Init-with isn't taking the values
					-->
			</div>
		</li>
		<li>
			<div class="bg-slate p10xy flex-center width-128 height-128 radius-2">
				<div class="category-tile-icon">
					<svg viewBox="0 0 100 100">
						<g stroke-width="1" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[stroke:rgba(255,255,255,1), fill:rgba(38, 44, 46, 1)]"
							on-init="a:[stroke:rgba(255,255,255,1):rgba(255,255,255,0):1500:easeInOutCirc:0:10:a, fill:rgba(38, 44, 46, 1):rgba(38, 44, 46, 0)750:easeOutCirc:0:10:a]">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</g>
					</svg>
				</div>
			</div>
		</li>
	</ul>
</div>
