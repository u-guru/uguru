<div class="perspective-container full-xy flex-center p15xy">
	<div class="wallet-container"
		init-with="p:[tro:left center]"
		on-init="a:[bounceInLeft-subtle:set:(dur:1000ms#func:linear):in]">
		<svg class="wallet-back absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
				<rect class="back" stroke="#757575" fill="#A09684" x="2" y="2" width="260" height="195" rx="10"></rect>
			</g>
		</svg>
		<svg class="wallet-exterior absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
				init-with="p:[tro:left center, perspective:1000, tr:rotateY(120deg)]"
				on-init="p:[tr:rotateY(0deg):delay-150, t:all 500ms ease-out]">
				<rect class="front" stroke="#757575" fill="#DEBD95" x="2" y="2" width="230" height="195" rx="10"></rect>
				<rect class="seam" stroke="#757575" stroke-dasharray="5,15" opacity="0.5" x="17" y="17" width="200" height="165" rx="5"></rect>
			</g>
		</svg>
		<svg class="wallet-latch absolute top-0 left-0" viewBox="0 0 264 199">
			<g fill="none" fill-rule="evenodd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
				init-with="p:[tro:right center, perspective:1000, tr:rotateY(120deg) rotateX(5deg)]"
				on-init="p:[tr:rotateY(0deg) rotateX(0deg):delay-450, t:all 500ms ease-out]">
					<path d="M193,100 C193,88.4020203 202.395442,79 214.006771,79 L262,79 L262,121 L214.006771,121 C202.405052,121 193,111.60053 193,100 L193,100 Z" class="latch" stroke="#757575" fill="#DEBD95"></path>
					<circle class="button" stroke="#757575" fill="#F6C64E" cx="216" cy="100" r="12"></circle>
			</g>
		</svg>
		<div>
			<h1 init-with="p-op"
				on-init="a:[fadeIn:set:(dur:800ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-450]">My Wallet</h1>
			<button init-with="p-op"
				on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in:delay-450]">Add&nbsp;Card</button>
		</div>
	</div>
</div>
