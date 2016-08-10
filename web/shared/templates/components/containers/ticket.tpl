<div class="full-xy flex-center" types='guru, student' default-type="student">
	<div class="full-xy bg-slate flex-center" ng-if='activeType === "guru"'>
		<div class="ticket-slider-container"
			init-with="p-op"
			on-init="a:[fadeInLeft:set:(dur:450ms#func:ease-out):in]">
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
			init-with="p-op"
			on-init="a:[fadeInLeft:set:(dur:450ms#func:ease-out):in]">
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
