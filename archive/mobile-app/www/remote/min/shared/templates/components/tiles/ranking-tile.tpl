<div class="perspective-container full-xy flex-center p15xy">
	<ul class="ranking-container">
		<li>
			<div class="ranking-tile large"
				init-with="p-op"
				on-init="a:[fadeInUp:set:(dur:450ms#func:cubic-bezier(.63#.01#1#.53)):in]">
				<header>
					<h2>Ranking at UIUC</h2>
				</header>
				<svg viewBox="0 0 300 300">
				    <g fill="none">
				        <text font-family="Source Sans Pro" font-size="90" font-weight="900" fill="#FFFFFF">
				            <tspan x="82.2" y="187.5">99</tspan>
				        </text>
				        <text font-family="Source Sans Pro" font-size="28" font-weight="900" fill="#FFFFFF">
				            <tspan x="183.556" y="147">TH</tspan>
				        </text>
				        <path d="M243.338095,263 C294.887302,211.528137 294.887302,128.07576 243.338095,76.6038969 C191.788889,25.1320344 108.211111,25.1320344 56.6619049,76.6038969 C5.11269837,128.07576 5.11269837,211.528137 56.6619049,263" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"
							init-with="p-op"
							on-init="p:[op:0.5, t:all 250ms ease-in-out]"></path>
				        <path d="M23.4095869,207.735743 C29.444425,228.149159 40.528531,247.390832 56.6619049,263.5" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"
							init-with="p:[op:0, sdo:-66, sda:66, t:all 450ms ease-out]"
							on-init="p:[op:1, sdo:0]:delay-450"></path>
				    </g>
				</svg>
			</div>
		</li>
		<li>
			<div class="ranking-tile small no-icon"
				init-with="p-op"
				on-init="a:[fadeInUp:set:(dur:250ms#func:cubic-bezier(0#.35#.77#1)):in]">
				<header>
					<h3>Big 10 Academic Ratings</h3>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
					        <path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								init-with="p:[op:0, tro:left bottom, tr:rotate(15deg), sdo:315, sda:315, t:all 550ms ease-out]"
								on-init="p:[op:1, tr: rotate(0deg):delay-180, sdo:0]"></path>
					        <circle fill="#50A5DD" cx="281" cy="7" r="5"
								init-with="p-op"
								on-init="p:[op:1:delay-550, t:all 450ms ease-in]"></circle>
					    </g>
					</svg>
				</div>
			</div>
			<div class="ranking-tile small with-icon tile-shamrock"
				init-with="p-op"
				on-init="a:[fadeInUp:set:(dur:450ms#func:cubic-bezier(0#.35#.77#1)):in:delay-150]">
				<header>
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								init-with="p:[op:0, tro:left bottom, tr:rotate(15deg), sdo:315, sda:315, t:all 550ms ease-out]"
								on-init="p:[op:1, tr: rotate(0deg):delay-180, sdo:0]:delay-250"></path>
							<circle fill="#50A5DD" cx="281" cy="7" r="5"
								init-with="p-op"
								on-init="p:[op:1:delay-550, t:all 450ms ease-in]:delay-250"></circle>
						</g>
					</svg>
				</div>
			</div>
		</li>
		<li>
			<div class="ranking-tile small with-icon tile-lake"
				init-with="p-op"
				on-init="a:[fadeInUp:set:(dur:250ms#func:cubic-bezier(0#.35#.77#1)):in]">
				<header>
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								init-with="p:[op:0, tro:left bottom, tr:rotate(15deg), sdo:315, sda:315, t:all 550ms ease-out]"
								on-init="p:[op:1, tr: rotate(0deg):delay-180, sdo:0]:delay-450"></path>
							<circle fill="#50A5DD" cx="281" cy="7" r="5"
								init-with="p-op"
								on-init="p:[op:1:delay-550, t:all 450ms ease-in]:delay-450"></circle>
						</g>
					</svg>
				</div>
			</div>
			<div class="ranking-tile small with-icon tile-auburn"
				init-with="p-op"
				on-init="a:[fadeInUp:set:(dur:450ms#func:cubic-bezier(0#.35#.77#1)):in:delay-150]">
				<header>
					<div class="ranking-tile-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/user.html'"></div>
					<div>
						<h1>100</h1>
						<h3>Ranked Gurus</h3>
					</div>
				</header>
				<div class="ranking-tile-graph">
					<svg viewBox="0 0 300 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g fill="none" stroke="#50A5DD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<path d="M2.57421875,74.4023438 C2.57421875,74.4023438 4.08938926,73.4591033 5.96669131,72.2904248 L54.7512774,41.9205127 C56.6248883,40.7541321 59.7469088,40.620665 61.7044079,41.6122252 L110.152623,66.1533998 C112.11912,67.1495179 115.228452,66.9866311 117.08498,65.7976063 L165.911114,34.5266124 C167.773252,33.333995 170.991505,32.8921982 173.102331,33.5407677 L221.032825,48.267826 C223.142287,48.9159765 226.281823,48.3676236 228.04972,47.039632 L277.224499,10.100993"
								init-with="p:[op:0, tro:left bottom, tr:rotate(15deg), sdo:315, sda:315,  t:all 550ms ease-out]"
								on-init="p:[op:1, tr: rotate(0deg):delay-180, sdo:0]:delay-600"></path>
							<circle fill="#50A5DD" cx="281" cy="7" r="5"
								init-with="p-op"
								on-init="p:[op:1:delay-550, t:all 450ms ease-in]:delay-600"></circle>
						</g>
					</svg>
				</div>
			</div>
		</li>
	</ul>
</div>
