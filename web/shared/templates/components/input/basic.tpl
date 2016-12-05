<div class="full-xy flex-center" types='light, dark' default-type="light">
	<div class="p15xy radius-2 bg-slate overflow-hidden" style="width: 400px" ng-if='activeType === "light"'
		u init-with="p:[op:0]"
		on-init="s:[light-input:self, light-slide-input:children:250]"
		when-light-input="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<fieldset class="input-basic">
			<label u init-with="p:[op:0]"
				when-light-slide-input="a:[slideInUp-subtle:1000:linear:0:1:f]">Label</label>
			<input type="text" placeholder="This is an basic input" u init-with="p:[op:0]"
				when-light-slide-input="a:[slideInUp-subtle:1000:linear:0:1:f]:delay-230"/>
		</fieldset>
	</div>

	<div class="p15xy radius-2 bg-white" style="width: 400px" ng-if='activeType === "dark"'
		u init-with="p:[op:0]"
		on-init="s:[dark-input:self, dark-slide-input:children:250]"
		when-dark-input="a:[bounceIn-subtle:1000:linear:0:1:f]">
		<fieldset class="input-basic">
			<label class="txt-taupe" u init-with="p:[op:0]"
				when-dark-slide-input="a:[slideInUp-subtle:1000:linear:0:1:f]">Label</label>
			<input class="dark" type="text" placeholder="This is an basic input" u init-with="p:[op:0]"
				when-dark-slide-input="a:[slideInUp-subtle:1000:linear:0:1:f]:delay-230"/>
		</fieldset>
	</div>
</div>
