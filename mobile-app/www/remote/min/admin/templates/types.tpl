<div class='flex-wrap-center fixed bottom-0 left-0 full-x p15-grid'>
    <ul class='full-x'>
        <li class='bg-slate p10xy' ng-repeat='type in types' ng-click='activateType(type)' ng-class="{'bg-cerise': type === activeType}">
            {{type}}
        </li>
    </ul>
</div>