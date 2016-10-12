<div class="full-xy flex absolute full-xy top-0 left-0">
    <ul class="flex-wrap full-x p15-grid" on-init="s:[init-all-scale:public]">
        <li class='full-x' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Relative Delay Sample
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
        <li class='flex-wrap-center full-x' style='height:90% !important'>
            <div style='height:85% !important;' class="full-xy bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:easeOutCirc:0:1:{{direction}}]|send:[activate-child]:delay-1000">
                <div init-after="activate-child" init-with="p:[opacity:0, transform:translateX(-1000%)]" on-init="p:[opacity:1]|a:[translateX:-1000%:0%:500:bouncePast:0:1:f]" class='height-128 width-128'>
                    Child #1
                </div>
            </div>
        </li>
    </ul>
</div>
