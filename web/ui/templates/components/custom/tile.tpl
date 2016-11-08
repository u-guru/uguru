<div class="ui-gallery-item"
                    u init-with="p:[op:0, tr:translateX(-750px)]"
                    when-gallery-enter="a:[opacity:0:1:500:linear:0:1:f, translateX:-750px:0px:300:easeOutExpo:0:1:f]:delay-250"
                    on-mouseenter="s:[top-left:public] | a:[border-color:rgba(255,255,255,0.5):rgba(255,255,255,1):100:linear:0:1:f]"
                    on-mouseleave="s:[top-left-leave:public]">
    <a u on-click='s:[popup-modal-requested:public]'></a>
    <div>
        <div ng-include="import_url"> </div>
        </figure>
        <aside>
            <h2>{{name}}</h2>
            <ul>
                <li><a ng-repeat='chip in chips' class="chip bg bg-{{chip.bg}}">{{chip.name}}</a></li>
            </ul>
        </aside>
    </div>
</div>
