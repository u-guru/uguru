<div class="pf-tile-container"
	u init-with-disable="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px)]"
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
		u init-with-disable="p:[tro:center center, tr:none]"
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
				u init-with-disable="p:[op:0, tro:center center]"
				when-tech-cardlet-back="a:[bounceIn-subtle:1000:linear:0:1:f]"
				when-corner-leave="p:[tr:none]"
				when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(-10px)]"></div>
		</div>
		<div class="pf-cardlet-bottom-container">
			<!-- $azure -->
			<div class="pf-cardlet-bottom"
				u when-corner-leave="p:[tr:none]"
				when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
				<div u init-with-disable="p:[tr:scaleX(0)]"
					when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				<div u init-with-disable="p:[tr:scaleY(0), tro:center top]"
					when-tech-border-draw="a:[scaleY:0:1:250:easeOutSine:0:1:f]:delay-250"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				<div u init-with-disable="p:[tr:scaleX(0)]"
					when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]:delay-500"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				<div u init-with-disable="p:[tr:scaleY(0), tro:center top]"
					when-tech-border-draw="a:[scaleY:0:1:250:easeOutSine:0:1:f]:delay-250"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				<div u init-with-disable="p:[tr:scaleX(0)]"
					when-tech-border-draw="a:[scaleX:0:1:250:easeOutSine:0:1:f]:delay-500"
					when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
					when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				<h1 u when-corner-leave="p:[tr:none]"
					when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
					when-corner-down="p:[t:all 250ms ease-in, tr:none]"
					when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">When to Replace Your Phone</h1>
				<div>
					<div u init-with-disable="p:[op:0]"
						when-tech-border-draw="a:[bounceIn-subtle:1000:easeOutSine:1000:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
					<h2 u init-with-disable="p:[op:0]"
						when-tech-border-draw="a:[shake-opacity:450:easeInOutSine:1100:1:f]"
						when-corner-leave="p:[tr:none]"
						when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(10px)]"
						when-corner-down="p:[t:all 250ms ease-in, tr:none]"
						when-corner-up="p:[t:all 500ms ease-out, tr:translateZ(10px)]">03/28/2016</h2>
					<div u init-with-disable="p:[op:0]"
						when-tech-border-draw="a:[bounceIn-subtle:1000:easeOutSine:1000:1:f]"
						when-corner-down="p:[t:all 250ms ease-in, bg:#fff]"
						when-corner-up="p:[t:all 500ms ease-out, bg:#55A4B7]"></div>
				</div>
			</div>
		</div>
		<div class="pf-cardlet-ribbon-container"
			u init-with-disable="p:[op:0, tr:translateX(-10px)]"
			when-tech-ribbon="a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-10px:0px:900:easeOutQuad:500:1:f]">
			<div class="pf-cardlet-ribbon"
				u when-corner-leave="p:[tr:none]"
				when-corner-enter="p:[t:all 500ms ease-out, tr:translateZ(20px)]">
				<graphic url='shared/templates/components/svg/main/star.html'></graphic>
			</div>
		</div>
		<div class="pf-cardlet-ribbon-edge-container"
			u init-with-disable="p:[op:0, tr:translateY(-10px)]"
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
