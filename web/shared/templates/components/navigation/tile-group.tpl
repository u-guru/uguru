<div class="perspective-container full-xy flex-center p15xy" types='link, default, 2x3' default-type="link">
	<div class="tile-group links" ng-if='activeType === "link"'
		u init-with="p-op"
		on-init="s:[tile-group-links-init:children:linear-700, badge-enter:depth(>1):easeOutExpo-700] |a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<ul class="bg-slate">
			<li>
				<a class="tile badge-container click">
					<span class="badge-top bg-moxie"
						u init-with="p:[op:0, tro:center bottom]"
						when-badge-enter="a:[bounceIn-rotate-subtle:1000:linear:150:1:f]">6</span>
					<span u init-with="p-op"
						when-badge-enter="a:[bounceIn-subtle:1000:linear:0:1:f]">Billing</span>
				</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile badge-container click">
					<span class="badge-left bg-moxie"
						u init-with="p:[op:0, tro:right center]"
						when-badge-enter="a:[bounceIn-rotate-subtle:1000:linear:150:1:f]">6</span>
					<span u init-with="p-op"
						when-badge-enter="a:[bounceIn-subtle:1000:linear:0:1:f]">Gurus</span>
				</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile"
					u init-with="p-op"
					when-badge-enter="a:[bounceIn-subtle:1000:linear:0:1:f]">Requests</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
		</ul>
	</div>

	<div class="tile-group" ng-if='activeType === "default"'
		u init-with="p-op"
		on-init="s:[tile-group-default-init:self, tile-content:depth(>1):easeInCirc-1200]"
		when-tile-group-default-init="a:[opacity:0:1:100:easeOutSine:0:1:f]">
		<ul class="bg-robin">
			<li u when-tile-content="s:[tile-icon-enter-1:>c]">
				<!-- u when-tile-content="s:[tile-icon-enter-1:children]" -->
				<a class="tile">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-1="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-tile-icon-enter-1="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-1="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-1="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-1="a:[bounceInUp-subtle:1000:linear:350:1:f]">Your Profile</h1>
					<h2 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-1="a:[bounceInUp-subtle:1000:linear:450:1:f]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:1000:linear:150:1:f]"/>
			</li>
			<li u when-tile-content="s:[tile-icon-enter-2:>c]">
				<a class="tile">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-2="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-tile-icon-enter-2="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-2="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-2="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-2="a:[bounceInUp-subtle:1000:linear:350:1:f]">Your Profile</h1>
					<h2 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-2="a:[bounceInUp-subtle:1000:linear:450:1:f]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:1000:linear:300:1:f]"/>
			</li>
			<li u when-tile-content="s:[tile-icon-enter-3:>c]">
				<a class="tile">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-3="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-tile-icon-enter-3="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-3="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-tile-icon-enter-3="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-3="a:[bounceInUp-subtle:1000:linear:350:1:f]">Your Profile</h1>
					<h2 u init-with="p:[op:0, tro:center center]"
						when-tile-icon-enter-3="a:[bounceInUp-subtle:1000:linear:450:1:f]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					u init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:1000:linear:450:1:f]"/>
			</li>
		</ul>
	</div>

	<div class="tile-group tile-row-2x3" ng-if='activeType === "2x3"'
		u init-with="p-op"
		on-init="s:[tile-group-2x3-init:children, tile-content-2x3:depth(>1):linear-1000] |a:[opacity:0:1:100:easeOutSine:0:1:f]">
		<ul class="bg-cobalt">
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter:>c]">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					u init-with="p:[op:0, tro:center bottom]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter-2:>c]">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-2="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter-2="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-2="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-2="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter-2="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					u init-with="p:[op:0, tro:center bottom]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter-3:>c]">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-3="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter-3="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-3="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-3="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter-3="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter-4:>c]">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-4="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter-4="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-4="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-4="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter-4="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					u init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter-5:>c]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-5="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter-5="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-5="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-5="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter-5="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					u init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
			<li>
				<a class="tile"
					u when-tile-content-2x3="s:[icon-2x3-enter-6:>c]">
					<span>
						<svg viewBox="0 0 100 100">
							<rect x="14" y="14" width="72" height="72" rx="4"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-6="a:[scaleInX-subtle:1000:linear:100:1:f]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								u init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								when-icon-2x3-enter-6="a:[opacity:0:1:250:easeOutSine:0:1:f, stroke-dashoffset:101:0:450:easeOutSine:0:1:f]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-6="a:[scaleInX-subtle:1000:linear:250:1:f]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								u init-with="p:[op:0, tro:center center]"
								when-icon-2x3-enter-6="a:[scaleInX-subtle:1000:linear:350:1:f]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 u init-with="p:[op:0, tro:center center]"
						when-icon-2x3-enter-6="a:[bounceIn-subtle:1000:linear:350:1:f] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					u init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:1000:linear:0:1:f]"/>
			</li>
		</ul>
		<hr class="tile-group-border"
			u init-with="p:[op:0, tro:center center]"
			when-tile-group-2x3-init="a:[scaleInX-subtle:1000:linear:0:1:f]"/>
	</div>
</div>
