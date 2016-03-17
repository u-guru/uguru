<div class="tab-bar slide">
    <div>
        <a ng-click='index = $index' ng-repeat='option in options' ng-class="{'active': index === $index}">{{option}}</a>
        <hr/>
    </div>
</div>