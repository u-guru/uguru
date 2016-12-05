<div class="perspective-container full-xy flex-center p15xy">
	<ul class="ranking-container">
		<li>
			<div class="ranking-tile large"
				u init-with="p:[op:0]"
				on-init="s:[ranking-tile-init-1:children]|a:[fadeInUp:450:(.63,.01,1,.53):0:1:f]">
				<header u init-with="p:[op:0]"
					when-ranking-tile-init-1="a:[bounceInUp-subtle:1000:linear:0:1:f]">
					<h2>Ranking at UIUC</h2>
				</header>
				<svg viewBox="0 0 300 300">
				    <g fill="none">
						<text font-family="Source Sans Pro" font-size="90" font-weight="900" fill="#FFFFFF">
				            <tspan x="130" y="187.5">99</tspan>
				        </text>
				        <text font-family="Source Sans Pro" font-size="28" font-weight="900" fill="#FFFFFF">
				            <tspan x="200" y="147">TH</tspan>
				        </text>
				        <path d="M243.338095,263 C294.887302,211.528137 294.887302,128.07576 243.338095,76.6038969 C191.788889,25.1320344 108.211111,25.1320344 56.6619049,76.6038969 C5.11269837,128.07576 5.11269837,211.528137 56.6619049,263" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.5"
							u init-with="p:[op:0]"
							when-ranking-tile-init-1="a:[opacity:0:1:250:easeOutSine:0:1:f]"></path>
				        <path d="M23.4095869,207.735743 C29.444425,228.149159 40.528531,247.390832 56.6619049,263.5" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[sdo:-66, sda:66]"
							when-ranking-tile-init-1="a:[stroke-dashoffset:-66:0:450:easeOutSine:350:1:f]"></path>
				    </g>
				</svg>
			</div>
		</li>
		<li>
			<div class="ranking-tile small no-icon"
				u init-with="p:[op:0]"
				on-init="s:[ranking-tile-init-2:depth(>1):100] |a:[fadeInUp:250:(0,.35,.77,1):100:1:f]">
				<header u init-with="p:[op:0]"
					when-ranking-tile-init-2="a:[bounceInUp-subtle:1000:linear:0:1:f]">
					<h3>Big 10 Academic Ratings</h3>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78">
					    <g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[tro:left bottom]"
							when-ranking-tile-init-2="a:[rotate:5deg:0deg:550:easeOutSine:0:1:f]:delay-180">
					        <path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								u init-with="p:[op:0, sdo:315, sda:315]"
								when-ranking-tile-init-2="a:[opacity:0:1:550:easeOutSine:0:1:f, stroke-dashoffset:315:0:550:easeOutSine:0:1:f]"></path>
					        <circle fill="#50A5DD" cx="281" cy="7" r="5"
								u init-with="p:[op:0]"
								when-ranking-tile-init-2="a:[opacity:0:1:450:easeInSine:0:1:f]:delay-550"></circle>
					    </g>
					</svg>
				</div>
			</div>
			<div class="ranking-tile small with-icon tile-shamrock"
				u init-with="p:[op:0]"
				on-init="s:[ranking-tile-init-3:depth(>1):200] |a:[fadeInUp:450:(0,.35,.77,1):350:1:f]">
				<header u init-with="p:[op:0]"
					when-ranking-tile-init-3="a:[bounceInUp-subtle:1000:linear:0:1:f]">
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[tro:left bottom]"
							when-ranking-tile-init-3="a:[rotate:5deg:0deg:550:easeOutSine:0:1:f]:delay-180">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								u init-with="p:[op:0, sdo:315, sda:315]"
								when-ranking-tile-init-3="a:[opacity:0:1:550:easeOutSine:0:1:f,  stroke-dashoffset:315:0:550:easeOutSine:0:1:f]"></path>
					        <circle fill="#50A5DD" cx="281" cy="7" r="5"
								u init-with="p:[op:0]"
								when-ranking-tile-init-3="a:[opacity:0:1:450:easeInSine:0:1:f]:delay-550"></circle>
						</g>
					</svg>
				</div>
			</div>
		</li>
		<li>
			<div class="ranking-tile small with-icon tile-lake"
				u init-with="p:[op:0]"
				on-init="s:[ranking-tile-init-4:depth(>1):300] |a:[fadeInUp:250:(0,.35,.77,1):300:1:f]">
				<header u init-with="p:[op:0]"
					when-ranking-tile-init-4="a:[bounceInUp-subtle:1000:linear:0:1:f]">
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[tro:left bottom]"
							when-ranking-tile-init-4="a:[rotate:5deg:0deg:550:easeOutSine:0:1:f]:delay-180">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								u init-with="p:[op:0, sdo:315, sda:315]"
								when-ranking-tile-init-4="a:[opacity:0:1:550:easeOutSine:0:1:f, stroke-dashoffset:315:0:550:easeOutSine:0:1:f]"></path>
							<circle fill="#50A5DD" cx="281" cy="7" r="5"
								u init-with="p:[op:0]"
								when-ranking-tile-init-4="a:[opacity:0:1:450:easeInSine:0:1:f]:delay-550"></circle>
						</g>
					</svg>
				</div>
			</div>
			<div class="ranking-tile small with-icon tile-auburn"
				u init-with="p:[op:0]"
				on-init="s:[ranking-tile-init-5:depth(>1):400] |a:[fadeInUp:450:(0,.35,.77,1):550:1:f]">
				<header u init-with="p:[op:0]"
					when-ranking-tile-init-5="a:[bounceInUp-subtle:1000:linear:0:1:f]">
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							u init-with="p:[tro:left bottom]"
							when-ranking-tile-init-5="a:[rotate:5deg:0deg:550:easeOutSine:0:1:f]:delay-180">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								u init-with="p:[op:0, sdo:315, sda:315]"
								when-ranking-tile-init-5="a:[opacity:0:1:550:easeOutSine:0:1:f, stroke-dashoffset:315:0:550:easeOutSine:0:1:f]"></path>
							<circle fill="#50A5DD" cx="281" cy="7" r="5"
								u init-with="p:[op:0]"
								when-ranking-tile-init-5="a:[opacity:0:1:450:easeInSine:0:1:f]:delay-550"></circle>
						</g>
					</svg>
				</div>
			</div>
		</li>
	</ul>
</div>
