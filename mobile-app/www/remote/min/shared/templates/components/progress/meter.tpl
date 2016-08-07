<div class="perspective-container full-xy flex-center bg-slate">
	<div class="impact-meter"
		init-with="p-op"
		on-init="t-enter"
		on-enter="p:[op:1, t:all 250ms ease-out]">
		<svg width="99px" height="51px" viewBox="0 0 99 51">
			<g fill="none" fill-rule="evenodd">
				<path d="M86.5,49.5 C86.5,29.0654643 70.1583934,12.5 50,12.5 C29.8416066,12.5 13.5,29.0654643 13.5,49.5"
					class="track" stroke-width="24" stroke="white" stroke-opacity="0.2"></path>
				<path d="M86.5,49.5 C86.5,29.0654643 70.1583934,12.5 50,12.5 C29.8416066,12.5 13.5,29.0654643 13.5,49.5"
					class="track" stroke-width="24"
					init-with="p:[stroke:#F6C64E, tro:center center, tr:rotateY(180deg), sda:115.47, sdo:38.49]"
					on-init="t-enter"
					on-enter="p:[stroke:#43cb9d, sdo:0, t:all 450ms ease-out]:delay-250"></path>
					<!-- $gold: #F6C64E;
					$moxie: #43cb9d;
					white to gold
					init-with="p:[stroke:#ffffff, tro:center center, tr:rotateY(180deg), sda:115.47, sdo:115.47]"
					on-init="t-enter"
					on-enter="p:[stroke:#F6C64E, sdo:38.49, t:all 450ms ease-out]"
					zero to white
					init-with="p:[op:0, stroke:#ffffff, tro:center center, tr:rotateY(180deg), sda:115.47, sdo:115.47]"
					on-init="t-enter"
					on-enter="p:[op:1, stroke:#ffffff, sdo:77.05, t:all 450ms ease-out]"
				-->
				<g class="border" stroke="#40484B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
					<path d="M73.7508724,8.45915396 C79.1420838,11.7041808 83.8392025,15.9936373 87.5652702,21.0492381 C93.4076328,28.9762686 96.8626374,38.7868878 96.8626374,49.4083333 L74.436979,49.4083333 C74.3003101,43.8085361 72.4359482,38.6513279 69.3729783,34.4823188 C67.4125667,31.8140021 64.9611497,29.5504976 62.1574473,27.834858 C62.1574473,27.8348579 74.4369795,8.45915394 73.7508724,8.45915396 L73.7508724,8.45915396 Z" class="border-1"></path>
					<path d="M25.0293474,8.45915396 C32.1511843,4.17244545 40.4842573,1.70833333 49.3901099,1.70833333 C58.2959625,1.70833333 66.6290355,4.17244545 73.7508724,8.45915396 C73.7508705,8.45915372 62.1574471,27.8348583 62.1574473,27.834858 C58.4185119,25.5469312 54.0530683,24.2333333 49.3901099,24.2333333 C44.7271515,24.2333333 40.3617079,25.5469312 36.6227725,27.834858 C36.622772,27.8348583 25.0293474,8.45915372 25.0293474,8.45915396 L25.0293474,8.45915396 Z" class="border-2"></path>
					<path d="M11.2149495,21.0492381 C14.9410173,15.9936373 19.638136,11.7041808 25.0293474,8.45915396 C24.3432411,8.45915394 36.6227717,27.8348579 36.6227725,27.834858 C33.8190701,29.5504976 31.3676531,31.8140021 29.4072415,34.4823188 C26.3442716,38.6513279 24.4799097,43.8085361 24.3432408,49.4083333 L1.91758242,49.4083333 C1.91758242,38.7868878 5.37258702,28.9762686 11.2149495,21.0492381 Z" class="border-3"></path>
				</g>
			</g>
		</svg>
	</div>
</div>