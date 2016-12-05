<div class="perspective-container full-xy flex-center p15xy" types='checkbox, short, mini, link'>

	<div class="card-container" ng-if='activeType === "checkbox"'>
		<div class="university-card"
			u init-with="p:[op:0]"
			error on-init="s:[university-card-init:children:150] | a:[zoom-enter:800:(0,0.2,0.3,1):0:1:f]">
			<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
				<rect x="0" y="0" width="240" height="150" fill="none"></rect>
			</svg>
			<input type="checkbox" />
			<div class="school-card-inside">
				<div class="school-card-border" style="border-color: #FDB515;"></div>
				<div class="school-card-top" style="background-color: #003262;">
					<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
						u init-with="p:[tro:center center, transform:scale(0)]"
						when-university-card-init="a:[icon-enter:1000:(0,0.2,0.3,1):300:1:f]">
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
					<div class="school-card-info"
						u init-with="p:[op:0, tro:center bottom]"
					   when-university-card-init="a:[bounceIn-subtle:1000:easeInSine:0:1:f]">
						<h1>UC Berkeley</h1>
						<h2>Berkeley, CA</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="card-container" ng-if='activeType === "short"'>
		<div class="university-card short"
			u on-init="s:[uni-short:self, uni-icon:children:300, uni-info:children:250]"
			error when-uni-short="a:[scoop-enter:1000:linear:0:1:f]">
			<svg class="rect" width="240px" height="50px" viewBox="0 0 240 50">
				<rect fill="none" x="0" y="0" width="240" height="50"></rect>
			</svg>
			<div class="school-card-container">
				<div class="school-card-color" style="background: #003262;">
					<span class="user-icon" style="background-color: transparent; border-color: #003262; background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg');"
						u init-with="p:[tro:center center, tr:scale(0)]"
						when-uni-icon="a:[icon-enter:900:linear:0:1:f]"></span>
				</div>
				<div class="school-card-info">
					<h1
						u init-with="p:[op:0, tro:center center]"
						when-uni-info="a:[bounceIn-subtle:1000:linear:0:1:f]">UC Berkeley</h1>
					<h2
						u init-with="p:[op:0, tro:center center]"
						when-uni-info="a:[bounceIn-subtle:1000:linear:0:1:f]">Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="card-container" ng-if='activeType === "mini"'>
		<div class="university-card mini"
			u init-with="p:[op:0]"
			on-init="s:[university-card-init:children:150] |a:[zoom-enter:800:(0,0.2,0.3,1):0:1:f]">
			<svg class="rect" width="240px" height="150px" viewBox="0 0 240 150">
				<rect x="0" y="0" width="240" height="150" fill="none"></rect>
			</svg>
			<input type="checkbox" />
			<div class="school-card-inside">
				<div class="school-card-border" style="border-color: #FDB515;"></div>
				<div class="school-card-top" style="background-color: #003262;">
					<span class="school-card-icon" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'); border-color: #003262;"
						u init-with="p:[tro:center center, transform:scale(0)]"
						when-university-card-init="a:[icon-enter:1000:(0,0.2,0.3,1):300:1:f]">
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
					<div class="school-card-info"  u init-with="p:[op:0, tro:center bottom]"
						when-university-card-init="a:[bounceIn-subtle:1000:easeInSine:0:1:f]">
						<h1>UC Berkeley</h1>
						<h2>Berkeley, CA</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<a class="university-card with-hover" ng-if='activeType === "link"'
		u init-with="p:[op:0]"
		error on-init="s:[university-card-init:children:150] |a:[zoom-enter:800:(0,0.2,0.3,1):0:1:f]">
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
					u init-with="p:[tro:center center, tr:scale(0)]"
					when-university-card-init="a:[icon-enter:1000:(0,0.2,0.3,1):300:1:f]">
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
					<h1 u init-with="p:[op:0, tro:center bottom]"
						when-university-card-init="a:[bounceIn-subtle:1000:easeInSine:0:1:f]">UC Berkeley</h1>
					<h2 u init-with="p:[op:0, tro:center bottom]"
						when-university-card-init="a:[bounceIn-subtle:1000:easeInSine:0:1:f]">Berkeley, CA</h2>
				</div>
			</div>
		</div>
	</a>

</div>
