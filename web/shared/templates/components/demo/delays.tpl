<div class="full-xy flex-center">
    <ul class="flex-wrap-center p15-grid">
        <li>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="a:[icon-enter:250:linear:0:1:f]">
                <h1 class="txt-14 semibold txt-center">Property:delay:250 global value
                </h1>
            </div>
        </li>
        <li>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="a:[icon-enter:250:linear:0:1:f]">
                <h1 class="txt-14 semibold txt-center">Property:delay:250 global + local value
                </h1>
            </div>
        </li>
        <li>
            <div class="bg-auburn p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="a:[opacity:0:1:1000:easeOutSine:0:1:f, rotate:40deg:0deg:1000:easeInOutElastic:0:1:f]:delay-200 | send:[show-header-elem:public]:delay-1000">
                <h1 class="txt-14 semibold txt-center">Verify Iterations</h1>
            </div>
        </li>
    </ul>
</div>
