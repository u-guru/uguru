<div id='transition-player'>
    <div class='ugrid flex-stretch full-x'>
        <a ng-if='!state.play' ng-click='play()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
        <a ng-if='state.play && state.play' ng-click='pause()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
        <a ng-if='state.complete' ng-click='update()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
        <span class='p10x p05y bg-charcoal m10x txt-2 weight-600' ng-show='activeAttrIndex === $index || activeAttrIndex < 0' ng-repeat='(key, value) in props.attr track by $index' ng-if='props.attr' ng-click='activateAttr($index, key); ' ng-class='{"txt-charcoal bg-smoke":activeAttrIndex === $index}' on-hold="value.activate && value.activate()">
            <span class='opacity-50'>{{key}}</span>: {{value.type}}
        </span>
        <span ng-if='activeAttrIndex >= 0' ng-repeat='(k,v) in activeAttrArr track by $index' class='bg-slate p10x p05y m10x txt-2 weight-600'>
            <span class='opacity-50'>{{k}}</span>: {{v}}
        </span>
        <span ng-if='activeAttrIndex >= 0' class='bg-charcoal uppercase weight-800' ng-click='goBackOneLevel()'>
            Back
        </span>
    </div>
<div class='flex-vertical-center flex-stretch'>
    <span class='p10xy'>
        {{startOffset}}
    </span>
    <input type='range' ng-model="startOffset" ng-mouseup="update(startOffset)" min="0" max="{{duration}}" > </input>
    <span class='p10xy'>
        {{duration}}
    </span>

</div>