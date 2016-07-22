
<div class="dropdown-color"
    init-with="prop:[opacity:1]"

	>
    <!-- ng-mouseenter="mouseEnter($event, $index, 500)" ng-mouseover="mouseOver($event, $index, 500)" ng-mouseleave="mouseLeave($event, $index)" -->
	<div init-with='prop:[visibility:hidden]'></div>
    <a class="color" ng-click="toggle($event)" ng-class='{"active": dropdown.active }' on-init init-with="prop:[opacity:1]"
    on-mouse-enter="s:[{{prefix}}-dropdown-mouse-enter:public|prop:[opacity:0.5]"
    on-mouse-enter-delay="500"
    on-mouse-leave="s:[{{prefix}}-dropdown-mouse-enter:public|prop:[opacity:1]]"
    on-mouse-leave-delay="500">
		<!-- @samir -->
		<div class="null"
			init-with="prop:[transform:scaleX(0), transition:all 250ms ease-out 450ms]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[transform:scaleX(1)]"></div>
		<div class="null"
			init-with="prop:[transform:scaleY(0), transition:all 250ms ease-out 300ms]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[transform:scaleY(1)]"></div>
		<div class="null"
			init-with="prop:[transform:scaleX(0), transition:all 250ms ease-out 150ms]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[transform:scaleX(1)]"></div>
		<div class="null"
			init-with="prop:[transform:scaleY(0), transition:all 250ms ease-out]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[transform:scaleY(1)]"></div>
		<div class="dropdown-color-bg" ng-style='{"background-color":dropdown.options[dropdown.selectedIndex][colorKey[0]]}'
			init-with="prop:[opacity:0, transition:all 250ms ease-out 750ms]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[opacity:1]"></div>
        <span ng-if='!dropdown.key'
			init-with="prop:[opacity:0]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[opacity:1, transition:all 250ms ease-out 750ms]"
			ng-mouseover="hover($event, 'send', prefix + '-dropdown-hover', dropdown.selectedIndex)">{{dropdown.options[dropdown.selectedIndex]}}</span>
        <span ng-if='dropdown.key'
			init-with="prop:[opacity:0]"
			when-dropdown-init="trigger:[on-enter]"
			on-enter="prop:[opacity:1, transition:all 250ms ease-out 750ms]"
            ng-mouseover="hover($event, 'send', prefix + '-dropdown-hover', dropdown.selectedIndex)">{{dropdown.options[dropdown.selectedIndex][dropdown.key]}}</span>
        <svg viewBox="0 0 100 100">
            <path d="M14,32 L50,68 L86,32"
				init-with="prop:[stroke-dashoffset:103, transition:all 250ms ease-out 750ms]"
				when-dropdown-init="trigger:[on-enter]"
				on-enter="prop:[stroke-dashoffset:0]"></path>
        </svg>
    </a>
    <div ng-class='{"visible": dropdown.active }' >
        <svg viewBox="0 0 396 38">
            <path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <ul>
            <li ng-if='$index !== dropdown.selectedIndex' ng-repeat='option in dropdown.options'>
				<div></div><div></div>
				<div></div><div></div>

                <!-- ng-mouseenter="mouseEnter($event, 'send', prefix + '-dropdown-hover', $index)"
                ng-mouseover="mouseOver($event, 'send', prefix + '-dropdown-hover', $index)" -->
                <a class="color" ng-click="click(option, $index)"
                    init-default
                    on-mouse-enter="s:[{{prefix}}-dropdown-mouse-enter-option:public:data({{option.dataMouseEnter}})]|prop:[opacity:0.5]]"
                    on-mouse-enter-delay="500"
                    on-mouse-leave="s:[{{prefix}}-dropdown-mouse-enter-option:public:data({{option.dataMouseLeave}})]|prop:[opacity:1]]"
                    on-mouse-leave-delay="500">
					<div class="dropdown-color-bg" ng-style="{'background-color': (dropdown.options[$index][colorKey[0]] || dropdown.options[$index][colorKey[1]])}"></div>
                    <span>{{(dropdown.key && option[dropdown.key]) || option}}</span>
                </a>
                <svg class="arrow" viewBox="0 0 60 30">
                    <path d="M4,26 L30,0 L56,26" ng-style="{'fill': (dropdown.options[$index][colorKey[0]] || dropdown.options[$index][colorKey[1]])}"></path>
                </svg>
            </li>
        </ul>
    </div>
</div>
