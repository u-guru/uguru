<div>
    <div class="component-item-nav states">
        <ul>
            <li ng-click="doc.onStateClicked($index, $event)" ng-repeat="state in doc.states"><a ng-class="{'active': doc.stateIndex === $index}">{{state.title}}</a></li>
        </ul>
    </div>
    <div class="fix-abs flex-center-wrap overflow-hidden">
        <ng-transclude> </ng-transclude>
    </div>
</div>
