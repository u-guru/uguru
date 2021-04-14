<div class="absolute top-0 left-0 full-xy flex-center perspective-container">
	<div init-with="p:[op:0, tr:translateY(500px)]"
		on-init="s:[bird-enter:public]:delay-1000"
		when-bird-enter="p:[op:1, transform:translateY(500px):translateY(0):1000:easeOutBack] | s:[bird-fly:public]">
		<div class="relative"
			init-with="p:[width:450px, height:450px]"
			when-bird-fly="s:[bird-hover-1:public]"
			when-bird-hover-1="p:[transform:translateY(4px):translateY(-4px):750:linear] | s:[bird-hover-2:public]:delay-750"
			when-bird-hover-2="p:[transform:translateY(-4px):translateY(4px):750:linear] | s:[bird-hover-1:public]:delay-750">
			<svg class="absolute top-0 left-0 full-xy" width="450px" height="450px" viewBox="0 0 450 450"
				init-with="p:[tro:282px 157px]"
				when-bird-fly="s:[bird-back-1:public]"
				when-bird-back-1="p:[transform:rotateY(0deg):rotateY(-80deg):120:easeInOutSine] | s:[bird-back-2:public]:delay-120"
				when-bird-back-2="p:[transform:rotateY(-80deg):rotateY(0deg):120:easeInOutSine] | s:[bird-back-1:public]:delay-120">
			    <g fill="none" fill-rule="evenodd">
			        <path d="M112.170179,68.4826738 C79.9515606,112.624159 119.402749,220.975492 213.375116,237.545356 C239.658969,242.179909 265.948909,194.148106 282.379818,157.228946 C246.024885,60.7544282 135.952894,93.4087371 112.170179,68.4826738 L112.170179,68.4826738 Z" class="wing-back" stroke="#4D4948" fill="url(#wing-back)"></path>
				</g>
			</svg>
			<svg class="absolute top-0 left-0 full-xy" width="450px" height="450px" viewBox="0 0 450 450">
				<defs>
					<linearGradient x1="6.34883319%" y1="6.88526122%" x2="92.6718606%" y2="43.5574782%" id="wing-back">
			            <stop stop-color="#585352" offset="0%"></stop>
			            <stop stop-color="#343130" offset="100%"></stop>
			        </linearGradient>
			        <radialGradient cx="53.6378384%" cy="40.1511027%" fx="53.6378384%" fy="40.1511027%" r="94.4020029%" id="body">
			            <stop stop-color="#CAC3B8" offset="0%"></stop>
			            <stop stop-color="#999081" offset="100%"></stop>
			        </radialGradient>
			        <radialGradient cx="74.2650424%" cy="16.6358368%" fx="74.2650424%" fy="16.6358368%" r="46.5440138%" id="color">
			            <stop stop-color="#F2AD45" offset="0%"></stop>
			            <stop stop-color="#E07421" offset="100%"></stop>
			        </radialGradient>
			        <linearGradient x1="0%" y1="5.92888687%" x2="100%" y2="42.038369%" id="wing-front">
			            <stop stop-color="#85807E" offset="0%"></stop>
			            <stop stop-color="#4D4948" offset="100%"></stop>
			        </linearGradient>
				</defs>
			    <g fill="none" fill-rule="evenodd">
			        <path d="M292,231.945121 C292,231.945121 316.346352,216.572606 329.495117,220.705619 C348.720215,226.748588 340.927246,242.836967 338.958984,246.262259 C341.947596,221.852103 324.904297,225.098197 321.251465,226.694388 C317.598633,228.29058 313.083496,240.801322 321.85498,247.131888 C306.818848,243.434623 315.106445,230.739799 313.972168,229.605521 C309.032893,224.666246 293.707275,236.019833 293.707275,236.019833 L292,231.945121 Z" class="claw-back" stroke="#382A27" fill="#130300"></path>
			        <path d="M295,251.945121 C295,251.945121 319.346352,236.572606 332.495117,240.705619 C351.720215,246.748588 343.927246,262.836967 341.958984,266.262259 C344.947596,241.852103 327.904297,245.098197 324.251465,246.694388 C320.598633,248.29058 316.083496,260.801322 324.85498,267.131888 C309.818848,263.434623 318.106445,250.739799 316.972168,249.605521 C312.032893,244.666246 296.707275,256.019833 296.707275,256.019833 L295,251.945121 Z" class="claw-front" stroke="#382A27" fill="#130300"></path>
			        <path d="M373.679687,151.207031 C373.679687,151.207031 379.808594,124.730469 331.214844,117.121094 C282.621094,109.511719 244.492187,167.705078 235.722656,205.199219 C228.803747,234.781025 227.728516,287.4375 255.087891,331.466797 C282.447266,375.496094 300.707031,383.757812 305.744141,379.542969 C306.9806,378.508351 282.509952,351.530078 276.166016,322.181641 C271.049246,298.510347 276.645125,273.230341 278.311399,272.548958 C301.138665,263.214294 310.048645,235.450536 318.621094,210.979492 C323.202148,197.902344 323.885742,189.638672 329.335937,181.311523 C334.786133,172.984375 352.238281,160.648438 366.543457,161.67627 C371.906829,162.06163 373.679687,151.207031 373.679687,151.207031 Z" class="body" stroke="#544337" fill="url(#body)"></path>
			        <path d="M373.679687,151.207031 C373.679687,151.207031 367.665469,138.511143 354.244141,134.943359 C336.346154,130.185549 308.464418,136.222994 294.920002,157.703466 C271.218911,195.291698 302.23381,207.885436 318.621094,210.979492 C323.202148,197.902344 323.885742,189.638672 329.335938,181.311523 C334.786133,172.984375 352.238281,160.648437 366.543457,161.67627 C371.906829,162.06163 373.679687,151.207031 373.679687,151.207031 Z" class="color" stroke="#A85513" fill="url(#color)"></path>
				</g>
			</svg>
			<svg class="absolute top-0 left-0 full-xy" width="450px" height="450px" viewBox="0 0 450 450"
				init-with="p:[tro:269px 152px]"
				when-bird-fly="s:[bird-front-1:public]"
				when-bird-front-1="p:[transform:rotateY(0deg):rotateY(80deg):120:easeInOutSine] | s:[bird-front-2:public]:delay-120"
				when-bird-front-2="p:[transform:rotateY(80deg):rotateY(0deg):120:easeInOutSine] | s:[bird-front-1:public]:delay-120">
			    <g fill="none" fill-rule="evenodd">
			        <path d="M268.617187,151.628906 C211.023438,54.4296875 98.4453125,110.617188 68.0351563,88.2421875 C41.6640625,142.011719 104.859469,251.439453 209.429688,251.439453 C238.677734,251.439453 257.910156,194.599609 268.617187,151.628906 Z" class="wing-front" stroke="#373231" fill="url(#wing-front)"></path>
				</g>
			</svg>
			<svg class="absolute top-0 left-0 full-xy" width="450px" height="450px" viewBox="0 0 450 450">
			    <g fill="none" fill-rule="evenodd">
			        <polygon class="beak-bottom" stroke="#5E4A45" fill="#382A27" points="368 155 368.172852 161.47168 386.552734 170.319336"></polygon>
			        <path d="M368,154.346191 L387.305664,170.874512 C387.305664,170.874512 386.072266,166.173828 383.250488,162.759766 C379.087816,157.723357 373.677246,153 373.677246,153 L368,154.346191 Z" class="beak-top" stroke="#5E4A45" fill="#382A27"></path>
			        <circle class="eye" stroke="#2E2B2B" fill="#000000" cx="350.5" cy="143.5" r="5.5"></circle>
			        <circle class="shine" stroke="#F0F0F0" fill="#FFFFFF" cx="349.5" cy="142.5" r="1.5"></circle>
			    </g>
			</svg>
		</div>
	</div>
</div>
