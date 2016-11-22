<div class="full-xy flex-center p15xy">
	<!-- needs color directives -->
	<div class="faq-card"
		u init-with="p:[op:0]"
		on-init="s:[faq-item-init:grandchildren] | a:[slideInUp-subtle:1000:linear:0:1:f]">
		<dt>
			<a class="bg bg-shamrock"
				u on-click="s:[faq-item-clicked:public]">
				<h1 u init-with="p:[op:0]"
					when-faq-item-init="a:[opacity:0:1:250:easeOutQuart:250:1:f]">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt?</h1>
				<div u init-with="p:[op:0]"
					when-faq-item-init="a:[opacity:0:1:250:linear:0:1:f]:delay-500">
					<span u init-with="p:[tro:center center]"
						when-faq-item-clicked="a:[rotate:0deg:180deg:250:easeOutSine:0:1:f]"
						when-faq-item-closed="a:[rotate:180deg:0deg:250:easeOutSine:0:1:f]">
						<graphic url='shared/templates/components/svg/main/down.html'></graphic>
					</span>
				</div>
			</a>
		</dt>
		<dd u init-with="p:[max-height:0]"
			on-click="s:[faq-item-closed:public]"
			when-faq-item-clicked="a:[max-height:0px:500px:500:easeOutSine:0:1:f]"
			when-faq-item-closed="a:[max-height:500px:0px:500:easeOutSine:0:1:f]">
			<div>
				<p u init-with="p:[op:0]"
					when-faq-item-clicked="a:[opacity:0:1:150:easeOutSine:0:1:f]:delay-350"
					when-faq-item-closed="a:[opacity:1:0:150:easeOutSine:0:1:f]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
		</dd>
	</div>
</div>
