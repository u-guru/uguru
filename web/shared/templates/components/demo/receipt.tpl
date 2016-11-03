<div class='full-xy perspective-container'>
	<view layer="2" type='row' bg="robin">
	    <item width='100' height='20' align='center top' class="absolute top-0"
			u init-with="p:[op:0, tro:center center]"
			on-init="a:[bounceInUp-subtle:1000:linear:0:1:f] | s:[header-enter:depth(0):450, receipt-enter:depth(0):1650]">
			<graphic width="100" height="110" src='shared/templates/components/svg/logo/ui-guru-receipt.html'>
			</graphic>
	    </item>

		<item width='100' align='center top' class="absolute" style="top:20%;"
			u init-with="p-op"
			when-header-enter="a:[scoop-enter:1000:linear:0:1:f]">
            <txt class='weight-700 margin-0 txt-center' font-size="60px" line-height='1.2'>
                Thank you for your order!
            </txt>
	    </item>

		<item width='50' height="39" align='center top' class="p30xy absolute" style="bottom:14%;" bg="white"
			u init-with="p:[op:0, tr:rotateX(-90deg), tro:50% 0%]"
			when-receipt-enter="p:[op:1] | a:[rotateX:-90deg:0deg:1000:easeOutExpo:0:1:f]"
			when-receipt-exit="a:[rotateX:0deg:-90deg:500:easeInExpo:0:1:f]">

			<item height="15" width="100" style="top:0%" class="absolute p15xy" align="center center" bg="smoke"
				u init-with="p:[op:0, tr:translateY(30px)]"
				on-init="s:[receipt-item-enter:depth(0):easeOutSine-1500]:+2000"
				when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
				<txt class='weight-600 txt-charcoal p10x absolute' style="left:5%;" font-size="20px" line-height='1.2'>
					Description
				</txt>
				<txt class='weight-900 txt-taupe p10x absolute' style="right:5%;"font-size="20px" line-height='1.2'>
					Price
				</txt>
			</item>

			<item height="15" width="100" style="top:20%;" class="absolute" align="center top" bg="white" pointer>
				<txt class='weight-900 txt-shamrock p10x absolute' style="left:5%;" font-size="20px" line-height='1.2' bg="white"
					u init-with="p:[op:0, tr:translateX(-15px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
					Weekly Special
				</txt>
				<txt class='weight-600 txt-taupe p10xy absolute' style="left:5%; margin-top:2%" font-size="18px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-15px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
					100 Credits on 02/23/16
				</txt>
				<txt class='weight-900 txt-taupe p10xy uppercase absolute bottom-0' style="right:5%; " font-size="20px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-90px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
					$90.00
				</txt>
			</item>

			<item height="15" width="100" style="top:40%;" class="absolute" align="center center" bg="white" pointer>
				<item class="absolute p15y" style="border-top:dashed 3px #EDEEEF;" width="88"
					u init-with="p:[op:0, tr:translateY(30px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
				</item>
				<txt class='weight-900 txt-cerise p10xy absolute' style="left:5%; top:3%;" font-size="20px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-15px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
					Academic Request
				</txt>
				<txt class='weight-600 txt-taupe p10xy absolute' style="left:5%; margin-top:4%" font-size="18px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-15px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
					In Person Tutoring on 02/23/16
				</txt>
				<txt class='weight-900 txt-taupe p10xy uppercase absolute bottom-0' style="right:5%; " font-size="20px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-90px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
					$25.00
				</txt>
			</item>

			<item height="25" width="100" class="absolute" style="bottom:10%;" align="center center" bg="white">
				<item class="absolute" style="border-top:solid 3px #EDEEEF; top:10%;" width="100"
					u init-with="p:[op:0, tr:translateY(30px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
				</item>
				<txt class='weight-900 txt-slate p10x absolute uppercase' style="left:5%;" font-size="20px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-90px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
					Total
				</txt>
				<txt class='weight-900 txt-moxie p10x absolute' style="right:5%;" font-size="28px" line-height='1.2'
					u init-with="p:[op:0, tr:translateX(-90px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
					$115.00
				</txt>
			</item>
	    </item>

		<item width='50' height="16" align='center center' class="p30xy absolute" style="top:32%;" bg="white"
			u init-with="p:[op:0, tr:scaleY(0), tro:center top]"
			when-header-enter="a:[bounceIn-subtle:1500:easeOutQuad:500:1:f]"
			when-receipt-exit="a:[bounceOut-subtle:1000:linear:0:1:f]:delay-1500">
			<item width="100" height="5" class="absolute" style="top:15%" bg="white">
				<txt class='weight-600 txt-center txt-charcoal' font-size="36px" line-height='1.2' bg="white">
					Your Receipt
				</txt>
			</item>
			<item height="30" width="100" style="top:55%;" class="absolute" align="center top">
				<txt class='weight-600 txt-charcoal p10x uppercase' font-size="20px" line-height='1.2' bg="white">
					ORDER:
				</txt>
				<txt class='weight-900 txt-taupe p10x uppercase' font-size="20px" line-height='1.2' bg="white">
					EMN45E0OM0
				</txt>
			</item>
		</item>

		<item height="5" class="absolute p15xy" style="bottom:9%;"
			u init-with="p-op"
			when-receipt-enter="a:[bounceIn-subtle:800:linear:0:1:f]"
			on-click="s:[receipt-exit:depth(0)]">
			<button class="btn-default bg-cerise radius-2 p30x">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>View Receipt Details</span>
			</button>
		</item>
	</view>

	<view layer="1" type='row' ng-if="false">
		<item width='50' height="55" align='center top' bg="smoke" class="p30xy absolute" style="bottom:14%;">
			<item width="100" height="5" class="absolute" style="top:5%" >
				<txt class='weight-600 txt-center txt-charcoal' font-size="36px" line-height='1.2'>
					Your Request Details
				</txt>
			</item>
			<item height="10" width="100" style="top:15%" class="absolute" align="center top">
				<txt class='weight-600 txt-charcoal p10x uppercase' font-size="20px" line-height='1.2'>
					ORDER:
				</txt>
				<txt class='weight-900 txt-taupe p10x uppercase' font-size="20px" line-height='1.2'>
					EMN45E0OM0
				</txt>
			</item>
			<item height="10" width="100" align="center bottom" class="absolute p15x" style="bottom:35%;">
				<div class="perspective-container full-xy flex-center p15xy" width="50">
					<a class="request-card bg-household complete"
						u init-with="p-op"
						on-init="s:[request-card:self, request-card-init:>children:350]"
						when-request-card="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p-op"
										when-request-card-init="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p-op"
											when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p-op"
											when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p-op"
									when-request-card-init="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p-op"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p-op"
								when-request-card-init="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p-op"
									when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
									<span class="chip">Completed</span>
								</li>
							</ul>
						</div>
					</a>
				</div>
				<div class="perspective-container full-xy flex-center p15xy" width="50">
					<a class="request-card bg-household complete"
						u init-with="p-op"
						on-init="s:[request-card:self, request-card-init:>children:350]"
						when-request-card="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p-op"
										when-request-card-init="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p-op"
											when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p-op"
											when-request-card-init="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p-op"
									when-request-card-init="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p-op"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p-op"
								when-request-card-init="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p-op"
									when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
									<span class="chip">Completed</span>
								</li>
							</ul>
						</div>
					</a>
				</div>
			</item>
		</item>

		<item height="5" class="absolute p15xy" style="bottom:9%;">
			<button class="btn-default bg-white radius-2 p30x txt-cerise">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>Back to Receipt</span>
			</button>
		</item>
	</view>
</div>
