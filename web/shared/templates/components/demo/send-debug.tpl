<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
    <div class='grid p15-grid full-x relative flex-wrap-center'>
        <ul class='width-50p p15-grid full-y flex-wrap flex-vertical-center'>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[broadcast-public:public]"
                ng-attr-on-key-up="s:[init-stagger:public:linear-1000]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="1">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # {{$index + 1}}</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'> Public </span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(*)</span>
                    </span>
            </li>
        </ul>
    <ul class='width-50p p15-grid full-y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' u init-with="p:[opacity:0]"  on-init='a:[opacity:0:1:250:easeOutCirc:100:1:f,translateY:250%:0%:250:bouncePast:100:1:f]'
        when-init-stagger="s:[stagger-all-children:children:easeTo-1000]"
        style='height:500px'>
                <div class='full-x absolute left-0 text-center txt-64' style='top:10%'> Children to stagger</div>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-stagger-all-children="p:[opacity:1]">
                    <div class='full-x text-center m10y p05y p10x'>
                        child #1
                    </div>
                </li>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-stagger-all-children="p:[opacity:1]">
                    <div class='full-x text-center m10y p05y p10x'>
                        child #2
                    </div>
                </li>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-stagger-all-children="p:[opacity:1]">
                    <div class='full-x text-center m10y p05y p10x'>
                        child #3
                    </div>
                </li>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-stagger-all-children="p:[opacity:1]">
                    <div class='full-x text-center m10y p05y p10x'>
                        child #4
                    </div>
                </li>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-stagger-all-children="p:[opacity:1]">
                    <div class='full-x text-center m10y p05y p10x'>
                        child #5
                    </div>
                </li>
    </ul>
    </div>
</div>
