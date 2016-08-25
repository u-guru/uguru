<div class="perspective-container full-xy flex-center" reference="http://codepen.io/teamuguru/pen/a76dae2606469f818ac51ad37c0dc827?editors=1100">
	<div class="checkbox-container bg-moxie"
		init-default
		on-init="s:[checkbox-load:public]"
		when-checkbox-load="s:[checkbox-enter:public:delay-550]">
		<div>
			<input type="checkbox" id="checkbox-item"/>
			<span init-with="p:[background:rgba(64#72#75#0)]"
				when-checkbox-enter="p:[background:rgba(64#72#75#0):rgba(64#72#75#1):250:easeOutSine]">
				<svg viewBox="0 0 32 32">
					<line class="line-1" x1="1.25" y1="1.25" x2="30.75" y2="1.25"
						init-with="p:[sda:29.5, sdo:29.5]"
						when-checkbox-load="p:[stroke-dashoffset:29.5:0:250:easeOutSine]"/>
					<line class="line-2" x1="30.75" y1="1.25" x2="30.75" y2="30.75"
						init-with="p:[sda:29.5, sdo:29.5]"
						when-checkbox-load="p:[stroke-dashoffset:29.5:0:250:easeOutSine]:delay-150"/>
					<line class="line-3" x1="30.75" y1="30.75" x2="1.25" y2="30.75"
						init-with="p:[sda:29.5, sdo:29.5]"
						when-checkbox-load="p:[stroke-dashoffset:29.5:0:250:easeOutSine]:delay-300"/>
					<line class="line-4" x1="1.25" y1="30.75" x2="1.25" y2="1.25"
						init-with="p:[sda:29.5, sdo:29.5]"
						when-checkbox-load="p:[stroke-dashoffset:29.5:0:250:easeOutSine]:delay-450"/>
					<circle cx="12.3901367" cy="22.03125" r="32"></circle>
					<polyline class="check-under" points="7.24 17.0305882 12.3929412 22.1835294 24.76 9.81647059"
						init-with="p-op"
						when-checkbox-enter="p:[opacity:0:1:250:easeOutSine]"></polyline>
					<polyline class="check-stroke" points="7.24 17.0305882 12.3929412 22.1835294 24.76 9.81647059"></polyline>
				</svg>
				<span></span>
			</span>
		</div>
		<label for="checkbox-item" init-with="p-op"
			when-checkbox-enter="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">Checkbox Item</label>
	</div>
</div>
