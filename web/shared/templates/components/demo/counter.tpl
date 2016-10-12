<div class="full-xy flex absolute full-xy top-0 left-0">
    <ul class="flex-wrap full-x p15-grid" on-init="s:[init-all-scale:public]">
        <li class='full-x' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Counters
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
         <li class='flex-vertical-center width-20p' ng-repeat='ease in ::root.easings.slice(0,5)' on-init="s:[activate-children:public]">
            <svg fill="none" init-after="activate-children" init-with="p:[opacity:0]" on-init="p:[opacity:1]"  class="width-128 height-128" viewBox="0 0 128 128">
                <rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" rx="2"
                    u init-with="p:[stroke-dasharray:1207, stroke-dashoffset:1207, stroke:#55A4B7]"
                    on-init="a:[l-progress-color:5000:linear:0:1:f, stroke-dashoffset:1207:0:5000:linear:250:1:f]"></rect>
                <text text-anchor="middle" x="64" y="84" font-size="64" stroke="none" fill="white" init-after="activate-children" on-init="a:[counter:0:100:5000:{{ease}}:500:1:f, l-progress-color:5000:linear:250:1:f, fill:#69B3A5:#F6C64E:5000:linear:250:1:f]">00
                </text>
                <text text-anchor="middle" x="64" y="120" fill="white" font-size="16">{{ease}}</text>
            </svg>

        </li>
    </ul>
</div>