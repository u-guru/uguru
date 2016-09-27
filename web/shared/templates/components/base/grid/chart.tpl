<div class='absolute full-y top-0 left-0' style='width:{{stream.html.width}}'>
    <span class='full-x absolute top-0 left-0 bg-charcoal opacity-50p txt-smoke weight-900 text-center full-x'>{{stream.duration}}ms, {{stream.values[0]}} {{stream.values[stream.values.length - 1]}} </span>
    <svg class='absolute left-0 bottom-0' ng-if='chartReady && chart.vb' ng-attr-view_Box='{{[chart.vb.x1,chart.vb.y1,chart.vb.x2, chart.vb.y2].join(" ")}}'  ng-attr-width="{{chart.html.width.replace('px', '')}}" ng-attr-height="{{chart.height}}" fill="transparent">
        <path stroke="white" stroke-linecap="round" stroke-width="2" stroke-linejoin="round" ng-attr-d="{{chart.path.path}}">
    </svg>
</div>