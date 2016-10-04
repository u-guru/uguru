<div class="perspective-container full-xy flex-center p15xy">
	<div class="calendar-tile bg-moxie" u
		init-with="p:[opacity:0]"
		on-init-debug="a:[bounceInDown-subtle:1000:linear:0:1:f, opacity:0:1:800:linear:250:1:f] | s:[init-children:public:1000]">
		<!-- on-click is to demonstrate drag state-->
		<div></div><div></div>
		<div></div><div></div>
		<h1 u
			init-with="prop:[opacity:0.5]"
			when-init-children="a:[bounceIn-subtle:800:linear:250:1:f, opacity:0.5:1:800:bounce:1:f]">February 11</h1>
		<h2 u
			init-with="prop:[opacity:0.5]"
			when-init-children="a:[bounceIn-subtle:800:linear:350:1:f, opacity:0.5:1:800:bounce:1:f]">4pm-6am</h2>
	</div>
</div>
