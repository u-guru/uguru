<div class="perspective-container full-xy flex-center p15xy">
	<div class="timeline-icon timeline-parent timeline-icon-right"
		init-with="p:[op:0, tr:center center]"
		on-init="t-enter"
		on-enter="a:[bounceIn-subtle:set:(dur:1000ms#func:linear):in]"
		on-click="send:[timeline-click:public]">
		<div class="timeline-icon-svg">
			<svg viewBox="0 0 100 100">
			    <g fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
			        <circle cx="50" cy="50" r="36"></circle>
			        <g class="path">
			            <path d="M31,35.5 L69,35.5"></path>
			            <path d="M31,50.5 L69,50.5"></path>
			            <path d="M31,65.5 L69,65.5"></path>
			        </g>
			    </g>
			</svg>
		</div>
		<div class="timeline-icon-cover bg-charcoal"></div>
		<h2 class="timeline-icon-text"
			on-init="p:[tr:translateX(-100%)]"
			when-timeline-click="p:[tr:translateX(0), t:all 250ms cubic-bezier(.6#0#.1#1.3)]">Milestones</h2>
	</div>
</div>
