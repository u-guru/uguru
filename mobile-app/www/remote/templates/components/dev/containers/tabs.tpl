
    <div class="tab-bar slide full-x">
        <div>
            <a ng-click='tabIndex = $index' ng-repeat='option in options' ng-class="{'active': tabIndex === $index}">{{(option[key] || option)}}</a>
            <hr/>
        </div>
    </div>