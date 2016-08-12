<div class="perspective-container full-xy flex-center p15xy">
	<div class="number-input">
		<div init-with="p-op"
			on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">
			<input id="number-input" type="tel" placeholder="0" value="0"
				init-with="p-op"
				on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-250]"/>
		</div>
		<label for="number-input"
			init-with="p-op"
			on-init="a:[slideInDown-subtle:set:(dur:1000ms#func:linear):in:delay-500]">hours</label>
	</div>
</div>
