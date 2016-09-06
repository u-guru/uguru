<div class="perspective-container full-xy flex">
	<aside class="sidebar-list bg-lake"
		init-with="p-op"
		on-init="s:[sidebar-list-init-1:public]"
		when-sidebar-list-init-1="p:[opacity:0:1:250:easeOutSine, transform:translateX(-100%):translateX(0%):250:easeOutQuint]"
		on-exit="p:[opacity:1:0:450:easeOutSine]">
		<header class="sidebar-list-header bg-white-90p"
			init-with="p-op"
			when-sidebar-list-init-1="p:[transform:translateY(-100%):translateY(0%):250:easeOutQuint, opacity:0:1:250:easeOutQuint]">
			<h2 class="txt-charcoal">Ways to Super Student&nbsp;Stardom</h2>
		</header>
		<ul>
			<!-- @samir - <li> elements are being staggered in intervals of 150ms -->
			<!-- lines: 16, 38, 60 -->
			<li init-with="p-op"
				when-sidebar-list-init-1="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-75p"
					on-mouse-enter="p:[background:rgba(64#72#75#0.75):rgba(255#255#255#0.75):150:easeOutSine] | send:[email-mouse-enter:public]"
					on-mouse-leave="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0.75):150:easeInSine] | send:[email-mouse-leave:public]"
					on-click="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0):50:easeOutSine] | send:[email-click:public]">
					<h3 class="txt-24 semibold"
						init-default
						when-email-mouse-enter="p:[color:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave="p:[color:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click="p:[color:#50a5dd:#ffffff:50:easeOutSine]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						init-with="p:[s:#ffffff]"
						when-email-mouse-enter="p:[stroke:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave="p:[stroke:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click="p:[stroke:#50a5dd:#ffffff:50:easeOutSine]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
			<li init-with="p-op"
				when-sidebar-list-init-1="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-50p"
					on-mouse-enter="p:[background:rgba(64#72#75#0.75):rgba(255#255#255#0.75):150:easeOutSine] | send:[email-mouse-enter-2:public]"
					on-mouse-leave="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0.5):150:easeInSine] | send:[email-mouse-leave-2:public]"
					on-click="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0):50:easeOutSine] | send:[email-click-2:public]">
					<h3 class="txt-24 semibold"
						init-default
						when-email-mouse-enter-2="p:[color:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave-2="p:[color:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click-2="p:[color:#50a5dd:#ffffff:50:easeOutSine]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						init-with="p:[s:#ffffff]"
						when-email-mouse-enter-2="p:[stroke:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave-2="p:[stroke:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click-2="p:[stroke:#50a5dd:#ffffff:50:easeOutSine]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
			<li init-with="p-op"
				when-sidebar-list-init-1="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-25p"
					on-mouse-enter="p:[background:rgba(64#72#75#0.75):rgba(255#255#255#0.75):150:easeOutSine] | send:[email-mouse-enter-3:public]"
					on-mouse-leave="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0.5):150:easeInSine] | send:[email-mouse-leave-3:public]"
					on-click="p:[background:rgba(255#255#255#0.75):rgba(64#72#75#0):50:easeOutSine] | send:[email-click-3:public]">
					<h3 class="txt-24 semibold"
						init-default
						when-email-mouse-enter-3="p:[color:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave-3="p:[color:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click-3="p:[color:#50a5dd:#ffffff:50:easeOutSine]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						init-with="p:[s:#ffffff]"
						when-email-mouse-enter-3="p:[stroke:#ffffff:#50a5dd:150:easeOutSine]"
						when-email-mouse-leave-3="p:[stroke:#50a5dd:#ffffff:150:easeInSine]"
						when-email-click-3="p:[stroke:#50a5dd:#ffffff:50:easeOutSine]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-moxie"
		init-with="p-op"
		on-init="s:[sidebar-list-init-2:public:delay-250]"
		when-sidebar-list-init-2="p:[opacity:0:1:250:easeOutSine, transform:translateX(-100%):translateX(0%):250:easeOutQuint]"
		on-exit="p:[opacity:1:0:450:easeOutSine]">
		<header class="sidebar-list-header bg-charcoal-25p"
			init-with="p-op"
			when-sidebar-list-init-2="p:[transform:translateY(-100%):translateY(0%):250:easeOutQuint, opacity:0:1:250:easeOutQuint]">
			<h2>Payment History</h2>
		</header>
		<ul class="sidebar-list-dividers">
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				when-sidebar-list-init-2="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<a class="chip bg bg-charcoal uppercase">Pending</a>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				when-sidebar-list-init-2="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]">
				<div>
					<h3 class="txt-20 semibold"><b class="black">CS10</b> Session with <b class="black">Amrita</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg bg-charcoal uppercase">$34.00</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				when-sidebar-list-init-2="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg bg-charcoal uppercase">Approved</span>
				</span>
				<hr/>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-lake"
		init-with="p-op"
		on-init="s:[sidebar-list-init-3:public:delay-500]"
		when-sidebar-list-init-3="p:[opacity:0:1:250:easeOutSine, transform:translateX(-100%):translateX(0%):250:easeOutQuint]"
		on-exit="p:[opacity:1:0:450:easeOutSine]">
		<header class="sidebar-list-header bg-slate-50p"
			init-with="p-op"
			when-sidebar-list-init-3="p:[transform:translateY(-100%):translateY(0%):250:easeOutQuint, opacity:0:1:250:easeOutQuint]">
			<h2 class="txt-left">My Gurus</h2>
		</header>
		<ul class="sidebar-list-messaging">
			<li class="relative overflow-hidden"
				init-with="p-op"
				when-sidebar-list-init-3="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]"
				on-mouse-enter="send:[brian-mouse-enter:public]"
				on-mouse-leave="send:[brian-mouse-leave:public]"
				on-click="send:[brian-click:public]">
				<a class="flex-center-vertical p15xy"
					init-default
					on-click="p:[background:rgba(255#255#255#0):rgba(123#187#230#1):150:easeInOutSine]:delay-250 | send:[brian-blur-2:public, brian-blur-3:public]"
					when-brian-blur="p:[background:rgba(123#187#230#1):rgba(255#255#255#0):150:easeInOutSine]">
					<div class="sidebar-link-bg bg-white-25p"
						init-with="p:[tr:scale(0)]"
						when-brian-click="p:[tr:scale(128), t:all 250ms ease-in] | t-exit"
						on-exit="p:[tr:scale(0), t:all 250ms ease-in]:delay-275"
						when-brian-blur="p:[tr:scale(0), t:all 250ms ease-in]"></div>
					<span class="user-icon-36 margin-none m15right"
						init-default
						when-brian-mouse-enter="p:[border-color:#2b2324, t:all 150ms ease-in]"
						when-brian-click="p:[border-color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave="p:[border-color:#ffffff, t:all 150ms ease-in]"></span>
					<h3 class="txt-24 semibold"
						init-default
						when-brian-mouse-enter="p:[color:#2b2324, t:all 150ms ease-in]"
						when-brian-click="p:[color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]">Brian</h3>
				</a>
			</li>
			<li class="relative overflow-hidden"
				init-with="p-op"
				when-sidebar-list-init-3="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]"
				on-mouse-enter="send:[brian-mouse-enter-2:public]"
				on-mouse-leave="send:[brian-mouse-leave-2:public]"
				on-click="send:[brian-click-2:public]">
				<a class="flex-center-vertical p15xy"
					init-default
					on-click="p:[background:rgba(255#255#255#0):rgba(123#187#230#1):150:easeInOutSine]:delay-250 | send:[brian-blur:public, brian-blur-3:public]"
					when-brian-blur-2="p:[background:rgba(123#187#230#1):rgba(255#255#255#0):150:easeInOutSine]">
					<div class="sidebar-link-bg bg-white-25p"
						init-with="p:[tr:scale(0)]"
						when-brian-click-2="p:[tr:scale(128), t:all 250ms ease-in] | t-exit"
						on-exit="p:[tr:scale(0), t:all 250ms ease-in]:delay-275"
						when-brian-blur-2="p:[tr:scale(0), t:all 250ms ease-in]"></div>
					<span class="user-icon-36 margin-none m15right"
						init-default
						when-brian-mouse-enter-2="p:[border-color:#2b2324, t:all 150ms ease-in]"
						when-brian-click-2="p:[border-color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave-2="p:[border-color:#ffffff, t:all 150ms ease-in]"></span>
					<h3 class="txt-24 semibold"
						init-default
						when-brian-mouse-enter-2="p:[color:#2b2324, t:all 150ms ease-in]"
						when-brian-click-2="p:[color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave-2="p:[color:#ffffff, t:all 150ms ease-in]">Brian</h3>
				</a>
			</li>
			<li class="relative overflow-hidden"
				init-with="p-op"
				when-sidebar-list-init-3="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]"
				on-mouse-enter="send:[brian-mouse-enter-3:public]"
				on-mouse-leave="send:[brian-mouse-leave-3:public]"
				on-click="send:[brian-click-3:public]">
				<a class="flex-center-vertical p15xy"
					init-default
					on-click="p:[background:rgba(255#255#255#0):rgba(123#187#230#1):150:easeInOutSine]:delay-250 | send:[brian-blur:public, brian-blur-2:public]"
					when-brian-blur-3="p:[background:rgba(123#187#230#1):rgba(255#255#255#0):150:easeInOutSine]">
					<div class="sidebar-link-bg bg-white-25p"
						init-with="p:[tr:scale(0)]"
						when-brian-click-3="p:[tr:scale(128), t:all 250ms ease-in]| t-exit"
						on-exit="p:[tr:scale(0), t:all 250ms ease-in]:delay-275"
						when-brian-blur-3="p:[tr:scale(0), t:all 250ms ease-in]"></div>
					<span class="user-icon-36 margin-none m15right"
						init-default
						when-brian-mouse-enter-3="p:[border-color:#2b2324, t:all 150ms ease-in]"
						when-brian-click-3="p:[border-color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave-3="p:[border-color:#ffffff, t:all 150ms ease-in]"></span>
					<h3 class="txt-24 semibold"
						init-default
						when-brian-mouse-enter-3="p:[color:#2b2324, t:all 150ms ease-in]"
						when-brian-click-3="p:[color:#ffffff, t:all 150ms ease-in]"
						when-brian-mouse-leave-3="p:[color:#ffffff, t:all 150ms ease-in]">Brian</h3>
				</a>
			</li>
		</ul>
	</aside>
</div>
