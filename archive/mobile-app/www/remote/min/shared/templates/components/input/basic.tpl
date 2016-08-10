<div class="full-xy flex-center" types='light, dark' default-type="light">
	<div class="p15xy radius-2 bg-slate" ng-if='activeType === "light"'>
		<fieldset class="input-basic">
			<label>Label</label>
			<input type="text" placeholder="This is an basic input" />
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-white" ng-if='activeType === "dark"'>
		<fieldset class="input-basic">
			<label class="txt-taupe">Label</label>
			<input class="dark" type="text" placeholder="This is an basic input" />
		</fieldset>
	</div>
</div>
