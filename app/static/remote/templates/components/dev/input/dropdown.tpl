<div class="absolute full-xy top-0 left-0 flex-wrap-center">
    <div class="dropdown">
        <div>
            <span>{{dropdown.options[dropdown.selectedIndex]}}</span>
            <a ng-click='toggle()'>
                <svg viewBox="0 0 100 100">
                    <path d="M14,32 L50,68 L86,32"></path>
                </svg>
            </a>
        </div>
        <ul ng-class='{"active": dropdown.active}'>
            <li tabindex ng-if='$index !== dropdown.selectedIndex' ng-click="click($index)" ng-repeat='option in dropdown.options'>{{option}}</li>
        </ul>
    </div>
</div>