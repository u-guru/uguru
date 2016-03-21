<div>
    <a name='university' ng-click="toggle()" id='dropdown-university'>
        <span class="splash-hero-nav-link-bg" style='background-color: {{selectedUniversity.school_color_dark}}'></span>
        <span>{{selectedUniversity.short_name || selectedUniversity.name}}</span>
        <svg viewBox="0 0 100 100">
            <path d="M14,32 L50,68 L86,32"></path>
        </svg>
    </a>
    <div class="splash-hero-nav-schools" ng-class="{'visible':page.dropdowns.university.active}">
        <svg viewBox="0 0 396 38">
            <path d="M2,36 L2,34 C2,32.8954305 2.8931253,32 4.0093292,32 L168,32 L198,2 L228,32 L391.990671,32 C393.100393,32 394,32.8877296 394,34 L394,36" fill="none" stroke-width="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <ul>
            <li ng-repeat='university in featured_universities' ng-if='selectedUniversity.id !== university.id'>
                <a ng-click='refreshUniversityState(university)'>
                    <span class="splash-hero-nav-link-bg" style='background-color: {{university.school_color_dark}}'></span>
                    <span>{{university.short_name || university.name}}</span>
                </a>
                <svg class="arrow school" viewBox="0 0 60 30">
                    <path d="M4,26 L30,0 L56,26" fill="{{university.school_color_dark}}"></path>
                </svg>
            </li>
            <li ng-click="transitionToScene3()" >
                <a class="bg-shamrock">
                    <span>Find your College</span>
                </a>
            </li>
        </ul>
    </div>
</div>