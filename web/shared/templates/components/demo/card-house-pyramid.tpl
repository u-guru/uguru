<inspector-gadget show-log="true" ball-color="smoke" reverse-speed="10" speed="1x" class="bottom-0 bg-azure" start-at="t:50%" auto-play="false" step-size="25" play-infinite="false" ng-if='root.inspector'> </inspector-gadget>
<!-- @samir try adding start-at="t:20%" - autoplays even when set to false -->

<div id="pyramid" class="absolute perspective-container" style="width:600px; height:600px; top:10%; left:50%; margin-left:-300px;" init-with="send:[pyramid-init:public]">
	<!-- <button class="bg-slate m15bottom"

		when-pyramid-init="p:[transform:translateY(0px):translateY(500px):1000:easeOutCirc]"
		inspector-toggle="on-click|10000"
		>Toggle</button> -->
	<div class="playing-card-container">
		<div class="playing-card play-diamond c1"
			init-with="p:[transform:rotateY(0deg) rotateX(-90deg) translateZ(28px), left:0px, top:0px, z-index:15]"
			inspector-elem="on-init"
			on-init="send:[pyramid-init:public]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(-90deg) translateZ(28px):rotateY(90deg) rotateX(-29deg) translateZ(0px):400:easeOutSine, left:0px:280px:400:easeOutSine, top:0px:36px:400:easeOutSine]">
			<!-- "p:[transform:rotateY(0deg) rotateX(-90deg) translateX(0px) translateY(0px) translateZ(28px):rotateY(90deg) rotateX(-29deg) translateX(376px) translateY(400px) translateZ(548px):400:easeOutSine]:delay-200"> -->
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

		<div class="playing-card play-heart c2"
			init-with="p:[transform:rotateY(0deg) rotateX(-90deg) translateZ(26px), left:0px, top:0px, z-index:14]"
			when-pyramid-init="p:[transform:rotateY(0deg) rotateX(-90deg) translateZ(26px):rotateY(90deg) rotateX(29deg) translateZ(0px):400:easeOutSine, left:0px:282px:400:easeOutSine, top:0px:36px:400:easeOutSine]:delay-200">
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

		<div class="playing-card play-heart c3"
			init-with="p:[transform:rotateY(90deg) rotateX(90deg), left:204px, top:168px, z-index:13]">
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
			init-with="p:[transform: rotateY(90deg) rotateX(-29deg), left:204px, top:168px, z-index:12]">
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
			init-with="p:[transform:rotateY(90deg) rotateX(29deg), left:208px, top:168px, z-index:11]">
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

		<div class="playing-card play-diamond c6"
			init-with="p:[transform: rotateY(90deg) rotateX(-29deg), left:352px, top:168px, z-index:10]">
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

		<div class="playing-card play-diamond c7"
			init-with="p:[transform: rotateY(90deg) rotateX(29deg), left:356px, top:168px, z-index:9]">
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

		<div class="playing-card play-club c8"
			init-with="p:[transform:rotateY(90deg) rotateX(90deg), left:131px, top:300px, z-index:8]">
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

		<div class="playing-card play-club c9"
			init-with="p:[transform: rotateY(90deg) rotateX(90deg), left:281px, top:300px, z-index:7]">
			<div class="playing-card-back bg-lake"></div>
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

		<div class="playing-card play-club c10"
			init-with="p:[transform: rotateY(90deg) rotateX(-29deg), left:130px, top:300px, z-index:6]">
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

		<div class="playing-card play-club c11"
			init-with="p:[transform: rotateY(90deg) rotateX(29deg), left:134px, top:300px, z-index:5]">
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

		<div class="playing-card play-spade c12"
			init-with="p:[transform: rotateY(90deg) rotateX(-29deg), left:280px, top:300px, z-index:4]">
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

		<div class="playing-card play-spade c13"
			init-with="p:[transform:rotateY(90deg) rotateX(29deg), left:282px, top:300px, z-index:3]">
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

	</div>
</div>
