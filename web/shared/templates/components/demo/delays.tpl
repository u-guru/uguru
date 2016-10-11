<div class="full-xy flex-center">
    <ul class="flex-wrap-center p15-grid" on-init="s:[init-all-scale:public]">
        <li class='m20x full-x'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold">
                    Property delays
                </h1>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:0:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "delay-0"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:1000:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-1000"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-auburn border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:0:1:f]:delay-1000">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "ext-1000"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-auburn border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:500:1:f]:delay-500">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-500, ext-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-auburn border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:250:1:f]:delay-750">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-delay-250", "ext-delay-"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='full-x m20y'>
            <hr class='absolute bg-white full-x'/>
        </li>
        <!-- predefined custom animation delays -->
        <li class='m20x'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure weight-900 opacity-50p semibold">
                    Custom Anim delays
                </h1>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scaleX(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceInX:1000:easeTo:1000:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceInX
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "delay:0"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <!-- <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceInX:1000:linear:500:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "delay-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceInX:1000:linear:500:0:f]:delay-500">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "ext-delay-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-auburn border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:250:1:f]:delay-250">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "both-delay-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-auburn border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:1000:linear:500:1:f]:delay-500">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "g-delay-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
 -->
    </ul>
</div>
