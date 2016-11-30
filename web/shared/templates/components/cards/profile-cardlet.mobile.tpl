<div class="perspective-container full-xy flex-center p15xy" types='default, academic, baking, photo, tech, household' default-type="default">
	<!-- needs color directives -->
	<div class="pf-tile-container mobile" ng-show='activeType === "default"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[default-cardlet-init:self, default-info:depth(1)]"
		when-default-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-default-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3">
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" bg-image="http://cdn1.pri.org/sites/default/files/styles/story_main/public/story/images/leonardo_da_vinci_studi_di_carri_dassalto_falcati_0.jpg?itok=V1_nRmK3"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 u init-with="p:[op:0, tr:translateY(-10%)]"
						when-default-info="a:[opacity:0:1:400:linear:0:1:f, translateY:-10%:0%:600:easeOutBack:0:1:f]">Leonardo da Vinci</h1>
					<div u init-with="p:[op:0, tr:translateY(-10%)]"
						when-default-info="a:[opacity:0:1:400:linear:500:1:f, translateY:-10%:0%:600:easeOutBack:500:1:f]">
						<h3>Created</h3>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-show='activeType === "academic"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[academic-cardlet-init:self, aca-info:depth(>1):450, aca-borders:depth(>1)]"
		when-academic-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-academic-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-academic">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg"></div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" bg-image="http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-bg deco"
						u when-corner-enter="p:[t:all 500ms ease-out, bg:rgba(230,56,155,0.2)]"
						when-corner-leave="p:[bg:rgba(230,56,155,0.1)]"
						when-corner-down="p:[t:all 250ms ease-in, bg:rgba(255,255,255,0.2)]"
						when-corner-up="p:[t:all 500ms ease-out, bg:rgba(230,56,155,0.2)]">
						<!-- rgba($cerise, 0.2) -->
					</div>
					<div class="pf-cardlet-border deco">
						<div u init-with="p:[tr:scaleX(0)]"
							when-aca-borders="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleY(0)]"
							when-aca-borders="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleY(0)]"
							when-aca-borders="a:[scaleY:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
						<div u init-with="p:[tr:scaleX(0)]"
							when-aca-borders="a:[scaleX:0:1:1450:easeOutSine:0:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0]"
							when-corner-leave="p:[bg:#fff]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0]"></div>
					</div>
					<h1 u init-with="p:[op:0]"
						when-aca-info="a:[zoomIn:400:(.8,.1,.41,.91):0:1:f]">Master the Cerebral Cortex</h1>
					<div>
						<div u init-with="p:[op:0, tr:scaleY(0)]"
							when-aca-info="a:[opacity:0:1:400:easeOutSine:0:1:f, scaleY:0:1:400:easeOutSine:200:1:f]"
							when-corner-enter="p:[t:all 500ms ease-out, bg:#fbe1f0, color:#e6389b]"
							when-corner-leave="p:[bg:#fff, color:#e6389b]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#cd3a8f, color:#ffffff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#fbe1f0, color:#e6389b]">
							<!-- mix($cerise, white, 15%) -->
							<!-- $cerise -->
							<h2>03/28/2016</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-show='activeType === "baking"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[baking-cardlet-init:self, bk-info:depth(>2):500]"
		when-baking-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-baking-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-baking">
			<div class="pf-cardlet-front-container"
				u when-corner-enter="a:[baking-cardlet-hover:1000:linear:0:1:f]">
				<div class="pf-cardlet-front"
					u when-corner-enter="p:[t:all 500ms ease-out, bg:#fceeca]"
					when-corner-leave="p:[bg:#fff]"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fadd95]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#fceeca]"></div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back" bg-image="http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				u when-baking-cardlet-hover="a:[baking-cardlet-hover:1000:linear:0:1:f]">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-icon" bg-image="http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2009/3/25/0/PB0210-1_Strawberry-Cake_s4x3.jpg"
						u init-with="p:[op:0]"
						when-bk-info="a:[bounceIn-rotate-subtle:1000:linear:0:1:f]"></div>
					<h1 u init-with="p:[op:0]"
						when-bk-info="a:[scoop-enter:1000:linear:250:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, color:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, color:#F6C64E]">Four-Star Strawberry Cake on a Budget</h1>
						<!-- $gold -->
					<div>
						<h2 u init-with="p:[op:0]"
							when-bk-info="a:[scoop-enter:1000:linear:500:1:f]"
							when-corner-down="p:[t:all 250ms ease-in, color:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, color:#F6C64E]">03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-show='activeType === "photo"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[photo-cardlet-init:public]"
		when-photo-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-photo-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-photography">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front">
					<div></div><div></div><div></div>
					<div class="pf-cardlet-bg" bg-image="http://s8.favim.com/orig/72/cameras-hipster-indie-photography-Favim.com-712610.jpg"
						u init-with="p:[clip-path: circle(0px at 50% 50%)]"
						when-photo-cardlet-init="a:[pf-photo-enter:750:easeInOutSine:500:1:f]"
						when-photo-cardlet-exit="a:[pf-photo-enter:750:easeInOutSine:0:1:r]">&nbsp;</div>
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
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
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-show='activeType === "tech"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="send:[tech-cardlet-init:self, tech-surge:depth(1):1000, tech-borders:depth(1):1500]"
		when-tech-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-tech-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-tech">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://techmaniacs.gr/wp-content/uploads/2012/08/iphone-5-release-date-imore-0.jpg">
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<!-- $azure -->
				<div class="pf-cardlet-bottom">
					<div u init-with="p:[tr:scaleX(0)]"
						when-tech-surge="a:[scaleX:0:1:150:easeOutSine:500:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleY(0), tro:center top]"
						when-tech-borders="a:[scaleY:0:1:150:easeOutSine:0:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
					 	when-tech-borders="a:[scaleX:0:1:150:easeOutSine:150:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleY(0), tro:center top]"
						when-tech-borders="a:[scaleY:0:1:150:easeOutSine:0:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
					 	when-tech-borders="a:[scaleX:0:1:150:easeOutSine:150:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<h1 u init-with="p:[op:0]"
						when-tech-surge="a:[opacity:0:1:250:easeOutSine:0:1:f]">When to Replace Your Phone</h1>
					<div>
						<div u init-with="p:[op:0]"
							when-tech-surge="a:[opacity:0:1:250:easeOutSine:0:1:f]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
						<h2 u init-with="p:[op:0]"
							when-tech-surge="a:[opacity:0:1:250:easeOutSine:200:1:f]">03/28/2016</h2>
						<div u init-with="p:[op:0]"
							when-tech-surge="a:[opacity:0:1:250:easeOutSine:0:1:f]"
							when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
							when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>

	<div class="pf-tile-container mobile" ng-show='activeType === "household"'
		u init-with="p:[tro:left top, tr:rotateX(-30deg) rotateY(30deg), op:0]"
		on-init="s:[household-cardlet-init:self, hh-info:children:300]"
		when-household-cardlet-init="a:[rotateX:-30deg:0deg:1000:easeOutCubic:0:1:f, rotateY:30deg:0deg:1000:easeOutExpo:0:1:f, opacity:0:1:500:easeOutSine:0:1:f]"
		when-household-cardlet-exit="a:[rotateX:0deg:-30deg:1000:easeOutSine:0:1:f, rotateY:0deg:30deg:1000:easeOutSine:0:1:f, opacity:1:0:1500:easeOutSine:0:1:f]">
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<a u on-mouseenter="s:[corner-enter:public]"
			on-mouseover="s:[corner-enter:public]"
			on-mouseleave="s:[corner-leave:public]"
			on-mousedown="s:[corner-down:public]"
			on-mouseup="s:[corner-up:public]"></a>
		<div class="pf-cardlet highlight bg-household">
			<div class="pf-cardlet-front-container">
				<div class="pf-cardlet-front" bg-image="http://pistilsnursery.com/wp-content/uploads/2016/02/succulents-and-cacti-pistils-nursery.jpg">
					<div></div><div></div><div></div><div></div>
					<div class="pf-cardlet-overlay"
						u when-corner-enter="p:[t:all 500ms ease-out, op:0.2]"
						when-corner-leave="p:[op:0]"
						when-corner-down="p:[t:all 250ms ease-in, op:0.4]"
						when-corner-up="p:[t:all 500ms ease-out, op:0.2]"></div>
				</div>
			</div>
			<div class="pf-cardlet-back-container">
				<div class="pf-cardlet-back"></div>
			</div>
			<div class="pf-cardlet-bottom-container">
				<div class="pf-cardlet-bottom">
					<h1 u init-with="p:[op:0]"
						when-hh-info="a:[bounceIn-subtle:1000:linear:0:1:f]">How to Make Your Plants Live Longer</h1>
					<div u init-with="p:[op:0, tro:right bottom]"
						when-hh-info="a:[bounceIn-subtle:1000:linear:200:1:f]">
						<div class="pf-cardlet-border">
							<div></div><div></div><div></div><div></div>
						</div>
						<h2>03/28/2016</h2>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container">
				<div class="pf-cardlet-ribbon">
					<graphic url='shared/templates/components/svg/main/star.html'></graphic>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container">
				<div class="pf-cardlet-ribbon-edge"></div>
			</div>
		</div>
	</div>
</div>
