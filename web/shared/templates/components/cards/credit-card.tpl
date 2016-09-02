<div class="perspective-container full-xy flex-center" types='flip, edit, short, mini' default-type="flip">
    <div ng-if='activeType === "flip"' class="credit-card-flip" tabindex
		init-with="p-op"
		on-init="s:[credit-card-init:public] | a:[scoop-enter:set:(dur:1000ms#func:ease-out):in]"
		on-mouse-enter="s:[flip-enter:public]"
		on-mouse-leave="s:[flip-leave:public]">
        <div class="credit-card"
			init-default
			when-flip-enter="p:[transform:rotateY(0deg):rotateX(180deg):300:easeInOutSine]"
			when-flip-leave="p:[transform:rotateY(180deg):rotateX(0deg):300:easeInOutSine]">
            <svg width="240px" height="150px" viewBox="0 0 240 150">
                <rect fill="none" x="0" y="0" width="240" height="150"></rect>
            </svg>
            <div class="credit-card-inside">
                <div class="credit-card-row">
                    <div class="credit-card-logo">
                        <svg viewBox="0 0 173 56">
                            <path d="M125.303171,2.26822594 C122.544107,1.1835953 118.204787,-9.06250023e-07 112.799192,-9.06250023e-07 C99.0030731,-9.06250023e-07 89.2916783,7.33462425 89.2110692,17.8361474 C89.1232772,25.6033478 96.1410529,29.9362836 101.43172,32.5181675 C106.869239,35.1646982 108.696111,36.8582862 108.674563,39.2246805 C108.637051,42.8441066 104.334444,44.5025778 100.322348,44.5025778 C94.7355823,44.5025778 91.7674135,43.686112 87.1782846,41.6684915 L85.3833366,40.8081295 L83.4319592,52.9050733 C86.6858511,54.4103076 92.7179618,55.7168127 98.9783317,55.7854501 C113.640399,55.7854501 123.167431,48.5402132 123.279166,37.3259783 C123.329447,31.1661702 119.611055,26.4964322 111.558132,22.641564 C106.681683,20.1362986 103.688773,18.4762311 103.723092,15.9398395 C103.726284,13.6931616 106.251502,11.2892562 111.716955,11.2892562 C116.281343,11.2158301 119.585516,12.2669402 122.160217,13.3651387 L123.413248,13.9836735 L125.303171,2.26822594 M60.7321324,54.9841483 L69.4618527,0.941768156 L83.415997,0.941768156 L74.6870748,54.9841483 L60.7321324,54.9841483 M143.883956,35.8239365 C145.040416,32.7176948 149.442788,20.7189185 149.442788,20.7189185 C149.36138,20.8609819 150.592863,17.5879354 151.297594,15.5623338 L152.239363,20.2232925 C152.239363,20.2232925 154.91702,33.1223363 155.468513,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 Z M161.099175,0.996837703 L150.315121,0.996837703 C146.970245,0.996837703 144.466576,1.95297273 143.001247,5.47662562 L122.278337,55.0033029 L136.934817,55.0033029 C136.934817,55.0033029 139.325953,48.3406858 139.868667,46.8785495 C141.467281,46.8785495 155.708744,46.9064833 157.741529,46.9064833 C158.159738,48.7924157 159.440704,55.0033029 159.440704,55.0033029 L172.392423,55.0033029 L161.099175,0.996837703 L161.099175,0.996837703 L161.099175,0.996837703 Z M49.0254641,0.987260391 L35.3674183,37.8311816 L33.9044838,30.3417232 C31.359313,21.7125646 23.4364813,12.3595209 14.5742748,7.67302263 L27.0694752,54.9370598 L41.837691,54.9282806 L63.8128346,0.987260391 L49.0254641,0.987260391" fill="#FFFFFF"></path>
                            <path d="M22.6886528,0.950547359 L0.185958969,0.950547359 L-5.15624997e-07,2.07029481 C17.5105192,6.5468903 29.0958749,17.3524931 33.9044838,30.3417232 L29.0144677,5.51014622 C28.1708661,2.08545889 25.7190741,1.07026377 22.6886528,0.950547359" fill="#FCA700"></path>
                        </svg>
                    </div>
                    <div class="credit-card-type">Debit</div>
                </div>
                <div class="credit-card-row">
                    <div class="credit-card-number-container">
                        <h4>Card Number</h4>
                        <div class="credit-card-number">
							<span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>

								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>

								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
								<span
									init-with="p:[op:0, tro:center bottom]"
									when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">&bull;</span>
                            </span>
                            <span>1234</span>
                        </div>
                    </div>
                    <div class="credit-card-row">
                        <div>
                            <h4>Valid Thru</h4>
                            <div class="credit-card-number"
								init-with="p:[op:0, tro:center bottom]"
								when-credi-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-out):in:delay-250]">10/20</div>
                        </div>
                        <div class="credit-card-default">
                            <svg viewBox="0 0 100 100">
                                <polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="credit-card-back"
			init-with="p:[tr:rotateY(180deg)]"
			when-flip-enter="p:[transform:rotateY(180deg):rotateX(0deg):300:easeInOutSine]"
			when-flip-leave="p:[transform:rotateY(0deg):rotateX(180deg):300:easeInOutSine]">
            <svg width="240px" height="150px" viewBox="0 0 240 150">
                <rect fill="none" x="0" y="0" width="240" height="150"></rect>
            </svg>
            <div></div>
            <ul>
                <li>
                    <button class="remove"
						init-with="p-op"
						when-flip-enter="p:[opacity:0:1:250:easeOutSine]:delay-300"
						when-flip-leave="p:[opacity:1:0:250:easeOutSine]">Remove</button>
                </li>
                <li>
                    <button class="default"
						init-with="p-op"
						when-flip-enter="p:[opacity:0:1:250:easeOutSine]:delay-300"
						when-flip-leave="p:[opacity:1:0:250:easeOutSine]">Set Default</button>
                </li>
            </ul>
        </div>
    </div>

    <div ng-if='activeType === "edit"' class="credit-card edit"
		init-with="p-op"
		on-init="s:[credit-card-init:public] | a:[scoop-enter:set:(dur:1000ms#func:ease-out):in]">
            <svg width="240px" height="75px" viewBox="0 0 240 75">
                <rect fill="none" x="0" y="0" width="240" height="75"></rect>
            </svg>
            <div class="credit-card-inside">
                <a class="edit"
					init-default
					on-mouse-enter="send:[logo-wiggle:public]">Edit</a>
                <div class="flex">
                    <div class="credit-card-logo"
						init-default
						when-logo-wiggle="a:[wiggle-subtle:set:(dur:1000ms#func:linear):in]">
                        <svg viewBox="0 0 173 56">
                            <path d="M125.303171,2.26822594 C122.544107,1.1835953 118.204787,-9.06250023e-07 112.799192,-9.06250023e-07 C99.0030731,-9.06250023e-07 89.2916783,7.33462425 89.2110692,17.8361474 C89.1232772,25.6033478 96.1410529,29.9362836 101.43172,32.5181675 C106.869239,35.1646982 108.696111,36.8582862 108.674563,39.2246805 C108.637051,42.8441066 104.334444,44.5025778 100.322348,44.5025778 C94.7355823,44.5025778 91.7674135,43.686112 87.1782846,41.6684915 L85.3833366,40.8081295 L83.4319592,52.9050733 C86.6858511,54.4103076 92.7179618,55.7168127 98.9783317,55.7854501 C113.640399,55.7854501 123.167431,48.5402132 123.279166,37.3259783 C123.329447,31.1661702 119.611055,26.4964322 111.558132,22.641564 C106.681683,20.1362986 103.688773,18.4762311 103.723092,15.9398395 C103.726284,13.6931616 106.251502,11.2892562 111.716955,11.2892562 C116.281343,11.2158301 119.585516,12.2669402 122.160217,13.3651387 L123.413248,13.9836735 L125.303171,2.26822594 M60.7321324,54.9841483 L69.4618527,0.941768156 L83.415997,0.941768156 L74.6870748,54.9841483 L60.7321324,54.9841483 M143.883956,35.8239365 C145.040416,32.7176948 149.442788,20.7189185 149.442788,20.7189185 C149.36138,20.8609819 150.592863,17.5879354 151.297594,15.5623338 L152.239363,20.2232925 C152.239363,20.2232925 154.91702,33.1223363 155.468513,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 Z M161.099175,0.996837703 L150.315121,0.996837703 C146.970245,0.996837703 144.466576,1.95297273 143.001247,5.47662562 L122.278337,55.0033029 L136.934817,55.0033029 C136.934817,55.0033029 139.325953,48.3406858 139.868667,46.8785495 C141.467281,46.8785495 155.708744,46.9064833 157.741529,46.9064833 C158.159738,48.7924157 159.440704,55.0033029 159.440704,55.0033029 L172.392423,55.0033029 L161.099175,0.996837703 L161.099175,0.996837703 L161.099175,0.996837703 Z M49.0254641,0.987260391 L35.3674183,37.8311816 L33.9044838,30.3417232 C31.359313,21.7125646 23.4364813,12.3595209 14.5742748,7.67302263 L27.0694752,54.9370598 L41.837691,54.9282806 L63.8128346,0.987260391 L49.0254641,0.987260391" fill="#FFFFFF"></path>
                            <path d="M22.6886528,0.950547359 L0.185958969,0.950547359 L-5.15624997e-07,2.07029481 C17.5105192,6.5468903 29.0958749,17.3524931 33.9044838,30.3417232 L29.0144677,5.51014622 C28.1708661,2.08545889 25.7190741,1.07026377 22.6886528,0.950547359" fill="#FCA700"></path>
                        </svg>
                    </div>
                    <div class="credit-card-number"
						init-with="p:[op:0, tro:center bottom]"
						when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">
                        <span>&bull;&bull;&bull;&bull;</span><span>1234</span>
                    </div>
                </div>
            </div>
        </div>

	<a ng-if='activeType === "short"' class="credit-card short"
		init-with="p-op"
		on-init="s:[credit-card-init:public] | a:[scoop-enter:set:(dur:1000ms#func:ease-out):in]"
		on-mouse-enter="send:[logo-wiggle:public]">
            <svg width="240px" height="50px" viewBox="0 0 240 50">
                <rect fill="none" x="0" y="0" width="240" height="50"></rect>
            </svg>
            <div class="credit-card-inside">
                <div class="credit-card-row">
                    <div class="credit-card-logo"
						init-default
						when-logo-wiggle="a:[wiggle-subtle:set:(dur:1000ms#func:linear):in]">
                        <svg viewBox="0 0 173 56">
                            <path d="M125.303171,2.26822594 C122.544107,1.1835953 118.204787,-9.06250023e-07 112.799192,-9.06250023e-07 C99.0030731,-9.06250023e-07 89.2916783,7.33462425 89.2110692,17.8361474 C89.1232772,25.6033478 96.1410529,29.9362836 101.43172,32.5181675 C106.869239,35.1646982 108.696111,36.8582862 108.674563,39.2246805 C108.637051,42.8441066 104.334444,44.5025778 100.322348,44.5025778 C94.7355823,44.5025778 91.7674135,43.686112 87.1782846,41.6684915 L85.3833366,40.8081295 L83.4319592,52.9050733 C86.6858511,54.4103076 92.7179618,55.7168127 98.9783317,55.7854501 C113.640399,55.7854501 123.167431,48.5402132 123.279166,37.3259783 C123.329447,31.1661702 119.611055,26.4964322 111.558132,22.641564 C106.681683,20.1362986 103.688773,18.4762311 103.723092,15.9398395 C103.726284,13.6931616 106.251502,11.2892562 111.716955,11.2892562 C116.281343,11.2158301 119.585516,12.2669402 122.160217,13.3651387 L123.413248,13.9836735 L125.303171,2.26822594 M60.7321324,54.9841483 L69.4618527,0.941768156 L83.415997,0.941768156 L74.6870748,54.9841483 L60.7321324,54.9841483 M143.883956,35.8239365 C145.040416,32.7176948 149.442788,20.7189185 149.442788,20.7189185 C149.36138,20.8609819 150.592863,17.5879354 151.297594,15.5623338 L152.239363,20.2232925 C152.239363,20.2232925 154.91702,33.1223363 155.468513,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 Z M161.099175,0.996837703 L150.315121,0.996837703 C146.970245,0.996837703 144.466576,1.95297273 143.001247,5.47662562 L122.278337,55.0033029 L136.934817,55.0033029 C136.934817,55.0033029 139.325953,48.3406858 139.868667,46.8785495 C141.467281,46.8785495 155.708744,46.9064833 157.741529,46.9064833 C158.159738,48.7924157 159.440704,55.0033029 159.440704,55.0033029 L172.392423,55.0033029 L161.099175,0.996837703 L161.099175,0.996837703 L161.099175,0.996837703 Z M49.0254641,0.987260391 L35.3674183,37.8311816 L33.9044838,30.3417232 C31.359313,21.7125646 23.4364813,12.3595209 14.5742748,7.67302263 L27.0694752,54.9370598 L41.837691,54.9282806 L63.8128346,0.987260391 L49.0254641,0.987260391" fill="#FFFFFF"></path>
                            <path d="M22.6886528,0.950547359 L0.185958969,0.950547359 L-5.15624997e-07,2.07029481 C17.5105192,6.5468903 29.0958749,17.3524931 33.9044838,30.3417232 L29.0144677,5.51014622 C28.1708661,2.08545889 25.7190741,1.07026377 22.6886528,0.950547359" fill="#FCA700"></path>
                        </svg>
                    </div>
                    <div class="credit-card-number"
						init-with="p:[op:0, tro:center bottom]"
						when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">
                        <span>&bull;&bull;&bull;&bull;</span><span>1234</span>
                    </div>
                </div>
            </div>
    </a>

    <a ng-if='activeType === "mini"' class="credit-card x-short"
		init-with="p-op"
		on-init="s:[credit-card-init:public] | a:[scoop-enter:set:(dur:1000ms#func:ease-out):in]"
		on-mouse-enter="send:[logo-wiggle:public]">
            <svg width="240px" height="36px" viewBox="0 0 240 36">
                <rect fill="none" x="0" y="0" width="240" height="36"></rect>
            </svg>
            <div class="credit-card-inside">
                <div class="credit-card-row">
                    <div class="credit-card-logo"
						init-default
						when-logo-wiggle="a:[wiggle-subtle:set:(dur:1000ms#func:linear):in]">
                        <svg viewBox="0 0 173 56">
                            <path d="M125.303171,2.26822594 C122.544107,1.1835953 118.204787,-9.06250023e-07 112.799192,-9.06250023e-07 C99.0030731,-9.06250023e-07 89.2916783,7.33462425 89.2110692,17.8361474 C89.1232772,25.6033478 96.1410529,29.9362836 101.43172,32.5181675 C106.869239,35.1646982 108.696111,36.8582862 108.674563,39.2246805 C108.637051,42.8441066 104.334444,44.5025778 100.322348,44.5025778 C94.7355823,44.5025778 91.7674135,43.686112 87.1782846,41.6684915 L85.3833366,40.8081295 L83.4319592,52.9050733 C86.6858511,54.4103076 92.7179618,55.7168127 98.9783317,55.7854501 C113.640399,55.7854501 123.167431,48.5402132 123.279166,37.3259783 C123.329447,31.1661702 119.611055,26.4964322 111.558132,22.641564 C106.681683,20.1362986 103.688773,18.4762311 103.723092,15.9398395 C103.726284,13.6931616 106.251502,11.2892562 111.716955,11.2892562 C116.281343,11.2158301 119.585516,12.2669402 122.160217,13.3651387 L123.413248,13.9836735 L125.303171,2.26822594 M60.7321324,54.9841483 L69.4618527,0.941768156 L83.415997,0.941768156 L74.6870748,54.9841483 L60.7321324,54.9841483 M143.883956,35.8239365 C145.040416,32.7176948 149.442788,20.7189185 149.442788,20.7189185 C149.36138,20.8609819 150.592863,17.5879354 151.297594,15.5623338 L152.239363,20.2232925 C152.239363,20.2232925 154.91702,33.1223363 155.468513,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 L143.883956,35.8239365 Z M161.099175,0.996837703 L150.315121,0.996837703 C146.970245,0.996837703 144.466576,1.95297273 143.001247,5.47662562 L122.278337,55.0033029 L136.934817,55.0033029 C136.934817,55.0033029 139.325953,48.3406858 139.868667,46.8785495 C141.467281,46.8785495 155.708744,46.9064833 157.741529,46.9064833 C158.159738,48.7924157 159.440704,55.0033029 159.440704,55.0033029 L172.392423,55.0033029 L161.099175,0.996837703 L161.099175,0.996837703 L161.099175,0.996837703 Z M49.0254641,0.987260391 L35.3674183,37.8311816 L33.9044838,30.3417232 C31.359313,21.7125646 23.4364813,12.3595209 14.5742748,7.67302263 L27.0694752,54.9370598 L41.837691,54.9282806 L63.8128346,0.987260391 L49.0254641,0.987260391" fill="#FFFFFF"></path>
                            <path d="M22.6886528,0.950547359 L0.185958969,0.950547359 L-5.15624997e-07,2.07029481 C17.5105192,6.5468903 29.0958749,17.3524931 33.9044838,30.3417232 L29.0144677,5.51014622 C28.1708661,2.08545889 25.7190741,1.07026377 22.6886528,0.950547359" fill="#FCA700"></path>
                        </svg>
                    </div>
                    <div class="credit-card-number"
						init-with="p:[op:0, tro:center bottom]"
						when-credit-card-init="a:[bounceIn-subtle:set:(dur:1000ms#func:ease-in):in:delay-150]">
                        <span>&bull;&bull;&bull;&bull;</span><span>1234</span>
                    </div>
                </div>
            </div>
    </a>
</div>
