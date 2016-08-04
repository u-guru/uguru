<div class="full-xy flex-center p15xy bg-slate">
	<ul class="p15-grid flex">
		<li>
			<div class="money-tile">
				<svg viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div class="money-text" init-with="p-op">$1</div>
				<div class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'"></div>
				<div class="money-input" init-with="p-op">
					<div></div><div></div><div></div><div></div>
					<span>$</span>
					<div><input type="tel" placeholder="24"/><hr/></div>
				</div>
			</div>
		</li>
		<li>
			<div class="money-tile">
				<svg viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div class="money-text" init-with="p-op">$1</div>
				<div class="money-icon" ng-include="root.base_url + 'shared/templates/components/svg/main/plus.html'" init-with="p-op"></div>
				<div class="money-input">
					<div></div><div></div><div></div><div></div>
					<span>$</span>
					<div><input type="tel" placeholder="24"/><hr/></div>
				</div>
			</div>
		</li>
		<li>
			<div class="money-tile">
				<svg viewBox="0 0 100 100">
					<rect x="0" y="0" width="100" height="100"></rect>
				</svg>
				<div class="money-text">$1</div>
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
