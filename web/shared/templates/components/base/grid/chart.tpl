<div class='absolute full-xy top-0 left-0' style='width:{{stream.html.width}}' on-hold="stream.showProps = true" on-release="stream.showProps = false;">

    <div class='absolute full-xy bottom-0'>
        <svg ng-if='chartReady && chart.vb' ng-attr-view_Box='{{[chart.vb.x1,chart.vb.y1,chart.vb.x2, chart.vb.y2].join(" ")}}'  ng-attr-width="{{chart.html.width.replace('px', '')}}" ng-attr-height="{{chart.height}}" fill="transparent">
            <path stroke="white" stroke-linecap="round" stroke-width="2" stroke-linejoin="round" ng-attr-d="{{chart.path.path}}">
        </svg>
    </div>
    <div chart-overlay  class='z-index-100 absolute top-0 left-0 full-xy bg-azure-80p weight-700 txt-2' ng-show='stream.showProps'>
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