<div class="full-xy flex-center p15xy" types='checkbox, link' default-type="link">
	<div class="university-card" ng-if='activeType === "checkbox"'
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:scale(1.1), tro:center center, t:all 250ms ease-out]"
		on-mouse-leave="p:[tr:scale(1), tro:center center, t:all 250ms ease-in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #FDB515;"></div>
			<div class="school-card-top" style="background-color: #003262;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
					init-with="p-op"
					on-init="t-enter"
					on-enter="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
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
				<div class="school-card-info" style="color: #003262;">
					<h1 style="color: #003262;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h1
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h2 style="color: #003262;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</div>
	<a class="university-card with-hover" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:scale(1.1), tro:center center, t:all 250ms ease-out]"
		on-mouse-leave="p:[tr:scale(1), tro:center center, t:all 250ms ease-in]">
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
					on-init="t-enter"
					on-enter="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
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
				<div class="school-card-info" style="color: #003262;">
					<h1 style="color: #003262;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h1
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h2 style="color: #003262;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="t-enter"
						on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</a>
</div>
