<div class="perspective-container full-xy flex-center p15xy" types='left-hover, bottom-hover, top-default, right-default' default-type="right-default">
	<a class="badge-container click" ng-if='activeType === "left-hover"'
		u on-init="s:[badge-left:depth(>1)]">
		<span class="badge-left bg-moxie"
			u init-with="p:[tro:right center, op:0]"
			when-badge-left="a:[bounceIn-rotate-subtle:1000:linear:250:1:f]">
			<span u init-with="p:[op:0]"
				when-badge-left="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-450">1</span>
		</span>
		<span u init-with="p:[op:0]"
			when-badge-left="a:[bounceInRight-subtle:1000:linear:0:1:f]">Messages</span>
	</a>

	<a class="badge-container click" ng-if='activeType === "bottom-hover"'
		u on-init="s:[badge-bot:depth(>1)]">
		<span u init-with="p:[op:0]"
			when-badge-bot="a:[bounceInDown-subtle:1000:linear:0:1:f]">Students</span>
		<span class="badge-bottom bg-robin"
			u init-with="p:[tro:center top, op:0]"
			when-badge-bot="a:[bounceIn-rotate-subtle:1000:linear:250:1:f]">
			<span u init-with="p:[op:0]"
				when-badge-bot="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-450">4</span>
		</span>
	</a>

	<div class="badge-container" ng-if='activeType === "top-default"'
		u on-init="s:[badge-top:depth(>1)]">
		<span class="badge-top bg-orange"
			u init-with="p:[tro:center bottom, op:0]"
			when-badge-top="a:[bounceIn-rotate-subtle:1000:linear:250:1:f]">
			<span u init-with="p:[op:0]"
				when-badge-top="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-450">6</span>
		</span>
		<span u init-with="p:[op:0]"
			when-badge-top="a:[bounceInUp-subtle:1000:linear:0:1:f]">Reviews</span>
	</div>

	<div class="badge-container" ng-if='activeType === "right-default"'
		u on-init="s:[badge-right:depth(>1)]">
		<span u init-with="p:[op:0]"
			when-badge-right="a:[bounceInLeft-subtle:1000:linear:0:1:f]">Gurus</span>
		<span class="badge-right bg-cobalt"
			u init-with="p:[tro:left center, op:0]"
			when-badge-right="a:[bounceIn-rotate-subtle:1000:linear:250:1:f]">
			<span u init-with="p:[op:0]"
				when-badge-right="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-450">3</span>
		</span>
	</div>
</div>
