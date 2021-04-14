<div class="perspective-container full-xy flex-center p15xy" types='fixed, add' default-type="fixed">
	<div class="money-tile" ng-if='activeType === "add"'
		u init-with="p:[opacity:0]"
		on-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<svg viewBox="0 0 100 100"
			init-default
			when-money-click="s:[money-input:public]:delay-250">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<a class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'"
			init-with="p:[z-index:100]"
			on-click="s:[money-click:public]"
			when-money-click="p:[z-index:-99:delay-50, display:none:delay-250]"></a>
		<div class="money-input" u init-with="p:[opacity:0]"
			when-money-input="p:[z-index:99] | a:[opacity:0:1:250:easeOutSine:0:1:f]">
			<div u init-with="p:[transform-origin:left center, scaleX:0]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[transform-origin:top center, scaleY:0]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<div u init-with="p:[transform-origin:right center, scaleX:0]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[transform-origin:bottom center, scaleY:0]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<span>$</span>
			<div><input type="tel" placeholder="24"/><hr/></div>
		</div>
	</div>

	<div class="money-tile" ng-if='activeType === "fixed"'
		u init-with="p:[opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:300:1:f]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<input type="checkbox" class="money-checkbox"/>
		<div class="money-text">$1</div>
	</div>
</div>
