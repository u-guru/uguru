<div class="perspective-container full-xy flex-center p15xy">
	<a class="album-tile" u on-init="s:[album-tile-init:depth(>1)]"
		on-mouseenter="s:[album-tile-enter:depth(>1)]"
		on-mouseover="s:[album-tile-enter:depth(>1)]"
		on-mouseleave="s:[album-tile-leave:depth(>1)]"
		on-mousedown="s:[album-tile-down:depth(>1)]"
		on-mouseup="s:[album-tile-up:depth(>1), album-tile-reset:depth(>1):500]">
		<div class="album-echo"
			u init-with="p:[op:0]"
			when-album-tile-down="p:[t:all 300ms ease-out, op:1, width:calc(100% + 30px), height:calc(100% + 30px)]"
			when-album-tile-up="a:[opacity:1:0:300:easeInSine:0:1:f]"
			when-album-tile-reset="p:[t:none, width:100%, height:100%]">
			<div u init-with="p:[bg:#020c39]"></div>
		</div>
		<div class="album-art"
			u init-with="p:[op:0]"
			when-album-tile-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100" fill="none"></rect>
			</svg>
			<div style="background-image: url('https://snap-photos.s3.amazonaws.com/img-thumbs/960w/Z3VPU4IDKE.jpg')"></div>
			<div class="overlay"
				u init-with="p:[op:0, bg:#020c39]"
				when-album-tile-enter="a:[opacity:0:0.95:150:easeInOutSine:0:1:f]"
				when-album-tile-leave="a:[opacity:0.95:0:150:easeInOutSine:0:1:f]">
			</div>
			<svg class="overlay" viewBox="0 0 100 100"
				u init-with="p:[op:0]"
				when-album-tile-enter="a:[opacity:0:1:150:easeInOutSine:0:1:f]"
				when-album-tile-leave="a:[opacity:1:0:150:easeInOutSine:0:1:f]">
				<path d="M50,86 C69.882251,86 86,69.882251 86,50 C86,30.117749 69.882251,14 50,14 C30.117749,14 14,30.117749 14,50 C14,69.882251 30.117749,86 50,86 Z M62.2163044,47.615046 C62.6255301,47.9506063 62.9624,48.2795217 62.9624,48.805565 C62.9624,49.3305008 62.7227954,49.6494492 62.2163044,49.9949765 L44.2957773,63.0862556 C43.9980507,63.2767387 42.8178201,63.3586907 42.8024,62.1338404 L42.8024,35.4761821 C42.8035862,34.343251 43.8818069,34.2535468 44.2957773,34.5248744 L62.2163044,47.615046 Z"></path>
			</svg>
		</div>
		<div class="album-caption">
			<h1 u init-with="p:[bg:#020c39, op:0, tro:top center, tr:rotateX(90deg)]"
				when-album-tile-init="a:[opacity:0:1:250:easeInOutSine:150:1:f, rotateX:90deg:0deg:250:easeOutQuint:150:1:f]">Midnight Cramming</h1>
			<h2 u init-with="p:[bg:#020c39, op:0, tro:top center, tr:rotateX(90deg)]"
				when-album-tile-init="a:[opacity:0:0.3:250:easeInOutSine:300:1:f, rotateX:90deg:0deg:250:easeOutQuint:300:1:f]">Intense EDM</h2>
		</div>
	</a>
</div>
