<div class="full-xy flex absolute full-xy top-0 left-0">
    <ul class="flex-wrap full-x p15-grid" u on-init="s:[init-all-scale:public]">
        <li class='full-x' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Relative Delay Sample
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
        <li class='flex-wrap-center full-x' style='height:90% !important'>
            <div style='height:85% !important;' class="full-xy border-solid border-smoke border-3 p10xy flex-center-wrap radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"

                on-init="a:[scale:0:1:1000:easeOutCirc:0:1:{{direction}}]|send:[activate-child-1:public:1000, activate-child-2:public:2000, activate-child-3:public:3000]:delay-1000">

                <!-- <div init-after="activate-child-1" init-with="p:[opacity:0,
                transform:translateX(-1000%)]" on-init="p:[opacity:1]|a:[translateX:-1000%:0%:500:bouncePast:0:1:f]" class='height-128 width-128' >
                        Child #1
                </div>
                <div init-after="activate-child-2" init-with="p:[opacity:0, transform:translateX(-1000%)]" on-init="p:[opacity:1]|a:[translateX:-1000%:5%:500:bouncePast:0:1:f]" class='height-128 width-128' >
                       Child #2
                </div>
				<div init-after="activate-child-3" init-with="p:[opacity:0, transform:translateX(-1000%)]" on-init="p:[opacity:1]|a:[translateX:-1000%:5%:500:bouncePast:0:1:f]" class='height-128 width-128'>
                    Child #3
                </div>
                <div u when-activate-child-3="a:[translateX:-1000%:5%:500:bouncePast:0:1:f] | p:[opacity:1]" init-with="p:[opacity:0, transform:translateX(-1000%)]" class='height-128 width-128'>
                    Child #4 -->

                <div class='height-128 width-128'
					init-after="activate-child-1"
					init-with="p:[opacity:0, transform:translateX(-1000%)]"
					on-init="p:[opacity:1]|a:[translateX:-1000%:0%:500:bouncePast:0:1:f]|send:[activate-child-2:public]:delay-1000">
                    Child #1
                </div>
				<div class='height-128 width-128'
					init-after="activate-child-2"
					init-with="p:[opacity:0, transform:translateX(-1000%)]"
					on-init="p:[opacity:1]|a:[translateX:-1000%:5%:500:bouncePast:2000:1:f]:delay-1000">
                    Child #2

                </div>
            </div>
        </li>
    </ul>
</div>
