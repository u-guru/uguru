<div class='absolute full-xy top-0 left-0' style='width:{{stream.html.width}}'  ng-mouseenter="chart.onMouseEnter(stream, $event)" ng-mouseleave="chart.onMouseLeave(stream, $event)">

    <!-- point information -->
    <div class='absolute bottom-0 left-0 full-x flex-center' ng-if='chart.showDetails'>
		<div class="p05y-p10x bg-slate radius-2">
			<span class="opacity-50p">@T = </span>
			<span class="black">{{chart.lastPointHoveredIndex}}</span>
			<span class="opacity-50p">, {{stream.name}}:</span>
			<span class="black">{{stream.plot.values[chart.lastPointHoveredIndex]}}</span>
		</div>
    </div>

	<!-- chart line -->
    <div class='absolute full-xy bottom-0'>

        <svg ng-if='chartReady && chart.vb'
			ng-attr-view_Box='{{[chart.vb.x1,chart.vb.y1,chart.vb.x2, chart.vb.y2].join(" ")}}'
			ng-attr-width="{{chart.html.width.replace('px', '')}}" ng-attr-height="{{chart.height}}">
            <path stroke="white" stroke-linecap="round" stroke-width="5" stroke-linejoin="round" fill="none"
				ng-attr-d="{{chart.path.path}}"></path>
            <circle id='main-circle-{{stream.id}}' class='{{stream.name}}-plot-ball'
				r="10" cx="0"
				cy="{{chart.path.points[1][0].y}}"
				fill="#F04F54"></circle>
            <circle class='{{stream.name}}-plot-ball'
				r="5" fill="white"
				ng-if='chart.mouseEntered && $index > 0'
				ng-repeat='point in chart.path.points'
				ng-mouseleave="chart.onMousePointLeave(point, $event)"
				ng-mousedown="chart.onMousePointDown(point, $event)"
				on-release="chart.onMousePointUp(point, $event)"
				ng-mouseenter="chart.onMousePointEnter($index, point, $event)"
				ng-attr-cx="{{point[0].x}}" ng-attr-cy="{{point[0].y}}"></circle>
        </svg>
    </div>

	<!-- chart overlay -->
    <div class='z-index-100 absolute top-0 left-0 full-x bg-slate-90p txt-16 radius-2 txt-center'
		chart-overlay ng-show='stream.showProps'>
        <ul class="p15-grid flex-wrap">
			<li>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Stream</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">#{{stream.id}}</span>
			</li>

	        <li>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Property</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.name}}</span>
	        </li>

			<li>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Values</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.values[0]}} &rarr; {{stream.values[stream.values.length-1]}}</span>
			</li>

			<li>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Duration</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.duration}}ms</span>
			</li>

	        <li ng-if='stream.offset'>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Delay</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.offset}}ms</span>
			</li>

	        <li ng-if='stream.direction'>
	            <!-- add ng-if='stream.direction.current === "f"' to any svg paths/svgs/icons you want visually set it up the way you prefer -->
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Direction</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.direction.current}}</span>
	        </li>

	        <!-- set this to >1 if you want the iteration count only when its more than once-->
	        <li ng-if='stream.iter.count.total >= 1'>
	            <!-- current iteration count-->
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Iterations</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">
		            <span>
		                {{stream.iter.count.current}}/{{stream.iter.count.total}}
		            </span>
		            <span ng-if='stream.iter.infinite'>
		                Infinite
		            </span>
				</span>
			</li>

			<li ng-if='stream.iter.btwn'>
				<span class="block p05y-p10x radius-2-top bg-light-slate txt-14">
					<span class="opacity-50p">Iteration Delay</span>
				</span>
				<span class="block p05y-p10x radius-2-bottom bg-moxie semibold">{{stream.iter.btwn}}ms</span>
	        </li>
		</ul>
    </div>
</div>
