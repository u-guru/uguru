<div class="perspective-container full-xy flex-center p15xy bg-slate">
	<ul class="p15-grid flex">
		<li init-with="p-op"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]"
			on-mouse-enter="send:[money-mouse-enter:public]"
			on-mouse-leave="send:[money-mouse-leave:public]"
			on-click="send:[money-click:public]">
			<div class="money-tile">
				<svg viewBox="0 0 100 100"
					init-default
					when-money-mouse-enter="p:[background:#43cb9d]"
					when-money-mouse-leave="p:[background:#2b2324]"
					when-money-click="p:[background:#428a74] | send:[money-input:public]:delay-250"
					when-money-input="p:[op:0, z-index:-99, t: all 150ms ease-in-out]">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div class="money-text" init-with="p-op">$1</div>
				<div class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'"
					init-with="p:[tr:scale(1)]"
					when-money-mouse-leave="p:[tr:scale(1), t:all 250ms linear]"
					when-money-click="p:[tr:scale(0.9), t:all 250ms linear]"></div>
				<div class="money-input" init-with="p-op"
					when-money-input="p:[op:1, z-index:99, t: all 150ms ease-in-out]">
					<div init-with="p:[tro: left center, tr:scaleX(0)]"
					when-money-input="p:[tr:scaleX(1), t: all 250ms ease-out]"></div>
					<div init-with="p:[tro: top center, tr:scaleY(0)]"
						when-money-input="p:[tr:scaleY(1):delay-250, t: all 250ms ease-out]"></div>
					<div init-with="p:[tro: right center, tr:scaleX(0)]"
						when-money-input="p:[tr:scaleX(1), t: all 250ms ease-out]"></div>
					<div init-with="p:[tro: bottom center, tr:scaleY(0)]"
						when-money-input="p:[tr:scaleY(1):delay-250, t: all 250ms ease-out]"></div>
					<span>$</span>
					<div><input type="tel" placeholder="24"/><hr/></div>
				</div>
			</div>
		</li>

		<li init-with="p-op"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-300]"
			on-mouse-enter="send:[money-mouse-enter-3:public]"
			on-mouse-leave="send:[money-mouse-leave-3:public]"
			on-click="send:[money-click-3:public]">
			<div class="money-tile">
				<svg viewBox="0 0 100 100"
					init-default
					when-money-mouse-enter-3="p:[background:#43cb9d]"
					when-money-mouse-leave-3="p:[background:#2b2324]"
					when-money-click-3="p:[background:#428a74]">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div class="money-text"
					init-with="p:[tr:scale(1)]"
					when-money-mouse-leave-3="p:[tr:scale(1), t:all 250ms linear]"
					when-money-click-3="p:[tr:scale(1.1), t:all 250ms linear]">$1</div>
				<div class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'" init-with="p-op"></div>
				<div class="money-input" init-with="p-op">
					<div></div><div></div><div></div><div></div>
					<span>$</span>
					<div><input type="tel" placeholder="24"/><hr/></div>
				</div>
			</div>
		</li>
	</ul>
</div>
