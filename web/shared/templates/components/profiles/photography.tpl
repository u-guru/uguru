<!-- NOTES AND BUGS
Gabrielle
- Lag on multiple profile tiles due to old animation syntax. Leaving alone for now as specified on Monday 8/22
- Bug onBlur that is causing a jittery background color on the bottom of profile tiles. Will look into fixing this (and possibly switching over to the new syntax, since it can't be debugged with the tool if it's static CSS)
-->

<div class="pf-container pf-photography"
	on-init="s:[pf-aside-init:public:delay-500, pf-rest-init:public]">
	<aside class="pf-aside perspective-container"
		init-with="p-op"
		when-pf-aside-init="s:[pf-aside-content-init:public:delay-2000] | p:[transform:scaleX(0.4):scaleX(1):500:easeOutQuint, opacity:0:1:500:easeOutSine]"
		when-pf-aside-content-init="s:[pf-aside-bg-init:public:delay-1500, pf-widget-init:public:delay-2000, pf-aside-desc-init:public:delay-2000]"
		when-pf-exit="p:[opacity:1:0:1000:easeOutSine]:delay-1000">
		<div class="pf-aside-bg-container"
			init-with="p-op"
			when-pf-aside-bg-init="p:[opacity:0:1:1000:easeOutSine]">
			<div class="pf-aside-bg" style="background-image: url('https://c1.staticflickr.com/7/6129/5916495923_43a93ef193_o.jpg');"></div>
		</div>
		<div class="pf-aside-widget"
			init-with="p:[background:rgba(99#112#116#0)]"
			when-pf-widget-init="p:[background:rgba(99#112#116#0):rgba(99#112#116#0.3):700:easeOutSine]:delay-700">
			<div class="top"
				init-with="p:[tr:scale(0), tro:center center]"
				when-pf-widget-init="p:[transform:scale(0):scale(1):500:easeOutQuart]:delay-150"></div>
			<div class="left"
				init-with="p:[tr:scale(0), tro:left top]"
				when-pf-widget-init="p:[transform:scale(0):scale(1):500:easeOutQuart]:delay-450"></div>
			<div class="right"
				init-with="p:[tr:scale(0), tro:right top]"
				when-pf-widget-init="p:[transform:scale(0):scale(1):500:easeOutQuart]:delay-450"></div>
			<div class="bot-left"
				init-with="p:[tr:scale(0), tro:left center]"
				when-pf-widget-init="p:[transform:scale(0):scale(1):500:easeOutQuart]:delay-750"></div>
			<div class="bot-right"
				init-with="p:[tr:scale(0), tro:right center]"
				when-pf-widget-init="p:[transform:scale(0):scale(1):500:easeOutQuart]:delay-750"></div>
			<span class="user-icon" style="background-image: url('http://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=256');"
				init-with="p-op"
				when-pf-widget-init="p:[tro:center center] | a:[icon-enter:set:(dur:1000ms#func:ease-out):in]"></span>
			<div>
				<h1 class="pf-name verified"
					init-with="p-op"
					when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-150]">
					<span>Gabrielle Wee</span>
					<span>
						<svg preserveAspectRatio="xMidYMax meet" width="100px" height="100px" viewBox="0 0 100 100">
							<path d="M95.588027,38.378 C97.014027,35.692 97.112027,32.487 95.858027,29.716 C94.603027,26.944 92.136027,24.922 89.189027,24.248 C85.056027,23.304 82.013027,19.762 81.674027,15.504 C81.433027,12.467 79.797027,9.716 77.255027,8.069 C74.712027,6.422 71.554027,6.065 68.714027,7.105 C64.730027,8.563 60.272027,7.242 57.704027,3.845 C55.871027,1.423 53.021027,0 50.000027,0 C46.978027,0 44.129027,1.423 42.296027,3.846 C39.728027,7.242 35.268027,8.563 31.287027,7.105 C28.446027,6.065 25.286027,6.422 22.745027,8.069 C20.202027,9.716 18.567027,12.466 18.325027,15.504 C17.986027,19.762 14.942027,23.303 10.811027,24.248 C7.86302696,24.922 5.39602696,26.944 4.14102696,29.717 C2.88502696,32.488 2.98502696,35.692 4.41102696,38.379 C6.40902696,42.146 5.74602696,46.784 2.77702696,49.831 C0.659026961,52.005 -0.331973037,55.05 0.0990269614,58.067 C0.529026961,61.083 2.33002696,63.723 4.97002696,65.208 C8.67002696,67.288 10.601027,71.55 9.737027,75.731 C9.121027,78.713 9.921027,81.815 11.900027,84.12 C13.879027,86.423 16.811027,87.663 19.828027,87.472 C24.057027,87.204 27.966027,89.738 29.480027,93.728 C30.562027,96.574 32.898027,98.746 35.798027,99.605 C38.697027,100.464 41.829027,99.908 44.264027,98.103 C47.678027,95.574 52.326027,95.574 55.738027,98.103 C58.175027,99.908 61.304027,100.464 64.205027,99.605 C67.104027,98.746 69.441027,96.574 70.522027,93.728 C72.037027,89.738 75.947027,87.205 80.175027,87.472 C83.191027,87.663 86.122027,86.423 88.101027,84.12 C90.081027,81.815 90.880027,78.714 90.265027,75.731 C89.401027,71.549 91.330027,67.288 95.031027,65.208 C97.672027,63.724 99.474027,61.083 99.902027,58.067 C100.331027,55.049 99.341027,52.004 97.221027,49.83 C94.253027,46.784 93.591027,42.145 95.588027,38.378 Z" fill="#000000"></path>
							<path d="M66.75725,32.75725 L41.35225,58.16125 L33.24225,50.05125 C30.89925,47.70825 27.10025,47.70825 24.75725,50.05125 C22.41425,52.39425 22.41425,56.19325 24.75725,58.53625 L37.11025,70.88925 C39.45325,73.23225 43.25225,73.23225 45.59525,70.88925 L75.24225,41.24225 C77.58525,38.89925 77.58525,35.10025 75.24225,32.75725 C72.89925,30.41425 69.10025,30.41425 66.75725,32.75725 Z" fill="#FFFFFF"></path>
						</svg>
					</span>
				</h1>
				<h2 class="pf-school-name"
					init-with="p-op"
					when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-150]">Ex'pression College for Digital Arts</h2>
				<ul class="pf-rating rating-stars" data-rating="4" data-half="true">
					<li init-with="p-op"
						when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-800]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-900]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1000]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1100]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
					<li init-with="p-op"
						when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1200]">
						<svg viewBox="0 0 100 100">
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
							<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
						</svg>
					</li>
				</ul>
				<h3 class="pf-reviews"
					init-with="p-op"
					when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-1100]"><span>72</span> reviews</h3>
			</div>
			<div init-with="p:[op:0, tro:center center]"
				when-pf-widget-init="a:[split-button:set:(dur:1200ms#func:linear):in:delay-500]">
				<button class="bg-moola normal">
					<span init-with="p-op"
						when-pf-widget-init="p:[opacity:0:1:500:easeInOutSine:delay-700]">Contact Guru</span>
				</button>
			</div>
		</div>
		<div class="pf-aside-desc"
			init-with="p:[op:0, tro:center top]"
			when-pf-aside-desc-init="a:[pf-slideLeft-scaleIn:set:(dur:1000ms#func:linear):in] | t:[on-enter:children]">
			<span init-with="p-op"
				on-enter="p:[opacity:0:1:1000:easeOutSine]:delay-1000">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
		</div>
		<div class="pf-aside-mobile">
			<span class="pf-icon user-icon" style="background-image: url('http://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=256');"></span>
			<h1 class="pf-name verified">
				<span>Gabrielle Wee</span>
				<span>
					<svg preserveAspectRatio="xMidYMax meet" width="100px" height="100px" viewBox="0 0 100 100">
						<path d="M95.588027,38.378 C97.014027,35.692 97.112027,32.487 95.858027,29.716 C94.603027,26.944 92.136027,24.922 89.189027,24.248 C85.056027,23.304 82.013027,19.762 81.674027,15.504 C81.433027,12.467 79.797027,9.716 77.255027,8.069 C74.712027,6.422 71.554027,6.065 68.714027,7.105 C64.730027,8.563 60.272027,7.242 57.704027,3.845 C55.871027,1.423 53.021027,0 50.000027,0 C46.978027,0 44.129027,1.423 42.296027,3.846 C39.728027,7.242 35.268027,8.563 31.287027,7.105 C28.446027,6.065 25.286027,6.422 22.745027,8.069 C20.202027,9.716 18.567027,12.466 18.325027,15.504 C17.986027,19.762 14.942027,23.303 10.811027,24.248 C7.86302696,24.922 5.39602696,26.944 4.14102696,29.717 C2.88502696,32.488 2.98502696,35.692 4.41102696,38.379 C6.40902696,42.146 5.74602696,46.784 2.77702696,49.831 C0.659026961,52.005 -0.331973037,55.05 0.0990269614,58.067 C0.529026961,61.083 2.33002696,63.723 4.97002696,65.208 C8.67002696,67.288 10.601027,71.55 9.737027,75.731 C9.121027,78.713 9.921027,81.815 11.900027,84.12 C13.879027,86.423 16.811027,87.663 19.828027,87.472 C24.057027,87.204 27.966027,89.738 29.480027,93.728 C30.562027,96.574 32.898027,98.746 35.798027,99.605 C38.697027,100.464 41.829027,99.908 44.264027,98.103 C47.678027,95.574 52.326027,95.574 55.738027,98.103 C58.175027,99.908 61.304027,100.464 64.205027,99.605 C67.104027,98.746 69.441027,96.574 70.522027,93.728 C72.037027,89.738 75.947027,87.205 80.175027,87.472 C83.191027,87.663 86.122027,86.423 88.101027,84.12 C90.081027,81.815 90.880027,78.714 90.265027,75.731 C89.401027,71.549 91.330027,67.288 95.031027,65.208 C97.672027,63.724 99.474027,61.083 99.902027,58.067 C100.331027,55.049 99.341027,52.004 97.221027,49.83 C94.253027,46.784 93.591027,42.145 95.588027,38.378 Z" fill="#000000"></path>
						<path d="M66.75725,32.75725 L41.35225,58.16125 L33.24225,50.05125 C30.89925,47.70825 27.10025,47.70825 24.75725,50.05125 C22.41425,52.39425 22.41425,56.19325 24.75725,58.53625 L37.11025,70.88925 C39.45325,73.23225 43.25225,73.23225 45.59525,70.88925 L75.24225,41.24225 C77.58525,38.89925 77.58525,35.10025 75.24225,32.75725 C72.89925,30.41425 69.10025,30.41425 66.75725,32.75725 Z" fill="#FFFFFF"></path>
					</svg>
				</span>
			</h1>
			<h2 class="pf-school-name">Ex'pression College for Digital Arts</h2>
			<ul class="pf-rating rating-stars" data-rating="4" data-half="true">
				<li>
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li>
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li>
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li>
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li>
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
			</ul>
			<h3 class="pf-reviews"><span>72</span> reviews</h3>
		</div>
	</aside>
	<div class="pf-rest perspective-container"
		init-with="p-op"
		when-pf-rest-init="a:[pf-bounceUp:set:(dur:2000ms#func:linear):in] | s:[pf-tabs-init:public, pf-mn-init:public:delay-1750]"
		when-pf-exit="p:[opacity:1:0:1000:easeOutSine]:delay-1000">
		<nav class="pf-tabs tab-bar slide">
			<div>
				<a class="pf-profile-section-link pf-main-link pf-enter"
					ng-click='guru.section_index = 0;'
					ng-class="{'active': !guru.section_index}"
					init-with="p-op"
					when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutBack, opacity:0:1:500:easeOutBack]:delay-500"
					on-click="s:[pf-mn-init:public]">Profile</a>
				<a class="pf-portfolio-section-link pf-main-link pf-enter"
					ng-click='guru.section_index = 1;'
					ng-class="{'active': guru.section_index === 1}"
					init-with="p-op"
					when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutBack, opacity:0:1:500:easeOutBack]:delay-600"
					on-click="s:[pf-sv-init:public]">Services</a>
				<a class="pf-about-section-link pf-main-link pf-enter"
					ng-click='guru.section_index = 2;'
					ng-class="{'active': guru.section_index === 2}"
					init-with="p-op"
					when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutBack, opacity:0:1:500:easeOutBack]:delay-700"
					on-click="s:[pf-ab-init:public]">About</a>
				<a class="pf-resources-section-link pf-main-link pf-enter"
					ng-click='guru.section_index = 3;'
					ng-class="{'active': guru.section_index === 3}"
					init-with="p-op"
					when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutBack, opacity:0:1:500:easeOutBack]:delay-800"
					on-click="s:[pf-rs-init:public]">Resources</a>
				<hr class="pf-enter"
					init-with="p-op"
					when-pf-tabs-init="p:[opacity:0:1:1000:easeOutSine]:delay-1200">
			</div>
		</nav>
		<main class="pf-main" ng-init="guru.section_index = 0;">
			<!-- ng-init="guru.section_index = 2;" -->
			<div class="pf-profile pf-main-section" ng-class="{'active': !guru.section_index}">
				<div class="pf-main-header overflow-hidden">
					<h1 init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-900">The Golden Bear Tutor</h1>
					<p init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-1000">Fusce vehicula dolor arcu, sit amet blandit dolor nec. Donec viverra.<p>
				</div>
				<div class="pf-main-subheader" init-with="p-op"
					when-pf-mn-init="p:[transform:translateY(50px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]">
					<h2>Services</h2>
					<a><span>see more</span></a>
					<hr init-with="p:[tr:scaleX(0)]"
						when-pf-mn-init="p:[transform:scaleX(0):scaleX(1):500:easeOutCubic, tro:left center]:delay-500"/>
				</div>
				<ul class="pf-items">
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-mn-init="s:[photo-tile-init-1:public]"
							when-photo-tile-init-1="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-1="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-1="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-1="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-1="send:[viewport-init-1:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-mn-init="s:[photo-tile-init-2:public:delay-500]"
							when-photo-tile-init-2="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-2="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-2="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-2="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-2="send:[viewport-init-2:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="pf-main-subheader" init-with="p-op"
					when-pf-mn-init="p:[transform:translateY(50px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-750">
					<h2>Resources</h2>
					<a><span>see more</span></a>
					<hr init-with="p:[transform:scaleX(0)]"
						when-pf-mn-init="p:[transform:scaleX(0):scaleX(1):500:easeOutCubic, tro:left center]:delay-1250"/>
				</div>
				<ul class="pf-items">
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-mn-init="s:[photo-cardlet-init-1:public:delay-1000]"
							when-photo-cardlet-init-1="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-cardlet highlight bg-photography">
								<div class="pf-cardlet-front-container"
									init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
									when-photo-cardlet-init-1="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-front">
										<div></div><div></div><div></div>
										<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
											init-with="p-op"
											when-photo-cardlet-init-1="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
											when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
										<div class="pf-cardlet-overlay"></div>
									</div>
								</div>
								<div class="pf-cardlet-bottom-container"
									init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
									when-photo-cardlet-init-1="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-bottom">
										<h1 init-with="p-op"
											when-photo-cardlet-init-1="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
										<div init-with="p-op"
											when-photo-cardlet-init-1="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
											<h2>03/28/2016</h2>
										</div>
									</div>
								</div>
								<div class="pf-cardlet-back-container"
									init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
									when-photo-cardlet-init-1="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-back"></div>
								</div>
								<div class="pf-cardlet-ribbon-container"
									init-with="p:[op:0, tr:translateX(10px)]"
									when-photo-cardlet-init-1="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
									<div class="pf-cardlet-ribbon">
										<svg viewBox="0 0 100 100">
											<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
										</svg>
									</div>
								</div>
								<div class="pf-cardlet-ribbon-edge-container"
									init-with="p-op"
									when-photo-cardlet-init-1="p:[opacity:0:1:250:easeInSine]:delay-650">
									<div class="pf-cardlet-ribbon-edge"></div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-mn-init="s:[photo-cardlet-init-2:public:delay-1500]"
							when-photo-cardlet-init-2="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-cardlet highlight bg-photography">
								<div class="pf-cardlet-front-container"
									init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
									when-photo-cardlet-init-2="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-front">
										<div></div><div></div><div></div>
										<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
											init-with="p-op"
											when-photo-cardlet-init-2="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
											when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
										<div class="pf-cardlet-overlay"></div>
									</div>
								</div>
								<div class="pf-cardlet-bottom-container"
									init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
									when-photo-cardlet-init-2="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-bottom">
										<h1 init-with="p-op"
											when-photo-cardlet-init-2="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
										<div init-with="p-op"
											when-photo-cardlet-init-2="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
											<h2>03/28/2016</h2>
										</div>
									</div>
								</div>
								<div class="pf-cardlet-back-container"
									init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
									when-photo-cardlet-init-2="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
									<div class="pf-cardlet-back"></div>
								</div>
								<div class="pf-cardlet-ribbon-container"
									init-with="p:[op:0, tr:translateX(10px)]"
									when-photo-cardlet-init-2="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
									<div class="pf-cardlet-ribbon">
										<svg viewBox="0 0 100 100">
											<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
										</svg>
									</div>
								</div>
								<div class="pf-cardlet-ribbon-edge-container"
									init-with="p-op"
									when-photo-cardlet-init-2="p:[opacity:0:1:250:easeInSine]:delay-650">
									<div class="pf-cardlet-ribbon-edge"></div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="pf-portfolio pf-main-section" ng-class="{'active': guru.section_index === 1}">
				<div class="pf-main-header overflow-hidden">
					<h1 init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-900">The Golden Bear Tutor</h1>
					<p init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-1000">Fusce vehicula dolor arcu, sit amet blandit dolor nec. Donec viverra.<p>
				</div>
				<ul class="pf-items">
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-1:public]"
							when-photo-tile-init-1="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-1="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-1="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-1="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-1="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-1="send:[viewport-init-1:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-1="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-1="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-2:public:delay-500]"
							when-photo-tile-init-2="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-2="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-2="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-2="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-2="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-2="send:[viewport-init-2:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-2="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-2="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-3:public:delay-1000]"
							when-photo-tile-init-3="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-3="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-3="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-3="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-3="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-3="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-3="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-3="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-3="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-3="send:[viewport-init-3:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-3="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-3="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-3="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-3="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-3="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-3="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-3="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-3="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-4:public:delay-1500]"
							when-photo-tile-init-4="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-4="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-4="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-4="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-4="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-4="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-4="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-4="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-4="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-4="send:[viewport-init-4:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-4="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-4="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-4="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-4="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-4="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-4="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-4="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-4="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-5:public:delay-2000]"
							when-photo-tile-init-5="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-5="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-5="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-5="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-5="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-5="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-5="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-5="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-5="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-5="send:[viewport-init-5:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-5="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-5="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-5="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-5="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-5="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-5="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-5="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-5="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="pf-tile-container"
							init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
							when-pf-sv-init="s:[photo-tile-init-6:public:delay-2500]"
							when-photo-tile-init-6="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
							when-photo-tile-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
							<a></a><a></a><a></a><a></a>
							<div class="pf-tile bg-photography">
								<div class="pf-tile-top" style="background-image: url('http://cultr.sampleface.co.uk/wp-content/uploads/2015/05/hipster.jpg');"
									init-with="p-op"
									when-photo-tile-init-6="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
									when-photo-tile-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]"></div>
								<div class="pf-tile-border">
									<div>
										Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div class="pf-tile-bottom">
									<h1 init-with="p-op"
										when-photo-tile-init-6="p:[opacity:0:1:250:easeOutSine]:delay-1000">Professional Headshots</h1>
									<ul class="rating-stars" data-rating="4" data-half="true">
										<li init-with="p-op"
											when-photo-tile-init-6="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1100]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-6="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1200]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-6="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1300]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-6="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1400]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
										<li init-with="p-op"
											when-photo-tile-init-6="a:[pf-bounceIn-rotate:set:(dur:500ms#func:ease-out):in:delay-1500]">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
											</svg>
										</li>
									</ul>
									<div class="pf-pricing photo-price"
										init-with="p:[tro:center center, op:0]"
										when-photo-tile-init-6="a:[slideInUp-subtle:set:(dur:1000ms#func:ease-out):in:delay-1000]">
										<div class="pf-border"
											init-default
											when-photo-tile-init-6="send:[viewport-init-6:public]:delay-2000">
											<div init-with="p:[transform:scaleX(0)]"
												when-viewport-init-6="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-6="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-6="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-6="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-6="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-6="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleX(0)]"
												when-viewport-init-6="p:[transform:scaleX(0):scaleX(1):250:easeOutCubic]"></div>
											<div init-with="p:[tr:scaleY(0)]"
												when-viewport-init-6="p:[transform:scaleY(0):scaleY(1):250:easeOutCubic]"></div>
										</div>
										<span>$10/hr</span>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="pf-about pf-main-section" ng-class="{'active': guru.section_index === 2}">
				<div class="pf-main-header overflow-hidden"
					init-default
					when-pf-ab-init="send:[ab-sect-init:public]">
				 <h1 init-with="p-op"
					 when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-900">The Golden Bear Tutor</h1>
				 <p init-with="p-op"
					 when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-1000">Fusce vehicula dolor arcu, sit amet blandit dolor nec. Donec viverra.<p>
			 	 </div>
				<div class="pf-about-section"
					init-with="p:[op:0, transform:rotateX(10deg) rotateY(-15deg)]"
					when-ab-sect-init="p:[opacity:0:1:450:easeOutExpo, transform:rotateX(10deg) rotateY(-15deg):rotateX(0deg) rotateY(0deg):1000:easeOutExpo easeOutQuad] | send:[social-sect-init:public]:delay-150">
					<header><h2>About</h2></header>
					<div>
						<h1
							init-with="p:[op:0, transform:translateY(10px)]"
							when-ab-sect-init="p:[opacity:0:1:450:linear, transform:translateY(10px):translateY(0px):500:easeOutBack:]:delay-500">I am a freshman seeking a degree in Journalism.</h1>
						<h2
							init-with="p:[op:0, transform:translateY(10px)]"
							when-ab-sect-init="p:[opacity:0:1:450:linear, transform:translateY(10px):translateY(0px):500:easeOutBack:]:delay-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
					</div>
				</div>
				<div class="pf-about-links pf-about-section overflow-hidden"
					init-with="p:[op:0, transform:rotateX(10deg) rotateY(-15deg)]"
					when-social-sect-init="p:[opacity:0:1:450:easeOutExpo, transform:rotateX(10deg) rotateY(-15deg):rotateX(0deg) rotateY(0deg):1000:easeOutExpo easeOutQuad] | send:[work-sect-init:public]:delay-150">
					<header><h2>Where to find me</h2></header>
					<div>
						<div class="social-bar fill">
							<ul>
								<li class="pf-ab-where-anim"
									init-with="p-op"
									when-social-sect-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in]">
									<a class="bg-fb">
										<svg viewBox="0 0 100 100">
											<path d="M56.2810216,53.7891775 L67.7641802,53.7891775 L69.4834101,40.4563738 L56.2810216,40.4563738 L56.2810216,31.9439678 C56.2810216,28.08381 57.3528096,25.4533286 62.8885049,25.4533286 L69.9488004,25.4500185 L69.9488004,13.5253019 C68.7270681,13.3631104 64.5365692,13 59.660894,13 C49.4815565,13 42.5126178,19.2132587 42.5126178,30.6239276 L42.5126178,40.4563738 L31,40.4563738 L31,53.7891775 L42.5126178,53.7891775 L42.5126178,88 L56.2810216,88 L56.2810216,53.7891775 Z"></path>
										</svg>
									</a>
								</li>
								<li class="pf-ab-where-anim"
									init-with="p-op"
									when-social-sect-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in]:delay-150">
									<a class="bg-tw">
										<svg viewBox="0 0 100 100">
											<path d="M86.2761719,27.903125 C84.015625,28.7457031 81.6378906,29.3398438 79.1628906,29.6363281 C81.1304687,28.45625 82.8144531,26.8484375 84.0847656,24.9429687 C84.8652344,23.7734375 85.4910156,22.4914062 85.928125,21.125 C82.9550781,22.8875 79.6621094,24.1683594 76.1570312,24.8585938 C73.3503906,21.8679688 69.3507812,20 64.9257812,20 C56.44375,20 49.5671875,26.8613281 49.5402344,35.3339844 C49.5378906,36.5890625 49.6738281,37.7632813 49.9363281,38.8894531 C48.7140625,38.8273438 47.509375,38.7007812 46.3152344,38.5414063 C35.0195312,37.0320313 25.084375,31.2335937 18.221875,22.8160156 C16.8964844,25.0882812 16.1382812,27.7308594 16.1382812,30.5503906 C16.1382812,33.5679687 17.0300781,36.3699219 18.5324219,38.7464844 C19.6855469,40.5734375 21.1902344,42.1554687 22.9832031,43.3542969 C20.4894531,43.2757813 18.1457031,42.5949219 16.0878906,41.4664062 C16.0128906,46.3859375 18.184375,50.6363281 21.5839844,53.459375 C21.9613281,53.7722656 22.3550781,54.0652344 22.7605469,54.3417969 C24.4246094,55.4738281 26.3136719,56.2988281 28.3550781,56.7078125 C27.3378906,56.9855469 26.2773438,57.1566406 25.1863281,57.2175781 C24.8933594,57.2351563 24.5992187,57.2480469 24.3015625,57.2480469 C23.3101562,57.2480469 22.3457031,57.1507812 21.4070312,56.9714844 C21.503125,57.2738281 21.6167969,57.5691406 21.7316406,57.8632812 C23.3441406,61.9917969 26.6863281,65.253125 30.8699219,66.7542969 C32.0277344,67.1691406 33.2476562,67.4527344 34.5132813,67.5792969 C34.5132813,67.5792969 32.5175781,69.9148438 31.3046875,70.5652344 C26.9441406,72.9042969 21.9660156,74.2414063 16.6703125,74.2414063 C15.4292969,74.2414063 14.2035156,74.1675781 13,74.0257812 C19.8097656,78.3910156 27.8980469,80.9375 36.5875,80.9375 C64.8894531,80.9375 80.3664063,57.4964844 80.3664063,37.1667969 C80.3664063,36.5 80.3511719,35.8367187 80.321875,35.1769531 C83.3277344,33.0078125 85.9375,30.2984375 88,27.2140625 C87.4351563,27.4636719 86.8574219,27.6863281 86.2761719,27.903125 Z"></path>
										</svg>
									</a>
								</li>
								<li class="pf-ab-where-anim"
									init-with="p-op"
									when-social-sect-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in]:delay-300">
									<a class="bg-li">
										<svg viewBox="0 0 100 100">
											<path d="M22.0147869,13 C26.986455,13 31.0237522,17.0372972 31.0237522,22.0118761 C31.0237522,26.9893658 26.986455,31.026663 22.0147869,31.026663 C17.0227431,31.026663 13,26.9893658 13,22.0118761 C13,17.0372972 17.0227431,13 22.0147869,13 L22.0147869,13 Z M14.2341846,37.8583404 L29.7895676,37.8583404 L29.7895676,87.8661026 L14.2341846,87.8661026 L14.2341846,37.8583404 Z M39.5407902,37.8583404 L54.4383296,37.8583404 L54.4383296,44.6958395 L54.6508189,44.6958395 C56.7233176,40.7633315 61.7968641,36.6183342 69.3591555,36.6183342 C85.0920981,36.6183342 88,46.972095 88,60.4404254 L88,87.8661026 L72.4620818,87.8661026 L72.4620818,63.5462625 C72.4620818,57.7479236 72.3602034,50.2875107 64.3845766,50.2875107 C56.2983389,50.2875107 55.0641543,56.606885 55.0641543,63.1329271 L55.0641543,87.8661026 L39.5407902,87.8661026 L39.5407902,37.8583404"></path>
										</svg>
									</a>
								</li>
								<li class="pf-ab-where-anim"
									init-with="p-op"
									when-social-sect-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in]:delay-450">
									<a class="bg-in">
										<svg viewBox="0 0 100 100">
											<path d="M77.6940447,85.9993639 L22.3059553,85.9993639 C17.7191699,85.9993639 14,82.2789218 14,77.688956 L14,22.3059553 C14,17.7185338 17.7191699,14 22.3059553,14 L77.6940447,14 C82.2814662,14 86,17.7185338 86,22.3059553 L86,77.688956 C86,82.2789218 82.2814662,85.9993639 77.6940447,85.9993639 L77.6940447,85.9993639 Z M49.999682,36.1528186 C42.3520712,36.1528186 36.1534547,42.3507991 36.1534547,49.9984098 C36.1534547,57.6447484 42.3520712,63.8459092 49.999682,63.8459092 C57.6472927,63.8459092 63.8471814,57.6447484 63.8471814,49.9984098 C63.8471814,42.3507991 57.6472927,36.1528186 49.999682,36.1528186 L49.999682,36.1528186 Z M77.6940447,25.0748191 C77.6940447,23.5463147 76.4536853,22.3059553 74.9220005,22.3059553 L66.6160452,22.3059553 C65.0862686,22.3059553 63.8471814,23.5463147 63.8471814,25.0748191 L63.8471814,33.3839548 C63.8471814,34.9124593 65.0862686,36.1528186 66.6160452,36.1528186 L74.9220005,36.1528186 C76.4536853,36.1528186 77.6940447,34.9124593 77.6940447,33.3839548 L77.6940447,25.0748191 Z M77.6940447,44.4581379 L71.4260953,44.4581379 C71.8828019,46.2308977 72.1525006,48.0831677 72.1525006,49.9984098 C72.1525006,62.2353502 62.2347142,72.1525006 49.999682,72.1525006 C37.7652858,72.1525006 27.8468633,62.2353502 27.8468633,49.9984098 C27.8468633,48.0831677 28.1178341,46.2308977 28.5745408,44.4581379 L22.3059553,44.4581379 L22.3059553,74.9220005 C22.3059553,76.4492327 23.5463147,77.688956 25.0779995,77.688956 L74.9220005,77.688956 C76.4536853,77.688956 77.6940447,76.4492327 77.6940447,74.9220005 L77.6940447,44.4581379 Z"></path>
										</svg>
									</a>
								</li>
							</ul>
						</div>
						<ul class="pf-url pf-ab-where-anim">
							<li init-with="p:[transform:scaleX(0), tro:left center]"
								when-social-sect-init="p:[transform:scaleX(0):scaleX(1):500:easeOutBack]">
								<a>gabrielle.uguru.me</a></li>
							<li init-with="p:[transform:scaleX(0), tro:right center]"
								when-social-sect-init="p:[transform:scaleX(0):scaleX(1):500:easeOutBack]:delay-250">
								<a>
									<svg viewBox="0 0 100 100">
										<path d="M82,38 L82,78.9930191 C82,80.6537288 80.663269,82 78.9989882,82 L21.0010118,82 C19.3435988,82 18,80.663269 18,78.9989882 L18,21.0010118 C18,19.3435988 19.3408574,18 21.0069809,18 L62,18 M88.9559283,10.8111066 L57.9878833,42.132705 M69.2453268,10.8994949 L89.0443166,10.8994949 L89.0443166,30.6984848"></path>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="pf-wwf pf-about-section"
					init-with="p:[op:0, transform:rotateX(10deg) rotateY(-15deg)]"
					when-work-sect-init="p:[opacity:0:1:450:easeOutExpo, transform:rotateX(10deg) rotateY(-15deg):rotateX(0deg) rotateY(0deg):1000:easeOutExpo easeOutQuad] | send:[exp-sect-init:public]:delay-150">
					<header><h2>Will Work For</h2></header>
					<div>
						<h1>
							<span class="pf-ab-wwf-anim">I will work for</span>
							<ul>
								<li class="pf-ab-wwf-anim">
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBack]">
										<svg viewBox="0 0 100 100"
											init-with="p:[transform:scale(0), tro:center center]"
											when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBounce]:delay-250">
												<path d="M86,50.0000061 C86,69.8720052 69.8719864,86 49.9999939,86 C30.1280015,86 14,69.8720052 14,50.0000061 C14,30.1279948 30.1280015,14 49.9999939,14 C69.8719864,14 86,30.1279948 86,50.0000061 L86,50.0000061 Z M74,50 C74,63.2479965 63.2479965,74 50,74 C36.7520169,74 26,63.2479965 26,50 C26,36.7520035 36.7520169,26 50,26 C63.2479965,26 74,36.7520035 74,50 L74,50 Z M47.9375205,43.2846585 C47.8351995,43.0584344 46.7884907,41.9998661 46.7114143,42 C44.6092684,42.0036142 43.7163097,42.5086696 42.8754514,42.8328796 C39.5184635,44.1269083 39.84154,53.4079872 40.2445128,54.7020159 C40.6564824,56.0249585 44.8545971,62.8218555 46.3868607,63.6837828 C47.8624583,64.5137175 52.5394138,66.1017037 56.6541409,63.8252733 C57.2418824,63.5001263 59.053313,62.2426415 58.9987956,61.3725487 C58.9479036,60.5618899 54.9898806,60.7915944 53.8963083,59.6994272 C53.2081258,59.0120539 53.0010667,58.182387 53.0010667,58.182387 C53.0010667,58.182387 52.1955239,56.040754 52.2401047,55.2820331 C52.2846855,54.5233122 55.3919135,51.1954082 55.3819768,48.619532 C55.3740543,46.5234115 53.8201718,44.4884653 52.7641977,43.6326956 C52.6583854,43.5468911 51.9222651,43.6104748 51.8259867,43.6673655 C51.126659,44.0811281 49.8912875,45.2529422 49.0788964,45.1587045 C48.4741015,45.0885616 48.2313241,43.934417 47.9375205,43.2846585 L47.9375205,43.2846585 Z M44,40.8034532 C45.4606384,40.6660807 45.8949256,40.680686 47.0967032,41.5995798 C48.1194442,42.3815145 48.3855253,43.1757121 48.8627332,44.3958058 C49.5526722,46.1596025 51.3942479,43.517421 52.0418012,43.3456021 C52.9196015,43.112744 55.1040074,43.6900667 55.276091,42.3218532 C54.4067143,42.2254031 52.693232,42.3083502 52.5694173,41.0589081 C52.448678,39.8399167 53.2636351,38.4550311 54.0965092,37.6719941 C55.1032051,36.7256809 57.3213056,35.7188797 58.4940683,36.921199 C59.5169431,37.9698871 59.1939018,39.6464654 57.9949322,40.3437996 C60.298874,41.7351611 61.7155221,39.1183322 60.6261939,37.034459 C59.2542046,34.4107409 56.0421105,34.6346429 53.8381831,35.9666187 C51.9534194,37.1058321 50.4296703,38.7560932 48.8107203,40.2414247 C48.0475087,40.9415146 47.023698,40.2554788 46.3429849,39.808226 C45.3931153,39.1840561 44.5554277,40.0879312 44,40.8034532 L44,40.8034532 Z"></path>
										</svg>
									</span>
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):650:easeInOutExpo]:delay-250">Chipotle</span>
								</li>
								<li class="pf-ab-wwf-anim">
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBack]:delay-500">
										<svg viewBox="0 0 100 100"
											init-with="p:[transform:scale(0), tro:center center]"
											when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBounce]:delay-750">
											<path d="M68.6405581,28.7828992 L54.0898894,17 C53.9996053,17.1237329 53.9056742,17.2459291 53.8080867,17.3664396 C50.9169857,20.936652 45.9115435,21.675445 42.6281187,19.01658 L15,53.1344652 C18.2834249,55.7933302 18.6014662,60.8429952 15.7103652,64.4132076 L30.2429946,76.1814989 C33.1340957,72.6112865 38.1395378,71.8724935 41.4229627,74.5313585 L69.0510814,40.4134733 C65.7676565,37.7546083 65.4496152,32.7049433 68.3407162,29.1347309 C68.4383037,29.0142204 68.5383002,28.8969359 68.6405581,28.7828992 L68.6405581,28.7828992 L68.6405581,28.7828992 Z M22.8540722,55.8262317 C22.4258346,55.4794518 22.3603395,54.8505098 22.7045679,54.4254231 L45.7835582,25.9252437 C46.1292268,25.4983785 46.7553193,25.4324179 47.1848394,25.7802365 L61.4878315,37.3625711 C61.9160691,37.7093511 61.9815642,38.338293 61.6373358,38.7633797 L38.5583455,67.2635591 C38.2126769,67.6904244 37.5865844,67.7563849 37.1570643,67.4085664 L22.8540722,55.8262317 L22.8540722,55.8262317 Z M66.440839,33.7497724 C68.7912699,34.7922547 71.6951572,34.6654064 74.1832986,33.1639286 C74.3157187,33.0840193 74.4452687,33.0012378 74.5719071,32.9157282 L84.2823332,49.1463306 C84.1477041,49.2184838 84.0141064,49.2944997 83.8816863,49.3744091 C79.9586431,51.7417833 78.5547084,56.62997 80.7459104,60.2924795 L43.2562815,82.9157282 C41.0650795,79.2532187 36.1085044,78.2033041 32.1854612,80.5706783 L29.2823332,75.7182121 L30.3512577,76.5875454 C33.2315019,73.0153914 38.2467079,72.2994243 41.553034,74.9883882 L69.0774016,40.8519482 C66.9543422,39.1253096 66.0521245,36.4146004 66.440839,33.7497724 L66.440839,33.7497724 L66.440839,33.7497724 Z M67.4063474,43.4824586 L74.738246,54.8913537 C74.981882,55.2985819 74.8526237,55.8258927 74.443526,56.0727641 L42.8999208,75.1078638 C42.4935154,75.3531106 41.9667983,75.2222091 41.7229167,74.8145705 C41.7229167,74.8145705 67.1624659,43.07482 67.4063474,43.4824586 L67.4063474,43.4824586 L67.4063474,43.4824586 Z"></path>
											<path d="M45.1760408,49.3934312 L44.4971393,53.2176039 L41.8127714,50.2084981 L37.891726,50.571887 L39.8321492,47.2530012 L38.0877114,43.6534152 L41.9713269,44.6113368 L44.8142503,42.0232814 L45.2740335,45.9341953 L48.7754946,47.9342751 L45.1760408,49.3934312 L45.1760408,49.3934312 Z"></path>
										</svg>
									</span>
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):650:easeInOutExpo]:delay-750">Tickets</span>
								</li>
								<li class="pf-ab-wwf-anim">
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBack]:delay-1000">
										<svg viewBox="0 0 100 100"
											init-with="p:[transform:scale(0), tro:center center]"
											when-work-sect-init="p:[transform:scale(0):scale(1):500:easeOutBounce]:delay-1250">
											<path d="M50,86 C69.882251,86 86,69.882251 86,50 C86,30.117749 69.882251,14 50,14 C30.117749,14 14,30.117749 14,50 C14,69.882251 30.117749,86 50,86 Z M54.9999992,35.666667 C58.9999992,35.666667 62.0000011,32.7448192 62.0000011,32.7448192 C62.0000011,32.7448192 61.7690882,32.7203052 64.0000004,30.3333333 C66.0042451,28.1888851 68.47059,26.574048 68.8527857,26.633529 C73.4297463,27.3461055 70.2714327,39.2635291 70.2714327,39.2635291 C70.2714327,39.2635291 69.967437,54.3380453 67.3328068,61.1623195 C64.6981766,67.9865938 58.415597,76.74611 44.9384504,73.7923196 C31.4613038,70.8385293 30,65.6666667 28.6666667,60.3333333 C27.3333334,55 30.3333329,45.4031371 32.6666666,42.3333333 C35.0000002,39.2635295 39.9999998,35.6666667 39.9999998,35.6666667 C39.9999998,35.6666667 40.3785136,25.2075613 42.709148,25.0038516 C45.0397824,24.8001419 47.7890637,33.7448194 47.7890637,33.7448194 C47.7890637,33.7448194 50.9999992,35.666667 54.9999992,35.666667 Z"></path>
											<path d="M38.9428731,58.6937566 C39.2309615,58.5946714 40.2846108,58.5963729 38.8233043,57.0617531 C40.8037116,59.248834 44.9059623,54.4235843 39.4878537,52.8935685 C38.0281522,52.4812138 33.9804698,52.6306424 34.5581513,55.2449907 C34.6734067,55.5175251 35.9217564,56.6649118 35.961178,56.5529155 C34.3435896,56.3134095 35.4227174,58.6810457 37.0737088,58.891827 C37.3931941,58.9329623 38.6383339,58.7985468 38.9428731,58.6937566 L38.9428731,58.6937566 Z M39.0353583,61.738375 C36.1313026,59.7088296 33.2115987,62.3894349 36.2192739,63.5002902 C38.3520511,64.2875673 38.6078399,63.9076406 40.5414027,64.2141041 C41.8345907,64.4193807 49.2844649,64.817423 49.4114566,62.5060352 C49.1033063,62.5339592 49.3778529,63.1170607 49.4114566,62.5060352 C47.1163789,62.7135136 44.7449658,63.2003323 43.745283,63.3921973 C43.0026929,63.5347199 42.2312138,62.7654583 41.3082676,62.4479853 L39.0353583,61.738375 L39.0353583,61.738375 Z M52.1223164,46.773205 C54.1410419,46.658106 55.8329595,49.229017 55.8329595,49.229017 C55.8329595,49.229017 54.1410419,51.9338431 52.2952497,51.8763937 C50.4493573,51.8188442 50.5334165,51.1681846 49.2380217,50.8596193 C47.9500498,50.5526553 50.1034907,46.8883039 52.1223164,46.773205 L52.1223164,46.773205 Z M51.5478449,48.0619132 C51.8221909,47.7057069 52.5737085,49.1329343 52.6856537,48.1745101 C52.7239718,47.8483296 52.6088167,47.6948976 51.3589624,47.713914 C50.1093086,47.7331305 49.551689,50.4306504 50.3400201,50.8795364 C50.9478947,51.225534 51.3893561,51.8178433 51.1965616,51.0527854 C51.0353644,50.413936 51.1453035,48.5843626 51.5478449,48.0619132 L51.5478449,48.0619132 Z M39.1385766,44.5365815 C40.6766197,44.5365815 41.1764611,45.5342394 41.2150802,46.090718 C41.2534987,46.6470965 40.2537155,48.8340773 39.2539323,48.8340773 C38.784284,48.8342775 37.5338278,48.1807154 37.4082405,47.1749505 C37.2664031,46.039574 38.322861,44.5365815 39.1385766,44.5365815 L39.1385766,44.5365815 Z M38.9265226,45.2102608 C39.2142098,44.7992073 37.8226184,45.5031127 37.9202194,46.7695018 C38.0178203,48.0355906 39.3137167,48.6038793 39.02944,48.2173469 C37.9809065,46.7925216 38.755094,44.9550413 38.4725226,45.4818944 C38.7557961,45.6949777 39.3519345,45.2345817 38.679561,45.1230859 C38.6372305,45.1161799 38.9010441,45.2465921 38.9265226,45.2102608 L38.9265226,45.2102608 Z M40.5534398,45.5607623 C40.3995653,45.5607623 40.2747805,45.6938767 40.2747805,45.8582181 C40.2747805,46.0223592 40.3995653,46.1555738 40.5534398,46.1555738 C40.7074146,46.1555738 40.8322998,46.0223592 40.8322998,45.8582181 C40.8322998,45.6938767 40.7074146,45.5607623 40.5534398,45.5607623 L40.5534398,45.5607623 Z"></path>
										</svg>
									</span>
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):650:easeInOutExpo]:delay-1250">Dogecoin</span>
								</li>
							</ul>
							<span class="pf-ab-wwf-anim">and I really want</span>
							<ul>
								<li class="pf-ab-wwf-anim">
									<span init-with="p:[transform:scale(0) rotate(-15deg), tro:center center]"
										when-work-sect-init="p:[transform:scale(0) rotate(-15deg):scale(1) rotate(0deg):500:easeOutBack easeOutQuad]:delay-1500">
										<svg viewBox="0 0 100 100">
											<path d="M14,31.0010033 C14,28.2390254 16.2337694,26 19.0057363,26 L80.9942637,26 C83.7588555,26 86,28.2347902 86,31.0010033 L86,68.9989967 C86,71.7609746 83.7662306,74 80.9942637,74 L19.0057363,74 C16.2411445,74 14,71.7652098 14,68.9989967 L14,31.0010033 L14,31.0010033 Z M14.5,47.5 L85.5,47.5 M33.5,26.5 L33.5,73.5 M32.5105489,47.0619589 C34.5181201,41.3225121 37.1936913,38.8354087 39.3303023,37.2798766 C41.0410536,36.0343862 43.7820173,36.328309 44.9484123,38.4057192 C46.1148073,40.4831295 44.7708095,43.1708932 42.7367279,44.4822722 C40.4344655,45.9665482 37.330711,46.7658205 32.5105489,47.0619589 Z M34.3229345,47.3571836 C32.4158362,41.5835739 29.7840785,39.0501542 27.6749407,37.45757 C25.9861867,36.1824126 23.2405109,36.4284542 22.0380377,38.4851916 C20.8355645,40.5419291 22.1324497,43.2527394 24.1433347,44.5994183 C26.4193423,46.1236483 29.5086748,46.9769669 34.3229345,47.3571836 Z M45.5963344,53.615767 C45.5963344,53.615767 43.8323113,51.7031707 37.9221215,49.7948383 C32.0119317,47.8865058 29.0584469,48.0162739 27.4905204,48.0162739 M21.4036656,53.615767 C21.4036656,53.615767 23.1676887,51.7031707 29.0778785,49.7948383 C34.9880683,47.8865058 37.9415531,48.0162739 39.5094796,48.0162739"></path>
										</svg>
									</span>
									<span init-with="p:[transform:scale(0), tro:center center]"
										when-work-sect-init="p:[transform:scale(0):scale(1):450:easeInOutQuad]:delay-1500">Gift cards</span>
								</li>
							</ul>
						</h1>
					</div>
				</div>
				<div class="pf-exp pf-about-section"
					init-with="p:[op:0, transform:rotateX(10deg) rotateY(-15deg)]"
					when-exp-sect-init="p:[opacity:0:1:450:easeOutExpo, transform:rotateX(10deg) rotateY(-15deg):rotateX(0deg) rotateY(0deg):1000:easeOutExpo easeOutQuad] | send:[shop-sect-init:public]:delay-150">
					<header><h2>Experience</h2></header>
					<div>
						<ul>
							<li class="pf-ab-exp-anim">
								<div>
									<span class="pf-exp-date"
										init-with="p:[tro:center center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):250:easeInOutBack]:delay-800">Present</span>
									<div init-with="p:[tro:left center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):1000:easeOutExpo]:delay-800">
										<h1>Vox Intern</h1>
										<p>Lorem ipsum dolor sit amet magna trisique ornare. Donec aliquet velit ex, vitae dignissim.</p>
										<div class="pf-exp-time">03/16-Present</div>
									</div>
								</div>
							</li>
							<li class="pf-ab-exp-anim"
								init-with="p:[transform:translateY(-97px)]"
								when-exp-sect-init="p:[transform:translateY(-97px):translateY(0px):250:easeInQuart]:delay-300">
								<div>
									<span class="pf-exp-date"
										init-with="p:[tro:center center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):250:easeInOutBack]:delay-1000">2015</span>
									<div init-with="p:[tro:left center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):1000:easeOutExpo]:delay-1000">
										<h1>Daily Illini Editor</h1>
										<p>Lorem ipsum dolor sit amet magna trisique ornare. Donec aliquet velit ex, vitae dignissim.</p>
										<div class="pf-exp-time">04/15-11/15</div>
									</div>
								</div>
							</li>
							<li class="pf-ab-exp-anim"
								init-with="p:[transform:translateY(-194px)]"
								when-exp-sect-init="p:[transform:translateY(-194px):translateY(0px):250:easeInQuart]:delay-150">
								<div>
									<span class="pf-exp-date"
										init-with="p:[tro:center center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):250:easeInOutBack]:delay-1200"></span>
									<div init-with="p:[tro:left center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):1000:easeOutExpo]:delay-1200">
										<h1>Daily Illini Writer</h1>
										<p>Lorem ipsum dolor sit amet magna trisique ornare. Donec aliquet velit ex, vitae dignissim.</p>
										<div class="pf-exp-time">01/15-04/15</div>
									</div>
								</div>
							</li>
							<li class="pf-ab-exp-anim"
								init-with="p:[transform:translateY(-291px)]"
								when-exp-sect-init="p:[transform:translateY(-291px):translateY(0px):250:easeInQuart]">
								<div>
									<span class="pf-exp-date"
										init-with="p:[tro:center center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):250:easeInOutBack]:delay-1400">2014</span>
									<div init-with="p:[tro:left center, transform:scale(0)]"
										when-exp-sect-init="p:[transform:scale(0):scale(1):1000:easeOutExpo]:delay-1400">
										<h1>Newsletter Writer</h1>
										<p>Lorem ipsum dolor sit amet magna trisique ornare. Donec aliquet velit ex, vitae dignissim.</p>
										<div class="pf-exp-time">01/14-11/14</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="pf-about-section overflow-hidden"
					init-with="p:[op:0, transform:rotateX(10deg) rotateY(-15deg)]"
					when-shop-sect-init="p:[opacity:0:1:450:easeOutExpo, transform:rotateX(10deg) rotateY(-15deg):rotateX(0deg) rotateY(0deg):1000:easeOutExpo easeOutQuad]">
					<header><h2>My other guru shops</h2></header>
					<div>
						<ul class="pf-about-shops">
							<li class="pf-ab-shop-anim">
								<a class="pf-tech" init-with="p:[border-radius:110px, transform:scale(0), tro: center center]"
									when-shop-sect-init="p:[border-radius:110px:2px:450:easeOutBack, transform:scale(0):scale(1):450:easeInQuad]">
									<svg viewBox="0 0 100 100" init-with="p:[tro:center center, tr:scale(0)]"
										when-shop-sect-init="p:[transform:scale(0):scale(1):450:easeOutBounce]:delay-450">
										<path d="M61.9514595,17.8378378 L24.2647568,17.8378378 C22.7476216,17.8378378 21.5135135,19.0756216 21.5135135,20.6028649 L21.5135135,23.3513514 L24.7288108,23.3513514 C25.9978378,23.3513514 27.027027,24.3713514 27.027027,25.6486486 C27.027027,26.9176757 25.9895676,27.9459459 24.7288108,27.9459459 L21.5135135,27.9459459 L21.5135135,32.5405405 L24.7288108,32.5405405 C25.9978378,32.5405405 27.027027,33.5605405 27.027027,34.8378378 C27.027027,36.1068649 25.9895676,37.1351351 24.7288108,37.1351351 L21.5135135,37.1351351 L21.5135135,41.7297297 L24.7288108,41.7297297 C25.9978378,41.7297297 27.027027,42.7497297 27.027027,44.027027 C27.027027,45.2960541 25.9895676,46.3243243 24.7288108,46.3243243 L21.5135135,46.3243243 L21.5135135,52.7567568 L24.7288108,52.7567568 C25.9978378,52.7567568 27.027027,53.7767568 27.027027,55.0540541 C27.027027,56.3230811 25.9895676,57.3513514 24.7288108,57.3513514 L21.5135135,57.3513514 L21.5135135,61.9459459 L24.7288108,61.9459459 C25.9978378,61.9459459 27.027027,62.9659459 27.027027,64.2432432 C27.027027,65.5122703 25.9895676,66.5405405 24.7288108,66.5405405 L21.5135135,66.5405405 L21.5135135,71.1351351 L24.7288108,71.1351351 C25.9978378,71.1351351 27.027027,72.1551351 27.027027,73.4324324 C27.027027,74.7014595 25.9895676,75.7297297 24.7288108,75.7297297 L21.5135135,75.7297297 L21.5135135,78.4782162 C21.5135135,80.0054595 22.7448649,81.2432432 24.2647568,81.2432432 L61.9514595,81.2432432 C63.4685946,81.2432432 64.7027027,80.0054595 64.7027027,78.4782162 L64.7027027,20.6028649 C64.7027027,19.0756216 63.4713514,17.8378378 61.9514595,17.8378378 L61.9514595,17.8378378 Z M21.5135135,37.1351351 L18.2982162,37.1351351 C17.0291892,37.1351351 16,36.1151351 16,34.8378378 C16,33.5688108 17.0374595,32.5405405 18.2982162,32.5405405 L21.5135135,32.5405405 M21.5135135,41.7297297 L18.2982162,41.7297297 C17.0374595,41.7297297 16,42.758 16,44.027027 C16,45.3043243 17.0291892,46.3243243 18.2982162,46.3243243 L21.5135135,46.3243243 M21.5135135,23.3513514 L18.2982162,23.3513514 C17.0374595,23.3513514 16,24.3796216 16,25.6486486 C16,26.9259459 17.0291892,27.9459459 18.2982162,27.9459459 L21.5135135,27.9459459 M21.5135135,61.9459459 L18.2982162,61.9459459 C17.0374595,61.9459459 16,62.9742162 16,64.2432432 C16,65.5205405 17.0291892,66.5405405 18.2982162,66.5405405 L21.5135135,66.5405405 M21.5135135,52.7567568 L18.2982162,52.7567568 C17.0374595,52.7567568 16,53.785027 16,55.0540541 C16,56.3313514 17.0291892,57.3513514 18.2982162,57.3513514 L21.5135135,57.3513514 M21.5135135,71.1351351 L18.2982162,71.1351351 C17.0374595,71.1351351 16,72.1634054 16,73.4324324 C16,74.7097297 17.0291892,75.7297297 18.2982162,75.7297297 L21.5135135,75.7297297 M38.972973,46.5666147 C38.972973,44.9102867 40.3200884,43.5675676 41.9748559,43.5675676 L64.7027027,43.5675676 L64.7027027,55.5135135 L41.9748559,55.5135135 C40.3169617,55.5135135 38.972973,54.166383 38.972973,52.5144664 L38.972973,46.5666147 Z M46.3243243,51.8378378 C47.3393341,51.8378378 48.1621622,51.0150098 48.1621622,50 C48.1621622,48.9849902 47.3393341,48.1621622 46.3243243,48.1621622 C45.3093145,48.1621622 44.4864865,48.9849902 44.4864865,50 C44.4864865,51.0150098 45.3093145,51.8378378 46.3243243,51.8378378 Z M69.7297297,81.2432432 L83.5675676,81.2432432 M70.3806306,22.4324324 L78.2412548,22.4324324 L78.2410102,71.1351351 L70.3815297,71.1351351 L70.3806306,22.4324324 Z M71.8105779,17.8378378 L76.8113076,17.8378378 L76.8113076,22.4324324 L71.8105779,22.4324324 L71.8105779,17.8378378 Z M74.713964,35.0478252 L74.713964,57.8108108 M74.713964,27.4864865 L74.713964,31.1621622 M70.3815297,71.1351351 L74.3112699,77.4990673 L78.2410102,71.1351351"></path>
									</svg>
								</a>
							</li>
							<li class="pf-ab-shop-anim">
								<a class="pf-baking" init-with="p:[border-radius:110px, transform:scale(0), tro: center center]"
									when-shop-sect-init="p:[border-radius:110px:2px:450:easeOutBack, transform:scale(0):scale(1):450:easeInQuad]:delay-100">
									<svg viewBox="0 0 100 100" init-with="p:[tro:center center, tr:scale(0)]"
										when-shop-sect-init="p:[transform:scale(0):scale(1):450:easeOutBounce]:delay-550">
										<path d="M12.5,32.2916667 C12.5,29.2713594 14.9528061,26.8229167 17.9682344,26.8229167 L72.6567656,26.8229167 C75.6767881,26.8229167 78.125,29.2775052 78.125,32.2916667 L78.125,32.2916667 C78.125,35.3119739 75.6721939,37.7604167 72.6567656,37.7604167 L17.9682344,37.7604167 C14.9482119,37.7604167 12.5,35.3058282 12.5,32.2916667 L12.5,32.2916667 Z M73.990625,48.515625 C76.3666667,47.9177083 78.125,45.7875 78.125,43.2291667 C78.125,40.2145833 75.6760417,37.7604167 72.6552083,37.7604167 M38.803125,37.7604167 C35.7729167,37.7604167 33.3333333,40.2083333 33.3333333,43.2291667 C33.3333333,45.8041667 35.1270833,47.9583333 37.5322917,48.534375 L37.5,73.1770833 L73.9583333,73.1770833 M17.9697917,37.7604167 C14.9395833,37.7604167 12.5,40.2083333 12.5,43.2291667 C12.5,45.8041667 14.29375,47.9583333 16.6989583,48.534375 L16.6666667,73.1770833 L37.5105123,73.1770833 M23.9583333,72.65625 L23.9583333,50.78125 M30.2083333,72.65625 L30.2083333,50.78125 M51.3020833,73.1770833 C58.3494669,73.1770833 64.0625,67.4640502 64.0625,60.4166667 C64.0625,53.3692831 58.3494669,47.65625 51.3020833,47.65625 C44.2546998,47.65625 38.5416667,53.3692831 38.5416667,60.4166667 C38.5416667,67.4640502 44.2546998,73.1770833 51.3020833,73.1770833 Z M51.3020833,63.5416667 C53.0279732,63.5416667 54.4270833,62.1425565 54.4270833,60.4166667 C54.4270833,58.6907768 53.0279732,57.2916667 51.3020833,57.2916667 C49.5761935,57.2916667 48.1770833,58.6907768 48.1770833,60.4166667 C48.1770833,62.1425565 49.5761935,63.5416667 51.3020833,63.5416667 Z M59.6837279,34.0282762 C60.1477625,33.3009781 60.4166667,32.4371003 60.4166667,31.5104167 C60.4166667,29.8241077 59.5262181,28.345774 58.1898688,27.5199636 C57.4746442,27.0779833 56.6316924,26.8229167 55.7291667,26.8229167 M64.8920612,34.0282762 C65.3560958,33.3009781 65.625,32.4371003 65.625,31.5104167 C65.625,29.8241077 64.7345515,28.345774 63.3982021,27.5199636 C62.6829775,27.0779833 61.8400258,26.8229167 60.9375,26.8229167 M70.1003945,34.0282762 C70.5644292,33.3009781 70.8333333,32.4371003 70.8333333,31.5104167 C70.8333333,29.8241077 69.9428848,28.345774 68.6065354,27.5199636 C67.8913108,27.0779833 67.0483591,26.8229167 66.1458333,26.8229167 M87.5,56.5104167 L82.7307807,73.1770833 L69.3525526,73.1770833 L64.5833333,56.5104167 L87.5,56.5104167 Z M85.4166667,56.2793485 C85.4166667,51.804591 81.2193362,48.3605279 76.0416667,48.3605279 C70.8639971,48.3605279 66.6666667,51.804591 66.6666667,56.2793485"></path>
									</svg>
								</a>
							</li>
							<li class="pf-ab-shop-anim">
								<a class="pf-photography" init-with="p:[border-radius:110px, transform:scale(0), tro: center center]"
									when-shop-sect-init="p:[border-radius:110px:2px:450:easeOutBack, transform:scale(0):scale(1):450:easeInQuad]:delay-200">
									<svg viewBox="0 0 100 100" init-with="p:[tro:center center, tr:scale(0)]"
										when-shop-sect-init="p:[transform:scale(0):scale(1):450:easeOutBounce]:delay-650">
										<path d="M16,31.1621622 L84,31.1621622 L84,75.2702703 L16,75.2702703 L16,31.1621622 Z M17.8378378,26.5675676 L21.5135135,26.5675676 L21.5135135,31.1621622 L17.8378378,31.1621622 L17.8378378,26.5675676 Z M24.2702703,26.5675676 L32.5405405,26.5675676 L32.5405405,31.1621622 L24.2702703,31.1621622 L24.2702703,26.5675676 Z M35.2972973,24.7297297 L84,24.7297297 L84,31.1621622 L35.2972973,31.1621622 L35.2972973,24.7297297 Z M24.2702703,34.8378378 L31.6216216,34.8378378 L31.6216216,39.4324324 L24.2702703,39.4324324 L24.2702703,34.8378378 Z M68.3783784,34.8378378 L80.3243243,34.8378378 L80.3243243,42.1891892 L68.3783784,42.1891892 L68.3783784,34.8378378 Z M51.3783784,70.6756757 C60.2597142,70.6756757 67.4594595,63.4759304 67.4594595,54.5945946 C67.4594595,45.7132588 60.2597142,38.5135135 51.3783784,38.5135135 C42.4970425,38.5135135 35.2972973,45.7132588 35.2972973,54.5945946 C35.2972973,63.4759304 42.4970425,70.6756757 51.3783784,70.6756757 Z M51.3783784,66.2297297 C57.8042861,66.2297297 63.0135135,61.0205023 63.0135135,54.5945946 C63.0135135,48.1686869 57.8042861,42.9594595 51.3783784,42.9594595 C44.9524707,42.9594595 39.7432432,48.1686869 39.7432432,54.5945946 C39.7432432,61.0205023 44.9524707,66.2297297 51.3783784,66.2297297 Z M29.7837838,55.972973 C30.7987936,55.972973 31.6216216,55.1501449 31.6216216,54.1351351 C31.6216216,53.1201253 30.7987936,52.2972973 29.7837838,52.2972973 C28.768774,52.2972973 27.9459459,53.1201253 27.9459459,54.1351351 C27.9459459,55.1501449 28.768774,55.972973 29.7837838,55.972973 Z M16.4594595,45.4054054 L37.5945946,45.4054054 M64.7027027,45.4054054 L83.5405405,45.4054054"></path>
									</svg>
								</a>
							</li>
							<li class="pf-ab-shop-anim">
								<a class="pf-household" init-with="p:[border-radius:110px, transform:scale(0), tro: center center]"
									when-shop-sect-init="p:[border-radius:110px:2px:450:easeOutBack, transform:scale(0):scale(1):450:easeInQuad]:delay-300">
									<svg viewBox="0 0 100 100" init-with="p:[tro:center center, tr:scale(0)]"
										when-shop-sect-init="p:[transform:scale(0):scale(1):450:easeOutBounce]:delay-750">
										<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"></path>
									</svg>
								</a>
							</li>
							<li class="pf-ab-shop-anim">
								<a class="pf-tech" init-with="p:[border-radius:110px, transform:scale(0), tro: center center]"
									when-shop-sect-init="p:[border-radius:110px:2px:450:easeOutBack, transform:scale(0):scale(1):450:easeInQuad]:delay-400">
									<svg viewBox="0 0 100 100" init-with="p:[tro:center center, tr:scale(0)]"
										when-shop-sect-init="p:[transform:scale(0):scale(1):450:easeOutBounce]:delay-850">
										<path d="M22.6111111,67.9444444 L18.0014923,67.9444444 C16.8960986,67.9444444 16,67.0501058 16,65.9430648 L16,20.8347129 C16,19.7293815 16.897203,18.8333333 17.9982843,18.8333333 L82.0017157,18.8333334 C83.1053377,18.8333334 84,19.727672 84,20.834713 L84,65.9430648 C84,67.0483963 83.1133151,67.9444444 82.0064675,67.9444444 L39.6111111,67.9444444 M22.6111111,47.2842218 C22.6111111,46.1760934 23.5011695,45.2777778 24.6112173,45.2777778 L37.6110049,45.2777778 C38.7156331,45.2777778 39.6111111,46.1649238 39.6111111,47.2842218 L39.6111111,79.1602226 C39.6111111,80.2683511 38.7210527,81.1666667 37.6110049,81.1666667 L24.6112173,81.1666667 C23.5065891,81.1666667 22.6111111,80.2795207 22.6111111,79.1602226 L22.6111111,47.2842218 Z M16.4722222,58.9722222 L22.1388889,58.9722222 M40.1507937,58.9722222 L83.7177734,58.9722222 M59.9166667,68.4074436 L59.9166667,75.9722222 M22.6111111,76.4444444 L66.089848,76.4444444 C67.1933215,76.4444444 68.0878635,77.3326583 68.0878635,78.4470918 L68.0878635,79.1640193 C68.0878635,80.2700509 67.1998392,81.1666667 66.089848,81.1666667 L24.6091266,81.1666667 C23.5056531,81.1666667 22.6111111,80.2784528 22.6111111,79.1640193 L22.6111111,76.4444444 Z M23.0833333,50.4722222 L39.1388889,50.4722222"></path>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="pf-resources pf-main-section" ng-class="{'active': guru.section_index === 3}">
				<div class="pf-main-header overflow-hidden">
					<h1 init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-900">The Golden Bear Tutor</h1>
					<p init-with="p-op"
						when-pf-tabs-init="p:[transform:translateY(150px):translateY(0px):500:easeOutQuint, opacity:0:1:500:easeOutQuint]:delay-1000">Fusce vehicula dolor arcu, sit amet blandit dolor nec. Donec viverra.<p>
				</div>
				<ul class="pf-items">
					<ul class="pf-items">
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-1:public]"
								when-photo-cardlet-init-1="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-1="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-1="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-1="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-1="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-1="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-1="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-1="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-1="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-2:public:delay-500]"
								when-photo-cardlet-init-2="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-2="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-2="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-2="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-2="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-2="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-2="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-2="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-2="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-3:public:delay-1000]"
								when-photo-cardlet-init-3="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-3="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-3="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-3="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-3="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-3="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-3="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-3="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-3="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-4:public:delay-1500]"
								when-photo-cardlet-init-4="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-4="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-4="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-4="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-4="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-4="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-4="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-4="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-4="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-5:public:delay-2000]"
								when-photo-cardlet-init-5="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-5="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-5="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-5="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-5="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-5="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-5="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-5="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-5="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pf-tile-container"
								init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
								when-pf-rs-init="s:[photo-cardlet-init-6:public:delay-2500]"
								when-photo-cardlet-init-6="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear]"
								when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
								<a></a><a></a><a></a><a></a>
								<div class="pf-cardlet highlight bg-photography">
									<div class="pf-cardlet-front-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-6="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-front">
											<div></div><div></div><div></div>
											<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
												init-with="p-op"
												when-photo-cardlet-init-6="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
												when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
											<div class="pf-cardlet-overlay"></div>
										</div>
									</div>
									<div class="pf-cardlet-bottom-container"
										init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
										when-photo-cardlet-init-6="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-bottom">
											<h1 init-with="p-op"
												when-photo-cardlet-init-6="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
											<div init-with="p-op"
												when-photo-cardlet-init-6="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
												<h2>03/28/2016</h2>
											</div>
										</div>
									</div>
									<div class="pf-cardlet-back-container"
										init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
										when-photo-cardlet-init-6="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
										<div class="pf-cardlet-back"></div>
									</div>
									<div class="pf-cardlet-ribbon-container"
										init-with="p:[op:0, tr:translateX(10px)]"
										when-photo-cardlet-init-6="p:[opacity:0:1:250:easeOutSine, transform:translateX(10px):translateX(0px):250:easeOutSine]:delay-500">
										<div class="pf-cardlet-ribbon">
											<svg viewBox="0 0 100 100">
												<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
											</svg>
										</div>
									</div>
									<div class="pf-cardlet-ribbon-edge-container"
										init-with="p-op"
										when-photo-cardlet-init-6="p:[opacity:0:1:250:easeInSine]:delay-650">
										<div class="pf-cardlet-ribbon-edge"></div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</ul>
			</div>
		</main>
	</div>
	<button class="pf-mobile-cta">Contact Guru</button>
</div>
