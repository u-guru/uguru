<div class="perspective-container full-xy flex-center" types='default, time-period, round, white-round' default-type="default" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">
	<div class="toggle-container" ng-if='activeType === "default"'
		init-default
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public:delay-450]">
		<div class="toggle normal">
			<input type="checkbox" checked/>
			<label>
				<div init-with="p-op"
					when-input-enter="p:[opacity:0:1:750:easeOutSine]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						init-with="p:[fop:0, sdo:88, sda:88]"
						when-input-load="p:[stroke-dashoffset:88:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:0:1:750:easeOutSine]:delay-500"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>

				<div init-with="p:[op:1]"
					when-input-enter="p:[opacity:1:0:750:easeOutSine]:delay-500">
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-150"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-300"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-450"></div>
				</div>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "time-period"'
		init-default
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public:delay-450]"
		on-click="send:[pm-exit:public]">
		<div class="toggle am-pm">
			<input type="checkbox"/>
			<label>
				<div init-with="p-op"
					when-input-enter="p:[opacity:0:1:750:easeOutSine]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						init-with="p:[fop:0, sdo:88, sda:88]"
						when-input-load="p:[stroke-dashoffset:88:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:0:1:750:easeOutSine]:delay-500"></rect>
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
					when-input-enter="p:[opacity:1:0:750:easeOutSine]:delay-500">
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-150"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-300"></div>
					<div init-with="p:[tr:scale(0)]"
						when-input-load="p:[transform:scale(0):scale(1):150:easeOutSine]:delay-450"></div>
				</div>
			</label>
		</div>
		<!-- <div class="toggle old-label">onLoad</div> -->
	</div>

	<div class="toggle-container" ng-if='activeType === "round"'
		init-default
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public:delay-450]">
		<div class="toggle round">
			<input type="checkbox" checked />
			<label>
				<!-- @samir opacity and fill-opacity don't animate at the same time despite having the same syntax
					see line 87 and line 92 -->
				<div init-with="p-op"
					when-input-enter="p:[opacity:0:1:750:easeOutSine]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						init-with="p:[fop:0, sdo:82, sda:82]"
						when-input-load="p:[stroke-dashoffset:82:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:0:1:750:easeOutSine]:delay-500"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36"
					init-default
					when-input-enter="p:[op:0:delay-500]">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:225, sda:225]"
						when-input-load="p:[stroke-dashoffset:225:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:1:0:750:easeOutSine]:delay-500"></rect>
				</svg>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "white-round"'
		init-default
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public:delay-450]">
		<div class="toggle white-round">
			<input type="checkbox" checked />
			<label>
				<div init-with="p-op"
					when-input-enter="p:[opacity:0:1:750:easeOutSine]:delay-500"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						init-with="p:[fop:0, sdo:82, sda:82]"
						when-input-load="p:[stroke-dashoffset:82:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:0:1:750:easeOutSine]:delay-500"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:225, sda:225]"
						when-input-load="p:[stroke-dashoffset:225:0:450:easeOutSine]"
						when-input-enter="p:[fill-opacity:1:0:750:easeOutSine]:delay-500"></rect>
				</svg>
			</label>
		</div>
	</div>
</div>
