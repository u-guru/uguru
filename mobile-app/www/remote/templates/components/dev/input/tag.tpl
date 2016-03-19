<li class-on-load="bounceIn:anim" class-on-load-delay="1000" class-on-clear="fadeOut:animOut" class-on-clear-delay="0" class-on-activate="bounceIn:anim" class-on-activate-delay="1000">
    <a class="adlib-{{blankNum}} animated bg-{{category.hex_color}}" translate-on-click="translate-blank-{{blankNum}}" translate-to-elem="#blank-{{blankNum}}" class-on-click='translate-blank-{{blankNum}}:unique:inject.splash-adlib|blank-{{blankNum}}-filled, translate-blank-{{blankNum}}:unique:inject.splash-adlib b|blank-{{blankNum}}-filled' ng-click='resetMadLibBlankIfActive($event)'>
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76" ng-if="!desktopMode">
                <rect x="2" y="2" width="256" height="72" rx="16" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></rect>
            </svg>
        <b>{{innerText}}</b>
    </a>
</li>