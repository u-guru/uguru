<div class="perspective-container full-xy flex-center p15xy" types='freshman, sophomore, junior, senior, graduate, high-school, college, alumni, parent, professor' default-type="freshman">
	<div class="card-container" ng-if='activeType === "freshman"'>
		<a class="demographic-tile freshman"
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
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
			init-with="p:[op:0, tro:center center]"
			on-init="s:[demo-card-enter:public] | a:[bounceIn-subtle:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in]">
			<svg width="180px" height="180px" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div>
				<div class="borders">
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center top]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleX(0), tro:center center]"
						when-demo-card-enter="p:[transform:scaleX(0):scaleX(1):800:easeOutCubic]"></div>
					<div init-with="p:[tr:scaleY(0), tro:center bottom]"
						when-demo-card-enter="p:[transform:scaleY(0):scaleY(1):1000:easeOutCubic]"></div>
					<div class="border-bottom"
						init-with="p-op"
						when-demo-card-enter="p:[opacity:0:1:700:easeOutSine]:delay-800"></div>
				</div>
				<div>
					<div ng-include="root.base_url + 'preapp/templates/started/components/professor.html'"></div>
					<h1>Professor</h1>
				</div>
			</div>
		</a>
	</div>
</div>
