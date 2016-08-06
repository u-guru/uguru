<div class="perspective-container full-xy flex-wrap-center" types='default, ghost-round, ghost-square, split' default-type="default" reference="http://codepen.io/teamuguru/pen/6018db762fec392ead23dceab1584aab?editors=1100">
	<button class="btn-default bg-moxie radius-2 normal p30x" ng-if='activeType === "default"'>
		<span></span><span></span>
		<span></span><span></span>
		<span></span>
		<span>Default button</span>
	</button>

	<button class="btn-ghost-round btn-ghost-white" ng-if='activeType === "ghost-round"'>
		<span></span><span></span><span>
		</span><span></span>
		<span></span>
		<span>Ghost round</span>
	</button>

	<button class="btn-ghost-sq btn-ghost-white" ng-if='activeType === "ghost-square"'>
		<span></span><span></span><span>
		</span><span></span>
		<span></span>
		<span>Ghost square</span>
	</button>

	<button class="btn-split-slate" ng-if='activeType === "split"'>
		<span>Split button</span>
		<span>$80</span>
	</button>
</div>
