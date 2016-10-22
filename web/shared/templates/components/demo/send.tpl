<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
    <div class='grid p15-grid full-x relative'>
        <h1 class="txt-azure text-center weight-900 semibold full-x">
            <ul class='p15-grid flex-wrap-center full-x'>
                <li ng-repeat='send_arg in ["msg name", "scope/target audience", "delay/stagger", "action", "data&nbsp;&nbsp;", "]:ext-delay"]' class='txt-3' style='width:calc(100%/6)'>
                    {{send_arg}}
                </li>
            </ul>
        </h1>
        <div>
            <hr class='full-x absolute left-0'>
        </div>
    </div>
    <div class='full-xy overflow-auto height-20p'>


        <ul class='flex-vertical-center flex-wrap full-xy'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Stagger-based Delays (Requires prefix send:[msg-name]:children)
            </li>
            <li class='flex-start relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y txt-4 weight-300' ng-repeat='_scope in ["linear-1000", "easeInCirc-1000"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                    <div>
                        #{{$index + 1}}. send : [ example-child-msg : children:<span class='weight-700'>&nbsp;{{_scope}}</span>
                        ]
                    </div>

                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-vertical-center' ng-if='_scope === "linear-1000"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:linear-1000]:+1000' when-reset-request="s:[example-child-msg:children:linear-1000]:+1000">
                        <!-- <li class='width-64 height-32 bg-moxie' u on-mouseenter="send:[reset-request:parent:250]">
                            Reset
                        </li> -->
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]" when-reset-children="p:[opacity:0.25]" when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]" ng-repeat='letter in "abcdefghijklmnop"'>
                            {{letter}}
                        </li>

                    </ul>
                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-vertical-center' ng-if='_scope === "easeInCirc-1000"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:easeInCirc-1000]:+1000' when-reset-request="s:[example-child-msg:children:easeInCirc-1000]:+1000">
                        <!-- <li class='width-64 height-32 bg-moxie' u on-mouseenter="send:[reset-request:parent:250]">
                            Reset
                        </li> -->
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]" when-reset-children="p:[opacity:0.25]" when-example-child-msg="a:[opacity:0.25:1:1000:linear:0:1:f]" ng-repeat='letter in "abcdefghijklmnop"'>
                            {{letter}}
                        </li>

                    </ul>
            </li>
        </ul>
        <ul class='flex-vertical-center flex-wrap full-xy'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Scope/Target/Audience Examples
            </li>
            <li class='flex-start relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["self", "children", "parent", "grandparent", "depth(+/- LEVEL)", "odd children", "siblings", "aunts"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                    <div>
                        #{{$index + 1}}. send:<span class='weight-700'>&nbsp;{{_scope}}</span>
                    </div>

                    <div class='absolute width-25p right-0 txt-1 weight-900 uppercase p10xy border-2' ng-if='_scope === "self"' on-mouseenter="send:[on-init:self:1000]" u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]'>
                        Mouse over me to reset this div
                    </div>
                    <ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "children"' on-mouseenter="send:[start-counter:children:easeOutBounce-1000]" u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]'>
                        <!-- @gabrielle,@jeselle, comment out the 'U' and it becomes a child-->
                        <li class='width-50p' u>
                            <span class='grand-child' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                                Mouse over me to initialize my children
                            </span>
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" ng-repeat='counter in ["c1", "c2", "c3"]'>
                            {{counter}}
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "parent"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]'>
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:parent:1000]" u>
                                Mouse over me to initialize my parent
                            </span>
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" ng-repeat='counter in ["c1", "c2", "c3"]'>
                            {{counter}}
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "grandparent"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                Mouse over me to initialize my grandparent
                            </span>
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u  ng-repeat='counter in ["c1", "c2", "c3"]'>
                            {{counter}}
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("depth") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                TBD
                            </span>
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("odd") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                TBD
                            </span>
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("siblings") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                Siblings
                            </span>
                        </li>
                    </ul>
                    <ul style='top:20% !important;' class='bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("aunts") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                        <!-- @gabrielle,@jeselle, add a u and see which background changes-->
                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                TBD
                            </span>
                        </li>
                    </ul>
            </li>

        </ul>
        <ul class='flex-vertical-center flex-wrap full-xy'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Internal/External Delay Examples
            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["]", ": 0]", ": 1000]", "]:delay-100", "]:+100", "]:d100"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:&nbsp;
                [
                <span class='weight-500'>message-name:&nbsp;public</span> <span class='weight-700'>{{_scope}}</span>
            </li>
        </ul>
        <ul class='flex-vertical-center flex-wrap full-xy' ng-init="action_states=['on-init', 'on-mouseleave', 'on-key-press', 'when-intro-anim-complete']; action_audience=['self', 'children', 'parents', 'public']">
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Action
            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='action in ["reverse]", "off]", "reset]"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:&nbsp;
                [
                <span class='weight-500' style='text-decoration:underline;'>{{action_states[$index]}}</span>:&nbsp;{{action_audience[$index]}}:1000:&nbsp; <span class='weight-700'>{{action}}</span>
            </li>
        </ul>
        <ul class='flex-vertical-center flex-wrap full-xy' ng-init="action_states=['on-init', 'on-mouseleave', 'on-key-press', 'when-intro-anim-complete']; action_audience=['self', 'children', 'parents', 'public']">
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Data
            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='action in ["reverse : with(duration@0.5, delay@+500)", "reset : data(me.coords)"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:&nbsp;
                [
                <span class='weight-500'>{{action_states[$index]}}</span>:&nbsp;{{action_audience[$index]}}:1000:&nbsp; <span class='weight-900'>{{action}}</span>]
            </li>
        </ul>
    </div>
</div>
