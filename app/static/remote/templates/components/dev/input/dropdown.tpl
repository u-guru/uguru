<div class="dropdown">
    <div>
        <span ng-if='!dropdown.key'>{{dropdown.options[dropdown.selectedIndex]}}</span>
        <span ng-if='dropdown.key'>{{dropdown.options[dropdown.selectedIndex][dropdown.key]}}</span>
        <a ng-click='toggle()'>
            <svg viewBox="0 0 100 100">
                <path d="M14,32 L50,68 L86,32"></path>
            </svg>
        </a>
    </div>
    <ul ng-class='{"active": dropdown.active}'>
        <li tabindex ng-if='$index !== dropdown.selectedIndex' ng-click="click(option, $index)" ng-repeat='option in dropdown.options'>{{(dropdown.key && option[dropdown.key]) || option}}</li>
    </ul>
</div>
