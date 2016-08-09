<div class="perspective-container full-xy flex-center" types='top, bottom, left, right, line-top, line-bottom, line-left, line-right' default-type="line-bottom" reference="http://codepen.io/teamuguru/pen/0962d66493f8814b2a2f2ed830548022?editors=1100">
	<div class="tooltip tooltip-top" ng-if='activeType === "top"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in] | p:[tro:center top]">
		<div init-with="p:[color:rgba(64#72#75#0)]"
			on-init="p:[color:rgba(64#72#75#1):delay-150, t:color 450ms ease-out]">This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot" ng-if='activeType === "bottom"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in] | p:[tro:center bottom]">
		<div init-with="p:[color:rgba(64#72#75#0)]"
			on-init="p:[color:rgba(64#72#75#1):delay-150, t:color 450ms ease-out]">This is a tip.</div>
	</div>

	<div class="tooltip tooltip-left" ng-if='activeType === "left"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in] | p:[tro:left center]">
		<div init-with="p:[color:rgba(64#72#75#0)]"
			on-init="p:[color:rgba(64#72#75#1):delay-150, t:color 450ms ease-out]">This is a tip.</div>
	</div>

	<div class="tooltip tooltip-right" ng-if='activeType === "right"'
		init-with="p-op"
		on-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in] | p:[tro:right center]">
		<div init-with="p:[color:rgba(64#72#75#0)]"
			on-init="p:[color:rgba(64#72#75#1):delay-150, t:color 450ms ease-out]">This is a tip.</div>
	</div>

	<div class="tooltip-line tooltip-top" ng-if='activeType === "line-top"'>
		<span init-with="p:[tr:scale(0)]"
			on-init="p:[tr:scale(1), t:transform 150ms ease-out]"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0.9):delay-450, t:background 500ms ease-out]">
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-450, t:transform 100ms ease-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-570, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-750, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-750, t:transform 250ms ease-in]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-750, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-450, t:transform 100ms ease-out]"></div>
			<span init-with="p:[op:0, tr:translateY(-10%)]"
				on-init="p:[op:1:delay-450,tr:translateY(0):delay-450, t:all 500ms cubic-bezier(.71#.06#.47#.63)]">This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateY(-10%)]"
				on-init="p:[op:1:delay-650,tr:translateY(0):delay-650, t:all 300ms cubic-bezier(.71#.06#.47#.63)]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-bot" ng-if='activeType === "line-bottom"'>
		<span init-with="p:[tr:scale(0)]"
			on-init="p:[tr:scale(1), t:transform 150ms ease-out]"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0.9):delay-450, t:background 500ms ease-out]">
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-750, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-750, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-570, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-450, t:transform 100ms ease-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-450, t:transform 100ms ease-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-570, t:transform 125ms ease-in]"></div>
			<span init-with="p:[op:0, tr:translateY(10%)]"
				on-init="p:[op:1:delay-650,tr:translateY(0):delay-650, t:all 500ms cubic-bezier(.71#.06#.47#.63)]">This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateY(10%)]"
				on-init="p:[op:1:delay-450,tr:translateY(0):delay-450, t:all 300ms cubic-bezier(.71#.06#.47#.63)]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-left" ng-if='activeType === "line-left"'>
		<span init-with="p:[tr:scale(0)]"
				on-init="p:[tr:scale(1), t:transform 150ms ease-out]"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0.9):delay-450, t:background 500ms cubic-bezier(.71#.06#.47#.63)]">
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-375, t:transform 125ms ease-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-570, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-570, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-375, t:transform 125ms ease-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-250, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1), t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1), t:transform 250ms ease-in-out]"></div>
			<span init-with="p:[op:0, tr:translateX(-10%)]"
				on-init="p:[op:1:delay-450,tr:translateX(0):delay-450, t:all 500ms cubic-bezier(.71#.06#.47#.63)]">This is a tip with a button.</span>
			<button class="bg-moxie"
				init-with="p:[op:0, tr:translateX(-10%)]"
				on-init="p:[op:1:delay-650,tr:translateY(0):delay-650, t:all 300ms cubic-bezier(.71#.06#.47#.63)]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-right" ng-if='activeType === "line-right"'>
		<span init-with="p:[tr:scale(0)]"
				on-init="p:[tr:scale(1), t:transform 150ms ease-out]"></span>
		<div init-with="p:[background:rgba(255#255#255#0)]"
		 	on-init="p:[background:rgba(255#255#255#0.9):delay-450, t:background 500ms cubic-bezier(.71#.06#.47#.63)]">
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-570, t:transform 125ms ease-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-450, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-250, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-450, t:transform 125ms ease-in]"></div>
			<div init-with="p:[tr:scaleX(0)]" on-init="p:[tr:scaleX(1):delay-570, t:transform 125ms ease-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-750, t:transform 250ms ease-in-out]"></div>
			<div init-with="p:[tr:scaleY(0)]" on-init="p:[tr:scaleY(1):delay-750, t:transform 250ms ease-in-out]"></div>
			<span init-with="p:[op:0, tr:translateX(10%)]"
				on-init="p:[op:1:delay-450,tr:translateX(0):delay-450, t:all 500ms cubic-bezier(.71#.06#.47#.63)]">This is a tip with a button.</span>
			<button class="bg-moxie" init-with="p:[op:0, tr:translateX(10%)]"
				on-init="p:[op:1:delay-650,tr:translateX(0):delay-650, t:all 300ms cubic-bezier(.71#.06#.47#.63)]">Okay</button>
		</div>
	</div>
</div>
