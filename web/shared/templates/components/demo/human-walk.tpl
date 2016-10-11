<div class="absolute top-0 left-0 full-xy flex-center perspective-container">

	<!-- WITH init-after -->
	<div ng-if="true" u on-init="s:[walk-1:public:delay-1000]"
		when-walk-1="s:[walk-2:public:delay-100]"
		when-walk-2="s:[walk-3:public:delay-100]"
		when-walk-3="s:[walk-4:public:delay-100]">
		<svg class="bg-slate-25p" width="1600px" height="800px" viewBox="0 0 400 200">
			<g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#696269" fill="#C8BBC9">
				<g class="left-arm" stroke="#40484B" fill="#757575"
					init-with="p:[tro:13px 4px]"
					init-after="walk-1"
					on-init="a:[rotate:0deg:10deg:100:linear:0:1:f, translateX:0px:19px:100:linear:0:1:f, translateY:0px:-18px:100:linear:0:1:f]"
					when-walk-2="a:[rotate:10deg:24deg:100:linear:0:1:f, translateX:19px:39px:100:linear:0:1:f, translateY:-18px:-49px:100:linear:0:1:f]"
					when-walk-3="a:[rotate:24deg:29deg:100:linear:0:1:f, translateX:39px:44px:100:linear:0:1:f, translateY:-49px:-64px:100:linear:0:1:f]">
					<path d="M106.055235,59.9483772 C107.917412,59.606594 109.176521,57.8390507 108.878692,55.9586352 C108.576305,54.049437 106.78346,52.7468593 104.874262,53.0492466 C102.965064,53.3516339 101.662486,55.1444782 101.964874,57.0536765 C102.036433,57.5054828 102.19146,57.9233172 102.411745,58.293949 L90.8751606,81.9474533 C90.3882567,82.9457542 90.7990818,84.146069 91.7918623,84.6302804 C92.7915643,85.1178676 93.9838366,84.698411 94.4703368,83.7009379 L106.055235,59.9483772 L106.055235,59.9483772 Z" class="left-arm-top"></path>
					<g init-with="p:[tro:4px 4px]"
						init-after="walk-1"
						on-init="a:[rotate:0deg:27deg:100:linear:0:1:f, translateX:0px:26px:100:linear:0:1:f, translateY:0px:-50px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:27deg:28deg:100:linear:0:1:f]"
						when-walk-3="a:[rotate:28deg:36deg:100:linear:0:1:f, translateX:26px:29px:100:linear:0:1:f, translateY:-50px:-67px:100:linear:0:1:f]">
						<path d="M94.2071972,86.0714256 L116.359533,97.8500316 C117.340233,98.371479 118.554154,98.0027946 119.072718,97.0275176 C119.594898,96.0454412 119.217306,94.8392563 118.237419,94.3182412 L96.884669,82.9647825 C96.9201011,82.5513076 96.8820639,82.1244928 96.7608653,81.7018231 C96.2280592,79.8437075 94.2898342,78.7693319 92.4317186,79.302138 C90.573603,79.834944 89.4992274,81.773169 90.0320334,83.6312846 C90.5501361,85.4381232 92.3971593,86.5038815 94.2071972,86.0714256 L94.2071972,86.0714256 Z" class="left-arm-bottom"></path>
						<g init-with="p:[tro:center center]"
							init-after="walk-2"
							on-init="a:[rotate:0deg:35deg:100:linear:0:1:f, translateX:0px:-3px:100:linear:0:1:f, translateY:0px:2px:100:linear:0:1:f]">
							<path d="M119.488059,92.9784933 C122.449216,92.5944054 125.336307,93.3074588 125.63376,94.3447998 C125.987972,95.5800847 124.152989,98.0362518 120.702203,99.0257488 C117.251417,100.015246 115.18632,98.7956014 114.832108,97.5603165 C114.632236,96.863282 114.504911,95.9189559 115.051883,95.0505761 C115.080463,94.9877585 115.114558,94.9265706 115.15428,94.8676798 L117.508222,91.3778172 C117.900211,90.7966696 118.684662,90.6403369 119.269385,91.0347375 C119.85006,91.4264075 119.999067,92.2208928 119.611031,92.7961797 L119.488059,92.9784933 L119.488059,92.9784933 Z" class="left-hand"></path>
						</g>
					</g>
				</g>
				<g>
					<g class="left-leg" stroke="#40484B" fill="#757575"
						init-with="p:[tro:5px 5px]"
						init-after="walk-1"
						on-init="a:[translateX:0px:13px:100:linear:0:1:f]"
						when-walk-2="a:[translateX:13px:27px:100:linear:0:1:f]"
						when-walk-3="a:[rotate:0deg:-11deg:100:linear:0:1:f, translateX:27px:26px:100:linear:0:1:f, translateY:0px:26px:100:linear:0:1:f]">
						<path d="M101.363464,101.7012 C102.749162,100.44023 103.365655,98.4487496 102.781524,96.5381415 C101.974162,93.8973788 99.1789041,92.4111141 96.5381415,93.2184762 C93.8973788,94.0258384 92.4111141,96.8210959 93.2184762,99.4618585 C93.8330988,101.472198 95.5997777,102.813465 97.5733235,102.983094 L108.137259,132.007267 C108.515914,133.047615 109.66528,133.587408 110.703236,133.209623 C111.748428,132.829204 112.275223,131.681014 111.896029,130.639186 L101.363464,101.7012 L101.363464,101.7012 Z" class="left-thigh"></path>
						<g init-with="p:[tro:28px 5px]"
							init-after="walk-1"
							on-init="a:[rotate:0deg:-17deg:100:linear:0:1:f, translateX:0px:-40px:100:linear:0:1:f, translateY:0px:18px:100:linear:0:1:f]"
							when-walk-2="a:[rotate:-17deg:-50deg:100:linear:0:1:f, translateX:-40px:-126px:100:linear:0:1:f]">
							<path d="M108.755416,136.009186 C110.14348,136.601508 111.809287,136.379135 113.004616,135.302856 C114.646326,133.824654 114.778875,131.295465 113.300672,129.653755 C111.82247,128.012044 109.293281,127.879495 107.651571,129.357698 C106.647688,130.261598 106.208103,131.558479 106.356045,132.805121 L84.0838,150.840829 C83.2269962,151.534655 83.0912447,152.796788 83.7863728,153.6552 C84.4863472,154.519596 85.7416889,154.645335 86.6010815,153.949413 L108.755416,136.009186 L108.755416,136.009186 Z" class="left-calf"></path>
							<g init-with="p:[tro:11px 3px]"
								init-after="walk-1"
								on-init="a:[rotate:0deg:-10deg:linear:0:1:f, translateX:0px:-25px:linear:0:1:f, translateY:0px:9px:100:linear:0:1:f]">
								<path d="M81.2454985,153.235698 L74.4968007,154.178035 L81.8503761,162.345008 L85.2809892,160.191048 L84.6433898,156.622523 C85.5111868,156.647555 86.3896422,156.35174 87.0857472,155.724964 C88.5222436,154.431537 88.6382242,152.218497 87.344797,150.782 C86.0513698,149.345504 83.8383294,149.229523 82.401833,150.522951 C81.6047474,151.24065 81.2142404,152.241492 81.2454985,153.235698 L81.2454985,153.235698 Z" class="left-foot-back"></path>
								<g>
									<path d="M84.1711376,164.922474 L89.3663334,170.692324 L90.8491759,169.357167 L86.8213729,162.726764 C87.0819889,161.774302 86.867386,160.713118 86.1575668,159.924784 C85.0489149,158.693501 83.1520232,158.594089 81.9207405,159.702741 C80.6894579,160.811393 80.590046,162.708285 81.6986979,163.939567 C82.3493206,164.662157 83.2714162,164.994926 84.1711376,164.922474 L84.1711376,164.922474 Z" class="left-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
					<path d="M102.223536,59.0909728 C102.439489,57.7274976 103.710554,56.7957719 105.083775,57.0132686 L105.083775,57.0132686 C106.447488,57.2292596 107.377167,58.5144919 107.161978,59.8731452 L101.616843,94.8837458 C101.40089,96.247221 100.129825,97.1789467 98.7566046,96.96145 L98.7566046,96.96145 C97.3928915,96.745459 96.4632122,95.4602266 96.6784017,94.1015734 L102.223536,59.0909728 L102.223536,59.0909728 Z" class="torso"
						init-with="p:[tro:center center]"
						init-after="walk-1"
						on-init="a:[translateX:0px:12px:100:linear:0:1:f]"
						when-walk-2="a:[translateX:12px:27px:100:linear:0:1:f]"
						when-walk-3="a:[translateX:27px:33px:100:linear:0:1:f, translateY:0px:4px:100:linear:0:1:f]"></path>
					<g class="right-leg"
						init-with="p:[tro:50% 5px]"
						init-after="walk-1"
						on-init="a:[rotate:0deg:15deg:100:linear:0:1:f, translateX:0px:37px:100:linear:0:1:f, translateY:0px:-5px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:15deg:17deg:100:linear:0:1:f, translateX:37px:53px:100:linear:0:1:f, translateY:-5px:-11px:100:linear:0:1:f]"
						when-walk-3="a:[rotate:17deg:12deg100:linear:0:1:f, translateX:53px:54px100:linear:0:1:f, translateY:-11px:-6px:100:linear:0:1:f]">
						<path d="M100.13437,102.522857 C101.828192,101.722124 103,99.9979072 103,98 C103,95.2385763 100.761424,93 98,93 C95.2385763,93 93,95.2385763 93,98 C93,100.102196 94.2973349,101.901383 96.1350516,102.640608 L97.751546,133.485158 C97.809488,134.590757 98.7508118,135.443005 99.8538675,135.385197 C100.964614,135.326985 101.804089,134.382985 101.746064,133.275815 L100.13437,102.522857 L100.13437,102.522857 Z" class="right-thigh"></path>
						<g init-with="p:[tro:9px 4px]"
							init-after="walk-1"
							on-init="a:[rotate:0deg:-2deg:100:linear:0:1:f, translateX:0px:-4px:100:linear:0:1:f, translateY:0px:4px:100:linear:0:1:f]"
							when-walk-2="a:[rotate:-2deg:15deg:100:linear:0:1:f, translateX:-4px:31px:100:linear:0:1:f, translateY:4px:-28px:100:linear:0:1:f]"
							when-walk-3="a:[rotate:15deg:34deg:100:linear:0:1:f, translateX:31px:56px:100:linear:0:1:f:100:linear:0:1:f, translateY:-28px:-72px:100:linear:0:1:f]">
							<path d="M101.681636,137.630397 C103.050612,136.995205 104,135.608473 104,134 C104,131.790861 102.209139,130 100,130 C97.790861,130 96,131.790861 96,134 C96,135.350858 96.6696305,136.545316 97.6950585,137.269539 L96.195161,165.889287 C96.1374606,166.990277 96.9845729,167.935692 98.0876286,167.993501 C99.1983746,168.051712 100.131804,167.202947 100.189679,166.098631 L101.681636,137.630397 L101.681636,137.630397 Z" class="right-calf"></path>
							<g init-with="p:[tro:6px 3px]"
								init-after="walk-1"
								on-init="a:[rotate:0deg:3deg:100:linear:0:1:f, translateX:0px:9px:100:linear:0:1:f, translateY:0px:-6px:100:linear:0:1:f]"
								when-walk-2="a:[translateX:9px:10px:100:linear:0:1:f, translateY:-6px:-8px:100:linear:0:1:f]">
								<path d="M95.7422252,170.174506 L91.9267578,175.820312 L102.916504,175.820312 L103.611328,171.82959 L100.53276,169.915609 C101.132032,169.28746 101.5,168.436702 101.5,167.5 C101.5,165.567003 99.9329966,164 98,164 C96.0670034,164 94.5,165.567003 94.5,167.5 C94.5,168.572584 94.9824704,169.532482 95.7422252,170.174506 L95.7422252,170.174506 Z" class="right-foot-back"></path>
								<g init-with="p:[tro:3px 3px]"
									init-after="walk-1"
									on-init="a:[rotate:0deg:-20deg:100:linear:0:1:f, translateX:0px:-60px:100:linear:0:1:f, translateY:0px:26px:100:linear:0:1:f]"
									when-walk-2="a:[translateX:-60px:-63px:100:linear:0:1:f, translateY:26px:27px:100:linear:0:1:f]">
									<path d="M106.384828,175.820312 L114.148926,175.820312 L114.148926,173.824951 L106.52645,172.381587 C105.993019,171.55059 105.060808,171 104,171 C102.343146,171 101,172.343146 101,174 C101,175.656854 102.343146,177 104,177 C104.97234,177 105.836638,176.537415 106.384828,175.820312 L106.384828,175.820312 Z" class="right-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
				</g>
				<g init-with="p:[tro:left top]"
					init-after="walk-1"
					on-init="a:[translateX:0px:12px:100:linear:0:1:f]"
					when-walk-2="a:[translateX:12px:27px:100:linear:0:1:f, translateY:0px:3px:100:linear:0:1:f]"
					when-walk-3="a:[translateX:27px:33px:100:linear:0:1:f, translateY:3px:4px:100:linear:0:1:f]">
					<rect class="neck" x="104" y="44" width="3" height="11" rx="1.5"></rect>
					<path d="M110.661724,48.6481549 C115.710656,47.7987512 114.875737,40.8483338 112.785645,34.159668 C110.752373,27.6528401 103.634352,25.0390207 99.2456055,27.3725586 C94.8568591,29.7060965 92.8896484,33.359674 95.3964844,38.3154297 C97.9033203,43.2711853 105.612793,49.4975586 110.661724,48.6481549 L110.661724,48.6481549 Z" class="head"></path>
				</g>
				<g class="right-arm"
					init-with="p:[tro:20px 4px]"
					init-after="walk-1"
					on-init="a:[rotate:0deg:-17deg:100:linear:0:1:f, translateX:0px:-8px:100:linear:0:1:f, translateY:0px:27px:100:linear:0:1:f]"
					when-walk-2="a:[rotate:-17deg:-51deg:100:linear:0:1:f, translateX:-8px:-59px:100:linear:0:1:f, translateY:27px:70px:100:linear:0:1:f]"
					when-walk-3="a:[rotate:-51deg:-64deg:100:linear:0:1:f, translateX:-59px:-84px:100:linear:0:1:f, translateY:70px:78px:100:linear:0:1:f]">
					<path d="M105.587171,59.9989357 C107.479888,59.952669 109,58.4038551 109,56.5 C109,54.5670034 107.432997,53 105.5,53 C103.567003,53 102,54.5670034 102,56.5 C102,56.9574382 102.087755,57.39438 102.247349,57.7949089 L87.1525751,79.3524799 C86.5154972,80.2623214 86.7334937,81.5121255 87.6383041,82.1456806 C88.5494226,82.7836526 89.7926336,82.5558727 90.4291833,81.6467856 L105.587171,59.9989357 L105.587171,59.9989357 Z" class="right-arm-top"></path>
					<g init-with="p:[tro:3px 3px]"
						init-after="walk-1"
						on-init="a:[rotate:0deg:-2deg:100:linear:0:1:f, translateX:0px:-2px:100:linear:0:1:f, translateY:0px:2px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:-2deg:27deg:100:linear:0:1:f, translateX:-2px:26px:100:linear:0:1:f, translateY:2px:-47px:100:linear:0:1:f]">
						<path d="M89.340831,83.9964452 L107.388399,101.424779 C108.187378,102.196344 109.455897,102.176544 110.223196,101.381983 C110.995844,100.581883 110.965349,99.3183453 110.167033,98.54742 L92.770889,81.7481593 C92.9189176,81.3604681 93,80.939703 93,80.5 C93,78.5670034 91.4329966,77 89.5,77 C87.5670034,77 86,78.5670034 86,80.5 C86,82.3796531 87.4817099,83.9132344 89.340831,83.9964452 L89.340831,83.9964452 Z" class="right-arm-bottom"></path>
						<g init-with="p:[tro:center center]"
							init-after="walk-1"
							on-init="a:[rotate:0deg:27deg:100:linear:0:1:f]">
							<path d="M111.738509,97.6042946 C114.690825,98.0512912 117.269531,99.5325123 117.269531,100.611658 C117.269531,101.896724 114.82862,103.751953 111.23877,103.751953 C107.648919,103.751953 106,102.010338 106,100.725272 C106,100.000147 106.137899,99.0573071 106.90304,98.3733327 C106.947828,98.3208263 106.997467,98.2714065 107.051883,98.2257459 L110.276574,95.519909 C110.813564,95.0693209 111.610718,95.1352684 112.064078,95.6755621 C112.5143,96.2121151 112.438544,97.0168952 111.90697,97.4629392 L111.738509,97.6042946 L111.738509,97.6042946 Z" class="right-hand"></path>
						</g>
					</g>
				</g>
			</g>
		</svg>
	</div>

	<!-- WITHOUT init-after -->
	<div ng-if="false" u on-init="s:[walk-1:public]:delay-1000"
		when-walk-1="s:[walk-2:public]:delay-100"
		when-walk-2="s:[walk-3:public]:delay-100"
		when-walk-3="s:[walk-4:public]:delay-100">
		<svg class="bg-slate-25p" width="1600px" height="800px" viewBox="0 0 400 200">
		    <g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#696269" fill="#C8BBC9">
				<g class="left-arm" stroke="#40484B" fill="#757575"
					u init-with="p:[tro:13px 4px]"
					when-walk-1="a:[rotate:0deg:10deg:100:linear:0:1:f. translateX:0px:19px:100:linear:0:1:f, translateY:0px:-18px:100:linear:0:1:f]"
					when-walk-2="a:[rotate:10deg:24deg:100:linear:0:1:f, translateX:19px:39px:100:linear:0:1:f, translateY:-18px:-49px:100:linear:0:1:f]"
					when-walk-3="a:[rotate:24deg:29deg:100:linear:0:1:f, translateX:39px:44px:100:linear:0:1:f, translateY:-49px:-64px:100:linear:0:1:f]">
					<path d="M106.055235,59.9483772 C107.917412,59.606594 109.176521,57.8390507 108.878692,55.9586352 C108.576305,54.049437 106.78346,52.7468593 104.874262,53.0492466 C102.965064,53.3516339 101.662486,55.1444782 101.964874,57.0536765 C102.036433,57.5054828 102.19146,57.9233172 102.411745,58.293949 L90.8751606,81.9474533 C90.3882567,82.9457542 90.7990818,84.146069 91.7918623,84.6302804 C92.7915643,85.1178676 93.9838366,84.698411 94.4703368,83.7009379 L106.055235,59.9483772 L106.055235,59.9483772 Z" class="left-arm-top"></path>
		            <g u init-with="p:[tro:4px 4px]"
						when-walk-1="a:[rotate:0deg:27deg:100:linear:0:1:f, translateX:0px:26px:100:linear:0:1:f, translateY:0px:-50px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:27deg:28deg:100:linear:0:1:f]"
						when-walk-3="a:[rotate:28deg:36deg:100:linear:0:1:f, translateX:26px:29px:100:linear:0:1:f, translateY:-50px:-67px:100:linear:0:1:f]">
						<path d="M94.2071972,86.0714256 L116.359533,97.8500316 C117.340233,98.371479 118.554154,98.0027946 119.072718,97.0275176 C119.594898,96.0454412 119.217306,94.8392563 118.237419,94.3182412 L96.884669,82.9647825 C96.9201011,82.5513076 96.8820639,82.1244928 96.7608653,81.7018231 C96.2280592,79.8437075 94.2898342,78.7693319 92.4317186,79.302138 C90.573603,79.834944 89.4992274,81.773169 90.0320334,83.6312846 C90.5501361,85.4381232 92.3971593,86.5038815 94.2071972,86.0714256 L94.2071972,86.0714256 Z" class="left-arm-bottom"></path>
			            <g u init-with="p:[tro:center center]"
							when-walk-2="a:[rotate:0deg:35deg:100:linear:0:1:f, translateX:0px:-3px:100:linear:0:1:f, translateY:0px:2px:100:linear:0:1:f]">
							<path d="M119.488059,92.9784933 C122.449216,92.5944054 125.336307,93.3074588 125.63376,94.3447998 C125.987972,95.5800847 124.152989,98.0362518 120.702203,99.0257488 C117.251417,100.015246 115.18632,98.7956014 114.832108,97.5603165 C114.632236,96.863282 114.504911,95.9189559 115.051883,95.0505761 C115.080463,94.9877585 115.114558,94.9265706 115.15428,94.8676798 L117.508222,91.3778172 C117.900211,90.7966696 118.684662,90.6403369 119.269385,91.0347375 C119.85006,91.4264075 119.999067,92.2208928 119.611031,92.7961797 L119.488059,92.9784933 L119.488059,92.9784933 Z" class="left-hand"></path>
						</g>
					</g>
				</g>
	            <g>
					<g class="left-leg" stroke="#40484B" fill="#757575"
						u init-with="p:[tro:5px 5px]"
						when-walk-1="a:[translateX:0px:13px:100:linear:0:1:f]"
						when-walk-2="a:[translateX:13px:27px:100:linear:0:1:f]"
						when-walk-3="a:[rotate:0deg:-11deg:100:linear:0:1:f, translateX:27px:26px:100:linear:0:1:f, translateY:0px:26px:100:linear:0:1:f]">
						<path d="M101.363464,101.7012 C102.749162,100.44023 103.365655,98.4487496 102.781524,96.5381415 C101.974162,93.8973788 99.1789041,92.4111141 96.5381415,93.2184762 C93.8973788,94.0258384 92.4111141,96.8210959 93.2184762,99.4618585 C93.8330988,101.472198 95.5997777,102.813465 97.5733235,102.983094 L108.137259,132.007267 C108.515914,133.047615 109.66528,133.587408 110.703236,133.209623 C111.748428,132.829204 112.275223,131.681014 111.896029,130.639186 L101.363464,101.7012 L101.363464,101.7012 Z" class="left-thigh"></path>
			            <g u init-with="p:[tro:28px 5px]"
							when-walk-1="a:[rotate:0deg:-17deg:100:linear:0:1:f, translateX:0px:-40px:100:linear:0:1:f, translateY:0px:18px:100:linear:0:1:f]"
							when-walk-2="a:[rotate:-17deg:-50deg:100:linear:0:1:f, translateX:-40px:-126px:100:linear:0:1:f]">
							<path d="M108.755416,136.009186 C110.14348,136.601508 111.809287,136.379135 113.004616,135.302856 C114.646326,133.824654 114.778875,131.295465 113.300672,129.653755 C111.82247,128.012044 109.293281,127.879495 107.651571,129.357698 C106.647688,130.261598 106.208103,131.558479 106.356045,132.805121 L84.0838,150.840829 C83.2269962,151.534655 83.0912447,152.796788 83.7863728,153.6552 C84.4863472,154.519596 85.7416889,154.645335 86.6010815,153.949413 L108.755416,136.009186 L108.755416,136.009186 Z" class="left-calf"></path>
				            <g init-with="p:[tro:11px 3px]"
								when-walk-1="a:[rotate:0deg:-10deg:linear:0:1:f, translateX:0px:-25px:linear:0:1:f, translateY:0px:9px:100:linear:0:1:f]">
								<path d="M81.2454985,153.235698 L74.4968007,154.178035 L81.8503761,162.345008 L85.2809892,160.191048 L84.6433898,156.622523 C85.5111868,156.647555 86.3896422,156.35174 87.0857472,155.724964 C88.5222436,154.431537 88.6382242,152.218497 87.344797,150.782 C86.0513698,149.345504 83.8383294,149.229523 82.401833,150.522951 C81.6047474,151.24065 81.2142404,152.241492 81.2454985,153.235698 L81.2454985,153.235698 Z" class="left-foot-back"></path>
					            <g>
									<path d="M84.1711376,164.922474 L89.3663334,170.692324 L90.8491759,169.357167 L86.8213729,162.726764 C87.0819889,161.774302 86.867386,160.713118 86.1575668,159.924784 C85.0489149,158.693501 83.1520232,158.594089 81.9207405,159.702741 C80.6894579,160.811393 80.590046,162.708285 81.6986979,163.939567 C82.3493206,164.662157 83.2714162,164.994926 84.1711376,164.922474 L84.1711376,164.922474 Z" class="left-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
		            <path d="M102.223536,59.0909728 C102.439489,57.7274976 103.710554,56.7957719 105.083775,57.0132686 L105.083775,57.0132686 C106.447488,57.2292596 107.377167,58.5144919 107.161978,59.8731452 L101.616843,94.8837458 C101.40089,96.247221 100.129825,97.1789467 98.7566046,96.96145 L98.7566046,96.96145 C97.3928915,96.745459 96.4632122,95.4602266 96.6784017,94.1015734 L102.223536,59.0909728 L102.223536,59.0909728 Z" class="torso"
						u init-with="p:[tro:center center]"
						when-walk-1="a:[translateX:0px:12px:100:linear:0:1:f]"
						when-walk-2="a:[translateX:12px:27px:100:linear:0:1:f]"
						when-walk-3="a:[translateX:27px:33px:100:linear:0:1:f, translateY:0px:4px:100:linear:0:1:f]"></path>
					<g class="right-leg"
						u init-with="p:[tro:50% 5px]"
						when-walk-1="a:[rotate:0deg:15deg:100:linear:0:1:f, translateX:0px:37px:100:linear:0:1:f, translateY:0px:-5px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:15deg:17deg:100:linear:0:1:f, translateX:37px:53px:100:linear:0:1:f, translateY:-5px:-11px:100:linear:0:1:f]"
						when-walk-3="a:[rotate:17deg:12deg100:linear:0:1:f, translateX:53px:54px100:linear:0:1:f, translateY:-11px:-6px:100:linear:0:1:f]">
						<path d="M100.13437,102.522857 C101.828192,101.722124 103,99.9979072 103,98 C103,95.2385763 100.761424,93 98,93 C95.2385763,93 93,95.2385763 93,98 C93,100.102196 94.2973349,101.901383 96.1350516,102.640608 L97.751546,133.485158 C97.809488,134.590757 98.7508118,135.443005 99.8538675,135.385197 C100.964614,135.326985 101.804089,134.382985 101.746064,133.275815 L100.13437,102.522857 L100.13437,102.522857 Z" class="right-thigh"></path>
			            <g u init-with="p:[tro:9px 4px]"
							when-walk-1="a:[rotate:0deg:-2deg:100:linear:0:1:f, translateX:0px:-4px:100:linear:0:1:f, translateY:0px:4px:100:linear:0:1:f]"
							when-walk-2="a:[rotate:-2deg:15deg:100:linear:0:1:f, translateX:-4px:31px:100:linear:0:1:f, translateY:4px:-28px:100:linear:0:1:f]"
							when-walk-3="a:[rotate:15deg:34deg:100:linear:0:1:f, translateX:31px:56px:100:linear:0:1:f:100:linear:0:1:f, translateY:-28px:-72px:100:linear:0:1:f]">
							<path d="M101.681636,137.630397 C103.050612,136.995205 104,135.608473 104,134 C104,131.790861 102.209139,130 100,130 C97.790861,130 96,131.790861 96,134 C96,135.350858 96.6696305,136.545316 97.6950585,137.269539 L96.195161,165.889287 C96.1374606,166.990277 96.9845729,167.935692 98.0876286,167.993501 C99.1983746,168.051712 100.131804,167.202947 100.189679,166.098631 L101.681636,137.630397 L101.681636,137.630397 Z" class="right-calf"></path>
				            <g u init-with="p:[tro:6px 3px]"
								when-walk-1="a:[rotate:0deg:3deg:100:linear:0:1:f, translateX:0px:9px:100:linear:0:1:f, translateY:0px:-6px:100:linear:0:1:f]"
								when-walk-2="a:[translateX:9px:10px:100:linear:0:1:f, translateY:-6px:-8px:100:linear:0:1:f]">
								<path d="M95.7422252,170.174506 L91.9267578,175.820312 L102.916504,175.820312 L103.611328,171.82959 L100.53276,169.915609 C101.132032,169.28746 101.5,168.436702 101.5,167.5 C101.5,165.567003 99.9329966,164 98,164 C96.0670034,164 94.5,165.567003 94.5,167.5 C94.5,168.572584 94.9824704,169.532482 95.7422252,170.174506 L95.7422252,170.174506 Z" class="right-foot-back"></path>
					            <g u init-with="p:[tro:3px 3px]"
									when-walk-1="a:[rotate:0deg:-20deg:100:linear:0:1:f, translateX:0px:-60px:100:linear:0:1:f, translateY:0px:26px:100:linear:0:1:f]"
									when-walk-2="a:[translateX:-60px:-63px:100:linear:0:1:f, translateY:26px:27px:100:linear:0:1:f]">
									<path d="M106.384828,175.820312 L114.148926,175.820312 L114.148926,173.824951 L106.52645,172.381587 C105.993019,171.55059 105.060808,171 104,171 C102.343146,171 101,172.343146 101,174 C101,175.656854 102.343146,177 104,177 C104.97234,177 105.836638,176.537415 106.384828,175.820312 L106.384828,175.820312 Z" class="right-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
				</g>
	            <g u init-with="p:[tro:left top]"
					when-walk-1="a:[translateX:0px:12px:100:linear:0:1:f]"
					when-walk-2="a:[translateX:12px:27px:100:linear:0:1:f, translateY:0px:3px:100:linear:0:1:f]"
					when-walk-3="a:[translateX:27px:33px:100:linear:0:1:f, translateY:3px:4px:100:linear:0:1:f]">
					<rect class="neck" x="104" y="44" width="3" height="11" rx="1.5"></rect>
		            <path d="M110.661724,48.6481549 C115.710656,47.7987512 114.875737,40.8483338 112.785645,34.159668 C110.752373,27.6528401 103.634352,25.0390207 99.2456055,27.3725586 C94.8568591,29.7060965 92.8896484,33.359674 95.3964844,38.3154297 C97.9033203,43.2711853 105.612793,49.4975586 110.661724,48.6481549 L110.661724,48.6481549 Z" class="head"></path>
				</g>
	            <g class="right-arm"
					u init-with="p:[tro:20px 4px]"
					when-walk-1="a:[rotate:0deg:-17deg:100:linear:0:1:f, translateX:0px:-8px:100:linear:0:1:f, translateY:0px:27px:100:linear:0:1:f]"
					when-walk-2="a:[rotate:-17deg:-51deg:100:linear:0:1:f, translateX:-8px:-59px:100:linear:0:1:f, translateY:27px:70px:100:linear:0:1:f]"
					when-walk-3="a:[rotate:-51deg:-64deg:100:linear:0:1:f, translateX:-59px:-84px:100:linear:0:1:f, translateY:70px:78px:100:linear:0:1:f]">
					<path d="M105.587171,59.9989357 C107.479888,59.952669 109,58.4038551 109,56.5 C109,54.5670034 107.432997,53 105.5,53 C103.567003,53 102,54.5670034 102,56.5 C102,56.9574382 102.087755,57.39438 102.247349,57.7949089 L87.1525751,79.3524799 C86.5154972,80.2623214 86.7334937,81.5121255 87.6383041,82.1456806 C88.5494226,82.7836526 89.7926336,82.5558727 90.4291833,81.6467856 L105.587171,59.9989357 L105.587171,59.9989357 Z" class="right-arm-top"></path>
		            <g u init-with="p:[tro:3px 3px]"
						when-walk-1="a:[rotate:0deg:-2deg:100:linear:0:1:f, translateX:0px:-2px:100:linear:0:1:f, translateY:0px:2px:100:linear:0:1:f]"
						when-walk-2="a:[rotate:-2deg:27deg:100:linear:0:1:f, translateX:-2px:26px:100:linear:0:1:f, translateY:2px:-47px:100:linear:0:1:f]">
						<path d="M89.340831,83.9964452 L107.388399,101.424779 C108.187378,102.196344 109.455897,102.176544 110.223196,101.381983 C110.995844,100.581883 110.965349,99.3183453 110.167033,98.54742 L92.770889,81.7481593 C92.9189176,81.3604681 93,80.939703 93,80.5 C93,78.5670034 91.4329966,77 89.5,77 C87.5670034,77 86,78.5670034 86,80.5 C86,82.3796531 87.4817099,83.9132344 89.340831,83.9964452 L89.340831,83.9964452 Z" class="right-arm-bottom"></path>
			            <g u init-with="p:[tro:center center]"
							when-walk-1="a:[rotate:0deg:27deg:100:linear:0:1:f]">
							<path d="M111.738509,97.6042946 C114.690825,98.0512912 117.269531,99.5325123 117.269531,100.611658 C117.269531,101.896724 114.82862,103.751953 111.23877,103.751953 C107.648919,103.751953 106,102.010338 106,100.725272 C106,100.000147 106.137899,99.0573071 106.90304,98.3733327 C106.947828,98.3208263 106.997467,98.2714065 107.051883,98.2257459 L110.276574,95.519909 C110.813564,95.0693209 111.610718,95.1352684 112.064078,95.6755621 C112.5143,96.2121151 112.438544,97.0168952 111.90697,97.4629392 L111.738509,97.6042946 L111.738509,97.6042946 Z" class="right-hand"></path>
						</g>
					</g>
				</g>
		    </g>
		</svg>
	</div>

	<!-- old syntax -->
	<div ng-if="false" init-default
		on-init="s:[walk-1:public]:delay-1000"
		when-walk-1="s:[walk-2:public]:delay-100"
		when-walk-2="s:[walk-3:public]:delay-100"
		when-walk-3="s:[walk-4:public]:delay-100">
		<svg class="bg-slate-25p" width="1600px" height="800px" viewBox="0 0 400 200">
		    <g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#696269" fill="#C8BBC9">
				<g class="left-arm" stroke="#40484B" fill="#757575"
					init-with="p:[tro:13px 4px]"
					when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(10deg) translateX(19px) translateY(-18px):100:linear]"
					when-walk-2="p:[transform:rotate(10deg) translateX(19px) translateY(-18px):rotate(24deg) translateX(39px) translateY(-49px):100:linear]"
					when-walk-3="p:[transform:rotate(24deg) translateX(39px) translateY(-49px):rotate(29deg) translateX(44px) translateY(-64px):100:linear]"
					when-walk-4="p:[transform:rotate(29deg) translateX(44px) translateY(-64px):rotate(51deg) translateX(39px) translateY(-122px):100:linear]">
					<path d="M106.055235,59.9483772 C107.917412,59.606594 109.176521,57.8390507 108.878692,55.9586352 C108.576305,54.049437 106.78346,52.7468593 104.874262,53.0492466 C102.965064,53.3516339 101.662486,55.1444782 101.964874,57.0536765 C102.036433,57.5054828 102.19146,57.9233172 102.411745,58.293949 L90.8751606,81.9474533 C90.3882567,82.9457542 90.7990818,84.146069 91.7918623,84.6302804 C92.7915643,85.1178676 93.9838366,84.698411 94.4703368,83.7009379 L106.055235,59.9483772 L106.055235,59.9483772 Z" class="left-arm-top"></path>
		            <g init-with="p:[tro:4px 4px]"
						when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(27deg) translateX(26px) translateY(-50px):100:linear]"
						when-walk-2="p:[transform:rotate(27deg) translateX(26px) translateY(-50px):rotate(28deg) translateX(26px) translateY(-50px):100:linear]"
						when-walk-3="p:[transform:rotate(28deg) translateX(26px) translateY(-50px):rotate(36deg) translateX(29px) translateY(-67px):100:linear]"
						when-walk-4="p:[transform:rotate(36deg) translateX(29px) translateY(-67px):rotate(39deg) translateX(31px) translateY(-72px):100:linear]">
						<path d="M94.2071972,86.0714256 L116.359533,97.8500316 C117.340233,98.371479 118.554154,98.0027946 119.072718,97.0275176 C119.594898,96.0454412 119.217306,94.8392563 118.237419,94.3182412 L96.884669,82.9647825 C96.9201011,82.5513076 96.8820639,82.1244928 96.7608653,81.7018231 C96.2280592,79.8437075 94.2898342,78.7693319 92.4317186,79.302138 C90.573603,79.834944 89.4992274,81.773169 90.0320334,83.6312846 C90.5501361,85.4381232 92.3971593,86.5038815 94.2071972,86.0714256 L94.2071972,86.0714256 Z" class="left-arm-bottom"></path>
			            <g init-with="p:[tro:center center]"
							when-walk-2="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(35deg) translateX(-3px) translateY(2px):100:linear]"
							when-walk-4="p:[transform:rotate(35deg) translateX(-3px) translateY(2px):rotate(29deg) translateX(-2px) translateY(1px):100:linear]">
							<path d="M119.488059,92.9784933 C122.449216,92.5944054 125.336307,93.3074588 125.63376,94.3447998 C125.987972,95.5800847 124.152989,98.0362518 120.702203,99.0257488 C117.251417,100.015246 115.18632,98.7956014 114.832108,97.5603165 C114.632236,96.863282 114.504911,95.9189559 115.051883,95.0505761 C115.080463,94.9877585 115.114558,94.9265706 115.15428,94.8676798 L117.508222,91.3778172 C117.900211,90.7966696 118.684662,90.6403369 119.269385,91.0347375 C119.85006,91.4264075 119.999067,92.2208928 119.611031,92.7961797 L119.488059,92.9784933 L119.488059,92.9784933 Z" class="left-hand"></path>
						</g>
					</g>
				</g>
	            <g>
					<g class="left-leg" stroke="#40484B" fill="#757575"
						init-with="p:[tro:5px 5px]"
						when-walk-1="p:[transform:translateX(0px):translateX(13px):100:linear]"
						when-walk-2="p:[transform:translateX(13px):translateX(27px):100:linear]"
						when-walk-3="p:[transform:rotate(0deg) translateX(27px) translateY(0px):rotate(-11deg) translateX(14px) translateY(26px):100:linear]"
						when-walk-4="p:[transform:rotate(-11deg) translateX(14px) translateY(26px):rotate(-11deg) translateX(23px) translateY(31px):100:linear]">
						<path d="M101.363464,101.7012 C102.749162,100.44023 103.365655,98.4487496 102.781524,96.5381415 C101.974162,93.8973788 99.1789041,92.4111141 96.5381415,93.2184762 C93.8973788,94.0258384 92.4111141,96.8210959 93.2184762,99.4618585 C93.8330988,101.472198 95.5997777,102.813465 97.5733235,102.983094 L108.137259,132.007267 C108.515914,133.047615 109.66528,133.587408 110.703236,133.209623 C111.748428,132.829204 112.275223,131.681014 111.896029,130.639186 L101.363464,101.7012 L101.363464,101.7012 Z" class="left-thigh"></path>
			            <g init-with="p:[tro:28px 5px]"
							when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-17deg) translateX(-40px) translateY(18px):100:linear]"
							when-walk-2="p:[transform:rotate(-17deg) translateX(-40px) translateY(18px):rotate(-50deg) translateX(-126px) translateY(18px):100:linear]"
							when-walk-4="p:[transform:rotate(-50deg) translateX(-126px) translateY(18px):rotate(-73deg) translateX(-181px) translateY(-10px):100:linear]">
							<path d="M108.755416,136.009186 C110.14348,136.601508 111.809287,136.379135 113.004616,135.302856 C114.646326,133.824654 114.778875,131.295465 113.300672,129.653755 C111.82247,128.012044 109.293281,127.879495 107.651571,129.357698 C106.647688,130.261598 106.208103,131.558479 106.356045,132.805121 L84.0838,150.840829 C83.2269962,151.534655 83.0912447,152.796788 83.7863728,153.6552 C84.4863472,154.519596 85.7416889,154.645335 86.6010815,153.949413 L108.755416,136.009186 L108.755416,136.009186 Z" class="left-calf"></path>
				            <g init-with="p:[tro:11px 3px]"
								when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-10deg) translateX(-25px) translateY(9px):100:linear]"
								when-walk-4="p:[transform:rotate(-10deg) translateX(-25px) translateY(9px):rotate(-7deg) translateX(-18px) translateY(7px):100:linear]">
								<path d="M81.2454985,153.235698 L74.4968007,154.178035 L81.8503761,162.345008 L85.2809892,160.191048 L84.6433898,156.622523 C85.5111868,156.647555 86.3896422,156.35174 87.0857472,155.724964 C88.5222436,154.431537 88.6382242,152.218497 87.344797,150.782 C86.0513698,149.345504 83.8383294,149.229523 82.401833,150.522951 C81.6047474,151.24065 81.2142404,152.241492 81.2454985,153.235698 L81.2454985,153.235698 Z" class="left-foot-back"></path>
					            <g>
									<path d="M84.1711376,164.922474 L89.3663334,170.692324 L90.8491759,169.357167 L86.8213729,162.726764 C87.0819889,161.774302 86.867386,160.713118 86.1575668,159.924784 C85.0489149,158.693501 83.1520232,158.594089 81.9207405,159.702741 C80.6894579,160.811393 80.590046,162.708285 81.6986979,163.939567 C82.3493206,164.662157 83.2714162,164.994926 84.1711376,164.922474 L84.1711376,164.922474 Z" class="left-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
		            <path d="M102.223536,59.0909728 C102.439489,57.7274976 103.710554,56.7957719 105.083775,57.0132686 L105.083775,57.0132686 C106.447488,57.2292596 107.377167,58.5144919 107.161978,59.8731452 L101.616843,94.8837458 C101.40089,96.247221 100.129825,97.1789467 98.7566046,96.96145 L98.7566046,96.96145 C97.3928915,96.745459 96.4632122,95.4602266 96.6784017,94.1015734 L102.223536,59.0909728 L102.223536,59.0909728 Z" class="torso"
						init-with="p:[tro:center center]"
						when-walk-1="p:[transform:translateX(0px):translateX(12px):100:linear]"
						when-walk-2="p:[transform:translateX(12px):translateX(27px):100:linear]"
						when-walk-3="p:[transform:translateX(27px) translateY(0px):translateX(33px) translateY(4px):100:linear]"
						when-walk-4="p:[transform:rotate(0deg) translateX(33px) translateY(4px):rotate(2deg) translateX(45px) translateY(6px):100:linear]"></path>
					<g class="right-leg"
						init-with="p:[tro:50% 5px]"
						when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(15deg) translateX(37px) translateY(-5px):100:linear]"
						when-walk-2="p:[transform:rotate(15deg) translateX(37px) translateY(-5px):rotate(17deg) translateX(53px) translateY(-11px):100:linear]"
						when-walk-3="p:[transform:rotate(17deg) translateX(53px) translateY(-11px):rotate(12deg) translateX(54px) translateY(-6px):100:linear]"
						when-walk-4="p:[transform:rotate(12deg) translateX(54px) translateY(-6px):rotate(26deg) translateX(83px) translateY(-25px):100:linear]">
						<path d="M100.13437,102.522857 C101.828192,101.722124 103,99.9979072 103,98 C103,95.2385763 100.761424,93 98,93 C95.2385763,93 93,95.2385763 93,98 C93,100.102196 94.2973349,101.901383 96.1350516,102.640608 L97.751546,133.485158 C97.809488,134.590757 98.7508118,135.443005 99.8538675,135.385197 C100.964614,135.326985 101.804089,134.382985 101.746064,133.275815 L100.13437,102.522857 L100.13437,102.522857 Z" class="right-thigh"></path>
			            <g init-with="p:[tro:9px 4px]"
							when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-2deg) translateX(-4px) translateY(4px):100:linear]"
							when-walk-2="p:[transform:rotate(-2deg) translateX(-4px) translateY(4px):rotate(15deg) translateX(31px) translateY(-28px):100:linear]"
							when-walk-3="p:[transform:rotate(15deg) translateX(31px) translateY(-28px):rotate(34deg) translateX(56px) translateY(-72px):100:linear]"
							when-walk-4="p:[transform:rotate(34deg) translateX(56px) translateY(-72px):rotate(23deg) translateX(45px) translateY(-45px):100:linear]">
							<path d="M101.681636,137.630397 C103.050612,136.995205 104,135.608473 104,134 C104,131.790861 102.209139,130 100,130 C97.790861,130 96,131.790861 96,134 C96,135.350858 96.6696305,136.545316 97.6950585,137.269539 L96.195161,165.889287 C96.1374606,166.990277 96.9845729,167.935692 98.0876286,167.993501 C99.1983746,168.051712 100.131804,167.202947 100.189679,166.098631 L101.681636,137.630397 L101.681636,137.630397 Z" class="right-calf"></path>
				            <g init-with="p:[tro:6px 3px]"
								when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(3deg) translateX(9px) translateY(-6px):100:linear]"
								when-walk-2="p:[transform:rotate(3deg) translateX(9px) translateY(-6px):rotate(3deg) translateX(10px) translateY(-8px):100:linear]"
								when-walk-4="p:[transform:rotate(3deg) translateX(10px) translateY(-8px):rotate(13deg) translateX(35px) translateY(-31px):100:linear]">
								<path d="M95.7422252,170.174506 L91.9267578,175.820312 L102.916504,175.820312 L103.611328,171.82959 L100.53276,169.915609 C101.132032,169.28746 101.5,168.436702 101.5,167.5 C101.5,165.567003 99.9329966,164 98,164 C96.0670034,164 94.5,165.567003 94.5,167.5 C94.5,168.572584 94.9824704,169.532482 95.7422252,170.174506 L95.7422252,170.174506 Z" class="right-foot-back"></path>
					            <g init-with="p:[tro:3px 3px]"
									when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-20deg) translateX(-60px) translateY(26px):100:linear]"
									when-walk-2="p:[transform:rotate(-20deg) translateX(-60px) translateY(26px):rotate(-20deg) translateX(-63px) translateY(27px):100:linear]"
									when-walk-4="p:[transform:rotate(-20deg) translateX(-63px) translateY(27px):rotate(-3deg) translateX(-8px) translateY(5px):100:linear]">
									<path d="M106.384828,175.820312 L114.148926,175.820312 L114.148926,173.824951 L106.52645,172.381587 C105.993019,171.55059 105.060808,171 104,171 C102.343146,171 101,172.343146 101,174 C101,175.656854 102.343146,177 104,177 C104.97234,177 105.836638,176.537415 106.384828,175.820312 L106.384828,175.820312 Z" class="right-foot-front"></path>
								</g>
							</g>
						</g>
					</g>
				</g>
	            <g init-with="p:[tro:center center]"
					when-walk-1="p:[transform:translateX(0px):translateX(12px):100:linear]"
					when-walk-2="p:[transform:translateX(12px) translateY(0px):translateX(27px) translateY(3px):100:linear]"
					when-walk-3="p:[transform:translateX(27px) translateY(3px):translateX(33px) translateY(4px):100:linear]"
					when-walk-4="p:[transform:translateX(33px) translateY(4px):translateX(45px) translateY(6px):100:linear]">
					<rect class="neck" x="104" y="44" width="3" height="11" rx="1.5"></rect>
		            <path d="M110.661724,48.6481549 C115.710656,47.7987512 114.875737,40.8483338 112.785645,34.159668 C110.752373,27.6528401 103.634352,25.0390207 99.2456055,27.3725586 C94.8568591,29.7060965 92.8896484,33.359674 95.3964844,38.3154297 C97.9033203,43.2711853 105.612793,49.4975586 110.661724,48.6481549 L110.661724,48.6481549 Z" class="head"></path>
				</g>
	            <g class="right-arm"
					init-with="p:[tro:20px 4px]"
					when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-17deg) translateX(-8px) translateY(27px):100:linear]"
					when-walk-2="p:[transform:rotate(-17deg) translateX(-8px) translateY(27px):rotate(-51deg) translateX(-59px) translateY(70px):100:linear]"
					when-walk-3="p:[transform:rotate(-51deg) translateX(-59px) translateY(70px):rotate(-64deg) translateX(-84px) translateY(78px):100:linear]"
					when-walk-4="p:[transform:rotate(-64deg) translateX(-84px) translateY(78px):rotate(-82deg) translateX(-126px) translateY(85px):100:linear]">
					<path d="M105.587171,59.9989357 C107.479888,59.952669 109,58.4038551 109,56.5 C109,54.5670034 107.432997,53 105.5,53 C103.567003,53 102,54.5670034 102,56.5 C102,56.9574382 102.087755,57.39438 102.247349,57.7949089 L87.1525751,79.3524799 C86.5154972,80.2623214 86.7334937,81.5121255 87.6383041,82.1456806 C88.5494226,82.7836526 89.7926336,82.5558727 90.4291833,81.6467856 L105.587171,59.9989357 L105.587171,59.9989357 Z" class="right-arm-top"></path>
		            <g init-with="p:[tro:3px 3px]"
						when-walk-1="p:[transform:rotate(0deg) translateX(0px) translateY(0px):rotate(-2deg) translateX(-2px) translateY(2px):100:linear]"
						when-walk-2="p:[transform:rotate(-2deg) translateX(-2px) translateY(2px):rotate(27deg) translateX(26px) translateY(-47px):100:linear]"
						when-walk-4="p:[transform:rotate(27deg) translateX(26px) translateY(-47px):rotate(21deg) translateX(22px) translateY(-35px):100:linear]">
						<path d="M89.340831,83.9964452 L107.388399,101.424779 C108.187378,102.196344 109.455897,102.176544 110.223196,101.381983 C110.995844,100.581883 110.965349,99.3183453 110.167033,98.54742 L92.770889,81.7481593 C92.9189176,81.3604681 93,80.939703 93,80.5 C93,78.5670034 91.4329966,77 89.5,77 C87.5670034,77 86,78.5670034 86,80.5 C86,82.3796531 87.4817099,83.9132344 89.340831,83.9964452 L89.340831,83.9964452 Z" class="right-arm-bottom"></path>
			            <g init-with="p:[tro:center center]"
							when-walk-1="p:[transform:rotate(0deg):rotate(27deg):100:linear]"
							when-walk-4="p:[transform:rotate(27deg) translateX(0px):rotate(7deg) translateX(1px):100:linear]">
							<path d="M111.738509,97.6042946 C114.690825,98.0512912 117.269531,99.5325123 117.269531,100.611658 C117.269531,101.896724 114.82862,103.751953 111.23877,103.751953 C107.648919,103.751953 106,102.010338 106,100.725272 C106,100.000147 106.137899,99.0573071 106.90304,98.3733327 C106.947828,98.3208263 106.997467,98.2714065 107.051883,98.2257459 L110.276574,95.519909 C110.813564,95.0693209 111.610718,95.1352684 112.064078,95.6755621 C112.5143,96.2121151 112.438544,97.0168952 111.90697,97.4629392 L111.738509,97.6042946 L111.738509,97.6042946 Z" class="right-hand"></path>
						</g>
					</g>
				</g>
		    </g>
		</svg>
	</div>

	<!-- <g class="opacity-25p" transform="translate(88.000000, 26.000000)">
		<path d="M23.7385091,71.6042946 C26.690825,72.0512912 29.2695312,73.5325123 29.2695312,74.6116576 C29.2695312,75.8967237 26.8286204,77.7519531 23.2387695,77.7519531 C19.6489187,77.7519531 18,76.0103379 18,74.7252717 C18,74.0001471 18.1378989,73.0573071 18.9030399,72.3733327 C18.9478275,72.3208263 18.997467,72.2714065 19.0518831,72.2257459 L22.2765739,69.519909 C22.813564,69.0693209 23.6107181,69.1352684 24.0640784,69.6755621 C24.5142998,70.2121151 24.4385444,71.0168952 23.9069698,71.4629392 L23.7385091,71.6042946 L23.7385091,71.6042946 Z" id="right-hand"></path>
		<path d="M30.7520188,33.7264744 C32.4761965,32.9443422 33.2702969,30.9246965 32.5264014,29.1721886 C31.7711195,27.3928558 29.7164083,26.5626986 27.9370755,27.3179806 C26.1577427,28.0732625 25.3275855,30.1279737 26.0828674,31.9073065 C26.2616028,32.3283806 26.5131086,32.696299 26.8165144,33.0026296 L21.344916,58.7444762 C21.1139861,59.830916 21.8029904,60.8961887 22.8834224,61.1258416 C23.9713869,61.3570956 25.026768,60.6616619 25.2575064,59.576123 L30.7520188,33.7264744 L30.7520188,33.7264744 Z" id="left-arm-top"></path>
		<path d="M24.9467974,62.2480311 L47.8668054,72.4526761 C48.8814908,72.9044431 50.0667368,72.451978 50.5160057,71.4429035 C50.9684068,70.426794 50.507596,69.2498867 49.493752,68.7984943 L27.4010386,58.9621845 C27.4075418,58.5472452 27.3398242,58.1241235 27.1894369,57.7109378 C26.5283131,55.8945152 24.5198649,54.9579604 22.7034422,55.6190842 C20.8870195,56.2802079 19.9504647,58.2886562 20.6115885,60.1050788 C21.2544678,61.871375 23.1713353,62.8056954 24.9467974,62.2480311 L24.9467974,62.2480311 Z" id="left-arm-bottom"></path>
		<path d="M50.6478888,67.3747697 C53.5750402,66.7850575 56.5048389,67.2949806 56.8739283,68.3090455 C57.3134468,69.5166127 55.6542667,72.0947987 52.2809104,73.3226 C48.907554,74.5504013 46.7624098,73.4777818 46.3228913,72.2702146 C46.0748841,71.5888203 45.8819964,70.6556763 46.3670607,69.751257 C46.391189,69.6865988 46.4209323,69.6231816 46.4564499,69.5616634 L48.5612174,65.9160992 C48.9117127,65.3090234 49.683348,65.098351 50.2941586,65.4510027 C50.9007402,65.8012128 51.1048045,66.5833686 50.7578438,67.1843221 L50.6478888,67.3747697 L50.6478888,67.3747697 Z" id="left-hand"></path>
		<path d="M25.5518746,75.4939297 C26.8696801,74.1621657 27.3811024,72.14115 26.6977779,70.2637313 C25.7533153,67.6688418 22.8841036,66.3309064 20.2892141,67.2753689 C17.6943245,68.2198315 16.3563891,71.0890432 17.3008517,73.6839327 C18.019845,75.6593506 19.8542992,76.9063187 21.8340179,76.9724269 L33.9024834,105.40395 C34.3350679,106.423055 35.5111091,106.901955 36.5278707,106.470365 C37.5517209,106.035767 38.0177026,104.86158 37.5845028,103.841025 L25.5518746,75.4939297 L25.5518746,75.4939297 Z" id="left-thigh"></path>
		<path d="M35.5322655,109.680045 C37.0298235,109.866819 38.5698059,109.193902 39.4221669,107.829839 C40.5928322,105.956383 40.0231077,103.488635 38.1496516,102.31797 C36.2761955,101.147305 33.8084475,101.717029 32.6377822,103.590485 C31.9219364,104.736078 31.8568493,106.103885 32.3426814,107.261456 L15.9045404,130.737554 C15.2721721,131.64067 15.4895704,132.891328 16.3943808,133.524883 C17.3054993,134.162855 18.5468696,133.937704 19.1811486,133.03186 L35.5322655,109.680045 L35.5322655,109.680045 Z" id="left-calf"></path>
		<path d="M15.132382,132.39835 L9.54706032,136.301823 L19.8068722,140.240196 L21.8856935,136.763538 L19.697512,133.873423 C20.4820889,133.501755 21.1305013,132.839372 21.4661852,131.964885 C22.1589092,130.160277 21.2575493,128.13579 19.4529415,127.443066 C17.6483337,126.750342 15.6238462,127.651702 14.9311222,129.456309 C14.5467423,130.457653 14.6531708,131.526697 15.132382,132.39835 L15.132382,132.39835 Z" id="left-foot-back"></path>
		<path d="M23.0448312,141.483132 L30.2932414,144.265536 L31.0083149,142.402705 L24.4093764,138.323558 C24.2091782,137.35659 23.5361981,136.508496 22.5458484,136.128336 C20.9990417,135.534573 19.2637667,136.307167 18.6700033,137.853974 C18.0762398,139.400781 18.848834,141.136056 20.3956407,141.729819 C21.3033987,142.078275 22.2760659,141.956151 23.0448312,141.483132 L23.0448312,141.483132 Z" id="left-foot-front"></path>
		<path d="M26.2235361,33.0909728 C26.4394893,31.7274976 27.7105543,30.7957719 29.0837749,31.0132686 L29.0837749,31.0132686 C30.4474879,31.2292596 31.3771673,32.5144919 31.1619778,33.8731452 L25.6168434,68.8837458 C25.4008901,70.247221 24.1298251,71.1789467 22.7566046,70.96145 L22.7566046,70.96145 C21.3928915,70.745459 20.4632122,69.4602266 20.6784017,68.1015734 L26.2235361,33.0909728 L26.2235361,33.0909728 Z" id="torso"></path>
		<path d="M23.2513299,76.8787083 C25.0746197,76.4476388 26.5793056,75.0047328 26.9946938,73.0504847 C27.5688261,70.3494046 25.8445943,67.6943205 23.1435143,67.1201882 C20.4424343,66.5460559 17.7873501,68.2702877 17.2132178,70.9713677 C16.7761468,73.0276255 17.6710598,75.057227 19.3149245,76.1623811 L14.4831519,106.668992 C14.3099609,107.762478 15.0535221,108.791814 16.1444925,108.964607 C17.2430689,109.138605 18.2604679,108.389771 18.4339053,107.29473 L23.2513299,76.8787083 L23.2513299,76.8787083 Z" id="right-thigh"></path>
		<path d="M16.9181963,112.067381 C18.4001749,111.782243 19.6568425,110.666381 20.0459674,109.105686 C20.5804065,106.962167 19.2759902,104.791254 17.1324721,104.256815 C14.988954,103.722376 12.8180407,105.026792 12.2836016,107.17031 C11.9567995,108.481042 12.3175737,109.802018 13.1373365,110.752802 L4.75824869,138.159563 C4.43590877,139.21389 5.02914156,140.336157 6.08544663,140.659102 C7.14911606,140.984298 8.26015383,140.386562 8.58346772,139.32905 L16.9181963,112.067381 L16.9181963,112.067381 Z" id="right-calf"></path>
		<path d="M5.07388276,141.21652 L0.509802896,146.276371 L11.3925975,147.805849 L12.636061,143.950664 L9.85382806,141.626857 C10.5346891,141.088223 11.017479,140.296955 11.1478426,139.36937 C11.4168638,137.455185 10.0831951,135.685347 8.16901025,135.416325 C6.25482542,135.147304 4.48498729,136.480973 4.21596616,138.395158 C4.06669127,139.457304 4.4108744,140.475006 5.07388276,141.21652 L5.07388276,141.21652 Z" id="right-foot-back"></path>
		<path d="M18.3848275,149.820312 L26.1489258,149.820312 L26.1489258,147.824951 L18.5264502,146.381587 C17.993019,145.55059 17.0608081,145 16,145 C14.3431458,145 13,146.343146 13,148 C13,149.656854 14.3431458,151 16,151 C16.9723404,151 17.8366384,150.537415 18.3848275,149.820312 L18.3848275,149.820312 Z" id="right-foot-front"></path>
		<rect id="neck" x="28" y="18" width="3" height="11" rx="1.5"></rect>
		<path d="M34.6617244,22.6481549 C39.7106558,21.7987512 38.8757371,14.8483338 36.7856445,8.15966797 C34.7523732,1.65284014 27.6343519,-0.960979268 23.2456055,1.37255859 C18.8568591,3.70609646 16.8896484,7.35967403 19.3964844,12.3154297 C21.9033203,17.2711853 29.612793,23.4975586 34.6617244,22.6481549 L34.6617244,22.6481549 Z" id="head"></path>
		<path d="M29.587171,33.9989357 C31.4798883,33.952669 33,32.4038551 33,30.5 C33,28.5670034 31.4329966,27 29.5,27 C27.5670034,27 26,28.5670034 26,30.5 C26,30.9574382 26.0877551,31.39438 26.2473488,31.7949089 L11.1525751,53.3524799 C10.5154972,54.2623214 10.7334937,55.5121255 11.6383041,56.1456806 C12.5494226,56.7836526 13.7926336,56.5558727 14.4291833,55.6467856 L29.587171,33.9989357 L29.587171,33.9989357 Z" id="right-arm-top"></path>
		<path d="M12.5583814,57.8710263 L26.2228695,78.9124928 C26.8278063,79.8440138 28.0682675,80.1100758 28.9946374,79.5084841 C29.9274658,78.9026982 30.181987,77.6646852 29.5775518,76.7339366 L16.4062816,56.451959 C16.6377278,56.1075035 16.8113836,55.7157621 16.9102952,55.2873287 C17.3451249,53.4038746 16.1707827,51.5245344 14.2873287,51.0897048 C12.4038746,50.6548751 10.5245344,51.8292173 10.0897048,53.7126713 C9.66687482,55.5441491 10.7656278,57.3717369 12.5583814,57.8710263 L12.5583814,57.8710263 Z" id="right-arm-bottom"></path>
	</g> -->

	<!-- <g class="opacity-25p" transform="translate(74.000000, 23.000000)">
		<path d="M55.0629987,37.6638408 C56.9557159,37.6175742 58.4758277,36.0687602 58.4758277,34.1649051 C58.4758277,32.2319085 56.9088243,30.6649051 54.9758277,30.6649051 C53.042831,30.6649051 51.4758277,32.2319085 51.4758277,34.1649051 C51.4758277,34.6223433 51.5635828,35.0592851 51.7231764,35.4598141 L36.6284028,57.017385 C35.9913248,57.9272265 36.2093214,59.1770307 37.1141317,59.8105857 C38.0252503,60.4485578 39.2684613,60.2207779 39.9050109,59.3116907 L55.0629987,37.6638408 Z" id="left-arm-top" transform="translate(47.369511, 45.418949) rotate(15.000000) translate(-47.369511, -45.418949) "></path>
		<path d="M27.5661198,62.7998739 L45.613688,80.228208 C46.412667,80.999773 47.6811861,80.9799728 48.4484845,80.185412 C49.2211324,79.3853116 49.1906379,78.121774 48.3923215,77.3508488 L30.9961778,60.5515881 C31.1442064,60.1638969 31.2252888,59.7431317 31.2252888,59.3034287 C31.2252888,57.3704321 29.6582854,55.8034287 27.7252888,55.8034287 C25.7922922,55.8034287 24.2252888,57.3704321 24.2252888,59.3034287 C24.2252888,61.1830819 25.7069987,62.7166631 27.5661198,62.7998739 Z" id="left-arm-bottom" transform="translate(36.617626, 68.298885) rotate(41.000000) translate(-36.617626, -68.298885) "></path>
		<path d="M39.1606887,80.6447734 C42.1130047,81.09177 44.6917109,82.5729912 44.6917109,83.6521364 C44.6917109,84.9372026 42.2508001,86.792432 38.6609492,86.792432 C35.0710983,86.792432 33.4221797,85.0508168 33.4221797,83.7657506 C33.4221797,83.040626 33.5600786,82.097786 34.3252196,81.4138116 C34.3700072,81.3613051 34.4196467,81.3118853 34.4740628,81.2662247 L37.6987536,78.5603879 C38.2357437,78.1097997 39.0328978,78.1757472 39.4862581,78.7160409 C39.9364795,79.2525939 39.8607241,80.057374 39.3291495,80.5034181 L39.1606887,80.6447734 Z" id="left-hand" transform="translate(39.056945, 82.527213) rotate(69.000000) translate(-39.056945, -82.527213) "></path>
		<path d="M57.6723542,78.5200721 C59.3661763,77.7193392 60.5379842,75.9951224 60.5379842,73.9972152 C60.5379842,71.2357914 58.2994079,68.9972152 55.5379842,68.9972152 C52.7765604,68.9972152 50.5379842,71.2357914 50.5379842,73.9972152 C50.5379842,76.0994109 51.8353191,77.8985979 53.6730358,78.6378231 L55.2895302,109.482374 C55.3474722,110.587972 56.288796,111.44022 57.3918517,111.382412 C58.5025977,111.3242 59.3420727,110.380201 59.2840484,109.27303 L57.6723542,78.5200721 Z" id="left-thigh" transform="translate(55.537984, 90.191201) rotate(-20.000000) translate(-55.537984, -90.191201) "></path>
		<path d="M66.0678393,112.364213 C67.4368155,111.729021 68.3862032,110.342289 68.3862032,108.733816 C68.3862032,106.524677 66.5953422,104.733816 64.3862032,104.733816 C62.1770642,104.733816 60.3862032,106.524677 60.3862032,108.733816 C60.3862032,110.084674 61.0558337,111.279131 62.0812617,112.003355 L60.5813642,140.623103 C60.5236638,141.724093 61.3707761,142.669508 62.4738318,142.727316 C63.5845778,142.785528 64.5180076,141.936763 64.5758824,140.832447 L66.0678393,112.364213 Z" id="left-calf" transform="translate(64.386203, 123.731978) rotate(-2.000000) translate(-64.386203, -123.731978) "></path>
		<path d="M61.3503175,142.105088 L57.5348501,147.750895 L68.5245962,147.750895 L69.2194204,143.760172 L66.1408525,141.846191 C66.740124,141.218042 67.1080923,140.367284 67.1080923,139.430582 C67.1080923,137.497585 65.5410889,135.930582 63.6080923,135.930582 C61.6750957,135.930582 60.1080923,137.497585 60.1080923,139.430582 C60.1080923,140.503166 60.5905627,141.463064 61.3503175,142.105088 Z" id="left-foot-back" transform="translate(63.377135, 141.840738) rotate(-13.000000) translate(-63.377135, -141.840738) "></path>
		<path d="M72.6616222,145.440333 L80.4257205,145.440333 L80.4257205,143.444971 L72.8032449,142.001607 C72.2698137,141.17061 71.3376028,140.62002 70.2767947,140.62002 C68.6199404,140.62002 67.2767947,141.963166 67.2767947,143.62002 C67.2767947,145.276874 68.6199404,146.62002 70.2767947,146.62002 C71.2491351,146.62002 72.1134331,146.157435 72.6616222,145.440333 Z" id="left-foot-front" transform="translate(73.851258, 143.620020) rotate(-13.000000) translate(-73.851258, -143.620020) "></path>
		<rect id="torso" transform="translate(54.920190, 53.987359) rotate(9.000000) translate(-54.920190, -53.987359) " x="52.4201897" y="33.7642891" width="5" height="40.4461404" rx="2.5"></rect>
		<path d="M47.5458925,78.8371043 C49.2397147,78.0363715 50.4115226,76.3121547 50.4115226,74.3142475 C50.4115226,71.5528237 48.1729463,69.3142475 45.4115226,69.3142475 C42.6500988,69.3142475 40.4115226,71.5528237 40.4115226,74.3142475 C40.4115226,76.4164432 41.7088575,78.2156302 43.5465742,78.9548553 L45.1630686,109.799406 C45.2210106,110.905004 46.1623343,111.757253 47.2653901,111.699444 C48.3761361,111.641232 49.2156111,110.697233 49.1575867,109.590062 L47.5458925,78.8371043 Z" id="right-thigh" transform="translate(45.411523, 90.508233) rotate(17.000000) translate(-45.411523, -90.508233) "></path>
		<path d="M36.3549044,112.313877 C37.7238806,111.678685 38.6732682,110.291953 38.6732682,108.683479 C38.6732682,106.47434 36.8824072,104.683479 34.6732682,104.683479 C32.4641292,104.683479 30.6732682,106.47434 30.6732682,108.683479 C30.6732682,110.034337 31.3428987,111.228795 32.3683267,111.953019 L30.8684293,140.572767 C30.8107289,141.673756 31.6578411,142.619171 32.7608968,142.67698 C33.8716429,142.735192 34.8050727,141.886427 34.8629474,140.782111 L36.3549044,112.313877 Z" id="right-calf" transform="translate(34.673268, 123.681642) rotate(32.000000) translate(-34.673268, -123.681642) "></path>
		<path d="M22.4471446,138.165743 L18.6316773,143.81155 L29.6214234,143.81155 L30.3162476,139.820827 L27.2376796,137.906847 C27.8369512,137.278697 28.2049194,136.427939 28.2049194,135.491237 C28.2049194,133.558241 26.6379161,131.991237 24.7049194,131.991237 C22.7719228,131.991237 21.2049194,133.558241 21.2049194,135.491237 C21.2049194,136.563822 21.6873898,137.523719 22.4471446,138.165743 Z" id="right-foot-back" transform="translate(24.473962, 137.901393) rotate(40.000000) translate(-24.473962, -137.901393) "></path>
		<path d="M30.4332639,150.423386 L38.1973621,150.423386 L38.1973621,148.428025 L30.5748865,146.984661 C30.0414554,146.153664 29.1092444,145.603074 28.0484363,145.603074 C26.3915821,145.603074 25.0484363,146.94622 25.0484363,148.603074 C25.0484363,150.259928 26.3915821,151.603074 28.0484363,151.603074 C29.0207768,151.603074 29.8850747,151.140489 30.4332639,150.423386 Z" id="right-foot-front" transform="translate(31.622899, 148.603074) rotate(19.000000) translate(-31.622899, -148.603074) "></path>
		<rect id="neck" x="57" y="24" width="3" height="11" rx="1.5"></rect>
		<path d="M58.0385446,29.9896942 C62.8952573,31.610045 65.4210912,25.08122 66.7157874,18.1942396 C67.975286,11.4944886 62.9175601,5.84491445 57.9469973,5.84491445 C52.9764346,5.84491445 49.5242399,8.14728253 49.4110583,13.6998432 C49.2978767,19.252404 53.1818319,28.3693434 58.0385446,29.9896942 Z" id="head" transform="translate(58.159824, 18.042253) rotate(-28.000000) translate(-58.159824, -18.042253) "></path>
		<path d="M69.1527122,41.7385097 C71.0454295,41.6922431 72.5655412,40.1434291 72.5655412,38.2395741 C72.5655412,36.3065774 70.9985378,34.7395741 69.0655412,34.7395741 C67.1325446,34.7395741 65.5655412,36.3065774 65.5655412,38.2395741 C65.5655412,38.6970122 65.6532963,39.1339541 65.81289,39.534483 L50.7181163,61.0920539 C50.0810384,62.0018955 50.2990349,63.2516996 51.2038453,63.8852546 C52.1149638,64.5232267 53.3581748,64.2954468 53.9947245,63.3863597 L69.1527122,41.7385097 Z" id="right-arm-top" transform="translate(61.459224, 49.493618) rotate(-51.000000) translate(-61.459224, -49.493618) "></path>
		<path d="M68.6364346,63.4347103 L86.6840029,80.8630443 C87.4829818,81.6346093 88.751501,81.6148091 89.5187994,80.8202483 C90.2914473,80.020148 90.2609528,78.7566104 89.4626364,77.9856851 L72.0664927,61.1864244 C72.2145213,60.7987332 72.2956037,60.3779681 72.2956037,59.9382651 C72.2956037,58.0052685 70.7286003,56.4382651 68.7956037,56.4382651 C66.8626071,56.4382651 65.2956037,58.0052685 65.2956037,59.9382651 C65.2956037,61.8179182 66.7773135,63.3514995 68.6364346,63.4347103 Z" id="right-arm-bottom" transform="translate(77.687941, 68.933722) rotate(-23.000000) translate(-77.687941, -68.933722) "></path>
		<path d="M94.4442325,72.3245791 C97.3965484,72.7715756 99.9752547,74.2527968 99.9752547,75.331942 C99.9752547,76.6170082 97.5343438,78.4722376 93.9444929,78.4722376 C90.3546421,78.4722376 88.7057234,76.7306224 88.7057234,75.4455562 C88.7057234,74.7204316 88.8436223,73.7775916 89.6087633,73.0936172 C89.6535509,73.0411107 89.7031904,72.9916909 89.7576065,72.9460304 L92.9822973,70.2401935 C93.5192874,69.7896054 94.3164415,69.8555529 94.7698018,70.3958466 C95.2200232,70.9323995 95.1442678,71.7371796 94.6126932,72.1832237 L94.4442325,72.3245791 Z" id="right-hand" transform="translate(94.340489, 74.207019) rotate(6.000000) translate(-94.340489, -74.207019) "></path>
	</g> -->

	<!-- <g class="opacity-25p" transform="translate(93.000000, 30.000000)">
		<path d="M43.4039216,32.6876233 C45.1761503,33.35375 47.1657693,32.4871586 47.878966,30.7219349 C48.6030792,28.9296916 47.7371888,26.8897816 45.9449456,26.1656683 C44.1527023,25.441555 42.1127923,26.3074455 41.388679,28.0996887 C41.2173196,28.523818 41.1350035,28.9618171 41.1329354,29.3929659 L19.0616967,43.7261958 C18.1301757,44.3311326 17.8641137,45.5715938 18.4657054,46.4979637 C19.0714912,47.4307921 20.3095043,47.6853133 21.2402528,47.0808781 L43.4039216,32.6876233 L43.4039216,32.6876233 Z" id="left-arm-top"></path>
		<path d="M17.9353465,47.988934 L17.0597505,73.0627227 C17.0209872,74.1727575 17.8845066,75.102202 18.9884032,75.1407509 C20.099996,75.1795686 21.0185827,74.311435 21.0573138,73.2023206 L21.9013053,49.033567 C22.2884665,48.8841576 22.6554106,48.6628668 22.9821736,48.368648 C24.4186701,47.0752208 24.5346506,44.8621805 23.2412234,43.425684 C21.9477962,41.9891876 19.7347558,41.873207 18.2982594,43.1666343 C16.9014049,44.4243677 16.7531893,46.5516589 17.9353465,47.988934 L17.9353465,47.988934 Z" id="left-arm-bottom"></path>
		<path d="M22.4441859,72.4598796 C22.7246969,75.4326374 21.9113199,78.2930849 20.8642298,78.5541538 C19.6173356,78.8650394 17.2267047,76.9454547 16.3582412,73.4622377 C15.4897777,69.9790207 16.7807499,67.9577472 18.0276441,67.6468615 C18.7312295,67.471438 19.6794239,67.3771471 20.5281856,67.9540917 C20.5899676,67.9848465 20.6499283,68.0210558 20.7073969,68.0628092 L24.1129822,70.5371117 C24.6800956,70.9491437 24.8089561,71.7385731 24.3943892,72.3091755 C23.9826925,72.8758273 23.1834909,72.9970162 22.6220968,72.5891394 L22.4441859,72.4598796 L22.4441859,72.4598796 Z" id="left-hand"></path>
		<path d="M42.8902678,74.0387488 C44.0359492,72.5563114 44.2972596,70.4880334 43.3902287,68.707885 C42.1365686,66.2474384 39.1256902,65.2691447 36.6652436,66.5228049 C34.2047971,67.776465 33.2265034,70.7873434 34.4801635,73.24779 C35.4345404,75.1208602 37.4072881,76.1349698 39.3803069,75.9593182 L54.8237468,102.708141 C55.3773047,103.666931 56.602943,103.998938 57.5595282,103.446653 C58.5227826,102.890518 58.8421935,101.668295 58.2878484,100.708141 L42.8902678,74.0387488 L42.8902678,74.0387488 Z" id="left-thigh"></path>
		<path d="M59.6122804,105.530532 C60.6626975,104.446932 61.0520669,102.812076 60.4756415,101.310437 C59.6839569,99.2480278 57.370257,98.2179022 55.307848,99.0095868 C53.2454391,99.8012714 52.2153135,102.114971 53.0069981,104.17738 C53.4911024,105.438515 54.5443116,106.313663 55.7611697,106.622304 L64.6172952,133.878655 C64.9579866,134.927196 66.0876404,135.506239 67.1381484,135.164908 C68.1959804,134.821197 68.7632421,133.694296 68.4215213,132.642587 L59.6122804,105.530532 L59.6122804,105.530532 Z" id="left-calf"></path>
		<path d="M65.4789688,135.49482 L65.2350906,142.304625 L74.5549238,136.480947 L73.0294074,132.728421 L69.4043785,132.736666 C69.5797211,131.8864 69.4409428,130.969923 68.9445665,130.175554 C67.9202343,128.53628 65.7609548,128.037771 64.1216807,129.062104 C62.4824066,130.086436 61.9838977,132.245715 63.0082298,133.884989 C63.5766129,134.794592 64.4944391,135.352961 65.4789688,135.49482 L65.4789688,135.49482 Z" id="left-foot-back"></path>
		<path d="M77.4962291,134.643015 L84.0805578,130.52867 L83.0231774,128.836508 L75.7940849,131.651762 C74.9013483,131.229712 73.8190204,131.256782 72.9194042,131.818925 C71.5143121,132.696924 71.0870187,134.547735 71.9650177,135.952827 C72.8430166,137.357919 74.6938276,137.785212 76.0989197,136.907213 C76.9235112,136.391951 77.4113449,135.541649 77.4962291,134.643015 L77.4962291,134.643015 Z" id="left-foot-front"></path>
		<path d="M42.2235361,32.0909728 C42.4394893,30.7274976 43.7105543,29.7957719 45.0837749,30.0132686 L45.0837749,30.0132686 C46.4474879,30.2292596 47.3771673,31.5144919 47.1619778,32.8731452 L41.6168434,67.8837458 C41.4008901,69.247221 40.1298251,70.1789467 38.7566046,69.96145 L38.7566046,69.96145 C37.3928915,69.745459 36.4632122,68.4602266 36.6784017,67.1015734 L42.2235361,32.0909728 L42.2235361,32.0909728 Z" id="torso"></path>
		<path d="M40.0688676,75.8686558 C41.8994029,75.4694727 43.4290418,74.0530469 43.8784732,72.1063459 C44.4996583,69.4156973 42.8220268,66.7309255 40.1313781,66.1097403 C37.4407295,65.4885551 34.7559577,67.1661867 34.1347725,69.8568354 C33.6618814,71.905152 34.5212366,73.9500628 36.1455634,75.083738 L30.782113,105.501377 C30.5898643,106.591673 31.3153479,107.63383 32.4031365,107.825636 C33.4985089,108.01878 34.5288219,107.287816 34.721344,106.195969 L40.0688676,75.8686558 L40.0688676,75.8686558 Z" id="right-thigh"></path>
		<path d="M31.4398887,110.178557 C32.838078,110.746563 34.4997505,110.495152 35.6761135,109.398176 C37.2917754,107.891547 37.380164,105.36043 35.8735348,103.744768 C34.3669057,102.129106 31.8357886,102.040717 30.2201266,103.547347 C29.2321715,104.46863 28.8152876,105.772984 28.984964,107.016854 L7.03087769,125.43852 C6.18631339,126.147194 6.07260978,127.411504 6.78261336,128.257653 C7.49756697,129.109702 8.75491194,129.213513 9.60202813,128.502698 L31.4398887,110.178557 L31.4398887,110.178557 Z" id="right-calf"></path>
		<path d="M7.06796539,126.288287 L0.254729362,126.401141 L6.55818876,135.403414 L10.2257322,133.683596 L10.0277791,130.063967 C10.8860572,130.194569 11.7940154,130.008017 12.5613165,129.470746 C14.1447346,128.362025 14.5295524,126.179615 13.4208311,124.596197 C12.3121098,123.012779 10.1296996,122.627961 8.54628144,123.736682 C7.66767176,124.351891 7.15810352,125.297682 7.06796539,126.288287 L7.06796539,126.288287 Z" id="right-foot-back"></path>
		<path d="M10.5784288,140.828117 L17.0151579,145.169745 L18.1309498,143.515516 L12.6187503,138.056478 C12.6412034,137.06926 12.1762514,136.091514 11.2968017,135.498318 C9.92320724,134.571817 8.05861137,134.934257 7.13211023,136.307852 C6.20560909,137.681446 6.56804981,139.546042 7.94164424,140.472543 C8.74775098,141.016269 9.72296053,141.116078 10.5784288,140.828117 L10.5784288,140.828117 Z" id="right-foot-front"></path>
		<rect id="neck" x="44" y="18" width="3" height="11" rx="1.5"></rect>
		<path d="M50.6617244,22.6481549 C55.7106558,21.7987512 54.8757371,14.8483338 52.7856445,8.15966797 C50.7523732,1.65284014 43.6343519,-0.960979268 39.2456055,1.37255859 C34.8568591,3.70609646 32.8896484,7.35967403 35.3964844,12.3154297 C37.9033203,17.2711853 45.612793,23.4975586 50.6617244,22.6481549 L50.6617244,22.6481549 Z" id="head"></path>
		<path d="M48.5531935,31.0217398 C49.3712452,29.3143118 48.6813582,27.2567355 46.9850109,26.3924034 C45.2626983,25.5148413 43.1550834,26.1996468 42.2775213,27.9219595 C41.3999592,29.6442721 42.0847648,31.7518869 43.8070774,32.629449 C44.2146578,32.8371216 44.6438158,32.9572987 45.0731437,32.996936 L57.4281962,56.2334102 C57.9496436,57.2141102 59.1621956,57.5872731 60.1374726,57.0687091 C61.119549,56.5465298 61.4810016,55.3354108 60.9599866,54.355524 L48.5531935,31.0217398 L48.5531935,31.0217398 Z" id="right-arm-top"></path>
		<path d="M61.4069576,57.6618886 L86.3090197,60.7194773 C87.4114521,60.854839 88.4126204,60.075612 88.5472336,58.9792758 C88.6827852,57.8752961 87.8980153,56.8845422 86.7964971,56.7492927 L62.7932715,53.8020672 C62.678174,53.4033574 62.4897065,53.0185228 62.2250867,52.6673604 C61.0617803,51.1236006 58.8672695,50.8151823 57.3235098,51.9784887 C55.7797501,53.1417951 55.4713317,55.3363058 56.6346381,56.8800656 C57.7658416,58.3812233 59.8721199,58.7142805 61.4069576,57.6618886 L61.4069576,57.6618886 Z" id="right-arm-bottom"></path>
		<path d="M88.5866699,53.9835035 C91.4032623,52.9921496 94.375516,53.089361 94.882144,54.0421898 C95.4854461,55.1768358 94.2012271,57.9608444 91.0315769,59.6461773 C87.8619268,61.3315102 85.5883792,60.5678756 84.9850772,59.4332296 C84.6446518,58.7929825 84.3237727,57.8957646 84.6782456,56.9326391 C84.6931404,56.8652521 84.7137683,56.7983127 84.7403786,56.73245 L86.3172981,52.8294372 C86.5798938,52.1794899 87.3146996,51.8634769 87.9686455,52.1276882 C88.6180638,52.3900702 88.9289971,53.1362139 88.6690496,53.7796065 L88.5866699,53.9835035 L88.5866699,53.9835035 Z" id="right-hand"></path>
	</g> -->

	<!-- <g class="opacity-25p" transform="translate(94.000000, 32.000000)">
		<path d="M52.2059139,28.0585778 C54.0461131,28.5037589 55.9152908,27.4011534 56.4080448,25.5621706 C56.9083411,23.6950393 55.8003024,21.7758599 53.933171,21.2755636 C52.0660397,20.7752672 50.1468603,21.8833059 49.646564,23.7504373 C49.5281703,24.1922886 49.4998464,24.6370547 49.5503375,25.0652419 L29.3903958,41.9814415 C28.5395415,42.695393 28.4266368,43.9590328 29.1366404,44.8051821 C29.851594,45.6572306 31.1113974,45.7589788 31.9615462,45.0456192 L52.2059139,28.0585778 L52.2059139,28.0585778 Z" id="left-arm-top" stroke="#40484B" fill="#757575" transform="translate(42.599156, 33.337433) rotate(27.000000) translate(-42.599156, -33.337433) "></path>
		<path d="M17.0350785,39.6903978 L19.2217352,64.6839986 C19.3185401,65.7904834 20.2888938,66.6077634 21.38926,66.5114939 C22.4972979,66.4145531 23.3032386,65.4409429 23.206514,64.3353756 L21.0987844,40.2439155 C21.4648513,40.0484367 21.8020918,39.784076 22.0905629,39.452228 C23.3587228,37.9933769 23.204137,35.7826977 21.7452859,34.5145379 C20.2864349,33.246378 18.0757557,33.4009637 16.8075958,34.8598148 C15.5744324,36.278407 15.6865732,38.4079046 17.0350785,39.6903978 L17.0350785,39.6903978 Z" id="left-arm-bottom" stroke="#40484B" fill="#757575" transform="translate(19.581704, 50.087583) rotate(33.000000) translate(-19.581704, -50.087583) "></path>
		<path d="M16.3010107,62.5990095 C16.9417189,65.5154232 16.4830055,68.453675 15.4755366,68.8404061 C14.275824,69.3009326 11.6690739,67.6870008 10.3825864,64.3355863 C9.09609894,60.9841718 10.1311172,58.8206345 11.3308298,58.360108 C12.007792,58.1002466 12.9374275,57.8911027 13.8501746,58.3603088 C13.9152441,58.383305 13.9791707,58.411937 14.0412994,58.4463756 L17.7230416,60.4871986 C18.3361419,60.8270456 18.5602491,61.5948866 18.2183113,62.2117588 C17.8787408,62.8243601 17.1002656,63.0420437 16.4933483,62.705624 L16.3010107,62.5990095 L16.3010107,62.5990095 Z" id="left-hand" stroke="#40484B" fill="#757575" transform="translate(14.084164, 63.499478) rotate(33.000000) translate(-14.084164, -63.499478) "></path>
		<path d="M54.525521,75.1547773 C55.8433264,73.8230132 56.3547487,71.8019975 55.6714242,69.9245788 C54.7269617,67.3296893 51.8577499,65.9917539 49.2628604,66.9362164 C46.6679709,67.880679 45.3300355,70.7498907 46.274498,73.3447802 C46.9934913,75.3201981 48.8279455,76.5671662 50.8076643,76.6332744 L62.8761297,105.064797 C63.3087143,106.083903 64.4847554,106.562803 65.501517,106.131213 C66.5253673,105.696614 66.9913489,104.522427 66.5581491,103.501873 L54.525521,75.1547773 L54.525521,75.1547773 Z" id="left-thigh" stroke="#40484B" fill="#757575" transform="translate(56.345704, 86.461646) rotate(-9.000000) translate(-56.345704, -86.461646) "></path>
		<path d="M77.5764348,104.979304 C78.9224092,104.296723 79.8228223,102.877702 79.7666874,101.270209 C79.6895895,99.0624157 77.8373193,97.3351457 75.6295261,97.4122436 C73.4217328,97.4893414 71.6944629,99.3416116 71.7715607,101.549405 C71.818705,102.89944 72.5296136,104.0698 73.5796919,104.757796 L73.079523,133.412455 C73.0602817,134.514788 73.9398724,135.430063 75.0442737,135.44934 C76.1563746,135.468752 77.0596143,134.587928 77.0789138,133.482265 L77.5764348,104.979304 L77.5764348,104.979304 Z" id="left-calf" stroke="#40484B" fill="#757575" transform="translate(75.769124, 116.429707) rotate(-33.000000) translate(-75.769124, -116.429707) "></path>
		<path d="M84.9489306,133.531217 L82.5012835,139.890616 L93.2093631,137.418461 L92.9886618,133.373719 L89.5584454,132.20132 C90.0010548,131.454464 90.1682131,130.542735 89.9575011,129.630041 C89.5226714,127.746587 87.6433312,126.572245 85.7598772,127.007075 C83.8764231,127.441904 82.702081,129.321245 83.1369106,131.204699 C83.3781896,132.249793 84.0642242,133.076556 84.9489306,133.531217 L84.9489306,133.531217 Z" id="left-foot-back" stroke="#40484B" fill="#757575" transform="translate(87.855323, 133.403605) rotate(-29.000000) translate(-87.855323, -133.403605) "></path>
		<path d="M96.3473771,131.70984 L103.912482,129.963298 L103.463623,128.019077 L95.711825,128.32739 C95.005132,127.637687 93.9729578,127.310911 92.9393381,127.549541 C91.3249489,127.922252 90.31837,129.533115 90.6910811,131.147504 C91.0637922,132.761893 92.6746553,133.768472 94.2890445,133.395761 C95.2364638,133.177032 95.974551,132.531879 96.3473771,131.70984 L96.3473771,131.70984 Z" id="left-foot-front" stroke="#40484B" fill="#757575" transform="translate(97.263004, 130.472651) rotate(-29.000000) translate(-97.263004, -130.472651) "></path>
		<path d="M53.2235361,33.0909728 C53.4394893,31.7274976 54.7105543,30.7957719 56.0837749,31.0132686 L56.0837749,31.0132686 C57.4474879,31.2292596 58.3771673,32.5144919 58.1619778,33.8731452 L52.6168434,68.8837458 C52.4008901,70.247221 51.1298251,71.1789467 49.7566046,70.96145 L49.7566046,70.96145 C48.3928915,70.745459 47.4632122,69.4602266 47.6784017,68.1015734 L53.2235361,33.0909728 L53.2235361,33.0909728 Z" id="torso" stroke="#696269" fill="#C8BBC9"></path>
		<path d="M47.0136851,76.8283533 C48.867607,76.5578343 50.4923246,75.251561 51.0764562,73.3409529 C51.8838183,70.7001902 50.3975536,67.9049327 47.7567909,67.0975706 C45.1160282,66.2902084 42.3207708,67.7764732 41.5134086,70.4172358 C40.898786,72.4275756 41.6134022,74.5274507 43.154691,75.7716716 L35.6824784,105.741079 C35.4146429,106.815309 36.065662,107.905534 37.1374211,108.172754 C38.2166522,108.441837 39.2954449,107.784524 39.5636613,106.708767 L47.0136851,76.8283533 L47.0136851,76.8283533 Z" id="right-thigh" stroke="#696269" fill="#C8BBC9" transform="translate(43.459271, 87.555399) rotate(9.000000) translate(-43.459271, -87.555399) "></path>
		<path d="M31.3765106,107.088682 C32.8740686,107.275456 34.414051,106.602539 35.266412,105.238476 C36.4370774,103.36502 35.8673528,100.897272 33.9938967,99.7266066 C32.1204406,98.5559413 29.6526926,99.1256658 28.4820273,100.999122 C27.7661816,102.144715 27.7010944,103.512522 28.1869265,104.670093 L11.7487855,128.146191 C11.1164172,129.049306 11.3338155,130.299965 12.2386259,130.93352 C13.1497444,131.571492 14.3911147,131.346341 15.0253937,130.440497 L31.3765106,107.088682 L31.3765106,107.088682 Z" id="right-calf" stroke="#696269" fill="#C8BBC9" transform="translate(23.630878, 115.207621) rotate(15.000000) translate(-23.630878, -115.207621) "></path>
		<path d="M9.51541098,122.751316 L2.96353901,124.623719 L11.3821729,131.687792 L14.4796262,129.077345 L13.3515893,125.632286 C14.2144247,125.5363 15.0431615,125.121107 15.6452618,124.403551 C16.8877681,122.92279 16.6946242,120.715145 15.2138629,119.472639 C13.7331015,118.230133 11.525457,118.423277 10.2829507,119.904038 C9.59350673,120.725685 9.34609036,121.771135 9.51541098,122.751316 L9.51541098,122.751316 Z" id="right-foot-back" stroke="#696269" fill="#C8BBC9" transform="translate(9.713863, 125.170752) rotate(25.000000) translate(-9.713863, -125.170752) "></path>
		<path d="M10.5928038,137.098855 L17.029533,141.440484 L18.1453249,139.786254 L12.6331253,134.327217 C12.6555785,133.339998 12.1906265,132.362252 11.3111767,131.769056 C9.93758232,130.842555 8.07298645,131.204996 7.14648532,132.57859 C6.21998418,133.952185 6.5824249,135.81678 7.95601932,136.743282 C8.76212606,137.287007 9.73733561,137.386817 10.5928038,137.098855 L10.5928038,137.098855 Z" id="right-foot-front" stroke="#696269" fill="#C8BBC9" transform="translate(12.389309, 136.348174) rotate(25.000000) translate(-12.389309, -136.348174) "></path>
		<rect id="neck" stroke="#696269" fill="#C8BBC9" x="55" y="17" width="3" height="11" rx="1.5"></rect>
		<path d="M61.540462,22.4839419 C66.5893934,21.6345382 65.7544748,14.6841208 63.6643822,7.995455 C61.6311108,1.48862717 54.5130895,-1.12519224 50.1243431,1.20834562 C45.7355967,3.54188349 43.7683861,7.19546106 46.275222,12.1512167 C48.7820579,17.1069724 56.4915306,23.3333456 61.540462,22.4839419 L61.540462,22.4839419 Z" id="head" stroke="#696269" fill="#C8BBC9"></path>
		<path d="M65.3749794,29.2040221 C66.5301491,27.7039879 66.2831319,25.5479391 64.8035586,24.3498042 C63.3013381,23.13333 61.0974005,23.3649732 59.8809263,24.8671937 C58.6644521,26.3694143 58.8960953,28.5733518 60.3983158,29.789826 C60.753812,30.0777011 61.1486057,30.284479 61.5603107,30.4125125 L68.814241,55.7099738 C69.1203946,56.7776582 70.2288645,57.3947703 71.2906448,57.0903097 C72.3598277,56.7837264 72.9651875,55.6742235 72.6592878,54.6074244 L65.3749794,29.2040221 L65.3749794,29.2040221 Z" id="right-arm-top" stroke="#696269" fill="#C8BBC9" transform="translate(65.919691, 40.368859) rotate(-30.000000) translate(-65.919691, -40.368859) "></path>
		<path d="M80.3951736,46.0217844 L103.81784,55.0129038 C104.854779,55.4109472 106.01472,54.8970711 106.410563,53.8658666 C106.809165,52.8274728 106.287391,51.6762954 105.251312,51.2785821 L82.6740834,42.6119959 C82.6588614,42.1972849 82.5690921,41.7782871 82.3972865,41.3735384 C81.6420045,39.5942056 79.5872933,38.7640484 77.8079605,39.5193304 C76.0286278,40.2746123 75.1984705,42.3293235 75.9537525,44.1086563 C76.6881915,45.8388861 78.6513305,46.671605 80.3951736,46.0217844 L80.3951736,46.0217844 Z" id="right-arm-bottom" stroke="#696269" fill="#C8BBC9" transform="translate(91.109551, 47.193914) rotate(-38.000000) translate(-91.109551, -47.193914) "></path>
		<path d="M106.439031,37.645618 C109.411789,37.365107 112.272236,38.1784841 112.533305,39.2255741 C112.844191,40.4724683 110.924606,42.8630992 107.441389,43.7315628 C103.958172,44.6000263 101.936899,43.309054 101.626013,42.0621598 C101.450589,41.3585745 101.356298,40.4103801 101.933243,39.5616183 C101.963998,39.4998364 102.000207,39.4398757 102.041961,39.382407 L104.516263,35.9768218 C104.928295,35.4097084 105.717724,35.2808479 106.288327,35.6954148 C106.854979,36.1071114 106.976168,36.906313 106.568291,37.4677072 L106.439031,37.645618 L106.439031,37.645618 Z" id="right-hand" stroke="#696269" fill="#C8BBC9" transform="translate(107.028822, 39.733487) rotate(-38.000000) translate(-107.028822, -39.733487) "></path>
	</g> -->
</div>
