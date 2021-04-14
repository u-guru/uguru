
    <div class="full-xy flex-center">
    <main-view>
    <!--@gabrielle, @jeselle uncomment the console.log on TweenService.js on line 161-163 to view the logs clearly printing the start/end values -->
        <ul class="flex-vertical-center p15-grid">


            <li u on-init='a:[translateY:-500px:0px:1000:easeInOutElastic:0:1:f,opacity:0:1:1000:easeInOutElastic:0:1:f]' class='bg-slate' >
                easeInOutElastic
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeInOutBounce:0:1:f,opacity:0:1:1000:easeInOutBounce:0:1:f]' class='bg-slate-50p' >
                easeInOutBounce
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeOutBounce:0:1:f,opacity:0:1:1000:easeOutBounce:0:1:f]' class='bg-slate' >
                easeOutBounce
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeOutQuint:0:1:f,opacity:0:1:1000:easeOutQuint:0:1:f]' class='bg-slate-50p' >
                easeOutQuint
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeInQuint:0:1:f,opacity:0:1:1000:easeInQuint:0:1:f]' class='bg-slate' >
                easeInQuint
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeOutCirc:0:1:f,opacity:0:1:1000:easeOutCirc:0:1:f]' class='bg-slate-50p' >
                EaseOutCirc
            </li>
            <li u on-init='a:[translateY:-500px:0px:1000:easeInOutBack:0:1:f,opacity:0:1:1000:easeInOutBack:0:1:f]' class='bg-slate' >
                EaseInOutBack
            </li>

        </ul>

    </main-view>
</div>