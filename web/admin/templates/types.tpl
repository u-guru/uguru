<div class='types-bar fixed top-0 left-0 p15xy'>
    <ul class='flex bg-light-slate radius-2 overflow-hidden'>
        <li ng-repeat='type in types'>
            <a class="p10xy txt-16 semibold block" ng-click='activateType($event, type)' ng-class="{'bg-moxie': type === activeType, 'bg bg-light-slate': type != activeType}">{{type}}</a>
        </li>
    </ul>
</div>
