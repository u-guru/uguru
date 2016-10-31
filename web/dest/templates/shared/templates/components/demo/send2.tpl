<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
	<div class='grid p15-grid full-x relative flex-wrap-center'>
        <ul class='width-50p p15-grid full-y flex-wrap flex-vertical-center'>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[broadcast-public:public]"
                ng-attr-on-key-up="s:[broadcast-public:public:linear-2500, init-all:public:linear-1000]:+200"
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
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[init-grandchildren:public]"
                ng-attr-on-key-up="s:[init-grandchildren:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="2">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 2</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>grandchildren</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;gc,&nbsp;depth(-2)</span>
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[init-children:public]"
                ng-attr-on-key-up="s:[init-children:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="3">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 3</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>children</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;c,&nbsp;depth(-1)</span>
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-to-self:public]"
                ng-attr-on-key-up="s:[send-to-self:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="4">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 4</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>

                        <span class='weight-900'>self</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-)</span>

                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-to-depth-greater-one:public]"
                ng-attr-on-key-up="s:[send-to-depth-greater-one:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="5">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 5</span>
                    <span class='p10xy border-1'>
                        godfather
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>

                        <span class='weight-900'>depth(>1)</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(1>),&nbsp;depth(>c)</span>


                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-gc1-to-parent:public]"
                ng-attr-on-key-up="s:[send-gc1-to-parent:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="6">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 6</span>
                    <span class='p10xy border-1'>
                        gc1
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>parent</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-1), p</span>
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-gc2-to-grandparent:public]"
                ng-attr-on-key-up="s:[send-gc2-to-grandparent:public:100]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="7">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 7</span>
                    <span class='p10xy border-1'>
                        gc2
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>grandparent</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-2), p</span>
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-gc4-to-siblings:public]"
                ng-attr-on-key-up="s:[send-gc4-to-siblings:public:100]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="8">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 8</span>
                    <span class='p10xy border-1'>
                        gc4
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>siblings gc5,gc6</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-0), p</span>
                    </span>
            </li>
            <li class='full-x m20y text-left'
                u
                ng-attr-on-click="s:[send-gc7-to-siblings-and-self:public]"
                ng-attr-on-key-up="s:[send-gc7-to-siblings-and-self:public:100]:+1000"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="9">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 9</span>
                    <span class='p10xy border-1'>
                        gc7
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>siblings gc8,gc9</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-0), p</span>
                    </span>
            </li>

            <!-- <li class='full-x m20y text-left'
                u


                ng-attr-on-click="s:[send-to-gc1:public]"
                ng-attr-on-key-up="s:[send-to-gc1:public:100]:+200"
                on-mouseenter="p:[opacity:0.5]"
                on-mouseleave='p:[opacity:1]'
                ng-attr-accept-keys="6">
                    <span class='opacity-50 uppercase weight-700 p20x'>press key # 6</span>
                    <span class='p10xy border-1'>
                        gc1
                    </span>
                    <span class='weight-900 txt-32'>
                        &nbsp;&nbsp;&nbsp;&#8594;&nbsp;&nbsp;
                    </span>
                    <span class='p10xy border-1'>
                        <span class='weight-900'>siblings</span>
                        <span class='opacity-50p weight-400'>&nbsp;aka&nbsp;depth(-0)</span>
                    </span>
            </li> -->
        </ul>
        <ul class='width-50p p15-grid full-y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' u init-with="p:[opacity:0]"  on-init='a:[opacity:0:1:250:easeOutCirc:100:1:f,translateY:250%:0%:250:bouncePast:100:1:f]'
        when-init-children="send:[flash-plz:children:linear-2500]"
        when-init-grandchildren="send:[flash-plz:gc:linear-2500]"
        when-send-to-self="send:[on-init:depth(-):1000]:delay-1000"
        when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
        when-send-to-depth-greater-one="send:[flash-plz:depth(>1):linear-2500]"
        style='height:500px'>
            <!-- when-init-grandchildren="s:[change-bg-pink:grandchildren]" when-init-children="[change-bg-pink:grandchildren]"

                when-reset-requested="s:[init-with:self]"
                     -->
                <div class='full-x absolute left-0 text-center txt-64' style='top:10%'> Godfather </div>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" >
                    <div class='full-x text-center m10y p05y p10x'>
                        child #1
                    </div>
                    <div class='full-x flex-wrap-center relative p10y'>
                        <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                    </div>
                    <ul class='flex-vertical-center full-x p15-grid'>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u
                        when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-send-to-gc1="s:[flash-plz:siblings:linear-500]"
                        when-send-gc1-to-parent="s:[flash-plz:depth(-1):1000]"
                        >
                            gc1
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u
                        when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-send-gc2-to-grandparent="s:[flash-plz:grandparent:1000]"
                        >

                            gc2
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc3
                        </li>
                    </ul>
                </li>

                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" >
                    <div class='full-x text-center m10y p05y p10x'>
                        child #2
                    </div>
                    <div class='full-x flex-wrap-center relative p10y'>
                        <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                    </div>
                    <ul class='flex-vertical-center full-x p15-grid'>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u
                        when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-send-gc4-to-siblings="s:[flash-plz:depth(-0):100]"
                        >
                            gc4
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc5
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc6
                        </li>
                    </ul>
                </li>
                <li u on-init="p:[opacity:0.5]" class='full-x m10x border-1 flex-wrap' when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" >
                    <div class='full-x text-center m10y p05y p10x'>
                        child #2
                    </div>
                    <div class='full-x flex-wrap-center relative p10y'>
                        <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                    </div>
                    <ul class='flex-vertical-center full-x p15-grid'>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u
                        when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]"
                        when-send-gc7-to-siblings-and-self="s:[flash-plz:depth(0):100]"
                        >
                            gc7
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc8
                        </li>
                        <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  when-broadcast-public="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]" when-flash-plz="a:[opacity:0.5:1:1000:easeOutQuint:0:1:f]">
                            gc9
                        </li>
                    </ul>
                </li>
        </ul>
    </div>

</div>
