<div class="perspective-container full-xy flex-center p15xy" types='fixed, add' default-type="fixed">
	<div class="money-tile" ng-if='activeType === "add"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">
		<svg viewBox="0 0 100 100"
			init-default
			when-money-click="send:[money-input:public]:delay-250">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<a class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'"
			init-with="p:[z-index:100]"
			on-click="send:[money-click:public]"
			when-money-click="p:[z-index:-99:delay-50, display:none:delay-250]"></a>
		<div class="money-input" init-with="p-op"
			when-money-input="p:[opacity:0:1:250:easeOutSine, z-index:99]">
			<div init-with="p:[tro:left center, tr:scaleX(0)]"
				when-money-input="p:[transform:scaleX(0):scaleX(1):250:easeOutSine]"></div>
			<div init-with="p:[tro:top center, tr:scaleY(0)]"
				when-money-input="p:[transform:scaleY(0):scaleY(1):250:easeOutSine]:delay-250"></div>
			<div init-with="p:[tro:right center, tr:scaleX(0)]"
				when-money-input="p:[transform:scaleX(0):scaleX(1):250:easeOutSine]"></div>
			<div init-with="p:[tro:bottom center, tr:scaleY(0)]"
				when-money-input="p:[transform:scaleY(0):scaleY(1):250:easeOutSine]:delay-250"></div>
			<span>$</span>
			<div><input type="tel" placeholder="24"/><hr/></div>
		</div>
	</div>

	<div class="money-tile" ng-if='activeType === "fixed"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-300]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<input type="checkbox" class="money-checkbox"/>
		<div class="money-text">$1</div>
	</div>
</div>
