<div class="tab-bar slide full-x">
    <div>
        <a ng-click='updateTabIndex($index)' ng-repeat='option in options' ng-class="{'active': tabIndex === $index}">{{(option[key] || option)}}</a>
        <hr/>
    </div>
</div>

<!-- <div class="absolute full-xy top-0 left-0 flex-center-wrap">
    <div class="tab-bar slide">
        <div>
            <a class="active">Link 1</a>
            <a>Link 2</a>
            <a>Link 3</a>
            <a>Link 4</a>
            <a>Link 5</a>
            <hr/>
        </div>
    </div>
</div> -->

<!-- <div class="absolute full-xy top-0 left-0 flex-center-wrap">
    <nav class="tab-bar slide arrow-bar-6">
        <div>
            <a class="active"><span>Link 1</span></a>
            <a><span>Link 2</span></a>
            <a><span>Link 3</span></a>
            <a><span>Link 4</span></a>
            <a><span>Link 5</span></a>
            <a><span>Link 6</span></a>
            <div><span></span></div>
            <div><span></span></div>
        </div>
    </nav>
</div> -->