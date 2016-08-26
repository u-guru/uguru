<div class="perspective-container full-xy flex-center">
	<div class="pf-tile-container"
		init-with="p:[op:0, tro:left top, tr:rotateX(30deg) rotateY(30deg) translateY(300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.19#.37#.36#.99)]"
		on-init="s:[academic-cardlet-init:public]"
		when-academic-cardlet-init="p:[op:1, tr:none]"
		when-academic-cardlet-exit="p:[tro:left bottom, op:0:delay-500, tr:rotateX(-45deg) rotateY(30deg) translateY(-300px), t:opacity 500ms ease-out#transform 1000ms cubic-bezier(.31#.01#1#.8)]">
		<!-- <a></a><a></a><a></a><a></a> -->
		<div class="pf-cardlet highlight bg-academic"
			init-with="p:[tro:bottom left, tr:rotateX(10deg) rotateY(10deg), t:all 500ms ease-out]"
			on-mouse-enter="p:[-webkit-perspective:100, perspective:100]"
			on-mouse-leave="p:[-webkit-perspective:3000, perspective:3000]">
			<div class="pf-cardlet-front-container"
				init-with="p:[tr:translate3d(7.5px#7.5px#0), t:all 450ms ease-out]"
				when-academic-cardlet-init="p:[tr:none:delay-500]">
				<div class="pf-cardlet-front" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"
					init-with="p:[tr:translateZ(10px)]"></div>
			</div>
			<div class="pf-cardlet-back-container"
				init-with="p:[tr:translate3d(-7.5px#-7.5px#0), t:all 450ms ease-out]"
				when-academic-cardlet-init="p:[tr:none:delay-500]">
				<div class="pf-cardlet-back" style="background-image: url('http://i1-news.softpedia-static.com/images/news2/no-two-brains-are-alike-investigation-reveals-494462-2.jpg');"
					init-with="p:[tr:translateZ(-10px)]"></div>
			</div>
			<div class="pf-cardlet-bottom-container"
				init-with="p:[tr:translate3d(7.5px#7.5px#0), t:all 450ms ease-out]"
				when-academic-cardlet-init="p:[tr:translateZ(20px):delay-500]">
				<div class="pf-cardlet-bottom">
					<div class="pf-cardlet-bg deco"></div>
					<div class="pf-cardlet-border deco">
						<div init-with="p:[tr:scaleX(0)]"
							when-academic-cardlet-init="p:[tr:scaleX(1), t:transform 1450ms ease-out, t:all 500ms ease-out:delay-1500]"></div>
						<div init-with="p:[tr:scaleY(0)]"
							when-academic-cardlet-init="p:[tr:scaleY(1), t:transform 1450ms ease-out, t:all 500ms ease-out:delay-1500]"></div>
						<div init-with="p:[tr:scaleY(0)]"
							when-academic-cardlet-init="p:[tr:scaleY(1), t:transform 1450ms ease-out, t:all 500ms ease-out:delay-1500]"></div>
						<div init-with="p:[tr:scaleX(0)]"
							when-academic-cardlet-init="p:[tr:scaleX(1), t:transform 1450ms ease-out, t:all 500ms ease-out:delay-1500]"></div>
					</div>
					<h1 init-with="p-op"
						when-academic-cardlet-init="a:[zoomIn:set:(dur:400ms#func:cubic-bezier(.8#.1#.41#.91)):in:delay-450] | p:[tr:translateZ(20px):delay-850]">Master the Cerebral Cortex</h1>
					<div>
						<div init-with="p:[op:0, tr:scaleY(0), t:all 400ms cubic-bezier(.8#.1#.41#.91)]"
							when-academic-cardlet-init="p:[op:1, tr:none, t:all 500ms ease-out:delay-400]:delay-650">
							<h2>03/28/2016</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-container"
				init-with="p:[op:0, tr:translateX(10px), t:all 250ms ease-out]"
				on-init="p:[op:1:delay-500, tr:translateX(0):delay-500]">
				<div class="pf-cardlet-ribbon"
					init-with="p:[tr:translateZ(20px)]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118 "></polygon>
					</svg>
				</div>
			</div>
			<div class="pf-cardlet-ribbon-edge-container"
				init-with="p-op"
				on-init="a:[fadeIn:set:(dur:250ms#func:ease-in):in:delay-650]">
				<div class="pf-cardlet-ribbon-edge"
					init-with="p:[tr:translate3d(2px#-2px#10px) rotate(45deg)]"></div>
			</div>
		</div>
	</div>
</div>
