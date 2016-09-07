<div class="perspective-container full-xy flex-center p15xy" types='span, link, image, input' default-type="image">
	<span class="chip bg-moxie" ng-if='activeType === "span"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1000ms#func:ease-out):in]">
		<span init-with="p-op"
			on-init="p:[opacity:0:1:500:easeOutSine]:delay-250">moxie tag</span>
	</span>
	<a class="chip chip-link bg bg-cobalt" ng-if='activeType === "link"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1000ms#func:ease-out):in]">
			<span init-with="p-op"
				on-init="p:[opacity:0:1:250:easeOutSine]:delay-250">cobalt tag</span>
	</a>
	<a class="chip chip-link bg bg-moola" ng-if='activeType === "image"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1200ms#func:ease-out):in]">
		<span class="user-icon-32" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=64);"
			init-with="p-op"
			on-init="p:[opacity:0:1:250:easeOutSine]:delay-50"></span>
		<span init-with="p-op"
			on-init="p:[opacity:0:1:250:easeOutSine]:delay-250">moola tag</span>
	</a>
	<input tabindex="1" ng-model='innerText' class='chip chip-input bg-slate txt-white' placeholder="tag input" size="7" ng-if='activeType === "input"'
		init-with="p-op"
		on-init="a:[bounceInX:set:(dur:1000ms#func:ease-out):in]"/>
</div>
