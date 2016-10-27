<div class="perspective-container full-xy flex-center p15xy" types='fixed, add'>

	<div class="money-tile" ng-if='activeType === "fixed"'
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[money-tile-fixed:self:300]"
		when-money-tile-fixed="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<input type="checkbox" class="money-checkbox"/>
		<div class="money-text">$1</div>
	</div>

	<div class="money-tile" ng-if='activeType === "add"'
		u init-with="p:[opacity:0]"
		on-init="s:[money-tile-add:self:300, money-input:depth(>2):250]"
		when-money-tile-add="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<a class="money-icon"
			u init-with="p:[z-index:100]"
			on-click="s:[money-click:public]"
			when-money-click="p:[z-index:-99:delay-50, display:none:delay-250]">
			<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			    <path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</a>
		<div class="money-input" u init-with="p:[opacity:0]"
			when-money-input="p:[z-index:99] | a:[opacity:0:1:250:easeOutSine:0:1:f]">
			<div u init-with="p:[transform-origin:left center, transform:scaleX(0)]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[transform-origin:top center, transform:scaleY(0)]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<div u init-with="p:[transform-origin:right center, transform:scaleX(0)]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[transform-origin:bottom center, transform:scaleY(0)]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<span>$</span>
			<div><input type="tel" placeholder="24"/><hr/></div>
		</div>
	</div>

</div>
