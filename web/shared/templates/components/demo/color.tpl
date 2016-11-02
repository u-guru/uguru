<div class="full-xy flex-center">
    <ul class='flex-vertical-center full-x'>
        <li ng-repeat=' property in ["background-color", "fill", "stroke", "stroke-opacity", "background"]'>
            <div class="p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[background:rgba(236, 116, 101, 1)]">
                <txt>
                    init-with:property: {{property}}
                </txt>
            </div>
        </li>
    </ul>
</div>
