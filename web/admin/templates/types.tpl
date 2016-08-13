<div class='fixed top-0 left-0 p15xy'>
    <ul class='flex bg-light-slate radius-2 overflow-hidden'>
        <li ng-repeat='type in types'>
            <div class="p10xy txt-16 semibold" ng-click='activateType(type)' ng-class="{'bg-moxie': type === activeType}">{{type}}</div>
        </li>
    </ul>
</div>
