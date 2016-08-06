<div class="full-xy flex-center p15xy" types='left-hover, bottom-hover, top-default, right-default' default-type="left-hover">
	<a class="badge-container click" ng-if='activeType === "left-hover"'>
		<span class="badge-left bg-moxie">1</span>
		<span>Messages</span>
	</a>

	<a class="badge-container click" ng-if='activeType === "bottom-hover"'>
		<span>Students</span>
		<span class="badge-bottom bg-robin">4</span>
	</a>

	<div class="badge-container" ng-if='activeType === "top-default"'>
		<span class="badge-top bg-orange">6</span>
		<span>Reviews</span>
	</div>

	<div class="badge-container" ng-if='activeType === "right-default"'>
		<span>Gurus</span>
		<span class="badge-right bg-cobalt">3</span>
	</div>
</div>
