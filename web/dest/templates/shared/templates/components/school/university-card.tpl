<div class="perspective-container full-xy flex-center p15xy" types='uc-berkeley, boston-college, manhattan-college, university-of-chicago, williams-college, case-western' default-type="uc-berkeley">
	<div class="university-card" ng-if='activeType === "uc-berkeley"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #FDB515;"></div>
			<div class="school-card-top" style="background-color: #003262;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
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
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">UC Berkeley</h1>
					<h2 style="color: #003262;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="university-card" ng-if='activeType === "boston-college"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #B38F59;"></div>
			<div class="school-card-top" style="background-color: #910039;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/en/5/5b/Boston_College_Seal.svg'); border-color: #910039;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
					<span class="school-card-icon-bg" style="background-color: #910039;"></span>
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
				<div class="school-card-color" style="background-color: #910039;"></div>
				<div class="school-card-info" style="color: #910039;">
					<h1 style="color: #910039;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Boston College</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Boston College</h1>
					<h2 style="color: #910039;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Boston, MA</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="university-card" ng-if='activeType === "manhattan-college"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #FFFFFF;"></div>
			<div class="school-card-top" style="background-color: #006838;">
				<span class="school-card-icon" style="background-image: url('http://recruit-match.ncsasports.org/fasttrack/clientimages/14813college.jpg'); border-color: #006838;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
					<span class="school-card-icon-bg" style="background-color: #006838;"></span>
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
				<div class="school-card-color" style="background-color: #006838;"></div>
				<div class="school-card-info" style="color: #006838;">
					<h1 style="color: #006838;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Manhattan College</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Manhattan College</h1>
					<h2 style="color: #006838;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Manhattan, NY</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="university-card" ng-if='activeType === "university-of-chicago"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #000000;"></div>
			<div class="school-card-top" style="background-color: #DE0A2A;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/en/0/0d/UChicago_presidential_seal.svg'); border-color: #DE0A2A;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
					<span class="school-card-icon-bg" style="background-color: #DE0A2A;"></span>
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
				<div class="school-card-color" style="background-color: #DE0A2A;"></div>
				<div class="school-card-info" style="color: #DE0A2A;">
					<h1 style="color: #DE0A2A;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">University of Chicago</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">University of Chicago</h1>
					<h2 style="color: #DE0A2A;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Chicago, IL</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="university-card" ng-if='activeType === "williams-college"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #FFD700;"></div>
			<div class="school-card-top" style="background-color: #330067;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/en/1/19/Williams_College_Seal.svg'); border-color: #330067;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
					<span class="school-card-icon-bg" style="background-color: #330067;"></span>
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
				<div class="school-card-color" style="background-color: #330067;"></div>
				<div class="school-card-info" style="color: #330067;">
					<h1 style="color: #330067;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Williams College</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Williams College</h1>
					<h2 style="color: #330067;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Williamstown, MA</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="university-card" ng-if='activeType === "case-western"'
		init-with="p-op"
		on-init="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<input type="checkbox" />
		<div class="school-card-inside">
			<div class="school-card-border" style="border-color: #FFFFFF;"></div>
			<div class="school-card-top" style="background-color: #184c8c;">
				<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/en/0/08/Case_Western_Reserve_University_seal.svg'); border-color: #184c8c;"
					init-with="p-op"
					on-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]">
					<span class="school-card-icon-bg" style="background-color: #184c8c;"></span>
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
				<div class="school-card-color" style="background-color: #184c8c;"></div>
				<div class="school-card-info" style="color: #184c8c;">
					<h1 style="color: #184c8c;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Case Western</h1>
					<h1 init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Case Western</h1>
					<h2 style="color: #184c8c;"
						init-with="p:[op:0, tro:center bottom]"
						on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">Cleveland, OH</h2>
				</div>
			</div>
		</div>
	</div>
</div>
