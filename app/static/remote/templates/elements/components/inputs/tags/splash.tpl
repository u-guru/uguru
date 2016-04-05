<li class-on-load="bounceIn:anim" class-on-load-delay="1000" class-on-clear="fadeOut:animOut" class-on-clear-delay="0" class-on-activate="bounceIn:anim" class-on-activate-delay="1000">
    <div class="tag-adlib-container">
        <a class="tag-adlib adlib-{{blankNum}} animated tag-{{category.hex_color}}" translate-on-click="translate-blank-{{blankNum}}" translate-to-elem="#blank-{{blankNum}}" class-on-click='translate-blank-{{blankNum}}:unique:inject.splash-adlib|blank-{{blankNum}}-filled, translate-blank-{{blankNum}}:unique:inject.splash-adlib b|blank-{{blankNum}}-filled' ng-click='resetMadLibBlankIfActive($event)'>
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                <rect x="2" y="2" width="256" height="72" rx="16"></rect>
            </svg>
            <b>{{innerText}}</b>
        </a>
        <span class="tag-adlib ghost active">
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                <rect x="2" y="2" width="256" height="72" rx="16"></rect>
            </svg>
        </span>
    </div>
    <!-- <div class="absolute top-0 left-0 full-xy flex-center">
    <ul class="flex-wrap-center p15-grid">
        <li>
            <span class="tag-adlib blank">
                <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                    <rect x="2" y="2" width="280" height="84" rx="16"></rect>
                </svg>
                <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                    <rect x="2" y="2" width="256" height="72" rx="16"></rect>
                </svg>
                <b>midnight</b>
            </span>
        </li>
        <li>
            <a class="tag-adlib">
                <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                    <rect x="2" y="2" width="280" height="84" rx="16"></rect>
                </svg>
                <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                    <rect x="2" y="2" width="256" height="72" rx="16"></rect>
                </svg>
                <b>midnight</b>
            </a>
        </li>
        <li>
            <a class="tag-adlib tag-robin active">
                <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                    <rect x="2" y="2" width="280" height="84" rx="16"></rect>
                </svg>
                <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                    <rect x="2" y="2" width="256" height="72" rx="16"></rect>
                </svg>
                <b>midnight</b>
            </a>
        </li>
        <li>
            <div class="tag-adlib-container">
                <a class="tag-adlib tag-robin opacity-0">
                    <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                        <rect x="2" y="2" width="280" height="84" rx="16"></rect>
                    </svg>
                    <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                        <rect x="2" y="2" width="256" height="72" rx="16"></rect>
                    </svg>
                    <b>midnight</b>
                </a>
                <span class="tag-adlib ghost active">
                    <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                        <rect x="2" y="2" width="280" height="84" rx="16"></rect>
                    </svg>
                    <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                        <rect x="2" y="2" width="256" height="72" rx="16"></rect>
                    </svg>
                </span>
            </div>
        </li>
    </ul>
</div> -->
</li>


