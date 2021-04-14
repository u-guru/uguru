<div class="perspective-container full-xy flex-center p15xy" types='left-hover, bottom-hover, top-default, right-default' default-type="bottom-hover">
	<a class="badge-container click" ng-if='activeType === "left-hover"'>
		<span class="badge-left bg-moxie"
			init-with="p:[op:0, color:rgba(255#255#255#0)]"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | p:[tro:right center,color:rgba(255#255#255#1):delay-200,t:color 250ms ease-out]">1</span>
		<span
			init-with="p-op"
			on-init="a:[fadeIn:set:(dur:250ms#func:ease-out):in]">Messages</span>
	</a>

	<a class="badge-container click" ng-if='activeType === "bottom-hover"'>
		<span
			init-with="p-op"
			on-init="a:[fadeIn:set:(dur:250ms#func:ease-out):in]">Students</span>
		<span class="badge-bottom bg-robin"
			init-with="p:[op:0, color:rgba(255#255#255#0)]"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | p:[tro:center top,color:rgba(255#255#255#1):delay-200,t:color 250ms ease-out]">4</span>
	</a>

	<div class="badge-container" ng-if='activeType === "top-default"'>
		<span class="badge-top bg-orange"
			init-with="p:[op:0, color:rgba(255#255#255#0)]"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | p:[tro:center bottom,color:rgba(255#255#255#1):delay-200,t:color 250ms ease-out]">6</span>
		<span
			init-with="p-op"
			on-init="a:[fadeIn:set:(dur:250ms#func:ease-out):in]">Reviews</span>
	</div>

	<div class="badge-container" ng-if='activeType === "right-default"'>
		<span
			init-with="p-op"
			on-init="a:[fadeIn:set:(dur:250ms#func:ease-out):in]">Gurus</span>
		<span class="badge-right bg-cobalt"
			init-with="p:[op:0, color:rgba(255#255#255#0)]"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in] | p:[tro:left center,color:rgba(255#255#255#1):delay-200,t:color 250ms ease-out]">3</span>
	</div>
</div>
