<div class="full-xy flex-center" types='guru, student' default-type="guru">
	<div class="full-xy bg-slate flex-center" ng-if='activeType === "guru"'>
		<div class="ticket-slider-container"
			u init-with="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg), tro:left bottom]"
			on-init="a:[translateX:-50%:0%:750:easeInOutBack:0:1:f, rotateX:15deg:0deg:750:easeOutCubic:0:1:f, rotateY:30deg:0deg:750:easeOutCubic:0:1:f]">
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
			u init-with="p:[transform:translateX(-50%) rotateX(15deg) rotateY(30deg), tro:left bottom]"
			on-init="a:[translateX:-50%:0%:750:easeInOutBack:0:1:f, rotateX:15deg:0deg:750:easeOutCubic:0:1:f, rotateY:30deg:0deg:750:easeOutCubic:0:1:f]">
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
