<div class="perspective-container full-xy flex-center p15xy" types='default, academic, baking, photo, tech, household' default-type="tech">
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
	<div class="pf-tile-container" ng-if='activeType === "default"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[default-cardlet-init:public]"
		when-default-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[default-ribbon:public]:delay-500"
		when-default-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');">
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0)]"
				when-default-cardlet-init="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0):translateX(0px) translateY(0px) translateZ(0):450:easeOutSine easeOutSine easeOutSine]:delay-500">
				<div class="pf-cardlet-back" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 init-with="p:[op:0, tr:translateY(10%)]"
						when-default-cardlet-init="p:[opacity:0:1:400:linear, transform:translateY(10%):translateY(0%):600:easeOutExpo]">Leonardo da Vinci</h1>
					<div init-with="p:[op:0, tr:translateY(10%)]"
						when-default-cardlet-init="p:[opacity:0:1:400:linear, transform:translateY(10%):translateY(0%):600:easeOutExpo]:delay-200">
						<h3>Created</h3>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-default-ribbon="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-default-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "academic"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[academic-ribbon:public]:delay-500"
		when-academic-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-academic">
			<div class="pf-cardlet-front-container"
				init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
				when-academic-cardlet-init="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
				<div class="pf-cardlet-front" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0)]"
				when-academic-cardlet-init="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0):translateX(0px) translateY(0px) translateZ(0):450:easeOutSine easeOutSine easeOutSine]:delay-500">
				<div class="pf-cardlet-back" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
				when-academic-cardlet-init="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
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
							when-academic-cardlet-init-1="p:[opacity:0:1:400:easeOutSine, transform:scaleY(0):scaleY(1):400:easeOutSine]:delay-650">
							<h2>03/28/2016</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-academic-ribbon="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-academic-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "baking"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[baking-cardlet-init:public]"
		when-baking-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[baking-ribbon:public]:delay-500"
		when-baking-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]"
		on-mouse-enter="s:[baking-cardlet-hover:public]"
		on-mouse-leave="s:[baking-cardlet-leave:public]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:set:(dur:1000ms#func:linear):in]">
				<div class="pf-cardlet-front"></div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p-op"
				when-baking-cardlet-init="a:[baking-cardlet-scaleX-enter:set:(dur:2000ms#func:linear):in:delay-600]">
				<div class="pf-cardlet-back" style="background: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:set:(dur:1000ms#func:linear):in]">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-icon" style="background-image: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"
						init-with="p-op"
						when-baking-cardlet-init="a:[icon-rotate-enter:set:(dur:1000ms#func:linear):in:delay-300]"></div>
					<h1 init-with="p-op"
						when-baking-cardlet-init="p:[opacity:0:1:650:easeOutSine]:delay-450">Four-Star Strawberry Cake on a Budget</h1>
					<div>
						<h2 init-with="p-op"
							when-baking-cardlet-init="p:[opacity:0:1:850:easeOutSine]:delay-450">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-baking-ribbon="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-baking-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "photo"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[photo-ribbon:public]:delay-500"
		when-photo-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front-container"
				init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
				when-photo-cardlet-init="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
				<div class="pf-cardlet-front">
					<div></div><div></div><div></div>
					<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
						init-with="p-op"
						when-photo-cardlet-init="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out):in:delay-500]"
						when-photo-cardlet-exit="a:[pf-photo-enter:set:(dur:750ms#func:ease-in-out#dir:reverse):out]">&nbsp;</div>
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-with="p:[tr:translateX(7.5px) translateY(7.5px) translateZ(0px)]"
				when-photo-cardlet-init="p:[transform:translateX(7.5px) translateY(7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
				<div class="pf-cardlet-bottom">
					<h1 init-with="p-op"
						when-photo-cardlet-init="p:[opacity:0:1:650:easeOutSine]:delay-450">2016 Camera Models</h1>
					<div init-with="p-op"
						when-photo-cardlet-init="a:[bounceInX:set:(dur:1000ms#func:linear):in:delay-450]">
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
				when-photo-cardlet-init="p:[transform:translateX(-7.5px) translateY(-7.5px):translateX(0px) translateY(0px):450:easeOutSine]:delay-750">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-photo-cardlet-init="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-photo-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "tech"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[tech-cardlet-init:public]"
		when-tech-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[tech-ribbon:public:delay-500, tech-cardlet-back:public:delay-1000]"
		when-tech-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-tech">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg');">
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"
					init-with="p:[op:0, tro:center center]"
					when-tech-cardlet-back="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]:delay-550"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<div init-with="p:[tr:scaleX(0)]"
					 	when-tech-cardlet-init="p:[transform:scaleX(0):scaleX(1):250:easeOutSine]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-tech-cardlet-init="p:[transform:scaleY(0):scaleY(1):250:easeOutSine]:delay-550"></div>
					<div init-with="p:[tr:scaleX(0)]"
					 	when-tech-cardlet-init="p:[transform:scaleX(0):scaleX(1):250:easeOutSine]:delay-1200"></div>
					<div init-with="p:[tr:scaleY(0), tro: center top]"
						when-tech-cardlet-init="p:[transform:scaleY(0):scaleY(1):250:easeOutSine]:delay-550"></div>
					<div init-with="p:[tr:scaleX(0)]"
					 	when-tech-cardlet-init="p:[transform:scaleX(0):scaleX(1):250:easeOutSine]:delay-1200"></div>
					<h1>When to Replace Your Phone</h1>
					<div>
						<div init-with="p-op"
							when-tech-cardlet-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-1500]"></div>
						<h2 init-with="p-op"
							when-tech-cardlet-init="a:[shake-opacity:set:(dur:450ms#func:ease-in-out):in:delay-1600]">03/28/2016</h2>
						<div init-with="p-op"
							when-tech-cardlet-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-1500]"></div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-tech-ribbon="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-tech-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "household"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[household-cardlet-init:public]"
		when-household-cardlet-init="p:[transform:rotateX(30deg) rotateY(30deg) translateY(300px):rotateX(0deg) rotateY(0deg) translateY(0px):1000:easeOutCubic easeOutCubic easeOutCubic,opacity:0:1:10:linear] | send:[household-ribbon:public]:delay-500"
		when-household-cardlet-exit="p:[tro:left bottom, opacity:1:0:500:easeOutSine:delay-750, transform:rotateX(0deg) rotateY(0deg) translateY(0px):rotateX(-45deg) rotateY(30deg) translateY(-300px):1000:easeOutCubic:delay-250]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://www.kinfolk.com/wp-content/uploads/2013/11/Kinfolk-City-Guide-Portland-Oregon-Pistils-Nursery-3.jpg');">
					<div></div><div></div><div></div><div></div>
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0)]"
				when-household-cardlet-init="p:[transform:translateX(-7.5px) translateY(-7.5px) translateZ(0):translateX(0px) translateY(0px) translateZ(0):450:easeOutSine easeOutSine easeOutSine]:delay-500">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 init-with="p-op"
						when-household-cardlet-init="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in]:delay-500">How to Make Your Plants Live Longer</h1>
					<div>
						<div class="pf-cardlet-border"
							init-with="p:[tr:scale(0), tro:right bottom]"
							when-household-cardlet-init="p:[transform:scale(0):scale(1):1000:easeOutBack]:delay-250">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<h2 init-with="p-op"
							when-household-cardlet-init="p:[opacity:0:1:250:linear]:delay-250">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(-10px)]"
				when-household-ribbon="p:[opacity:0:1:250:easeOutSine, transform:translateX(-10px):translateX(0px):900:easeOutQuad:delay-500]">
				<div class="pf-cardlet-ribbon">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p:[op:0, tr:translateY(-10px)]"
				when-household-ribbon="p:[opacity:0:1:450:linear, transform:translateY(-10px):translateY(0px):900:easeOutQuad:delay-500]:delay-200">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>
</div>
