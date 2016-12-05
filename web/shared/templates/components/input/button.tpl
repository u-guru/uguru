<div class="perspective-container full-xy flex-wrap-center" types='default, ghost-round, ghost-square, split' default-type="default" reference="http://codepen.io/teamuguru/pen/6018db762fec392ead23dceab1584aab?editors=1100">
	<button class="btn-default bg-moxie radius-2 p30x"  u
		init-with="p:[margin-top:-100px]"
		on-init="a:[margin-top:-100px:0px:500:easeOutSine:0:1:f]"
		ng-if='activeType === "default"'>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span>Default button</span>
	</button>

	<button class="btn-ghost-round bg-white" ng-if='activeType === "ghost-round"'
		u init-with="p:[op:0]"
		on-init="a:[bounceInUp-subtle:1000:linear:0:1:f]">
		<span></span>
		<span>Ghost round</span>
	</button>

	<button class="btn-ghost-square btn-ghost bg-white" ng-if='activeType === "ghost-square"'
		u on-init="s:[btn-ghost-sq-init:children:linear-750]">
		<span u init-with="p:[tr:scaleX(0)]"
			when-btn-ghost-sq-init="a:[scaleX:0:1:150:easeOutSine:0:1:f]"></span>
		<span u init-with="p:[tr:scaleY(0)]"
			when-btn-ghost-sq-init="a:[scaleY:0:1:150:easeOutSine:0:1:f]"></span>
		<span u init-with="p:[tr:scaleX(0)]"
			when-btn-ghost-sq-init="a:[scaleX:0:1:150:easeOutSine:0:1:f]"></span>
		<span u init-with="p:[tr:scaleY(0)]"
			when-btn-ghost-sq-init="a:[scaleY:0:1:150:easeOutSine:0:1:f]"></span>
		<span></span>
		<span u init-with="p:[op:0]"
			when-btn-ghost-sq-init="a:[opacity:0:1:100:easeOutSine:0:1:f]">Ghost square</span>
	</button>

	<button class="btn-split-slate" ng-if='activeType === "split"'>
		<span u init-with="p:[tr:scaleX(0), tro:center center]"
			on-init="a:[split-button:1000:linear:0:1:f]">
			<span u init-with="p:[op:0]"
				on-init="a:[opacity:0:1:500:easeInOutSine:1000:1:f]">Split button</span>
		</span>
		<span u init-with="p:[tr:scaleX(0), tro:center center]"
			on-init="a:[split-button:1000:linear:0:1:f]">
			<span u init-with="p:[op:0]"
				on-init="a:[opacity:0:1:500:easeInOutSine:1000:1:f]">$40</span>
		</span>
	</button>
</div>
