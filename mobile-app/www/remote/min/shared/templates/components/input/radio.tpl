<div class="perspective-container full-xy flex-center" reference="http://codepen.io/teamuguru/pen/3d51f2394a6a0dbe38646612aa3e3759?editors=1100">
	<div class="radio-container bg-moxie"
		init-default
		on-init="send:[radio-load:public]"
		when-radio-load="send:[radio-enter:public:delay-350]"
		on-exit="a:[bounceOut-subtle:set:(dur:1000ms#func:linear):out]">
		<div>
			<input type="checkbox" id="radio-item" />
			<span init-with="p:[background:rgba(64#72#75#0), t:background 250ms ease-out]"
				when-radio-enter="p:[background:rgba(64#72#75#1)]">
				<svg viewBox="0 0 24 24">
					<circle class="border" cx="12" cy="12" r="9.5"
						init-with="p:[sda:59.7, sdo:59.7, op:0, t:all 250ms ease-out]"
						when-radio-load="p:[sdo:0, op:1]"></circle>
					<g init-with="p:[op:0, t:all 250ms ease-out]"
						when-radio-enter="p:[op:1]">
						<circle class="bg" cx="12" cy="12" r="9"></circle>
					</g>
					<circle class="check" cx="12" cy="12" r="9"></circle>
				</svg>
			</span>
		</div>
		<label for="radio-item" init-with="p-op"
			when-radio-enter="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">Radio Item</label>
	</div>

	<!-- this is the deprecated version of the checkbox - you can use it for reference -->
	<!-- <div class="radio-container old">
		<div>
			<input type="radio" id="radio-item" />
			<span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
		<label for="radio-item">Radio Item</label>
	</div> -->
</div>
