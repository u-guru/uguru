<div class="perspective-container full-xy flex-center p15xy" types='default, academic, baking, photo, tech, household' default-type="photo">
	<!-- NOTES FOR JESELLE
		Look for these comments within _tiles.scss (replace category with the actual category name)
		// profile cardlet transitions
			// profile cardlet transitions category
		// profile cardlet hover
			// profile cardlet hover category
		// profile cardlet click
			// profile cardlet click category

		These are universal and will apply to both desktop and mobile. Desktop and mobile should be differentiated by onEnter/onExit and parallax, not by color changes.

		With regards to hover transitions:
			- If you want separate transitiona for mouse-enter and mouse-leave
				- Put mouse-leave transitions in // profile cardlet transitions
				- Put mouse-enter transitions in // profile cardlet hover
			- If you want a transition to apply to BOTH mouse-enter and mouse-leave, put it in // profile cardlet transitions

		With regards to onEnter/onExit animations:
			- I put in a bunch of containers - pf-cardlet-front-container, pf-cardlet-back-container, pf-cardlet-bottom-container, etc.
			- Feel free to animate these - they have no transitions and no transforms attached in the static CSS
			- Let me know if you have problems
	-->

	<div class="pf-tile-container mobile" ng-if='activeType === "default"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[default-cardlet-init:public]"
		when-default-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-default-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');">
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 init-with="p:[op:0, tr:translateY(-10%)]"
						when-default-cardlet-init="p:[opacity:0:1:400:linear, transform:translateY(-10%):translateY(0%):600:easeOutBack]">Leonardo da Vinci</h1>
					<div init-with="p:[op:0, tr:translateY(-10%)]"
						when-default-cardlet-init="p:[opacity:0:1:400:linear, transform:translateY(-10%):translateY(0%):600:easeOutBack]:delay-500">
						<h3>Created</h3>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "academic"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-academic-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-academic">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-bg deco"></div>
					<div class="pf-cardlet-border deco">
						<div init-with="p:[tr:scaleX(0)]"
							when-academic-cardlet-init="p:[transform:scaleX(0):scaleX(1):1450:easeOutSine]"></div>
						<div init-with="p:[tr:scaleY(0)]"
							when-academic-cardlet-init="p:[transform:scaleY(0):scaleY(1):1450:easeOutSine]"></div>
						<div init-with="p:[tr:scaleY(0)]"
							when-academic-cardlet-init="p:[transform:scaleY(0):scaleY(1):1450:easeOutSine]"></div>
						<div init-with="p:[tr:scaleX(0)]"
							when-academic-cardlet-init="p:[transform:scaleX(0):scaleX(1):1450:easeOutSine]"></div>
					</div>
					<h1 init-with="p-op"
						when-academic-cardlet-init="a:[zoomIn:set:(dur:400ms#func:cubic-bezier(.8#.1#.41#.91)):in:delay-450]">Master the Cerebral Cortex</h1>
					<div>
						<div init-with="p:[op:0, tr:scaleY(0)]"
							when-academic-cardlet-init="p:[opacity:0:1:400:easeOutSine, transform:scaleY(0):scaleY(1):400:easeOutSine]:delay-650">
							<h2>03/28/2016</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "baking"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[baking-cardlet-init:public]"
		when-baking-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-baking-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]"
		on-mouse-enter="s:[baking-cardlet-hover:public]"
		on-mouse-leave="s:[baking-cardlet-leave:public]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:set:(dur:1000ms#func:linear):in]">
				<div class="pf-cardlet-front"></div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" style="background: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:set:(dur:1000ms#func:linear):in]">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-icon" style="background-image: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"
						init-with="p-op"
						when-baking-cardlet-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-500]"></div>
					<h1 init-with="p-op"
						when-baking-cardlet-init="a:[scoop-enter:set:(dur:1000ms#func:linear):in:delay-750]">Four-Star Strawberry Cake on a Budget</h1>
					<div>
						<h2 init-with="p-op"
							when-baking-cardlet-init="a:[scoop-enter:set:(dur:1000ms#func:linear):in:delay-1000]">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "photo"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-photo-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front">
					<div></div><div></div><div></div>
					<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
						init-with="p:[op:0]"
						when-photo-cardlet-init="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
						when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1>2016 Camera Models</h1>
					<div>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "tech"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="send:[tech-cardlet-init:public, tech-surge:public:delay-500]"
		when-tech-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-tech-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-tech">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg');">
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
						<div init-with="p:[tr:scaleX(0)]"
						 	when-tech-surge="p:[transform:scaleX(0):scaleX(1):150:easeOutSine]"></div>
						<div init-with="p:[tr:scaleY(0), tro:center top]"
							when-tech-surge="p:[transform:scaleY(0):scaleY(1):150:easeOutSine]:delay-550"></div>
						<div init-with="p:[tr:scaleX(0)]"
						 	when-tech-surge="p:[transform:scaleX(0):scaleX(1):150:easeOutSine]:delay-1200"></div>
						<div init-with="p:[tr:scaleY(0), tro: center top]"
							when-tech-surge="p:[transform:scaleY(0):scaleY(1):150:easeOutSine]:delay-550"></div>
						<div init-with="p:[tr:scaleX(0)]"
						 	when-tech-surge="p:[transform:scaleX(0):scaleX(1):150:easeOutSine]:delay-1200"></div>
							<!-- Note, easings are not being applied -->
					<h1 init-with="p-op"
						when-tech-surge="p:[opacity:0:1:250:easeOutSine]:delay-1500">When to Replace Your Phone</h1>
					<div>
						<div init-with="p-op"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine]:delay-1500"></div>
						<h2 init-with="p-op"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine]:delay-1700">03/28/2016</h2>
						<div init-with="p-op"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine]:delay-1500"></div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "household"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[household-cardlet-init:public]"
		when-household-cardlet-init="p:[transform:rotateX(-30deg) rotateY(30deg):rotateX(0deg) rotateY(0deg):1000:easeOutCubic easeOutExpo, opacity:0:1:500:easeOutSine]"
		when-household-cardlet-exit="p:[transform:rotateX(0deg) rotateY(0deg):rotateX(-30deg) rotateY(30deg):1000:easeOutSine easeOutSine, opacity:1:0:1500:easeOutSine]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://www.kinfolk.com/wp-content/uploads/2013/11/Kinfolk-City-Guide-Portland-Oregon-Pistils-Nursery-3.jpg');">
					<div></div><div></div><div></div><div></div>
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 init-with="p-op"
						when-household-cardlet-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]:delay-300">How to Make Your Plants Live Longer</h1>
					<div init-with="p:[op:0, tro:right bottom]"
						when-household-cardlet-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-500]">
						<div class="pf-cardlet-border">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>
</div>
