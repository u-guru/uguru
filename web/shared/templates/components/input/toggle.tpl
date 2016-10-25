<div class="perspective-container full-xy flex-center" types='default, time-period, round, white-round' default-type="round" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">
	<div class="toggle-container" ng-if='activeType === "default"'
		u
		on-init="send:[outline-enter:grandchildren:linear-500]">
		<div class="toggle normal">
			<input type="checkbox" checked/>
			<label>
				<div u init-with="p-op"
					when-toggle-enter="a:[opacity:0:1:400:easeOutCubic:200:1:f]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						u init-with="p:[sdo:88, sda:88, fill-opacity:0]"
						when-end-outline="a:[stroke-dashoffset:88:0:450:easeOutSine:200:1:f]"
						when-toggle-enter="a:[fill-opacity:0:1:500:easeOutQuad:400:1:f]"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>

				<div u init-with="p:[op:1]"
					when-end-outline="a:[opacity:1:0:500:linear:0:1:f]| send:[toggle-enter:public:300]">
					<!-- on-init="send:[toggle-enter:siblings:600]" -->
					<div u init-with="p:[tr:scaleX(0)]"
						when-outline-enter="a:[scaleX:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-outline-enter="a:[scaleY:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
						when-outline-enter="a:[scaleX:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-outline-enter="a:[scaleY:0:1:50:easeOutQuad:0:1:f] | send:[end-outline:public:300]"></div>
				</div>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "time-period"'
		u
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public]:delay-450"
		on-click="send:[pm-exit:public]">
		<div class="toggle am-pm">
			<input type="checkbox"/>
			<label>
				<div init-with="p-op"
					when-input-enter="a:[opacity:0:1:400:easeOutCubic:200:1:f]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						init-with="p:[sdo:88, sda:88, fill-opacity:0]"
						when-input-load="p:[stroke-dashoffset:88:0:1750:easeOutSine]"
						when-input-enter="p:[fill-opacity:0:1:500:easeOutExpo]:delay-500"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>
				<span init-with="p-op"
					when-input-enter="p:[opacity:0:1:750:easeOutSine]:delay-600">
					<span class="am">AM</span>
					<span class="pm">PM</span>
				</span>
				<div init-with="p:[op:1]"
					when-input-load="p:[opacity:1:0:800:linear]:delay-200">
					<div init-with="p:[tr:scale(0)]"
						when-input-load="a:[scale:0:1:50:easeOutQuad:0:1:f]"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="a:[scale:0:1:50:easeOutQuad:0:1:f]:delay-50"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="a:[scale:0:1:50:easeOutQuad:0:1:f]:delay-200"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="a:[scale:0:1:50:easeOutQuad:0:1:f]:delay-250"></div>
				</div>
			</label>
		</div>
		<!-- <div class="toggle old-label">onLoad</div> -->
	</div>

	<div class="toggle-container" ng-if='activeType === "round"'
		u
		on-init="send:[round-load:public]"
		when-round-load="send:[round-enter:public:delay-450]">
		<div class="toggle round">
			<input type="checkbox" checked />
			<label>
				<div init-with="p-op"
					when-round-enter="p:[opacity:0:1:750:easeOutQuad]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						init-with="p:[fop:0, sdo:0, sda:81]"
						when-round-load="p:[draw:0:1:500:easeOutQuad]:delay-300"
						when-round-enter="p:[fill-opacity:0:1:500:linear]:delay-100"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36"
					u
					when-round-enter="p:[op:0:delay-500]">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:0, sda:1]"
						when-round-load="p:[draw:0:1:450:easeOutQuad, fill-opacity:1:0:450:easeOutQuad:600]"></rect>
				</svg>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "white-round"'
		u
		on-init="send:[round-load:public]:delay-1000"
		when-round-load="send:[round-enter:public:delay-450]">
		<div class="toggle white-round">
			<input type="checkbox" checked />
			<label>
				<div init-with="p-op"
					when-round-enter="p:[opacity:0:1:750:easeOutSine]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<!-- @samir look here for multiple delay workaround. Ideally, get the one state working like this :
						when-round-load="p:[stroke-dashoffset:82:0:500:easeOutQuad:300, fill-opacityL0:1:500:linear:450]"-->
					<circle cx="13" cy="13" r="13"
					init-with="p:[fop:0, sdo:82, sda:82]"
					when-round-load="p:[stroke-dashoffset:82:0:500:easeOutQuad]:delay-300"
					when-round-enter="p:[fill-opacity:0:1:500:linear]"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:0, sda:0]"
						when-round-load="p:[stroke-dashoffset:0:1:450:easeOutQuad, fill-opacity:1:0:450:easeOutQuad:400]"></rect>
				</svg>
			</label>
		</div>
	</div>
</div>
