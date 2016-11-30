<div class="perspective-container full-xy flex-center p15xy" types='default, academic, baking, photo, tech, household' default-type="photo">
	<div class="pf-tile-container mobile" ng-if='activeType === "default"'
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="s:[default-cardlet-init:public]"
		when-default-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-default-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
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
					<h1 u init-with="p:[opacity:0, translateY:-10%]"
						when-default-cardlet-init="a:[opacity:0:1:400:linear:0:1:f, translateY:-10%:0%:600:easeOutBack:0:1:f]">Leonardo da Vinci</h1>
					<div u init-with="p:[opacity:0, translateY:-10%]"
						when-default-cardlet-init="a:[opacity:0:1:400:linear:500:1:f, translateY:-10%:0%:600:easeOutBack:500:1:f]">
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
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-academic-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
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
						<div u init-with="p:[scaleX:0]"
							when-academic-cardlet-init="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"></div>
						<div u init-with="p:[scaleY:0]"
							when-academic-cardlet-init="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"></div>
						<div u init-with="p:[scaleY:0]"
							when-academic-cardlet-init="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"></div>
						<div u init-with="p:[scaleX:0]"
							when-academic-cardlet-init="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"></div>
					</div>
					<h1 u init-with="p:[opacity:0]"
						when-academic-cardlet-init="a:[zoomIn:400:(.8,.1,.41,.91):450:1:f]">Master the Cerebral Cortex</h1>
					<div>
						<div u init-with="p:[opacity:0, scaleY:0]"
							when-academic-cardlet-init="p:[opacity:0:1:400:easeOutSine:650:1:f, scaleY:0:1:400:easeOutSine:650:1:f]">
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
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="s:[baking-cardlet-init:public]"
		when-baking-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-baking-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]"
		on-mouse-enter="s:[baking-cardlet-hover:public]"
		on-mouse-leave="s:[baking-cardlet-leave:public]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:1000:linear:0:1:f]">
				<div class="pf-cardlet-front"></div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" style="background: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-default
				when-baking-cardlet-hover="a:[baking-cardlet-hover:1000:linear:]">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-icon" style="background-image: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"
						u init-with="p:[opacity:0]"
						when-baking-cardlet-init="a:[bounceIn-rotate-subtle:1000:linear:500:1:f]"></div>
					<h1 u init-with="p:[opacity:0]"
						when-baking-cardlet-init="a:[scoop-enter:1000:linear:750:1:f]">Four-Star Strawberry Cake on a Budget</h1>
					<div>
						<h2 u init-with="p:[opacity:0]"
							when-baking-cardlet-init="a:[scoop-enter:1000:linear:1000:1:f]">03/28/2016</h2>
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
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-photo-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front">
					<div></div><div></div><div></div>
					<div class="pf-cardlet-bg" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');"
						u init-with="p:[opacity:0]"
						when-photo-cardlet-init="a:[pf-photo-enter:750:easeInOutSine:500:1:f]"
						when-photo-cardlet-exit="a:[pf-photo-enter:750:easeInOutSine:0:1:r]">&nbsp;</div>
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
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="send:[tech-cardlet-init:public, tech-surge:public:delay-500]"
		when-tech-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-tech-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
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
						<div u init-with="p:[scaleX:0]"
						 	when-tech-surge="a:[scaleX:0:1:150:easeOutSine:0:1:f]"></div>
						<div init-with="p:[tr:scaleY(0), tro:center top]"
							when-tech-surge="a:[scaleY:0:1:150:easeOutSine:550:1:f]"></div>
						<div u init-with="p:[scaleX:0]"
						 	when-tech-surge="a:[scaleX:0:1:150:easeOutSine:1200:1:f]"></div>
						<div init-with="p:[tr:scaleY(0), tro: center top]"
							when-tech-surge="a:[scaleY:0:1:150:easeOutSine:550:1:f]"></div>
						<div u init-with="p:[scaleX:0]"
						 	when-tech-surge="a:[scaleX:0:1:150:easeOutSine:1200:1:f]"></div>
					<h1 u init-with="p:[opacity:0]"
						when-tech-surge="p:[opacity:0:1:250:easeOutSine:1500:1:f]">When to Replace Your Phone</h1>
					<div>
						<div u init-with="p:[opacity:0]"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine:1500:1:f]"></div>
						<h2 u init-with="p:[opacity:0]"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine:1700:1:f]">03/28/2016</h2>
						<div u init-with="p:[opacity:0]"
							when-tech-surge="p:[opacity:0:1:250:easeOutSine:1500:1:f]"></div>
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
		u init-with="p:[transform-origin:left top, rotateX:-30deg, rotateY:30deg, opacity:0]"
		on-init="s:[household-cardlet-init:public]"
		when-household-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-household-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" style="background-image: url('http://pistilsnursery.com/wp-content/uploads/2016/02/succulents-and-cacti-pistils-nursery.jpg');">
					<div></div><div></div><div></div><div></div>
					<div class="pf-cardlet-overlay"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 u init-with="p:[opacity:0]"
						when-household-cardlet-init="a:[bounceIn-subtle:1000:linear:300:1:f]">How to Make Your Plants Live Longer</h1>
					<div u init-with="p:[opacity:0, transform-origin:right bottom]"
						when-household-cardlet-init="a:[bounceIn-subtle:1000:linear:500:1:f]">
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
