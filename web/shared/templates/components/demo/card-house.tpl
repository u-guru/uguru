<!--
<inspector-gadget show-log="true" ball-color="smoke" reverse-speed="10" start-at="t:15%" speed="1x" class="bottom-0 bg-azure" auto-play="true" step-size="25" play-infinite="false" ng-if='root.inspector'>
</inspector-gadget> -->

<div class="full-xy flex-center-wrap perspective-container">
	<div class="flex-center full-x overflow-hidden" style="height:100px"
		init-default
		when-house-build="s:[house-return:public]:delay-2000">
		<div class="relative" style="width:500px; height:200px;">
			<svg class="absolute top-0 left-0 full-xy" viewBox="0 0 500 200">
			    <g class="header-split" fill="#FFFFFF" stroke="none" stroke-width="1" fill-rule="evenodd">
			        <polygon class="path" points="47.9694266 133.996932 56.1181514 130.621923 49.8732372 115.54401 62.3457752 110.378181 68.5906894 125.456093 76.7948477 122.058125 61.8254211 85.9154819 53.6212628 89.3134499 59.3840328 103.227259 46.9114949 108.393089 41.1487248 94.4792796 33 97.8542884"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]"></polygon>
			        <path d="M99.8765909,117.474692 C107.059668,115.317518 112.086112,107.856522 109.238643,98.3748595 C106.391173,88.8931973 98.0858255,85.4359157 90.9027481,87.5930894 C83.6622061,89.7675206 78.6357622,97.2285167 81.4832316,106.710179 C84.3307009,116.191841 92.6360488,119.649123 99.8765909,117.474692 L99.8765909,117.474692 L99.8765909,117.474692 Z M97.8229615,110.636402 C94.3176197,111.689103 91.6445247,109.04627 90.1603891,104.104313 C88.6762536,99.1623557 89.4510357,95.4840799 92.9563775,94.4313791 C96.4042547,93.3959357 99.1348143,96.0215107 100.61895,100.963468 C102.103085,105.905425 101.270839,109.600958 97.8229615,110.636402 L97.8229615,110.636402 L97.8229615,110.636402 Z" class="o"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-100"></path>
			        <path d="M130.537511,110.619372 C134.520534,109.735104 136.81181,107.321132 138.621715,103.846274 L138.797436,103.807262 L140.339021,107.705815 L147.367885,106.145342 L140.91793,77.0927058 L132.307572,79.0042852 L136.572864,98.2165125 C135.381376,100.878007 134.300814,102.101276 132.133581,102.582422 C129.614905,103.141591 128.202911,102.041467 127.279631,97.882723 L123.521492,80.9548764 L114.911134,82.8664558 L118.916348,100.907206 C120.528837,108.170365 124.211534,112.023797 130.537511,110.619372 L130.537511,110.619372 Z" class="u"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-200"></path>
			        <path d="M165.931594,104.925309 C173.821884,103.732108 177.405993,98.9423516 176.598564,93.6030578 C175.782163,88.2044385 171.256053,86.7650185 167.312204,85.9657327 C164.116147,85.2960917 161.279518,84.996872 160.992432,83.0984564 C160.768146,81.6153192 161.710405,80.6232766 163.964773,80.282362 C166.041165,79.9683617 168.201775,80.6125407 170.570749,81.8320317 L173.696745,76.0192741 C170.858663,74.5066303 167.258322,73.1699406 162.749585,73.8517697 C155.927154,74.8834849 152.042943,79.2938482 152.868315,84.751793 C153.603972,89.6164828 158.183911,91.4118558 161.949783,92.2380559 C165.154812,92.9670224 168.255657,93.4083329 168.551715,95.3660739 C168.784972,96.9085365 167.801331,98.0282016 165.19101,98.4229448 C162.699339,98.7997451 160.105508,98.0997152 157.130833,96.4863633 L154.040723,102.536423 C157.374826,104.520196 162.075437,105.508452 165.931594,104.925309 L165.931594,104.925309 Z" class="s"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-300"></path>
			        <path d="M198.873093,101.571927 C202.395714,101.221582 206.211574,99.5758565 209.04872,97.1833255 L205.594666,92.1605059 C203.575908,93.6877955 201.611241,94.5464491 199.40214,94.766157 C195.461581,95.1580685 192.280353,93.4846916 191.076643,89.2630946 L208.809158,87.499493 C208.917018,86.7652136 208.935807,85.1353526 208.781418,83.5830111 C207.979781,75.5227768 203.18878,69.7887802 194.770313,70.6260455 C187.665366,71.3326738 181.387108,77.9263883 182.343134,87.5389641 C183.316975,97.3306562 190.394921,102.415131 198.873093,101.571927 L198.873093,101.571927 Z M190.440946,83.477605 C190.663903,79.6567818 192.868041,77.568391 195.614492,77.2952406 C199.137113,76.9448955 200.801627,79.1308944 201.12822,82.4146936 L190.440946,83.477605 L190.440946,83.477605 Z" class="e"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-400"></path>
			        <path d="M245.344227,100.189564 C252.842836,100.045115 259.691764,94.2121246 259.501092,84.3139609 C259.31042,74.4157972 252.241931,68.8509025 244.743322,68.9953509 C237.184724,69.1409548 230.335796,74.9739455 230.526468,84.8721092 C230.717139,94.7702729 237.785629,100.335168 245.344227,100.189564 L245.344227,100.189564 Z M245.206712,93.050888 C241.547391,93.1213788 239.684168,89.8566585 239.584787,84.6976156 C239.485407,79.5385727 241.221516,76.2045173 244.880837,76.1340265 C248.480169,76.0646913 250.403381,79.328256 250.502762,84.4872989 C250.602142,89.6463418 248.806044,92.9815529 245.206712,93.050888 L245.206712,93.050888 Z" class="o"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-500"></path>
			        <path d="M269.043725,100.337117 L277.85713,100.678137 L278.740997,77.8352305 L284.077004,78.0416981 L284.343788,71.1468576 L279.007781,70.9403899 L279.077377,69.1417359 C279.19569,66.084024 280.501145,64.9336384 282.65953,65.0171534 C283.618812,65.0542711 284.688725,65.3358492 285.694043,65.7350176 L287.563377,59.3224993 C286.262923,58.7918212 284.127737,58.1087549 281.669576,58.0136406 C273.635588,57.7027792 270.498278,62.7452476 270.254693,69.0405368 L270.192056,70.6593255 L266.223418,70.8059903 L265.970553,77.3411001 L269.927592,77.4942109 L269.043725,100.337117 Z" class="f"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-600"></path>
			        <path d="M321.719902,105.584644 C327.152122,106.134718 332.079573,104.52294 335.031805,102.168386 L336.845237,84.2599673 L322.637891,82.8213118 L321.912519,89.9846794 L328.359549,90.6375147 L327.682535,97.3233244 C326.648837,98.0026395 324.994766,98.2572938 323.383009,98.094085 C316.100252,97.3566229 312.930365,92.331703 313.740364,84.3326092 C314.532229,76.5125996 319.248092,72.2258947 325.27726,72.8364166 C328.620165,73.1749238 330.510756,74.7534248 332.305384,76.6840494 L337.470086,71.5381922 C335.169183,68.6516989 331.357777,65.7931706 325.746472,65.2249621 C315.359589,64.1731719 306.001907,70.8242608 304.696236,83.7183224 C303.372432,96.7914682 311.034545,104.50263 321.719902,105.584644 L321.719902,105.584644 Z" class="G"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-700"></path>
			        <path d="M352.421062,111.082376 C356.439739,111.787103 359.479528,110.431786 362.479833,107.91215 L362.657127,107.94324 L362.592117,112.135015 L369.683899,113.378651 L374.82426,84.0659523 L366.136827,82.5424985 L362.737556,101.926702 C360.619527,103.930986 359.153549,104.648557 356.966916,104.265103 C354.425694,103.819467 353.541192,102.2633 354.27701,98.0673286 L357.2721,80.9879539 L348.584667,79.4645001 L345.392668,97.6667403 C344.107578,104.994915 346.038459,109.963104 352.421062,111.082376 L352.421062,111.082376 Z" class="u"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-800"></path>
			        <path d="M378.984919,116.5596 L387.543572,118.690762 L391.71891,101.922788 C394.204031,98.3988449 397.230194,97.668408 399.384413,98.2048229 C400.607078,98.5092746 401.436917,98.9014065 402.412427,99.4534757 L405.650966,92.4072097 C404.922842,91.8549091 403.991057,91.3755597 402.360837,90.9696241 C399.391508,90.2302414 395.783587,91.3104738 392.716244,94.6894395 L392.483355,94.6314487 L393.162434,89.4211462 L386.175778,87.6814222 L378.984919,116.5596 Z" class="r"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-900"></path>
			        <path d="M412.195664,127.021806 C416.094554,128.22391 419.280057,127.259662 422.572095,125.135307 L422.744105,125.188341 L422.155026,129.339026 L429.035421,131.460386 L437.803708,103.021421 L429.375224,100.422755 L423.576841,119.229167 C421.224637,120.952634 419.680383,121.481104 417.558928,120.827018 C415.093453,120.066864 414.410651,118.41224 415.665789,114.341339 L420.774731,97.7710552 L412.346247,95.1723894 L406.901424,112.832069 C404.709352,119.941811 406.003309,125.112582 412.195664,127.021806 L412.195664,127.021806 Z" class="u"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-1000"></path>
			        <path d="M445.589309,140.027462 C452.985768,143.022925 458.510813,140.729133 460.537817,135.72401 C462.587344,130.663275 459.427138,127.117757 456.441564,124.419767 C454.033251,122.214494 451.745345,120.51112 452.466057,118.731521 C453.029114,117.341209 454.345451,116.968035 456.458725,117.823881 C458.405161,118.612161 459.935629,120.267718 461.352099,122.524444 L467.004482,119.117016 C465.333858,116.368959 462.91775,113.383725 458.691202,111.672033 C452.295768,109.081971 446.705929,110.896387 444.63388,116.012735 C442.787054,120.572957 445.812126,124.45215 448.630863,127.082573 C451.016653,129.343459 453.459443,131.303759 452.716208,133.138971 C452.130629,134.584895 450.713636,135.046772 448.266687,134.055792 C445.930963,133.109856 444.056252,131.185419 442.319448,128.281092 L436.576976,131.91097 C438.434186,135.317195 441.974498,138.563515 445.589309,140.027462 L445.589309,140.027462 Z" class="s"
						init-with="p:[tro:center bottom, tr:scale(0) rotate(-90deg)]"
						when-header-build="p:[transform:scale(0) rotate(-90deg):scale(1) rotate(0deg):600:easeOutSine]:delay-1100"></path>
			    </g>
			</svg>
		</div>
	</div>
	<!-- ex: 1 inspect-trigger="when-house-return|2000" -->
	<ul class="card-house p15-grid flex-wrap-center"
		init-with="p:[tro:center center, max-width:777px]"
		on-init="s:[house-stack:public]"
		when-house-stack="s:[house-build:public, header-build:public:delay-250]:delay-2000"
		when-house-build="a:[scale-hover:set:(dur:2000ms#func:linear#count:infinite):in]"
		when-house-return="p:[animation:none] | s:[house-rotate:public:delay-500]">
		<!-- @samir when-house-return, see inspector when inspector-elem is on li, animation should be 50ms but is logged as 2500ms -->
		<!-- ex: 2 inspect-trigger="when-house-return|2000" -->
		<li init-with="p:[op:0, tro:center center, t:all 500ms ease-out]"
			when-house-stack="p:[opacity:0:1:50:linear]"
			when-house-return="a:[scale-hover:set:(dur:2000ms#func:linear#count:infinite):in]">
			<!-- @samir when-house-return, try adding opacity anim and check console -->
			<div class="team-card-container team-gabrie"
				init-with="p:[transform:translateX(528px) translateY(-375px) translateZ(0px) rotateX(45deg) rotateY(45deg) rotate(90deg),tro:center bottom]"
				when-house-stack="p:[transform:translateX(528px) translateY(-375px) translateZ(0px) rotateX(45deg) rotateY(45deg)  rotate(90deg):translateX(-362px) translateY(324px) translateZ(0px) rotateX(90deg) rotateY(0deg) rotate(90deg):1000:easeInExpo]"
				when-house-build="p:[transform:rotateY(0deg) rotateX(90deg) translateX(-362px) translateY(324px) translateZ(0px) rotate(90deg):rotateY(90deg) rotateX(-31deg) translateX(-5px) translateY(4px) translateZ(10px) rotate(0deg):1250:easeOutCirc]"
				when-house-return="p:[transform:rotateY(90deg) rotateX(-31deg) translateX(-5px) translateY(4px) translateZ(10px) rotate(0deg):rotateY(0deg) rotateX(0deg) translateX(0px) translateY(0px) translateZ(0px) rotate(0deg):1000:easeOutExpo]:delay-300">
				<div class="team-card-placeholder" style="position: relative; top: auto; left: 0; width: 256px; height: 359.5px">
					<div class="front"></div>
					<div class="back"></div>
				</div>
			</div>
		</li>

		<li init-with="p:[op:0, tro:center center, t:all 500ms ease-out]"
			when-house-stack="p:[opacity:0:1:50:linear]:delay-150"
			when-house-return="a:[scale-hover:set:(dur:2000ms#func:linear#count:infinite):in]">
			<div class="team-card-container team-jeselle"
				init-with="p:[tr:rotateY(30deg) translateX(-90px) translateY(-364px) translateZ(0px) rotateX(60deg) rotate(90deg), tro:center bottom]"
				when-house-stack="p:[transform:rotateY(30deg) translateX(-90px) translateY(-364px) translateZ(0px) rotateX(60deg) rotate(90deg):rotateY(0deg) translateX(-725px) translateY(316px) translateZ(0px) rotateX(90deg) rotate(90deg):1000:easeInExpo]:delay-150"
				when-house-build="p:[transform:rotateY(0deg) rotateX(90deg) translateX(-725px) translateY(316px) translateZ(0px) rotate(90deg):rotateY(-90deg) rotateX(-31deg) translateX(-5px) translateY(4px) translateZ(10px) rotate(0deg):1250:easeOutCirc]:delay-100"
				when-house-return="p:[transform:rotateY(-90deg) rotateX(-31deg) translateX(-5px) translateY(4px) translateZ(10px) rotate(0deg):rotateY(0deg) rotateX(0deg) translateX(0px) translateY(0px) translateZ(0px) rotate(0deg):1000:easeOutExpo]:delay-400">
				<div class="team-card-placeholder" style="position: relative; top: auto; left: 0; width: 256px; height: 359.5px">
					<div class="front"></div>
					<div class="back"></div>
				</div>
			</div>
		</li>

		<li init-with="p:[op:0, tro:center center, t:all 500ms ease-out]"
			when-house-stack="p:[opacity:0:1:50:linear]:delay-300"
			when-house-return="a:[scale-hover:set:(dur:2000ms#func:linear#count:infinite):in]">
			<div class="team-card-container team-jason"
				init-with="p:[tr:rotateY(15deg) translateX(185px) translateY(-734px) translateZ(0px) rotateX(80deg) rotate(90deg), tro:center bottom]"
				when-house-stack="p:[transform:rotateY(15deg) translateX(185px) translateY(-734px) translateZ(0px) rotateX(80deg) rotate(90deg):rotateY(0deg) translateX(-366px) translateY(-47px) translateZ(0px) rotateX(90deg) rotate(90deg):1000:easeInExpo]:delay-300"
				when-house-build="p:[transform:rotateY(0deg) translateX(-366px) translateY(-47px) translateZ(0px) rotateX(90deg) rotate(90deg):rotateY(90deg) translateX(30px) translateY(-5px) translateZ(0px) rotateX(0deg) rotate(0deg):1250:easeOutCirc]:delay-200"
				when-house-return="p:[transform:rotateY(90deg) translateX(30px) translateY(-5px) translateZ(0px) rotateX(0deg) rotate(0deg):rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotate(0deg):1000:easeOutExpo]:delay-500">
				<div class="team-card-placeholder" style="position: relative; top: auto; left: 0; width: 256px; height: 359.5px">
					<div class="front"></div>
					<div class="back"></div>
				</div>
			</div>
		</li>

		<li init-with="p:[op:0, tro:center center, t:all 500ms ease-out]"
			when-house-stack="p:[opacity:0:1:50:linear]:delay-450"
			when-house-return="a:[scale-hover:set:(dur:2000ms#func:linear#count:infinite):in]">
			<div class="team-card-container team-samir"
				init-with="p:[tr:rotateY(15deg) translateX(-385px) translateY(-725px) translateZ(0px) rotateX(90deg) rotate(90deg), tro:center bottom]"
				when-house-stack="p:[transform:rotateY(15deg) translateX(-385px) translateY(-725px) translateZ(0px) rotateX(90deg) rotate(90deg):rotateY(0deg) translateX(-732px) translateY(-43px) translateZ(0px) rotateX(90deg) rotate(90deg):1000:easeInExpo]:delay-450"
				when-house-build="p:[transform:rotateY(0deg) translateX(-732px) translateY(-43px) translateZ(0px) rotateX(90deg) rotate(90deg):rotateY(-90deg) translateX(-30px) translateY(-5px) translateZ(0px) rotateX(0deg) rotate(0deg):1250:easeOutCirc]:delay-300"
				when-house-return="p:[transform:rotateY(-90deg) translateX(-30px) translateY(-5px) translateZ(0px) rotateX(0deg) rotate(0deg):rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotate(0deg):1000:easeOutExpo]:delay-600">
				<div class="team-card-placeholder" style="position: relative; top: auto; left: 0; width: 256px; height: 359.5px">
					<div class="front"></div>
					<div class="back"></div>
				</div>
			</div>
		</li>

		<li style="position:absolute;"
			init-with="p:[op:0]"
			when-house-stack="p:[z-index:auto, opacity:0:1:50:linear]:delay-600"
			when-house-build="p:[z-index:auto]"
			when-house-return="p:[z-index:-100:delay-1000]">
			<div class="team-card-container"
				init-with="p:[tr:translateX(385px) translateY(-165px) translateZ(0px) rotateX(90deg) rotateY(-15deg) rotate(90deg), tro:center top]"
				when-house-stack="p:[transform:translateX(385px) translateY(-165px) translateZ(0px) rotateX(90deg) rotateY(-15deg) rotate(90deg):translateX(-183px) translateY(485px) translateZ(0px) rotateX(90deg) rotateY(0deg) rotate(90deg):1000:easeInExpo]:delay-600"
				when-house-build="p:[transform:translateX(-183px) translateY(485px) translateZ(0px) rotateX(90deg) rotate(90deg):translateX(178px) translateY(179px) translateZ(20px) rotateX(90deg) rotate(90deg):1250:easeOutCirc]:delay-400"
				when-house-return="p:[transform:translateX(178px) translateY(179px) translateZ(20px) rotateX(90deg) rotate(90deg):translateX(-3660px) translateY(179px) translateZ(20px) rotateX(90deg) rotate(90deg):1000:easeInExpo]">
				<div class="team-card-placeholder" style="position: relative; top: auto; left: 0; width: 256px; height: 359.5px">
					<div class="front"></div>
					<div class="back"></div>
				</div>
			</div>
		</li>
	</ul>
</div>
