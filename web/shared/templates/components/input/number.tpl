<div class="perspective-container full-xy flex-center p15xy">
	<div class="number-input">
		<div u init-with="p:[op:0]"
			on-init="a:[bounceIn-subtle:1000:linear:0:1:f] | s:[number:siblings:500]">
			<input id="number-input" type="tel" placeholder="0" value="0"
				u init-with="p:[op:0]"
				on-init="a:[slideInUp-subtle:1000:linear:250:1:f]"/>
		</div>
		<label for="number-input"
			u init-with="p:[op:0]"
			when-number="a:[slideInUp-subtle:1000:linear:0:1:f]">hours</label>
	</div>
</div>
