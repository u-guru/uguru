<div class="onboarding absolute top-0 left-0 full-xy"
	init-default
	on-init="s:[card-swipe:public]">
	<div class="onboarding-guru projector-guru-body-container">
		<div>
			<div class="projector-guru-body" ng-include="root.base_url + 'preapp/templates/started/components/tour-guru.html'"
				init-with="p:[z-index:100]"
				when-guru-below="p:[z-index:1]"
				when-guru-above="p:[z-index:100]">
			</div>
		</div>
	</div>

	<projector>
		<div class="full-xy flex-center">
			<!-- <div class="card-container">
				<div class="student-card"
					init-with="p-op"
					on-init="s:[student-card-init:public, flip-enter:public:delay-1000] | a:[scoop-enter:set:(dur:800ms#func:cubic-bezier(0#0.2#0.3#1)):in]">
					<svg viewBox="0 0 240 150">
						<rect x="0" y="0" width="240" height="150" fill="none"></rect>
					</svg>
					<div class="school-id-front"
						init-default
						when-flip-enter="p:[transform:rotateY(0deg):rotateX(180deg):300:easeInOutSine]"
						when-flip-leave="p:[transform:rotateY(180deg):rotateX(0deg):300:easeInOutSine]">
						<div class="school-id-bg" style="background-image: url('/shared/images/uc-berkeley.svg')"></div>
						<div class="school-id-top" style="background: #003262;">
							<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
								init-with="p-op"
								when-student-card-init="a:[icon-enter:set:(dur:1000ms#func:cubic-bezier(0#0.2#0.3#1)):in:delay-450]"></span>
						</div>
						<div class="school-id-bottom">
							<div class="school-id-details">
								<h1 class='lettercase'
									init-with="p:[op:0, tro:center top]"
									when-student-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-150]">Marco Polo</h1>
								<h2 init-with="p-op"
									when-student-card-init="p:[opacity:0:1:800:easeInSine]:delay-150">UC Berkeley</h2>
								<h2 init-with="p-op"
									when-student-card-init="p:[opacity:0:1:800:easeInSine]:delay-150">Freshman</h2>
							</div>
							<h3 class="school-id-courses">
								<span init-with="p-op"
									when-student-card-init="p:[opacity:0:1:800:easeInSine]:delay-150">SELECTED COURSES</span>
								<span style="background: #003262;"
									init-with="p:[op:0, tro:left center]"
									when-student-card-init="a:[bounceIn-rotate-subtle:set:(dur:1000ms#func:linear):in:delay-350]">9</span>
								<a init-with="p-op"
									when-student-card-init="p:[opacity:0:1:800:easeInSine]:delay-150"><span>Edit</span></a>
							</h3>
						</div>
					</div>
					<div class="school-id-back"
						init-with="p:[tr:rotateY(180deg)]"
						when-flip-enter="p:[transform:rotateY(180deg):rotateX(0deg):300:easeInOutSine]"
						when-flip-leave="p:[transform:rotateY(0deg):rotateX(180deg):300:easeInOutSine]">
						<div class="school-id-bar"></div>
						<div class="school-id-info">
							<ul>
								<li>
									<div class="school-id-email">student@cal.edu</div>
									<div class="school-id-pw">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
								</li>
								<li>
									<div class="school-id-access">
										<div style="background: #003262;"></div>
										<span>UGURU123</span>
									</div>
								</li>
							</ul>
							<div class="school-id-bar-code" ng-include="root.base_url + 'shared/templates/components/svg/other/barcode.html'"></div>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</projector>
</div>
