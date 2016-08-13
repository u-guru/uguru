<div class="perspective-container full-xy flex-center" types='default, time-period, round, white-round' default-type="default" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">
	<div class="toggle-container" ng-if='activeType === "default"'
		init-default
		on-init="send:[input-load:public]"
		when-input-load="send:[input-enter:public:delay-450]">
		<div class="toggle normal">
			<input type="checkbox" checked/>
			<label>
				<div init-with="p:[op:0]"
					when-input-enter="p:[op:1:delay-500, t:opacity 750ms ease-out]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						init-with="p:[fop:0, sdo:88, sda:88]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>
				<div>
					<div init-with="p:[background:rgba(67#203#157#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(67#203#157#1), tr:scale(1), t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(67#203#157#0):delay-500]"></div>
					<div init-with="p:[background:rgba(67#203#157#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(67#203#157#1), tr:scale(1):delay-150, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(67#203#157#0):delay-500]"></div>
					<div init-with="p:[background:rgba(67#203#157#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(67#203#157#1), tr:scale(1):delay-300, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(67#203#157#0):delay-500]"></div>
					<div init-with="p:[background:rgba(67#203#157#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(67#203#157#1), tr:scale(1):delay-450, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(67#203#157#0):delay-500]"></div>
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
				<div init-with="p:[op:0]"
					when-input-enter="p:[op:1:delay-500, t:opacity 750ms ease-out]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"
						init-with="p:[fop:0, sdo:88, sda:88]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></rect>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<rect x="2" y="2" width="22" height="22"></rect>
				</svg>
				<span init-with="p-op"
					when-input-enter="p:[op:1:delay-600, t:opacity 750ms ease-out#transform 150ms ease-in-out]">
					<span class="am">AM</span>
					<span class="pm">PM</span>
				</span>
				<div>
					<div init-with="p:[background:rgba(69#100#119#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(69#100#119#1), tr:scale(1), t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(69#100#119#0):delay-500]"></div>
					<div init-with="p:[background:rgba(69#100#119#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(69#100#119#1), tr:scale(1):delay-150, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(69#100#119#0):delay-500]"></div>
					<div init-with="p:[background:rgba(69#100#119#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(69#100#119#1), tr:scale(1):delay-300, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(69#100#119#0):delay-500]"></div>
					<div init-with="p:[background:rgba(69#100#119#0),tr:scale(0)]"
						when-input-load="p:[background:rgba(69#100#119#1), tr:scale(1):delay-450, t:transform 150ms ease-out]"
						when-input-enter="p:[background:rgba(69#100#119#0):delay-500]"></div>
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
				<div init-with="p:[op:0]"
					when-input-enter="p:[op:1:delay-500, t:opacity 750ms ease-out]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						init-with="p:[fop:0, sdo:82, sda:82]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36"
					init-default
					when-input-enter="p:[op:0:delay-500ms]">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:225, sda:225]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></rect>
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
				<div init-with="p:[op:0]"
					when-input-enter="p:[op:1:delay-500, t:opacity 750ms ease-out]"></div>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"
						init-with="p:[fop:0, sdo:82, sda:82]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></circle>
				</svg>
				<svg class="square" viewBox="0 0 26 26">
					<circle cx="13" cy="13" r="13"></circle>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[fop:0, sdo:225, sda:225]"
						when-input-enter="p:[fop:1:delay-250, sdo:0, t:stroke-dashoffset 450ms ease-in#fill-opacity 250ms ease-in]"></rect>
				</svg>
			</label>
		</div>
	</div>
</div>
