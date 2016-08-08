<div class="perspective-container full-xy flex-center" types='top, bottom, left, right, line-top, line-bottom, line-left, line-right' default-type="bottom" reference="http://codepen.io/teamuguru/pen/0962d66493f8814b2a2f2ed830548022?editors=1100">
	<div class="tooltip tooltip-top" ng-if='activeType === "top"'>
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot" ng-if='activeType === "bottom"'>
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-left" ng-if='activeType === "left"'>
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-right" ng-if='activeType === "right"'>
		<div>This is a tip.</div>
	</div>

	<div class="tooltip-line tooltip-top" ng-if='activeType === "line-top"'>
		<span></span>
		<div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<span>This is a tip with a button.</span>
			<button class="bg-moxie">Okay</button>
		</div>
	</div>

	<!-- make sure you put the transform-origins into the css (_notifications.scss) like you did for the other three! -->
	<div class="tooltip-line tooltip-bot" ng-if='activeType === "line-bottom"'>
		<span></span>
		<div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<span>This is a tip with a button.</span>
			<button class="bg-moxie">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-left" ng-if='activeType === "line-left"'>
		<span></span>
		<div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<span>This is a tip with a button.</span>
			<button class="bg-moxie">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-right" ng-if='activeType === "line-right"'>
		<span></span>
		<div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<div></div><div></div>
			<span>This is a tip with a button.</span>
			<button class="bg-moxie">Okay</button>
		</div>
	</div>
</div>
