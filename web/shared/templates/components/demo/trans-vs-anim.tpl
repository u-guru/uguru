<style>
	@keyframes demo-opacity {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}

	@keyframes demo-transform {
		0% { transform: translateY(-100%); }
		100% { transform: none; }
	}

	@keyframes demo-fill {
		0% { fill: white; }
		100% { fill: #637074; }
	}

	@keyframes demo-strokeoffset {
		0% { stroke-dashoffset: 496; }
		100% { stroke-dashoffset: 0; }
	}

	.demo {
		animation: demo-opacity 250ms ease-out forwards, demo-transform 1000ms cubic-bezier(.17,.67,.73,1.92) forwards;
	}

	.demo rect {
		stroke-dasharray: 496;
		stroke-dashoffset: 496;
		animation: demo-fill 400ms ease-in-out 250ms forwards, demo-strokeoffset 2000ms cubic-bezier(.6,0,.1,1.3) 500ms forwards;
	}
</style>

<div class="full-xy flex-center bg-moxie">

	<ul class="p15xy flex txt-center">
		<li class="p15xy">
			<div class="width-128 height-128">
				<svg viewBox="0 0 128 128"
					init-with="p:[op:0, tr:translateY(-100%), t:opacity 250ms ease-out#transform 1000ms cubic-bezier(.17#.67#.73#1.92)]"
					on-init="p:[op:1, tr:none]:delay-500">
					<rect x="2" y="2" width="124" height="124" stroke="#40484b" stroke-width="4" fill="white" rx="10"
						init-with="p:[fill:white, sda:496, sdo:496, t:fill 400ms ease-in-out#stroke-dashoffset 2000ms cubic-bezier(.6#0#.1#1.3)]"
						on-init="p:[fill:#637074:delay-250, sdo:0:delay-500]:delay-500"></rect>
				</svg>
			</div>
			<h1 class="txt-white txt-24 txt-white semibold m05top">transition</h1>
		</li>

		<li class="p15xy">
			<div class="width-128 height-128">
				<svg viewBox="0 0 128 128"
					init-with="p-op"
					on-init="c:[demo:add:delay-500]">
					<rect x="2" y="2" width="124" height="124" stroke="#40484b" stroke-width="4" fill="white" rx="10"></rect>
				</svg>
			</div>
			<h1 class="txt-white txt-24 txt-white semibold m05top">animation</h1>
		</li>
	</ul>

</div>
