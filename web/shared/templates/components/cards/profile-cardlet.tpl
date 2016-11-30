<div class="perspective-container full-xy flex-center p15xy" types='default, academic, baking, photo, tech, household' default-type="default">
	<!-- needs color directives -->
	<div class="pf-tile-container" ng-show='activeType === "default"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[default-cardlet-init:self, default-ribbon:depth(2):500, default-cardlet-back:depth(2):500]"
		when-default-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-default-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]">
		<!-- on-init="s:[default-cardlet-init:self, default-ribbon:children:500, default-cardlet-back:children:500]" -->
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]">
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				u init-with="p:[tr:translateX(-7.5px) translateY(-7.5px)]"
				when-default-cardlet-back="a:[translateX:-7.5px:0px:450:easeOutSine:0:1:f, translateY:-7.5px:0px:450:easeOutSine:0:1:f]">
				<div class="pf-cardlet-back" bg-image="http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
			 	u on-init="s:[default-bottom:depth(2)]">
				<div class="pf-cardlet-bottom"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<h1 u init-with="p:[op:0, tr:translateY(10%)]"
						when-default-bottom="a:[opacity:0:1:400:linear:0:1:f, translateY:10%:0%:600:easeOutExpo:0:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">Leonardo da Vinci</h1>
					<div u init-with="p:[op:0, tr:translateY(10%)]"
						when-default-bottom="a:[opacity:0:1:400:linear:200:1:f, translateY:10%:0%:600:easeOutExpo:200:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">
						<h3>Created</h3>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-default-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-default-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-show='activeType === "academic"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[academic-cardlet-init:public, academic-ribbon:depth(2):500, aca-cardlet-back:depth(2):500, aca-front:depth(2):750]"
		when-academic-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-academic-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]">
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-academic"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container"
				u init-with="p:[tr:translateX(7.5px) translateY(7.5px)]"
				when-aca-front="a:[translateX:7.5px:0px:450:easeOutSine:0:1:f, translateY:7.5px:0px:450:easeOutSine:0:1:f]">
				<div class="pf-cardlet-front" bg-image="http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"></div>
			</div>
			<div class="pf-cardlet-back-container"
				u init-with="p:[tr:translateX(-7.5px) translateY(-7.5px)]"
				when-aca-cardlet-back="a:[translateX:-7.5px:0px:450:easeOutSine:0:1:f, translateY:-7.5px:0px:450:easeOutSine:0:1:f]">
				<div class="pf-cardlet-back" bg-image="http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				u init-with="p:[tr:translateX(7.5px) translateY(7.5px)]"
				when-aca-cardlet-back="a:[translateX:7.5px:0px:450:easeOutSine:250:1:f, translateY:7.5px:0px:450:easeOutSine:250:1:f]">
				<div class="pf-cardlet-bottom"
					u on-init="s:[aca-info:depth(>1):450]"
					when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<div class="pf-cardlet-bg deco"
						u when-corner-enter="p:[t:all 500ms ease-out, bg:rgba(230,56,155,0.2)]"
						when-corner-leave="p:[bg:rgba(230,56,155,0.1)]"
						when-corner-down="p:[t:all 250ms ease-in, bg:rgba(255,255,255,0.2)]"
						when-corner-up="p:[t:all 500ms ease-out, bg:rgba(230,56,155,0.2)]">
						<!-- rgba($cerise, 0.2) -->
					</div>
					<div class="pf-cardlet-border deco"
					 	u on-init="s:[aca-border:children]">
						<div u init-with="p:[tr:scaleX(0)]"
							when-aca-border="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleY(0)]"
							when-aca-border="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleY(0)"]
							when-aca-border="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleX(0)]"
							when-aca-border="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
					</div>
					<h1 u init-with="p:[op:0]"
						when-aca-info="a:[zoomIn:400:(.8,.1,.41,.91):0:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">Master the Cerebral Cortex</h1>
					<div>
						<div u init-with="p:[op:0, tr:scaleY(0)]"
							when-aca-info="a:[opacity:0:1:400:easeOutSine:200:1:f, scaleY:0:1:400:easeOutSine:200:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0, color:#e6389b]"
							when-corner-leave="p:[bg:#fff, color:#e6389b]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f, color:#ffffff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0, color:#e6389b]">
							<!-- mix($cerise, white, 15%) -->
							<!-- $cerise -->
							<h2 u when-corner-leave="p:[tr:none]"
								when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
								when-corner-down="p:[t:all 250ms ease-in, tr:none]"
								when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">03/28/2016</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-academic-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-academic-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-show='activeType === "baking"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[baking-cardlet-init:self, baking-ribbon:depth(2):500]"
		when-baking-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-baking-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]"
		on-mouse-enter="s:[baking-cardlet-hover:public]"
		on-mouse-leave="s:[baking-cardlet-leave:public]">
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-baking"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container"
				u when-baking-cardlet-hover="a:[baking-cardlet-hover:1000:linear:0:1:f]">
				<div class="pf-cardlet-front"
					u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px), bg:#fceeca]"
					when-corner-leave="p:[tr:none, bg:#fff]"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fadd95]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#fceeca]">
					<!-- mix($gold, white, 30%) -->
					<!-- mix($gold, white, 60%) -->
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				u init-with="p:[op:0, tr:center center]"
				when-baking-cardlet-init="a:[baking-cardlet-scaleX-enter:2000:linear:600:1:f]">
				<div class="pf-cardlet-back" bg-image="http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				u when-baking-cardlet-hover="a:[baking-cardlet-hover:1000:linear:0:1:f]"
				on-init="s:[bk-info:depth(>1):300]">
				<div class="pf-cardlet-bottom"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<div class="pf-cardlet-icon" bg-image="http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg"
						u init-with="p:[tr:scale(0), tro:center center]"
						when-bk-info="a:[icon-rotate-enter:1000:linear:0:1:f]"
						when-bk-info-reset="p:[t:all 500ms ease-out, tr:none]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]"></div>
					<h1 u init-with="p:[op:0]"
						when-bk-info="a:[opacity:0:1:650:easeOutSine:150:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none, color:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px), color:#F6C64E]">Four-Star Strawberry Cake on a Budget</h1>
						<!-- $gold -->
					<div>
						<h2 u init-with="p:[op:0]"
							when-bk-info="a:[opacity:0:1:850:easeOutSine:150:1:f]"
							when-corner-leave="p:[tr:none]"
							when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
							when-corner-down="p:[t:all 250ms ease-in, tr:none, color:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px), color:#F6C64E]">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-baking-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-baking-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-show='activeType === "photo"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[photo-cardlet-init:self, photo-ribbon:depth(2):500, photo-front:depth(>2):500]"
		when-photo-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-photo-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]">
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-photography"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container"
				u init-with="p:[tr:translateX(7.5px) translateY(7.5px)]"
				when-photo-front="a:[translateX:7.5px:0px:450:easeOutSine:250:1:f, translateY:7.5px:0px:450:easeOutSine:250:1:f]">
				<div class="pf-cardlet-front"
					u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
					when-corner-leave="p:[tr:none]">
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div class="pf-cardlet-bg" bg-image="http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg"
						u init-with="p:[clip-path:circle(0px at 50% 50%)]"
						when-photo-front="a:[pf-photo-enter:750:easeInOutSine:0:1:f]"
						when-photo-cardlet-exit="a:[pf-photo-enter:750:easeInOutSine:0:1:r]">&nbsp;</div>
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
				</div>
			</div>
			<div class="pf-cardlet-bottom-container"
				u init-with="p:[tr:translateX(7.5px) translateY(7.5px)]"
				when-photo-front="a:[translateX:7.5px:0px:450:easeOutSine:250:1:f, translateY:7.5px:0px:450:easeOutSine:250:1:f]" on-init="s:[ph-info:depth(2):450]">
				<div class="pf-cardlet-bottom"
					u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]"
					when-corner-leave="p:[tr:none]">
					<h1 u init-with="p:[op:0]"
						when-ph-info="a:[opacity:0:1:650:easeOutSine:0:1:f]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(15px)]"
						when-corner-leave="p:[tr:none]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(15px)]">2016 Camera Models</h1>
					<div u init-with="p:[op:0, tro:center center]"
						when-ph-info="a:[scaleInX-subtle:1000:linear:0:1:f]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(15px)]"
						when-corner-leave="p:[tr:none]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(15px)]">
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				u init-with="p:[tr:translateX(-7.5px) translateY(-7.5px) translateZ(0px)]"
				when-photo-cardlet-init="a:[translateX:-7.5px:0px:450:easeOutSine:0:1:f, translateY:-7.5px:0px:450:easeOutSine:0:1:f]:delay-750">
				<div class="pf-cardlet-back"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-photo-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-photo-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-show='activeType === "tech"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[tech-cardlet-init:self, tech-cardlet-back:depth(2):1550, tech-ribbon:depth(2):500, tech-border-draw:depth(>1):200]"
		when-tech-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-tech-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]">
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-tech"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg"
					u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
					when-corner-leave="p:[tr:none]">
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"
					u init-with="p:[op:0, tro:center center]"
					when-tech-cardlet-back="a:[bounceIn-subtle:1000:linear:0:1:f]"
					when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<!-- $azure -->
				<div class="pf-cardlet-bottom"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<div u init-with="p:[tr:scaleX(0)]"
					 	when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleY(0), tro:center top]"
						when-tech-border-draw="a:[scaleY:0:1:250:easeOutSine:0:1:f]:delay-250"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
					 	when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]:delay-500"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleY(0), tro:center top]"
						when-tech-border-draw="a:[scaleY:0:1:250:easeOutSine:0:1:f]:delay-250"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
					 	when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]:delay-500"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<h1 u when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">When to Replace Your Phone</h1>
					<div>
						<div u init-with="p:[op:0]"
							when-tech-border-draw="a:[bounceIn-subtle:1000:easeOutSine:1000:1:f]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
						<h2 u init-with="p:[op:0]"
							when-tech-border-draw="a:[shake-opacity:450:easeInOutSine:1100:1:f]"
							when-corner-leave="p:[tr:none]"
							when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
							when-corner-down="p:[t:all 250ms ease-in, tr:none]"
							when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">03/28/2016</h2>
						<div u init-with="p:[op:0]"
							when-tech-border-draw="a:[bounceIn-subtle:1000:easeOutSine:1000:1:f]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-tech-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-tech-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container" ng-show='activeType === "household"'
		u init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
		on-init="s:[household-cardlet-init:self, hh-bot:depth(>1):250, household-ribbon:depth(2):500]"
		when-household-cardlet-init="a:[rotateX:30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutCubic:0:1:f,  translateY:300px:0px:1000:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
		when-household-cardlet-exit="p:[tro:left bottom] | a:[opacity:1:0:500:easeOutSine:750:1:f, rotateX:0deg:-45deg:1000:easeOutCubic:250:1:f, rotateY:0deg:30deg:1000:easeOutCubic:250:1:f, translateY:0px:-300px:1000:easeOutCubic:250:1:f]">
		<a u on-mouseenter="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-1-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-2-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-3-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseover="s:[corner-enter:public, corner-4-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-household"
			u init-with="p:[tro:center center, tr:none]"
			when-corner-leave="p:[tro:center center, tr:none]"
			when-corner-1-enter="p:[t:all 500ms ease-out, tro:bottom right, tr:rotateX(5deg) rotateY(-5deg)]"
			when-corner-2-enter="p:[t:all 500ms ease-out, tro:bottom left, tr:rotateX(5deg) rotateY(5deg)]"
			when-corner-3-enter="p:[t:all 500ms ease-out, tro:top left, tr:rotateX(-5deg) rotateY(5deg)]"
			when-corner-4-enter="p:[t:all 500ms ease-out, tro:top right, tr:rotateX(-5deg) rotateY(-5deg)]">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://www.pistilsnursery.com/wp-content/uploads/2014/01/mercantile.jpg"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]">
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-leave="p:[tr:none]"></div>
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container"
				u init-with="p:[tr:translateX(-7.5px) translateY(-7.5px)]"
				when-household-cardlet-init="a:[translateX:-7.5px:0px:450:easeOutSine:500:1:f, translateY:-7.5px:0px:450:easeOutSine:500:1:f]">
				<div class="pf-cardlet-back"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom"
					u when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
					when-corner-leave="p:[tr:none]">
					<h1 u init-with="p:[op:0]"
						when-hh-bot="a:[zoom-enter:800:linear:250:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">How to Make Your Plants Live Longer</h1>
					<div>
						<div class="pf-cardlet-border"
							u init-with="p:[tr:scale(0), tro:right bottom]"
							when-hh-bot="a:[scale:0:1:1000:easeOutBack:0:1:f]">
							<div></div><div></div><div></div><div></div>
						</div>
						<h2 u init-with="p:[op:0]"
							when-hh-bot="a:[opacity:0:1:250:linear:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
							when-corner-leave="p:[tr:none]"
							when-corner-down="p:[t:all 250ms ease-in, tr:none]"
							when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-household-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
				<div class="pf-cardlet-ribbon"
					u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				u init-with="p:[op:0, tr:translateY(-10px)]"
				when-household-ribbon="a:[opacity:0:1:450:linear:800:1:f, translateY:-10px:0px:500:easeOutQuad:1000:1:f]">
				<div class="pf-cardlet-ribbon-edge"
					u when-corner-leave="p:[tr:rotate(45deg)]"
					when-corner-1-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-2-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-2px) translateZ(10px) rotate(45deg)]"
					when-corner-3-enter="p:[t:all 500ms ease-out, tr:translateX(4px) translateY(-1px) translateZ(10px) rotate(45deg)]"
					when-corner-4-enter="p:[t:all 500ms ease-out, tr:translateX(2px) translateY(-1px) translateZ(10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>
</div>
