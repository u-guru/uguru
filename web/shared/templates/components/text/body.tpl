<div class="perspective-container full-xy flex-center p15xy bg-white" reference="http://codepen.io/teamuguru/pen/b96acb7823f68a8dadc95e01abea94a6?editors=1100">
	<div class="body-text" number="3" style="max-width: 360px"
		u on-init="s:[body-text-init:>c, body-letters:children:800]"
		on-exit="p:[opacity:1:0:250:easeOutSine:0:1:f]">
		<div class="body-text-loader"
			 u init-with="p:[op:1]"
			 when-body-text-init="a:[opacity:1:0:150:easeOutSine:600:1:f]">
			<span u init-with="p:[op:0, width:70%]"
				when-body-text-init="a:[opacity:0:1:150:easeOutSine:0:1:f]">
				<span u init-with="p:[tr:scaleX(0)]"
					when-body-text-init="a:[scaleX:0:1:450:easeOutSine:0:1:f]"></span>
			</span>
			<span u init-with="p:[op:0, width:95%]"
				when-body-text-init="a:[opacity:0:1:150:easeOutSine:0:1:f]">
				<span u init-with="p:[tr:scaleX(0)]"
					when-body-text-init="a:[scaleX:0:1:450:easeOutSine:0:1:f]"></span>
			</span>
			<span u init-with="p:[op:0, width:85%]"
				when-body-text-init="a:[opacity:0:1:150:easeOutSine:0:1:f]">
				<span u init-with="p:[tr:scaleX(0)]"
					when-body-text-init="a:[scaleX:0:1:450:easeOutSine:0:1:f]"></span>
			</span>
		</div>
		<span u init-with="p:[op:0]"
			 when-body-letters="a:[opacity:0:1:150:easeOutSine:0:1:f]">Lorem ipsum dolor sit amet.</span>
		<span u init-with="p:[op:0]"
			 when-body-letters="a:[opacity:0:1:150:easeOutSine:0:1:f]">Consectetuer adipiscing elit eget nisl.</span>
		<span u init-with="p:[op:0]"
			 when-body-letters="a:[opacity:0:1:150:easeOutSine:0:1:f]">Nam at tortor quis ipsum tempor.</span>
	</div>

	<!-- not ready to animate yet, avoid for now!!! -->
	<!-- needs to be split into span elements -->
	<!-- <div class="body-text short" ng-if='activeType === "short"' style="max-width: 360px">
		<span>
			<span>L</span>
			<span>o</span>
			<span>r</span>
			<span>e</span>
			<span>m</span>
			<span>&nbsp;</span>
			<span>i</span>
			<span>p</span>
			<span>s</span>
			<span>u</span>
			<span>m</span>
			<span>&nbsp;</span>
			<span>d</span>
			<span>o</span>
			<span>l</span>
			<span>o</span>
			<span>r</span>
			<span>&nbsp;</span>
			<span>s</span>
			<span>i</span>
			<span>t</span>
			<span>&nbsp;</span>
			<span>a</span>
			<span>m</span>
			<span>e</span>
			<span>t</span>
			<span>.</span>
		</span>
		<span>
			<span>C</span>
			<span>o</span>
			<span>n</span>
			<span>s</span>
			<span>e</span>
			<span>c</span>
			<span>t</span>
			<span>e</span>
			<span>t</span>
			<span>u</span>
			<span>e</span>
			<span>r</span>
			<span>&nbsp;</span>
			<span>a</span>
			<span>d</span>
			<span>i</span>
			<span>p</span>
			<span>i</span>
			<span>s</span>
			<span>c</span>
			<span>i</span>
			<span>n</span>
			<span>g</span>
			<span>&nbsp;</span>
			<span>e</span>
			<span>l</span>
			<span>i</span>
			<span>t</span>
			<span>&nbsp;</span>
			<span>e</span>
			<span>g</span>
			<span>e</span>
			<span>t</span>
			<span>&nbsp;</span>
			<span>n</span>
			<span>i</span>
			<span>s</span>
			<span>l</span>
			<span>.</span>
		</span>
		<span>
			<span>N</span>
			<span>a</span>
			<span>m</span>
			<span>&nbsp;</span>
			<span>a</span>
			<span>t</span>
			<span>&nbsp;</span>
			<span>t</span>
			<span>o</span>
			<span>r</span>
			<span>t</span>
			<span>o</span>
			<span>r</span>
			<span>&nbsp;</span>
			<span>q</span>
			<span>u</span>
			<span>i</span>
			<span>s</span>
			<span>&nbsp;</span>
			<span>i</span>
			<span>p</span>
			<span>s</span>
			<span>u</span>
			<span>m</span>
			<span>&nbsp;</span>
			<span>t</span>
			<span>e</span>
			<span>m</span>
			<span>p</span>
			<span>o</span>
			<span>r</span>
			<span>.</span>
		</span>
	</div> -->
</div>
