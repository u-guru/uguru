<div class="perspective-container full-xy flex-center p15xy bg-white" reference="http://codepen.io/teamuguru/pen/b96acb7823f68a8dadc95e01abea94a6?editors=1100">
	<div class="body-text" number="3" style="max-width: 360px"
		init-with="p:[op:1, t:all 250ms ease-out]"
		on-init="s:[body-text-init:public]"
		on-exit="p:[op:0]">
		<div class="body-text-loader"
			 init-with="p:[op:0, t:opacity 150ms ease-out]"
			 when-body-text-init="p:[op:1, op:0:delay-600]">
			<span init-with="p:[width:70%]">
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span init-with="p:[width:95%]">
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span init-with="p:[width:85%]">
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
			<span>
				<span init-with="p:[tr:scaleX(0), t:transform 450ms ease-out]"
					when-body-text-init="p:[tr:none]"></span>
			</span>
		</div>
		<span init-with="p:[op:0, t:opacity 150ms ease-out]"
			 when-body-text-init="p:[op:1:delay-600]">Lorem ipsum dolor sit amet.</span>
		<span init-with="p:[op:0, t:opacity 150ms ease-out]"
			 when-body-text-init="p:[op:1:delay-600]">Consectetuer adipiscing elit eget nisl.</span>
		<span init-with="p:[op:0, t:opacity 150ms ease-out]"
			 when-body-text-init="p:[op:1:delay-600]">Nam at tortor quis ipsum tempor.</span>
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
