<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
    <div class='grid p15-grid full-x relative'>

        <h1 class="txt-azure text-center weight-900 semibold">
            Send Scopes
        </h1>
        <div>
            <hr class='full-x absolute left-0'>
        </div>
    </div>
    <div class='full-x overflow-auto height-20p'>
        <ul class='grid flex-vertical-center full-x overflow-x'>
            <li class='flex-start width-30p border-2-right m20x text-left border-solid border-white'>
                1. "send&nbsp;:<span class='weight-700'>&nbsp;self "</span>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle:self]" when-scale-subtle="a:[scaleInX-subtle:1000:linear:800:1:f]">
                    4x Delay = 400ms
                </div>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle:self:200]:delay-200" when-scale-subtle="a:[scaleInX-subtle:1000:linear:0:1:f, scaleInX-subtle:1000:linear:0:1:f, scaleInX-subtle:1000:linear:200:1:f]:delay-400">
                    4x Delay = 800ms
                </div>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle:self:300]:delay-300" when-scale-subtle="a:[scaleInX-subtle:1000:linear:300:1:f]:delay-300">
                    4x Delay = 1200ms
                </div>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle:self:400]:delay-400" when-scale-subtle="a:[scaleInX-subtle:1000:linear:400:1:f]:delay-400">
                    4x Delay = 1600ms
                </div>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle:self:500]:delay-500" when-scale-subtle="a:[scaleInX-subtle:1000:linear:500:1:f]:delay-500">
                    5x Delay = 2000ms
                </div>
            </li>
        </ul>
    </div>
    <div class='full-x overflow-auto height-20p' >
        <ul class='grid flex-vertical-center full-x overflow-x' u when-scale-subtle-one="a:[scaleInX-subtle:500:linear:100:1:f]:delay-100"
        when-scale-subtle-two="a:[scaleInX-subtle:500:linear:100:1:f]:delay-100"
        when-scale-subtle-three="a:[scaleInX-subtle:500:linear:100:1:f]:delay-250"
        >
            <li class='flex-start width-30p border-2-right m20x text-left border-solid border-white'>
                2. "send&nbsp;:<span class='weight-700'>&nbsp;parents "</span>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle-one:parent:100]:delay-100">
                    Scale-subtle-one 400ms
                </div>
            </li>

            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle-two:parent:2000]:delay-500">
                    Scale-subtle-two +2500/+200
                </div>
            </li>

            <li class='width-20p'>
                <div class='txt-1' u on-init="s:[scale-subtle-one:public:7000]:delay-500">
                    Scale-subtle-three +4500/+200
                </div>
            </li>



        </ul>
    </div>

    <div class='full-x overflow-auto height-20p' >
        <ul class='grid flex-vertical-center full-x overflow-x' u on-init="s:[scale-subtle-one-public:public:100]:delay-100"
        >
            <li class='flex-start width-30p border-2-right m20x text-left border-solid border-white'>
                2. "send&nbsp;:<span class='weight-700'>&nbsp;public"</span>
            </li>
            <li class='width-20p'>
                <div class='txt-1' u when-scale-subtle-one-public="a:[scaleInX-subtle:500:linear:100:1:f]:delay-100">
                    Scale-subtle-one 400ms
                </div>
				<div class='txt-1' u when-scale-subtle-one-public="a:[scaleInX-subtle:500:linear:100:1:f]:delay-100">
                    Scale-subtle-one 400ms
                </div>
            </li>
        </ul>
    </div>

    <div class='full-xy' ng-if='false'>
        <div class='full-x'>
            <div class='p15-grid full-x txt-white'>
                <h1 class='full-x weight-900 txt-64 bg-azure txt-white text-center'> Parents </h1>
            </div>
            <ul class="height-90p flex-wrap full-x overflow-auto overflow-y p15-grid" u on-init="s:[init-all-scale:public:1000, init-all-siblings:public:500, init-self:self:5000]:delay-1000|a:[scaleInX-subtle:1000:linear:0:1:f]:delay-125|prop:[opacity:1:delay-100]:delay-1000" when-init-self="a:[scaleInX-subtle:2000:linear:0:1:r]">

                <li class='height-50p width-33p text-center'>
                    <div class='weight-900 text-center bg-azure-20p p20xy'>Sibling 1 </div>
                    <div class='full-x p15-grid'>
                        <ul class='full-x relative flex-wrap grid text-left'>
                            <li class='full-xy flex-wrap flex-wrap-center height-25p' ng-class="{'bg-slate':!($index % 2) }" ng-repeat='_scope in ["self", "neighbors", "children", "parents", "nth"]'>
                                <div class='width-20p'>
                                    Child {{$index + 1}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class='height-50p width-33p'>
                    <div class='weight-900 text-center bg-azure-20p p20xy'>Sibling 2 </div>
                    <div class='full-x p15-grid'>
                        <ul class='full-x relative flex-wrap grid text-left'>
                            <li class='full-xy flex-wrap flex-wrap-center height-25p' ng-class="{'bg-slate':!($index % 2) }" ng-repeat='_scope in ["self", "neighbors", "children", "parents", "nth"]'>
                                <div class='width-20p'>
                                    Child {{$index + 1}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class='height-50p width-33p'>
                    <div class='weight-900 text-center bg-azure-20p p20xy'>Sibling 3 </div>
                    <div class='full-x p15-grid'>
                        <ul class='full-x relative flex-wrap grid text-left'>
                            <li class='full-xy flex-wrap flex-wrap-center height-25p' ng-class="{'bg-slate':!($index % 2) }" ng-repeat='_scope in ["self", "neighbors", "children", "parents", "nth"]'>
                                <div class='width-20p'>
                                    Child {{$index + 1}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- <li class='full-x relative bg-slate' style='height:10%;'>

                    <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                        Send Time
                    </h1>
                    <hr class='full-x absolute left-0'>
                </li>
                <li class='height-50p bg-slate full-x'>
                </li> -->
            </ul>
        </div>
    </div>
</div>
