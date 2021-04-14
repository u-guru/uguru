<item height='100' width='100' align='center center' absolute bg='smoke' class='flex-wrap' ng-if='calendar.days'>
    <item width='100' height='10%' class='bg-cerise' align='center top'>
        <txt class='txt-7 weight-700' relative height='100' center> {{calendar.month}} {{calendar.year}} </txt>
    </item>
    <item width='100%' height='10' bg='cerise-20p' align='center top'>
        <item height='100' width='14.3' align='center center' class='txt-cerise flex-grow weight-900' ng-repeat='day in daysOfWeek'>{{day}}</item>
    </item>
    <item width='100' height='80' align='left center' class='flex-wrap-center'>
        <item ng-class="{'bg-cerise-50p':calendar.days[$index+1].isToday, 'opacity-20p':calendar.days[$index+1].isBefore}" class='txt-charcoal'  ng-repeat='date in calendar.days' align='center center' width='14' height='20'> {{date.day + 1}} </item>
    </item>
</item>