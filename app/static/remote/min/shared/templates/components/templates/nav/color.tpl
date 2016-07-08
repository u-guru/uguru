<div class="dropdown-color">
    <a ng-class="{'bg-robin':!colorKey || !colorKey.length}" ng-style='{"background-color":dropdown.options[dropdown.selectedIndex][colorKey[0]]}' ng-click="toggle()" ng-class='{"active": dropdown.active }'>
        <span ng-if='!dropdown.key'>{{dropdown.options[dropdown.selectedIndex]}}</span>
        <span ng-if='dropdown.key'>{{dropdown.options[dropdown.selectedIndex][dropdown.key]}}</span>
        <svg viewBox="0 0 100 100">
            <path d="M14,32 L50,68 L86,32"></path>
        </svg>
    </a>
    <div ng-class='{"visible": dropdown.active }'>
        <svg viewBox="0 0 396 38">
            <path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <ul>
            <li tabindex ng-if='$index !== dropdown.selectedIndex' ng-repeat='option in dropdown.options'>
                <a class="active" ng-class="{'bg-robin': !colorKey || !colorKey.length}" ng-style="{'background-color': (dropdown.options[$index][colorKey[0]] || dropdown.options[$index][colorKey[1]])}" ng-click="click(option, $index)">
                    <span>{{(dropdown.key && option[dropdown.key]) || option}}</span>
                </a>
                <svg class="arrow" viewBox="0 0 60 30">
                    <path d="M4,26 L30,0 L56,26"></path>
                </svg>
            </li>
        </ul>
    </div>
</div>