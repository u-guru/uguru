
<!-- <inspector-gadget show-log="false" ball-color="smoke" reverse-speed="10" speed="1x" class="bottom-0 bg-azure" auto-play="false" step-size="100"  play-infinite="false"> </inspector-gadget> -->

<div class="fixed top-0 left-0 full-x flex-center">
	<div class="ugrid-2 full-x">
		<div class="txt-right" style="margin-right: -7.5px">
			<ul class="flex-right p15-grid">
				<li>
					<button class="bg-moxie height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[pyramid-init:public]">s &rarr; pyramid</button>
				</li>
				<li>
					<button class="bg-moxie height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[grid-init:public]">p &rarr; grid</button>
				</li>
				<li>
					<button class="bg-moxie height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[column-init:public]">g &rarr; column</button>
				</li>
				<li>
					<button class="bg-moxie height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[stack-init:public]">c &rarr; stack</button>
				</li>
			</ul>
			<h1 class="m15right semibold txt-20">regular</h1>
		</div>
		<div style="margin-left: -7.5px">
			<ul class="flex-left p15-grid">
				<li>
					<button class="bg-robin height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[grid-pyramid-init:public]">g &rarr; pyramid</button>
				</li>
				<li>
					<button class="bg-robin height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[column-grid-init:public]">c &rarr; grid</button>
				</li>
				<li>
					<button class="bg-taupe height-36 txt-18 radius-2 p10x disabled"
						init-default
						on-click="s:[column-pyramid-init:public]">c &rarr; pyramid</button>
				</li>
				<li>
					<button class="bg-robin height-36 txt-18 radius-2 p10x"
						init-default
						on-click="s:[pyramid-column-init:public]">p &rarr; column</button>
				</li>
			</ul>
			<h1 class="m15left semibold txt-20">reverse</h1>
		</div>
	</div>
</div>

<!-- <div id="pyramid" class="flex-center opacity-25p">
	<ul class="ugrid-5 p15-grid">
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="playing-card-container">
				<div class="playing-card">
					<div class="playing-card-back bg-azure"></div>
					<div class="playing-card-front"></div>
				</div>
			</div>
		</li>
	</ul>
</div> -->

<div id="pyramid"
	init-with="p:[tro:center bottom, play:paused, -webkit-perspective:2000, perspective:2000]"
	on-init="s:[pyramid-init:public]"
	when-pyramid-init="p:[play:running]">
	<!--  -webkit-perspective-origin: 50% 50%; perspective-origin: 50% 50%; -->
	<div class="playing-card-container">
		<div class="playing-card play-heart c1"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(28px), z-index:15]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(28px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:280px:400:easeOutQuad, top:0px:136px:400:elastic, background:rgba(255#255#255#0):rgba(0#0#0#0.2):1000:linear, tro:left top]:delay-2800"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:280px:15px:600:easeOutExpo, top:136px:60px:600:easeOutExpo, tro:left top]"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(0deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:15px:249px:750:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(28px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:60px:0px:500:easeOutQuart, tro:left top]"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:15px:280px:400:easeOutQuad, top:60px:136px:400:easeOutQuad, tro:left top]:delay-1400"
			when-column-grid-init="p:[transform:rotateY(0deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:15px:600:easeInOutSine, top:60px:60px:600:easeInOutSine, tro:left top]"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:280px:249px:750:easeInOutSine, top:136px:60px:750:easeInOutSine, tro:50% 50% -200px]">
			<!-- inspector-elem="when-pyramid-init"inspector-elem="when-grid-init" -->
			<div class="playing-card-back bg-auburn"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">A</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-heart c2"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(26px), z-index:14]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(26px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:282px:400:easeOutQuad, top:0px:136px:400:easeOutQuad, tro:left top]:delay-2600"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:282px:132px:600:easeOutExpo, top:136px:60px:600:easeOutExpo, tro:left top]:delay-100"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(72deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:132px:249px:750:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-100"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(26px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:60px:0px:500:easeOutQuart, tro:left top]:delay-150"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:132px:282px:400:easeOutQuad, top:60px:136px:400:easeOutQuad, tro:left top]:delay-1300"
			when-column-grid-init="p:[transform:rotateY(72deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:132px:600:easeInOutSine, top:60px:60px:600:easeInOutSine, tro:left top]:delay-100"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(72deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:282px:249px:750:easeInOutSine, top:136px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-100">
			<div class="playing-card-back bg-orange"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">J</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-heart c3"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(24px), z-index:13]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(24px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:204px:400:easeOutQuad, top:0px:268px:400:easeOutQuad, tro:left top]:delay-2400"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:204px:249px:600:easeOutExpo, top:268px:60px:600:easeOutExpo, tro:left top]:delay-200"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(144deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:249px:249px:600:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-200"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(24px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:60px:0px:500:easeOutQuart, tro:left top]:delay-300"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:249px:204px:400:easeOutQuad, top:60px:268px:400:easeOutQuad, tro:left top]:delay-1200"
			when-column-grid-init="p:[transform:rotateY(144deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:249px:600:easeInOutSine, top:60px:60px:600:easeInOutSine, tro:left top]:delay-200"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(144deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:204px:249px:750:easeInOutSine, top:268px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-200">
			<div class="playing-card-back bg-gold"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">Q</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-heart c4"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(22px), z-index:12]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(22px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:204px:400:easeOutQuad, top:0px:268px:400:easeOutQuad, tro:left top]:delay-2200"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:204px:366px:600:easeOutExpo, top:268px:60px:600:easeOutExpo, tro:left top]:delay-300"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(216deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:366px:249px:750:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-300"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(22px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:60px:0px:500:easeOutQuart, tro:left top]:delay-450"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:366px:204px:400:easeOutQuad, top:60px:268px:400:easeOutQuad, tro:left top]:delay-1100"
			when-column-grid-init="p:[transform:rotateY(216deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:366px:600:easeInOutSine, top:60px:60px:600:easeInOutSine, tro:left top]:delay-300"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(216deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:204px:249px:750:easeInOutSine, top:268px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-300">
			<div class="playing-card-back bg-moola"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">K</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-diamond c5"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(20px), z-index:11]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(20px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:208px:400:easeOutQuad, top:0px:268px:400:easeOutQuad, tro:left top]:delay-2000"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:208px:483px:600:easeOutExpo, top:268px:60px:600:easeOutExpo, tro:left top]:delay-400"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(288deg) translateZ(200px):750:easeOutExpo easeOutExpo, left:483px:249px:750:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-400"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(20px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:60px:0px:500:easeOutQuart, tro:left top]:delay-600"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:483px:208px:400:easeOutQuad, top:60px:268px:400:easeOutQuad, tro:left top]:delay-1000"
			when-column-grid-init="p:[transform:rotateY(288deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeOutExpo easeOutExpo, left:249px:483px:600:easeInOutSine, top:60px:60px:600:easeInOutSine, tro:left top]:delay-400"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(288deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:483px:249px:750:easeInOutSine, top:60px:60px:750:easeInOutSine, tro:50% 50% -200px]:delay-400">
			<div class="playing-card-back bg-azure"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">A</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-diamond c6"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(18px), z-index:10]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(18px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:352px:400:easeOutQuad, top:0px:268px:400:easeOutQuad, tro:left top]:delay-1800"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:352px:15px:600:easeOutExpo, top:268px:225px:600:easeOutExpo, tro:left top]:delay-100"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(36deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:15px:249px:750:easeInOutSine, top:225px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-400"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(18px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:225px:0px:500:easeOutQuart, tro:left top]:delay-750"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:15px:352px:400:easeOutQuad, top:225px:268px:400:easeOutQuad, tro:left top]:delay-900"
			when-column-grid-init="p:[transform:rotateY(36deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:15px:600:easeInOutSine, top:225px:225px:600:easeInOutSine, tro:left top]:delay-100"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(36deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:352px:249px:750:easeInOutSine, top:268px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-400">
			<div class="playing-card-back bg-cobalt"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">J</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-diamond c7"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(16px), z-index:9]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(16px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:356px:400:easeOutQuad, top:0px:268px:400:easeOutQuad, tro:left top]:delay-1600"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:356px:132px:600:easeOutExpo, top:268px:225px:600:easeOutExpo, tro:left top]:delay-200"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(108deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:132px:249px:750:easeInOutSine, top:225px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-300"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(16px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:225px:0px:500:easeOutQuart, tro:left top]:delay-900"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:132px:356px:400:easeOutQuad, top:225px:268px:400:easeOutQuad, tro:left top]:delay-800"
			when-column-grid-init="p:[transform:rotateY(108deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:132px:600:easeInOutSine, top:225px:225px:600:easeInOutSine, tro:left top]:delay-200"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(108deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:356px:249px:750:easeInOutSine, top:268px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-300">
			<div class="playing-card-back bg-eggplant"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">Q</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-diamond c8"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(14px), z-index:8]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(14px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:132px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-1400"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:132px:249px:600:easeOutExpo, top:400px:225px:600:easeOutExpo, tro:left top]:delay-300"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(180deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:249px:249px:750:easeInOutSine, top:225px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-200"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(14px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:225px:0px:500:easeOutQuart, tro:left top]:delay-1150"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:249px:132px:400:easeOutQuad, top:225px:400px:400:easeOutQuad, tro:left top]:delay-700"
			when-column-grid-init="p:[transform:rotateY(180deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:249px:600:easeInOutSine, top:225px:225px:600:easeInOutSine, tro:left top]:delay-200"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(180deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:132px:249px:750:easeInOutSine, top:400px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-200">
			<div class="playing-card-back bg-cerise"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">K</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-club c9"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(12px), z-index:7]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(12px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:281px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-1200"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:281px:366px:600:easeOutExpo, top:400px:225px:600:easeOutExpo, tro:left top]:delay-400"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(252deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:366px:249px:750:easeInOutSine, top:225px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-100"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(12px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:225px:0px:500:easeOutQuart, tro:left top]:delay-1300"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(90deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:366px:281px:400:easeOutQuad, top:225px:400px:400:easeOutQuad, tro:left top]:delay-600"
			when-column-grid-init="p:[transform:rotateY(252deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:366px:600:easeInOutSine, top:225px:225px:600:easeInOutSine, tro:left top]:delay-400"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(90deg) translateZ(0px):rotateY(252deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:281px:249px:750:easeInOutSine, top:400px:225px:750:easeInOutSine, tro:50% 50% -200px]:delay-100">
			<div class="playing-card-back bg-shamrock"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">A</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-club c10"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(10px), z-index:6]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(10px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:132px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-1000"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:132px:483px:600:easeOutExpo, top:400px:225px:600:easeOutExpo, tro:left top]:delay-500"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(324deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:483px:249px:750:easeInOutSine, top:225px:225px:750:easeInOutSine, tro:50% 50% -200px]"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(10px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:225px:0px:500:easeOutQuart, tro:left top]:delay-1450"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:483px:132px:400:easeOutQuad, top:225px:400px:400:easeOutQuad, tro:left top]:delay-500"
			when-column-grid-init="p:[transform:rotateY(324deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:483px:600:easeInOutSine, top:225px:225px:600:easeInOutSine, tro:left top]:delay-500"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(324deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:132px:249px:750:easeInOutSine, top:400px:225px:750:easeInOutSine, tro:50% 50% -200px]">
			<div class="playing-card-back bg-lake"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">Q</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-club c11"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(8px), z-index:5]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(8px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:134px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-800"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:134px:15px:600:easeOutExpo, top:400px:390px:600:easeOutExpo, tro:left top]:delay-200"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(0deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:15px:249px:750:easeInOutSine, top:390px:390px:750:easeInOutSine, tro:50% 50% -200px]"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(8px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:390px:0px:500:easeOutQuart, tro:left top]:delay-1600"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:15px:134px:400:easeOutQuad, top:390px:400px:400:easeOutQuad, tro:left top]:delay-400"
			when-column-grid-init="p:[transform:rotateY(0deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:15px:600:easeInOutSine, top:390px:390px:600:easeInOutSine, tro:left top]:delay-200"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:134px:249px:750:easeInOutSine, top:400px:390px:750:easeInOutSine, tro:50% 50% -200px]">
			<div class="playing-card-back bg-robin"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">Q</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-club c12"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(6px), z-index:4]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(6px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:280px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-600"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:280px:132px:600:easeOutExpo, top:400px:390px:600:easeOutExpo, tro:left top]:delay-300"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(72deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:132px:282px:750:easeInOutSine, top:390px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-100"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(6px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:390px:0px:500:easeOutQuart, tro:left top]:delay-1750"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px:rotateY(90deg) rotateX(-29deg) translateZ(0px)):400:easeOutQuad easeOutQuad easeOutQuad, left:132px:280px:400:easeOutQuad, top:390px:400px:400:easeOutQuad, tro:left top]:delay-300"
			when-column-grid-init="p:[transform:rotateY(72deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:282px:132px:600:easeInOutSine, top:390px:390px:600:easeInOutSine, tro:left top]:delay-300"
			when-pyramid-column-init="p:[transform::rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(72deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:280px:282px:750:easeInOutSine, top:400px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-100">
			<div class="playing-card-back bg-moxie"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">K</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-spade c13"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(4px), z-index:3]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(8px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:282px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-400"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:282px:249px:600:easeOutExpo, top:400px:390px:600:easeOutExpo, tro:left top]:delay-400"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(144deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:249px:249px:750:easeInOutSine, top:390px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-200"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(4px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:390px:0px:500:easeOutQuart, tro:left top]:delay-1900"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:249px:282px:400:easeOutQuad, top:390px:400px:400:easeOutQuad, tro:left top]:delay-200"
			when-column-grid-init="p:[transform:rotateY(144deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:249px:600:easeInOutSine, top:390px:390px:600:easeInOutSine, tro:left top]:delay-400"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(144deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:282px:249px:750:easeInOutSine, top:400px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-200">
			<div class="playing-card-back bg-crimson"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">A</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-spade c14"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(2px), z-index:2]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(2px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:428px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]:delay-200"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:428px:366px:600:easeOutExpo, top:400px:390px:600:easeOutExpo, tro:left top]:delay-500"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(216deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:366px:249px:750:easeInOutSine, top:390px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-300"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(2px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:390px:0px:500:easeOutQuart, tro:left top]:delay-2150"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:366px:428px:400:easeOutQuad, top:390px:400px:400:easeOutQuad, tro:left top]:delay-100"
			when-column-grid-init="p:[transform:rotateY(216deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:366px:600:easeInOutSine, top:390px:390px:600:easeInOutSine, tro:left top]:delay-500"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(-29deg) translateZ(0px):rotateY(216deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:428px:249px:750:easeInOutSine, top:400px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-300">
			<div class="playing-card-back bg-campus"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 C151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">J</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>

		<div class="playing-card play-spade c15"
			init-with="p:[tro:left top, transform:rotateY(0deg) rotateX(90deg) translateZ(0px), z-index:1]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(90deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:0px:430px:400:easeOutQuad, top:0px:400px:400:easeOutQuad, tro:left top]"
			when-grid-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(0deg) rotateX(0deg) translateZ(0px):600:easeOutExpo easeOutExpo easeOutExpo, left:430px:483px:600:easeOutExpo, top:400px:390px:600:easeOutExpo, tro:left top]:delay-600"
			when-column-init="p:[transform:rotateY(0deg) translateZ(0px):rotateY(288deg) translateZ(200px):750:easeInOutSine easeInOutSine, left:483px:249px:750:easeInOutSine, top:390px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-400"
			when-stack-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(200px):rotateY(0deg) rotateX(90deg) translateZ(0px):500:easeOutQuad easeOutQuad easeOutQuart, left:245px:0px:500:easeOutQuart, top:390px:0px:500:easeOutQuart, tro:left top]:delay-2300"

			when-grid-pyramid-init="p:[transform:rotateY(0deg) rotateX(0deg) translateZ(0px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutQuad easeOutQuad easeOutQuad, left:483px:430px:400:easeOutQuad, top:390px:400px:400:easeOutQuad, tro:left top]"
			when-column-grid-init="p:[transform:rotateY(288deg) translateZ(200px):rotateY(0deg) translateZ(0px):600:easeInOutSine easeInOutSine, left:249px:483px:600:easeInOutSine, top:390px:390px:600:easeInOutSine, tro:50% 50% -200px]:delay-600"
			when-pyramid-column-init="p:[transform:rotateY(90deg) rotateX(29deg) translateZ(0px):rotateY(288deg) rotateX(0deg) translateZ(200px):750:easeInOutSine easeInOutSine easeInOutSine, left:430px:249px:750:easeInOutSine, top:400px:390px:750:easeInOutSine, tro:50% 50% -200px]:delay-400">
			<div class="playing-card-back bg-rocket"></div>
			<div class="playing-card-front">
				<svg viewBox="0 0 250 350">
					<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
						<path d="M181,114.589487 C181,98.2465582 167.776199,85 151.466344,85 C139.864282,85 129.833984,91.6958698 125.003748,101.438048 C120.163517,91.6958698 110.140715,85 98.5361549,85 C82.228799,85 69,98.2465582 69,114.589487 C69,153.630788 124.386538,175 124.386538,175 C124.386538,175 181,153.360451 181,114.589487 L181,114.589487 Z" class="heart" stroke="#F04F54" stroke-width="3" fill="#F04F54"></path>
						<polygon class="diamond" stroke="#F04F54" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#F04F54" points="124.861436 74 180.723407 129.861971 124.861436 185.723943 68.9994643 129.861971"></polygon>
						<path d="M152.113309,112.798631 gC151.699475,112.798631 151.283133,112.808673 150.874314,112.828758 C151.852468,110.036972 152.391707,107.039317 152.391707,103.918642 C152.391707,89.0558964 140.35289,77 125.502508,77 C110.649618,77 98.6108012,89.0558964 98.6108012,103.918642 C98.6108012,107.039317 99.1475318,110.036972 100.125686,112.828758 C99.7168675,112.808673 99.3030331,112.798631 98.8891988,112.798631 C84.0363087,112.798631 72,124.849506 72,139.709742 C72,154.577509 84.0363087,166.625873 98.8891988,166.625873 C107.647438,166.625873 115.412475,162.425641 120.320801,155.938253 C117.386339,167.318799 113.486264,179.176358 109.262646,183 L125.377104,183 L125.620388,183 L141.737354,183 C137.518752,179.176358 133.623693,167.336373 130.684215,155.958338 C135.595049,162.433173 143.365102,166.623363 152.113309,166.623363 C166.958675,166.623363 179,154.574998 179,139.707231 C179,124.849506 166.958675,112.798631 152.113309,112.798631 L152.113309,112.798631 Z" class="club" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<path d="M126.124735,78 C126.124735,78 69,99.6590241 69,138.45067 C69,154.805904 82.3453437,168.061618 98.8055264,168.061618 C106.78951,168.061618 114.036433,164.932005 119.382648,159.856416 C116.595952,169.907287 113.092389,179.624633 109.341457,183 L125.380101,183 L125.619899,183 L141.658543,183 C137.910135,179.624633 134.406572,169.907287 131.617352,159.856416 C136.963567,164.934513 144.21049,168.061618 152.199522,168.061618 C168.657181,168.061618 182,154.805904 182,138.45067 C182.005048,99.3856846 126.124735,78 126.124735,78 L126.124735,78 Z" class="spade" stroke="#40484B" stroke-width="3" fill="#40484B"></path>
						<text font-family="Source Sans Pro" font-size="72" font-weight="900" fill="#40484B" text-anchor="middle">
							<tspan x="125" y="257">Q</tspan>
						</text>
					</g>
				</svg>
			</div>
		</div>
	</div>
</div>
