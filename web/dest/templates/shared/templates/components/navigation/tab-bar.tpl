<div class="perspective-container full-xy flex-center p15xy bg-slate">
	<nav class="tab-bar radius-2"
		u init-with="p:[op:0, tro:left center]"
		on-init="s:[tab-bar-enter:self, link-enter:children:easeInQuint-1000]"
		when-tab-bar-enter="a:[scaleInX-subtle:1000:linear:0:1:f]">
		<div>
			<a class="active"
				u init-with="p:[op:0, tro:center center]"
				when-link-enter="a:[scoop-enter:1000:linear:0:1:f]">Link 1</a>
			<a u init-with="p:[op:0, tro:center center]"
				when-link-enter="a:[scoop-enter:1000:linear:0:1:f]">Link 2</a>
			<a u init-with="p:[op:0, tro:center center]"
				when-link-enter="a:[scoop-enter:1000:linear:0:1:f]">Link 3</a>
			<a u init-with="p:[op:0, tro:center center]"
				when-link-enter="a:[scoop-enter:1000:linear:0:1:f]">Link 4</a>
			<a u init-with="p:[op:0, tro:center center]"
				when-link-enter="a:[scoop-enter:1000:linear:0:1:f]">Link 5</a>
			<hr/>
		</div>
	</nav>
</div>\
