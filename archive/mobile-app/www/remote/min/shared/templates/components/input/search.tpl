
<div class="perspective-container full-xy flex-center p15xy">
	<!-- ttt:[p:(width) dur:250ms tf:(ease-out)]
	ttt:[p:(opacity) dur:(1000ms,500) tf:(linear,ease) a:(bounceIn-subtle,ease)]|
-->
	<fieldset class="search-bar"
		init-with="p:[op:0, width:48px, t:width 250ms cubic-bezier(.6#0#.1#1.3)#opacity 250ms ease-out]"
		on-init="p:[op:1]|s:[search-bar-init:public]|ttt:[p:(opacity) dur:1250ms tf:linear i:1]"
		when-search-bar-clicked=""
		on-click="s:[search-bar-clicked:public] | p:[width:500px] | ttt:[p:(width) dur:1250ms tf:linear i:1]"
		on-exit="p:[op:0]|ttt:[p:(opacity) dur:1250ms tf:(cb(.6#0#.1#1.3)) i:1 a:bounceIn-subtle]">
		<div>
			<label for="search-bar" on-init="p:[op:1, width:100px]">
				<svg viewBox="0 0 100 100">
			        <path d="M62.994485,62.994485 L85.6624699,85.6624699"
						init-with="p:[sda:32.06, sdo:32.06, t:stroke-dashoffset 200ms ease-out]"
						when-search-bar-init="p:[sdo:0:delay-750]"></path>
			        <circle cx="42.5" cy="42.5" r="28.5"
						init-with="p:[sda:179.07, sdo:179.07, t:stroke-dashoffset 250ms ease-out]"
						when-search-bar-init="p:[sdo:0:delay-500]"></circle>
				</svg>
			</label>

			<input id="search-bar" placeholder="Filter" value=""
				init-with="p-op"
				when-search-bar-clicked="p:[op:1:delay-250, t:all 250ms ease-out]"/>
		</div>
	</fieldset>
	<!-- <fieldset ng-if='activeType === "type2"' class="search-bar"
		init-with="p:[width:48px] | send:[hello-label:public]" >

		<label for="search-bar" u when-hello-label="p:[opacity:0]">
			<svg viewBox="0 0 100 100">
				<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
			</svg>
		</label>

		<input id="search-bar" placeholder="Filter" value="Filter"/>
	</fieldset>
	<fieldset ng-if='activeType === "type3"' class="search-bar"
		init-with="p:[width:48px]">

		<label for="search-bar">
			<svg viewBox="0 0 100 100">
				<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
			</svg>
		</label>

		<input id="search-bar" placeholder="Filter" value="Filter"/>
	</fieldset>

	<fieldset ng-if='activeType === "type4"' class="search-bar"
		init-with="p:[width:96px]"
		on-mouse-enter="p:[background:#000000]">

		<label for="search-bar">
			<svg viewBox="0 0 100 100">
				<path d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
			</svg>
		</label>

		<input id="search-bar" placeholder="Filter" value="Filter"/>
	</fieldset> -->
</div>
