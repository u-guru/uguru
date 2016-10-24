<div class="full-xy flex-center" types='guru, student' default-type="guru">
	<div class="full-xy bg-slate flex-center" ng-if='activeType === "guru"'>
		<div class="ticket-slider-container"
			u init-with="p:[opacity:0, transform:translateX(-50%) skewX(-15deg), tro:right center]"
			on-init="a:[opacity:0:1:150:easeOutSine:0:1:f, translateX:-50%:0%:1000:easeInOutBack:0:1:f, skewX:-15deg:0deg:1000:easeOutCubic:0:1:f]">
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
			u init-with="p:[opacity:0, transform:translateX(-50%) skewX(-15deg), tro:right center]"
			on-init="a:[opacity:0:1:150:easeOutSine:0:1:f, translateX:-50%:0%:1000:easeInOutBack:0:1:f, skewX:-15deg:0deg:1000:easeOutCubic:0:1:f]">
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
