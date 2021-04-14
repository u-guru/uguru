<div class="perspective-container full-xy flex-center p15xy" types='span, link, image, input' default-type="image">
	<span class="chip bg-moxie" ng-if='activeType === "span"'
		init-with="p:[op:0, color:rgba(255#255#255#0)]"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in] | p:[color:rgba(255#255#255#1):delay-250, t:color 500ms ease-out]">moxie tag</span>
	<a class="chip chip-link bg bg-cobalt" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in]"
		on-click="p:[tr:translateZ(-40px), tr:translateZ(0):delay-250, t:all 350ms ease-out]">
			<span init-with="p-op"
				on-init="p:[op:1:delay-250, t:opacity 500ms ease-out]">cobalt tag</span>
	</a>
	<a class="chip chip-link bg bg-moola" ng-if='activeType === "image"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1200ms#func:ease-out):in]">
		<span class="user-icon-32" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=64);"></span>
		<span init-with="p-op"
			on-init="p:[op:1:delay-250, t:opacity 250ms ease-out]">moola tag</span>
	</a>
	<input tabindex="1" ng-model='innerText' class='chip chip-input bg-slate txt-white' placeholder="tag input" size="7" ng-if='activeType === "input"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1000ms#func:ease-out):in]"/>
</div>
