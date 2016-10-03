<div class='flex-vertical-center full-xy absolute left-0 top-0'>
    <div style='height:20%; width:20%;' class='bg-azure txt-white flex-wrap-center txt-1 p15-grid' u init-with="prop:[scaleY:0]" on-init="s:[demo-card-enter:public]:delay-2500" when-demo-card-enter="a:[scaleY:0:1:1000:easeOutCubic:200:1:f]">
        <span class='text-center flex-wrap'>
            "a:[bounceIn-subtle:1000:easeOutCubic:2000:1:f]"
        </span>
    </div>
    <div style='height:20%; width:20%;' class='bg-gold txt-charcoal flex-wrap-center txt-1 p15-grid' u on-click="a:[slideInUp-subtle:1000:linear:2000:1:f]">
        <span class='text-center flex-wrap'>
            a:[slideInUp-subtle:1000:linear:2000:1:f]
        </span>
    </div>

</div>
