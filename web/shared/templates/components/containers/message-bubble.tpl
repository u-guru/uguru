<div class="perspective-container full-xy flex-center-wrap p15xy">
	<div class="message left"
		init-default
		on-init="s:[message-bubble-left-init:public]">
		<div class='message-icon'
			init-with="p:[op:0, tro:center center]"
			when-message-bubble-left-init="a:[icon-enter:set:(dur:750ms#func:ease-out):in]">
			<span class="user-icon-48"></span>
		</div>
		<div class="message-content">
			<div class="message-info"
				init-with="p-op"
				when-message-bubble-left-init="p:[opacity:0:1:500:easeInSine]:delay-500">
				<span>Gabrielle</span>
				<span>4:20pm</span>
			</div>
			<ul class="message-container">
				<li class="message-single">
					<div class="bg-white txt-slate"
						init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:set:(dur:1000ms#func:linear):in:delay-150] | t:[on-enter:children]:delay-150">
						<div init-with="p-op"
							on-enter="p:[opacity:0:1:500:easeInSine]:delay-300">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
				<li class="message-single">
					<div class="bg-white txt-slate"
						init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:set:(dur:1000ms#func:linear):in:delay-450] | t:[on-enter:children]:delay-450">
						<div init-with="p-op"
							on-enter="p:[opacity:0:1:500:easeInSine]:delay-300">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
				<li class="message-single">
					<div class="bg-white txt-slate"
						init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:set:(dur:1000ms#func:linear):in:delay-750] | t:[on-enter:children]:delay-750">
						<div init-with="p-op"
							on-enter="p:[opacity:0:1:500:easeInSine]:delay-300">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="message right"
		init-default
		on-init="s:[message-bubble-right-init:public:delay-1000]">
		<div class="message-content">
			<div class="message-info"
				init-with="p:[op:0, tro: right center]"
				when-message-bubble-right-init="a:[messageIn:set:(dur:1000ms#func:linear):in:delay-500]">
				<span>Gabrielle</span>
				<span>4:20pm</span>
			</div>
			<ul class="message-container">
				<li class="message-single">
					<div class="bg-white txt-slate"
						init-with="p:[op:0, tro: right center]"
						when-message-bubble-right-init="a:[messageIn:set:(dur:1000ms#func:linear):in:delay-150] | t:[on-enter:children]:delay-150">
						<div class="bg-lake-25p txt-slate"
							init-with="p-op"
							on-enter="p:[opacity:0:1:500:easeInSine]:delay-300">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class='message-icon'>
			<span class="user-icon-48"
				init-with="p:[op:0, tro:center center]"
				when-message-bubble-right-init="a:[icon-enter:set:(dur:750ms#func:ease-out):in]"></span>
		</div>
	</div>
</div>
