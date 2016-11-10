<!-- <div class="full-xy flex-center">
	<main-view>
		<ul class="flex-wrap-center p15-grid">
			<li class='bg-stone text-center radius-10 p15xy'
				u init-with="p:[tr:translateY(0px)]"
				on-init="a:[translateY:0px:100px:450:easeOutSine:0:1:f]"
				on-click="reverse:on-init" >
				translate property reverse example <hr>[click me]
			</li>
		</ul>
	</main-view>
</div> -->
<div class="full-xy flex-center">
    <main-view>

        <ul class="flex-wrap-center p15-grid">

            <li u on-init='a:[opacity:0:1:2500:easeTo:0:1:f]' on-click="reverse:on-init" class='bg-slate text-center' >
                opacity property reverse example <br>[click me]
            </li>
            <li u on-init='a:[bounceInUp:2500:easeTo:0:1:f]' on-click="reverse:on-init" class='bg-slate text-center' >
                opacity property reverse example <br>[click me]
            </li>
        </ul>

    </main-view>
</div>
