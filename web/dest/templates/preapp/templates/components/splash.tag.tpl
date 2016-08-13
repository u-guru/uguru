<li>
    <!-- elem-states="['spread-out', 'category-switch', 'both-blanks-filled', 'map-transition']"
        on-both-blanks-filled-enter="click-two:animOut" -->
    <div class="tag-adlib-container">
        <a class="tag-adlib adlib-{{blankNum}} tag-{{category.bg_hex_color}}"
            translate-on-click="translate-blank-{{blankNum}}" translate-to-elem="#blank-{{blankNum}}"
            class-on-click='translate-blank-{{blankNum}}:unique:inject.splash-adlib|blank-{{blankNum}}-filled, translate-blank-{{blankNum}}:unique:inject.splash-adlib b|blank-{{blankNum}}-filled'
            on-map-transition-enter="click-two:animOut"
            ng-click='click($event)'>
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                <rect x="2" y="2" width="256" height="72" rx="16"></rect>
            </svg>
            <b><i>{{innerText}}</i></b>
        </a>
        <span class="tag-adlib ghost active-ghost"
            on-both-blanks-filled-enter="fadeOut:animOut"
            on-map-transition-enter="fadeOut:animOut">
            <svg class="desktop" width="142px" height="44px" viewBox="0 0 284 88">
                <rect x="2" y="2" width="280" height="84" rx="16"></rect>
            </svg>
            <svg class="mobile" width="130px" height="38px" viewBox="0 0 260 76">
                <rect x="2" y="2" width="256" height="72" rx="16"></rect>
            </svg>
        </span>
    </div>
</li>
