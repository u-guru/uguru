<div class='flex-vertical-center full-xy absolute left-0 top-0'>
    <div style='height:20%; width:20%;' class='bg-azure txt-white flex-wrap-center txt-1 p15-grid' when-blue-box-trigger-click="p:[opacity:0.5]" u on-click="a:[bounceIn-subtle:1000:easeOutCubic:2000:1:f]">
        <span class='text-center flex-wrap'>
            "a:[bounceIn-subtle:1000:easeOutCubic:2000:1:f]"
        </span>
    </div>
    <div style='height:20%; width:20%;' class='bg-gold txt-charcoal flex-wrap-center txt-1 p15-grid' u on-click="a:[slideInUp-subtle:1000:linear:2000:1:f]|s:[blue-box-trigger-click:public]:delay-1000">
        <span class='text-center flex-wrap'>
            a:[slideInUp-subtle:1000:linear:2000:1:f]
        </span>
    </div>
    <div style='height:20%; width:20%;' class='bg-cerise txt-charcoal flex-wrap-center txt-1 p15-grid' u init-with="prop:[transform:rotateX(180deg)]" on-click="a:[rotateX:180deg:0deg:2500:easeOutExpo:0:1:f]">
        <span class='text-center flex-wrap'>
            a:[rotateX:180deg:0deg:2500:easeOutExpo:0:1:f]
        </span>
    </div>



</div>