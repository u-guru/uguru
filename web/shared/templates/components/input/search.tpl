<div class="perspective-container full-xy flex-center p15xy">
    <fieldset class="search-bar"
        u init-with="p:[op:1, width:48px]"
        on-init="s:[search-bar-init:children] | a:[opacity:0:1:1500:easeOutQuint:0:1:f, translateX:500px:0px:250:easeInOutElastic:0:1:f]"
        when-search-bar-clicked="a:[width:48px:500px:250:easeOutBack:0:1:f]"
        on-click="s:[search-bar-clicked:self, search-bar-icon:children:250]"
        on-exit="p:[opacity:1:0:250:easeOutSine]">
        <div>
            <label for="search-bar">
                <svg viewBox="0 0 100 100">
                    <path d="M62.994485,62.994485 L85.6624699,85.6624699"
                        u init-with="p:[sda:32.06, sdo:32.06]"
                        when-search-bar-init="a:[stroke-dashoffset:32.06:0:200:easeOutSine:750:1:f]"></path>
                    <circle cx="42.5" cy="42.5" r="28.5"
                        u on-init="s:[init-with:self:700]"
						init-with="p:[sda:179.07, sdo:179.07]"
                        when-search-bar-init="a:[stroke-dashoffset:179.07:0:200:easeOutSine:0:1:f]:delay-500"></circle>
                </svg>
            </label>

            <input id="search-bar" placeholder="Filter" value=""
                u init-with="p-op"
                when-search-bar-icon="p:[opacity:0:1:250:easeOutSine:0:1:f]"/>
        </div>
    </fieldset>
</div>
