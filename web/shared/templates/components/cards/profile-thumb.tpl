<div class="perspective-container full-xy flex-center p15xy" types='36, 48, 64, 72, 96, 128' default-type="128">
	<!-- problem with bounceIn-subtle + icon-rotate-enter animation -->
	<div class="pf-thumb-36 pf-moola" ng-show='activeType === "36"'
		error u init-with="p:[opacity:0]"
		on-init="s:[36:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-36="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=72"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-36="a:[icon-rotate-enter:1000:linear:100:1:f]"></span>
	</div>

	<div class="pf-thumb-48 pf-moola" ng-show='activeType === "48"'
		error u init-with="p:[opacity:0]"
		on-init="s:[48:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-48="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=96"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-48="a:[icon-rotate-enter:1000:linear:100:1:f]"></span>
	</div>

	<div class="pf-thumb-64 pf-moola" ng-show='activeType === "64"'
		error u init-with="p:[opacity:0]"
		on-init="s:[64:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-64="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=128"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-64="a:[icon-rotate-enter:1000:linear:100:1:f]"></span>
	</div>

	<div class="pf-thumb-72 pf-moola" ng-show='activeType === "72"'
		error u init-with="p:[opacity:0]"
		on-init="s:[72:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-72="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=144"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-72="a:[icon-rotate-enter:1000:linear:100:1:f]"></span>
	</div>

	<div class="pf-thumb-96 pf-moola" ng-show='activeType === "96"'
		error u init-with="p:[opacity:0]"
		on-init="s:[96:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-96="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=192"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-96="a:[icon-rotate-enter:1000:linear:100:1:f]"></span>
	</div>

	<div class="pf-thumb-128 pf-moola" ng-show='activeType === "128"'
		error u init-with="p:[opacity:0]"
		on-init="s:[128:children:50] | a:[bounceIn-subtle:1000:linear:0:1:f]">
		<div class="top"
			u init-with="p:[transform:scaleY(0), transform-origin:center top]"
			when-128="a:[scaleY:0:1:450:easeOutBack:0:1:f]"></div>
		<span class="user-icon" bg-image="https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=256"
			u init-with="p:[transform:scale(0), transform-origin:center top]"
			when-128="a:[icon-enter:1000:linear:100:1:f]"></span>
	</div>
</div>
