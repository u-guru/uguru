<div class="full-xy flex-center" types='default, time-period, round, white-round' default-type="time-period" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">
	<div class="toggle" ng-if='activeType === "default"'>
		<input type="checkbox" checked />
		<label>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
		</label>
	</div>

	<div class="toggle-container state-onload" ng-if='activeType === "time-period"'>
		<div class="toggle am-pm">
			<input type="checkbox"/>
			<label>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<span>
					<span class="am">AM</span>
					<span class="pm">PM</span>
				</span>
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</label>
		</div>
		<!-- <div class="toggle-label">onLoad</div> -->
	</div>

	<div class="toggle round" ng-if='activeType === "round"'>
		<input type="checkbox" checked />
		<label>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
		</label>
	</div>

	<div class="toggle white-round" ng-if='activeType === "white-round"'>
		<input type="checkbox" checked />
		<label>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<svg class="square" viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
		</label>
	</div>
</div>
