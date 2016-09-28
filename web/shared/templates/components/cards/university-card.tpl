<div class="perspective-container full-xy flex-center p15xy" types='checkbox, link' default-type="link">

	<!-- ng-if='activeType === "short"' -->
	<div class="card-container">
		<div class="university-card short">
			<svg class="rect" width="240px" height="50px" viewBox="0 0 240 50">
				<rect fill="none" x="0" y="0" width="240" height="50"></rect>
			</svg>
			<div class="school-card-container">
				<div class="school-card-color" style="background: #003262;">
					<span class="user-icon" style="background-color: transparent; border-color: #003262; background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg');"></span>
				</div>
				<div class="school-card-info">
					<h1>UC Berkeley</h1>
					<h2>Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</div>

	<!-- ng-if='activeType === "mini"' -->
	<div class="card-container">
		<div class="university-card mini"
			init-with="p-op"
			on-init="s:[university-card-init:public]"
			when-university-card-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
			<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
				<rect x="0" y="0" width="240" height="150" fill="none"></rect>
			</svg>
			<input type="checkbox" />
			<div class="school-card-inside">
				<div class="school-card-border" style="border-color: #FDB515;"></div>
				<div class="school-card-top" style="background-color: #003262;">
					<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
						init-with="p-op"
						when-university-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
						<span class="school-card-icon-bg" style="background-color: #003262;"></span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
							</svg>
						</span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
							</svg>
						</span>
					</span>
				</div>
				<div class="school-card-main no-footer">
					<div class="school-card-info">
						<h1 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
						<h2 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ng-if='activeType === "checkbox"' -->
	<div class="card-container">
		<div class="university-card"
			init-with="p-op"
			on-init="s:[university-card-init:public]"
			when-university-card-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
			<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
				<rect x="0" y="0" width="240" height="150" fill="none"></rect>
			</svg>
			<input type="checkbox" />
			<div class="school-card-inside">
				<div class="school-card-border" style="border-color: #FDB515;"></div>
				<div class="school-card-top" style="background-color: #003262;">
					<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
						init-with="p-op"
						when-university-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
						<span class="school-card-icon-bg" style="background-color: #003262;"></span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
							</svg>
						</span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
							</svg>
						</span>
					</span>
				</div>
				<div class="school-card-main no-footer">
					<div class="school-card-info">
						<h1 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
						<h2 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="card-container" ng-if='activeType === "link"'>
		<a class="university-card with-hover"
			init-with="p-op"
			on-init="s:[university-card-init:public]"
			when-university-card-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
			<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
				<rect x="0" y="0" width="240" height="150" fill="none"></rect>
			</svg>
			<div class="school-card-hover" tabindex>
				<span style="background: #003262;"></span>
				<div>
					Content can go in here.
				</div>
			</div>
			<div class="school-card-inside">
				<div class="school-card-border" style="border-color: #FDB515;"></div>
				<div class="school-card-top" style="background-color: #003262;">
					<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
						init-with="p-op"
						when-university-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
						<span class="school-card-icon-bg" style="background-color: #003262;"></span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
							</svg>
						</span>
						<span class="school-card-state">
							<svg viewBox="0 0 100 100">
								<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
							</svg>
						</span>
					</span>
				</div>
				<div class="school-card-main no-footer">
					<div class="school-card-map"></div>
					<div class="school-card-color" style="background-color: #003262;"></div>
					<div class="school-card-info">
						<h1 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
						<h2 init-with="p:[op:0, tro:center bottom]"
							when-university-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
					</div>
				</div>
			</div>
		</a>
	</div>
</div>
