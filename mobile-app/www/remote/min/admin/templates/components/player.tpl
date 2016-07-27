<div>
    <div class='ugrid flex-stretch full-x'>
        <a ng-if='!state.play' ng-click='play()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
        <a ng-if='state.play && state.play' ng-click='pause()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
        <a ng-if='state.complete' ng-click='update()' class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
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