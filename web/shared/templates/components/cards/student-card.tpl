<div class="perspective-container full-xy flex-center p15xy" types='flip, short, link' default-type="flip">

	<div class="student-card" ng-if='activeType === "flip"'
		u init-with="p:[op:0]"
		on-init="s:[student-card-init:>children] | a:[scoop-enter:800:(0,0.2,0.3,1):0:1:f]"
		on-mouseenter="s:[flip-enter:children]"
		on-mouseleave="s:[flip-leave:children]">

		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-front"
			u when-flip-enter="a:[rotateY:0deg:180deg:300:easeInOutSine:0:1:f]"
			when-flip-leave="a:[rotateY:180deg:0deg:300:easeInOutSine:0:1:f]">
			<div class="school-id-bg" style="background-image: url('/shared/images/uc-berkeley.svg')"></div>
			<div class="school-id-top" style="background: #003262;">
				<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					u init-with="p:[transform:scale(0)]"
					when-student-card-init="a:[icon-enter:1000:(0,0.2,0.3,1):450:1:f]"></span>
			</div>
			<div class="school-id-bottom">
				<div class="school-id-details">
					<h1 class='lettercase'
						u init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:1000:linear:150:1:f]">Marco Polo</h1>
					<h2 u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150">UC Berkeley</h2>
					<h2 u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150">Freshman</h2>
				</div>
				<h3 class="school-id-courses">
					<span u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150">SELECTED COURSES</span>
					<span style="background: #003262;"
						u init-with="p:[op:0, tro:left center]"
						when-student-card-init="a:[bounceIn-rotate-subtle:1000:linear:350:1:f]">9</span>
					<a u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150"><span>Edit</span></a>
				</h3>
			</div>
		</div>
		<div class="school-id-back"
			u init-with="p:[tr:rotateY(180deg)]"
			when-flip-enter="a:[rotateY:180deg:0deg:300:easeInOutSine:0:1:f]"
			when-flip-leave="a:[rotateY:0deg:180deg:300:easeInOutSine:0:1:f]">
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
				<div class="school-id-bar-code">
					<svg viewBox="0 0 234 28">
						<g fill="#40484b" style="fill: #003262;">
							<rect class="b52" x="225" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b51" x="217" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b50" x="214" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b49" x="211" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b48" x="205" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b47" x="201" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b46" x="198" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b45" x="196" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b44" x="194" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b43" x="188" y="0" width="3" height="28" rx="1"></rect>
							<rect class="b42" x="185" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b41" x="183" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b40" x="177" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b39" x="173" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b38" x="169" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b37" x="165" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b36" x="158" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b35" x="154" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b34" x="150" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b33" x="144" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b32" x="138" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b31" x="134" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b30" x="130" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b29" x="124" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b28" x="119" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b27" x="116" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b26" x="113" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b25" x="109" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b24" x="102" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b23" x="98" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b22" x="96" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b21" x="90" y="0" width="3" height="28" rx="1"></rect>
							<rect class="b20" x="87" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b19" x="85" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b18" x="79" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b17" x="75" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b16" x="71" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b15" x="67" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b14" x="60" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b13" x="56" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b12" x="52" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b11" x="46" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b10" x="40" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b9" x="36" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b8" x="32" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b7" x="26" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b6" x="21" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b5" x="18" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b4" x="15" y="0" width="2" height="28" rx="1"></rect>
							<rect class="b3" x="11" y="0" width="1" height="28" rx="0.5"></rect>
							<rect class="b2" x="4" y="0" width="4" height="28" rx="1"></rect>
							<rect class="b1" x="0" y="0" width="2" height="28" rx="1"></rect>
						</g>
					</svg>
				</div>
			</div>
		</div>
	</div>

	<div class="student-card short" ng-if='activeType === "short"'>
		<svg width="240px" height="50px" viewBox="0 0 240 50">
			<rect fill="none" x="0" y="0" width="240" height="50"></rect>
		</svg>
		<div class="school-id-list">
			<div class="school-id-color" style="background: #003262;">
				<span class="user-icon" style="background-color: transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"></span>
			</div>
			<ul>
				<li>
					<div class="school-id-name">
						<h1>Marco Polo</h1>
					</div>
				</li>
				<li>
					<div class="school-id-details">
						<h2>UC Berkeley</h2>
						<h2>Freshman</h2>
					</div>
				</li>
				<li>
					<div>
						<h3 class="school-id-courses">
							<span>COURSES</span>
							<span style="background: #003262;">9</span>
							<a><span>Edit</span></a>
						</h3>
					</div>
				</li>
				<li>
					<div class="school-id-login">
						<div class="school-id-email">student@cal.edu</div>
						<div class="school-id-pw">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
					</div>
				</li>
				<li>
					<div>
						<div class="school-id-access">
							<div style="background: #003262;"></div>
							<span>UGURU123</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<a class="student-card with-hover" ng-if='activeType === "link"'
		u init-with="p:[op:0]"
		on-init="s:[student-card-init:>children:350, student-link:self]"
		when-student-link="a:[scoop-enter:1000:linear:0:1:f]">

		<svg viewBox="0 0 240 150">
			<rect x="0" y="0" width="240" height="150" fill="none"></rect>
		</svg>
		<div class="school-id-inside">
			<div class="school-id-top" style="background: #003262;">
				<span class="user-icon" style="background-color:transparent; border-color: #003262; background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg');"
					u init-with="p:[transform:scale(0)]"
					when-student-card-init="a:[icon-enter:1000:(0,0.2,0.3,1):450:1:f]"></span>
			</div>
			<div class="school-id-bottom">
				<div>
					<h1 class='lettercase' style="color: #003262;"
						u init-with="p:[op:0, tro:center top]"
						when-student-card-init="a:[bounceIn-subtle:1000:linear:150:1:f]">Marco Polo</h1>
					<h2 style="color: #003262;"
						u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150">Cal Freshman</h2>
					<h2 style="color: #003262;"
						u init-with="p:[op:0]"
						when-student-card-init="a:[opacity:0:1:800:easeInSine:0:1:f]:delay-150">email@school.edu</h2>
				</div>
			</div>
		</div>
		<!-- <div class="school-id-hover" tabindex>
			<span style="background: #003262;"></span>
			<div>
				Content can go in here.
			</div>
		</div> -->
	</a>
</div>
