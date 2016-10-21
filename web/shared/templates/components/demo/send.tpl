<div class="full-xy flex absolute full-xy top-0 left-0 flex-wrap">
    <div class='grid p15-grid full-x relative'>
        <h1 class="txt-azure text-center weight-900 semibold full-x">
            <ul class='p15-grid flex-wrap-center full-x'>
                <li ng-repeat='send_arg in ["msg name", "scope/target audience", "delay", "action", "data&nbsp;&nbsp;", "]:ext-delay"]' class='txt-3' style='width:calc(100%/6)'>
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
                Scope/Target/Audience Examples
            </li>
            <li class='flex-start m20x p20left text-left border-solid border-white full-x m20y weight-300' ng-repeat='_scope in ["self", "children", "parent", "grand-[children,parent]", "depth(+/- LEVEL)", "odd children"]' ng-class="{'bg-slate-50p p20y': $index % 2 === 1}">
                #{{$index + 1}}. send:<span class='weight-700'>&nbsp;{{_scope}}</span>
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
