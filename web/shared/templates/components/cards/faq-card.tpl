<div class="full-xy flex-center p15xy">
	<div class="faq-card"
		init-with="p-op"
		on-init="s:[faq-item-init:public]"
		when-faq-item-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in]">
		<dt>
			<a class="bg bg-shamrock overflow-hidden"
				init-default
				on-click="s:[faq-item-clicked:public]">
				<h1 init-with="p-op"
					when-faq-item-init="p:[opacity:0:1:250:easeOutQuart]:delay-250">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div init-with="p-op"
					when-faq-item-init="p:[opacity:0:1:250:easeOutQuart]:delay-500">
				<!-- <h1
					inspector-elem="on-init"
					on-init="p:[opacity:0:1:250:elastic, transform:translateY(-1000%):translateY(0%):250:elastic]"

					when-faq-item-init="p:[op:1, tr:none]:delay-250">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div init-with="p:[op:0, tr:translateY(100%), t:opacity 250ms ease-out]"
					when-faq-item-init="p:[op:1, tr:none]:delay-500"> -->
					<span ng-include="root.base_url + 'shared/templates/components/svg/main/down.html'"
						init-with="p:[tro:center center]"
						when-faq-item-clicked="p:[transform:rotate(0deg):rotate(180deg):250:easeOutSine]"
						when-faq-item-closed="p:[transform:rotate(180deg):rotate(0deg):250:easeOutSine]"></span>
				</div>
			</a>
		</dt>
		<dd init-with="p:[max-height:0]"
			when-faq-item-clicked="p:[max-height:0px:500px:500:easeOutSine]"
			on-click="s:[faq-item-closed:public]"
			when-faq-item-closed="p:[max-height:500px:0px:500:easeOutSine]">
			<div>
				<p init-with="p-op"
					when-faq-item-clicked="p:[opacity:0:1:150:easeOutSine]:delay-350"
					when-faq-item-closed="p:[opacity:1:0:150:easeOutSine]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</dd>
	</div>
</div>
