<svg fill="none"  init-with="p:[opacity:0]" u on-init="p:[opacity:1]|send:[loader-init:children]" when-loader-complete="a:[scale:1:0:1000:easeOutBounce:0:1:f]" class="full-xy bg-transparent" viewBox="0 0 128 128" loader>
    <rect width="124" height="124" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" rx="50%"
    u init-with="p:[draw:init,stroke:#55A4B7]"
    on-init="a:[draw:0%:100%:{{m.loader.duration}}:linear:0:1:f]"></rect>
    <text text-anchor="middle" x="64" y="84" font-size="32" stroke="none" fill="white" init-after="loader-init" on-init="a:[counter:0:100:{{m.loader.duration}}:easeOutCirc:0:1:f, portal-progress-color:{{m.loader.duration}}:linear:250:1:f, fill:#69B3A5:#F6C64E:{{m.loader.duration}}:easeOutCirc:250:1:f]">00
    </text>
</svg>