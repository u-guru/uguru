<div class='spec-template-wrapper high-z-index' style='min-height:10% !important;' eval-on-init="spec.ready()">
    <anim-tools ng-if='spec.animTools.show' ng-class="{'animated slideInDown':spec.animTools.show, 'animated slideOutUp':!spec.animTools.show}" active="spec.animTools.show" ng-model="spec.animTools.stage"> </anim-tools>
    <div id="dev-docs" ng-if="spec.toggleGoogleDoc || spec.toggleAllToolsBar" class='fixed full-xy top-0 left-0 animated' style='height: calc(100% - 132px);'>
        <div class='relative full-xy' ng-if='spec.toggleGoogleDoc'>
            <iframe class='absolute full-xy animated opacity-0' src="{{spec.gdoc}}" on-init="opacity:1:delay-500" class-on-init="slideInDown"> </iframe>
        </div>
        <div class='relative full-xy'>
            <iframe ng-repeat='tool in spec.tools' class='absolute full-xy top-0 left-0'  src="{{tool.src}}" ng-if='tool.show'> </iframe>
        </div>
    </div>
    <div id="dev-docs" ng-if="spec.toggleDocSearch" class='fixed full-xy top-0 left-0 animated' style='height: calc(100% - 132px);' ng-controller='AdminDocsController as docs'>
        <div id="dev-toolbar" style='z-index:10000; bottom: 0px;' class='full-x left-0 absolute bg-slate animated slideInUp' ng-if="spec.toggleDocSearch">
        <!-- @samir state list -->
        <div id='components-container' class='fixed top-0 left-0 full-xy' ng-include='root.base_url + "admin/templates/docs/components.html"' ng-if='spec.toggleDocSearch'>
        </div>
            <ul class="bg-cobalt-50p flex-center-vertical bg-charcoal full-x overflow-x no-scrollbar">
                <li style='margin-bottom:27px !important; z-index:10000 !important;' class='full-x ugrid-2 bg-charcoal flex-wrap-center p15xy' style='margin-bottom:-15px;'>
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
                    <div ng-if='root.docs.resultItems.length' class='flex-wrap-center'>
                        {{root.docs.resultItems.length}} results found
                    </div>
                </li>
            </ul>
            <ul class="bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
                &nbsp;
            </ul>
            <ul class="bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
                &nbsp;
            </ul>
            <ul class="bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
                &nbsp;
            </ul>
        </div>
    </div>
    <div id="dev-spec" class='top-0 left-0 fixed full-x bg-smoke animated slideInDown' ng-class="{'z-index-1000': spec.toggleSpec}" ng-if="spec.toggleSpec" style='height: calc(100% - 132px);'>
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
                                <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-moxie"> </checkbox>
                                <div ng-if="item.status" class="m15left flex-center bg-moxie radius-2 semibold txt-14 p10x">
                                    <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                    <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                                </div>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-moxie"> </checkbox>
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
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-robin"> </checkbox>
                            <div ng-if="item.status" class="m15left flex-center bg-robin radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-robin"> </checkbox>
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
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-azure"> </checkbox>
                            <div ng-if="item.status" class="m15left flex-center bg-azure radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-azure"> </checkbox>
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
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-lake"> </checkbox>

                            <div ng-if="item.status" class="m15left flex-center bg-lake radius-2 semibold txt-14 p10x">
                                <span ng-if="item.status.percentage">{{item.status.percentage}},</span>
                                <span ng-if="item.status.fraction">&nbsp;{{item.status.fraction}}&nbsp;complete</span>
                            </div>
                            <ul ng-if='item.sub_items' class="p15left-p05right-p05y">
                                <li ng-repeat='sub_item in item.sub_items' class="p05xy">
                                    <checkbox value="sub_item.value" label="sub_item.text" class="small txt-slate flex-left checkbox-lake"> </checkbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div ng-if='false' class='top-0 left-0 bg-smoke flex-wrap-center fixed bg-slate flex-wrap-center full-xy animated slideInDown z-index-2000' id='dev-bottom-bar' style='height: calc(100% - 132px);'>
        <div class='bg-slate' ng-include="spec.mobile.template" style='width:{{spec.mobile.width}}px !important; height: {{spec.mobile.height}}px !important;' class='animated bounceInDown relative' id='mobile-spec-container' > </div>
    </div>
    <div id="dev-toolbar" class='full-x bottom-0 left-0 absolute bg-slate animated slideInUp' ng-if="spec.toggleDev">
        <ul id='dev-bar-shortcuts' class="bg-cobalt-30p flex-center-vertical p15-grid full-x animated overflow-x no-scrollbar" ng-if='spec.showShortcuts'>
            <li class='p15-grid text-center weight-500 bg-charcoal uppercase txt-2  flex-wrap-center'>
                Keyboard shortcuts
            </li>
            <li class='p15-grid' ng-repeat='shortcut in spec.shortcuts_list' ng-click='spec.stateTagClicked(state_tag, $index)'>

                <span class='txt-1 weight-500'>Press <span class='weight-900 txt-5'>{{shortcut.key}}</span> to {{shortcut.action}}</span>
            </li>
        </ul>
        <ul id='dev-bar-settings' class="flex-center-vertical full-x overflow-x no-scrollbar animated flex-wrap-center flex-stretch" ng-if='spec.showSettings' >
            <li class='p15-grid text-center weight-500 uppercase txt-2 bg-transparent flex-wrap-center bg-cobalt-30p'>
                Settings
            </li>
            <li class='full-x flex-stretch p15-grid'>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.docs.launch()'>External Docs</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggles.shortcuts()'>Keyboard Shortcuts</button>
                <button ng-if='false' class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggles.spec()'>Spec</button>
                <button class='height-36 txt-18 bg-moxie radius-2 normal block m15right' ng-click='spec.openGDoc()'> External Spec </button>
                <button class="height-36 m15right txt-18 bg-moxie radius-2 normal block" ng-click='spec.open()'>CP Spec</button>
                <div class='relative' style='width:100px;'>
                    <form class="absolute full-xy top-0 flex-wrap-center" ng-if='spec.initCodepenData' action="https://codepen.io/pen/define" method="POST" target="_blank">
                        <input type="hidden" name="data" value='{{spec.initCodepenData}}'>
                        <input class="bg bg-moxie txt-18 height-36 semibold radius-2 p15x" type="submit" id='codepen-input' value="+ Uguru CP">
                    </form>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-30p'>
                <div class='p10x'>Auto Apply State</div>
                <div>
                    <checkbox value='spec.settings.cache.autoApplyState' on-change="spec.settings.updateProperty">
                    </checkbox>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-30p'>
                <div class='p10x'>Auto Show Mobile</div>
                <div>
                    <checkbox value='spec.settings.cache.autoShowMobile' on-change="spec.settings.updateProperty">
                    </checkbox>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-30p'>
                <div class='p10x'>Auto Show ToolBar</div>
                <div>
                    <checkbox value='spec.settings.cache.autoShowDevBar' on-change="spec.settings.updateProperty">
                    </checkbox>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-50p'>
                <div>
                    <span class='p10x'>Default State</span>
                </div>
                <div>
                    <button class="height-36 txt-18 bg-robin radius-2 normal block" ng-if='spec.settings.cache.defaultState.index'>{{spec.stateTags[spec.settings.cache.defaultState.index].title}}</button>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-50p'>
                <div>
                    <span class='p10x'>Default Delay</span>
                </div>
                <div>
                    <input ng-change="spec.settings.updateProperty()" ng-model="spec.settings.cache.autoApplyDelay"> </input>
                </div>
            </li>
            <li class='p15-grid text-center weight-500 uppercase txt-6 flex-wrap-center bg-cobalt-50p'>
                <div>
                    <span class='p10x'>Clear Cache</span>
                </div>
                <div>
                    <button class="height-36 txt-18 bg-robin radius-2 normal block" ng-click='spec.settings.clear()'>clear</button>
                </div>
            </li>
        </ul>
        <ul ng-if='spec.toggleAllToolsBar' class='bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar'>
            <li class='txt-7 white uppercase'>
                <h1 class='weight-600'> 3rd Party Tools </h1>
            </li>
            <li ng-repeat='tool in spec.tools' ng-click="spec.showThirdPartyToolIframe(tool)">
                <button class="height-36 txt-18 radius-2 normal block">{{tool.name}}</button>
            </li>
        </ul>
        <ul ng-if='spec.showStates' class="bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
            <li ng-repeat='state_tag in spec.stateTags' ng-click='spec.stateTagClicked(state_tag, $index)' on-hold="spec.settings.updateDefaultState($event, $index, state_tag)">
                <button ng-class="{'bg-robin':spec.settings.cache.defaultState.index === $index }" class="height-36 txt-18 radius-2 normal block">{{state_tag.title}}</button>
            </li>
        </ul>
        <ul id="dev-toolbar-options" class='bg-cobalt-25p flex-center-vertical-space-between-wrap p15-grid'>
            <li class="flex">
                <!-- <a ng-click='dev.toggleSpec = !dev.toggleSpec' ng-class='{"bg-azure": dev.toggleSpec}'>View Spec</a> -->

                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggles.settings()'>Settings</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggles.record()'>Record</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggleDocSearch = !spec.toggleDocSearch'>Search Docs</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggleGoogleDoc = !spec.toggleGoogleDoc;'>Spec</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block " ng-click='spec.toggleAllToolsBar = !spec.toggleAllToolsBar;'>Tools</button>
            </li>
            <li class="flex">
                <div class="m15right" ng-if='spec.codepenData'>
                    <form action="https://codepen.io/pen/define" method="POST" target="_blank">
                        <input type="hidden" name="data" value='{{spec.codepenData}}'>
                        <input class="bg bg-moxie txt-18 height-36 semibold radius-2 p15x" type="submit" id='codepen-input' value="Edit in Codepen">
                    </form>
                </div>

                <div>
                    <button class="m15right height-36 txt-18 bg-moxie radius-2 normal block" ng-click='spec.showStates = !spec.showStates'>States</button>
                </div>
            </li>
            <li class='opacity-50 flex-wrap-center' id='spec-mobile-options'>
                <div class='ugrid-5'>
                    <button ng-class='{"full-x bg-moxie":!spec.mobile.show, "bg-auburn":spec.mobile.show}'class='txt-14 height-36 semibold' ng-click='spec.mobile.toggle()'>
                        <span ng-if='!spec.mobile.show'>Mobile</span>
                        <span ng-if='spec.mobile.show'>Desktop</span>
                    </button>
                    <button ng-if='spec.mobile.show' ng-class="{'bg-moxie': spec.mobile.height === 480}" class='txt-14 bg-slate height-36 semibold' ng-click='spec.mobile.height = 480; spec.mobile.width = 320; spec.mobile.toggle(true)'>iPhone 4
                    </button>
                    <button ng-if='spec.mobile.show' ng-class="{'bg-moxie': spec.mobile.height === 568}" class='bg-slate txt-14 height-36 semibold' ng-click='spec.mobile.height = 568; spec.mobile.width = 320;spec.mobile.toggle(true)'>
                        iPhone 5
                    </button>
                    <button ng-if='spec.mobile.show' ng-class="{'bg-moxie': spec.mobile.height === 667}" class='txt-14 bg-slate height-36 semibold' ng-click='spec.mobile.height = 667; spec.mobile.width = 375;spec.mobile.toggle(true)'>
                        iPhone 6
                    </button>
                    <button ng-if='spec.mobile.show' ng-class="{'bg-moxie': spec.mobile.height === 736}" class='txt-14 bg-slate height-36 semibold' ng-click='spec.mobile.height = 736; spec.mobile.width = 414;spec.mobile.toggle(true)'>iPhone 6
                    </button>
                </div>
                <input ng-if='spec.mobile.show' class="m15left radius-2 height-36 p15x txt-center" type='text' placeholder="height" size="4" ng-change='spec.mobile.height.length > 2 && spec.mobile.toggle(true)' ng-model='spec.mobile.height' />
                <input ng-if='spec.mobile.show' class="m15left radius-2 height-36 p15x txt-center" type='text' placeholder="width" size="4" ng-change='spec.mobile.width.length > 2 && spec.mobile.toggle(true)' ng-model="spec.mobile.width" />
            </li>
            <!-- <li class='opacity-50' style="width: 300px;">
                <dropdown class="states-dropdown reverse hide-header height-36 dropdown-moxie full-x" ng-model="spec.statesDropdown"></dropdown>
            </li> -->
        </ul>
    </div>
</div>
