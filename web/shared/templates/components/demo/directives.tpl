<div class="full-xy flex-center">
    <ul class="flex-wrap-center p15-grid">
        <li>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform-origin:center center]"
                on-init="a:[icon-enter:250:linear:0:1:f]|s:[first-tile-parent-init:public:delay-0, portal-academic-init:public:delay-0]">
                <!-- TODO AFTER: property animation transform-->
                <h1 init-after="first-tile-parent-init"  on-init="a:[scale:0:1:250:bouncePast:0:1:f]">
                Init After
                </h1>
            </div>
        </li>
		<li init-with="p:[op:0, tro:center center]"
			init-after="portal-academic-init"
			on-init="a:[back-bp:1000:easeInOutSine:0:1:f]">
			<div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2">
                <h1> init-after from loader </h1>
            </div>
		</li>
        <li init-with="p:[transform:translateY(-500%)rotate(-1080deg)]" init-after="first-tile-parent-init" on-init="a:[translateY:-500%:0%:1000:bouncePast:0:1:f,scale:0:1:1000:linear:0:1:f,rotate:-1080deg:0deg:1000:easeOutQuint:0:1:f]">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2">
                <h1> init-after'd #1 </h1>
            </div>
        </li>
        <li init-with="p:[transform:translateY(-500%)rotate(-1080deg)]" init-after="first-tile-parent-init" on-init="a:[translateY:500%:0%:1000:bouncePast:50:1:f,scale:0:1:1000:linear:50:1:f,rotate:-1080deg:0deg:1000:easeOutQuint:50:1:f]">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2">
                <h1> init-after'd #2 </h1>
            </div>
        </li>
        <li init-with="p:[transform:translateY(-500%)rotate(-1080deg)]" init-after="first-tile-parent-init" on-init="a:[translateY:-500%:0%:1000:bouncePast:100:1:f,scale:0:1:1000:linear:100:1:f,rotate:-1080deg:0deg:1000:easeOutQuint:100:1:f]">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2">
                <h1> init-after'd #3 </h1>
            </div>
        </li>
        <li init-with="p:[transform:translateY(-500%)rotate(-1080deg)]"init-after="first-tile-parent-init" on-init="a:[translateY:500%:0%:1000:bouncePast:150:1:f, scale:0:1:1000:linear:150:1:f,rotate:-1080deg:0deg:1000:easeOutQuint:150:1:f]">
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2">
                <h1> init-after'd #3 </h1>
            </div>
        </li>
        <!-- <li>
            <div class="bg-transparent border-solid border-smoke border-3 p10xy flex-center width-128 height-128 radius-2"
                u init-with="p:[transform:translateY(1000%)]" init-after="first-til-parent-init" on-init="a:[translateY:1000%:0%:250:bouncePast:100:1:f]">
                <h1> init-after'd #2
            </div>
        </li> -->
    </ul>
</div>
