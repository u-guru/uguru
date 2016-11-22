<div class="perspective-container full-xy flex-center p15xy" types='fixed, add'>
	<!-- needs color directives -->
	<div class="money-tile" ng-show='activeType === "fixed"'
		u init-with="p:[op:0, tro:center center]"
		on-init="s:[money-tile-fixed:self:300]"
		when-money-tile-fixed="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<input type="checkbox" class="money-checkbox"/>
		<div class="money-text">$1</div>
	</div>

	<div class="money-tile" ng-show='activeType === "add"'
		u init-with="p:[opacity:0]"
		on-init="s:[money-tile-add:self:300, money-input:depth(>2):250]"
		when-money-tile-add="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<svg viewBox="0 0 100 100">
			<rect x="0" y="0" width="100" height="100"></rect>
		</svg>
		<a class="money-icon"
			u init-with="p:[z-index:100]"
			on-click="s:[money-click:public:50] | p:[z-index:-99]">
			<graphic url='shared/templates/components/svg/main/plus.html'></graphic>
		</a>
		<div class="money-input" u init-with="p:[op:0]"
			when-money-click="a:[opacity:0:1:250:easeOutSine:0:1:f] | p:[z-index:99]">
			<div u init-with="p:[tro:left center, tr:scaleX(0)]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[tro:top center, tr:scaleY(0)]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<div u init-with="p:[tro:right center, tr:scaleX(0)]"
				when-money-input="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
			<div u init-with="p:[tro:bottom center, tr:scaleY(0)]"
				when-money-input="a:[scaleY:0:1:250:easeOutSine:250:1:f]"></div>
			<span>$</span>
			<div><input type="tel" placeholder="24"/><hr/></div>
		</div>
	</div>

</div>
