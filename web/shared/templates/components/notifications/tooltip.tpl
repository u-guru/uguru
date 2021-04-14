<div class="perspective-container full-xy flex-center" types='top, bottom, left, right, line-top, line-bottom, line-left, line-right' default-type="line-right" reference="http://codepen.io/teamuguru/pen/0962d66493f8814b2a2f2ed830548022?editors=1100">
	<div class="tooltip tooltip-top" ng-if='activeType === "top"'
		u init-with="p:[transform-origin:center top, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-bot" ng-if='activeType === "bottom"'
		u init-with="p:[transform-origin:center bottom, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-left" ng-if='activeType === "left"'
		u init-with="p:[transform-origin:left center, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip tooltip-right" ng-if='activeType === "right"'
		u init-with="p:[transform-origin:right center, opacity:0]"
		on-init="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
		<div>This is a tip.</div>
	</div>

	<div class="tooltip-line tooltip-top" ng-if='activeType === "line-top"'>
		<span u init-with="p:[transform:scale(0)]"
			on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
			when-top-complete="a:[scale:1:0:450:easeInOutQuad:750:1:f]"></span>
		<div u init-with="p:[background:rgba(255,255,255,0)]"
		 	on-init="a:[background:rgba(255,255,255,0):rgba(255,255,255,0.9):500:(.71,.06,.47,.63):450:1:f]"
			when-top-complete="a:[background:rgba(255,255,255,0.9):rgba(255,255,255,0):500:(.71,.06,.47,.63):450:1:f]">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="s:[line-top-form:siblings:250] | a:[scaleX:0:1:450:(.71,.06,.47,.63):0:1:f]"
				when-top-complete="a:[scaleX:1:0:450:easeInOutQuad:750:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-line-top-form="a:[scaleX:0:1:250:(.71,.06,.47,.63):0:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInOutQuad:750:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-line-top-form="a:[scaleY:0:1:100:(.71,.06,.47,.63):200:1:f]"
				when-top-complete="a:[scaleY:1:0:100:easeInOutQuad:570:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-line-top-form="a:[scaleY:0:1:125:easeInQuad:320:1:f]"
				when-top-complete="a:[scaleY:1:0:125:easeInQuad:450:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-line-top-form="a:[scaleX:0:1:250:(.71,.06,.47,.63):500:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInOutQuad:0:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-line-top-form="a:[scaleX:0:1:250:easeInQuad:500:1:f]"
				when-top-complete="a:[scaleX:1:0:250:easeInQuad:0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-line-top-form="a:[scaleY:0:1:125:easeInQuad:500:1:f]"
				when-top-complete="a:[scaleY:1:0:125:easeInQuad:450:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-line-top-form="a:[scaleY:0:1:100:easeOutQuad:200:1:f]"
				when-top-complete="a:[scaleY:1:0:100:easeOutQuad:570:1:f]"></div>
			<span u init-with="p:[opacity:0, transform:translateY(-10%)]"
				on-init="a:[opacity:0:1:500:(.71,.06,.47,.63):0:1:f, translateY:-10%:0%:500:(.71,.06,.47,.63):450:1:f]"
				when-top-complete="a:[opacity:1:0:500:easeInOutQuad:100:1:f, translateY:0%:-10%:500:easeInOutQuad:450:1:f]">This is a tip with a button.</span>
			<button class="bg-moxie"
				u init-with="p:[opacity:0]"
				on-init="a:[opacity:0:1:500:easeOutSine:100:1:f, translateY:-10px:0px:600:easeOutExpo:650:1:f]"
				on-click="s:[top-complete:public]"
				when-top-complete="a:[opacity:1:0:500:easeOutSine:100:1:f, translateY:0px:-10px:600:easeOutExpo:250:1:f]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-bot" ng-if='activeType === "line-bottom"'>
		<span u init-with="p:[transform:scale(0)]"
				on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
				when-bot-complete="a:[scale:1:0:150:easeOutSine:0:1:f]"></span>
		<div u init-with="p:[background:rgba(255,255,255,0)]"
		 		on-init="a:[background:rgba(255,255,255,0):rgba(255,255,255,0.9):500:easeOutSine:450:1:f]"
				when-bot-complete="a:[background:rgba(255,255,255,0.9):rgba(255,255,255,0):500:easeOutSine:450:1:f">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="s:[bot-form:siblings:250] | a:[scaleX:0:1:250:(.71,.06,.47,.63):750:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:(.71,.06,.47,.63):0:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-bot-form="a:[scaleX:0:1:250:(.71,.06,.47,.63):500:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:(.71,.06,.47,.63):0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-bot-form="a:[scaleY:0:1:125:easeInSine:320:1:f]"
				when-bot-complete="a:[scaleY:1:0:125:easeOutSine:450:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-bot-form="a:[scaleY:0:1:100:easeOutSine:200:1:f]"
				when-bot-complete="a:[scaleY:1:0:100:easeInSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-bot-form="a:[scaleX:0:1:250:(.71,.06,.47,.63):0:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:(.71,.06,.47,.63):570:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-bot-form="a:[scaleX:0:1:250:(.71,.06,.47,.63):0:1:f]"
				when-bot-complete="a:[scaleX:1:0:250:(.71,.06,.47,.63):570:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-bot-form="a:[scaleY:0:1:100:easeOutSine:200:1:f]"
				when-bot-complete="a:[scaleY:1:0:100:easeInSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-bot-form="a:[scaleY:0:1:125:easeInSine:320:1:f]"
				when-bot-complete="a:[scaleY:1:0:125:easeOutSine:450:1:f]"></div>
			<span u init-with="p:[opacity:0, transform:translateY(10px)]"
				when-bot-form="a:[opacity:0:1:1000:easeOutExpo:400:1:f, translateY:10px:0px:1000:easeOutExpo:400:1:f]"
				when-bot-complete="a:[opacity:1:0:500:(.71,.06,.47,.63):650:1:f, translateY:0px:10px:500:(.71,.06,.47,.63):650:1:f]"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				u init-with="p:[opacity:0, transform:translateY(10px)]"
				when-bot-form="a:[opacity:0:1:500:easeOutSine:300:1:f, translateY:10px:0px:600:easeOutExpo:200:1:f]"
				on-click="s:[bot-complete:public]"
				when-bot-complete="a:[opacity:1:0:500:easeOutSine:550:1:f, translateY:0px:10px:600:(.71,.06,.47,.63):450:1:f]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-left" ng-if='activeType === "line-left"'>
		<span u init-with="p:[transform:scale(0)]"
				on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
				when-left-complete="a:[scale:1:0:450:(.71,.06,.47,.63):750:1:f]"></span>
		<div u init-with="p:[background:rgba(255,255,255,0)]"
		 		on-init="a:[background:rgba(255,255,255,0):rgba(255,255,255,0.9):500:(.71,.06,.47,.63):450:1:f]"
				when-left-complete="a:[background:rgba(255,255,255,0.9):rgba(255,255,255,0):500:(.71,.06,.47,.63):450:1:f]">
			<div u init-with="p:[transform:scaleX(0)]"
				on-init="s:[left-form:siblings:250] | a:[scaleX:0:1:125:easeInSine:0:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-left-form="a:[scaleX:0:1:125:easeOutSine:125:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-left-form="a:[scaleY:0:1:250:(.71,.06,.47,.63):320:1:f]"
				when-left-complete="a:[scaleY:1:0:250:(.71,.06,.47,.63):0:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				when-left-form="a:[scaleY:0:1:250:(.71,.06,.47,.63):320:1:f]"
				when-left-complete="a:[scaleY:1:0:250:(.71,.06,.47,.63):0:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-left-form="a:[scaleX:0:1:125:easeOutSine:125:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
			<div u init-with="p:[transform:scaleX(0)]"
				when-left-form="a:[scaleX:0:1:125:easeInSine:0:1:f]"
				when-left-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]"
				when-left-complete="a:[scaleY:1:0:250:(.71,.06,.47,.63):0:1:f]:delay-500"></div>
			<div u init-with="p:[transform:scaleY(0)]"
				on-init="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]"
				when-left-complete="a:[scaleY:1:0:250:(.71,.06,.47,.63):0:1:f]:delay-500"></div>
			<span u init-with="p:[op:0, tr:translateX(-10px)]"
				when-left-form="a:[opacity:0:1:500:linear:0:1:f,translateX:-10px:0px:500:(.71,.06,.47,.63):200:1:f]"
				when-left-complete="a:[opacity:1:0:500:linear:0:1:f, translateX:0px:-10px:500:(.71,.06,.47,.63):0:1:f]:delay-450"
				>This is a tip with a button.</span>
			<button class="bg-moxie"
				u init-with="p:[op:0, tr:translateX(-10px)]"
				when-left-form="a:[opacity:0:1:500:easeOutSine:100:1:f, translateX:-10px:0px:600:easeOutExpo:0:1:f]:delay-650"
				when-left-complete="a:[opacity:1:0:600:easeOutSine:100:1:f, translateX:0px:-10px:600:easeOutExpo:0:1:f]:delay-650"
				on-click="s:[left-complete:public]">Okay</button>
		</div>
	</div>

	<div class="tooltip-line tooltip-right" ng-if='activeType === "line-right"'>
		<span u init-with="p:[transform:scale(0)]"
			on-init="a:[scale:0:1:150:easeOutSine:0:1:f]"
			when-right-complete="a:[scale:1:0:450:(.71,.06,.47,.63):750:1:f]"></span>
		<div u init-with="p:[background:rgba(255,255,255,0)]"
		 	on-init="a:[background:rgba(255,255,255,0):rgba(255,255,255,0.9):500:(.71,.06,.47,.63):0:1:f]:delay-450"
			when-right-complete="a:[background:rgba(255,255,255,0.9):rgba(255,255,255,0):500:(.71,.06,.47,.63):0:1:f]:delay-450">
				<div u init-with="p:[transform:scaleX(0)]"
					on-init="s:[form-right:siblings:250] | a:[scaleX:0:1:125:easeOutSine:0:1:f]:delay-570"
					when-right-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
				<div u init-with="p:[transform:scaleX(0)]"
					when-form-right="a:[scaleX:0:1:125:easeInSine:200:1:f]"
					when-right-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
				<div u init-with="p:[transform:scaleY(0)]"
					when-form-right="a:[scaleY:0:1:250:easeInOutSine:0:1:f]"
					when-right-complete="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]:delay-500"></div>
				<div u init-with="p:[transform:scaleY(0)]"
					when-form-right="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]"
					when-right-complete="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]:delay-500"></div>
				<div u init-with="p:[transform:scaleX(0)]"
					when-form-right="a:[scaleX:0:1:125:easeInSine:200:1:f]"
					when-right-complete="a:[scaleX:1:0:125:easeOutSine:375:1:f]"></div>
				<div u init-with="p:[transform:scaleX(0)]"
					when-form-right="a:[scaleX:0:1:125:easeOutSine:320:1:f]"
					when-right-complete="a:[scaleX:1:0:125:easeInSine:250:1:f]"></div>
				<div u init-with="p:[transform:scaleY(0)]"
					when-form-right="a:[scaleY:0:1:250:(.71,.06,.47,.63):500:1:f]"
					when-right-complete="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]"></div>
				<div u init-with="p:[transform:scaleY(0)]"
					when-form-right="a:[scaleY:0:1:250:(.71,.06,.47,.63):500:1:f]"
					when-right-complete="a:[scaleY:0:1:250:(.71,.06,.47,.63):0:1:f]"></div>
			<span u init-with="p:[op:0, tr:translateX(10px)]"
				when-form-right="a:[opacity:0:1:500:linear:0:1:f, translateX:10px:0px:1000:easeOutExpo:0:1:f]:delay-200"
				when-right-complete="a:[opacity:1:0:500:linear:0:1:f, translateX:0px:10px:1000:easeOutExpo:0:1:f]:delay-450">This is a tip with a button.</span>
			<button class="bg-moxie"
			 	u init-with="p:[op:0, tr:translateX(10px)]"
				when-form-right="a:[opacity:0:1:500:easeOutSine:100:1:f, translateX:10px:0px:600:(.71,.06,.47,.63):150:1:f]:delay-300"
				on-click="s:[right-complete:public]"
				when-right-complete="a:[opacity:1:0:500:easeOutSine:100:1:f, translateX:0px:10px:600:easeOutExpo:0:1:f]:delay-650">Okay</button>
		</div>
	</div>
</div>
