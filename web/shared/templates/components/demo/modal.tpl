<div class="full-xy flex-center">
    <main-view>
        <div u on-click='send:[modal-green-tile-requested:public]'>
            <button id="green-tile" class="normal radius-2 bg-moxie">Modal</button>
        </div>
        <modal u name="green-tile" scale-to='#green-tile' class='bg-cerise full-xy' when-modal-green-tile-requested="a:[opacity:0:1:500:easeOutCirc:0:1:f, scaleX:0.0654:1:1000:easeOutCirc:0:1:f, scaleY:0.0916:1:1000:easeOutCirc:0:1:f, z-index:-100:5:20:linear:0:1:f]" ng-attr-accept-keys="esc" on-key-up="send:[modal-green-tile-closed:self]"  when-modal-green-tile-closed="a:[scaleX:1:0.0654:1000:easeOutCirc:0:1:f, scaleY:1:0.0916:1000:easeOutCirc:0:1:f, z-index:5:-100:20:linear:500:1:f]">
            {{docs}}
        </modal>
    </main-view>
</div>
