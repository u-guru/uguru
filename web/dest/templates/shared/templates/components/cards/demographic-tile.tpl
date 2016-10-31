<div class="perspective-container full-xy flex-center p15xy" types='freshman, sophomore, junior, senior, graduate, high-school, college, alumni, parent, professor' default-type="freshman">
	<div class="card-container" ng-if='activeType === "freshman"'>
		<a class="demographic-tile freshman"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[freshman-card:self, demo-card-enter:children:100] "
			when-freshman-card="a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/freshman.html'"></div>
					<h1>Freshman</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "sophomore"'>
		<a class="demographic-tile sophomore"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/sophomore.html'"></div>
					<h1>Sophomore</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "junior"'>
		<a class="demographic-tile junior"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/junior.html'"></div>
					<h1>Junior</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "senior"'>
		<a class="demographic-tile senior"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/senior.html'"></div>
					<h1>Senior</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "graduate"'>
		<a class="demographic-tile graduate"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/graduate.html'"></div>
					<h1>Graduate</h1>
				</div>
			</div>
		</a>
	</div>


	<div class="card-container" ng-if='activeType === "high-school"'>
		<a class="demographic-tile high-school"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/high-school.html'"></div>
					<h1>High School</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "college"'>
		<a class="demographic-tile college"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/college.html'"></div>
					<h1>College</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "alumni"'>
		<a class="demographic-tile alumni"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/alumni.html'"></div>
					<h1>Alumni</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "parent"'>
		<a class="demographic-tile parent"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/parent.html'"></div>
					<h1>Parent</h1>
				</div>
			</div>
		</a>
	</div>

	<div class="card-container" ng-if='activeType === "professor"'>
		<a class="demographic-tile professor"
			u init-with="p:[opacity:0, transform-origin:center center]"
			on-init="s:[demo-card-enter:children] | a:[bounceIn-subtle:1000:(.8,.1,1,.05):0:1:f]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center top]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleX(0), transform-origin:center center]"
						when-demo-card-enter="a:[scaleX:0:1:800:easeOutCubic:0:1:f]"></div>
					<div u init-with="p:[transform:scaleY(0), transform-origin:center bottom]"
						when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:0:1:f]"></div>
					<div class="border-bottom"
						u init-with="p:[opacity:0]"
						when-demo-card-enter="a:[opacity:0:1:700:easeOutSine:800:1:f]"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/professor.html'"></div>
					<h1>Professor</h1>
				</div>
			</div>
		</a>
	</div>
</div>
