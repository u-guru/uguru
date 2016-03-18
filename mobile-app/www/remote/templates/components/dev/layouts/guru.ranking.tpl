 <div class='full-xy flex-wrap-center flex-stretch full-x'>
    <div class='user-ranking flex-wrap-center full-x'>
        <h1 class='full-x text-center txt-robin'> {{selected_layout.sample.scope.header}}</h1>
        <h4 class='font-4 full-x weight-900 text-center txt-robin p15xy'> Top {{selected_layout.sample.scope.user.guru_ranking}} Percentile</h4>
        <div class="progress full-x round bg-charcoal txt-shamrock">
            <span style="width: {{selected_layout.sample.scope.user.guru_ranking}}%"></span>
        </div>
    </div>
    <div class='p15x-p15bottom flex-stretch flex-wrap-center full-xy txt-slate' style="height: calc(100% - 66px)">
        <tabs id="current-tabs" index="selected_layout.index" tabs="['High Score List', 'Next Steps']"/> </tabs>
        <ul id="high-score" ng-if='!selected_layout.index'>
            <li ng-repeat='guru in selected_layout.sample.scope.guru_hs_list' class='full-x p20xy ugrid-3' >
                <div class='flex-wrap-center weight-600'><user-icon url="guru.profile_url"> </user-icon></div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{guru.name}}</h1>
                </div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{guru.guru_ranking}} </h1>
                </div>
            </li>
        </ul>
        <ul class='full-x' ng-if='!selected_layout.index'>
            <li ng-repeat='action_item in selected_layout.sample.scope.user.ranking_actions' ng-if='selected_layout.index === 1'>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{action_item.text}}</h1>
                </div>
                <div >
                    <h1>{{action_item.new_ranking}}</h1>
                </div>
                <div >
                    <span class='uppercase weight-300'></span>
                    <h1>{{action_item.new_ranking}}</h1>
                </div>
            </li>
        </ul>
    </div>
</div>