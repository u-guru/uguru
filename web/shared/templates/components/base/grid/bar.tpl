<div class='flex-center-vertical full-x {{overflowX}} no-scrollbar flex-stretch'>
    <span class='p05-grid weight-800 p05xy m05x'>
        {{title}}
    </span>
    <ul class='p15-grid flex-center'>
        <li ng-repeat='option in options' class='bg-charcoal m10x' ng-click='option.click || onClick(option, $index)'>
            <div class='p15x p05y'>
                {{option[key]||option}}
            </div>
        </li>
    </ul>
</div>