<style>
    #splash-nav-bg-overlay{
        position: absolute !important;
        left:-1000px !important;
        top:-50% !important;
        right:0!important;
        transform: translate(0px, 0px);
        height:10000%!important;
        width: 10000%!important;
        cursor: default!important;
        background: black !important;
    }
</style>
<!-- <a ng-if='dropdown.active' class='bg-transparent absolute full-xy top-0 left-0' id='splash-nav-bg-overlay' ng-click='dropdown.active = !dropdown.active' style='z-index:5'></a>
 -->
 <div class="absolute full-xy top-0 left-0 flex-wrap-center">

    <div class="dropdown">
        <div>
            <span>{{dropdown.options[dropdown.selectedIndex]}}</span>
            <a ng-click='dropdown.active = !dropdown.active' >
                <svg viewBox="0 0 100 100">
                    <path d="M14,32 L50,68 L86,32"></path>
                </svg>
            </a>
        </div>
        <ul ng-if="dropdown.active" ng-class='{"active": dropdown.active}' style="width: 152px">
            <li tabindex ng-if='$index !== dropdown.selectedIndex' ng-click="dropdown.selectedIndex = $index ; dropdown.active = !dropdown.active " ng-repeat='option in dropdown.options'>{{option}}</li>
        </ul>
    </div>
</div>