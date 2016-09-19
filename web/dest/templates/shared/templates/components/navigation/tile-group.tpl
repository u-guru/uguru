<div class="perspective-container full-xy flex-center p15xy" types='link, default, 2x3' default-type="link">
	<div class="tile-group links" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="s:[tile-group-links-init:public]"
		when-tile-group-links-init="p:[opacity:0:1:100:easeOutSine]">
		<ul class="bg-slate">
			<li>
				<a class="tile badge-container click"
					init-default
					when-tile-group-links-init="t:[on-enter:children]">
					<span class="badge-top bg-moxie"
						init-with="p:[op:0, tro:center bottom]"
						on-enter="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-150]">6</span>
					<span init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">Billing</span>
				</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-150]"/>
			</li>
			<li>
				<a class="tile badge-container click"
					init-default
					when-tile-group-links-init="t:[on-enter:children:delay-300]">
					<span class="badge-left bg-moxie"
						init-with="p:[op:0, tro:right center]"
						on-enter="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-150]">6</span>
					<span init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">Gurus</span>
				</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-450]"/>
			</li>
			<li init-default
				when-tile-group-links-init="t:[on-enter:children:delay-600]">
				<a class="tile"
					init-with="p-op"
					on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">Requests</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-links-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-750]"/>
			</li>
		</ul>
	</div>

	<div class="tile-group" ng-if='activeType === "default"'
		init-with="p-op"
		on-init="s:[tile-group-default-init:public]"
		when-tile-group-default-init="p:[opacity:0:1:100:easeOutSine]">
		<ul class="bg-robin">
			<li>
				<a class="tile"
					init-default
					when-tile-group-default-init="t:[on-enter:children]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-350]">Your Profile</h1>
					<h2 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-150]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-default-init="t:[on-enter:children:delay-150]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children:delay-250]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-350]">Your Profile</h1>
					<h2 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-300]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-default-init="t:[on-enter:children:delay-300]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children:delay-500]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-350]">Your Profile</h1>
					<h2 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"
					init-with="p-op"
					when-tile-group-default-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in:delay-450]"/>
			</li>
		</ul>
	</div>

	<div class="tile-group tile-row-2x3" ng-if='activeType === "2x3"'
		init-with="p-op"
		on-init="s:[tile-group-2x3-init:public]"
		when-tile-group-2x3-init="p:[opacity:0:1:100:easeOutSine]">
		<ul class="bg-cobalt">
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-150]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					init-with="p:[op:0, tro:center bottom]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-300]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					init-with="p:[op:0, tro:center bottom]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-450]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-300]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-450]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in]"/>
			</li>
			<li>
				<a class="tile"
					init-default
					when-tile-group-2x3-init="t:[on-enter:children:delay-600]">
					<span on-enter="t:[on-enter:children]">
						<svg viewBox="0 0 100 100"
							on-enter="t:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sda:101, sdo:101, tro:center center]"
								on-enter="p:[opacity:0:1:250:easeOutSine, stroke-dashoffset:101:0:450:easeOutSine]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p:[op:0, tro:center center]"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p:[op:0, tro:center center]"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"
					init-with="p:[op:0, tro:center top]"
					when-tile-group-2x3-init="a:[scaleInY-subtle:set:(dur:1000ms#func:linear):in]"/>
			</li>
		</ul>
		<hr class="tile-group-border"
			init-with="p:[op:0, tro:center center]"
			when-tile-group-2x3-init="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in]"/>
	</div>
</div>
