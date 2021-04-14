<div class="full-xy flex-center">
    <ul class="flex-wrap-center p15-grid">
        <li>
            <a class="bg bg-gold p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="tell:[children:wake-up]"
                on-mouseleave="a:[self.onInit.reverse@0.5x]">
                <h1 when-wake-up="p:[opacity:1]" init-with="p:[opacity:0]" class="txt-14 semibold txt-center">reverse @1/2x speed mouseleave</h1>
            </a>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li>
            <a class="bg bg-gold p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="tell:[children:wake-up]"
                on-mouseleave="a:[self.onInit.reverse@0.5x]">
                <h1 when-wake-up="p:[opacity:1]" init-with="p:[scale:3]" class="txt-14 semibold txt-center">scale:3, on property</h1>
            </a>
        </li>
    </ul>
</div>