<div class="perspective-container full-xy flex-center p15xy" types='default-desktop, default-mobile, academic-desktop, academic-mobile, baking-desktop, baking-mobile, photo-desktop, photo-mobile, tech-desktop, tech-mobile, household-desktop, household-mobile' default-type="academic-desktop">
	<div class="pf-tile-container" ng-if='activeType === "default-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[default-cardlet-init:public]"
		when-default-cardlet-init="p:[op:1, tr:none]"
		when-default-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight">
			<div class="pf-cardlet-front" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			<div class="pf-cardlet-back" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			<div class="pf-cardlet-bottom">
				<h1>Leonardo da Vinci</h1>
				<div>
					<h3>Created</h3>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "default-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[default-cardlet-init:public]"
		when-default-cardlet-init="p:[op:1, tr:none]"
		when-default-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight">
			<div class="pf-cardlet-front" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			<div class="pf-cardlet-back" style="background-image: url('http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3');"></div>
			<div class="pf-cardlet-bottom">
				<h1>Leonardo da Vinci</h1>
				<div>
					<h3>Created</h3>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "academic-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="p:[op:1, tr:none]"
		when-academic-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-academic">
			<div class="pf-cardlet-front" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"
				init-with="p:[tr:translate3d(7.5px#7.5px#0)]"
				when-academic-cardlet-init="p:[tr:none:delay-500]"></div>
			<div class="pf-cardlet-back" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"
				init-with="p:[tr:translate3d(-7.5px#-7.5px#0)]"
				when-academic-cardlet-init="p:[tr:none:delay-500]"></div>
			<div class="pf-cardlet-bottom">
				<div class="pf-cardlet-bg deco"></div>
				<div class="pf-cardlet-border deco">
					<div></div><div></div><div></div><div></div>
				</div>
				<h1 init-with="p-op"
					on-init="a:[zoomIn:set:(dur:400ms#func:cubic-bezier(.8#.1#.41#.91)):in:delay-250]">Master the Cerebral Cortex</h1>
				<div>
					<div init-with="p:[op:0, tr:scaleX(0), t:all 400ms cubic-bezier(.8#.1#.41#.91)]"
						when-academic-cardlet-init="p:[op:1, tr:none]:delay-450">
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon"
				init-with="p:[op:0, tr:translateX(10px), t:all 250ms ease-out]"
				on-init="p:[op:1:delay-500, tr:translateX(0):delay-500, t:all 500ms ease-out:delay-750]">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"
				init-with="p:[op:0]"
				on-init="a:[fadeIn:set:(dur:250ms#func:ease-in):in:delay-650]"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "academic-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="p:[op:1, tr:none]"
		when-academic-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-academic">
			<div class="pf-cardlet-front" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			<div class="pf-cardlet-back" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"></div>
			<div class="pf-cardlet-bottom">
				<div class="pf-cardlet-bg deco"></div>
				<div class="pf-cardlet-border deco">
					<div></div><div></div><div></div><div></div>
				</div>
				<h1>Master the Cerebral Cortex</h1>
				<div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "baking-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[baking-cardlet-init:public]"
		when-baking-cardlet-init="p:[op:1, tr:none]"
		when-baking-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front"></div>
			<div class="pf-cardlet-back" style="background: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
			<div class="pf-cardlet-bottom">
				<div class="pf-cardlet-icon" style="background-image: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
				<h1>Four-Star Strawberry Cake on a Budget</h1>
				<div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "baking-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[baking-cardlet-init:public]"
		when-baking-cardlet-init="p:[op:1, tr:none]"
		when-baking-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front"></div>
			<div class="pf-cardlet-back" style="background: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
			<div class="pf-cardlet-bottom">
				<div class="pf-cardlet-icon" style="background-image: url('http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg');"></div>
				<h1>Four-Star Strawberry Cake on a Budget</h1>
				<div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "photo-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="p:[op:1, tr:none]"
		when-photo-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');">
				<div></div><div></div><div></div>
			</div>
			<div class="pf-cardlet-bottom">
				<h1>2016 Camera Models</h1>
				<div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "photo-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="p:[op:1, tr:none]"
		when-photo-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front" style="background-image: url('http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg');">
				<div></div><div></div><div></div>
			</div>
			<div class="pf-cardlet-bottom">
				<h1>2016 Camera Models</h1>
				<div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "tech-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[tech-cardlet-init:public]"
		when-tech-cardlet-init="p:[op:1, tr:none]"
		when-tech-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-tech">
			<div class="pf-cardlet-front" style="background-image: url('http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg');"></div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-bottom">
				<div></div><div></div><div></div><div></div><div></div>
				<h1>When to Replace Your Phone</h1>
				<div>
					<div></div>
					<h2>03/28/2016</h2>
					<div></div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "tech-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[tech-cardlet-init:public]"
		when-tech-cardlet-init="p:[op:1, tr:none]"
		when-tech-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-tech">
			<div class="pf-cardlet-front" style="background-image: url('http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg');"></div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-bottom">
				<div></div><div></div><div></div><div></div><div></div>
				<h1>When to Replace Your Phone</h1>
				<div>
					<div></div>
					<h2>03/28/2016</h2>
					<div></div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container" ng-if='activeType === "household-desktop"'
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[household-cardlet-init:public]"
		when-household-cardlet-init="p:[op:1, tr:none]"
		when-household-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front" style="background-image: url('http://www.kinfolk.com/wp-content/uploads/2013/11/Kinfolk-City-Guide-Portland-Oregon-Pistils-Nursery-3.jpg');">
				<div></div><div></div><div></div><div></div>
			</div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-bottom">
				<h1>How to Make Your Plants Live Longer</h1>
				<div>
					<div class="pf-cardlet-border">
						<div></div>
						<div></div>
						<div></div>
					</div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-if='activeType === "household-mobile"'
		init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0, t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[household-cardlet-init:public]"
		when-household-cardlet-init="p:[op:1, tr:none]"
		when-household-cardlet-exit="p:[tr:rotateX(-30deg) rotateY(30deg), op:0:delay-500]">
		<a></a><a></a><a></a><a></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front" style="background-image: url('http://www.kinfolk.com/wp-content/uploads/2013/11/Kinfolk-City-Guide-Portland-Oregon-Pistils-Nursery-3.jpg');">
				<div></div><div></div><div></div><div></div>
			</div>
			<div class="pf-cardlet-back"></div>
			<div class="pf-cardlet-bottom">
				<h1>How to Make Your Plants Live Longer</h1>
				<div>
					<div class="pf-cardlet-border">
						<div></div>
						<div></div>
						<div></div>
					</div>
					<h2>03/28/2016</h2>
				</div>
			</div>
			<div class="pf-cardlet-ribbon">
				<svg viewBox="0 0 100 100">
					<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
				</svg>
			</div>
			<div class="pf-cardlet-ribbon-edge"></div>
		</div>
	</div>
</div>