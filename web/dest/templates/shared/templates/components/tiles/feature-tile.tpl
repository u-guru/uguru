<div class="perspective-container full-xy flex-center p15xy">
	<div class="feature-tile"
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[bounceIn-subtle:set:(dur:1200ms#func:linear):in]"
		on-mouse-enter="p:[background:rgba(99#112#116#0.2), t:all 150ms ease-in] | send:[icon-wiggle:public]"
		on-mouse-leave="p:[background:rgba(99#112#116#1), t:all 150ms ease-out]">
		<div class="feature-tile-icon">
			<div class="feature-tile-type bg-lake" ng-include="root.base_url + 'shared/templates/components/svg/main/experience.html'"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-1250]"
				when-icon-wiggle="a:[wiggle-subtle:set:(dur:1000ms#func:linear):in]"></div>
			<div class="feature-tile-thumb">
				<svg class="bg-white" viewBox="0 0 120 100"
					init-with="p-op"
					on-init="t-enter"
					on-enter="a:[fadeIn:set:(dur:1000ms#func:ease-out):in:delay-250]">
					<rect x="0" y="0" width="120" height="100" fill="#40484B"
						init-with="p-op"
						on-init="t-enter"
						on-enter="a:[fadeInLeft::set:(dur:800ms#func:ease-out):in:delay-500]"></rect>
					<rect x="0" y="0" width="40" height="100" fill="#7872e3"
						init-with="p-op"
						on-init="t-enter"
						on-enter="a:[fadeInLeft:set:(dur:400ms#func:ease-out):in:delay-650]"></rect>
				</svg>
			</div>
		</div>
		<div class="feature-tile-text">
			<h2
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[fadeIn:set:(dur:1000ms#func:ease-out):in:delay-650]">Guru Shops</h2>
			<p
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[fadeIn:set:(dur:500ms#func:ease-out):in:delay-850]">Lorem ipsum dolor sit amet, banana adipiscing </p>
		</div>
	</div>
</div>
