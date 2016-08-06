<div class="full-xy flex-center p15xy" types='edit, link' default-type="edit">
	<div class="student-card" ng-if='activeType === "edit"'
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]"
		on-mouse-enter="p:[tr:scale(1.1), tro:center center, t:all 250ms ease-out]"
		on-mouse-leave="p:[tr:scale(1), tro:center center, t:all 250ms ease-in]">
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #003262;">
				<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					init-with="p-op"
					on-init="t-enter"
					on-enter="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase' style="color: #003262;">Marco Polo</h1>
					<h2 style="color: #003262;">Cal Freshman</h2>
					<h2 style="color: #003262;">email@school.edu</h2>
				</div>
				<h3>
					<span style="color: #003262;">SELECTED COURSES</span>
					<span style="background: #003262;">9</span>
					<a>Edit</a>
				</h3>
			</div>
		</div>
	</div>
	<a class="student-card with-hover" ng-if='activeType === "link"'>
		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #003262;">
				<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase' style="color: #003262;">Marco Polo</h1>
					<h2 style="color: #003262;">Cal Freshman</h2>
					<h2 style="color: #003262;">email@school.edu</h2>
				</div>
			</div>
		</div>
		<div class="school-id-hover" tabindex>
			<span style="background: #003262;"></span>
			<div>
				Content can go in here.
			</div>
		</div>
	</a>
</div>
