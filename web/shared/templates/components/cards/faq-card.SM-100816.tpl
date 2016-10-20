<div class="full-xy flex-center p15xy">
	<div class="faq-card"
		init-with="p-op"
		u
		on-init="s:[faq-item-init:public]"
		when-faq-item-init="a:[slideInUp-subtle:1000:linear:0:1:f]">
		<dt>
			<a class="bg bg-shamrock"
				init-default
				on-init="s:[faq-item-clicked:public]">
				<h1 u init-with="p-op"
					when-faq-item-init="a:[opacity:0:1:250:easeOutQuart:250:1:f]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div u init-with="p-op"
					when-faq-item-init="p:[opacity:0:1:250:easeOutQuart:0:1:f]:delay-500">
					<span ng-include="root.base_url + 'shared/templates/components/svg/main/down.html'"
						u init-with="p:[tro:center center]"
						when-faq-item-clicked="p:[transform:rotate(0deg):rotate(180deg):250:easeOutSine]"
						when-faq-item-closed="p:[transform:rotate(180deg):rotate(0deg):250:easeOutSine]"></span>
				</div>
			</a>
		</dt>
		<dd init-with="p:[max-height:0]"
			when-faq-item-clicked="p:[max-height:0px:500px:500:easeOutSine:0:1:f]"
			on-click="s:[faq-item-closed:public]"
			when-faq-item-closed="p:[max-height:500px:0px:500:easeOutSine:0:1:f]">
			<div>
				<p init-with="p-op"
					when-faq-item-clicked="p:[opacity:0:1:150:easeOutSine:0:1:f]:delay-350"
					when-faq-item-closed="p:[opacity:1:0:150:easeOutSine:0:1:f]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</dd>
	</div>
</div>
