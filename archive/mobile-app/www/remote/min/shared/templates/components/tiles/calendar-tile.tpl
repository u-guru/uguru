<div class="perspective-container full-xy flex-center p15xy">
	<div class="calendar-tile bg-moxie"
		init-with="p-op"
		on-init="a:[bounceInDown-subtle:set:(dur:1000ms#func:linear):in] | t:[on-enter:children]"
		on-click="p:[tr:rotate(45deg), tr:rotate(0):delay-450, t:all 150ms ease-in, tro:left top]">
		<!-- on-click is to demonstrate drag state-->
		<div></div><div></div>
		<div></div><div></div>
		<h1 init-with="p-op"
			on-enter="a:[bounceIn-subtle:set:(dur:800ms#func:linear):in:delay-250]">February 11</h1>
		<h2 init-with="p-op"
			on-enter="a:[bounceIn-subtle:set:(dur:800ms#func:linear):in:delay-350]">4pm-6am</h2>
	</div>
</div>
