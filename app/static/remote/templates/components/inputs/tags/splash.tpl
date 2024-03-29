<li class-on-clear="fadeOut:animOut" class-on-clear-delay="0">
    <div class="tag-adlib-container">
        <a class="tag-adlib adlib-{{blankNum}} animated tag-{{category.hex_color}}"
            translate-on-click="translate-blank-{{blankNum}}" translate-to-elem="#blank-{{blankNum}}"
            class-on-click='translate-blank-{{blankNum}}:unique:inject.splash-adlib|blank-{{blankNum}}-filled, translate-blank-{{blankNum}}:unique:inject.splash-adlib b|blank-{{blankNum}}-filled'
            ng-click='click($event)'>
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                <rect x="2" y="2" width="256" height="72" rx="16"></rect>
            </svg>
            <b><i>{{innerText}}</i></b>
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


