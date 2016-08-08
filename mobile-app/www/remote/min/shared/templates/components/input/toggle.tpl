<div class="perspective-container full-xy flex-center" types='default, time-period, round, white-round' default-type="default" reference="http://codepen.io/teamuguru/pen/6ddde9fa7dbff14ae4124d45341be8c5?editors=1100">
	<div class="toggle-container" ng-if='activeType === "default"'>
		<div class="toggle normal">
			<input type="checkbox" checked />
			<label>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "time-period"'>
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
		<!-- <div class="toggle old-label">onLoad</div> -->
	</div>

	<div class="toggle-container" ng-if='activeType === "round"'>
		<div class="toggle round">
			<input type="checkbox" checked />
			<label>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"
						init-with="p:[op:0]"></rect>
				</svg>
			</label>
		</div>
	</div>

	<div class="toggle-container" ng-if='activeType === "white-round"'>
		<div class="toggle white-round">
			<input type="checkbox" checked />
			<label>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="square" viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<svg class="bg" width="72px" height="36px" viewBox="0 0 72 36">
				    <rect x="1" y="1" width="70" height="34" rx="17"></rect>
				</svg>
			</label>
		</div>
	</div>
</div>
