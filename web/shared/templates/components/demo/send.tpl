<div class="full-xy flex absolute full-xy top-0 left-0">
    <ul class="flex-wrap full-xy overflow-auto overflow-y p15-grid" u on-init="s:[init-all-scale:public]">
        <li class='full-x relative' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Send Scopes
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
        <li class='height-50p full-x'>
            <div class='full-x p15-grid'>
                <ul class='full-x relative flex-wrap grid text-left'>
                    <li class='full-xy flex-wrap flex-wrap-center height-25p' ng-class="{'bg-slate':!($index % 2) }" ng-repeat='_scope in ["self", "neighbors", "children", "parents", "nth"]'>
                        <div class='width-20p'>
                            {{_scope}}
                        </div>
                    </li>
                </ul>
            </div>
        </li>
        <li class='full-x relative bg-slate' style='height:10%;'>

            <h1 class="txt-azure text-center height-50p weight-900 opacity-50p semibold">
                Send Time
            </h1>
            <hr class='full-x absolute left-0'>
        </li>
        <li class='height-50p bg-slate full-x'>
        </li>
    </ul>
</div>
