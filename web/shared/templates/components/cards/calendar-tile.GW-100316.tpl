<div class="perspective-container full-xy flex-center p15xy">
	<div class="calendar-tile bg-moxie" u
		init-with="p:[opacity:0, tro:center center]"
		on-init="a:[bounceInDown-subtle:1000:linear:0:1:f] | s:[ready:public]">
		<!-- on-click is to demonstrate drag state-->
		<div></div><div></div>
		<div></div><div></div>
		<h1 u init-with="p:[opacity:0, tro:center center]"
			on-init-debug="a:[bounceIn-subtle:800:linear:0:1:f]:delay-250">February 11</h1>
		<h2 u init-with="p:[opacity:0, tro:center center]"
			when-ready="a:[bounceIn-subtle:800:linear:0:1:f]:delay-350">4pm-6am</h2>
	</div>
</div>
