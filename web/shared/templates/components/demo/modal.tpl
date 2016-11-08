<div class="full-xy flex-center">
    <main-view>
        <ul class="flex-wrap-center p15-grid">
            <li u on-click='send:[modal-green-tile-requested:public]'>

                <div id='green-tile' class="relative width-128 height-64 flex-center"
                    u on-init="s:[portal-hover:public]">
                    <svg class="fill-moxie absolute top-0 left-0 width-128 height-64" viewBox="0 0 128 64">
                        <rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" rx="2"
                            u init-with="p:[stroke-dasharray:1207, stroke-dashoffset:1207, stroke:rgba(57, 96, 120, 1)]"
                            when-portal-hover="a:[portal-progress-color:2000:linear:250:1:f, stroke-dashoffset:1207:0:2000:linear:250:1:f] | s:[portal-complete:public:2000]"></rect>
                    </svg>
                    <h1 class="relative z-index-2 txt-14 semibold txt-center">Modal</h1>
                </div>
            </li>
        </ul>
         <modal u name="green-tile" scale-to='#green-tile' class='bg-cerise full-xy' when-modal-green-tile-requested="a:[slideInUp-subtle:500:easeOutCirc:0:1:f,scaleX:0.133:1:1000:easeOutCirc:0:1:f,scaleY:0.1000787:1:1000:easeOutCirc:0:1:f,zIndex:-100:5:20:linear:0:1:f]" ng-attr-accept-keys="esc"   on-key-up="send:[modal-green-tile-closed:self]"  when-modal-green-tile-closed="a:[scaleX:1:0.133:1000:easeOutCirc:0:1:f,scaleY:1:0.10070:1000:easeOutCirc:0:1:f, zIndex:5:-100:20:linear:500:1:f]">
            {{docs}}
        </modal>
    </main-view>
</div>
