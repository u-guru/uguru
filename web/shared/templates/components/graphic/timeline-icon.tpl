<div class="perspective-container full-xy flex-center p15xy">
	<div class="timeline-icon timeline-parent timeline-icon-right"
		u init-with="p:[op:0, tr:center center]"
		on-init="a:[bounceIn-subtle:1000:linear:0:1:f]"
		on-mouseenter="s:[timeline-enter:children]"
		on-mouseleave="s:[timeline-leave:children]">
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
			u on-init="p:[tr:translateX(-100%)]"
			when-timeline-enter="a:[translateX:-100%:0%:450:easeOutBack:0:1:f]"
			when-timeline-leave="a:[translateX:0%:-100%:450:easeOutBack:0:1:f]">Milestones</h2>
	</div>
</div>
