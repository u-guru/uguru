
<div class='spec-template-wrapper high-z-index' style='min-height:10% !important;' eval-on-init="spec.ready()">
    <div id="spec-status-bar" style='z-index:10000;'  ng-show="spec.toggleStatus" class='bg-azure full-x fixed bottom-0 p05xy left-0'>
        <h4 class='txt-1 text-center weight-700'> {{spec.status_msg || 'status goes here'}} </h4>
    </div>
    <!-- ANIM TOOLS -->
    <anim-tools ng-if='spec.animTools.show' ng-class="{'animated slideInDown':spec.animTools.show, 'animated slideOutUp':!spec.animTools.show}" active="spec.animTools.show" ng-model="spec.animTools.stage"> </anim-tools>

    <!-- EXTERNAL -->
    <div id="dev-docs" ng-if="spec.toggleGoogleDoc || spec.toggleAllToolsBar" class='fixed full-x top-0 left-0 animated' style='height: calc(100% - 66px);'>
        <div class='relative full-xy' ng-if='spec.toggleGoogleDoc'>
            <iframe class='absolute full-xy animated opacity-0' src="{{spec.gdoc}}" on-init="opacity:1:delay-500" class-on-init="slideInDown"> </iframe>
        </div>
        <div class='relative full-xy'>
            <iframe ng-repeat='tool in spec.tools' class='absolute full-xy top-0 left-0'  src="{{tool.src}}" ng-if='tool.show'> </iframe>
        </div>
    </div>
    <!-- SEARCH DOCS (?) -->
    <div id="dev-docs" ng-if="spec.toggleDocSearch" class='fixed full-x top-0 left-0 animated' style='height: calc(100% - 66px);' ng-controller='AdminDocsController as docs'>
        <!-- @samir state list -->
        <div id='components-container' class='absolute top-0 left-0 full-x' ng-include='root.base_url + "admin/templates/docs/components.html"' ng-show='root.docs.resultItems.length' style="height: calc(100% - 66px)"></div>
        <ul class="absolute bottom-0 left-0 flex-center-vertical bg-charcoal full-x p15-grid ugrid-2">
            <li class='bg-charcoal flex-wrap-center'>
                <fieldset class="with-icon">
                    <input autofocus ng-model='root.docs.searchText' class="input-border light" type="text" placeholder="Search components">
                    <label></label>
                    <span class="input-icon">
                        <svg viewBox="0 0 100 100">
                            <path stroke="white" d="M42.5,71 C58.2401154,71 71,58.2401154 71,42.5 C71,26.7598846 58.2401154,14 42.5,14 C26.7598846,14 14,26.7598846 14,42.5 C14,58.2401154 26.7598846,71 42.5,71 Z M62.994485,62.994485 L85.6624699,85.6624699"></path>
                        </svg>
                    </span>
                    <a class="absolute top-0 right-0 flex-center z-index-100" ng-click='root.docs.searchText = "";' style="height: 24px;">
                        <i class='icon ion-close-circled txt-white'></i>
                    </a>
                </fieldset>
            </li>
            <li ng-if='root.docs.resultItems.length' class='flex-wrap-center'>
                {{root.docs.resultItems.length}} results found
            </li>
        </ul>
    </div>

    <!-- SPEC -->
    <div id="dev-spec" class='top-0 left-0 fixed full-x bg-smoke animated slideInDown' ng-class="{'z-index-1000': spec.toggleSpec}" ng-if="spec.toggleSpec" style='height: calc(100% - 66px);'>
        <div class='full-xy overflow-auto' ng-repeat="use_case in spec.use_cases">
            <div class="bg-slate txt-center">
                <h1 class='bg-cobalt-25p p15xy txt-28 weight-600 height-64 flex-center'><span class="weight-900">{{spec.title}}:&nbsp;</span> {{use_case.title}} </h1>
            </div>
            <ul class='full-x txt-charcoal ugrid-4 flex-stretch' style="height: calc(100% - 64px);">
                <li>
                    <div class="bg-moxie txt-white txt-center">
                        <h1 class='txt-20 semibold p10x-p10top'>{{use_case.columns.static.title}}</h1>
                        <h4 class='txt-1 opacity-75p p10x-p10bottom'>{{use_case.columns.static.status.percentage}}, {{use_case.columns.static.status.fraction}} complete</h4>
                    </div>
                    <ul class="p15-grid">
                        <li ng-repeat='item in use_case.columns.static.items'>
                            <div class="flex">
                                <checkbox class="checkbox-moxie" value="item.value" label="item.title" class="txt-slate flex-left checkbox-moxie"> </checkbox>
                                <div ng-if="item.status" class="m15left flex-center bg-moxie radius-2 semibold txt-14 p10x">
                                    <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                    <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                                </div>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox class="checkbox-moxie" value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-moxie"> </checkbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-robin txt-white txt-center">
                        <h1 class='txt-20 semibold p10x-p10top'>{{use_case.columns.micro.title}}</h1>
                        <h4 class='txt-1 opacity-75p p10x-p10bottom'>{{use_case.columns.micro.status.percentage}}, {{use_case.columns.micro.status.fraction}} complete</h4>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.micro.items'>
                            <checkbox class="checkbox-moxie" value="item.value" label="item.title" class="txt-slate flex-left checkbox-robin"> </checkbox>
                            <div ng-if="item.status" class="m15left flex-center bg-robin radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox class="checkbox-moxie" value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-robin"> </checkbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-azure txt-white txt-center">
                        <h1 class='txt-20 semibold p10x-p10top'>{{use_case.columns.macro.title}}</h1>
                        <h4 class='txt-1 opacity-75p p10x-p10bottom'>{{use_case.columns.macro.status.percentage}}, {{use_case.columns.macro.status.fraction}} complete</h4>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.macro.items'>
                            <checkbox class="checkbox-moxie" value="item.value" label="item.title" class="txt-slate flex-left checkbox-azure"> </checkbox>
                            <div ng-if="item.status" class="m15left flex-center bg-azure radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox class="checkbox-moxie" value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-azure"> </checkbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-lake txt-white txt-center">
                        <h1 class='txt-20 semibold p10x-p10top'>{{use_case.columns.icebox.title}}</h1>
                        <h4 class='txt-1 opacity-75p p10x-p10bottom'>{{use_case.columns.icebox.status.percentage}}, {{use_case.columns.icebox.status.fraction}} complete</h4>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.icebox.items'>
                            <checkbox class="checkbox-moxie" value="item.value" label="item.title" class="txt-slate flex-left checkbox-lake"> </checkbox>

                            <div ng-if="item.status" class="m15left flex-center bg-lake radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox class="checkbox-moxie" value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-lake"> </checkbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <!-- MOBILE -->
    <div ng-if='false' class='top-0 left-0 bg-smoke flex-wrap-center fixed bg-slate flex-wrap-center full-xy animated slideInDown z-index-2000' id='dev-bottom-bar' style='height: calc(100% - 66px);'>
        <div class='bg-slate' ng-include="spec.mobile.template" style='width:{{spec.mobile.width}}px !important; height: {{spec.mobile.height}}px !important;' class='animated bounceInDown relative' id='mobile-spec-container' > </div>
    </div>

    <!-- DEV TOOLBAR -->
    <div id="dev-toolbar" class='full-x bottom-0 left-0 absolute bg-slate bounceInUp-subtle' ng-if="spec.toggleDev">
        <!-- SHORTCUTS -->
        <div id='dev-bar-shortcuts' class="flex full-x animated bg-campus" ng-if='spec.showShortcuts'>
            <div class="bg-lake p15xy flex-center-vertical width-128">
                <h2 class="txt-18 semibold">Shortcuts</h2>
            </div>
            <ul class="flex-center-vertical p15-grid overflow-x no-scrollbar" style="width: calc(100% - 128px);">
                <li class="flex-center-vertical txt-16 semibold" ng-repeat='shortcut in spec.shortcuts_list' ng-click='spec.stateTagClicked(state_tag, $index)'>
                    <span class='bg-lake flex-center p15x height-36 radius-2 txt-18'>{{shortcut.key}}</span>
                    <span class="block m10left">{{shortcut.action}}</span>
                </li>
            </ul>
        </div>

        <!-- TOOLS -->
        <div class="flex bg-campus-75p full-x" ng-if='spec.toggleAllToolsBar'>
            <div class="bg-robin p15xy flex-center-vertical width-128">
                <h2 class="txt-18 semibold">Tools</h2>
            </div>
            <ul class='flex-center-vertical p15-grid overflow-x no-scrollbar' style="width: calc(100% - 128px);">
                <li ng-repeat='tool in spec.tools' ng-click="spec.showThirdPartyToolIframe(tool)">
                    <button class="bg-robin height-36 txt-18 radius-2 normal block">{{tool.name}}</button>
                </li>
            </ul>
        </div>

        <div class="flex bg-campus-50p full-x" ng-if='spec.selectedState.active'>
            <div class="bg-charcoal p15xy flex-center-vertical width-128">
                <h2 class="txt-18 weight-700"><span class='weight-400'>State:</span class='weight-400'> {{spec.selectedState.stateName}}</h2>
            </div>
            <ul class="flex-center-vertical p15-grid overflow-x no-scrollbar" style="width: calc(100% - 128px);">
                <li ng-repeat='element in spec.selectedState.elements' ng-click='spec.stateTagClicked(state_tag, $index)' on-hold="spec.settings.updateDefaultState($event, $index, state_tag)">
                    <div ng-class="{'reverse':spec.settings.cache.defaultState.index === $index }" class="bg-moxie height-36 txt-18 radius-2 normal block">{{element.elem.nodeName + ' ' +  element.elem.className}}</div>
                </li>

            </ul>
        </div>
        <div class="flex bg-campus-50p full-x" ng-if='spec.showStates'>
            <div class="bg-moxie p15xy flex-center-vertical width-128">
                <h2 class="txt-18 semibold">States</h2>
            </div>
            <ul class="flex-center-vertical p15-grid overflow-x no-scrollbar" style="width: calc(100% - 128px);">
                <li ng-repeat='state_tag in spec.stateTags' ng-click='spec.stateTagClicked(state_tag, $index)' on-hold="spec.settings.updateDefaultState($event, $index, state_tag)">
                    <button ng-if="!state_tag.selector.length && !state_tag.selector.length" ng-class="{'reverse':spec.settings.cache.defaultState.index === $index }" class="bg-moxie height-36 txt-18 radius-2 normal block">{{state_tag.stateName}} - {{state_tag.elements.length}}</button>
                    <button ng-if="state_tag.selector.length" style='border: 4px dashed white;' data-attr-testing-params="{{state_tag.testing}}" data-attr-selector="{{state_tag.selector}}" ng-class="{'reverse':spec.settings.cache.defaultState.index === $index }" class="bg-moxie height-36 txt-18 radius-2 normal block">{{state_tag.stateName}} - {{state_tag.elements.length}}</button>
                </li>

            </ul>
        </div>

        <!-- SETTINGS -->
        <div id='dev-bar-settings' class="animated flex bg-campus-25p" ng-if='spec.showSettings'>
            <div class="bg-shamrock p15xy flex-center-vertical width-128">
                <h2 class="txt-18 semibold">Settings</h2>
            </div>
            <ul class="flex-center-vertical-wrap p15-grid overflow-x no-scrollbar" style="width: calc(100% - 128px)">
                <li>
                    <button class="height-36 txt-18 bg-shamrock radius-2 normal block" ng-click='spec.docs.launch()'>External Docs</button>
                </li>
                <li>
                    <button class="height-36 txt-18 bg-shamrock radius-2 normal block" ng-click='spec.toggles.shortcuts()'>Shortcuts</button>
                </li>
                <li ng-if='false'>
                    <button class="height-36 txt-18 bg-shamrock radius-2 normal block" ng-click='spec.toggles.spec()'>Spec</button>
                </li>
                <li>
                    <button class='height-36 txt-18 bg-shamrock radius-2 normal block' ng-click='spec.openGDoc()'>External Spec</button>
                </li>
                <li>
                    <button class="height-36 txt-18 bg-shamrock radius-2 normal block" ng-click='spec.open()'>CP Spec</button>
                </li>
                <li>
                    <form ng-if='spec.initCodepenData' action="http://codepen.io/pen/define" method="POST" target="_blank">
                        <input type="hidden" name="data" value='{{spec.initCodepenData}}'>
                        <input class="bg bg-shamrock txt-18 height-36 semibold radius-2 p15x" type="submit" id='codepen-input' value="+ Uguru CP">
                    </form>
                </li>
                <li>
                    <div class="flex-center-vertical">
                        <checkbox value='spec.settings.cache.autoApplyState' on-change="spec.settings.updateProperty"></checkbox>
                        <div class="p15left txt-18 semibold">Auto Apply State</div>
                    </div>
                </li>
                <li>
                    <div class="flex-center-vertical">
                        <checkbox value='spec.settings.cache.autoShowMobile' on-change="spec.settings.updateProperty"></checkbox>
                        <div class="p15left txt-18 semibold">Auto Show Mobile</div>
                    </div>
                </li>
                <li>
                    <div class="flex-center-vertical">
                        <checkbox value='spec.settings.cache.autoShowDevBar' on-change="spec.settings.updateProperty"></checkbox>
                        <div class="p15left txt-18 semibold">Auto Show Toolbar</div>
                    </div>
                </li>
                <li>
                    <div class="flex-center-vertical">
                        <input class="radius-2 height-36 p15x txt-center txt-16" ng-change="spec.settings.updateProperty()" ng-model="spec.settings.cache.autoApplyDelay" size="5"/>
                        <div class="p15left txt-18 semibold">Default Delay</div>
                    </div>
                </li>
                <li>
                    <button class="height-36 txt-18 bg-shamrock radius-2 normal block" ng-click='spec.settings.clear()'>Clear Cache</button>
                </li>
            </ul>
        </div>

        <!-- MAIN -->
        <ul class='bg-cobalt-25p flex-center-vertical-wrap p15-grid relative'>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.toggles.settings()' ng-include="root.base_url + 'shared/templates/components/svg/main/settings.html'"></a>
            </li>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.toggles.record()' ng-include="root.base_url + 'shared/templates/components/svg/main/record.html'"></a>
            </li>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.toggleDocSearch = !spec.toggleDocSearch' ng-include="root.base_url + 'shared/templates/components/svg/main/search.html'"></a>
            </li>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.toggleGoogleDoc = !spec.toggleGoogleDoc;' ng-include="root.base_url + 'shared/templates/components/svg/main/transcript.html'"></a>
            </li>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.toggleAllToolsBar = !spec.toggleAllToolsBar;' ng-include="root.base_url + 'shared/templates/components/svg/main/star.html'"></a>
            </li>
            <li>
                <a class="flex-center bg bg-moxie radius-2 svg-stroke-6 svg-36-24" ng-click='spec.showStates = !spec.showStates' ng-include="root.base_url + 'shared/templates/components/svg/main/timeline.html'"></a>
            </li>
            <li class="flex">
                <a ng-class='{"bg-moxie":!spec.mobile.show, "bg-auburn":spec.mobile.show}' class='block bg radius-2 width-36 height-36' ng-click='spec.mobile.toggle()'>
                    <span class="flex-center svg-stroke-6 svg-36-24" ng-if='!spec.mobile.show' ng-include="root.base_url + 'shared/templates/components/svg/main/mobile.html'"></span>
                    <span class="flex-center svg-stroke-6 svg-36-24" ng-if='spec.mobile.show' ng-include="root.base_url + 'shared/templates/components/svg/main/desktop.html'"></span>
                </a>
            </li>
            <li ng-if='spec.mobile.show'>
                <a ng-class="{'bg-moxie': spec.mobile.height === 480}" class='txt-18 bg bg-slate height-36 semibold radius-2 flex-center p10x' ng-click='spec.mobile.height = 480; spec.mobile.width = 320; spec.mobile.toggle(true)'>iP4</a>
            </li>
            <li ng-if='spec.mobile.show'>
                <a ng-class="{'bg-moxie': spec.mobile.height === 568}" class='txt-18 bg bg-slate height-36 semibold radius-2 flex-center p10x' ng-click='spec.mobile.height = 568; spec.mobile.width = 320;spec.mobile.toggle(true)'>iP5</a>
            </li>
            <li ng-if='spec.mobile.show'>
                <a ng-class="{'bg-moxie': spec.mobile.height === 667}" class='txt-18 bg bg-slate height-36 semibold radius-2 flex-center p10x' ng-click='spec.mobile.height = 667; spec.mobile.width = 375;spec.mobile.toggle(true)'>iP6</a>
            </li>
            </li>
            <li ng-if='spec.mobile.show'>
                <a ng-class="{'bg-moxie': spec.mobile.height === 736}" class='txt-18 bg bg-slate height-36 semibold radius-2 flex-center p10x' ng-click='spec.mobile.height = 736; spec.mobile.width = 414;spec.mobile.toggle(true)'>iP6+</a>
            </li>
            <li ng-if='spec.mobile.show'>
                <input class="radius-2 height-36 p15x txt-center txt-18" type='text' placeholder="height" size="4" ng-change='spec.mobile.height.length > 2 && spec.mobile.toggle(true)' ng-model='spec.mobile.height' />
            </li>
            <li ng-if='spec.mobile.show'>
                <input class="radius-2 height-36 p15x txt-center txt-18" type='text' placeholder="width" size="4" ng-change='spec.mobile.width.length > 2 && spec.mobile.toggle(true)' ng-model="spec.mobile.width" />
            </li>
            <li ng-if='spec.settings.cache.defaultState.index'>
                <span class="height-36 txt-18 bg-white txt-moxie radius-2 p10x flex-center semibold">{{spec.stateTags[spec.settings.cache.defaultState.index].title || '-'}}</span>
            </li>
            <li id="codepen-edit" ng-if='spec.codepenData'>
                <form action="http://codepen.io/pen/define" method="POST" target="_blank">
                    <input type="hidden" name="data" value='{{spec.codepenData}}'/>
                    <input class="absolute top-0 left-0 z-index-10 opacity-0 height-48 width-48 round" type="submit" id='codepen-input' value=""/>
                    <span class="round bg-moxie svg-white svg-48-36 flex-center svg-stroke-5" ng-include="root.base_url + 'shared/templates/components/svg/main/edit.html'"></span>
                </form>
            </li>
        </ul>
    </div>
</div>
