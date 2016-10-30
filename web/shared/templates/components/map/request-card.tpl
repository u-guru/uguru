<div class="perspective-container full-xy flex-center p15xy">
	<a class="request-card bg-household complete"
		u init-with="p-op"
		on-init="s:[request-card:self, request-card-init:>children:350]"
		when-request-card="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="map">
			<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
				<div>
					<div u init-with="p-op"
						when-request-card-init="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
						<span u init-with="p-op"
							when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
							<svg viewBox="0 0 100 100">
								<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</span>
						<span u init-with="p-op"
							when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
					</div>
				</div>
				<span u init-with="p-op"
					when-request-card-init="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
			</div>
		</div>
		<div class="info">
			<hr class="info-border"
				u init-with="p:[tr:scaleX(0), tro:center center]"
				when-request-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
			<ul class="ugrid-2">
				<li u init-with="p:[tr:scaleX(0), tro:center center]"
					when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
					<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
				</li>
				<li u init-with="p-op"
					when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
					<h2>Academic Request</h2>
					<h1>In Person Tutoring</h1>
					<hr class="info-divider"/>
				</li>
			</ul>
			<ul class="ugrid-3"
				u init-with="p-op"
				when-request-card-init="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
				<li>
					<h4>Date Created</h4>
					<h3>Feb 15</h3>
				</li>
				<li>
					<h4>Time Needed</h4>
					<h3>1h 30m</h3>
				</li>
				<li u init-with="p-op"
					when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
					<span class="chip">Completed</span>
				</li>
			</ul>
		</div>
	</a>
</div>
