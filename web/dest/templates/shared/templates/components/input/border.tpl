<div class="full-xy flex-center p15xy" types='light, dark, search-light, search-dark, large-light, large-dark, search-large-light, search-large-dark' default-type="light" reference="https://codepen.io/teamuguru/pen/0dd0f5b893950ead5db6bc302daf956f?editors=1100, http://codepen.io/teamuguru/pen/553314ac263ad7c0cd070bdf53969aa1?editors=1100, http://codepen.io/teamuguru/pen/e73453ab175045bd429577c423c2cb47?editors=1100">
	<div class="p15xy radius-2 bg-slate" ng-if='activeType === "light"'>
		<fieldset>
			<input disabled class="input-border light state-blur" type="email" required placeholder="" onclick="this.select()"/>
			<label>
				<svg class="input-icon email-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"></path>
						<path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"></path>
						<path d="M47,61 L81.5,24.5" class="success-2"></path>
						<path d="M32.5,47.5 L47,61" class="success-1"></path>
						<path d="M36,36 L64,64" class="error-1"></path>
						<path d="M64,36 L36,64" class="error-2"></path>
					</g>
				</svg>
				<span class="label">:blur</span>
				<span class="input">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<g fill="none" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="50" cy="50" r="36"></circle>
							<path d="M50,50 L50,31.5643475 L50,50 L31.5643475,50 L50,50 Z M50,50 L50,68.4356525 L50,50 L68.4356525,50 L50,50 Z"></path>
						</g>
					</svg>
				</a>
			</label>
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-white" ng-if='activeType === "dark"'>
		<fieldset>
			<input class="input-border dark" type="text" placeholder="This is an outline input" />
			<label></label>
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-slate" ng-if='activeType === "search-light"'>
		<fieldset class="with-icon">
			<input class="input-border light" type="text" placeholder="A small light search input" />
			<label></label>
			<span class="input-icon">
				<svg viewBox="0 0 100 100">
					<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
				</svg>
			</span>
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-white" ng-if='activeType === "search-dark"'>
		<fieldset class="with-icon">
			<input class="input-border dark" type="text" placeholder="A small dark search input" />
			<label></label>
			<span class="input-icon">
				<svg viewBox="0 0 100 100">
					<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
				</svg>
			</span>
		</fieldset>
	</div>

	<fieldset class="large full-x" ng-if='activeType === "large-light"'>
		<input class="input-border light" type="text" placeholder="A large outline input"/>
		<label></label>
	</fieldset>

	<div ng-if='activeType === "large-dark"'>
		<div class="radius-2 bg-crimson txt-white"><h1 class="p15x-p10y txt-48 semibold line-height-1-2">missing</h1></div>
	</div>

	<fieldset class="large with-icon full-x" ng-if='activeType === "search-large-light"'>
		<input class="input-border light" type="search" placeholder="A large search input"/>
		<label></label>
		<span class="input-icon">
			<svg viewBox="0 0 100 100">
				<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
			</svg>
		</span>
	</fieldset>

	<div ng-if='activeType === "search-large-dark"'>
		<div class="radius-2 bg-crimson txt-white"><h1 class="p15x-p10y txt-48 semibold line-height-1-2">missing</h1></div>
	</div>
</div>
