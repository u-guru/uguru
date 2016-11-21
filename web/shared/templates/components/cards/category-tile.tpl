<div class="perspective-container full-xy flex-center-wrap p15xy" types='link-no-photo, photo, photo-price, photo-price-moxie, photo-price-crimson, link-color, link-square, check-square'>
	<!-- needs color directives -->
	<!-- errors with checkbox -->
	<a class="category-tile bg-household no-photo" ng-show='activeType === "link-no-photo"'
		u init-with="p:[op:0, tro:center center, bg:rgba(120#114#227#1)]"
		on-init="s:[link-no-photo-init:children:100, link-no-photo-card:self]"
		when-link-no-photo-card="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-link-no-photo-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:650:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-link-no-photo-init="a:[opacity:0:1:1000:easeOutSine:0:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-link-no-photo-init="a:[scaleX:0:1:450:easeOutSine:200:1:f]"></div>
		</div>
	</a>

	<div ng-show='activeType === "photo"' class="category-tile bg-household" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
		u init-with="p:[opacity:0, tro:center center]"
		on-init="s:[category-photo-init:depth(>1):100, category-photo-card:self]"
		when-category-photo-card="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-photo-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-photo-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-photo-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-photo-init="a:[scaleX:0:1:450:easeOutSine:450:1:f]"></div>
		</div>
	</div>

	<div  ng-show='activeType === "photo-price"' class="category-tile bg-household with-price" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
		u init-with="p:[opacity:0]"
		on-init="s:[category-photo-price-init:depth(>1)] | a:[bounceIn-subtle:1000:linear:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-photo-price-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-photo-price-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-photo-price-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-photo-price-init="a:[scaleX:0:1:450:easeOutSine:750:1:f]"></div>
		</div>
		<div class="category-tile-price"
			u init-with="p:[opacity:0, transform-origin:center center]"
			when-category-photo-price-init="a:[scaleInX-subtle:1000:linear:650:1:f]"><div>$25/hr AVG</div></div>
	</div>

	<div ng-show='activeType === "photo-price-moxie"'  class="category-tile bg-household with-price price-moxie" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
		u init-with="p:[opacity:0]"
		on-init="s:[category-price-moxie-init:depth(>1)] | a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-price-moxie-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-price-moxie-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-price-moxie-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-price-moxie-init="a:[scaleX:0:1:450:easeOutSine:750:1:f]"></div>
		</div>
		<div class="category-tile-price"
			u init-with="p:[transform:scaleX(0), transform-origin:center center]"
			when-category-price-moxie-init="a:[scaleInX-subtle:1000:linear:650:1:f]"><div>$25/hr AVG</div></div>
	</div>

	<div ng-show='activeType === "photo-price-crimson"' class="category-tile bg-household with-price price-crimson" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
		u init-with="p:[opacity:0]"
		on-init="s:[category-price-crimson-init:depth(>1) | a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-price-crimson-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-price-crimson-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-price-crimson-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-price-crimson-init="a:[scaleX:0:1:450:easeOutSine:750:1:f]"></div>
		</div>
		<div class="category-tile-price"
			u init-with="p:[opacity:0, transform-origin:center center]"
			when-category-price-crimson-init="a:[scaleInX-subtle:1000:linear:650:1:f]"><div>$25/hr AVG</div></div>
	</div>

	<a ng-show='activeType === "link-color"' class="category-tile bg-household no-photo"
		u init-with="p:[opacity:0]"
		on-init="s:[category-link-color-init:depth(>1) | a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-link-color-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-link-color-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-link-color-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-link-color-init="a:[scaleX:0:1:450:easeOutSine:200:1:f]"></div>
		</div>
	</a>

	<a ng-show='activeType === "link-square"' class="category-tile bg-household" style="background-image: url('http://s.hswstatic.com/gif/quiz-cleaning-orig.jpg');"
		u init-with="p:[opacity:0]"
		on-init="s:[category-link-square-init:depth(>1) | a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]"
		on-mouseenter="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="150px" height="150px" viewBox="0 0 150 150">
			<rect x="0" y="0" width="150" height="150" fill="none"></rect>
		</svg>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-link-square-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-link-square-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-link-square-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-link-square-init="a:[scaleX:0:1:450:easeOutSine:200:1:f]"></div>
		</div>
		<span class="category-tile-count">6</span>
	</a>

	<div ng-show='activeType === "check-square"' class="category-tile bg-household no-photo"
		u init-with="p:[opacity:0]"
		on-init="s:[category-check-square-init:depth(>1)] | a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-exit="a:[bounceOut-subtle:1000:linear:0:1:f]"
		on-mouseenter="s:[cat-tile-enter:children] | a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseover="s:[cat-tile-enter:children] | a:[translateZ:0px:20px:600:(.6,0,.1,2):0:1:f]"
		on-mouseleave="s:[cat-tile-leave:children] | a:[translateZ:20px:0px:150:easeInSine:0:1:f]"
		on-mousedown="s:[cat-tile-down:children] | a:[translateZ:20px:-20px:150:easeInSine:0:1:f]"
		on-mouseup="s:[cat-tile-up:children] | a:[translateZ:-20px:0px:easeInSine:0:1:f]">
		<svg width="150px" height="150px" viewBox="0 0 150 150">
			<rect x="0" y="0" width="150" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" checked/>
		<div class="category-tile-inside">
			<div class="category-tile-icon"
				u init-with="p:[transform:scale(0), transform-origin:center center]"
				when-category-check-square-init="a:[icon-enter:1000:linear:250:1:f]">
				<svg viewBox="0 0 100 100">
					<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"
						u init-with="p:[stroke-dashoffset:286, stroke-dasharray:286]"
						when-category-check-square-init="a:[stroke-dashoffset:286:0:1000:easeOutSine:750:1:f]"></path>
				</svg>
			</div>
			<h1 u init-with="p:[opacity:0]"
				when-category-check-square-init="a:[opacity:0:1:1000:easeOutSine:200:1:f]">Household</h1>
			<div class="category-tile-border"
				u init-with="p:[transform-origin:center center, transform:scaleX(0)]"
				when-category-check-square-init="a:[scaleX:0:1:450:easeOutSine:200:1:f]"></div>
		</div>
		<span class="category-tile-count"
			u init-with="p:[op:0]"
			when-cat-tile-enter="a:[opacity:0:1:150:easeOutSine:0:1:f]"
			when-cat-tile-leave="a:[opacity:1:0:150:easeInSine:0:1:f]">
			<svg viewBox="0 0 100 100">
				<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
			</svg>
		</span>
	</div>

</div>
