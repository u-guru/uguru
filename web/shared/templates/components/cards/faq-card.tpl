<div class="full-xy flex-center p15xy">
	<div class="faq-card">
		<dt>
			<a class="bg bg-shamrock"
				init-default
				on-click="s:[faq-item-clicked:public]">
				<h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div>
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
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</dd>
	</div>
</div>
