<div class="perspective-container full-xy flex-center p15xy">
	<div class="wallet-container"
		u init-with="p:[tro:left center, op:0]"
		on-init="s:[wallet-enter:children, wallet-container:self]"
		when-wallet-container="a:[bounceInLeft-subtle:1000:linear:0:1:f]">
		<svg class="wallet-back absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
				<rect class="back" stroke="#757575" fill="#A09684" x="2" y="2" width="260" height="195" rx="10"></rect>
			</g>
		</svg>
		<svg class="wallet-exterior absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
				u init-with="p:[tro:left center, perspective:1000, tr:rotateY(120deg)]"
				when-wallet-enter="a:[rotateY:120deg:0deg:650:easeOutQuad:250:1:f]">
				<rect class="front" stroke="#757575" fill="#DEBD95" x="2" y="2" width="230" height="195" rx="10"></rect>
				<rect class="seam" stroke="#757575" stroke-dasharray="5,15" opacity="0.5" x="17" y="17" width="200" height="165" rx="5"></rect>
			</g>
		</svg>
		<svg class="wallet-latch absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
				u init-with="p:[tro:right center, perspective:1000, tr:rotateY(120deg) rotateX(5deg)]"
				when-wallet-enter="a:[rotateY:120deg:0deg:650:easeOutBack:450:1:f, rotateX:5deg:0deg:650:easeOutBack:450:1:f]">
					<path d="M193,100 C193,88.4020203 202.395442,79 214.006771,79 L262,79 L262,121 L214.006771,121 C202.405052,121 193,111.60053 193,100 L193,100 Z" class="latch" stroke="#757575" fill="#DEBD95"></path>
					<circle class="button" stroke="#757575" fill="#F6C64E" cx="216" cy="100" r="12"></circle>
			</g>
		</svg>
		<div>
			<h1 u init-with="p:[op:0]"
				when-wallet-enter="a:[opacity:0:1:800:(0.8,0.1,1,0.05):0:1:f]:delay-450">My Wallet</h1>
			<button u init-with="p:[op:0]"
				when-wallet-enter="a:[bounceIn-subtle:1000:linear:450:1:f]">Add&nbsp;Card</button>
		</div>
	</div>
</div>
