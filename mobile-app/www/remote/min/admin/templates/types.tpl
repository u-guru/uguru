<div class='fixed bottom-0 left-0 p15xy'>
    <ul class='flex bg-slate radius-2 overflow-hidden'>
        <li ng-repeat='type in types'>
            <div class="p15xy txt-20 semibold" ng-click='activateType(type)' ng-class="{'bg-moxie': type === activeType}">{{type}}</div>
        </li>
    </ul>
</div>
