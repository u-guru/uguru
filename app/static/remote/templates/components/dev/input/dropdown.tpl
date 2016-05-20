<div class="dropdown-container">
    <h2 ng-if="dropdown.label">{{dropdown.label}}</h2>
    <div class="dropdown {{dropdown.size}}">
        <div>
            <span ng-if='!dropdown.key'>{{dropdown.options[dropdown.selectedIndex]}}</span>
            <span ng-if='dropdown.key'>{{dropdown.options[dropdown.selectedIndex][dropdown.key]}}</span>
            <a ng-click='toggle()' class='high-z-index'>
                <svg viewBox="0 0 100 100">
                    <path d="M14,32 L50,68 L86,32"></path>
                </svg>
            </a>
        </div>
        <ul ng-class='{"active": dropdown.active }'>
            <li tabindex ng-if='$index !== dropdown.selectedIndex' ng-click="click(option, $index)" ng-repeat='option in dropdown.options'>{{(dropdown.key && option[dropdown.key]) || option}}</li>
        </ul>
    </div>
</div>