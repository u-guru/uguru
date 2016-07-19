<div class='bg-auburn txt-white p15-grid fixed bottom-0 left-0 full-x' id='admin-anim-tools' ng-if='parent.debug.showToolbar'>
    <div class="flex full-x">
        <div class="bg-charcoal txt-moxie p15xy flex-center-vertical width-128">
            <h2 class="uppercase txt-18 semibold">{{parent.name}} States</h2>
        </div>
        <ul class="flex-center-vertical p15-grid overflow-x no-scrollbar" style="width: calc(100% - 128px);">
            <li ng-repeat='state in parent.debug.states'>
                <button class="bg-moxie height-36 txt-18 radius-2 normal p15-grid">
                    #{{state.id}}
                </button>
            </li>

        </ul>
    </div>

</div>