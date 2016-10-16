<div class="full-xy flex absolute full-xy top-0 left-0">
    <ul class="flex-wrap-center full-x p15-grid">
        <li class='full-x' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Timer
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
         <li class='width-50p height-50p relative flex-vertical-center width-20p' u on-init="s:[activate-children:public]">
            <svg fill="none" init-after="activate-children" init-with="p:[opacity:0]" on-init="p:[opacity:1]"  class="absolute full-xy flex-wrap-center " viewBox="0 0 128 128">
                <rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" rx="2"
                    u init-with="p:[draw:init,stroke:#55A4B7]"
                    on-init="a:[draw:0%:100%:2500:linear:0:1:f]"></rect>
                <text text-anchor="middle" x="40" y="84" font-size="32" stroke="none" fill="white" init-after="activate-children" on-init="a:[counter:59:0:3600000:{{root.easings[0]}}:0:1:f, portal-progress-color:5000:linear:250:1:f, fill:#69B3A5:#F6C64E:5000:{{root.easings[1]}}:250:1:f]">
                </text>
                <text text-anchor="middle" x="64" y="84" font-size="32" stroke="none" fill="white">:</text>
                <text text-anchor="middle" x="88" y="84" font-size="32" stroke="none" fill="white" init-after="activate-children" on-init="a:[counter:59:0:59000:{{root.easings[0]}}:0:59:f, portal-progress-color:5000:linear:250:1:f, fill:#69B3A5:#F6C64E:5000:{{root.easings[1]}}:250:1:f]">
                </text>

            </svg>
        </li>


    </ul>
</div>
