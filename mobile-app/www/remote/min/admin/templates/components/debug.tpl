<div>
    <anim-tools ng-if='scope.animTools' ng-class="{'animated slideInDown':scope.animTools.show, 'animated slideOutUp':!scope.animTools.show}" active="scope.animTools.show" ng-model="scope.animTools.stage"> </anim-tools>

    <div id='admin-anim-tools' class='bg-charcoal txt-white fixed bottom-0 left-0 full-x'
		ng-if='debug.options.showToolbar'
		init-with="p:[z-index:9999]">
        <div class="flex full-x bg-slate-50p">
            <div class="bg-moxie txt-white p15xy flex-center-vertical">
                <h2 class="uppercase txt-18 semibold">{{parent.name}} States</h2>
				<div class="flex" mobile>
                    <a ng-click='playAllStates()' ng-class="{'opacity-1': debug.options.toggles.play}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-36-24 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"></a>
                    <!-- <a init-with="prop:[opacity:0.5]" class="flex-center bg bg-transparent radius-2 m05left p10left svg-stroke-6 svg-48" ng-click='spec.toggles.record()' ng-include="root.base_url + 'shared/templates/components/svg/main/record.html'"></a> -->
                    <a ng-click='debug.options.toggles.settings = !debug.options.toggles.settings' ng-class="{'opacity-1': debug.options.toggles.settings}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-36-24 opacity-50" ng-click='spec.toggles.settings()' ng-include="root.base_url + 'shared/templates/components/svg/main/settings.html'"></a>
                </div>
            </div>
            <ul class="relative flex-center-vertical-wrap p15-grid">
				<li ng-repeat='state in debug.states' ng-click='playState(debug.states[$index])' ng-show="!debug.options.toggles.settings">
                    <button class="height-36 txt-18 radius-2 normal flex-center padding-none" ng-class="{'bg-moxie reverse':state.played, 'bg-moxie':!state.played}">
						<span class="flex-center height-36 radius-2-left p10x" ng-class="{'bg-moxie txt-white weight-600':state.played, 'bg-white txt-moxie':!state.played}">#{{state.id}}</span>
						<span class="flex-center height-36 p10x">{{state.trigger}}</span>
                        <span ng-if='state.played' class='svg-36-24 svg-stroke-10 stroke-moxie' style="margin-left: -10px" ng-include="root.base_url + 'shared/templates/components/svg/main/check.html'"></span>
                    </button>
                </li>

                <li ng-repeat='(key, option) in debug.options.readOnly track by $index' ng-click='playState(debug.states[$index])' ng-show="debug.options.toggles.settings">
                    <div class='border-2 border-dashed border-taupe radius-2 flex-center height-36 p10x txt-3'>
                        <span class='weight-800'>{{key}}:</span>&nbsp;<span class='weight-400'>{{option}}</span>
                    </div>
                </li>

                <li class='absolute top-0 right-0 p15x full-y flex-wrap-center' desktop>
                    <a ng-click='playAllStates()' ng-class="{'opacity-1': debug.options.toggles.play}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-include="root.base_url + 'shared/templates/components/svg/main/play.html'"></a>
                    <!-- <a init-with="prop:[opacity:0.5]" class="flex-center bg bg-transparent radius-2 m05left p10left svg-stroke-6 svg-48" ng-click='spec.toggles.record()' ng-include="root.base_url + 'shared/templates/components/svg/main/record.html'"></a> -->
                    <a ng-click='debug.options.toggles.settings = !debug.options.toggles.settings' ng-class="{'opacity-1': debug.options.toggles.settings}" class="flex-center bg bg-transparent flex-right radius-2 svg-stroke-8 svg-48-36 opacity-50" ng-click='spec.toggles.settings()' ng-include="root.base_url + 'shared/templates/components/svg/main/settings.html'"></a>
                </li>
            </ul>
        </div>
    </div>
</div>
