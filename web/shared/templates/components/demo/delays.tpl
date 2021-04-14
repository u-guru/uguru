<div class="full-xy flex-center">
    <ul class="flex-wrap-center p15-grid" on-init="s:[init-all-scale:public]">
        <li class='m20x full-x'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold">
                    Property delays
                </h1>
			</div>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scaleX:0:1:500:(0.17,0.67,0.83,0.67):0:1:f]">
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
                on-init="a:[scale:0:1:500:linear:500:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:500:linear:0:1:f]:delay-500">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "ext-500"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:500:linear:250:1:f]:delay-250">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-250, ext-250"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20x'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[scale:0:1:500:linear:100:1:f]:delay-400">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    Scale
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-100", "ext-400"]'>{{arg}}</li>
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
                on-init="a:[bounceIn-rotate-subtle:2500:linear:0:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceIn-rotate-subtle
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "delay:0"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceIn-rotate-subtle:2500:linear:300:1:f]">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceIn-rotate-subtle
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-300"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"

                on-init="a:[bounceIn-rotate-subtle:2500:linear:0:1:f]:delay-300">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceIn-rotate-subtle
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "ext-300"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"

                on-init="a:[bounceIn-rotate-subtle:2500:linear:150:1:f]:delay-150">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceIn-rotate-subtle
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-100", "ext-150"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
        <li class='m20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceInX:2500:linear:250:1:f]:delay-750">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold txt-center full-x">
                    bounceInX
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase border-1 p10x txt-white bg-transparent' ng-repeat='arg in ["2500ms", "int-125", "ext-175"]'>{{arg}}</li>
                </ul>
            </div>
        </li>
    </ul>
</div>
