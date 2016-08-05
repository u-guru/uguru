<div class="full-xy flex-center p15xy" types='academic-desktop, academic-mobile, baking-desktop, baking-mobile, photo-desktop, photo-mobile, tech-desktop, tech-mobile, household' default-type="tech-mobile">
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
					init-with="p:[op:0, tr:translateX(50%), t:opacity 375ms ease-out#transform 500ms ease-out]"
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
				<h3 class="pf-review-count"
					init-with="p-op"
					when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">5 Reviews</h3>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "academic-mobile"'
		init-default
		on-init="s:[academic-tile-init:public]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-tile bg-academic"
			init-with="p:[bg:rgba(99#112#116#0), t:background 500ms ease-out]"
			when-academic-tile-init="p:[bg:rgba(99#112#116#1):delay-650]"
			when-academic-tile-exit="p:[op:0:delay-1000, t:opacity 1500ms cubic-bezier(0#.3#.02#.99)]">
			<div class="pf-tile-border"
				init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
				when-academic-tile-init="p:[op:1, tr:none]"
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
				<h3 class="pf-review-count"
					init-with="p-op"
					when-academic-tile-init="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1800]">5 Reviews</h3>
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

	<div class="pf-tile-container" ng-if='activeType === "baking-mobile"'
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
				<h1 init-with="p:[op:0, t:all 250ms ease-out]"
					when-photo-tile-init="p:[op:1:delay-1000]">Professional Headshots</h1>
				<div class="pf-pricing photo-price"
					init-with="p:[tro:center center, op:0]"
					when-photo-tile-init="a:[pf-price-rotate:set:(dur:1000ms#func:ease-out):in:delay-1000]">$10/hr</div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "photo-mobile"'
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
				<div class="pf-pricing photo-price"
					init-with="p:[tro:center center, op:0]"
					when-photo-tile-init="a:[pf-price-rotate:set:(dur:1000ms#func:ease-out):in:delay-1000]">$10/hr</div>
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

	<div class="pf-tile-container" ng-if='activeType === "tech-mobile"'
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
</div>
