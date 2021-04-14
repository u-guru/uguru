<div class="perspective-container full-xy flex-center p15xy" types='link, default, 2x3' default-type="link">
	<div class="tile-group links" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="a:[fadeIn:set:(dur:100ms#func:linear):in]">
		<ul class="bg-slate">
			<li>
				<a class="tile badge-container click"
					init-default
					on-init="t:[on-enter:children]">
					<span class="badge-top bg-moxie"
						init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150] | p:[tro:center bottom]">6</span>
					<span
						init-with="p-op"
						on-enter="a:[fadeIn:set:(dur:500ms#func:ease-out):in]">Billing</span>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile badge-container click"
					init-default
					on-init="t:[on-enter:children:delay-150]">
					<span class="badge-left bg-moxie"
						init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150] | p:[tro:right center]">6</span>
					<span
						init-with="p-op"
						on-enter="a:[fadeIn:set:(dur:500ms#func:ease-out):in]">Gurus</span>
				</a>
				<hr class="tile-border"/>
			</li>
			<li init-default
				on-init="t:[on-enter:children:delay-300]">
				<a class="tile"
					init-with="p-op"
					on-enter="a:[fadeIn:set:(dur:500ms#func:ease-out):in]">Requests</a>
				<hr class="tile-border"/>
			</li>
		</ul>
	</div>

	<div class="tile-group" ng-if='activeType === "default"'
		init-with="p-op"
		on-init="a:[fadeIn:set:(dur:100ms#func:linear):in]">
		<ul class="bg-robin">
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
					<h2 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-450] | p:[tro:center center]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-150]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-250]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
					<h2 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-450] | p:[tro:center center]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-300]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-500]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
					<h2 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-450] | p:[tro:center center]">Edit and add<br/>your shops</h2>
				</a>
				<hr class="tile-border"/>
			</li>
		</ul>
	</div>

	<div class="tile-group tile-row-2x3" ng-if='activeType === "2x3"'
		init-with="p-op"
		on-init="a:[fadeIn:set:(dur:100ms#func:linear):in]">
		<ul class="bg-cobalt">
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-250]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-250]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-500]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-500]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-250]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-250]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-500]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-500]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
			<li>
				<a class="tile"
					init-default
					on-init="trigger:[on-enter:children:delay-750]">
					<span>
						<svg viewBox="0 0 100 100"
							init-default
							on-init="trigger:[on-enter:children:delay-750]">
							<rect x="14" y="14" width="72" height="72" rx="4"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-100] | p:[tro:center center]"></rect>
							<circle class="line" cx="50" cy="40" r="16"
								init-with="p:[op:0, sdo:101, sda:101, tr:rotate(90deg), tro: center center]"
								on-enter="p:[op:1,sdo:0:delay-200,t:stroke-dashoffset 250ms ease-out#opacity 250ms linear]"></circle>
							<path class="line" d="M28.5,65.5 L72.0028725,65.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-250] | p:[tro:center center]"></path>
							<path class="line" d="M23.4904776,75.5 L76.0028725,75.5"
								init-with="p-op"
								on-enter="a:[scaleInX-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]"></path>
						</svg>
						<!-- two-tone icons: larger container scales out as the detaisl draw and fade in -->
					</span>
					<h1 init-with="p-op"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-350] | p:[tro:center center]">Your Profile</h1>
				</a>
				<hr class="tile-border"/>
			</li>
		</ul>
		<hr class="tile-group-border"/>
	</div>
</div>
