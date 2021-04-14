<div class="perspective-container full-xy flex-center p15xy">
	<a class="request-card bg-household complete"
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]"
		on-mouse-enter="p:[tr:translateZ(40px), tro:center center, t:all 250ms ease-in]"
		on-mouse-leave="p:[tr:translateZ(0px), t:all 250ms ease-in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250]">
		<div class="map">
			<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
				<div>
					<div init-with="p-op"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-750] | p:[tro:center bottom]">
						<span init-with="p-op"
							on-init="a:[fadeIn:set:(dur:1000ms#func:ease-out):in:delay-1000]">
							<svg viewBox="0 0 100 100">
								<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</span>
						<span init-with="p-op"
							on-init="a:[fadeIn:set:(dur:1000ms#func:ease-out):in:delay-1000]">Philz Coffee</span>
					</div>
				</div>
				<span init-with="p-op"
					on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-500]"></span>
			</div>
		</div>
		<div class="info">
			<hr class="info-border"
				init-with="p:[tr:scaleX(0), tro: center center]"
				on-init="p:[tr:scaleX(1):delay-150, t:transform 250ms ease-out]"/>
			<ul class="ugrid-2">
				<li init-with="p-op"
					on-init="a:[icon-enter:set:(dur:800ms#func:linear):in:delay-350]">
					<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
				</li>
				<li init-with="p-op"
					on-init="a:[fadeIn:set:(dur:500ms#func:ease-out):in:delay-350]">
					<h2>Academic Request</h2>
					<h1>In Person Tutoring</h1>
					<hr class="info-divider"/>
				</li>
			</ul>
			<ul class="ugrid-3"
				init-with="p-op"
				on-init="a:[fadeIn:set:(dur:500ms#func:ease-out):in:delay-350]">
				<li>
					<h4>Date Created</h4>
					<h3>Feb 15</h3>
				</li>
				<li>
					<h4>Time Needed</h4>
					<h3>1h 30m</h3>
				</li>
				<li init-with="p-op"
					on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-500]">
					<span class="chip">Completed</span>
				</li>
			</ul>
		</div>
	</a>
</div>
