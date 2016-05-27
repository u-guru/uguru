<div class='fixed full-xy' ng-show='spec.toggleSpec || spec.toggleDev'>
    <div id="dev-spec" class='top-0 left-0 absolute full-x bg-smoke animated slideInDown' ng-class="{'z-index-1000': spec.toggleSpec}" ng-hide="!spec.toggleSpec" style='height: calc(100% - 66px);'>
        <div class='full-xy overflow-auto' ng-repeat="use_case in spec.use_cases">
            <div class="bg-slate txt-center">
                <h1 class='bg-cobalt-25p p15xy txt-28 weight-600 height-64 flex-center'><span class="weight-900">{{spec.title}}:&nbsp;</span> {{use_case.title}} </h1>
            </div>
            <ul class='full-x txt-charcoal ugrid-4 flex-stretch' style="height: calc(100% - 64px);">
                <li>
                    <div class="bg-moxie txt-white txt-center">
                        <h1 class='txt-20 semibold p10xy'>{{use_case.columns.static.title}}</h1>
                    </div>
                    <ul class="p15-grid">
                        <li ng-repeat='item in use_case.columns.static.items'>
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-moxie"> </checkbox>
                            <ul ng-if='item.sub_items' class='nested-action-item'>
                                <li ng-repeat='sub_item in item.sub_items'> {{sub_item.text}} </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-robin txt-white txt-center">
                        <h1 class='txt-20 semibold p10xy'>{{use_case.columns.micro.title}}</h1>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.micro.items'>
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-robin"> </checkbox>
                            <ul ng-if='item.sub_items' class='nested-action-item'>
                                <li ng-repeat='sub_item in item.sub_items'> {{sub_item.text}} </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-azure txt-white txt-center">
                        <h1 class='txt-20 semibold p10xy'>{{use_case.columns.macro.title}}</h1>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.macro.items'>
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-azure"> </checkbox>
                            <ul ng-if='item.sub_items' class='nested-action-item'>
                                <li ng-repeat='sub_item in item.sub_items'> {{sub_item.text}} </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="bg-lake txt-white txt-center">
                        <h1 class='txt-20 semibold p10xy'>{{use_case.columns.icebox.title}}</h1>
                    </div>
                    <ul>
                        <li class='p10xy' ng-class="{'flex-stretch': !item.sub_items && !item.sub_items.length}" ng-repeat='item in use_case.columns.icebox.items'>
                            <checkbox value="item.value" label="item.title" class="txt-slate flex-left checkbox-lake"> </checkbox>
                            <ul ng-if='item.sub_items' class='nested-action-item'>
                                <li ng-repeat='sub_item in item.sub_items'> {{sub_item.text}} </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div ng-if='spec.mobile.show' class='top-0 left-0 bg-smoke flex-wrap-center absolute full-x animated slideInDown z-index-2000' style='height: calc(100% - 66px);'>
        <iframe class='animated bounceInDown relative' style='height:{{spec.mobile.height}}px; width: {{spec.mobile.width}}px !important' src="{{spec.mobile.url}}"> </iframe>
    </div>
    <div id="dev-toolbar" class='full-x bottom-0 left-0 absolute bg-slate animated slideInUp' ng-hide="!spec.toggleDev">
        <!-- @samir state list -->
        <!-- <ul class="bg-cobalt-50p flex-center-vertical p15-grid full-x overflow-x no-scrollbar">
            <li>
                <button class="height-36 txt-18 bg-robin radius-2 normal block">onDeselectClickOne</button>
            </li>
        </ul> -->
        <ul class='bg-cobalt-25p flex-center-vertical-space-between p15-grid'>
            <li class="flex">
                <!-- <a ng-click='dev.toggleSpec = !dev.toggleSpec' ng-class='{"bg-azure": dev.toggleSpec}'>View Spec</a> -->
                <button class="height-36 txt-18 bg-moxie radius-2 normal block m15right" ng-click='spec.toggleSpec = !spec.toggleSpec'>Spec</button>
                <button class="height-36 txt-18 bg-moxie radius-2 normal block" ng-click='spec.openGDoc()'>gDoc</button>
            </li>
            <li class="flex">
                <!-- <li class='flex-wrap-center ugrid-2' ng-class='{"bg-azure": dev.toggleSpec}'> -->
                <div class="m15right" ng-if='spec.codepenData'>
                    <form action="http://codepen.io/pen/define" method="POST" target="_blank">
                        <input type="hidden" name="data" value='{{spec.codepenData}}'>
                        <input class="bg bg-moxie txt-18 height-36 semibold radius-2 p15x" type="submit" id='codepen-input' value="Edit in Codepen">
                    </form>
                </div>
                <div>
                    <button class="height-36 txt-18 bg-moxie radius-2 normal block" ng-click='spec.open()'>CP Spec</button>
                </div>
            </li>
            <li class='opacity-50 flex-wrap-center'>
                <div>
                    <button class='full-x bg-moxie txt-18 height-36 semibold' ng-click='spec.mobile.toggle()'>
                        <span ng-if='!spec.mobile.show'>Mobile</span>
                        <span ng-if='spec.mobile.show'>Close Mobile</span>
                    </button>
                </div>
                <input class="m15left radius-2 height-36 p15x txt-center" type='text' placeholder="height" size="4" ng-model='spec.mobile.height' />
                <input class="m15left radius-2 height-36 p15x txt-center" type='text' placeholder="width" size="4" ng-model="spec.mobile.width" />
            </li>
            <li class='opacity-50' style="width: 300px;">
                <dropdown class="states-dropdown reverse hide-header height-36 dropdown-moxie full-x" ng-model="spec.statesDropdown"></dropdown>
            </li>
        </ul>
    </div>
</div>
