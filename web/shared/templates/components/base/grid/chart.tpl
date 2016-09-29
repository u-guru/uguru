<div class='absolute full-xy top-0 left-0' style='width:{{stream.html.width}}'  ng-mouseenter="chart.onMouseEnter(stream, $event)" ng-mouseleave="chart.onMouseLeave(stream, $event)">

    <!-- top row-->
    <div class='full-x top-0 left-0 flex-vertical-center p15-grid bg-charcoal-50p' style='height:10%' ng-if='chart.showDetails'>
        <span class='weight-900'>
            <span class='text-right p10xy'>
                @T = {{chart.lastPointHoveredIndex}}, {{stream.name}}:{{stream.plot.values[chart.lastPointHoveredIndex]}}
            </span>
        </span>
    </div>
    <div class='absolute full-xy bottom-0'>
        <svg ng-if='chartReady && chart.vb' ng-attr-view_Box='{{[chart.vb.x1,chart.vb.y1,chart.vb.x2, chart.vb.y2].join(" ")}}'  ng-attr-width="{{chart.html.width.replace('px', '')}}" ng-attr-height="{{chart.height}}" fill="transparent">
            <path stroke="white" class='absolute' stroke-linecap="round" stroke-width="5" stroke-linejoin="round" ng-attr-d="{{chart.path.path}}"/>
            <circle r="10" cx="0" id='main-circle-{{stream.id}}' class='{{stream.name}}-plot-ball' cy="{{chart.path.points[1][0].y}}" fill="red"/>
            <circle ng-repeat='point in chart.path.points' r="10" fill="white" ng-mouseleave="chart.onMousePointLeave(point, $event)" ng-mousedown="chart.onMousePointDown(point, $event)" on-release="chart.onMousePointUp(point, $event)" ng-click="stream.applyProp(point[0].y)" ng-mouseenter="chart.onMousePointEnter($index, point, $event)" ng-if='chart.mouseEntered && $index > 0' ng-attr-cx="{{point[0].x}}" class='{{stream.name}}-plot-ball z-index-100' ng-attr-cy="{{point[0].y}}" fill="red"/>
        </svg>
    </div>
    <div chart-overlay  class='z-index-100 absolute top-0 left-0 full-x bg-azure-80p weight-700 txt-2' ng-show='stream.showProps'>
        <div class='full-x'>Stream Count: #{{stream.id}} </div>
        <div class='full-x'> {{stream.duration}} </div>
        <div class='full-x'>
            {{stream.name}}: from {{stream.values[0]}} to {{stream.values[stream.values.length-1]}}
        </div>
        <div class='full-x' ng-if='stream.offset'> Stream delay: {{stream.offset}} </div>
        <span ng-if='stream.direction'>
            <!--
                @girls just add ng-if='stream.direction.current === "f"' to any svg paths/svgs/icons you want visually set it up the way you prefer
            -->
            direction: {{stream.direction.current}}
        </span>
        <!-- set this to >1 if you want the iteration count only when its more than once-->
        <div class='' ng-if='stream.iter.count.total >= 1'>
            <!-- current iteration count-->
            <div class='full-x'>
                Iteration #: {{stream.iter.count.current}}/{{stream.iter.count.total}}
            </div>
            <div class='full-x' ng-if='stream.iter.infinite'>
                INFINITE
            </span>
            <div ng-if='stream.iter.btwn' class='full-x'>
                In btwn iterations: {{stream.iter.btwn}}
            </div>
        </div>
        <!-- property name (same as all the way on the left, start, end-->
        <div class='full-x'>
            duration {{stream.duration}}ms
        </div>
    </div>
</div>