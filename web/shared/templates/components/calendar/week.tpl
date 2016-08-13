<ul class="cal-date flex-center-vertical flex-stretch no-scrollbar overflow-x full-x left-0 bg-cobalt-25p">
    <li ng-repeat='_date in dates' class='p15-grid' style='min-width:calc(100%/7)'>
        <div class="on-enter" class='p05xy flex-center-vertical flex-stretch' ng-class="{'bg-cobalt-50p':!$index}">
            <div class="p05xy txt-36 cal-date-num weight-600 txt-gold opacity-50" ng-class="{'opacity-1':!$index, 'opacity-50': $index}">{{_date.date}}</div>
            <div class="p05xy txt-smoke opacity-50 cal-date-name lowercase" ng-class="{'opacity-50': $index}">{{_date.day}}</div>
        </div>
    </li>
</ul>