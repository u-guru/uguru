<div class="full-xy flex-center p15xy">
	<div class="faq-card"
		init-with="p-op"
		on-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in] | s:[faq-item-init:public]">
		<dt>
			<a class="bg bg-shamrock overflow-hidden"
				init-default
				on-click="s:[faq-item-clicked:public]">
				<h1 init-with="p:[opacity:0:1:250:easeOutQuart:delay-250, tr:translateY(100%)]"
					when-faq-item-init="p:[op:1, tr:none]:delay-250">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div init-with="p:[op:0, tr:translateY(100%), t:opacity 250ms ease-out]"
					when-faq-item-init="p:[op:1, tr:none]:delay-500">
					<span ng-include="root.base_url + 'shared/templates/components/svg/main/down.html'"
						init-with="p:[tro:center center, t:all 250ms ease-out]"
						when-faq-item-clicked="p:[tr:rotate(180deg)]"
						when-faq-item-closed="p:[tr:rotate(0deg)]"></span>
				</div>
			</a>
		</dt>
		<dd init-with="p:[max-height:0, t:all 500ms ease-out]"
			when-faq-item-clicked="p:[max-height:500px]"
			on-click="s:[faq-item-closed:public]"
			when-faq-item-closed="p:[max-height:0]">
			<div>
				<p init-with="p:[op:0, t:opacity 150ms ease-out]"
					when-faq-item-clicked="p:[op:1:delay-350]"
					when-faq-item-closed="p-op">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</dd>
	</div>
</div>
