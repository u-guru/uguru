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
        <ul class='flex-wrap-center flex-wrap full-xy' >
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Stagger-based Delays (Requires prefix send:[msg-name]:children)
            </li>
            <li class='flex-start relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y txt-4 weight-300' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                    <div>
                        #{{$index + 1}}. send : [ example-child-msg : children:<span class='weight-700'>&nbsp;{{_scope}}</span>
                        ]
                    </div>

                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-wrap-center'  u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:linear-1000]:+1000' when-reinit-everyone="s:[on-init:self]">
                        <li class='absolute left-0 bg-azure width-128 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-click="s:[reinit-everyone:depth(-1)]">
                            Reset the whole thing
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]">
                            Child 1
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]">
                            Child 2
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]">
                            Child 3
                        </li>
                    </ul>
                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-wrap-center'  u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:linear-1000]:+1000' when-reinit-everyone="s:[on-init:self]">
                        <li class='absolute left-0 bg-azure width-128 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-click="s:[example-child-msg:depth(0):linear-500]" when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]">
                            Reset myself + sibs
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25] | s:[sibling-red:depth(0)]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]" when-reinit-yourself="s:[on-init:self]">
                            Child 1
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f] " when-reinit-yourself="s:[on-init:self]"
						when-sibling-red="p:[background-color:#EC6756]">
                            Child 2
                        </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]" when-reinit-yourself="s:[on-init:self]">
                            Child 3
                        </li>
                    </ul>
            </li>
        </ul>
        <ul class='flex-wrap-center flex-wrap full-xy' >
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Stagger-based Delays (Requires prefix send:[msg-name]:children)
            </li>
            <li class='flex-start relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y txt-4 weight-300' ng-repeat='_scope in ["linear-1000", "easeInCirc-1000"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                    <div>
                        #{{$index + 1}}. send : [ example-child-msg : children:<span class='weight-700'>&nbsp;{{_scope}}</span>
                        ]
                    </div>

                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-vertical-center' ng-if='_scope === "linear-1000"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:linear-1000]:+1000' >
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:easeInCirc:0:1:f]" ng-repeat='letter in "abcdefghijklmnop"'>
                            {{letter}}
                        </li>

                    </ul>
                    <ul class='full-x m10y right-0 txt-1 relative weight-900 uppercase p10xy border-2 flex-vertical-center' ng-if='_scope === "easeInCirc-1000"' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|s:[example-child-msg:children:easeInCirc-1000]:+1000'>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u on-init="p:[opacity:0.25]"  when-example-child-msg="a:[opacity:0.25:1:1000:linear:0:1:f]" ng-repeat='letter in "abcdefghijklmnop"'>
                            {{letter}}
                        </li>
                    </ul>
            </li>
        </ul>
        <ul class='flex-wrapflex-wrap full-xy'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Scope/Target/Audience Examples
            </li>
            <li class='flex-wrap relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["self", "public", "children", "parent", "grandparent", "grandchildren", "depth(2)", "depth(-2)",  "depth(-0) ", "depth(0)", "depth(>1)(down)"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
            <!-- <li class='flex-start relative flex-wrap m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["siblings"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}"> -->
                    <div when-turn-pink="p:[background:#e6389b]|a:[scale:0:1:500:bouncePast:0:1:f,rotate:0deg:-1080deg:500:easeOutCirc:0:1:f,opacity:0:1:500:easeOutCirc:0:1:f, padding:0px:15px:500:easeOutCirc:0:1:f]" u>
                        #{{$index + 1}}. send:<span class='weight-700'>&nbsp;{{_scope}}</span>
                    </div>

                    <div class='absolute width-25p right-0 txt-1 weight-900 uppercase p10xy border-2' ng-if='_scope === "self"' on-mouseenter="send:[on-init:self:1000, init-with:self:2000]" init-with="p:[opacity:0]" u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|p:[opacity:1]'>
                        Mouse over me to reset this div
                    </div>
                    <div class='absolute width-25p right-0 txt-1 weight-900 uppercase p10xy border-2' ng-if='_scope === "public"' on-mouseenter="send:[turn-pink:public]" init-with="p:[opacity:0]" u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]|p:[opacity:1]'>
                        Mouse over me to change background of each #'d item to pink
                    </div>
                    <ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "children"' on-mouseenter="send:[start-counter:children:easeOutBounce-1000]" u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]'>
                            <li class='width-50p' u>
                                <span class='grand-child' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                                    Mouse over me to initialize my children
                                </span>
    					</li>
    					<li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white'
    						u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"
    						ng-repeat='counter in ["c1", "c2", "c3"]'>
    						{{counter}}
    					</li>
    				</ul>

    				<ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "parent"'
    					u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]'>

    					<li class='width-50p'
    						when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u>
    						<span class='grand-child'
    							on-mouseenter="send:[start-counter:parent:1000]" u>
                                    Mouse over me to initialize my parent
                                </span>
    					</li>
    					<li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white'
    						u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" ng-repeat='counter in ["c1", "c2", "c3"]'>
    						{{counter}}
    					</li>
    				</ul>

    				<ul style='top:20% !important;' class='absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "grandparent"'
    					u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">

    					<li class='width-50p' u>
    						<span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                    Mouse over me to initialize my grandparent
                                </span>
                            </li>
                        <li class='width-64 height-32 flex-wrap-center border-1 border-solid child width-50 p10xy border-2-solid border-white' u  ng-repeat='counter in ["c1", "c2", "c3"]'>
                            {{counter}}
                        </li>
                    </ul>
                    <ul  class='full-x m20y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope === "grandchildren"'
                        u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' on-mouseenter="send:[start-counter:grandchildren:1000]">

                            <li class='grand-child'>
                                Mouse over me to initialize my grandchildren
                            </li>

                            <li u  ng-repeat='child in ["c1", "c2", "c3"]' class='full-x flex-wrap'>
                                <div class='full-x text-center m10y'>
                                    child #{{$index + 1}}
                                </div>
                                <div class='full-x flex-wrap-center relative p10y'>
                                    <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                                </div>
                                <ul class='flex-vertical-center full-x p15-grid'>
                                    <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"  ng-repeat='grandchild in ["gc1", "gc2", "gc3"]'> {{grandchild}}</li>
                                </ul>
                            </li>
                    </ul>
                    <ul  class='full-x m20y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("depth(2)") > -1'
                        u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' on-mouseenter="send:[start-counter:depth(2):1000]">

                            <li class='grand-child'>
                                Mouse over me to initialize my grandchildren via <strong> depth:2 </strong>
                            </li>

                            <li u  ng-repeat='child in ["c1", "c2", "c3"]' class='full-x flex-wrap'>
                                <div class='full-x text-center m10y'>
                                    child #{{$index + 1}}
                                </div>
                                <div class='full-x flex-wrap-center relative p10y'>
                                    <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                                </div>
                                <ul class='flex-vertical-center full-x p15-grid'>
                                    <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"  ng-repeat='grandchild in ["gc1", "gc2", "gc3"]'> {{grandchild}}</li>
                                </ul>
                            </li>
                    </ul>
                    <ul  class='full-x m20y flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("depth(-2)") > -1'
                        u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[opacity:0:1:250:linear:0:1:f, scale:0.5:1:250:bouncePast:0:1:f]" >

                            <li class='grand-child weight-500'>
                                Mouse over any <u>grandchildren</u> to shake me via <strong> depth:-2 </strong>
                            </li>

                            <li u  ng-repeat='child in ["c1", "c2", "c3"]' class='full-x flex-wrap'>
                                <div class='full-x text-center m10y'>
                                    child #{{$index + 1}}
                                </div>
                                <div class='full-x flex-wrap-center relative p10y'>
                                    <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                                </div>
                                <ul class='flex-vertical-center full-x p15-grid'>
                                    <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  on-mouseenter="send:[start-counter:depth(-2):1000]" ng-repeat='grandchild in ["gc1", "gc2", "gc3"]'> {{grandchild}}</li>
                                </ul>
                            </li>
                    </ul>
                     <ul style='top:20% !important;' class='p15-grid full-x flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("depth(-0)") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' >


                        <li class='border-solid border-white border-1 width-10p' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u ng-repeat='child in ["s", "s1", "s2"]' class='full-x flex-wrap'>
                            sib #{{$index + 1}}
                        </li>
                        <!-- @jeselle, gabrielle Note that it still has the state-->
                        <li class='width-25p border-solid border-white border-1' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]"  on-mouseenter="send:[start-counter:depth(-0)]">
                                My Siblings
                        </li>
                        <li class='border-solid border-white border-1 width-10p' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u ng-repeat='child in ["s", "s1", "s2"]' class='full-x flex-wrap'>
                            sib #{{$index + 4}}
                        </li>

                    </ul>
                    <ul style='top:20% !important;' class='p15-grid full-x flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("depth(0)") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' >


                        <li class='border-solid border-white border-1 width-10p' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u ng-repeat='child in ["s", "s1", "s2"]' class='full-x flex-wrap'>
                            sib #{{$index + 1}}
                        </li>
                        <li class='width-25p border-solid border-white border-1' u when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" on-mouseenter="send:[start-counter:depth(0)]">
                                My Siblings + me
                        </li>
                        <li class='border-solid border-white border-1 width-10p' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]" u ng-repeat='child in ["s", "s1", "s2"]' class='full-x flex-wrap'>
                            sib #{{$index + 4}}
                        </li>

                    </ul>


                    <ul class='p15-grid full-x flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' u on-mouseenter="s:[start-counter:depth(>1)]" ng-if='_scope.indexOf("down") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' style='height:500px'>
                            <li class='grand-child' >
                                Mouse over me to initialize my grandchildren
                            </li>

                            <li u  ng-repeat='child in ["c1", "c2", "c3"]' class='full-x flex-wrap'>
                                <div class='full-x text-center m10y'>
                                    child #{{$index + 1}}
                                </div>
                                <div class='full-x flex-wrap-center relative p10y'>
                                    <span style='padding:10px 2px' class='absolute full-y bg-smoke top-0'> </span>
                                </div>
                                <ul class='flex-vertical-center full-x p15-grid'>
                                    <li class='m05x border-1-left border-1-right p05y p10x border-1-top border-solid border-white' u  ng-repeat='grandchild in ["gc1", "gc2", "gc3"]'  when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">
                                        {{grandchild}}
                                    </li>
                                </ul>
                            </li>
                    </ul>

               <!--      <ul style='top:40% !important;' class='top-0 bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("down+") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">

                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                Next Iteration
                            </span>
                        </li>
                    </ul> -->
               <!--      <ul style='top:40% !important;' class='top-0 bg-auburn absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("up") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">

                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                Next Iteration
                            </span>
                        </li>
                    </ul>

                    <ul style='top:40% !important;' class='top-0 bg-gold absolute width-50p flex-vertical-center right-0 txt-1 weight-900 uppercase  border-2' ng-if='_scope.indexOf("odd") > -1' u on-init='a:[translateX:250%:0%:1000:bouncePast:0:1:f]' when-start-counter="a:[counter:0:100:5000:easeOutCirc:0:1:f]">

                        <li class='width-50p' u>
                            <span class='grand-child' on-mouseenter="send:[start-counter:grandparent:1000]" u>
                                In the near future
                            </span>
                        </li>
                    </ul>
 -->
            </li>

        </ul>

      <!--   <ul class='flex-wrap flex-wrap full-xy'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Internal/External Delay Examples
            </li>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>

            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["]", ": 0]", ": 1000]", "]:delay-100", "]:+100", "]:d100"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:&nbsp;
                [
                <span class='weight-500'>message-name:&nbsp;public</span> <span class='weight-700'>{{_scope}}</span>
            </li>
        </ul> -->
        <ul class='flex-vertical-center flex-wrap full-xy mtop50' ng-init="action_states=['on-init', 'on-mouseleave', 'on-key-press', 'when-intro-anim-complete']; action_audience=['self', 'children', 'parents', 'public']" ng-if='false'>
            <li class='flex-start m20x text-left border-solid border-white full-x bg-azure-20p border-1-bottom txt-white p15-grid weight-900 p20xy'>
                Action
            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='action in ["reverse]", "off]", "reset]"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:&nbsp;
                [
                <span class='weight-500' style='text-decoration:underline;'>{{action_states[$index]}}</span>:&nbsp;{{action_audience[$index]}}:1000:&nbsp; <span class='weight-700'>{{action}}</span>
            </li>
        </ul>
        <ul class='flex-vertical-center flex-wrap full-xy' ng-init="action_states=['on-init', 'on-mouseleave', 'on-key-press', 'when-intro-anim-complete']; action_audience=['self', 'children', 'parents', 'public']" ng-if='false'>
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
