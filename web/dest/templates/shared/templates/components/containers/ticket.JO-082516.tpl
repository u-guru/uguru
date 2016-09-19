<div class="full-xy flex-center" types='guru, student' default-type="guru">
	<div class="full-xy bg-slate flex-center" ng-if='activeType === "guru"'>
		<div class="ticket-slider-container"
			init-with="p:[opacity:0, transform:translateX(-50%) skewX(-15deg), tro:right center]"
			on-init="p:[opacity:0:1:150:easeOutSine, transform:translateX(-50%) skewX(-15deg):translateX(0%) skewX(0deg):1000:easeInOutBack easeOutCubic]">
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
			init-with="p:[opacity:0, transform:translateX(-50%) skewX(-15deg), tro:right center]"
			on-init="p:[opacity:0:1:150:easeOutSine, transform:translateX(-50%) skewX(-15deg):translateX(0%) skewX(0deg):1000:easeInOutBack easeOutCubic]">
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
