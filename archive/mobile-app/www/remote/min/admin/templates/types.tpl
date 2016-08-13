<div class='type-list fixed bottom-0 left-0 p15xy overflow-auto full-x no-scrollbar'>
    <ul class='flex radius-2' style="max-height: 40px;">
        <li ng-repeat='type in types'>
            <div class="p10xy txt-16 semibold" ng-click='activateType(type)' ng-class="{'bg-light-slate': type!= activeType, 'bg-moxie': type === activeType}" style="white-space:nowrap">{{type}}</div>
        </li>
    </ul>
</div>
