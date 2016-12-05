<div class="perspective-container full-xy flex-center p15xy">
	<a class="album-tile" u on-init="s:[album-tile-init:public]"
		on-mouse-enter="s:[album-tile-enter:public]"
		on-mouse-leave="s:[album-tile-leave:public]"
		on-click="s:[album-tile-click:public]">
		<div class="album-echo"
			u init-with="p:[op:0]">
			<div style="background: #020c39;"></div>
		</div>
		<div class="album-art"
			init-with="p:[op:0]"
			init-after="album-tile-init"
			on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100" fill="none"></rect>
			</svg>
			<div style="background-image: url('https://snap-photos.s3.amazonaws.com/img-thumbs/960w/Z3VPU4IDKE.jpg')"></div>
			<div class="overlay" style="background: #020c39;"
				u init-with="p:[opacity:0]"
				when-album-tile-enter="a:[opacity:0:0.95:150:easeInOutSine:0:1:f]"
				when-album-tile-leave="a:[opacity:0.95:0:150:easeInOutSine:0:1:f]">
				<!-- ^ This is how I would prefer to write my code -->

				<!-- EXAMPLE ONE -->
				<!-- This overlay comes in correctly the first time, but doesn't exit on leave. Then when I hover for the second time, it leaves. After that, it doesn't enter properly but flickers in and out on leave. -->
				<!-- init-with="p:[opacity:0]"
				init-after="album-tile-enter"
				on-init="p:[opacity:0]"
				when-album-tile-enter="a:[opacity:0:0.95:150:easeInOutSine:0:1:f]"
				when-album-tile-leave="a:[opacity:0.95:0:150:easeInOutSine:0:1:f]" -->

				<!-- EXAMPLE TWO -->
				<!-- This works correctly but doesn't allow for a leave animation -->
				<!-- init-with="p:[opacity:0]"
				init-after="album-tile-enter"
				on-init="a:[opacity:0:0.95:150:easeInOutSine:0:1:f]" -->

				<!-- EXAMPLE THREE -->
				<!-- This has the same behavior as EXAMPLE ONE -->
				<!-- init-with="p:[opacity:0]"
				init-after="album-tile-enter"
				on-init="a:[opacity:0:0.95:150:easeInOutSine:0:1:f]"
				when-album-tile-leave="a:[opacity:0.95:0:150:easeInOutSine:0:1:f]" -->

				<!-- ORIGINAL CSS -->
				<!-- This CSS was originally meant for the hover. On hover, div.overlay faded in to 95% opacity; on leave, it faded out to 0% opacity.
			 	On click/active, the "echo" fades in and grows in size. -->
				<!-- &:hover, &:focus {
					.album-art {
						div.overlay {
							opacity: 0.95;
						}
						svg.overlay {
							opacity: 1;
						}
					}
				}
				&:active {
					.album-echo {
						opacity: 1;
						width: calc(100% + 30px);
						height: calc(100% + 30px);
						transition: opacity 300ms ease-out, width 300ms ease-out, height 300ms ease-out;
					}
				} -->
			</div>
			<svg class="overlay" viewBox="0 0 100 100"
				u init-with="p:[op:0]">
				<path d="M50,86 C69.882251,86 86,69.882251 86,50 C86,30.117749 69.882251,14 50,14 C30.117749,14 14,30.117749 14,50 C14,69.882251 30.117749,86 50,86 Z M62.2163044,47.615046 C62.6255301,47.9506063 62.9624,48.2795217 62.9624,48.805565 C62.9624,49.3305008 62.7227954,49.6494492 62.2163044,49.9949765 L44.2957773,63.0862556 C43.9980507,63.2767387 42.8178201,63.3586907 42.8024,62.1338404 L42.8024,35.4761821 C42.8035862,34.343251 43.8818069,34.2535468 44.2957773,34.5248744 L62.2163044,47.615046 Z"></path>
			</svg>
		</div>
		<div class="album-caption">
			<h1 init-with="p:[bg:#020c39, op:0, tro:top center, tr:rotateX(90deg)]"
				init-after="album-tile-init"
				on-init="a:[opacity:0:1:250:easeInOutSine:150:1:f, rotateX:90deg:0deg:250:easeOutQuint:150:1:f]">Midnight Cramming</h1>
			<h2 init-with="p:[bg:#020c39, op:0, tro:top center, tr:rotateX(90deg)]"
				init-after="album-tile-init"
				on-init="a:[opacity:0:0.3:250:easeInOutSine:300:1:f, rotateX:90deg:0deg:250:easeOutQuint:300:1:f]">Intense EDM</h2>
		</div>
	</a>
</div>
