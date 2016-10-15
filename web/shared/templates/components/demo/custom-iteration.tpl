<div class="full-xy flex-center absolute full-xy top-0 left-0">
    <ul class="flex-wrap-center p15-grid full-x" on-init="s:[init-all-scale:public]">
        <li class='width-20p p20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-after="init-all-scale"
				init-with="p:[tro:center center]"
                on-init="a:[bounceIn-rotate-subtle:1000:linear:0:4:f]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    4 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        Forward
                    </li>
                </ul>
            </div>
        </li>
        <li class='width-20p p20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-after="init-all-scale"
				init-with="p:[tro:center center]"
                on-init="a:[bounceIn-rotate-subtle:1000:linear:0:4:r]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    4 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        Reverse
                    </li>
                </ul>
            </div>
        </li>
        <li class='width-20p p20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-after="init-all-scale"
				init-with="p:[tro:center center]"
                on-init="a:[bounceIn-rotate-subtle:1000:linear:0:4:a]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    4 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        Alternate
                    </li>
                </ul>
            </div>
        </li>
        <li class='width-20p p20xy'>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-after="init-all-scale"
				init-with="p:[tro:center center]"
                on-init="a:[bounceIn-rotate-subtle:1000:linear:0:4:ar]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    4 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        Alternate Reverse
                    </li>
                </ul>
            </div>
        </li>
        <!-- <li class='width-20p'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold">
                    2 Property Iteration
                </h1>
            </div>
        </li>
        <li class='width-20p' ng-repeat="direction in ['f', 'r', 'a', 'ar']">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceIn-rotate-subtle:0:1:1000:easeOutCirc:0:2:{{direction}}]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    2 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        {{direction}}
                    </li>
                </ul>
            </div>
        </li>
        <li class='width-20p'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold">
                    3 Property Iteration
                </h1>
            </div>
        </li>
        <li class='width-20p' ng-repeat="direction in ['f', 'r', 'a', 'ar']">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceIn-rotate-subtle:0:1:1000:easeOutCirc:0:3:{{direction}}]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    3 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        {{direction}}
                    </li>
                </ul>
            </div>
        </li>
        <li class='width-20p'>
            <div class="bg-transparent border-dashed border-slate border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2">
                <h1 class="txt-azure height-50p weight-900 opacity-50p semibold">
                    6 Property Iteration
                </h1>
            </div>
        </li>
        <li class='width-20p' ng-repeat="direction in ['f', 'r', 'a', 'ar']">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center flex-wrap width-128 height-128 radius-2"
                init-with="p:[transform:scale(0)]"
                init-after="init-all-scale"
                on-init="a:[bounceIn-rotate-subtle:0:1:500:easeOutCirc:0:6:{{direction}}]">
                <h1 class="txt-azure txt-2 height-50p weight-900 opacity-50p semibold txt-center full-x">
                    6 iteration <br>
                </h1>
                <ul class='full-x flex-wrap-center txt-azure weight-500 grid'>
                    <li class='m05y border-white weight-900 txt-1 uppercase  p10x txt-center txt-white bg-transparent'>
                        <span class='opacity-50p'>direction:</span>
                        {{direction}}
                    </li>
                </ul>
            </div>
        </li> -->
    </ul>
</div>
