<div class="perspective-container full-xy flex-center" types='default, time-period, round, white-round' default-type="round" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">

	<div class="toggle-container" ng-if='activeType === "default"'>
		<div class="toggle normal">
			<input type="checkbox" checked/>
			<label>
				<div u init-with="p-op"
					when-toggle-enter="a:[opacity:0:1:400:easeOutCubic:200:1:f] | s:[fill-toggle:children:400]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						u init-with="p:[sdo:88, sda:88, fill-opacity:0]"
						when-end-outline="a:[stroke-dashoffset:88:0:450:easeOutSine:200:1:f]"
						when-fill-toggle="a:[fill-opacity:0:1:500:easeOutQuad:400:1:f]"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>

				<div u init-with="p:[op:1]"
					on-init="send:[outline-enter:children:linear-500, end-outline:depth(0):300]"
					when-end-outline="a:[opacity:1:0:500:linear:0:1:f]| send:[toggle-enter:siblings:300, outline-enter:children:linear-500]">
					<div u init-with="p:[tr:scaleX(0)]"
						when-outline-enter="a:[scaleX:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-outline-enter="a:[scaleY:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
						when-outline-enter="a:[scaleX:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-outline-enter="a:[scaleY:0:1:50:easeOutQuad:0:1:f]"></div>
				</div>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "time-period"'
		u
		on-init="send:[input-load:>children,input-enter:>children:450]"
		on-click="send:[pm-exit:public]">
		<div class="toggle am-pm">
			<input type="checkbox"/>
			<label>
				<div u init-with="p-op"
					when-input-enter="a:[opacity:0:1:400:easeOutCubic:200:1:f]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						u init-with="p:[sdo:88, sda:88, fill-opacity:0]"
						when-input-load="a:[stroke-dashoffset:88:0:600:easeOutExpo:0:1:f]"
						when-input-enter="a:[fill-opacity:0:1:500:easeOutExpo:0:1:f]"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>
				<span u init-with="p-op"
					when-input-enter="a:[opacity:0:1:750:easeOutSine:0:1:f]:delay-600">
					<span class="am">AM</span>
					<span class="pm">PM</span>
				</span>
				<div u init-with="p:[op:1]"
					when-input-load="a:[opacity:1:0:800:linear:0:1:f]:delay-200 |s:[time-draw:children:easeInCubic-450]">
					<div u init-with="p:[tr:scaleX(0)]"
						when-time-draw="a:[scaleX:0:1:50:easeOutQuad:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-time-draw="a:[scaleY:0:1:50:easeOutQuad:0:1:f]:delay-50"></div>
					<div u init-with="p:[tr:scaleX(0)]"
						when-time-draw="a:[scaleX:0:1:50:easeOutQuad:0:1:f]:delay-200"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-time-draw="a:[scaleY:0:1:50:easeOutQuad:0:1:f]:delay-250"></div>
				</div>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "round"'
		u
		on-init="send:[round-load:depth(2), round-enter:>children:350]">
		<div class="toggle round">
			<input type="checkbox" checked />
			<label>
				<div u init-with="p-op"
					when-round-enter="a:[opacity:0:1:750:easeOutQuad:400:1:f]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						u init-with="p:[fop:0, sdo:0, sda:81]"
						when-round-load="a:[draw:0:1:500:easeOutQuad:300:1:f]"
						when-round-enter="a:[fill-opacity:0:1:500:linear:0:1:f]"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36"
					u when-round-enter="p:[op:0]:delay-400">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						u init-with="p:[fop:0, sdo:0, sda:1]"
						when-round-load="a:[draw:0:1:450:easeOutQuad:0:1:f, fill-opacity:1:0:450:easeOutQuad:400:1:f]"></rect>
				</svg>
			</label>
		</div>
	</div>


	<div class="toggle-container" ng-if='activeType === "white-round"'
		u on-init="send:[round-load:children:100, round-enter:children:750]">
		<div class="toggle white-round">
			<input type="checkbox" checked />
			<label>
				<div u init-with="p-op"
					when-round-enter="a:[opacity:0:1:550:easeInOutCubic:0:1:f]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
					u init-with="p:[fop:0, sdo:82, sda:82]"
					when-round-load="a:[stroke-dashoffset:82:0:400:easeOutQuad:200:1:f]"
					when-round-enter="a:[fill-opacity:0:1:500:linear:0:1:f]"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						u init-with="p:[fop:0, sdo:308, sda:308]"
						when-round-load="a:[stroke-dashoffset:308:0:400:easeOutQuad:0:1:f, fill-opacity:1:0:450:easeOutQuad:400:1:f]"></rect>
				</svg>
			</label>
		</div>
	</div>
</div>
