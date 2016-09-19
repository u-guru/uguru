<div class="full-xy flex-center" types='guru, student' default-type="guru">
	<div class="full-xy bg-slate flex-center" ng-if='activeType === "guru"'>
		<div class="ticket-slider-container"
			init-with="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg), tro:left bottom]"
			on-init="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg):translateX(0%) rotateX(0deg) rotateY(0deg):750:easeInOutBack easeOutCubic easeOutCubic]">
			<div class="ticket-slider-inside guru">
				<div class="ticket-slider-bg"><div></div></div>
				<!-- <ion-slide-box> -->
				<div class="ticket-slider-content">
					<!-- <ion-slide> -->
					<div class="ticket-slider-content-inside"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="full-xy bg-smoke flex-center" ng-if='activeType === "student"'>
		<div class="ticket-slider-container"
			init-with="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg), tro:left bottom]"
			on-init="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg):translateX(0%) rotateX(0deg) rotateY(0deg):750:easeInOutBack easeOutCubic easeOutCubic]">
			<div class="ticket-slider-inside student">
				<div class="ticket-slider-bg"><div></div></div>
				<!-- <ion-slide-box> -->
				<div class="ticket-slider-content">
					<!-- <ion-slide> -->
					<div class="ticket-slider-content-inside"></div>
				</div>
			</div>
		</div>
	</div>
</div>
