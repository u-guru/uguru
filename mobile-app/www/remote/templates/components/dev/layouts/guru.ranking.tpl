 <div class='full-x'>
    <div class='user-ranking flex-wrap-center full-x'>
        <h1 class='full-x text-center weight-600 txt-robin p15x-p15top'> {{selected_layout.sample.scope.header}}</h1>
        <h4 class='font-4 full-x weight-900 text-center txt-robin p15x-p15bottom-p05top'> Top {{selected_layout.sample.scope.user.guru_ranking}} Percentile</h4>
        <div class="progress full-x round bg-charcoal txt-shamrock">
            <span style="width: {{selected_layout.sample.scope.user.guru_ranking}}%"></span>
        </div>
    </div>
    <div id="admin-ranking-container" class='p15x-p15bottom flex-wrap full-x txt-slate'>
        <tabs id="current-tabs" index="selected_layout.index" tabs="['High Score List', 'Next Steps']"/> </tabs>
        <ul id="high-score" ng-if='!selected_layout.index'>
            <li class='full-x p15xy ugrid-3' ng-repeat='guru in selected_layout.sample.scope.guru_hs_list'>
                <div class='flex-wrap-center weight-600'><user-icon url="guru.profile_url"> </user-icon></div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{guru.name}}</h1>
                </div>
                <div class='flex-wrap-center weight-600'>
                    <h1>{{guru.guru_ranking}} </h1>
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