<div>
    <anim-tools ng-if='scope.animTools' ng-class="{'animated slideInDown':scope.animTools.show, 'animated slideOutUp':!scope.animTools.show}" active="scope.animTools.show" ng-model="scope.animTools.stage"> </anim-tools>

    <div class='bg-auburn txt-white p15-grid fixed bottom-0 left-0 full-x' id='admin-anim-tools' ng-if='debug.options.showToolbar'>
        <div class="flex full-x">
            <div class="bg-charcoal txt-moxie p15xy flex-center-vertical width-128">
                <h2 class="uppercase txt-18 semibold">{{parent.name}} States</h2>
            </div>
            <ul class="relative flex-center-vertical-wrap p15-grid flex-stretch" style="width: calc(100% - 128px);">
                <li ng-repeat='state in debug.states' ng-click='playState(debug.states[$index])' ng-show="!debug.options.toggles.settings">
                    <button class="height-36 txt-18 radius-2 normal p15-grid ugrid-2" ng-class="{'bg-smoke txt-moxie weight-600':state.played, 'bg-moxie':!state.played}">
                        #{{state.id}} | {{state.trigger}}
                        <span ng-if='state.played' class='svg-24 svg-stroke-7 txt-moxie' ng-include="root.base_url + 'shared/templates/components/svg/main/check.html'"></span>
                    </button>
                </li>

                <li class='flex-wrap-center' ng-repeat='(key, option) in debug.options.readOnly track by $index' ng-click='playState(debug.states[$index])' ng-show="debug.options.toggles.settings">
                    <div class='border-2 border-dashed border-white flex-wrap-center p10xy txt-3'>
                        <span class='weight-800'> {{key}}:</span> <span class='weight-400'> {{option}} </span>
                    </div>
                </li>

                <li class='absolute top-0 right-0 m20x  full-y flex-wrap-center' >
                    <a ng-click='playAllStates()' ng-class="{'opacity-1': debug.options.toggles.play}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"></a>
                    <a init-with="prop:[opacity:0.5]" class="flex-center bg bg-transparent radius-2 m05left p10left svg-stroke-6 svg-48" ng-click='spec.toggles.record()' ng-include="root.base_url + 'shared/templates/components/svg/main/record.html'"></a>
                    <a ng-click='debug.options.toggles.settings = !debug.options.toggles.settings' ng-class="{'opacity-1': debug.options.toggles.settings}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-click='spec.toggles.settings()' ng-include="root.base_url + 'shared/templates/components/svg/main/settings.html'"></a>
                </li>
            </ul>
        </div>
    </div>
</div>