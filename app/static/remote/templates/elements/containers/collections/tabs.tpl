<div class="tab-bar slide">
    <div>
        <a ng-click='updateTabIndex($index)' ng-repeat='option in options' ng-class="{'active': tabIndex === $index}">{{(option[key] || option)}}</a>
        <hr/>
    </div>
</div>

