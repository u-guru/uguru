<div class="perspective-container full-xy flex-center p15xy" types='academic-desktop, academic-mobile, baking-desktop, baking-mobile, photo-desktop, photo-mobile, tech-desktop, tech-mobile, household-desktop, household-mobile' default-type="academic-desktop">
	<!-- NOTES FOR JESELLE - WORK ON CARDLETS FIRST
		Look for these comments within _tiles.scss (replace category with the actual category name)
		// profile tile transitions
			// profile tile transitions category
		// profile tile hover
			// profile tile hover category
		// profile tile click
			// profile tile click category

		These are universal and will apply to both desktop and mobile. Desktop and mobile should be differentiated by onEnter/onExit and parallax, not by color changes.

		With regards to hover transitions:
			- If you want separate transitiona for mouse-enter and mouse-leave
				- Put mouse-leave transitions in // profile tile transitions
				- Put mouse-enter transitions in // profile tile hover
			- If you want a transition to apply to BOTH mouse-enter and mouse-leave, put it in // profile tile transitions

		With regards to onEnter/onExit animations:
			- Let me know if you want the containers I did for cardlets here
	-->
	<div class="pf-tile-container" ng-if='activeType === "academic-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[academic-tile-init:public]"
		when-academic-tile-init="p:[op:1, tr:none]"
		when-academic-tile-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-academic">
			<div class="pf-tile-border">
				<div class="top"
					init-with="p:[op:0, tro:left center, tr:scaleX(0), t:transform 500ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1, tr:none:delay-500]"
					when-academic-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></div>
				<div class="right"
					init-with="p:[op:0, tro:center bottom, tr:scaleY(0), t:transform 500ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1, tr:none:delay-500]"
					when-academic-tile-exit="p:[op:0:delay-500, tr:scaleY(0)]"></div>
				<div class="bot"
					init-with="p:[op:0, tro:right center, tr:scaleX(0), t:transform 500ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1, tr:none:delay-500]"
					when-academic-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></div>
				<div class="left"
					init-with="p:[op:0, tro:center top, tr:scaleY(0), t:transform 500ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1, tr:none:delay-500]"
					when-academic-tile-exit="p:[op:0:delay-500, tr:scaleY(0)]"></div>
			</div>
			<div class="pf-tile-top">
				<div class="pf-pricing"
					init-with="p:[op:0, tr:translateX(-50%), t:opacity 375ms ease-out#transform 500ms ease-out]"
					when-academic-tile-init="p:[op:1:delay-875, tr:none:delay-750]">$10/hr</div>
				<div class="pf-tile-icon"
					init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-500, tr:none:delay-500]">
					<svg viewBox="0 0 100 100">
						<g>
							<path d="M61.993,18 L25.006,18 C23.334,18 22,19.344 22,21.001 L22,30 L25.002,30 C26.658,30 28,31.346 28,33 C28,34.657 26.658,36 25.002,36 L22,36 L22,47 L25.002,47 C26.658,47 28,48.346 28,50 C28,51.657 26.658,53 25.002,53 L22,53 L22,64 L25.002,64 C26.658,64 28,65.346 28,67 C28,68.657 26.658,70 25.002,70 L22,70 L22,78.999 C22,80.663 23.346,82 25.006,82 L61.993,82 C63.666,82 65,80.656 65,78.999 L65,21.001 C65,19.337 63.654,18 61.993,18 L61.993,18 Z"></path>
							<path d="M70,70 L74,77 L78,70 L78,17.9999998 L70,17.9999998 L70,70 Z"></path>
							<path d="M70.4117647,81 L83.5882353,81"></path>
							<rect x="16" y="64" width="12" height="6" rx="3"></rect>
							<rect x="16" y="47" width="12" height="6" rx="3"></rect>
							<rect x="16" y="30" width="12" height="6" rx="3"></rect>
						</g>
					</svg>
				</div>
				<h1 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-500, tr:none:delay-500]">Chem 133</h1>
				<h2 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-500, tr:none:delay-500]">Organic Chemistry</h2>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[tro:center bottom, op:0, tr:translateY(-100px) scaleY(3), t:opacity 250ms ease-out#transform 1000ms ease-in-out]"
				when-academic-tile-init="p:[op:1:delay-250, tr:none]">
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "academic-mobile"'
		init-default
		on-init="s:[academic-tile-init:public]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-academic"
			init-with="p:[bg:rgba(99#112#116#0), t:background 500ms ease-out#transform 500ms ease-out]"
			when-academic-tile-init="p:[bg:rgba(99#112#116#1):delay-650]"
			when-academic-tile-exit="p:[op:0:delay-1000, t:opacity 1500ms cubic-bezier(0#.3#.02#.99)#transform 500ms ease-out]">
			<div class="pf-tile-border"
				init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
				when-academic-tile-init="p:[op:0.5, tr:none]"
				when-academic-tile-exit="p:[tr:rotateX(-30deg) rotateY(30deg):delay-1500, op:0:delay-2000]">
				<div class="top"></div>
				<div class="right"></div>
				<div class="bot"></div>
				<div class="left"></div>
			</div>
			<div class="pf-tile-top"
				init-with="p:[bg:rgba(99#112#116#0), t:background 500ms ease-out]"
				when-academic-tile-init="p:[bg:rgba(99#112#116#1):delay-650]"
				when-academic-tile-exit="p:[op:0:delay-1000, t:opacity 1500ms cubic-bezier(0#.3#.02#.99)]">
				<div class="pf-pricing"
					init-with="p:[op:0, t:500ms ease-out]"
					when-academic-tile-init="p:[op:1:delay-900]">$10/hr</div>
				<div class="pf-tile-icon"
					init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-1500, tr:none:delay-1500]"
					when-academic-tile-exit="p:[op:0:delay-750, t:opacity 750ms ease-out]">
					<svg viewBox="0 0 100 100">
						<g>
							<path d="M61.993,18 L25.006,18 C23.334,18 22,19.344 22,21.001 L22,30 L25.002,30 C26.658,30 28,31.346 28,33 C28,34.657 26.658,36 25.002,36 L22,36 L22,47 L25.002,47 C26.658,47 28,48.346 28,50 C28,51.657 26.658,53 25.002,53 L22,53 L22,64 L25.002,64 C26.658,64 28,65.346 28,67 C28,68.657 26.658,70 25.002,70 L22,70 L22,78.999 C22,80.663 23.346,82 25.006,82 L61.993,82 C63.666,82 65,80.656 65,78.999 L65,21.001 C65,19.337 63.654,18 61.993,18 L61.993,18 Z"></path>
							<path d="M70,70 L74,77 L78,70 L78,17.9999998 L70,17.9999998 L70,70 Z"></path>
							<path d="M70.4117647,81 L83.5882353,81"></path>
							<rect x="16" y="64" width="12" height="6" rx="3"></rect>
							<rect x="16" y="47" width="12" height="6" rx="3"></rect>
							<rect x="16" y="30" width="12" height="6" rx="3"></rect>
						</g>
					</svg>
				</div>
				<h1 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-1500, tr:none:delay-1500]"
					when-academic-tile-exit="p:[op:0:delay-750, t:opacity 750ms ease-out]">Chem 133</h1>
				<h2 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
					when-academic-tile-init="p:[op:1:delay-1500, tr:none:delay-1500]"
					when-academic-tile-exit="p:[op:0:delay-750, t:opacity 750ms ease-out]">Organic Chemistry</h2>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[tro:center bottom, op:0, tr:translateY(-100px) scaleY(3), t:opacity 250ms ease-out#transform 700ms ease-in-out]"
				when-academic-tile-init="p:[op:1:delay-750, tr:none:delay-500]"
				when-academic-tile-exit="p:[op:0:delay-750, t:opacity 1500ms cubic-bezier(0#.3#.02#.99)]">
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "baking-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[baking-tile-init:public]"
		when-baking-tile-init="p:[op:1, tr:none]"
		when-baking-tile-exit="p:[tro:left bottom, op:0:delay-1000, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px):delay-500, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-baking">
			<div class="pf-tile-top" style="background-image: url('https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e15/11427260_752534584858053_1867976098_n.jpg');"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-baking-tile-init="p:[op:1:delay-250]"
				when-baking-tile-exit="p:[op:0:delay-750]">
				<div class="full-x flex-center preserve-3d m15bottom" init-with="p:[op:0, tro:center top, tr:rotateX(180deg), t:opacity 250ms ease-out#transform 1000ms cubic-bezier(.43#-0.06#.68#1.23)]"
					when-baking-tile-init="p:[op:1:delay-500, tr:rotateX(0)]"
					when-baking-tile-exit="p:[op:0:delay-250, tr:rotateX(180deg)]">
					<h1>
						<span class="border"></span>
						<span class="border"></span>
						<div>Peach Pancake</div>
						<ul class="rating-stars" data-rating="4" data-half="true">
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
						</ul>
					</h1>
				</div>
				<div>
					<div class="pf-pricing large"
						init-with="p-op"
						when-baking-tile-init="a:[pf-jelly:set:(dur:1000ms#func:cubic-bezier(.43#-0.06#.68#1.23)):in:delay-1000]"
						when-baking-tile-exit="a:[pf-jelly:set:(dur:1000ms#dir:reverse#func:cubic-bezier(.43#-0.06#.68#1.23)):out]">
						<svg class="small" viewBox="0 0 104 74">
							<polygon points="102 37 52 72 2 37 52 2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#757575" fill-opacity="0.75"></polygon>
						</svg>
						<svg class="large" viewBox="0 0 156 74">
							<polygon points="154 37 78 72 2 37 78 2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#757575" fill-opacity="0.75"></polygon>
						</svg>
						<span>$10.50</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "baking-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[baking-tile-init:public]"
		when-baking-tile-init="p:[op:1, tr:none]"
		when-baking-tile-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-baking">
			<div class="pf-tile-top" style="background-image: url('https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/e15/11427260_752534584858053_1867976098_n.jpg');"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-baking-tile-init="p:[op:1:delay-150]"
				when-baking-tile-exit="p:[op:0:delay-250]">
				<div class="full-x flex-center preserve-3d m15bottom" init-with="p:[op:0, tro:center top, tr:rotateX(180deg), t:opacity 250ms ease-out#transform 1000ms cubic-bezier(.43#-0.06#.68#1.23)]"
					when-baking-tile-init="p:[op:1:delay-500, tr:rotateX(0)]"
					when-baking-tile-exit="p:[op:0:delay-250, tr:rotateX(180deg)]">
					<h1>
						<span class="border"></span>
						<span class="border"></span>
						<div>Peach Pancake</div>
						<ul class="rating-stars" data-rating="4" data-half="true">
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
							<li init-with="p-op"
								when-baking-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
								<svg viewBox="0 0 100 100">
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
									<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
								</svg>
							</li>
						</ul>
					</h1>
				</div>
				<div>
					<div class="pf-pricing large"
						init-with="p-op"
						when-baking-tile-init="a:[pf-jelly:set:(dur:1000ms#func:cubic-bezier(.43#-0.06#.68#1.23)):in:delay-1000]"
						when-baking-tile-exit="a:[pf-jelly:set:(dur:1000ms#dir:reverse#func:cubic-bezier(.43#-0.06#.68#1.23)):out]">
						<svg class="small" viewBox="0 0 104 74">
							<polygon points="102 37 52 72 2 37 52 2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#757575" fill-opacity="0.75"></polygon>
						</svg>
						<svg class="large" viewBox="0 0 156 74">
							<polygon points="154 37 78 72 2 37 78 2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#757575" fill-opacity="0.75"></polygon>
						</svg>
						<span>$10.50</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "photo-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[photo-tile-init:public]"
		when-photo-tile-init="p:[op:1, tr:none]"
		when-photo-tile-exit="p:[tro:left bottom, op:0:delay-750, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px):delay-250, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-photography">
			<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
				init-with="p:[op:0]"
				when-photo-tile-init="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
				when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
			<div class="pf-tile-border">
				<div>
					Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</div>
			</div>
			<div class="pf-tile-bottom">
				<h1 init-with="p:[op:0, t:opacity 250ms ease-out#transform 500ms ease-out]"
					when-photo-tile-init="p:[op:1:delay-1000]">Professional Headshots</h1>
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
				<div class="pf-pricing photo-price"
					init-with="p:[tro:center center, op:0]"
					when-photo-tile-init="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
					<div class="pf-border">
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
					</div>
					<span>$10/hr</span>
				</div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "photo-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[photo-tile-init:public]"
		when-photo-tile-init="p:[op:1, tr:none]"
		when-photo-tile-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-photography">
			<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
				init-with="p:[op:0]"
				when-photo-tile-init="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
				when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
			<div class="pf-tile-border">
				<div>
					Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</div>
			</div>
			<div class="pf-tile-bottom">
				<h1 init-with="p:[op:0, t:all 250ms ease-out]"
					when-photo-tile-init="p:[op:1:delay-1000]">Professional Headshots</h1>
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-photo-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
				<div class="pf-pricing photo-price"
					init-with="p:[tro:center center, op:0]"
					when-photo-tile-init="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
					<div class="pf-border">
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleX(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
						<div init-with="p:[tr:scaleY(0), t:transform 250ms ease-out]"
							when-photo-tile-init="p:[tr:none:delay-2000]"></div>
					</div>
					<span>$10/hr</span>
				</div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "tech-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[tech-tile-init:public]"
		when-tech-tile-init="p:[op:1, tr:none]"
		when-tech-tile-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-tech">
			<div class="pf-tile-top" style="background-image: url('http://www.iphoneinformer.com/wp-content/uploads/2015/11/wet-iPhone-6-2.jpg');"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-tech-tile-init="p:[op:1:delay-250]"
				when-tech-tile-exit="p:[op:0:delay-1000]">
				<div class="pf-pricing">
					<div>$10/hr</div>
					<div class="border border-corner">
						<span class="left"
							init-with="p:[op:0, tr:scaleY(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
							when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
							when-tech-tile-exit="p:[op:0:delay-1500, tr:scaleY(0):delay-1000]"></span>
						<span class="bot"
							init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
							when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
							when-tech-tile-exit="p:[op:0:delay-1500, tr:scaleX(0):delay-1000]"></span>
					</div>
				</div>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-tech-tile-init="p:[op:1:delay-250]"
				when-tech-tile-exit="p:[op:0:delay-1000]">
				<h1>Water Damage</h1>
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-900]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1000]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
				<div class="border border-top">
					<span class="left"
						init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
						when-tech-tile-init="p:[op:1, tr:none:delay-900]"
						when-tech-tile-exit="p:[op:0:delay-750, tr:scaleX(0):delay-250]"></span>
					<span class="right"
						init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
						when-tech-tile-init="p:[op:1, tr:none:delay-900]"
						when-tech-tile-exit="p:[op:0:delay-750, tr:scaleX(0):delay-250]"></span>
				</div>
			</div>
			<div class="border border-outside">
				<span class="top-let"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-250]"
					when-tech-tile-exit="p:[op:0:delay-1300, tr:scaleX(0):delay-800]"></span>
				<span class="top-right"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-250]"
					when-tech-tile-exit="p:[op:0:delay-1300, tr:scaleX(0):delay-800]"></span>
				<span class="right"
					init-with="p:[op:0, tr:scaleY(0), t:transform 300ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-750]"
					when-tech-tile-exit="p:[op:0:delay-800, tr:scaleY(0):delay-500]"></span>
				<span class="bot-left"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
					when-tech-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></span>
				<span class="bot-left"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
					when-tech-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></span>
				<span class="left"
					init-with="p:[op:0, tr:scaleY(0), t:transform 300ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-750]"
					when-tech-tile-exit="p:[op:0:delay-800, tr:scaleY(0):delay-500]"></span>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "tech-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[tech-tile-init:public]"
		when-tech-tile-init="p:[op:1, tr:none]"
		when-tech-tile-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-tech">
			<div class="pf-tile-top" style="background-image: url('http://www.iphoneinformer.com/wp-content/uploads/2015/11/wet-iPhone-6-2.jpg');"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-tech-tile-init="p:[op:1:delay-250]"
				when-tech-tile-exit="p:[op:0:delay-1000]">
				<div class="pf-pricing">
					<div>$10/hr</div>
					<div class="border border-corner">
						<span class="left"
							init-with="p:[op:0, tr:scaleY(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
							when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
							when-tech-tile-exit="p:[op:0:delay-1500, tr:scaleY(0):delay-1000]"></span>
						<span class="bot"
							init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
							when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
							when-tech-tile-exit="p:[op:0:delay-1500, tr:scaleX(0):delay-1000]"></span>
					</div>
				</div>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-tech-tile-init="p:[op:1:delay-250]"
				when-tech-tile-exit="p:[op:0:delay-1000]">
				<h1>Water Damage</h1>
				<ul class="rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-900]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1000]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-tech-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
				<div class="border border-top">
					<span class="left"
						init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
						when-tech-tile-init="p:[op:1, tr:none:delay-900]"
						when-tech-tile-exit="p:[op:0:delay-750, tr:scaleX(0):delay-250]"></span>
					<span class="right"
						init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
						when-tech-tile-init="p:[op:1, tr:none:delay-900]"
						when-tech-tile-exit="p:[op:0:delay-750, tr:scaleX(0):delay-250]"></span>
				</div>
			</div>
			<div class="border border-outside">
				<span class="top-let"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-250]"
					when-tech-tile-exit="p:[op:0:delay-1300, tr:scaleX(0):delay-800]"></span>
				<span class="top-right"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-250]"
					when-tech-tile-exit="p:[op:0:delay-1300, tr:scaleX(0):delay-800]"></span>
				<span class="right"
					init-with="p:[op:0, tr:scaleY(0), t:transform 300ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-750]"
					when-tech-tile-exit="p:[op:0:delay-800, tr:scaleY(0):delay-500]"></span>
				<span class="bot-left"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
					when-tech-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></span>
				<span class="bot-left"
					init-with="p:[op:0, tr:scaleX(0), t:transform 500ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-1250]"
					when-tech-tile-exit="p:[op:0:delay-500, tr:scaleX(0)]"></span>
				<span class="left"
					init-with="p:[op:0, tr:scaleY(0), t:transform 300ms cubic-bezier(0#.66#.47#1.09)]"
					when-tech-tile-init="p:[op:1, tr:none:delay-750]"
					when-tech-tile-exit="p:[op:0:delay-800, tr:scaleY(0):delay-500]"></span>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "household-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[household-tile-init:public]"
		when-household-tile-init="p:[op:1, tr:none]"
		when-household-tile-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-household">
			<div class="pf-tile-top" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg')"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-household-tile-init="p:[op:1:delay-250]"
				when-household-tile-exit="p:[op:0:delay-250]"></div>
			<div class="pf-tile-bg"
				init-with="p:[overflow:visible, t:opacity 500ms ease-out]"
				when-household-tile-init="p:[overflow:hidden:delay-1800]"
				when-household-tile-exit="p:[op:0:delay-250]">
				<svg viewBox="0 0 380 270">
					<defs>
						<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="bub-front-color">
							<stop stop-color="#FFFFFF" stop-opacity="0.95" offset="50%"></stop>
							<stop stop-color="#FFFFFF" offset="75%"></stop>
							<stop stop-color="#FFFFFF" offset="100%"></stop>
						</linearGradient>
						<clipPath id="bub-front">
							<path d="M380,232.86657 L380,270 L0,270 L0,220.709868 C2.16596384,220.57302 4.39777929,220.871587 6.57140527,221.662722 C8.3456948,222.30851 9.93871913,223.230642 11.3187783,224.361936 L11.3187783,224.361936 C12.8392357,223.49499 14.4098703,222.717534 16.0218417,222.033641 C25.5164675,201.046161 49.8988441,190.660125 72.0996886,198.740571 C73.9285661,199.406228 75.6882315,200.177401 77.3742009,201.044587 C80.4663791,198.749381 83.9412144,196.85606 87.7488997,195.470176 C95.0002106,192.830915 102.509729,192.377358 109.545334,193.772166 C111.461677,192.499896 113.497517,191.354206 115.646585,190.352079 C138.648845,179.625948 165.912218,189.408537 176.541032,212.202102 C177.011345,213.210691 177.441207,214.227854 177.831285,215.251788 L177.831285,215.251788 C187.232978,216.037738 196.216846,219.700609 203.452111,225.762895 C207.441832,212.801315 217.303163,201.76507 231.10786,196.740571 C252.362839,189.004391 275.617423,198.194689 285.892402,217.409472 C288.819188,217.715303 291.748722,218.194799 294.658775,218.855828 C305.325735,211.100744 319.60069,208.63181 333.007518,213.511497 C342.358556,216.914996 349.735166,223.328556 354.423709,231.239808 C360.870177,228.537231 368.336736,228.165434 375.453375,230.755679 C377.054125,231.338304 378.572109,232.04711 380,232.86657 L380,232.86657 Z" class="path-front-bottom"></path>
							<path d="M270.318778,160.361936 C271.839236,159.49499 273.40987,158.717534 275.021842,158.033641 C284.516467,137.046161 308.898844,126.660125 331.099689,134.740571 C354.379555,143.21375 366.445067,168.783455 358.048764,191.852106 C353.682569,203.848128 344.642987,212.805587 333.697554,217.449282 C324.202928,238.436762 299.820552,248.822798 277.619707,240.742352 C254.859647,232.458367 242.818731,207.832815 250.138701,185.17961 C244.83899,181.003301 242.545009,173.793932 244.959532,167.160084 C247.976954,158.869787 257.205203,154.617673 265.571405,157.662722 C267.345695,158.30851 268.938719,159.230642 270.318778,160.361936 L270.318778,160.361936 Z" class="bub-front-15"></path>
							<path d="M218.040588,179.615952 C209.55483,172.439501 197.629002,169.872123 186.51158,173.918533 C169.935579,179.951705 161.433707,198.403093 167.522117,215.130863 C173.610527,231.858633 191.983663,240.528318 208.559665,234.495147 C209.293133,234.228186 210.010793,233.936911 210.71208,233.622547 C219.197839,240.798998 231.123666,243.366376 242.241088,239.319965 C258.817089,233.286794 267.318962,214.835406 261.230551,198.107636 C255.142141,181.379866 236.769005,172.710181 220.193004,178.743352 C219.459535,179.010313 218.741875,179.301588 218.040588,179.615952 L218.040588,179.615952 L218.040588,179.615952 Z" class="bub-front-14"></path>
							<path d="M334.487712,182.615952 C326.001953,175.439501 314.076126,172.872123 302.958704,176.918533 C286.382702,182.951705 277.88083,201.403093 283.96924,218.130863 C290.057651,234.858633 308.430787,243.528318 325.006788,237.495147 C325.740257,237.228186 326.457917,236.936911 327.159203,236.622547 C335.644962,243.798998 347.570789,246.366376 358.688211,242.319965 C375.264213,236.286794 383.766085,217.835406 377.677675,201.107636 C371.589264,184.379866 353.216129,175.710181 336.640127,181.743352 C335.906658,182.010313 335.188998,182.301588 334.487712,182.615952 L334.487712,182.615952 L334.487712,182.615952 Z" class="bub-front-13"></path>
							<path d="M70.6225956,239.116563 C72.2640459,238.509087 73.8691962,237.80565 75.4292438,237.010406 C97.6096144,243.227593 121.238469,231.225624 129.318916,209.02478 C137.792094,185.744914 125.960125,160.066306 102.891474,151.670003 C90.895452,147.303808 78.2231086,148.470786 67.6302433,153.870565 C45.4498727,147.653378 21.8210181,159.655347 13.7405715,181.856192 C5.4565872,204.616251 16.5811033,229.669128 38.6396503,238.622906 C38.4323,245.3672 42.4804554,251.758584 49.1143033,254.173107 C57.4045999,257.190528 66.5937126,252.854485 69.638761,244.488283 C70.2845496,242.713993 70.6021323,240.900931 70.6225956,239.116563 L70.6225956,239.116563 L70.6225956,239.116563 Z" class="bub-front-12"></path>
							<path d="M237.36829,149.04246 C246.375073,152.320661 250.994675,162.346459 247.686459,171.435708 C244.378243,180.524956 234.394964,185.235741 225.388181,181.95754 C216.381398,178.679339 211.761796,168.653541 215.070012,159.564292 C218.378228,150.475044 228.361507,145.764259 237.36829,149.04246 L237.36829,149.04246 L237.36829,149.04246 Z" class="bub-front-11"></path>
							<path d="M260.914846,138.446768 C264.801942,137.041825 269.110469,139.060733 270.53821,142.956125 C271.965951,146.851517 269.97225,151.148288 266.085154,152.553232 C262.198058,153.958175 257.889531,151.939267 256.46179,148.043875 C255.034049,144.148483 257.02775,139.851712 260.914846,138.446768 L260.914846,138.446768 L260.914846,138.446768 Z" class="bub-front-10 "></path>
							<path d="M176.308446,148.382765 C196.895379,140.889734 219.714303,151.657243 227.275939,172.432668 C234.837576,193.208093 224.278487,216.124204 203.691554,223.617235 C183.104621,231.110266 160.285697,220.342757 152.724061,199.567332 C145.162424,178.791907 155.721513,155.875796 176.308446,148.382765 L176.308446,148.382765 L176.308446,148.382765 Z" class="bub-front-9 "></path>
							<path d="M-7.68343007,154.310521 C3.63938296,150.189354 16.1897911,156.111483 20.3486911,167.537967 C24.5075911,178.964451 18.7000921,191.568312 7.37727905,195.689479 C-3.94553399,199.810646 -16.4959421,193.888517 -20.6548421,182.462033 C-24.8137421,171.035549 -19.0062431,158.431688 -7.68343007,154.310521 L-7.68343007,154.310521 L-7.68343007,154.310521 Z" class="bub-front-8 "></path>
							<path d="M157.051898,135.83648 C180.120549,144.232782 191.952518,169.91139 183.479339,193.191256 C175.006161,216.471122 149.436456,228.536634 126.367805,220.140332 C103.299154,211.74403 91.4671849,186.065422 99.9403632,162.785556 C108.413541,139.50569 133.983246,127.440177 157.051898,135.83648 L157.051898,135.83648 L157.051898,135.83648 Z" class="bub-front-7"></path>
							<path d="M-6.40940768,132.927146 C2.66048352,129.625976 12.7137129,134.369768 16.0451085,143.522702 C19.3765042,152.675637 14.7245344,162.771683 5.65464325,166.072854 C-3.41524795,169.374024 -13.4684773,164.630232 -16.799873,155.477298 C-20.1312686,146.324363 -15.4792989,136.228317 -6.40940768,132.927146 L-6.40940768,132.927146 L-6.40940768,132.927146 Z" class="bub-front-6 "></path>
							<path d="M27.3427554,180.710471 C42.1211101,186.089352 49.700965,202.53971 44.2728352,217.453375 C38.8447054,232.367039 22.4641131,240.096508 7.6857584,234.717626 C-7.09259632,229.338745 -14.6724512,212.888387 -9.2443214,197.974723 C-3.81619157,183.061058 12.5644007,175.33159 27.3427554,180.710471 L27.3427554,180.710471 L27.3427554,180.710471 Z" class="bub-front-5 "></path>
							<path d="M389.342755,184.710471 C404.12111,190.089352 411.700965,206.53971 406.272835,221.453375 C400.844705,236.367039 384.464113,244.096508 369.685758,238.717626 C354.907404,233.338745 347.327549,216.888387 352.755679,201.974723 C358.183808,187.061058 374.564401,179.33159 389.342755,184.710471 L389.342755,184.710471 L389.342755,184.710471 Z" class="bub-front-4 "></path>
							<path d="M389.342755,135.710471 C404.12111,141.089352 411.700965,157.53971 406.272835,172.453375 C400.844705,187.367039 384.464113,195.096508 369.685758,189.717626 C354.907404,184.338745 347.327549,167.888387 352.755679,152.974723 C358.183808,138.061058 374.564401,130.33159 389.342755,135.710471 L389.342755,135.710471 L389.342755,135.710471 Z" class="bub-front-3 "></path>
							<path d="M237.532025,133.04246 C246.601917,136.320661 251.253886,146.346459 247.922491,155.435708 C244.591095,164.524956 234.537866,169.235741 225.467975,165.95754 C216.398083,162.679339 211.746114,152.653541 215.077509,143.564292 C218.408905,134.475044 228.462134,129.764259 237.532025,133.04246 L237.532025,133.04246 L237.532025,133.04246 Z" class="bub-front-2 "></path>
							<path d="M49.0851538,135.446768 C52.97225,136.851712 54.9659513,141.148483 53.5382103,145.043875 C52.1104693,148.939267 47.8019425,150.958175 43.9148462,149.553232 C40.02775,148.148288 38.0340487,143.851517 39.4617897,139.956125 C40.8895307,136.060733 45.1980575,134.041825 49.0851538,135.446768 L49.0851538,135.446768 L49.0851538,135.446768 Z" class="bub-front-1 "></path>
						</clipPath>
					</defs>
					<g class="bubbles" fill="#FFFFFF" fill-rule="evenodd">
						<g class="bub-back"
							init-with="p:[op:0, t:all 500ms ease-out, tr:none]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-450] | p:[op:0:delay-1750, tr:translateY(100%):delay-1750]">
							<g init-with="p:[op:0, tro:center center]"
								when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-800]">
								<path d="M186.36829,41.0424598 C195.375073,44.3206607 199.994675,54.3464594 196.686459,63.4357079 C193.378243,72.5249564 183.394964,77.2357412 174.388181,73.9575402 C165.381398,70.6793393 160.761796,60.6535406 164.070012,51.5642921 C167.378228,42.4750436 177.361507,37.7642588 186.36829,41.0424598 L186.36829,41.0424598 L186.36829,41.0424598 Z" class="bub-back-18"></path>
								<path d="M295.030127,16.3827652 C315.61706,8.8897345 338.435984,19.6572426 345.99762,40.4326677 C353.559256,61.2080927 343.000167,84.124204 322.413235,91.6172348 C301.826302,99.1102655 279.007378,88.3427574 271.445742,67.5673323 C263.884105,46.7919073 274.443194,23.875796 295.030127,16.3827652 L295.030127,16.3827652 L295.030127,16.3827652 Z" class="bub-back-17"></path>
								<path d="M240.030127,31.3827652 C260.61706,23.8897345 283.435984,34.6572426 290.99762,55.4326677 C298.559256,76.2080927 288.000167,99.124204 267.413235,106.617235 C246.826302,114.110266 224.007378,103.342757 216.445742,82.5673323 C208.884105,61.7919073 219.443194,38.875796 240.030127,31.3827652 L240.030127,31.3827652 L240.030127,31.3827652 Z" class="bub-back-16"></path>
								<path d="M138.31657,30.3105209 C149.639383,26.189354 162.189791,32.1114834 166.348691,43.5379672 C170.507591,54.964451 164.700092,67.5683122 153.377279,71.6894791 C142.054466,75.810646 129.504058,69.8885166 125.345158,58.4620328 C121.186258,47.035549 126.993757,34.4316878 138.31657,30.3105209 L138.31657,30.3105209 L138.31657,30.3105209 Z" class="bub-back-15"></path>
								<path d="M204.31657,41.3105209 C215.639383,37.189354 228.189791,43.1114834 232.348691,54.5379672 C236.507591,65.964451 230.700092,78.5683122 219.377279,82.6894791 C208.054466,86.810646 195.504058,80.8885166 191.345158,69.4620328 C187.186258,58.035549 192.993757,45.4316878 204.31657,41.3105209 L204.31657,41.3105209 L204.31657,41.3105209 Z" class="bub-back-14"></path>
								<path d="M104.467975,45.049764 C113.537866,41.7485936 123.591095,46.4923856 126.922491,55.64532 C130.253886,64.7982544 125.601917,74.8943011 116.532025,78.1954715 C107.462134,81.496642 97.4089049,76.75285 94.0775092,67.5999156 C90.7461136,58.4469812 95.3980833,48.3509345 104.467975,45.049764 L104.467975,45.049764 L104.467975,45.049764 Z" class="bub-back-13"></path>
								<path d="M122.467975,55.049764 C131.537866,51.7485936 141.591095,56.4923856 144.922491,65.64532 C148.253886,74.7982544 143.601917,84.8943011 134.532025,88.1954715 C125.462134,91.496642 115.408905,86.75285 112.077509,77.5999156 C108.746114,68.4469812 113.398083,58.3509345 122.467975,55.049764 L122.467975,55.049764 L122.467975,55.049764 Z" class="bub-back-12"></path>
								<path d="M166.467975,55.049764 C175.537866,51.7485936 185.591095,56.4923856 188.922491,65.64532 C192.253886,74.7982544 187.601917,84.8943011 178.532025,88.1954715 C169.462134,91.496642 159.408905,86.75285 156.077509,77.5999156 C152.746114,68.4469812 157.398083,58.3509345 166.467975,55.049764 L166.467975,55.049764 L166.467975,55.049764 Z" class="bub-back-11"></path>
								<path d="M250.032025,15.0424598 C259.101917,18.3206607 263.753886,28.3464594 260.422491,37.4357079 C257.091095,46.5249564 247.037866,51.2357412 237.967975,47.9575402 C228.898083,44.6793393 224.246114,34.6535406 227.577509,25.5642921 C230.908905,16.4750436 240.962134,11.7642588 250.032025,15.0424598 L250.032025,15.0424598 L250.032025,15.0424598 Z" class="bub-back-10"></path>
								<path d="M213.532025,23.0424598 C222.601917,26.3206607 227.253886,36.3464594 223.922491,45.4357079 C220.591095,54.5249564 210.537866,59.2357412 201.467975,55.9575402 C192.398083,52.6793393 187.746114,42.6535406 191.077509,33.5642921 C194.408905,24.4750436 204.462134,19.7642588 213.532025,23.0424598 L213.532025,23.0424598 L213.532025,23.0424598 Z" class="bub-back-9"></path>
								<path d="M354.532025,60.0424598 C363.601917,63.3206607 368.253886,73.3464594 364.922491,82.4357079 C361.591095,91.5249564 351.537866,96.2357412 342.467975,92.9575402 C333.398083,89.6793393 328.746114,79.6535406 332.077509,70.5642921 C335.408905,61.4750436 345.462134,56.7642588 354.532025,60.0424598 L354.532025,60.0424598 L354.532025,60.0424598 Z" class="bub-back-8"></path>
								<path d="M258.914846,6.44676848 C262.801942,5.04182522 267.110469,7.06073298 268.53821,10.9561252 C269.965951,14.8515174 267.97225,19.1482883 264.085154,20.5532315 C260.198058,21.9581748 255.889531,19.939267 254.46179,16.0438748 C253.034049,12.1484826 255.02775,7.85171175 258.914846,6.44676848 L258.914846,6.44676848 L258.914846,6.44676848 Z" class="bub-back-7"></path>
								<path d="M179.914846,2.44676848 C183.801942,1.04182522 188.110469,3.06073298 189.53821,6.95612519 C190.965951,10.8515174 188.97225,15.1482883 185.085154,16.5532315 C181.198058,17.9581748 176.889531,15.939267 175.46179,12.0438748 C174.034049,8.14848261 176.02775,3.85171175 179.914846,2.44676848 L179.914846,2.44676848 L179.914846,2.44676848 Z" class="bub-back-6"></path>
								<path d="M201.276564,6.29784566 C203.867962,5.36121681 206.740313,6.70715532 207.69214,9.30408346 C208.643968,11.9010116 207.314833,14.7655255 204.723436,15.7021543 C202.132038,16.6387832 199.259687,15.2928447 198.30786,12.6959165 C197.356032,10.0989884 198.685167,7.2344745 201.276564,6.29784566 L201.276564,6.29784566 L201.276564,6.29784566 Z" class="bub-back-5"></path>
							</g>
							<path d="M100.31657,12.3105209 C111.639383,8.18935397 124.189791,14.1114834 128.348691,25.5379672 C132.507591,36.964451 126.700092,49.5683122 115.377279,53.6894791 C104.054466,57.810646 91.5040579,51.8885166 87.3451579,40.4620328 C83.1862579,29.035549 88.9937569,16.4316878 100.31657,12.3105209 L100.31657,12.3105209 L100.31657,12.3105209 Z" class="bub-back-4 bb-1250"></path>
							<path d="M39.4679745,27.049764 C48.5378657,23.7485936 58.5910951,28.4923856 61.9224908,37.64532 C65.2538864,46.7982544 60.6019167,56.8943011 51.5320255,60.1954715 C42.4621343,63.496642 32.4089049,58.75285 29.0775092,49.5999156 C25.7461136,40.4469812 30.3980833,30.3509345 39.4679745,27.049764 L39.4679745,27.049764 L39.4679745,27.049764 Z" class="bub-back-3 bb-800"></path>
							<path d="M365.82562,6.83396784 C373.081533,9.4565286 376.803109,17.4771675 374.137993,24.7485663 C371.472876,32.0199651 363.430293,35.7885929 356.17438,33.1660322 C348.918467,30.5434714 345.196891,22.5228325 347.862007,15.2514337 C350.527124,7.9800349 358.569707,4.21140707 365.82562,6.83396784 L365.82562,6.83396784 L365.82562,6.83396784 Z" class="bub-back-2 bb-1250"></path>
							<path d="M162.779003,21.4467685 C166.666099,22.8517117 168.6598,27.1484826 167.232059,31.0438748 C165.804318,34.939267 161.495791,36.9581748 157.608695,35.5532315 C153.721599,34.1482883 151.727898,29.8515174 153.155639,25.9561252 C154.58338,22.060733 158.891907,20.0418252 162.779003,21.4467685 L162.779003,21.4467685 L162.779003,21.4467685 Z" class="bub-back-1"></path>
						</g>
						<g class="bub-mid"
							init-with="p:[op:0, tro:centerr center, t:all 500ms ease-out, tr:none]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-450] | p:[op:0:delay-2050, tr:translateY(100%):delay-2050]">
							<path d="M115.696926,83.0336412 C106.2023,62.0461607 81.8199237,51.6601249 59.6190792,59.7405715 C36.3392132,68.2137497 24.273701,93.7834547 32.6700034,116.852106 C37.0361983,128.848128 46.0757807,137.805587 57.0212138,142.449282 C66.5158396,163.436762 90.8982162,173.822798 113.099061,165.742352 C135.85912,157.458367 154.00358,135.394667 146.683611,112.741463 C151.983322,108.565154 154.277303,101.355784 151.862779,94.7219363 C148.845358,86.4316397 133.513564,79.6176735 125.147363,82.6627219 C123.373073,83.3085105 121.780049,84.2306418 120.39999,85.361936 C118.879532,84.4949901 117.308898,83.717534 115.696926,83.0336412 L115.696926,83.0336412 Z" class="bub-mid-12"></path>
							<path d="M161.959412,104.615952 C170.44517,97.4395013 182.370998,94.8721228 193.48842,98.9185335 C210.064421,104.951705 218.566293,123.403093 212.477883,140.130863 C206.389473,156.858633 188.016337,165.528318 171.440335,159.495147 C170.706867,159.228186 169.989207,158.936911 169.28792,158.622547 C160.802161,165.798998 148.876334,168.366376 137.758912,164.319965 C121.182911,158.286794 112.681038,139.835406 118.769449,123.107636 C124.857859,106.379866 143.230995,97.7101807 159.806996,103.743352 C160.540465,104.010313 161.258125,104.301588 161.959412,104.615952 L161.959412,104.615952 L161.959412,104.615952 Z" class="bub-mid-11"></path>
							<path d="M39.3357458,115.615952 C47.8215046,108.439501 59.7473319,105.872123 70.8647538,109.918533 C87.4407552,115.951705 95.9426276,134.403093 89.8542173,151.130863 C83.7658069,167.858633 65.392671,176.528318 48.8166696,170.495147 C48.0832008,170.228186 47.3655408,169.936911 46.6642542,169.622547 C38.1784954,176.798998 26.2526681,179.366376 15.1352462,175.319965 C-1.44075524,169.286794 -9.94262762,150.835406 -3.85421727,134.107636 C2.23419307,117.379866 20.607329,108.710181 37.1833304,114.743352 C37.9167992,115.010313 38.6344592,115.301588 39.3357458,115.615952 L39.3357458,115.615952 L39.3357458,115.615952 Z" class="bub-mid-10"></path>
							<path d="M312.630243,89.1222332 C290.449873,82.9050461 266.821018,94.9070151 258.740571,117.10786 C250.267393,140.387726 262.099362,166.066334 285.168013,174.462636 C297.164035,178.828831 309.836378,177.661853 320.429244,172.262074 C342.609614,178.479261 366.238469,166.477292 374.318916,144.276448 C382.6029,121.516388 371.478384,96.4635113 349.419837,87.5097337 C349.627187,80.76544 345.579032,74.3740556 338.945184,71.9595325 C330.654887,68.9421113 321.465775,73.2781547 318.420726,81.6443566 C317.774937,83.4186461 317.457355,85.2317081 317.436891,87.0160767 C315.795441,87.6235525 314.190291,88.3269893 312.630243,89.1222332 L312.630243,89.1222332 Z" class="bub-mid-9"></path>
							<path d="M142.63171,74.0424598 C133.624927,77.3206607 129.005325,87.3464594 132.313541,96.4357079 C135.621757,105.524956 145.605036,110.235741 154.611819,106.95754 C163.618602,103.679339 168.238204,93.6535406 164.929988,84.5642921 C161.621772,75.4750436 151.638493,70.7642588 142.63171,74.0424598 L142.63171,74.0424598 L142.63171,74.0424598 Z" class="bub-mid-8"></path>
							<path d="M119.085154,63.4467685 C115.198058,62.0418252 110.889531,64.060733 109.46179,67.9561252 C108.034049,71.8515174 110.02775,76.1482883 113.914846,77.5532315 C117.801942,78.9581748 122.110469,76.939267 123.53821,73.0438748 C124.965951,69.1484826 122.97225,64.8517117 119.085154,63.4467685 L119.085154,63.4467685 L119.085154,63.4467685 Z" class="bub-mid-7"></path>
							<path d="M203.691554,73.3827652 C183.104621,65.8897345 160.285697,76.6572426 152.724061,97.4326677 C145.162424,118.208093 155.721513,141.124204 176.308446,148.617235 C196.895379,156.110266 219.714303,145.342757 227.275939,124.567332 C234.837576,103.791907 224.278487,80.875796 203.691554,73.3827652 L203.691554,73.3827652 L203.691554,73.3827652 Z" class="bub-mid-6"></path>
							<path d="M241.68343,64.3105209 C230.360617,60.189354 217.810209,66.1114834 213.651309,77.5379672 C209.492409,88.964451 215.299908,101.568312 226.622721,105.689479 C237.945534,109.810646 250.495942,103.888517 254.654842,92.4620328 C258.813742,81.035549 253.006243,68.4316878 241.68343,64.3105209 L241.68343,64.3105209 L241.68343,64.3105209 Z" class="bub-mid-5"></path>
							<path d="M219.168013,89.6700034 C196.099362,98.0663058 184.267393,123.744914 192.740571,147.02478 C201.21375,170.304646 226.783455,182.370158 249.852106,173.973856 C272.920757,165.577553 284.752726,139.898945 276.279548,116.619079 C267.806369,93.3392132 242.236664,81.273701 219.168013,89.6700034 L219.168013,89.6700034 L219.168013,89.6700034 Z" class="bub-mid-4"></path>
							<path d="M285.532025,75.049764 C276.462134,71.7485936 266.408905,76.4923856 263.077509,85.64532 C259.746114,94.7982544 264.398083,104.894301 273.467975,108.195472 C282.537866,111.496642 292.591095,106.75285 295.922491,97.5999156 C299.253886,88.4469812 294.601917,78.3509345 285.532025,75.049764 L285.532025,75.049764 L285.532025,75.049764 Z" class="bub-mid-3"></path>
							<path d="M142.467975,58.0424598 C133.398083,61.3206607 128.746114,71.3464594 132.077509,80.4357079 C135.408905,89.5249564 145.462134,94.2357412 154.532025,90.9575402 C163.601917,87.6793393 168.253886,77.6535406 164.922491,68.5642921 C161.591095,59.4750436 151.537866,54.7642588 142.467975,58.0424598 L142.467975,58.0424598 L142.467975,58.0424598 Z" class="bub-mid-2"></path>
							<path d="M306.914846,59.4467685 C303.02775,60.8517117 301.034049,65.1484826 302.46179,69.0438748 C303.889531,72.939267 308.198058,74.9581748 312.085154,73.5532315 C315.97225,72.1482883 317.965951,67.8515174 316.53821,63.9561252 C315.110469,60.060733 310.801942,58.0418252 306.914846,59.4467685 L306.914846,59.4467685 L306.914846,59.4467685 Z" class="bub-mid-1"></path>
						</g>
						<g class="bub-front"
							init-with="p:[op:0, tro:center center]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-250]">
							<rect x="0" y="0" width="380" height="270" clip-path="url(#bub-front)" fill="url(#bub-front-color)"></rect>
						</g>
					</g>
				</svg>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[t:opacity 500ms ease-out]"
				when-household-tile-exit="p:[op:0:delay-250]">
				<div>
					<h1 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
						when-household-tile-init="p:[op:1:delay-1500, tr:none:delay-1500]">Furniture Care</h1>
					<ul class="rating-stars" data-rating="4" data-half="true">
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1900]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
					</ul>
				</div>
				<div class="pf-pricing"
					init-with="p:[op:0, tro:center center]"
					when-household-tile-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-2000]">$10/hr</div>
			</div>
			<div class="pf-tile-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "household-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[household-tile-init:public]"
		when-household-tile-init="p:[op:1, tr:none]"
		when-household-tile-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-household">
			<div class="pf-tile-top" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg')"
				init-with="p:[op:0, t:opacity 500ms ease-out]"
				when-household-tile-init="p:[op:1:delay-250]"
				when-household-tile-exit="p:[op:0:delay-250]"></div>
			<div class="pf-tile-bg"
				init-with="p:[overflow:visible, t:opacity 500ms ease-out]"
				when-household-tile-init="p:[overflow:hidden:delay-1800]"
				when-household-tile-exit="p:[op:0:delay-250]">
				<svg viewBox="0 0 380 270">
					<defs>
						<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="bub-front-color">
							<stop stop-color="#FFFFFF" stop-opacity="0.95" offset="50%"></stop>
							<stop stop-color="#FFFFFF" offset="75%"></stop>
							<stop stop-color="#FFFFFF" offset="100%"></stop>
						</linearGradient>
						<clipPath id="bub-front">
							<path d="M380,232.86657 L380,270 L0,270 L0,220.709868 C2.16596384,220.57302 4.39777929,220.871587 6.57140527,221.662722 C8.3456948,222.30851 9.93871913,223.230642 11.3187783,224.361936 L11.3187783,224.361936 C12.8392357,223.49499 14.4098703,222.717534 16.0218417,222.033641 C25.5164675,201.046161 49.8988441,190.660125 72.0996886,198.740571 C73.9285661,199.406228 75.6882315,200.177401 77.3742009,201.044587 C80.4663791,198.749381 83.9412144,196.85606 87.7488997,195.470176 C95.0002106,192.830915 102.509729,192.377358 109.545334,193.772166 C111.461677,192.499896 113.497517,191.354206 115.646585,190.352079 C138.648845,179.625948 165.912218,189.408537 176.541032,212.202102 C177.011345,213.210691 177.441207,214.227854 177.831285,215.251788 L177.831285,215.251788 C187.232978,216.037738 196.216846,219.700609 203.452111,225.762895 C207.441832,212.801315 217.303163,201.76507 231.10786,196.740571 C252.362839,189.004391 275.617423,198.194689 285.892402,217.409472 C288.819188,217.715303 291.748722,218.194799 294.658775,218.855828 C305.325735,211.100744 319.60069,208.63181 333.007518,213.511497 C342.358556,216.914996 349.735166,223.328556 354.423709,231.239808 C360.870177,228.537231 368.336736,228.165434 375.453375,230.755679 C377.054125,231.338304 378.572109,232.04711 380,232.86657 L380,232.86657 Z" class="path-front-bottom"></path>
							<path d="M270.318778,160.361936 C271.839236,159.49499 273.40987,158.717534 275.021842,158.033641 C284.516467,137.046161 308.898844,126.660125 331.099689,134.740571 C354.379555,143.21375 366.445067,168.783455 358.048764,191.852106 C353.682569,203.848128 344.642987,212.805587 333.697554,217.449282 C324.202928,238.436762 299.820552,248.822798 277.619707,240.742352 C254.859647,232.458367 242.818731,207.832815 250.138701,185.17961 C244.83899,181.003301 242.545009,173.793932 244.959532,167.160084 C247.976954,158.869787 257.205203,154.617673 265.571405,157.662722 C267.345695,158.30851 268.938719,159.230642 270.318778,160.361936 L270.318778,160.361936 Z" class="bub-front-15"></path>
							<path d="M218.040588,179.615952 C209.55483,172.439501 197.629002,169.872123 186.51158,173.918533 C169.935579,179.951705 161.433707,198.403093 167.522117,215.130863 C173.610527,231.858633 191.983663,240.528318 208.559665,234.495147 C209.293133,234.228186 210.010793,233.936911 210.71208,233.622547 C219.197839,240.798998 231.123666,243.366376 242.241088,239.319965 C258.817089,233.286794 267.318962,214.835406 261.230551,198.107636 C255.142141,181.379866 236.769005,172.710181 220.193004,178.743352 C219.459535,179.010313 218.741875,179.301588 218.040588,179.615952 L218.040588,179.615952 L218.040588,179.615952 Z" class="bub-front-14"></path>
							<path d="M334.487712,182.615952 C326.001953,175.439501 314.076126,172.872123 302.958704,176.918533 C286.382702,182.951705 277.88083,201.403093 283.96924,218.130863 C290.057651,234.858633 308.430787,243.528318 325.006788,237.495147 C325.740257,237.228186 326.457917,236.936911 327.159203,236.622547 C335.644962,243.798998 347.570789,246.366376 358.688211,242.319965 C375.264213,236.286794 383.766085,217.835406 377.677675,201.107636 C371.589264,184.379866 353.216129,175.710181 336.640127,181.743352 C335.906658,182.010313 335.188998,182.301588 334.487712,182.615952 L334.487712,182.615952 L334.487712,182.615952 Z" class="bub-front-13"></path>
							<path d="M70.6225956,239.116563 C72.2640459,238.509087 73.8691962,237.80565 75.4292438,237.010406 C97.6096144,243.227593 121.238469,231.225624 129.318916,209.02478 C137.792094,185.744914 125.960125,160.066306 102.891474,151.670003 C90.895452,147.303808 78.2231086,148.470786 67.6302433,153.870565 C45.4498727,147.653378 21.8210181,159.655347 13.7405715,181.856192 C5.4565872,204.616251 16.5811033,229.669128 38.6396503,238.622906 C38.4323,245.3672 42.4804554,251.758584 49.1143033,254.173107 C57.4045999,257.190528 66.5937126,252.854485 69.638761,244.488283 C70.2845496,242.713993 70.6021323,240.900931 70.6225956,239.116563 L70.6225956,239.116563 L70.6225956,239.116563 Z" class="bub-front-12"></path>
							<path d="M237.36829,149.04246 C246.375073,152.320661 250.994675,162.346459 247.686459,171.435708 C244.378243,180.524956 234.394964,185.235741 225.388181,181.95754 C216.381398,178.679339 211.761796,168.653541 215.070012,159.564292 C218.378228,150.475044 228.361507,145.764259 237.36829,149.04246 L237.36829,149.04246 L237.36829,149.04246 Z" class="bub-front-11"></path>
							<path d="M260.914846,138.446768 C264.801942,137.041825 269.110469,139.060733 270.53821,142.956125 C271.965951,146.851517 269.97225,151.148288 266.085154,152.553232 C262.198058,153.958175 257.889531,151.939267 256.46179,148.043875 C255.034049,144.148483 257.02775,139.851712 260.914846,138.446768 L260.914846,138.446768 L260.914846,138.446768 Z" class="bub-front-10 "></path>
							<path d="M176.308446,148.382765 C196.895379,140.889734 219.714303,151.657243 227.275939,172.432668 C234.837576,193.208093 224.278487,216.124204 203.691554,223.617235 C183.104621,231.110266 160.285697,220.342757 152.724061,199.567332 C145.162424,178.791907 155.721513,155.875796 176.308446,148.382765 L176.308446,148.382765 L176.308446,148.382765 Z" class="bub-front-9 "></path>
							<path d="M-7.68343007,154.310521 C3.63938296,150.189354 16.1897911,156.111483 20.3486911,167.537967 C24.5075911,178.964451 18.7000921,191.568312 7.37727905,195.689479 C-3.94553399,199.810646 -16.4959421,193.888517 -20.6548421,182.462033 C-24.8137421,171.035549 -19.0062431,158.431688 -7.68343007,154.310521 L-7.68343007,154.310521 L-7.68343007,154.310521 Z" class="bub-front-8 "></path>
							<path d="M157.051898,135.83648 C180.120549,144.232782 191.952518,169.91139 183.479339,193.191256 C175.006161,216.471122 149.436456,228.536634 126.367805,220.140332 C103.299154,211.74403 91.4671849,186.065422 99.9403632,162.785556 C108.413541,139.50569 133.983246,127.440177 157.051898,135.83648 L157.051898,135.83648 L157.051898,135.83648 Z" class="bub-front-7"></path>
							<path d="M-6.40940768,132.927146 C2.66048352,129.625976 12.7137129,134.369768 16.0451085,143.522702 C19.3765042,152.675637 14.7245344,162.771683 5.65464325,166.072854 C-3.41524795,169.374024 -13.4684773,164.630232 -16.799873,155.477298 C-20.1312686,146.324363 -15.4792989,136.228317 -6.40940768,132.927146 L-6.40940768,132.927146 L-6.40940768,132.927146 Z" class="bub-front-6 "></path>
							<path d="M27.3427554,180.710471 C42.1211101,186.089352 49.700965,202.53971 44.2728352,217.453375 C38.8447054,232.367039 22.4641131,240.096508 7.6857584,234.717626 C-7.09259632,229.338745 -14.6724512,212.888387 -9.2443214,197.974723 C-3.81619157,183.061058 12.5644007,175.33159 27.3427554,180.710471 L27.3427554,180.710471 L27.3427554,180.710471 Z" class="bub-front-5 "></path>
							<path d="M389.342755,184.710471 C404.12111,190.089352 411.700965,206.53971 406.272835,221.453375 C400.844705,236.367039 384.464113,244.096508 369.685758,238.717626 C354.907404,233.338745 347.327549,216.888387 352.755679,201.974723 C358.183808,187.061058 374.564401,179.33159 389.342755,184.710471 L389.342755,184.710471 L389.342755,184.710471 Z" class="bub-front-4 "></path>
							<path d="M389.342755,135.710471 C404.12111,141.089352 411.700965,157.53971 406.272835,172.453375 C400.844705,187.367039 384.464113,195.096508 369.685758,189.717626 C354.907404,184.338745 347.327549,167.888387 352.755679,152.974723 C358.183808,138.061058 374.564401,130.33159 389.342755,135.710471 L389.342755,135.710471 L389.342755,135.710471 Z" class="bub-front-3 "></path>
							<path d="M237.532025,133.04246 C246.601917,136.320661 251.253886,146.346459 247.922491,155.435708 C244.591095,164.524956 234.537866,169.235741 225.467975,165.95754 C216.398083,162.679339 211.746114,152.653541 215.077509,143.564292 C218.408905,134.475044 228.462134,129.764259 237.532025,133.04246 L237.532025,133.04246 L237.532025,133.04246 Z" class="bub-front-2 "></path>
							<path d="M49.0851538,135.446768 C52.97225,136.851712 54.9659513,141.148483 53.5382103,145.043875 C52.1104693,148.939267 47.8019425,150.958175 43.9148462,149.553232 C40.02775,148.148288 38.0340487,143.851517 39.4617897,139.956125 C40.8895307,136.060733 45.1980575,134.041825 49.0851538,135.446768 L49.0851538,135.446768 L49.0851538,135.446768 Z" class="bub-front-1 "></path>
						</clipPath>
					</defs>
					<g class="bubbles" fill="#FFFFFF" fill-rule="evenodd">
						<g class="bub-back"
							init-with="p:[op:0, t:all 500ms ease-out, tr:none]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-450] | p:[op:0:delay-1750, tr:translateY(100%):delay-1750]">
							<g init-with="p:[op:0, tro:center center]"
								when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-800]">
								<path d="M186.36829,41.0424598 C195.375073,44.3206607 199.994675,54.3464594 196.686459,63.4357079 C193.378243,72.5249564 183.394964,77.2357412 174.388181,73.9575402 C165.381398,70.6793393 160.761796,60.6535406 164.070012,51.5642921 C167.378228,42.4750436 177.361507,37.7642588 186.36829,41.0424598 L186.36829,41.0424598 L186.36829,41.0424598 Z" class="bub-back-18"></path>
								<path d="M295.030127,16.3827652 C315.61706,8.8897345 338.435984,19.6572426 345.99762,40.4326677 C353.559256,61.2080927 343.000167,84.124204 322.413235,91.6172348 C301.826302,99.1102655 279.007378,88.3427574 271.445742,67.5673323 C263.884105,46.7919073 274.443194,23.875796 295.030127,16.3827652 L295.030127,16.3827652 L295.030127,16.3827652 Z" class="bub-back-17"></path>
								<path d="M240.030127,31.3827652 C260.61706,23.8897345 283.435984,34.6572426 290.99762,55.4326677 C298.559256,76.2080927 288.000167,99.124204 267.413235,106.617235 C246.826302,114.110266 224.007378,103.342757 216.445742,82.5673323 C208.884105,61.7919073 219.443194,38.875796 240.030127,31.3827652 L240.030127,31.3827652 L240.030127,31.3827652 Z" class="bub-back-16"></path>
								<path d="M138.31657,30.3105209 C149.639383,26.189354 162.189791,32.1114834 166.348691,43.5379672 C170.507591,54.964451 164.700092,67.5683122 153.377279,71.6894791 C142.054466,75.810646 129.504058,69.8885166 125.345158,58.4620328 C121.186258,47.035549 126.993757,34.4316878 138.31657,30.3105209 L138.31657,30.3105209 L138.31657,30.3105209 Z" class="bub-back-15"></path>
								<path d="M204.31657,41.3105209 C215.639383,37.189354 228.189791,43.1114834 232.348691,54.5379672 C236.507591,65.964451 230.700092,78.5683122 219.377279,82.6894791 C208.054466,86.810646 195.504058,80.8885166 191.345158,69.4620328 C187.186258,58.035549 192.993757,45.4316878 204.31657,41.3105209 L204.31657,41.3105209 L204.31657,41.3105209 Z" class="bub-back-14"></path>
								<path d="M104.467975,45.049764 C113.537866,41.7485936 123.591095,46.4923856 126.922491,55.64532 C130.253886,64.7982544 125.601917,74.8943011 116.532025,78.1954715 C107.462134,81.496642 97.4089049,76.75285 94.0775092,67.5999156 C90.7461136,58.4469812 95.3980833,48.3509345 104.467975,45.049764 L104.467975,45.049764 L104.467975,45.049764 Z" class="bub-back-13"></path>
								<path d="M122.467975,55.049764 C131.537866,51.7485936 141.591095,56.4923856 144.922491,65.64532 C148.253886,74.7982544 143.601917,84.8943011 134.532025,88.1954715 C125.462134,91.496642 115.408905,86.75285 112.077509,77.5999156 C108.746114,68.4469812 113.398083,58.3509345 122.467975,55.049764 L122.467975,55.049764 L122.467975,55.049764 Z" class="bub-back-12"></path>
								<path d="M166.467975,55.049764 C175.537866,51.7485936 185.591095,56.4923856 188.922491,65.64532 C192.253886,74.7982544 187.601917,84.8943011 178.532025,88.1954715 C169.462134,91.496642 159.408905,86.75285 156.077509,77.5999156 C152.746114,68.4469812 157.398083,58.3509345 166.467975,55.049764 L166.467975,55.049764 L166.467975,55.049764 Z" class="bub-back-11"></path>
								<path d="M250.032025,15.0424598 C259.101917,18.3206607 263.753886,28.3464594 260.422491,37.4357079 C257.091095,46.5249564 247.037866,51.2357412 237.967975,47.9575402 C228.898083,44.6793393 224.246114,34.6535406 227.577509,25.5642921 C230.908905,16.4750436 240.962134,11.7642588 250.032025,15.0424598 L250.032025,15.0424598 L250.032025,15.0424598 Z" class="bub-back-10"></path>
								<path d="M213.532025,23.0424598 C222.601917,26.3206607 227.253886,36.3464594 223.922491,45.4357079 C220.591095,54.5249564 210.537866,59.2357412 201.467975,55.9575402 C192.398083,52.6793393 187.746114,42.6535406 191.077509,33.5642921 C194.408905,24.4750436 204.462134,19.7642588 213.532025,23.0424598 L213.532025,23.0424598 L213.532025,23.0424598 Z" class="bub-back-9"></path>
								<path d="M354.532025,60.0424598 C363.601917,63.3206607 368.253886,73.3464594 364.922491,82.4357079 C361.591095,91.5249564 351.537866,96.2357412 342.467975,92.9575402 C333.398083,89.6793393 328.746114,79.6535406 332.077509,70.5642921 C335.408905,61.4750436 345.462134,56.7642588 354.532025,60.0424598 L354.532025,60.0424598 L354.532025,60.0424598 Z" class="bub-back-8"></path>
								<path d="M258.914846,6.44676848 C262.801942,5.04182522 267.110469,7.06073298 268.53821,10.9561252 C269.965951,14.8515174 267.97225,19.1482883 264.085154,20.5532315 C260.198058,21.9581748 255.889531,19.939267 254.46179,16.0438748 C253.034049,12.1484826 255.02775,7.85171175 258.914846,6.44676848 L258.914846,6.44676848 L258.914846,6.44676848 Z" class="bub-back-7"></path>
								<path d="M179.914846,2.44676848 C183.801942,1.04182522 188.110469,3.06073298 189.53821,6.95612519 C190.965951,10.8515174 188.97225,15.1482883 185.085154,16.5532315 C181.198058,17.9581748 176.889531,15.939267 175.46179,12.0438748 C174.034049,8.14848261 176.02775,3.85171175 179.914846,2.44676848 L179.914846,2.44676848 L179.914846,2.44676848 Z" class="bub-back-6"></path>
								<path d="M201.276564,6.29784566 C203.867962,5.36121681 206.740313,6.70715532 207.69214,9.30408346 C208.643968,11.9010116 207.314833,14.7655255 204.723436,15.7021543 C202.132038,16.6387832 199.259687,15.2928447 198.30786,12.6959165 C197.356032,10.0989884 198.685167,7.2344745 201.276564,6.29784566 L201.276564,6.29784566 L201.276564,6.29784566 Z" class="bub-back-5"></path>
							</g>
							<path d="M100.31657,12.3105209 C111.639383,8.18935397 124.189791,14.1114834 128.348691,25.5379672 C132.507591,36.964451 126.700092,49.5683122 115.377279,53.6894791 C104.054466,57.810646 91.5040579,51.8885166 87.3451579,40.4620328 C83.1862579,29.035549 88.9937569,16.4316878 100.31657,12.3105209 L100.31657,12.3105209 L100.31657,12.3105209 Z" class="bub-back-4 bb-1250"></path>
							<path d="M39.4679745,27.049764 C48.5378657,23.7485936 58.5910951,28.4923856 61.9224908,37.64532 C65.2538864,46.7982544 60.6019167,56.8943011 51.5320255,60.1954715 C42.4621343,63.496642 32.4089049,58.75285 29.0775092,49.5999156 C25.7461136,40.4469812 30.3980833,30.3509345 39.4679745,27.049764 L39.4679745,27.049764 L39.4679745,27.049764 Z" class="bub-back-3 bb-800"></path>
							<path d="M365.82562,6.83396784 C373.081533,9.4565286 376.803109,17.4771675 374.137993,24.7485663 C371.472876,32.0199651 363.430293,35.7885929 356.17438,33.1660322 C348.918467,30.5434714 345.196891,22.5228325 347.862007,15.2514337 C350.527124,7.9800349 358.569707,4.21140707 365.82562,6.83396784 L365.82562,6.83396784 L365.82562,6.83396784 Z" class="bub-back-2 bb-1250"></path>
							<path d="M162.779003,21.4467685 C166.666099,22.8517117 168.6598,27.1484826 167.232059,31.0438748 C165.804318,34.939267 161.495791,36.9581748 157.608695,35.5532315 C153.721599,34.1482883 151.727898,29.8515174 153.155639,25.9561252 C154.58338,22.060733 158.891907,20.0418252 162.779003,21.4467685 L162.779003,21.4467685 L162.779003,21.4467685 Z" class="bub-back-1"></path>
						</g>
						<g class="bub-mid"
							init-with="p:[op:0, tro:centerr center, t:all 500ms ease-out, tr:none]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-450] | p:[op:0:delay-2050, tr:translateY(100%):delay-2050]">
							<path d="M115.696926,83.0336412 C106.2023,62.0461607 81.8199237,51.6601249 59.6190792,59.7405715 C36.3392132,68.2137497 24.273701,93.7834547 32.6700034,116.852106 C37.0361983,128.848128 46.0757807,137.805587 57.0212138,142.449282 C66.5158396,163.436762 90.8982162,173.822798 113.099061,165.742352 C135.85912,157.458367 154.00358,135.394667 146.683611,112.741463 C151.983322,108.565154 154.277303,101.355784 151.862779,94.7219363 C148.845358,86.4316397 133.513564,79.6176735 125.147363,82.6627219 C123.373073,83.3085105 121.780049,84.2306418 120.39999,85.361936 C118.879532,84.4949901 117.308898,83.717534 115.696926,83.0336412 L115.696926,83.0336412 Z" class="bub-mid-12"></path>
							<path d="M161.959412,104.615952 C170.44517,97.4395013 182.370998,94.8721228 193.48842,98.9185335 C210.064421,104.951705 218.566293,123.403093 212.477883,140.130863 C206.389473,156.858633 188.016337,165.528318 171.440335,159.495147 C170.706867,159.228186 169.989207,158.936911 169.28792,158.622547 C160.802161,165.798998 148.876334,168.366376 137.758912,164.319965 C121.182911,158.286794 112.681038,139.835406 118.769449,123.107636 C124.857859,106.379866 143.230995,97.7101807 159.806996,103.743352 C160.540465,104.010313 161.258125,104.301588 161.959412,104.615952 L161.959412,104.615952 L161.959412,104.615952 Z" class="bub-mid-11"></path>
							<path d="M39.3357458,115.615952 C47.8215046,108.439501 59.7473319,105.872123 70.8647538,109.918533 C87.4407552,115.951705 95.9426276,134.403093 89.8542173,151.130863 C83.7658069,167.858633 65.392671,176.528318 48.8166696,170.495147 C48.0832008,170.228186 47.3655408,169.936911 46.6642542,169.622547 C38.1784954,176.798998 26.2526681,179.366376 15.1352462,175.319965 C-1.44075524,169.286794 -9.94262762,150.835406 -3.85421727,134.107636 C2.23419307,117.379866 20.607329,108.710181 37.1833304,114.743352 C37.9167992,115.010313 38.6344592,115.301588 39.3357458,115.615952 L39.3357458,115.615952 L39.3357458,115.615952 Z" class="bub-mid-10"></path>
							<path d="M312.630243,89.1222332 C290.449873,82.9050461 266.821018,94.9070151 258.740571,117.10786 C250.267393,140.387726 262.099362,166.066334 285.168013,174.462636 C297.164035,178.828831 309.836378,177.661853 320.429244,172.262074 C342.609614,178.479261 366.238469,166.477292 374.318916,144.276448 C382.6029,121.516388 371.478384,96.4635113 349.419837,87.5097337 C349.627187,80.76544 345.579032,74.3740556 338.945184,71.9595325 C330.654887,68.9421113 321.465775,73.2781547 318.420726,81.6443566 C317.774937,83.4186461 317.457355,85.2317081 317.436891,87.0160767 C315.795441,87.6235525 314.190291,88.3269893 312.630243,89.1222332 L312.630243,89.1222332 Z" class="bub-mid-9"></path>
							<path d="M142.63171,74.0424598 C133.624927,77.3206607 129.005325,87.3464594 132.313541,96.4357079 C135.621757,105.524956 145.605036,110.235741 154.611819,106.95754 C163.618602,103.679339 168.238204,93.6535406 164.929988,84.5642921 C161.621772,75.4750436 151.638493,70.7642588 142.63171,74.0424598 L142.63171,74.0424598 L142.63171,74.0424598 Z" class="bub-mid-8"></path>
							<path d="M119.085154,63.4467685 C115.198058,62.0418252 110.889531,64.060733 109.46179,67.9561252 C108.034049,71.8515174 110.02775,76.1482883 113.914846,77.5532315 C117.801942,78.9581748 122.110469,76.939267 123.53821,73.0438748 C124.965951,69.1484826 122.97225,64.8517117 119.085154,63.4467685 L119.085154,63.4467685 L119.085154,63.4467685 Z" class="bub-mid-7"></path>
							<path d="M203.691554,73.3827652 C183.104621,65.8897345 160.285697,76.6572426 152.724061,97.4326677 C145.162424,118.208093 155.721513,141.124204 176.308446,148.617235 C196.895379,156.110266 219.714303,145.342757 227.275939,124.567332 C234.837576,103.791907 224.278487,80.875796 203.691554,73.3827652 L203.691554,73.3827652 L203.691554,73.3827652 Z" class="bub-mid-6"></path>
							<path d="M241.68343,64.3105209 C230.360617,60.189354 217.810209,66.1114834 213.651309,77.5379672 C209.492409,88.964451 215.299908,101.568312 226.622721,105.689479 C237.945534,109.810646 250.495942,103.888517 254.654842,92.4620328 C258.813742,81.035549 253.006243,68.4316878 241.68343,64.3105209 L241.68343,64.3105209 L241.68343,64.3105209 Z" class="bub-mid-5"></path>
							<path d="M219.168013,89.6700034 C196.099362,98.0663058 184.267393,123.744914 192.740571,147.02478 C201.21375,170.304646 226.783455,182.370158 249.852106,173.973856 C272.920757,165.577553 284.752726,139.898945 276.279548,116.619079 C267.806369,93.3392132 242.236664,81.273701 219.168013,89.6700034 L219.168013,89.6700034 L219.168013,89.6700034 Z" class="bub-mid-4"></path>
							<path d="M285.532025,75.049764 C276.462134,71.7485936 266.408905,76.4923856 263.077509,85.64532 C259.746114,94.7982544 264.398083,104.894301 273.467975,108.195472 C282.537866,111.496642 292.591095,106.75285 295.922491,97.5999156 C299.253886,88.4469812 294.601917,78.3509345 285.532025,75.049764 L285.532025,75.049764 L285.532025,75.049764 Z" class="bub-mid-3"></path>
							<path d="M142.467975,58.0424598 C133.398083,61.3206607 128.746114,71.3464594 132.077509,80.4357079 C135.408905,89.5249564 145.462134,94.2357412 154.532025,90.9575402 C163.601917,87.6793393 168.253886,77.6535406 164.922491,68.5642921 C161.591095,59.4750436 151.537866,54.7642588 142.467975,58.0424598 L142.467975,58.0424598 L142.467975,58.0424598 Z" class="bub-mid-2"></path>
							<path d="M306.914846,59.4467685 C303.02775,60.8517117 301.034049,65.1484826 302.46179,69.0438748 C303.889531,72.939267 308.198058,74.9581748 312.085154,73.5532315 C315.97225,72.1482883 317.965951,67.8515174 316.53821,63.9561252 C315.110469,60.060733 310.801942,58.0418252 306.914846,59.4467685 L306.914846,59.4467685 L306.914846,59.4467685 Z" class="bub-mid-1"></path>
						</g>
						<g class="bub-front"
							init-with="p:[op:0, tro:center center]"
							when-household-tile-init="a:[pf-hh-bubble-blow:set:(dur:1000ms#func:linear):in:delay-250]">
							<rect x="0" y="0" width="380" height="270" clip-path="url(#bub-front)" fill="url(#bub-front-color)"></rect>
						</g>
					</g>
				</svg>
			</div>
			<div class="pf-tile-bottom"
				init-with="p:[t:opacity 500ms ease-out]"
				when-household-tile-exit="p:[op:0:delay-250]">
				<div>
					<h1 init-with="p:[op:0, tr:translateY(-80%), t:opacity 750ms ease-out#transform 750ms cubic-bezier(.19#.37#.36#.99)]"
						when-household-tile-init="p:[op:1:delay-1500, tr:none:delay-1500]">Furniture Care</h1>
					<ul class="rating-stars" data-rating="4" data-half="true">
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1600]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1700]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
						<li init-with="p-op"
							when-household-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1900]">
							<svg viewBox="0 0 100 100">
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
								<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
							</svg>
						</li>
					</ul>
				</div>
				<div class="pf-pricing"
					init-with="p:[op:0, tro:center center]"
					when-household-tile-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-2000]">$10/hr</div>
			</div>
			<div class="pf-tile-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
		</div>
	</div>
</div>
