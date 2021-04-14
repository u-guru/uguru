<div class="full-xy flex-center" types='light, dark' default-type="light">
	<div class="p15xy radius-2 bg-slate overflow-hidden" style="width: 400px" ng-if='activeType === "light"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">
		<fieldset class="input-basic">
			<label init-with="p-op"
				on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-250]">Label</label>
			<input type="text" placeholder="This is an basic input" init-with="p-op"
				on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-500]"/>
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-white" style="width: 400px" ng-if='activeType === "dark"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]">
		<fieldset class="input-basic">
			<label class="txt-taupe" init-with="p-op"
				on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-250]">Label</label>
			<input class="dark" type="text" placeholder="This is an basic input" init-with="p-op"
				on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-500]"/>
		</fieldset>
	</div>
</div>
