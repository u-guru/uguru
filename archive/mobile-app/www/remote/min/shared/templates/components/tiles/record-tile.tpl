<div class="perspective-container full-xy flex-center p15xy"
	init-default
	on-init="s:[record-tile-init:public]">
	<div class="record-tile-container"
		on-mouse-enter="s:[record-mouse-enter-1:public]"
		on-mouse-leave="s:[record-mouse-leave-1:public]">
		<div class="record-tile">
			<svg viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div class="record-tile-back"
				init-with="p:[op:0, tr:translate3d(-15%#0#0), t:transform 1000ms ease-out#opacity 250ms ease-out]"
				when-record-tile-init="p:[op:1:delay-250, tr:translate3d(0#0#0)]:delay-750"
				when-record-mouse-enter-1="p:[op:1, tr:translate3d(5%#0#0):delay-50, t:all 150ms ease-out]"
				when-record-mouse-leave-1="p:[op:1, tr:translate3d(0#0#0), t:all 150ms ease-out]">
				<div init-with="p:[tro:center center, tr:rotate(0) translateZ(0), t:all 1000ms cubic-bezier(0#.58#.33#1.2)]"
					when-record-tile-init="p:[tr:rotate(40deg) translateZ(0)]:delay-900"
					when-record-mouse-enter-1="p:[op:1, tr:rotate(50deg) translateZ(0):delay-50]"
					when-record-mouse-leave-1="p:[op:1, tr:rotate(40deg) translateZ(0)]">
					<svg viewBox="0 0 320 320">
						<defs>
							<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="vinyl-shine">
								<feGaussianBlur stdDeviation="8" in="SourceGraphic"></feGaussianBlur>
							</filter>
						</defs>
						<g fill="none" fill-rule="evenodd">
							<circle class="rim" stroke="#423942" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#191919" cx="160" cy="160" r="150"></circle>
							<circle class="micro-groove" fill="#423942" cx="160" cy="159.0625" r="60.9375"></circle>
							<circle class="label" fill="#CE8FCF" cx="160" cy="159.0625" r="28.125"></circle>
							<path d="M160,187.1875 L160,130.9375 C144.466991,130.9375 131.875,143.529491 131.875,159.0625 C131.875,174.595509 144.466991,187.1875 160,187.1875 Z" class="label-half" fill="#347DD0"></path>
							<circle class="groove-1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160" cy="159.0625" r="93.75"></circle>
							<circle class="groove-2" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160.46875" cy="159.53125" r="83.90625"></circle>
							<circle class="groove-3" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160" cy="160" r="103.125"></circle>
							<path d="M161.963396,272.482866 C224.085967,271.398512 273.567219,220.159176 272.482866,158.036604 C271.398512,95.9140329 220.159176,46.4327808 158.036604,47.5171343 C95.9140329,48.6014878 46.4327808,99.8408244 47.5171343,161.963396 C48.6014878,224.085967 99.8408244,273.567219 161.963396,272.482866 L161.963396,272.482866 Z" class="groove-4" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M162.127012,281.856438 C229.426464,280.681722 283.031154,225.17244 281.856438,157.872988 C280.681722,90.5735357 225.17244,36.9688458 157.872988,38.1435622 C90.5735357,39.3182785 36.9688458,94.8275597 38.1435622,162.127012 C39.3182785,229.426464 94.8275597,283.031154 162.127012,281.856438 L162.127012,281.856438 Z" class="groove-5" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M162.290628,291.23001 C234.766962,289.964931 292.495089,230.185705 291.23001,157.709372 C289.964931,85.2330384 230.185705,27.5049109 157.709372,28.76999 C85.2330384,30.0350691 27.5049109,89.8142951 28.76999,162.290628 C30.0350691,234.766962 89.8142951,292.495089 162.290628,291.23001 L162.290628,291.23001 Z" class="groove-6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<circle class="groove-7" fill="#211720" cx="160" cy="159.0625" r="4.6875"></circle>
							<polygon class="shine" fill-opacity="0.5" fill="#FFFFFF" filter="url(#vinyl-shine)" points="160.804837 159.804837 66.8040405 277.228968 43.0172439 253.442172 160.441375 159.441375 254.442172 42.0172439 278.228968 65.8040405 160.804837 159.804837"></polygon>
						</g>
					</svg>

				</div>
			</div>
			<div class="record-tile-front"
				init-with="p:[bg:transparent, tr:translateX(7.5%), t:transform 1000ms ease-out#background 250ms ease-out]"
				when-record-tile-init="p:[tr:none:delay-750, bg:#8967d4:delay-250]"
				when-record-mouse-enter-1="p:[tr:translate3d(-5%#0#0):delay-50, t:all 150ms ease-out]"
				when-record-mouse-leave-1="p:[tr:translate3d(0#0#0), t:all 150ms ease-out]">
				<div init-with="p:[tr:scaleX(0), t:all 250ms cubic-bezier(1#0#1#0)]"
					when-record-tile-init="p:[tr:scaleX(1)]"></div>
				<div init-with="p:[tr:scaleY(0), t:all 250ms cubic-bezier(1#0#1#0)]"
					when-record-tile-init="p:[tr:scaleY(1)]"></div>
				<div init-with="p:[tr:scaleX(0), t:all 250ms cubic-bezier(1#0#1#0)]"
					when-record-tile-init="p:[tr:scaleX(1)]"></div>
				<div init-with="p:[tr:scaleY(0), t:all 250ms cubic-bezier(1#0#1#0)]"
					when-record-tile-init="p:[tr:scaleY(1)]"></div>
				<div class="record-art"
					init-with="p-op"
					when-record-tile-init="p:[op:1:delay-250, tr:all 250ms ease-out]"></div>
				<h1 class="record-label"
					init-with="p-op"
					when-record-tile-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-1000]">Top 40</h1>
			</div>
		</div>
		<div class="record-info">
			<h3 init-with="p-op"
				when-record-tile-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-1250]">Top 40 - 2016</h3>
			<button init-with="p-op"
				when-record-tile-init="a:[slideInUp-subtle:set:(dur:1000ms#func:linear):in:delay-1500]">
				<span></span><span></span><span></span><span></span>
				<span>Listen Now</span>
			</button>
		</div>
	</div>
</div>
