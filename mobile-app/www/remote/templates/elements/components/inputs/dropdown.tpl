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
<!--
<div class="absolute full-xy top-0 left-0 flex-wrap-center">
    <div class="ugrid-2 full-xy flex-center">
        <ul class="demo">
            <li>
                <div class="dropdown auto info">
                    <div>
                        <span>Photography</span>
                        <a>
                            <svg viewBox="0 0 100 100">
                                <path d="M14,32 L50,68 L86,32"></path>
                            </svg>
                        </a>
                    </div>
                    <ul class="active">
                        <li tabindex>
                            <span>Academic</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Baking</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Tech</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Household</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="dropdown">
                    <div>
                        <span>CS10</span>
                        <a>
                            <svg viewBox="0 0 100 100">
                                <path d="M14,32 L50,68 L86,32"></path>
                            </svg>
                        </a>
                    </div>
                    <ul>
                        <li tabindex>CS10</li>
                        <li tabindex>CS20</li>
                        <li tabindex>CS30</li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="dropdown small">
                    <div>
                        <span>CS10</span>
                        <a>
                            <svg viewBox="0 0 100 100">
                                <path d="M14,32 L50,68 L86,32"></path>
                            </svg>
                        </a>
                    </div>
                    <ul>
                        <li tabindex>CS10</li>
                        <li tabindex>CS20</li>
                        <li tabindex>CS30</li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="dropdown auto">
                    <div>
                        <span>CS10</span>
                        <a>
                            <svg viewBox="0 0 100 100">
                                <path d="M14,32 L50,68 L86,32"></path>
                            </svg>
                        </a>
                    </div>
                    <ul>
                        <li tabindex>CS10</li>
                        <li tabindex>CS20</li>
                        <li tabindex>CS30</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div>
            <div class="demo">
                <div class="dropdown auto info">
                    <div>
                        <span>Photography</span>
                        <a>
                            <svg viewBox="0 0 100 100">
                                <path d="M14,32 L50,68 L86,32"></path>
                            </svg>
                        </a>
                    </div>
                    <ul class="active">
                        <li tabindex>
                            <span>Academic</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Baking</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Tech</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                        <li tabindex>
                            <span>Household</span>
                            <a class="dropdown-popup">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="36"></circle>
                                    <path d="M50,40 L50,70 M50,30 L50,30.5"></path>
                                </svg>
                            </a>
                            <div class="dropdown-info">
                                <div>This is information you can put into a dropdown.</div>
                                <button class="bg-shamrock">See More</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div> -->