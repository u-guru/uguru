<!-- <inspector-gadget show-log="false" ball-color="smoke" reverse-speed="10" speed="0.2x" class="bottom-0 bg-azure" auto-play="true" step-size="100" play-infinite="false"> </inspector-gadget> -->

<div class="perspective-container full-xy flex-center-wrap p15xy">
	<div class="message left"
		u
		on-init="s:[message-bubble-left-init:children]">
		<div class='message-icon'
			u init-with="p:[tr:scale(0), tro:center center]"
			when-message-bubble-left-init="a:[icon-enter:750:easeOutSine:0:1:f]">
			<span class="user-icon-48"></span>
		</div>
		<div class="message-content">
			<div class="message-info"
				u init-with="p-op"
				when-message-bubble-left-init="a:[opacity:0:1:500:easeInSine:0:1:f]:delay-500">
				<span>Gabrielle</span>
				<span>4:20pm</span>
			</div>
			<ul class="message-container">
				<li class="message-single">
					<div class="bg-white txt-slate"
						u init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:1000:linear:150:1:f]"
						on-init="s:[paragraph:children]:+450">
						<div u init-with="p-op"
							when-paragraph="a:[opacity:0:1:500:easeInSine:0:1:f]">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
				<li class="message-single">
					<div class="bg-white txt-slate"
						u init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:1000:linear:450:1:f]"
						on-init="s:[paragraph-2:children]:+750">
						<div u init-with="p-op"
							when-paragraph-2="a:[opacity:0:1:500:easeInSine:0:1:f]">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
				<li class="message-single">
					<div class="bg-white txt-slate"
						u init-with="p:[op:0, tro: left center]"
						when-message-bubble-left-init="a:[messageIn:1000:linear:750:1:f]"
						on-init="s:[paragraph-3:children]:+1050">
						<div u init-with="p-op"
							when-paragraph-3="a:[opacity:0:1:500:easeInSine:0:1:f]">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="message right"
		u on-init="s:[message-bubble-right-init:children:1000]">
		<div class="message-content">
			<div class="message-info"
				u init-with="p:[op:0, tro: right center]"
				when-message-bubble-right-init="a:[messageIn:1000:linear:500:1:f]">
				<span>Gabrielle</span>
				<span>4:20pm</span>
			</div>
			<ul class="message-container">
				<li class="message-single">
					<div class="bg-white txt-slate"
						u init-with="p:[op:0, tro: right center]"
						when-message-bubble-right-init="a:[messageIn:1000:linear:150:1:f]"
						on-init="s:[paragraph-4:children]:+1450">
						<div class="bg-lake-25p txt-slate"
							u init-with="p-op"
							when-paragraph-4="a:[opacity:0:1:500:easeInSine:0:1:f]">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class='message-icon'>
			<span class="user-icon-48"
				u init-with="p:[op:0, tro:center center]"
				when-message-bubble-right-init="a:[icon-enter:750:easeOutSine:0:1:f]"></span>
		</div>
	</div>
</div>
