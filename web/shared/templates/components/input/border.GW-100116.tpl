<div class="full-xy flex-center-wrap p15xy" types='light, dark, large-light, large-dark, light-search, dark-search, large-light-search, large-dark-search' default-type="light" reference="https://codepen.io/teamuguru/pen/0dd0f5b893950ead5db6bc302daf956f?editors=1100, http://codepen.io/teamuguru/pen/553314ac263ad7c0cd070bdf53969aa1?editors=1100, http://codepen.io/teamuguru/pen/e73453ab175045bd429577c423c2cb47?editors=1100">

	<!-- <path d="M33,48.1143839 C33,46.6788675 34.1418152,45.3238313 35.5634781,45.0856204 L48.722237,42.880766 C49.427926,42.7625222 50.5656204,42.7614409 51.277763,42.880766 L64.4365219,45.0856204 C65.8522917,45.3228439 67,46.6833093 67,48.1143839 L67,68.5522827 C67,69.9877992 65.8581848,71.3428353 64.4365219,71.5810462 L51.277763,73.7859007 C50.572074,73.9041445 49.4343796,73.9052258 48.722237,73.7859007 L35.5634781,71.5810462 C34.1477083,71.3438228 33,69.9833573 33,68.5522827 L33,48.1143839 Z" id="lock-bottom" stroke-linecap="round" stroke-linejoin="round"></path>
	<path d="M38.8846154,43.9722222 L38.8846154,35.4861111 C38.8846154,30.7993614 42.6935836,27 47.3842731,27 L52.6157269,27 C57.3099583,27 61.1153846,30.7983309 61.1153846,35.4861111 L61.1153846,43.9722222" id="lock-top" stroke-linecap="round" stroke-linejoin="round"></path>

	<path d="M30,68 C30.8366489,60.7836913 35.1091362,54.7119207 41.3494218,51.850947 C38.8878147,49.5425601 37.3394564,46.2745734 37.3394564,42.6441374 C37.3394564,35.672185 43.0190012,30 50,30 C56.9809988,30 62.6605436,35.672185 62.6605436,42.6441374 C62.6605436,46.2745734 61.1121853,49.5425601 58.6505782,51.850947 C64.8908638,54.7119207 69.1633511,60.7836913 70,68" stroke-linecap="round" stroke-linejoin="round"></path>
	<path d="M50,90 C72.09139,90 90,72.09139 90,50 C90,27.90861 72.09139,10 50,10 C27.90861,10 10,27.90861 10,50 C10,72.09139 27.90861,90 50,90 L50,90 Z" id="circle"></path> -->

	<div class="p30xy radius-2 bg-slate full-x" style="max-width:460px">
		<!--  ng-if='activeType === "light"' -->
		<div class="input-border"
			init-default
			on-init="s:[input-border-enter:public]"
			when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
			<input class="input-border light" type="email" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon email-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round"
						init-default
						when-input-valid="s:[input-valid-stroke:public]"
						when-input-invalid="s:[input-invalid-stroke:public]"
						when-input-valid-stroke="p:[s:#43cb9d]:delay-125"
						when-input-invalid-stroke="p:[s:#d3242c]:delay-125">
						<path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"
							u
							init-with="p:[stroke-dashoffset:365.6]"
							when-input-border-enter="a:[stroke-dashoffset:365.6:0:150:easeOutExpo:2500:1:f]"></path>
						<path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M47,61 L81.5,24.5" class="success-2"
							init-with="p:[op:0, sdo:50.3]"
							when-input-valid="p:[op:1, sdo:4]:delay-375"
							when-input-invalid="p:[op:0:delay-250, sdo:50.3]"></path>
						<path d="M32.5,47.5 L47,61" class="success-1"
							init-with="p:[op:0, sdo:19.9]"
							when-input-valid="p:[op:1, sdo:0]:delay-250"
							when-input-invalid="p:[op:0:delay-125, sdo:19.8]:delay-250"></path>
						<path d="M36,36 L64,64" class="error-1"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-250"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]"></path>
						<path d="M64,36 L36,64" class="error-2"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-375"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]:delay-250"></path>
					</g>
				</svg>
				<span class="label" style="transform-origin:bottom center" u
					init-with="p:[transform:rotateX(90deg)]"
					on-init="a:[rotateX:90deg:0deg:1000:easeOutExpo:0:1:f]">Border light</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline" u
					init-with="p:[transform:translateY(100px)]"
					on-init="a:[translateY:100px:0px:2500:easeOutExpo:250:1:f]"
					when-input-border-enter="a:[translateY:100px:0px:1000:easeOutExpo:0:1:f]">
					<div u init-with="p:[scaleX:0]"
						when-input-border-enter="a:[scaleX:0:1:250:easeOutExpo:0:1:f]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"
							init-default
							when-input-valid="p:[s:#43cb9d, f:#43cb9d]:delay-500"
							when-input-invalid="p:[s:#d3242c, f:#d3242c]:delay-500"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-white full-x" style="max-width:460px">
		<!--  ng-if='activeType === "dark"' -->
		<div class="input-border"
			init-default
			on-init="s:[input-border-enter:public]"
			when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
			<input class="input-border dark" type="email" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label u init-with="p:[opacity:0]"
				on-init="a:[opacity:0.0:1.0:1000:linear:0:1:f]">
				<svg class="input-icon email-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round"
						init-default
						when-input-valid="s:[input-valid-stroke:public]"
						when-input-invalid="s:[input-invalid-stroke:public]"
						when-input-valid-stroke="p:[s:#43cb9d]:delay-125"
						when-input-invalid-stroke="p:[s:#d3242c]:delay-125">
						<path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M47,61 L81.5,24.5" class="success-2"
							init-with="p:[op:0, sdo:50.3]"
							when-input-valid="p:[op:1, sdo:4]:delay-375"
							when-input-invalid="p:[op:0:delay-250, sdo:50.3]"></path>
						<path d="M32.5,47.5 L47,61" class="success-1"
							init-with="p:[op:0, sdo:19.9]"
							when-input-valid="p:[op:1, sdo:0]:delay-250"
							when-input-invalid="p:[op:0:delay-125, sdo:19.8]:delay-250"></path>
						<path d="M36,36 L64,64" class="error-1"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-250"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]"></path>
						<path d="M64,36 L36,64" class="error-2"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-375"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]:delay-250"></path>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Border dark</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"
							init-default
							when-input-valid="p:[s:#43cb9d, f:#43cb9d]:delay-500"
							when-input-invalid="p:[s:#d3242c, f:#d3242c]:delay-500"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-slate full-x" style="max-width:860px" ng-if="false">
		<!-- ng-if='activeType === "large-light"' -->
		<div class="input-border large"
			init-default
			on-init="s:[input-border-enter:public]"
			when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
			<input class="input-border light" type="email" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon email-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round"
						init-default
						when-input-valid="s:[input-valid-stroke:public]"
						when-input-invalid="s:[input-invalid-stroke:public]"
						when-input-valid-stroke="p:[s:#43cb9d]:delay-125"
						when-input-invalid-stroke="p:[s:#d3242c]:delay-125">
						<path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M47,61 L81.5,24.5" class="success-2"
							init-with="p:[op:0, sdo:50.3]"
							when-input-valid="p:[op:1, sdo:4]:delay-375"
							when-input-invalid="p:[op:0:delay-250, sdo:50.3]"></path>
						<path d="M32.5,47.5 L47,61" class="success-1"
							init-with="p:[op:0, sdo:19.9]"
							when-input-valid="p:[op:1, sdo:0]:delay-250"
							when-input-invalid="p:[op:0:delay-125, sdo:19.8]:delay-250"></path>
						<path d="M36,36 L64,64" class="error-1"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-250"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]"></path>
						<path d="M64,36 L36,64" class="error-2"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-375"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]:delay-250"></path>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Large border light</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"
							init-default
							when-input-valid="p:[s:#43cb9d, f:#43cb9d]:delay-500"
							when-input-invalid="p:[s:#d3242c, f:#d3242c]:delay-500"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-white full-x" style="max-width:860px" ng-if="false">
		<!-- ng-if='activeType === "large-dark"' -->
		<div class="input-border large"
			init-default
			on-init="s:[input-border-enter:public]"
			when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
			<input class="input-border dark" type="email" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon email-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round"
						init-default
						when-input-valid="s:[input-valid-stroke:public]"
						when-input-invalid="s:[input-invalid-stroke:public]"
						when-input-valid-stroke="p:[s:#43cb9d]:delay-125"
						when-input-invalid-stroke="p:[s:#d3242c]:delay-125">
						<path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"
							init-with="p:[sdo:365.6]"
							when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
							when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
							when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
						<path d="M47,61 L81.5,24.5" class="success-2"
							init-with="p:[op:0, sdo:50.3]"
							when-input-valid="p:[op:1, sdo:4]:delay-375"
							when-input-invalid="p:[op:0:delay-250, sdo:50.3]"></path>
						<path d="M32.5,47.5 L47,61" class="success-1"
							init-with="p:[op:0, sdo:19.9]"
							when-input-valid="p:[op:1, sdo:0]:delay-250"
							when-input-invalid="p:[op:0:delay-125, sdo:19.8]:delay-250"></path>
						<path d="M36,36 L64,64" class="error-1"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-250"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]"></path>
						<path d="M64,36 L36,64" class="error-2"
							init-with="p:[op:0, sdo:39.6]"
							when-input-invalid="p:[op:1, sdo:0]:delay-375"
							when-input-valid="p:[op:0:delay-175, sdo:39.6]:delay-250"></path>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Large border light</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
					<div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d]:delay-500"
							when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
						<div init-default
							when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
							when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
					</div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"
							init-default
							when-input-valid="p:[s:#43cb9d, f:#43cb9d]:delay-500"
							when-input-invalid="p:[s:#d3242c, f:#d3242c]:delay-500"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"
							init-default
							when-input-valid="p:[s:white]:delay-500"
							when-input-invalid="p:[s:white]:delay-500"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-slate full-x" style="max-width:460px" ng-if="false">
		<!--  ng-if='activeType === "light-search"' -->
		<div class="input-border"
			init-default
			on-init="s:[input-border-enter:public]">
			<input class="input-border light" type="search" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M62.994485,62.994485 L85.6624699,85.6624699"
							init-with="p:[sda:32.1, sdo:32.1]"
							when-input-border-enter="p:[stroke-dashoffset:32.1:0:75:easeOutExpo]:delay-150"></path>
				        <circle cx="42.5" cy="42.5" r="28.5"
							init-with="p:[sda:179.1, sdo:179.1]"
							when-input-border-enter="p:[stroke-dashoffset:179.1:0:250:easeInExpo]:delay-100"></circle>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Border light search</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-white full-x" style="max-width:460px" ng-if="false">
		<!--  ng-if='activeType === "dark-search"' -->
		<div class="input-border"
			init-default
			on-init="s:[input-border-enter:public]"
			when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
			<input class="input-border dark" type="search" required placeholder=""
				init-default
				on-valid="s:[input-valid:public]"
				on-invalid="s:[input-invalid:public]"
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M62.994485,62.994485 L85.6624699,85.6624699"
							init-with="p:[sda:32.1, sdo:32.1]"
							when-input-border-enter="p:[stroke-dashoffset:32.1:0:75:easeOutExpo]:delay-150"></path>
				        <circle cx="42.5" cy="42.5" r="28.5"
							init-with="p:[sda:179.1, sdo:179.1]"
							when-input-border-enter="p:[stroke-dashoffset:179.1:0:250:easeInExpo]:delay-100"></circle>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Border dark search</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-slate full-x" style="max-width:860px" ng-if="false">
		<!-- ng-if='activeType === "large-light-search"' -->
		<div class="input-border large"
			init-default
			on-init="s:[input-border-enter:public]">
			<input class="input-border light" type="search" required placeholder=""
				init-default
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M62.994485,62.994485 L85.6624699,85.6624699"
							init-with="p:[sda:32.1, sdo:32.1]"
							when-input-border-enter="p:[stroke-dashoffset:32.1:0:75:easeOutExpo]:delay-150"></path>
				        <circle cx="42.5" cy="42.5" r="28.5"
							init-with="p:[sda:179.1, sdo:179.1]"
							when-input-border-enter="p:[stroke-dashoffset:179.1:0:250:easeInExpo]:delay-100"></circle>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Border light large search</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<div class="p30xy radius-2 bg-white full-x" style="max-width:860px" ng-if="false">
		<!-- ng-if='activeType === "large-dark-search"' -->
		<div class="input-border large"
			init-default
			on-init="s:[input-border-enter:public]">
			<input class="input-border dark" type="search" required placeholder=""
				init-default
				on-focus="s:[input-focus:public]"
				on-blur="s:[input-blur:public]"
				on-mouse-enter="s:[input-hover:public]"
				on-mouse-leave="s:[input-leave:public]"/>
			<label>
				<svg class="input-icon" viewBox="0 0 100 100">
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M62.994485,62.994485 L85.6624699,85.6624699"
							init-with="p:[sda:32.1, sdo:32.1]"
							when-input-border-enter="p:[stroke-dashoffset:32.1:0:75:easeOutExpo]:delay-150"></path>
				        <circle cx="42.5" cy="42.5" r="28.5"
							init-with="p:[sda:179.1, sdo:179.1]"
							when-input-border-enter="p:[stroke-dashoffset:179.1:0:250:easeInExpo]:delay-100"></circle>
					</g>
				</svg>
				<span class="label"
					init-with="p:[op:0, tr:rotateX(90deg), tro:bottom center]"
					when-input-border-enter="p:[opacity:0:1:250:easeOutExpo, transform:rotateX(90deg):rotateX(0deg):250:easeOutExpo]:delay-200">Border dark large search</span>
				<span class="input"
					init-with="p-op">Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet|</span>
				<div class="underline">
					<div init-with="p:[tr:scaleX(0)]"
						when-input-border-enter="p:[transform:scaleX(0):scaleX(1):250:easeOutExpo]"></div>
					<div></div>
				</div>
				<div class="borders">
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
					<div><div></div><div></div></div>
				</div>
				<a>
					<svg viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="36"></circle>
						<path d="M62.7279221,37.2720779 L37.2720779,62.7279221"></path>
						<path d="M37.2720779,37.2720779 L62.7279221,62.7279221"></path>
					</svg>
				</a>
			</label>
		</div>
	</div>

	<ul class="p15-grid flex-center absolute bottom-0 left-0">
		<li>
			<button class="bg-moxie normal radius-2 p15x height-48 txt-18"
				init-default
				on-click="s:[input-valid:public]">Valid</button>
		</li>
		<li>
			<button class="bg-crimson normal radius-2 p15x height-48 txt-18"
				init-default
				on-click="s:[input-invalid:public]">Invalid</button>
		</li>
	</ul>
</div>
