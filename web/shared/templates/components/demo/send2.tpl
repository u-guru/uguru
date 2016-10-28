<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
	<div class='grid p15-grid full-x relative flex-wrap-center'>
        <ul class='width-50p p15-grid full-y flex-wrap flex-vertical-center'>
            <li class='full-x m20y text-left'
                u


                ng-attr-on-click="s:[broadcast-public:public]"
                ng-attr-on-key-up="s:[broadcast-public:public:linear-2500, init-all:public:linear-1000]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="1">
                    <span class='opacity-50 uppercase weight-300'>key # {{$index + 1}}</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        {{"broadcast-public".split('-').join(' ')}}
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u


                ng-attr-on-click="s:[init-grandchildren:public]"
                ng-attr-on-key-up="s:[init-grandchildren:public:100]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="2">
                    <span class='opacity-50 uppercase weight-300'>key # 2</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        {{"init-grandchildren".split('-').join(' ')}}
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u


                ng-attr-on-click="s:[init-children:public]"
                ng-attr-on-key-up="s:[init-children:public:100]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="3">
                    <span class='opacity-50 uppercase weight-300'>key # 2</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        {{"init-children".split('-').join(' ')}}
                    </span>
            </li>

        </ul>
        <ul class='width-50p p15-grid full-y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' u init-with="p:[opacity:0]"  on-init='a:[opacity:0:1:250:easeOutCirc:100:1:f,translateY:250%:0%:250:bouncePast:100:1:f]' when-init-children="send:[flash-plz:c:linear-2500]" when-init-grandchildren="send:[flash-plz:gc:linear-2500]"  style='height:500px'>
            <!-- when-init-grandchildren="s:[change-bg-pink:grandchildren]" when-init-children="[change-bg-pink:grandchildren]"

                when-reset-requested="s:[init-with:self]"
                     -->
                <div class='full-x absolute left-0 text-center txt-64' style='top:10%'> Godfather </div>
                <li u  ng-repeat='child in ["c1", "c2", "c3"]' on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" >
                    <div class='full-x text-center m10y p05y p10x'>
                        child #{{$index + 1}}
                    </div>
                    <div class='full-x flex-wrap-center relative p10y'>
                        <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                    </div>
                    <ul class='flex-vertical-center full-x p15-grid'>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"  when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc1
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc2
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc3
                        </li>
                    </ul>
                </li>
        </ul>
    </div>

</div>
