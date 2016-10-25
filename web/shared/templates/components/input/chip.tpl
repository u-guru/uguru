<div class="perspective-container full-xy flex-center p15xy" types='span, link, image, input' default-type="image">
	<span class="chip bg-moxie" ng-if='activeType === "span"'
		u init-with="p:[tr:scaleX(0), tro:center center]"
		on-init="a:[bounceInX:1000:easeOutSine:0:1:f]">
		<span u init-with="p-op"
			on-init="a:[opacity:0:1:500:easeOutSine:0:1:f]:delay-250">moxie tag</span>
	</span>

	<span class="chip chip-link bg bg-cobalt" ng-if='activeType === "link"'
		u init-with="p:[tr:scaleX() tro:center center]"
		on-init="s:[link-chip:self]"
		when-link-chip="a:[scaleInX-subtle:1000:linear:0:1:f]">
			<span u init-with="p-op"
				on-init="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-1250">cobalt tag</span>
	</span>
	<!-- Should be an a tag, but animation doesn't work as well on a tags -->

	<span class="chip chip-link bg bg-moola" ng-if='activeType === "image"'
		u init-with="p:[tr:scaleX(0), tro:center center]"
		on-init="a:[scaleInX-subtle:1200:easeOutSine:0:1:f]">
		<span class="user-icon-32" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=64);"
			u init-with="p-op"
			on-init="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-50"></span>
		<span u init-with="p-op"
			on-init="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-250">moola tag</span>
	</span>
	<input tabindex="1" ng-model='innerText' class='chip chip-input bg-slate txt-white' placeholder="tag input" size="7" ng-if='activeType === "input"'
		u init-with="p:[tr:scaleX(0), tro:center center]"
		on-init="a:[bounceInX:1000:easeOutSine:0:1:f]"/>
</div>
