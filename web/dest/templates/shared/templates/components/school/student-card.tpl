<div class="perspective-container full-xy flex-center p15xy" types='uc-berkeley, boston-college, manhattan-college, university-of-chicago, williams-college, case-western' default-type="uc-berkeley">
	<div class="student-card" ng-if='activeType === "uc-berkeley"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #003262;">
				<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase' init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #003262;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>

	<div class="student-card" ng-if='activeType === "boston-college"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #910039;">
				<span class="user-icon" style="background-color:transparent; border-color: #910039; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase'
						init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #910039;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>

	<div class="student-card" ng-if='activeType === "manhattan-college"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #006838;">
				<span class="user-icon" style="background-color:transparent; border-color: #006838; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase'
						init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #006838;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>

	<div class="student-card" ng-if='activeType === "university-of-chicago"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #DE0A2A;">
				<span class="user-icon" style="background-color:transparent; border-color: #DE0A2A; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase'
						init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #DE0A2A;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>

	<div class="student-card" ng-if='activeType === "williams-college"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #FFD700;">
				<span class="user-icon" style="background-color:transparent; border-color: #FFD700; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase'
						init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #FFD700;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>

	<div class="student-card" ng-if='activeType === "case-western"'
		init-with="p-op"
		on-init="s:[student-card-init:public] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #184c8c;">
				<span class="user-icon" style="background-color:transparent; border-color: #184c8c; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase' style="color: #184c8c;"
						init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
					<h2 style="color: #184c8c;"
						init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Cal Freshman</h2>
					<h2 style="color: #184c8c;"
						init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">email@school.edu</h2>
				</div>
				<h3>
					<span style="color: #184c8c;"
						init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">SELECTED COURSES</span>
					<span style="background: #184c8c;"
						init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
					<a init-with="p-op"
						when-student-card-init="a:[fadeIn:set:(dur:800ms#func:ease-in):in:delay-150]">Edit</a>
				</h3>
			</div>
		</div>
	</div>
</div>
