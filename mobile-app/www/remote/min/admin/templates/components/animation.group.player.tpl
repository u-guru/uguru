<div id='transition-player' class="bg-slate fixed top-0 left-0 full-x z-index-1000">
    <div class="bg-cobalt-25p">
        <div class='flex-stretch full-x bg-cobalt-slate-campus-50p overflow-hidden relative z-index-9 hide' ng-repeat='animation in animations'>
            <div class="bg-moxie width-128 flex-center-vertical p15x overflow-hidden">
                <h1 class="semibold txt-20">{{animation.name}}</h1>
            </div>
            <ul class="p15-grid flex-center-vertical overflow-auto no-scrollbar" style="width: calc(100% - 128px);">
                <li ng-repeat='(key, value) in animation track by $index' ng-if='["css", "listeners",  "element", "template", "obj"].indexOf(key) === -1'>
                    <span class='block radius-2 p10x-p05y bg-charcoal txt-1 weight-600' ng-class='{"txt-rocket bg-smoke":activeAttrIndex === $index, "txt-rocket bg-smoke opacity-50":activeAttrIndex >= $index}' style="white-space: nowrap;"
                        ng-click='activateAttr($index, key);'
                        on-hold="value.activate && value.activate()">
                        <span class='opacity-50'>{{mappings[key]}}</span>:&nbsp;{{value}}
                    </span>
                </li>
                <li ng-if='activeAttrIndex >= 0' ng-repeat='(k,v) in activeAttrArr track by $index'>
                    <span class='block bg-rocket txt-1 weight-600' style="white-space: nowrap;">
                        <span class="block radius-2 p10x-p05y bg-slate-25p">
                            <span class='opacity-50'>{{k}}</span>:&nbsp;{{v}}
                        </span>
                    </span>
                </li>
            </ul>
            <div class="flex-center bg-white-25p" style="width: 60px;" ng-if='activeAttrIndex >= 0'>
                <a ng-click='goBackOneLevel()' class="flex-center svg-white svg-stroke-8 svg-48-36" ng-include="root.base_url + 'shared/templates/components/svg/main/left.html'"> </a>
            </div>
        </div>

        <!-- @samir -->
        <!-- This is what repeated elements would look like -->
        <!-- Clicking on one expands it; I would like a switch so that clicking it again would shrink it -->
        <div ng-if="false" class='flex-stretch full-x bg-cobalt-slate-campus-25p overflow-hidden relative z-index-8' style="height: 60px;"
            init-with="p:[margin-top:-50px, t:all 150ms ease-out]" ng-repeat='animation in animations'
            on-click="p:[margin-top:0]">
            <!--  I commented this out because it was expanding by default, see the @samir-2 section -->
            <!-- when-click-expand="p:[margin-top:0]"
            when-click-shrink="p:[margin-top:-50px]" -->
            <div class="bg-robin width-128 flex-center-vertical p15x">
                <h1 class="semibold txt-20">{{animation.name}}</h1>
            </div>
            <ul class="p15-grid flex-center-vertical overflow-auto no-scrollbar" style="width: calc(100% - 128px);">
                <li ng-repeat='(key, value) in props.attr track by $index' ng-if='props.attr'>
                    <span class='block radius-2 p10x-p05y bg-charcoal txt-1 weight-600' ng-class='{"txt-rocket bg-smoke":activeAttrIndex === $index, "txt-rocket bg-smoke opacity-50":activeAttrIndex >= $index}' style="white-space: nowrap;"
                        ng-click='activateAttr($index, key);'
                        on-hold="value.activate && value.activate()">
                        <span class='opacity-50'>{{key}}</span>:&nbsp;{{value.type}}
                    </span>
                </li>
                <li ng-if='activeAttrIndex >= 0' ng-repeat='(k,v) in activeAttrArr track by $index'>
                    <span class='block bg-rocket txt-1 weight-600' style="white-space: nowrap;">
                        <span class="block radius-2 p10x-p05y bg-slate-25p">
                            <span class='opacity-50'>{{k}}</span>:&nbsp;{{v}}
                        </span>
                    </span>
                </li>
            </ul>
            <div class="flex-center bg-white-25p" style="width: 60px;" ng-if='activeAttrIndex >= 0'>
                <a ng-click='goBackOneLevel()' class="flex-center svg-white svg-stroke-8 svg-48-36" ng-include="root.base_url + 'shared/templates/components/svg/main/left.html'"> </a>
            </div>
        </div>
        <div ng-if="false" class='flex-stretch full-x bg-cobalt-slate-campus-50p overflow-hidden relative z-index-7' style="height: 60px;"
            init-with="p:[margin-top:-50px, t:all 150ms ease-out]"
            on-click="p:[margin-top:0]">
            <!--  I commented this out because it was expanding by default, see the @samir-2 section -->
            <!-- when-click-expand="p:[margin-top:0]"
            when-click-shrink="p:[margin-top:-50px]" -->
            <div class="bg-moxie width-128 flex-center-vertical p15x">
                <h1 class="semibold txt-20">element</h1>
            </div>
            <ul class="p15-grid flex-center-vertical overflow-auto no-scrollbar" style="width: calc(100% - 128px);">
                <li ng-repeat='(key, value) in props.attr track by $index' ng-if='props.attr'>
                    <span class='block radius-2 p10x-p05y bg-charcoal txt-1 weight-600' ng-class='{"txt-rocket bg-smoke":activeAttrIndex === $index, "txt-rocket bg-smoke opacity-50":activeAttrIndex >= $index}' style="white-space: nowrap;"
                        ng-click='activateAttr($index, key);'
                        on-hold="value.activate && value.activate()">
                        <span class='opacity-50'>{{key}}</span>:&nbsp;{{value.type}}
                    </span>
                </li>
                <li ng-if='activeAttrIndex >= 0' ng-repeat='(k,v) in activeAttrArr track by $index'>
                    <span class='block bg-rocket txt-1 weight-600' style="white-space: nowrap;">
                        <span class="block radius-2 p10x-p05y bg-slate-25p">
                            <span class='opacity-50'>{{k}}</span>:&nbsp;{{v}}
                        </span>
                    </span>
                </li>
            </ul>
            <div class="flex-center bg-white-25p" style="width: 60px;" ng-if='activeAttrIndex >= 0'>
                <a ng-click='goBackOneLevel()' class="flex-center svg-white svg-stroke-8 svg-48-36" ng-include="root.base_url + 'shared/templates/components/svg/main/left.html'"> </a>
            </div>
        </div>
        <!-- end @samir -->

        <div class='flex-center-vertical-stretch'>
            <ul class="p15-grid flex">
                <!-- @samir-2 -->
                <!-- This is where you would expand or shrink all sections. I commented this out because it was throwing an error for :public, not sure how to fix -->
                <!-- <li init-default
                    when-click-expand="p:[display:none]"
                    when-click-shrink-"p:[display:block]">
                    <a class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/arrow.html'"
                        init-with="p:[tro:center center, tr:rotate(180deg)]"
                        on-click="s:[click-expand]"> </a>
                </li>
                <li init-default
                    when-click-shrink="p:[display:none]"
                    when-click-expand-"p:[display:block]">
                    <a class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/arrow.html'"
                        init-default
                        on-click="s:[click-shrink]"> </a>
                </li> -->
                <li>
                    <a ng-click='playAll()' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"> </a>
                </li>

                <li ng-if='state.play && state.play'>
                    <a ng-click='pause()' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/pause.html'"> </a>
                </li>
                <li ng-if='state.complete'>
                    <a ng-click='update()' class="flex-center svg-white svg-stroke-8 svg-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/sync.html'"> </a>
                </li>
            </ul>
            <span class='p15y-p15right semibold txt-20'>
                {{startOffset}}
            </span>
            <input type='range' ng-model="startOffset" ng-mouseup="update(startOffset)" min="0" max="{{duration}}" > </input>
            <span class='p15xy semibold txt-20'>
                {{duration}}
            </span>
        </div>
    </div>
</div>
