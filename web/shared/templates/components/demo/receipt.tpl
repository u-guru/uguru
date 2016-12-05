<div class='full-xy perspective-container'>
	<view layer="2" type='row' bg="#B7D2CA">
	    <item width='100' height='20' align='center top'
			u init-with="p:[op:0, tro:center center]"
			on-init="a:[bounceInUp-subtle:1000:linear:0:1:f] | s:[header-enter:depth(0):450, receipt-enter:depth(0):1650]">
			<graphic width="100" height="110" url='shared/templates/components/svg/logo/ui-guru-receipt.html'>
			</graphic>
	    </item>

		<item width='100' align='center top'
			u init-with="p:[op:0]"
			when-header-enter="a:[scoop-enter:1000:linear:0:1:f]">
            <txt class='weight-700 margin-0 txt-center' font-size="60px" line-height='1.2'>
                Thank you for your order!
            </txt>
	    </item>

		<!-- <item width='50' height="55" align='center top' class="p30xy absolute" style="bottom:14%;" bg="smoke"
			init-after="details-enter"
			init-with="p:[op:0]"
			on-init="s:[receipt-fade:self, request-enter:depth(1)]"
			when-receipt-fade="a:[bounceIn-subtle:1000:linear:0:1:f]">
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
			<item height="10" width="100" align="center bottom" class="absolute p15x" style="bottom:35%;" >
				<div class="perspective-container full-xy flex-center p15xy" width="50">
					<a class="request-card bg-household complete"
						u init-with="p:[op:0]"
						when-request-enter="s:[request-card-1:self, request-card-init-1:>children:350]"
						when-request-card-1="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p:[op:0]"
										when-request-card-init-1="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p:[op:0]"
											when-request-card-init-1="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p:[op:0]"
											when-request-card-init-1="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p:[op:0]"
									when-request-card-init-1="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init-1="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p:[op:0]"
								when-request-card-init-1="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
									<span class="chip">Completed</span>
								</li>
							</ul>
						</div>
					</a>
				</div>
				<div class="perspective-container full-xy flex-center p15xy" width="50">
					<a class="request-card bg-household complete"
						u init-with="p:[op:0]"
						when-request-enter="s:[request-card-2:self, request-card-init-2:>children:350]:delay-500"
						when-request-card-2="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p:[op:0]"
										when-request-card-init-2="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p:[op:0]"
											when-request-card-init-2="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p:[op:0]"
											when-request-card-init-2="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p:[op:0]"
									when-request-card-init-2="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init-2="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p:[op:0]"
								when-request-card-init-2="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
									<span class="chip">Completed</span>
								</li>
							</ul>
						</div>
					</a>
				</div>
			</item>
		</item>

		<item height="5" class="absolute p15xy" style="bottom:9%;" init-after="details-enter"
			on-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
			<button class="btn-default bg-white radius-2 p30x txt-cerise">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>Back to Receipt</span>
			</button>
		</item> -->

		<item width="50" align="center center" class="flex-wrap m15top">
			<item width='100' class="p30x-p15y" bg="white"
				u init-with="p:[op:0, tr:scaleY(0), tro:center top]"
				when-header-enter="a:[bounceIn-subtle:1500:easeOutQuad:500:1:f]"
				when-receipt-exit="a:[bounceOut-subtle:1000:linear:0:1:f]:delay-1500">
				<item width="100" bg="white">
					<txt class='weight-600 txt-center txt-charcoal' font-size="36px" line-height='1.2' bg="white">
						Your Receipt
					</txt>
				</item>
				<item width="100" align="center center" class="m05top">
					<txt class='weight-600 txt-charcoal p10x uppercase' font-size="20px" line-height='1.2' bg="white">
						ORDER:
					</txt>
					<txt class='weight-900 txt-taupe p10x uppercase' font-size="20px" line-height='1.2' bg="white">
						EMN45E0OM0
					</txt>
				</item>
			</item>

			<item width='100' class="p20y" bg="white"
				u init-with="p:[op:0, tr:rotateX(-90deg), tro:50% 0%]"
				when-receipt-enter="p:[op:1] | a:[rotateX:-90deg:0deg:1000:easeOutExpo:0:1:f]"
				when-receipt-exit="a:[rotateX:0deg:-90deg:500:easeInExpo:0:1:f,opacity:1:0:500:linear:0:1:f]">

				<item width="100" align="center center" class="flex-space-between p30x-p05y" bg="smoke"
					u init-with="p:[op:0, tr:translateY(30px)]"
					on-init="s:[receipt-item-enter:depth(0):easeOutSine-1500]:+2000"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
					<txt class='weight-600 txt-charcoal p10x' font-size="20px" line-height='1.2'>
						Description
					</txt>
					<txt class='weight-900 txt-taupe p10x' font-size="20px" line-height='1.2'>
						Price
					</txt>
				</item>

				<item width="100" align="center top" bg="white" class="flex-space-between p30x-p15top" pointer>
					<item width="75" align="left top" class="flex-wrap">
						<txt class='block full-x weight-900 txt-shamrock p10x' font-size="20px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-15px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
							Weekly Special
						</txt>
						<txt class='block full-x weight-600 txt-taupe p10x' font-size="18px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-15px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
							100 Credits on 02/23/16
						</txt>
					</item>
					<item width="25" align="right top">
						<txt class='weight-900 txt-taupe p10xy uppercase' font-size="20px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-90px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
							$90.00
						</txt>
					</item>
				</item>

				<item width="100"
					u init-with="p:[op:0, tr:translateY(30px)]"
					when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
					<div class="p15y-p30x full-x">
						<div class="p10x">
							<div class="full-x border-3-top border-dashed" style="border-color: #EDEEEF"></div>
						</div>
					</div>
				</item>

				<item width="100" align="center top" bg="white" class="flex-space-between p30x" pointer>
					<item width="75" align="left top" class="flex-wrap">
						<txt class='block full-x weight-900 txt-cerise p10x' font-size="20px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-15px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
							Academic Request
						</txt>
						<txt class='block full-x weight-600 txt-taupe p10x' font-size="18px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-15px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-15px:0px:500:easeOutExpo:150:1:f]">
							In Person Tutoring on 02/23/16
						</txt>
					</item>
					<item width="25" align="right top">
						<txt class='weight-900 txt-taupe p10xy uppercase' font-size="20px" line-height='1.2'
							u init-with="p:[op:0, tr:translateX(-90px)]"
							when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
							$25.00
						</txt>
					</item>
				</item>

				<item width="100" bg="white">
					<item class="border-3-top border-solid" style="border-color:#EDEEEF" width="100"
						u init-with="p:[op:0, tr:translateY(30px)]"
						when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateY:30px:0px:500:easeOutExpo:150:1:f]">
					</item>
					<txt class='weight-900 txt-slate p10x uppercase' font-size="20px" line-height='1.2'
						u init-with="p:[op:0, tr:translateX(-90px)]"
						when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
						Total
					</txt>
					<txt class='weight-900 txt-moxie p10x' font-size="28px" line-height='1.2'
						u init-with="p:[op:0, tr:translateX(-90px)]"
						when-receipt-item-enter="a:[opacity:0:1:500:easeInOutExpo:0:1:f, translateX:-90px:0px:500:easeOutCubic:150:1:f]">
						$115.00
					</txt>
				</item>
			</item>
		</item>

		<!-- <item height="5" class="absolute p15xy" style="bottom:9%;"
			u init-with="p:[op:0]"
			when-receipt-enter="a:[bounceIn-subtle:800:linear:0:1:f]"
			on-click="s:[receipt-exit:depth(0), details-enter:public:2000]">
			<button class="btn-default bg-cerise radius-2 p30x">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span>View Receipt Details</span>
			</button>
		</item> -->
	</view>

	<view layer="1" type='row' bg="#B7D2CA"
		when-receipt-enter="p:[z-index:10]">
		<item width='100' height='20' align='center top' class="absolute top-0">
			<graphic width="100" height="110" url='shared/templates/components/svg/logo/ui-guru-receipt.html'>
			</graphic>
	    </item>

		<item width='100' align='center top' class="absolute" style="top:20%;">
            <txt class='weight-700 margin-0 txt-center' font-size="60px" line-height='1.2'>
                Thank you for your order!
            </txt>
	    </item>
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
						u init-with="p:[op:0]"
						on-init="s:[request-card-1:self, request-card-init-1:>children:350]"
						when-request-card-1="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p:[op:0]"
										when-request-card-init-1="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p:[op:0]"
											when-request-card-init-1="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p:[op:0]"
											when-request-card-init-1="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p:[op:0]"
									when-request-card-init-1="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init-1="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p:[op:0]"
								when-request-card-init-1="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-status="a:[bounceIn-subtle:1000:easeOutSine:0:1:f]">
									<span class="chip">Completed</span>
								</li>
							</ul>
						</div>
					</a>
				</div>
				<div class="perspective-container full-xy flex-center p15xy" width="50">
					<a class="request-card bg-household complete"
						u init-with="p:[op:0]"
						on-init="s:[request-card-2:self, request-card-init-2:>children:350]:delay-500"
						when-request-card-2="a:[bounceIn-subtle:1000:linear:0:1:f]">
						<div class="map">
							<div class="map-marker" style="bottom: 15px; left: 50%; margin-left: -6px;">
								<div>
									<div u init-with="p:[op:0]"
										when-request-card-init-2="a:[bounceIn-subtle:1000:linear:400:1:f] | p:[tro:center bottom]">
										<span u init-with="p:[op:0]"
											when-request-card-init-2="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">
											<svg viewBox="0 0 100 100">
												<path d="M24.2857143,39.7142857 C24.2085714,25.5128 35.7985143,14 50,14 C64.2014857,14 75.7914286,25.5128 75.7142857,39.7142857 C75.6001143,60.8658286 50,86 50,86 C50,86 24.4009143,60.8658286 24.2857143,39.7142857 Z M50,50 C55.6806431,50 60.2857143,45.3949289 60.2857143,39.7142857 C60.2857143,34.0336426 55.6806431,29.4285714 50,29.4285714 C44.3193569,29.4285714 39.7142857,34.0336426 39.7142857,39.7142857 C39.7142857,45.3949289 44.3193569,50 50,50 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
											</svg>
										</span>
										<span u init-with="p:[op:0]"
											when-request-card-init-2="a:[opacity:0:1:1000:easeOutSine:650:0:1:f]">Philz Coffee</span>
									</div>
								</div>
								<span u init-with="p:[op:0]"
									when-request-card-init-2="a:[bounceIn-subtle:1000:easeOutSine:150:1:f]"></span>
							</div>
						</div>
						<div class="info">
							<hr class="info-border"
								u init-with="p:[tr:scaleX(0), tro:center center]"
								when-request-card-init-2="a:[scaleX:0:1:250:easeOutSine:0:1:f] |s:[request-card-info:children]"/>
							<ul class="ugrid-2">
								<li u init-with="p:[tr:scaleX(0), tro:center center]"
									when-request-card-info="a:[icon-enter:900:linear:0:1:f]">
									<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
								</li>
								<li u init-with="p:[op:0]"
									when-request-card-info="a:[opacity:0:1:500:easeOutSine:0:1:f]">
									<h2>Academic Request</h2>
									<h1>In Person Tutoring</h1>
									<hr class="info-divider"/>
								</li>
							</ul>
							<ul class="ugrid-3"
								u init-with="p:[op:0]"
								when-request-card-init-2="a:[opacity:0:1:500:easeOutSine:0:1:f] |s:[request-card-status:children:150]">
								<li>
									<h4>Date Created</h4>
									<h3>Feb 15</h3>
								</li>
								<li>
									<h4>Time Needed</h4>
									<h3>1h 30m</h3>
								</li>
								<li u init-with="p:[op:0]"
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
