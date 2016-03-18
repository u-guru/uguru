 <div class='full-x'>
    <div class='user-ranking flex-wrap-center full-x'>
        <h1 class='full-x text-center weight-600 txt-robin p15x-p15top'> {{layout.header}}</h1>
        <h4 class='font-4 full-x weight-900 text-center txt-robin p15x-p15bottom-p05top'> Top {{layout.user.guru_ranking}} Percentile</h4>
        <div class="progress full-x round bg-charcoal txt-shamrock">
            <span style="width: {{r_layout.user.guru_ranking}}%"></span>
        </div>
    </div>
    <div id="admin-ranking-container" class='p15x-p15bottom flex-wrap full-x txt-slate'>
        <tabs id="current-tabs" index="selected_layout.index" options="layout.tab_options"/> </tabs>
        <ul id="high-score" ng-if='!layout.index'>
            <li class='full-x p15xy ugrid-3' ng-repeat='guru in layout.guru_hs_list'>
                <div class='flex-wrap-center weight-600'><user-icon> </user-icon></div>
                <div class='flex-wrap weight-600 p20xy relative'>
                    <div class='absolute full-xy flex-wrap flex-start top-0 p05xy'>
                        <h1 class='full-x txt-white'> {{guru.name}}</h1>
                        <rating class='full-x p05xy mtop05 absolute left-0 bottom-0' style="width:100px; height:50px; margin-top:10px;" avg="4.5"/> </rating>
                    </div>
                </div>
                <div class='flex-wrap-center weight-600'>
                    <h1 class='txt-white'>{{guru.guru_ranking}} </h1>
                </div>
            </li>
        </ul>
        <ul id="next-steps" ng-if='!selected_layout.index'>
            <li class='full-x p15xy ugrid-3' ng-repeat='action_item in selected_layout.sample.scope.user.ranking_actions' ng-if='selected_layout.index === 1'>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{action_item.text}}</h1>
                </div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{action_item.new_ranking}}</h1>
                </div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{action_item.new_ranking}}</h1>
                </div>
            </li>
        </ul>
    </div>
</div>