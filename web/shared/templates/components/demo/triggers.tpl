<div class="full-xy flex-center" ng-controller='AdminDemosController as demo'>
    <ul class="flex-wrap-center p15-grid">
        <li u  on-click="send:[scale-down:self]"  when-scale-down="a:[scale:1:0.5:1000:bouncePast:0:1:f]">
            <div class="bg-moxie flex-wrap-center width-128 height-128 txt-3 full-x text-center radius-2">
                Send <span class='weight-900'>&nbsp;Myself</span> Message Immediately
            </div>
        </li>
        <li u on-init="send:[scale-down:self:delay-1000]"  when-scale-down="a:[scale:1:0.5:1000:bouncePast:0:1:f]">
            <div class="bg-moxie flex-wrap-center width-128 height-128 txt-3 full-x text-center radius-2" >
                Send <span class='weight-900'>&nbsp;Myself</span> Message after 1000ms
            </div>
        </li>
        <li>
            <div class="bg-moxie flex-center width-128 height-128 radius-2 text-center" >
                Trigger
            </div>
        </li>
        <li class='full-x'>
            <hr class='full-x absolute left-0 p20x'/>
        </li>
    </ul>
</div>
